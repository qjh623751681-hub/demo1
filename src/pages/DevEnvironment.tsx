import React, { useState } from 'react';
import {
  LayoutDashboard, Database, Code2, Brain, Sparkles, Cloud, Cpu, Settings,
  Search, Bell, Plus, ChevronRight, MoreVertical, Terminal, Folder, FileCode,
  Play, Pause, RefreshCw, GitBranch, Clock, HardDrive, MemoryStick, Monitor,
  Zap, ExternalLink, HelpCircle, FolderGit, Box, Layers, Server, Activity
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: '工作台' },
  { icon: Database, label: '数据中心' },
  { icon: Code2, label: '开发环境', active: true },
  { icon: Brain, label: '模型中心' },
  { icon: Sparkles, label: 'AI应用' },
  { icon: Cloud, label: '云服务' },
  { icon: Cpu, label: '算力中心' },
  { icon: Settings, label: '平台管理' },
];

const subNavItems = [
  { id: 'notebooks', label: 'Notebook', icon: Terminal },
  { id: 'projects', label: '项目空间', icon: FolderGit },
  { id: 'images', label: '镜像管理', icon: Box },
  { id: 'workflows', label: '工作流', icon: GitBranch },
];

// Notebook实例数据
const notebookData = [
  { id: 1, name: '实验-034-Llama微调', image: 'pytorch:2.1-cuda12.1', resource: 'A100 x 1', status: 'running', duration: '2小时34分', lastActivity: '10分钟前', owner: '张三' },
  { id: 2, name: '数据预处理-notebook', image: 'python:3.9-data', resource: 'CPU x 4', status: 'stopped', duration: '-', lastActivity: '昨天', owner: '李四' },
  { id: 3, name: '模型评测-ResNet50', image: 'tensorflow:2.15-gpu', resource: 'T4 x 1', status: 'running', duration: '5小时12分', lastActivity: '1小时前', owner: '王五' },
  { id: 4, name: '探索性数据分析', image: 'jupyter:scipy', resource: 'CPU x 2', status: 'running', duration: '45分钟', lastActivity: '5分钟前', owner: '赵六' },
];

// 项目空间数据
const projectData = [
  { id: 1, name: '大模型微调项目', description: '基于Llama-3的垂直领域微调', members: 5, notebooks: 3, datasets: 8, lastActivity: '2小时前' },
  { id: 2, name: '图像识别实验', description: '目标检测模型训练与优化', members: 3, notebooks: 2, datasets: 5, lastActivity: '昨天' },
  { id: 3, name: '推荐系统研发', description: '多模态推荐算法研究', members: 8, notebooks: 6, datasets: 12, lastActivity: '3天前' },
];

// 镜像数据
const imageData = [
  { id: 1, name: 'pytorch:2.1-cuda12.1', type: '官方', size: '8.5GB', tags: ['PyTorch', 'CUDA', 'GPU'], pulls: 12580, updated: '2周前' },
  { id: 2, name: 'tensorflow:2.15-gpu', type: '官方', size: '6.2GB', tags: ['TensorFlow', 'GPU', 'Keras'], pulls: 8920, updated: '1月前' },
  { id: 3, name: 'custom-llm-dev:v1.2', type: '自定义', size: '12.8GB', tags: ['LLM', 'Transformers', 'Deepspeed'], pulls: 345, updated: '3天前', owner: '张三' },
  { id: 4, name: 'jupyter:scipy', type: '官方', size: '3.1GB', tags: ['Jupyter', 'SciPy', '数据分析'], pulls: 5620, updated: '2月前' },
];

