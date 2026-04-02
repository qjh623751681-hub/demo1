import React, { useState } from 'react';
import {
  Box,
  Activity,
  BarChart3,
  Server,
  Network,
  Grid,
  FileText,
  Layers,
  Workflow,
  LineChart,
  PieChart,
  Route,
  AlignJustify,
  Settings,
  Plus,
  Search,
  Upload,
  Copy,
  ExternalLink,
  Rocket,
  Play,
  Pause,
  Eye
} from 'lucide-react';

const mainModules = [
  { id: 'registry', label: '模型仓库', icon: Box },
  { id: 'training', label: '训练任务', icon: Activity },
  { id: 'evaluation', label: '评测中心', icon: BarChart3 },
  { id: 'inference', label: '推理服务', icon: Server },
  { id: 'gateway', label: '模型网关', icon: Network },
];

const subModules = {
  registry: [
    { id: 'garden', label: '模型花园', icon: Grid },
    { id: 'detail', label: '模型详情', icon: FileText },
  ],
  training: [
    { id: 'templates', label: '模板库', icon: Layers },
    { id: 'canvas', label: '编排画布', icon: Workflow },
    { id: 'monitor', label: '任务监控', icon: LineChart },
  ],
  evaluation: [
    { id: 'benchmarks', label: '基准测试', icon: BarChart3 },
    { id: 'create', label: '创建任务', icon: Plus },
    { id: 'report', label: '评测报告', icon: PieChart },
  ],
  inference: [
    { id: 'services', label: '服务列表', icon: Server },
    { id: 'config', label: '服务配置', icon: Settings },
    { id: 'traffic', label: '流量管理', icon: Route },
  ],
  gateway: [
    { id: 'list', label: '接入列表', icon: AlignJustify },
    { id: 'config', label: '接入配置', icon: Settings },
  ],
};

interface ModelCenterProps {
  onNavigate?: (page: string) => void;
}

export default function ModelCenter({ onNavigate }: ModelCenterProps) {
  const [activeModule, setActiveModule] = useState('registry');
  const [activeSubModule, setActiveSubModule] = useState('garden');

  const StatusBadge = ({ status, size = 'md' }: { status: string; size?: 'sm' | 'md' }) => {
    const configs: Record<string, { text: string; color: string }> = {
      running: { text: '运行中', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
      training: { text: '训练中', color: 'bg-blue-50 text-blue-600 border-blue-200' },
      stopped: { text: '已停止', color: 'bg-gray-100 text-gray-600 border-gray-200' },
      completed: { text: '已完成', color: 'bg-purple-50 text-purple-600 border-purple-200' },
    };
    const config = configs[status] || { text: status, color: 'bg-gray-100 text-gray-600 border-gray-200' };
    const padding = size === 'sm' ? 'px-1.5 py-0.5 text-xs' : 'px-2 py-0.5 text-sm';
    return <span className={`rounded-full border ${padding} ${config.color}`}>{config.text}</span>;
  };

  const currentSubModules = subModules[activeModule as keyof typeof subModules] || [];

  const renderModelGarden = () => (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">模型花园</h2>
          <p className="text-sm text-gray-500 mt-1">共找到 6 个模型</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="搜索模型..." className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
            <Upload className="w-4 h-4" />上传模型
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Llama-3-70B-Instruct', logo: '🦙', version: 'v1.3.5', params: '70B', status: 'running', mmlu: 82.3, size: '140GB', calls: 12580, stars: 342, tags: ['LLM', '对话', '开源'] },
          { name: 'Qwen-72B-Chat', logo: '🀄', version: 'v2.5', params: '72B', status: 'running', mmlu: 80.1, size: '145GB', calls: 8920, stars: 256, tags: ['LLM', '中文', '多模态'] },
        ].map((model, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5 group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center text-2xl">
                  {model.logo}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer" onClick={() => setActiveSubModule('detail')}>
                    {model.name}
                  </h3>
                  <p className="text-sm text-gray-500">Latest: {model.version}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={model.status} size="sm" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <div className="relative flex-1 group">
                <button className="w-full py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Rocket className="w-4 h-4" />
                  部署
                </button>
              </div>
              <button className="px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 text-sm rounded-lg transition-colors">
                评测
              </button>
              <button className="px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 text-sm rounded-lg transition-colors">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    if (activeModule === 'registry' && activeSubModule === 'garden') return renderModelGarden();
    return (
      <div className="p-6">
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🚧</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">功能开发中</h3>
          <p className="text-gray-500">该功能正在开发中，敬请期待</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <div className="w-64 bg-white border-r border-gray-100 shadow-sm flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">模型中心</h2>
          <p className="text-xs text-gray-500 mt-1">模型全生命周期管理</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-2">
          {mainModules.map((module) => {
            const Icon = module.icon;
            const isActive = activeModule === module.id;
            return (
              <button
                key={module.id}
                onClick={() => {
                  setActiveModule(module.id);
                  setActiveSubModule(subModules[module.id as keyof typeof subModules][0].id);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{module.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
      <div className="w-48 bg-gray-50 border-r border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            {mainModules.find(m => m.id === activeModule)?.label}
          </h3>
        </div>
        <nav className="flex-1 overflow-y-auto p-2">
          {currentSubModules.map((subModule) => {
            const Icon = subModule.icon;
            const isActive = activeSubModule === subModule.id;
            return (
              <button
                key={subModule.id}
                onClick={() => setActiveSubModule(subModule.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                  isActive
                    ? 'bg-white text-blue-600 shadow-sm font-medium'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{subModule.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
      <div className="flex-1 overflow-y-auto bg-gray-50/50">
        {renderCurrentPage()}
      </div>
    </div>
  );
}