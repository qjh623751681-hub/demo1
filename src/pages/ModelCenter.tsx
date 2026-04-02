import React, { useState } from 'react';
import {
  LayoutDashboard, Database, Code2, Brain, Sparkles, Cloud, Cpu, Settings,
  Search, Plus, ChevronRight, Filter, Rocket, Upload, Clock, MoreVertical,
  ExternalLink, FileText, Grid, Layers, Workflow, LineChart, BarChart, PieChart,
  Server, Route, AlignJustify, Box, Activity, BarChart3, Network
} from 'lucide-react';

// 主模块导航
const mainModules = [
  { id: 'registry', label: '模型仓库', icon: Box },
  { id: 'training', label: '训练任务', icon: Activity },
  { id: 'evaluation', label: '评测中心', icon: BarChart3 },
  { id: 'inference', label: '推理服务', icon: Server },
  { id: 'gateway', label: '模型网关', icon: Network },
];

// 模型仓库子模块
const registrySubModules = [
  { id: 'garden', label: '模型花园', icon: Grid },
];

// 训练任务子模块
const trainingSubModules = [
  { id: 'templates', label: '模板库', icon: Layers },
];

// 评测中心子模块
const evaluationSubModules = [
  { id: 'benchmarks', label: '基准测试', icon: BarChart },
];

// 推理服务子模块
const inferenceSubModules = [
  { id: 'services', label: '服务列表', icon: Server },
];

// 模型网口子模块
const gatewaySubModules = [
  { id: 'list', label: '接入列表', icon: AlignJustify },
];

interface ModelCenterProps {
  onNavigate?: (page: string) => void;
}

export default function ModelCenter({ onNavigate }: ModelCenterProps) {
  const [activeModule, setActiveModule] = useState('registry');
  const [activeSubModule, setActiveSubModule] = useState('garden');

  // 获取子模块列表
  const getSubModules = () => {
    switch (activeModule) {
      case 'registry': return registrySubModules;
      case 'training': return trainingSubModules;
      case 'evaluation': return evaluationSubModules;
      case 'inference': return inferenceSubModules;
      case 'gateway': return gatewaySubModules;
      default: return [];
    }
  };

  // 渲染内容
  const renderContent = () => {
    return (
      <div className="p-6">
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">模型中心重构中</h3>
          <p className="text-gray-500">正在按照企业级架构规范实现完整功能</p>
          <p className="text-sm text-blue-600 mt-4">已完成的模块：模型花园 / 训练模板 / 评测基准 / 推理服务 / 模型网关</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-200/80 flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">首页</span>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <span className="text-gray-900 font-semibold">模型中心</span>
        </div>

        {/* 平台模块快速导航 */}
        <div className="flex-1 flex items-center justify-center gap-1">
          <button onClick={() => onNavigate?.('dashboard')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-gray-600 hover:bg-gray-50">工作台</button>
          <button onClick={() => onNavigate?.('datacenter')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-gray-600 hover:bg-gray-50">数据中心</button>
          <button onClick={() => onNavigate?.('dev')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-gray-600 hover:bg-gray-50">开发环境</button>
          <button onClick={() => onNavigate?.('model')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all bg-blue-50 text-blue-700">模型中心</button>
          <button onClick={() => onNavigate?.('app')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-gray-600 hover:bg-gray-50">AI应用</button>
          <button onClick={() => onNavigate?.('cloud')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-gray-600 hover:bg-gray-50">云服务</button>
          <button onClick={() => onNavigate?.('compute')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-gray-600 hover:bg-gray-50">算力中心</button>
          <button onClick={() => onNavigate?.('admin')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-gray-600 hover:bg-gray-50">平台管理</button>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="全局搜索..." className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-gray-400" />
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <div className="flex-1 pt-16 flex">
        {/* 左侧主模块导航 */}
        <div className="w-48 border-r border-gray-200 bg-white p-4 space-y-1">
          {mainModules.map((module) => (
            <button
              key={module.id}
              onClick={() => {
                setActiveModule(module.id);
                setActiveSubModule(getSubModules()[0]?.id || '');
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeModule === module.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <module.icon className="w-4 h-4" />
              {module.label}
            </button>
          ))}
        </div>

        {/* 中间子模块导航 */}
        <div className="w-48 border-r border-gray-200 bg-gray-50 p-4 space-y-1">
          {getSubModules().map((subModule) => (
            <button
              key={subModule.id}
              onClick={() => setActiveSubModule(subModule.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeSubModule === subModule.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <subModule.icon className="w-4 h-4" />
              {subModule.label}
            </button>
          ))}
        </div>

        {/* 右侧内容区 */}
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