export default function DevEnvironment({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [activeTab, setActiveTab] = useState('notebooks');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const getStatusBadge = (status: string) => {
    const configs: { [key: string]: { text: string; color: string } } = {
      running: { text: '运行中', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
      stopped: { text: '已停止', color: 'bg-gray-100 text-gray-600 border-gray-200' },
      pending: { text: '启动中', color: 'bg-amber-50 text-amber-600 border-amber-200' },
    };
    const config = configs[status];
    return <span className={`px-2 py-0.5 text-xs rounded-full border ${config.color}`}>{config.text}</span>;
  };

  const renderNotebooks = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
            <Plus className="w-4 h-4" />启动Notebook
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl transition-colors">
            <Terminal className="w-4 h-4" />终端
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="搜索Notebook..." className="pl-10 pr-4 py-2 w-64 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Notebook实例</h3>
          <span className="text-sm text-gray-500">共 {notebookData.length} 个实例</span>
        </div>
        <div className="divide-y divide-gray-50">
          {notebookData.map((nb) => (
            <div key={nb.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                    <Terminal className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{nb.name}</h4>
                    <p className="text-sm text-gray-500">镜像: {nb.image}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(nb.status)}
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-500 ml-13">
                <span className="flex items-center gap-1.5"><Server className="w-4 h-4" />{nb.resource}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{nb.status === 'running' ? `已运行 ${nb.duration}` : '已停止'}</span>
                <span className="flex items-center gap-1.5"><Activity className="w-4 h-4" />最近活动: {nb.lastActivity}</span>
                <span>所有者: {nb.owner}</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">打开Jupyter</button>
                {nb.status === 'running' ? (
                  <button className="px-3 py-1.5 text-sm text-amber-600 hover:bg-amber-50 rounded-lg transition-colors flex items-center gap-1"><Pause className="w-3.5 h-3.5" />暂停</button>
                ) : (
                  <button className="px-3 py-1.5 text-sm text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-1"><Play className="w-3.5 h-3.5" />启动</button>
                )}
                <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">详情</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
          <Plus className="w-4 h-4" />创建项目
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {projectData.map((project) => (
          <div key={project.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <FolderGit className="w-6 h-6 text-purple-600" />
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{project.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1.5"><UsersIcon count={project.members} />{project.members} 成员</span>
              <span className="flex items-center gap-1.5"><Terminal className="w-4 h-4" />{project.notebooks} Notebooks</span>
              <span className="flex items-center gap-1.5"><DatabaseIcon />{project.datasets} 数据集</span>
            </div>
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400">最近活动: {project.lastActivity}</span>
              <button className="text-sm text-blue-600 hover:text-blue-700">进入项目 →</button>
            </div>
          </div>
        ))}
        <button className="border-2 border-dashed border-gray-200 rounded-2xl p-5 flex flex-col items-center justify-center text-gray-400 hover:border-blue-300 hover:text-blue-600 transition-colors min-h-[200px]">
          <Plus className="w-8 h-8 mb-2" />
          <span className="font-medium">创建新项目</span>
        </button>
      </div>
    </div>
  );

  const renderImages = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
            <Plus className="w-4 h-4" />构建镜像
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl transition-colors">
            <Box className="w-4 h-4" />从仓库导入
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="搜索镜像..." className="pl-10 pr-4 py-2 w-64 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">镜像列表</h3>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            <button className="px-3 py-1.5 text-sm font-medium bg-white rounded-md shadow-sm">全部</button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700">官方</button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700">自定义</button>
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {imageData.map((img) => (
            <div key={img.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Box className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{img.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {img.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <span className={`px-2.5 py-1 text-xs rounded-full ${img.type === '官方' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                  {img.type}
                </span>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-500 ml-13">
                <span><HardDrive className="w-4 h-4 inline mr-1" />{img.size}</span>
                <span><RefreshCw className="w-4 h-4 inline mr-1" />{img.pulls.toLocaleString()} 次拉取</span>
                <span>更新于 {img.updated}</span>
                {img.owner && <span>所有者: {img.owner}</span>}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">启动Notebook</button>
                <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">查看详情</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWorkflows = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
          <Plus className="w-4 h-4" />创建工作流
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
        <GitBranch className="w-16 h-16 text-gray-200 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">工作流功能开发中</h3>
        <p className="text-gray-500">基于DAG的开发工作流编排，支持代码版本管理、自动化测试、持续集成</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 flex font-sans">
      {/* 左侧边栏 */}
      <aside className="w-16 bg-white border-r border-gray-200/80 flex flex-col items-center py-4 fixed h-full z-20 shadow-sm">
        <div className="mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Zap className="w-6 h-6 text-white" />
          </div>
        </div>
        <nav className="flex-1 flex flex-col gap-0.5 w-full px-2">
          {navItems.map((item, index) => {
            const handleClick = () => {
              if (item.label === '工作台') onNavigate?.('dashboard');
              else if (item.label === '数据中心') onNavigate?.('datacenter');
              else if (item.label === '模型中心') onNavigate?.('model');
              else if (item.label === 'AI应用') onNavigate?.('app');
              else if (item.label === '云服务') onNavigate?.('cloud');
              else if (item.label === '算力中心') onNavigate?.('compute');
              else if (item.label === '平台管理') onNavigate?.('admin');
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

      {/* 主内容区 */}
      <main className="flex-1 ml-16 min-w-0">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200/80 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">首页</span>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <span className="text-gray-900 font-semibold">开发环境</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="全局搜索..." className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-gray-400" />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors border border-gray-200/60 hover:border-gray-300">
              <FileCode className="w-4 h-4" />
              <span className="text-sm font-medium">开发文档</span>
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

          {activeTab === 'notebooks' && renderNotebooks()}
          {activeTab === 'projects' && renderProjects()}
          {activeTab === 'images' && renderImages()}
          {activeTab === 'workflows' && renderWorkflows()}
        </div>
      </main>
    </div>
  );
}

// 辅助图标组件
const UsersIcon = ({ count }: { count: number }) => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const DatabaseIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>
);
