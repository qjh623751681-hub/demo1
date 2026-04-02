import React, { useState } from 'react';
import {
  LayoutDashboard, Database, Code2, Brain, Sparkles, Cloud, Cpu, Settings,
  Search, Plus, ChevronRight, Filter, Rocket, Upload, Clock, MoreVertical,
  ExternalLink, FileText, Grid, Layers, Workflow, LineChart, BarChart, PieChart,
  Server, Route, AlignJustify, Box, Activity, BarChart3, Network, Star,
  CheckCircle2, Copy
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
  { id: 'detail', label: '模型详情', icon: FileText },
];

// 训练任务子模块
const trainingSubModules = [
  { id: 'templates', label: '模板库', icon: Layers },
  { id: 'canvas', label: '编排画布', icon: Workflow },
  { id: 'monitor', label: '任务监控', icon: LineChart },
];

// 评测中心子模块
const evaluationSubModules = [
  { id: 'benchmarks', label: '基准测试', icon: BarChart },
  { id: 'create', label: '创建任务', icon: Plus },
  { id: 'report', label: '评测报告', icon: PieChart },
];

// 推理服务子模块
const inferenceSubModules = [
  { id: 'services', label: '服务列表', icon: Server },
  { id: 'config', label: '服务配置', icon: Settings },
  { id: 'traffic', label: '流量管理', icon: Route },
];

// 模型网口子模块
const gatewaySubModules = [
  { id: 'list', label: '接入列表', icon: AlignJustify },
  { id: 'config', label: '接入配置', icon: Settings },
];

// 过滤选项
const filterOptions = {
  source: [
    { label: '平台训练（自研）', value: 'self' },
    { label: '第三方接入', value: 'third' },
    { label: '官方预置', value: 'official' },
    { label: '用户上传', value: 'user' },
  ],
  architecture: [
    { label: 'Llama', value: 'llama' },
    { label: 'Qwen', value: 'qwen' },
    { label: 'BERT', value: 'bert' },
    { label: 'Stable Diffusion', value: 'sd' },
    { label: '混合专家(MoE)', value: 'moe' },
  ],
  modality: [
    { label: '文本(NLP)', value: 'text' },
    { label: '多模态', value: 'multimodal' },
    { label: '语音(ASR/TTS)', value: 'speech' },
  ],
  sort: [
    { label: '调用次数', value: 'calls' },
    { label: '收藏数', value: 'stars' },
    { label: '更新时间', value: 'updated' },
  ]
};

// 模拟模型数据
const modelData = [
  {
    id: 1,
    name: 'Llama-3-70B-Instruct',
    logo: '🦙',
    architecture: 'llama',
    modality: 'text',
    version: 'v1.3.5',
    params: '70B',
    status: 'running',
    source: 'official',
    mmlu: 82.3,
    calls: 12580,
    stars: 342,
    size: '140GB',
    tags: ['LLM', '对话', '开源'],
    description: 'Meta官方开源大模型，支持多轮对话和复杂推理任务，性能卓越。'
  },
  {
    id: 2,
    name: 'Qwen-72B-Chat',
    logo: '🀄',
    architecture: 'qwen',
    modality: 'multimodal',
    version: 'v2.5',
    params: '72B',
    status: 'running',
    source: 'self',
    mmlu: 80.1,
    calls: 8920,
    stars: 256,
    size: '145GB',
    tags: ['LLM', '中文', '多模态'],
    description: '阿里云通义千问大模型，中文理解能力优秀，支持多模态输入输出。'
  },
  {
    id: 3,
    name: 'Stable Diffusion XL',
    logo: '🎨',
    architecture: 'sd',
    modality: 'multimodal',
    version: 'v1.0',
    params: '6.6B',
    status: 'running',
    source: 'official',
    calls: 15670,
    stars: 489,
    size: '10GB',
    tags: ['文生图', '生成式AI', '多模态'],
    description: '稳定性AI出品的文生图模型，生成图像质量高，支持个性化微调。'
  },
  {
    id: 4,
    name: 'BERT-Base-Chinese',
    logo: '📝',
    architecture: 'bert',
    modality: 'text',
    version: 'v1.0',
    params: '110M',
    status: 'running',
    source: 'official',
    mmlu: 65.2,
    calls: 5680,
    stars: 128,
    size: '400MB',
    tags: ['NLP', '预训练', '中文'],
    description: '哈工大讯飞联合实验室开源的中文BERT预训练模型，广泛用于各类NLP任务。'
  },
  {
    id: 5,
    name: 'Customer-Support-LLM',
    logo: '🤖',
    architecture: 'llama',
    modality: 'text',
    version: 'v0.3',
    params: '7B',
    status: 'training',
    source: 'user',
    calls: 156,
    stars: 12,
    size: '13GB',
    tags: ['微调', '客服', '私有'],
    description: '基于Llama3-7B微调的客服专用大模型，处理常见客户问题准确率92%。'
  },
  {
    id: 6,
    name: 'Whisper-Large-v3',
    logo: '🎤',
    architecture: 'moe',
    modality: 'speech',
    version: 'v3',
    params: '1.5B',
    status: 'running',
    source: 'official',
    calls: 3450,
    stars: 189,
    size: '6GB',
    tags: ['ASR', '语音识别', '多语言'],
    description: 'OpenAI开源的多语言语音识别模型，支持99种语言，准确率接近人类水平。'
  },
];

