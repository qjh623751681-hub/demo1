# 项目开发问题记录

## 问题1：React SPA 页面跳转白屏

### 现象
- 工作台点击"数据中心"导航 → 白屏
- 直接使用 `/?page=datacenter` URL 访问正常
- 点击跳转后页面刷新，React 应用重新加载

### 根本原因
使用 `<a>` 标签或 `href` 跳转会导致**整页刷新**，React 应用状态丢失，重新渲染时出现白屏。

### 错误代码
```tsx
// ❌ 错误：使用 <a> 标签
<a href="/?page=datacenter">数据中心</a>

// ❌ 错误：在 button 上用 href
<button href="/?page=datacenter">数据中心</button>
```

### 正确方案
使用 React 内部状态管理 + 浏览器 History API 实现**无刷新跳转**：

```tsx
// 1. MainApp.tsx - 统一管理页面状态
const [currentPage, setCurrentPage] = useState('dashboard');

const navigateTo = (page) => {
  setCurrentPage(page);
  window.history.pushState({}, '', page === 'datacenter' ? '/?page=datacenter' : '/');
};

// 2. 子页面通过 props 接收导航函数
<AIPlatformDashboard onNavigate={navigateTo} />
<DataCenter onNavigate={navigateTo} />

// 3. 页面内部调用
<button onClick={() => onNavigate?.('datacenter')}>
  数据中心
</button>
```

### 关键原则
- SPA（单页应用）内跳转**绝不用 `<a href>`**
- 使用 React Router 或自定义路由管理
- 通过 props 传递导航函数
- URL 变化仅用于分享/书签，不用于页面切换逻辑

---

## 问题2：文件编辑导致组件结构损坏

### 现象
- 编辑代码后出现语法错误
- 组件嵌套混乱
- React 编译失败

### 根本原因
- 使用 `edit` 工具时匹配文本不准确
- 多行替换时破坏了代码块结构
- 没有完整验证修改后的文件

### 错误示例
```tsx
// 原代码
export default function DataCenter() {
  const [state, setState] = useState('');
  // ... 很多代码
  return ( ... );
}

// ❌ 错误：在文件中间插入了新的 export
export default function DataCenter({ onNavigate }: DataCenterProps) {
  // 导致重复 export
}
```

### 正确方案
1. **写之前先读完整文件** - 了解结构再动手
2. **复杂修改直接重写文件** - 用 `write` 代替多次 `edit`
3. **修改后验证语法** - `npx tsc --noEmit`
4. **保留备份** - 重要修改前先复制原文件

```bash
# 修改前备份
cp src/DataCenter.tsx src/DataCenter.tsx.bak

# 修改后验证
npx tsc --noEmit
```

---

## 问题3：Vite 开发服务器热更新失效

### 现象
- 修改代码后页面不更新
- 需要手动刷新才能看到变化
- 有时出现旧代码缓存

### 解决方案
```bash
# 1. 完全重启（推荐）
pkill -f vite
rm -rf node_modules/.vite
npm run dev

# 2. 浏览器强制刷新
Ctrl+Shift+R 或 Cmd+Shift+R

# 3. 清除浏览器缓存
DevTools → Network → Disable cache → 刷新
```

---

## 问题4：React + TypeScript 类型错误

### 现象
- 提示 JSX 元素类型错误
- Props 类型未定义
- 编译失败但运行时正常

### 正确实践
```tsx
// 1. 定义 Props 接口
interface ComponentProps {
  onNavigate?: (page: 'dashboard' | 'datacenter') => void;
}

// 2. 组件接收 props
export default function Component({ onNavigate }: ComponentProps) {
  // ...
}

// 3. 可选链调用
onNavigate?.('dashboard');
```

---

## 问题5：运行时白屏但编译通过

### 现象
- TypeScript 编译通过 (`npx tsc --noEmit` 无错误)
- 浏览器打开页面白屏
- 控制台报错：`XXX is not defined` 或 `Cannot read properties of undefined`

### 根本原因
使用了未导入的变量/组件，TypeScript 有时不会报错（特别是 JSX 组件）。

### 典型案例
```tsx
// ❌ 错误：使用了 Zap 但没有导入
import { LayoutDashboard, Database } from 'lucide-react';
// ... 其他导入，但漏了 Zap

export default function Component() {
  return <Zap className="w-6 h-6" />;  // 运行时报错：Zap is not defined
}
```

### 正确做法
1. **使用变量前先检查是否导入**
2. **VS Code 开启自动导入**：设置 `"typescript.suggest.autoImports": true`
3. **看到报错立即检查控制台**：F12 → Console 看红色错误

### 快速排查
```bash
# 检查文件是否用了未导入的变量
grep -n "<Zap" src/DataCenter.tsx    # 看哪里用了
grep -n "Zap," src/DataCenter.tsx    # 看是否导入
```

## 开发检查清单

每次修改后必须：
- [ ] 语法检查：`npx tsc --noEmit`
- [ ] 页面能正常渲染
- [ ] 导航跳转无白屏
- [ ] 控制台无红色报错

复杂修改时必须：
- [ ] 先读完整文件
- [ ] 备份原文件
- [ ] 小步验证，不要一次性改太多
