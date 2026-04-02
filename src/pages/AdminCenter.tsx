import React, { useState } from 'react';
import {
  LayoutDashboard, Database, Code2, Brain, Sparkles, Cloud, Cpu, Settings,
  Search, Bell, Plus, ChevronRight, MoreVertical, Users, Shield, Key,
  FileText, Activity, BarChart3, Database as DbIcon, Server, Globe,
  DollarSign, ExternalLink, Edit3, Trash2, CheckCircle2, AlertCircle,
  Clock, TrendingUp, Filter, Download, Upload, Save
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: '工作台' },
  { icon: Database, label: '数据中心' },
  { icon: Code2, label: '开发环境' },
  { icon: Brain, label: '模型中心' },
  { icon: Sparkles, label: 'AI应用' },
  { icon: Cloud, label: '云服务' },
  { icon: Cpu, label: '算力中心' },
  { icon: Settings, label: '平台管理', active: true },
];

const subNavItems = [
  { id: 'users', label: '用户管理', icon: Users },
  { id: 'roles', label: '权限角色', icon: Shield },
  { id: 'resources', label: '资源配置', icon: Server },
  { id: 'billing', label: '计费管理', icon: DollarSign },
  { id: 'logs', label: '操作日志', icon: FileText },
  { id: 'settings', label: '系统设置', icon: Settings },
];

// 用户数据
const userData = [
  { id: 1, name: '张三', email: 'zhangsan@company.com', role: '管理员', department: 'AI平台部', status: 'active', lastLogin: '10分钟前' },
  { id: 2, name: '李四', email: 'lisi@company.com', role: '算法工程师', department: '算法组', status: 'active', lastLogin: '1小时前' },
  { id: 3, name: '王五', email: 'wangwu@company.com', role: '数据工程师', department: '数据组', status: 'active', lastLogin: '3小时前' },
  { id: 4, name: '赵六', email: 'zhaoliu@company.com', role: '标注员', department: '数据组', status: 'inactive', lastLogin: '2天前' },
];

// 角色数据
const roleData = [
  { id: 1, name: '超级管理员', description: '拥有所有权限', userCount: 2, permissions: ['全部权限'] },
  { id: 2, name: '算法工程师', description: '模型训练、实验开发', userCount: 15, permissions: ['开发环境', '模型中心', '数据中心'] },
  { id: 3, name: '数据工程师', description: '数据处理、标注管理', userCount: 8, permissions: ['数据中心', '标注系统'] },
  { id: 4, name: '标注员', description: '数据标注任务执行', userCount: 25, permissions: ['标注系统'] },
  { id: 5, name: '访客', description: '只读权限', userCount: 5, permissions: ['只读访问'] },
];

// 计费数据
const billingData = [
  { id: 1, project: '大模型微调项目', resource: 'A100 x 8', duration: '120小时', cost: 2880, date: '2026-03-28' },
  { id: 2, project: '图像识别实验', resource: 'A100 x 2', duration: '45小时', cost: 540, date: '2026-03-27' },
  { id: 3, project: '数据存储', resource: '对象存储', duration: '1个月', cost: 450, date: '2026-03-26' },
];