interface ModelCenterProps {
  onNavigate?: (page: string) => void;
}

export default function ModelCenter({ onNavigate }: ModelCenterProps) {
  // 导航状态
  const [activeModule, setActiveModule] = useState('registry');
  const [activeSubModule, setActiveSubModule] = useState('garden');
  const [searchKeyword, setSearchKeyword] = useState('');

  // 状态显示
  const getStatusBadge = (status: string, size: 'sm' | 'md' = 'md') => {
    const configs: { [key: string]: { text: string; color: string } } = {
      running: { text: '运行中', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
      training: { text: '训练中', color: 'bg-blue-50 text-blue-600 border-blue-200' },
      stopped: { text: '已停止', color: 'bg-gray-100 text-gray-600 border-gray-200' },
      paused: { text: '已暂停', color: 'bg-amber-50 text-amber-600 border-amber-200' },
      evaluating: { text: '评测中', color: 'bg-purple-50 text-purple-600 border-purple-200' },
      pending: { text: '待开始', color: 'bg-gray-100 text-gray-600 border-gray-200' },
      healthy: { text: '健康', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
      abnormal: { text: '异常', color: 'bg-red-50 text-red-600 border-red-200' },
    };
    const config = configs[status];
    const padding = size === 'sm' ? 'px-1.5 py-0.5 text-xs' : 'px-2 py-0.5 text-sm';
    return <span className={`rounded-full border ${padding} ${config.color}`}>{config.text}</span>;
  };

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

  // 渲染模型花园页面
  const renderModelGarden = () => (
    <div className="flex h-full">
      {/* 左侧筛选侧边栏 */}
      <div className="w-64 border-r border-gray-200 p-4 space-y-6">
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Filter className="w-4 h-4" />筛选条件
          </h3>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">来源</h4>
              <div className="space-y-1">
                {filterOptions.source.map((item) => (
                  <label key={item.value} className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">架构</h4>
              <div className="space-y-1">
                {filterOptions.architecture.map((item) => (
                  <label key={item.value} className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">模态</h4>
              <div className="space-y-1">
                {filterOptions.modality.map((item) => (
                  <label key={item.value} className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">排序</h4>
              <div className="space-y-1">
                {filterOptions.sort.map((item) => (
                  <label key={item.value} className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="radio" name="sort" className="border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked={item.value === 'updated'} />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button className="w-full py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
          应用筛选
        </button>
      </div>

      {/* 右侧瀑布流卡片 */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">模型花园</h2>
            <p className="text-sm text-gray-500 mt-1">共找到 {modelData.length} 个模型</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索模型..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
              <Upload className="w-4 h-4" />上传模型
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modelData.map((model) => (
            <div key={model.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5 group">
              {/* 卡片头部 */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center text-2xl">
                    {model.logo}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer">
                      {model.name}
                    </h3>
                    <p className="text-sm text-gray-500">Latest: {model.version}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(model.status, 'sm')}
                  <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 核心信息 */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">参数量</span>
                  <span className="font-medium text-gray-900">{model.params}</span>
                </div>
                {model.mmlu && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">MMLU得分</span>
                    <span className="font-medium text-green-600">{model.mmlu}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">文件大小</span>
                  <span className="font-medium text-gray-900">{model.size}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">调用次数</span>
                  <span className="font-medium text-gray-900">{model.calls.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">收藏数</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                    <span className="font-medium text-gray-900">{model.stars}</span>
                  </div>
                </div>
              </div>

              {/* 标签 */}
              <div className="flex flex-wrap gap-1 mb-4">
                {model.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* 操作按钮 */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1 group">
                  <button className="w-full py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    <Rocket className="w-4 h-4" />
                    部署
                  </button>
                  <div className="absolute top-full left-0 right-0 mt-1 hidden group-hover:block bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <button className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50">生产环境</button>
                    <button className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50">测试环境</button>
                  </div>
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
    </div>
  );

  // 渲染内容
  const renderContent = () => {
    if (activeModule === 'registry' && activeSubModule === 'garden') {
      return renderModelGarden();
    }
    
    return (
      <div className="p-6">
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🚧</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">功能开发中</h3>
          <p className="text-gray-500">正在按照企业级架构规范实现完整功能</p>
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