export default function AdminCenter({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [activeTab, setActiveTab] = useState('users');

  const getStatusBadge = (status: string) => {
    const configs: { [key: string]: { text: string; color: string } } = {
      active: { text: '正常', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
      inactive: { text: '禁用', color: 'bg-gray-100 text-gray-600 border-gray-200' },
    };
    return <span className={`px-2 py-0.5 text-xs rounded-full border ${configs[status].color}`}>{configs[status].text}</span>;
  };

  const renderUsers = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
            <Plus className="w-4 h-4" />添加用户
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl transition-colors">
            <Upload className="w-4 h-4" />批量导入
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="搜索用户..." className="pl-10 pr-4 py-2 w-64 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">用户列表</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {userData.map((user) => (
            <div key={user.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{user.name}</h4>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">{user.role}</span>
                  <span className="text-gray-500">{user.department}</span>
                  {getStatusBadge(user.status)}
                  <span className="text-gray-400 text-xs">{user.lastLogin}</span>
                  <div className="flex gap-1">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRoles = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
          <Plus className="w-4 h-4" />创建角色
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {roleData.map((role) => (
          <div key={role.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-violet-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{role.name}</h3>
                  <p className="text-sm text-gray-500">{role.description}</p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              {role.permissions.map((perm, idx) => (
                <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{perm}</span>
              ))}
            </div>
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm text-gray-500">{role.userCount} 个用户</span>
              <button className="text-sm text-blue-600 hover:text-blue-700">查看详情 →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">本月消费</div>
          <div className="text-2xl font-bold text-gray-900">¥12,450</div>
          <div className="mt-2 text-sm text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />+8.5%
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">GPU费用</div>
          <div className="text-2xl font-bold text-gray-900">¥8,320</div>
          <div className="mt-2 text-sm text-gray-500">占比 66.8%</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">存储费用</div>
          <div className="text-2xl font-bold text-gray-900">¥2,180</div>
          <div className="mt-2 text-sm text-gray-500">占比 17.5%</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">费用明细</h3>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
            <Download className="w-4 h-4" />导出账单
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          {billingData.map((item) => (
            <div key={item.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">{item.project}</h4>
                  <p className="text-sm text-gray-500">{item.resource} · {item.duration}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">¥{item.cost}</div>
                  <div className="text-sm text-gray-400">{item.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPlaceholder = (title: string, description: string) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
      <Settings className="w-16 h-16 text-gray-200 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 flex font-sans">
      <aside className="w-16 bg-white border-r border-gray-200/80 flex flex-col items-center py-4 fixed h-full z-20 shadow-sm">
        <div className="mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Settings className="w-6 h-6 text-white" />
          </div>
        </div>
        <nav className="flex-1 flex flex-col gap-0.5 w-full px-2">
          {navItems.map((item, index) => {
            const handleClick = () => {
              if (item.label === '工作台') onNavigate?.('dashboard');
              else if (item.label === '数据中心') onNavigate?.('datacenter');
              else if (item.label === '开发环境') onNavigate?.('dev');
              else if (item.label === '模型中心') onNavigate?.('model');
              else if (item.label === 'AI应用') onNavigate?.('app');
              else if (item.label === '云服务') onNavigate?.('cloud');
              else if (item.label === '算力中心') onNavigate?.('compute');
            };
            return (
              <button key={index} onClick={handleClick} className={`group relative w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-200 ${item.active ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}>
                <item.icon className="w-5 h-5" strokeWidth={item.active ? 2 : 1.5} />
                {item.active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-blue-600 rounded-r-full" />}
                <span className="absolute left-full ml-3 px-2.5 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-lg">
                  {item.label}
                  <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 ml-16 min-w-0">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200/80 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">首页</span>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <span className="text-gray-900 font-semibold">平台管理</span>
          </div>
          {/* 平台模块快速导航 */}
          <div className="flex-1 flex items-center justify-center gap-1">
            <button onClick={() => onNavigate?.('dashboard')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-gray-600 hover:bg-gray-50">工作台</button>
            <button onClick={() => onNavigate?.('datacenter')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-gray-600 hover:bg-gray-50">数据中心</button>
            <button onClick={() => onNavigate?.('dev')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-gray-600 hover:bg-gray-50">开发环境</button>
            <button onClick={() => onNavigate?.('model')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-gray-600 hover:bg-gray-50">模型中心</button>
            <button onClick={() => onNavigate?.('app')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-gray-600 hover:bg-gray-50">AI应用</button>
            <button onClick={() => onNavigate?.('cloud')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-gray-600 hover:bg-gray-50">云服务</button>
            <button onClick={() => onNavigate?.('compute')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-gray-600 hover:bg-gray-50">算力中心</button>
            <button onClick={() => onNavigate?.('admin')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all bg-blue-50 text-blue-700">平台管理</button>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="全局搜索..." className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-gray-400" />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors border border-gray-200/60 hover:border-gray-300">
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">管理文档</span>
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </button>
          </div>
        </header>

        <div className="p-6 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-1 mb-6 bg-white rounded-xl p-1 border border-gray-100 shadow-sm w-fit">
            {subNavItems.map((item) => (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                <item.icon className="w-4 h-4" />{item.label}
              </button>
            ))}
          </div>

          {activeTab === 'users' && renderUsers()}
          {activeTab === 'roles' && renderRoles()}
          {activeTab === 'resources' && renderPlaceholder('资源配置', '管理资源配额、调度策略、存储配置等')}
          {activeTab === 'billing' && renderBilling()}
          {activeTab === 'logs' && renderPlaceholder('操作日志', '查看用户操作记录、系统日志、审计日志')}
          {activeTab === 'settings' && renderPlaceholder('系统设置', '平台基础配置、邮件通知、安全策略等')}
        </div>
      </main>
    </div>
  );
}
