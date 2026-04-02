import React, { useState } from 'react';
import {
  LayoutDashboard, Database, Code2, Brain, Sparkles, Cloud, Cpu, Settings,
  Search, Bell, Plus, ChevronRight, MoreVertical, GitBranch, Clock, HardDrive,
  Download, Upload, Play, Pause, Trash2, Copy, Star, Zap, ExternalLink,
  FileText, Image, BarChart3, Activity, CheckCircle2, AlertCircle, Layers,
  Terminal, Box, Server, TrendingUp, Filter
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: '工作台' },
  { icon: Database, label: '数据中心' },
  { icon: Code2, label: '开发环境' },
  { icon: Brain, label: '模型中心', active: true },
  { icon: Sparkles, label: 'AI应用' },
  { icon: Cloud, label: '云服务' },
  { icon: Cpu, label: '算力中心' },
  { icon: Settings, label: '平台管理' },
];

const subNavItems = [
  { id: 'models', label: '模型仓库', icon: Box },
  { id: 'training', label: '训练任务', icon: Activity },
  { id: 'evaluation', label: '模型评测', icon: BarChart3 },
  { id: 'deployment', label: '模型部署', icon: Server },
];

// 模型仓库数据
const modelData = [
  { id: 1, name: 'Llama-3-70B-Instruct', source: 'Meta官方', version: 'v1.0', size: '140GB', downloads: 12580, rating: 4.9, tags: ['LLM', '对话', '开源'], status: 'published' },
  { id: 2, name: 'Qwen-72B-Chat', source: '阿里云', version: 'v2.5', size: '145GB', downloads: 8920, rating: 4.8, tags: ['LLM', '中文', '多模态'], status: 'published' },
  { id: 3, name: 'ResNet-50-v2', source: '自定义', version: 'v1.2', size: '98MB', downloads: 3420, rating: 4.7, tags: ['CV', '分类', 'ImageNet'], status: 'published', owner: '张三' },
  { id: 4, name: 'BERT-Base-Chinese', source: '哈工大', version: 'v1.0', size: '400MB', downloads: 5680, rating: 4.6, tags: ['NLP', '预训练', '中文'], status: 'published' },
  { id: 5, name: 'Customer-Support-LLM', source: '自定义', version: 'v0.3', size: '8.5GB', downloads: 156, rating: 0, tags: ['微调', '客服', '私有'], status: 'training', owner: '李四' },
];

// 训练任务数据
const trainingData = [
  { id: 1, name: 'Llama-3-70B微调-v3', model: 'Llama-3-70B', dataset: 'instruction-set-v2', status: 'running', progress: 78, gpu: 'A100 x 8', duration: '5小时12分', loss: 0.823, lr: '1e-5' },
  { id: 2, name: 'Stable-Diffusion-XL训练', model: 'SDXL-Base', dataset: 'custom-art-50k', status: 'running', progress: 45, gpu: 'A100 x 4', duration: '8小时36分', loss: 0.156, lr: '5e-6' },
  { id: 3, name: 'ResNet50图像分类', model: 'ResNet-50', dataset: 'ImageNet-1K', status: 'completed', progress: 100, gpu: 'A100 x 2', duration: '12小时', loss: 0.023, lr: '1e-4' },
  { id: 4, name: 'BERT情感分析微调', model: 'BERT-Base', dataset: 'weibo-sentiment', status: 'failed', progress: 67, gpu: 'A100 x 2', duration: '2小时18分', loss: null, lr: '2e-5', error: 'CUDA OOM at step 15234' },
];

// 模型评测数据
const evaluationData = [
  { id: 1, model: 'Llama-3-70B微调-v3', dataset: 'C-Eval', metrics: { accuracy: 78.5, f1: 76.2, bleu: 42.1 }, status: 'completed', createdAt: '2小时前' },
  { id: 2, model: 'Qwen-72B-Chat', dataset: 'CMMLU', metrics: { accuracy: 82.3, f1: 80.1, rouge: 38.5 }, status: 'completed', createdAt: '昨天' },
  { id: 3, model: 'Customer-Support-LLM', dataset: '自定义测试集', metrics: { accuracy: 0, f1: 0, bleu: 0 }, status: 'running', progress: 45, createdAt: '1小时前' },
];

// 部署服务数据
const deploymentData = [
  { id: 1, name: 'llm-chat-api-prod', model: 'Llama-3-70B-Instruct', version: 'v1.0', instances: 2, status: 'running', qps: '1.2k', latency: '45ms', calls: '2.4M' },
  { id: 2, name: 'image-classification', model: 'ResNet-50-v2', version: 'v1.2', instances: 3, status: 'running', qps: '856', latency: '32ms', calls: '568K' },
  { id: 3, name: 'customer-bot-test', model: 'Customer-Support-LLM', version: 'v0.2', instances: 1, status: 'stopped', qps: '-', latency: '-', calls: '12K' },
];

export default function ModelCenter({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [activeTab, setActiveTab] = useState('models');

  const getStatusBadge = (status: string) => {
    const configs: { [key: string]: { text: string; color: string } } = {
      published: { text: '已发布', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
      training: { text: '训练中', color: 'bg-blue-50 text-blue-600 border-blue-200' },
      running: { text: '运行中', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
      completed: { text: '已完成', color: 'bg-purple-50 text-purple-600 border-purple-200' },
      failed: { text: '失败', color: 'bg-red-50 text-red-600 border-red-200' },
      stopped: { text: '已停止', color: 'bg-gray-100 text-gray-600 border-gray-200' },
    };
    const config = configs[status];
    return <span className={`px-2 py-0.5 text-xs rounded-full border ${config.color}`}>{config.text}</span>;
  };

  const renderModels = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
            <Upload className="w-4 h-4" />上传模型
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl transition-colors">
            <GitBranch className="w-4 h-4" />模型对比
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="搜索模型..." className="pl-10 pr-4 py-2 w-64 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500" />
          </div>
          <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-700">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {modelData.map((model) => (
          <div key={model.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center">
                  <Box className="w-6 h-6 text-violet-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{model.name}</h3>
                  <p className="text-sm text-gray-500">{model.source} · v{model.version}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {getStatusBadge(model.status)}
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {model.tags.map((tag, idx) => (
                <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{tag}</span>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-3 py-3 border-y border-gray-100 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{model.size}</div>
                <div className="text-xs text-gray-500">大小</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{(model.downloads / 1000).toFixed(1)}k</div>
                <div className="text-xs text-gray-500">下载</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{model.rating > 0 ? model.rating : '-'}</div>
                <div className="text-xs text-gray-500">评分</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{model.status === 'training' ? '训练中' : '就绪'}</div>
                <div className="text-xs text-gray-500">状态</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">详情</button>
                <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" />下载
                </button>
              </div>
              {model.status !== 'training' && (
                <button className="px-3 py-1.5 text-sm text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                  部署服务
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTraining = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
            <Plus className="w-4 h-4" />创建训练任务
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl transition-colors">
            <Layers className="w-4 h-4" />训练模板
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">训练任务列表</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {trainingData.map((task) => (
            <div key={task.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold text-gray-900">{task.name}</h4>
                  {getStatusBadge(task.status)}
                </div>
                <div className="flex items-center gap-2">
                  {task.status === 'running' && (
                    <button className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg">
                      <Pause className="w-4 h-4" />
                    </button>
                  )}
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-4 text-sm mb-3">
                <div><span className="text-gray-500">基础模型：</span><span className="text-gray-900">{task.model}</span></div>
                <div><span className="text-gray-500">数据集：</span><span className="text-gray-900">{task.dataset}</span></div>
                <div><span className="text-gray-500">资源：</span><span className="text-gray-900">{task.gpu}</span></div>
                <div><span className="text-gray-500">时长：</span><span className="text-gray-900">{task.duration}</span></div>
                {task.loss && <div><span className="text-gray-500">Loss：</span><span className="text-gray-900">{task.loss}</span></div>}
                <div><span className="text-gray-500">LR：</span><span className="text-gray-900">{task.lr}</span></div>
              </div>
              {task.status === 'running' && (
                <div className="flex items-center gap-4">
                  <div className="flex-1 max-w-xs">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>进度 {task.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${task.progress}%` }} />
                    </div>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700">查看日志</button>
                </div>
              )}
              {task.error && (
                <div className="mt-2 px-3 py-2 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />{task.error}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEvaluation = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
          <Plus className="w-4 h-4" />创建评测任务
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">评测记录</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {evaluationData.map((evalItem) => (
            <div key={evalItem.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{evalItem.model}</h4>
                  <p className="text-sm text-gray-500">评测数据集：{evalItem.dataset}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(evalItem.status)}
                  <span className="text-sm text-gray-400">{evalItem.createdAt}</span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                {Object.entries(evalItem.metrics).map(([key, value]) => (
                  <div key={key} className="text-center px-4 py-2 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">{value > 0 ? value.toFixed(1) : '-'}</div>
                    <div className="text-xs text-gray-500 uppercase">{key}</div>
                  </div>
                ))}
                <div className="flex-1" />
                <button className="text-sm text-blue-600 hover:text-blue-700">查看报告</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDeployment = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
          <Plus className="w-4 h-4" />部署新服务
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {deploymentData.map((deploy) => (
          <div key={deploy.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                <Server className="w-6 h-6 text-emerald-600" />
              </div>
              {getStatusBadge(deploy.status)}
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{deploy.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{deploy.model} v{deploy.version}</p>
            <div className="grid grid-cols-3 gap-2 text-center py-3 border-y border-gray-100 mb-4">
              <div>
                <div className="text-lg font-bold text-gray-900">{deploy.instances}</div>
                <div className="text-xs text-gray-500">实例</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">{deploy.qps}</div>
                <div className="text-xs text-gray-500">QPS</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">{deploy.latency}</div>
                <div className="text-xs text-gray-500">延迟</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{deploy.calls} 次调用</span>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">详情</button>
                <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">API</button>
              </div>
            </div>
          </div>
        ))}
        <button className="border-2 border-dashed border-gray-200 rounded-2xl p-5 flex flex-col items-center justify-center text-gray-400 hover:border-blue-300 hover:text-blue-600 transition-colors min-h-[200px]">
          <Plus className="w-8 h-8 mb-2" />
          <span className="font-medium">部署新服务</span>
        </button>
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
              else if (item.label === '开发环境') onNavigate?.('dev');
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
            <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors border border-gray-200/60 hover:border-gray-300">
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">模型文档</span>
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

          {activeTab === 'models' && renderModels()}
          {activeTab === 'training' && renderTraining()}
          {activeTab === 'evaluation' && renderEvaluation()}
          {activeTab === 'deployment' && renderDeployment()}
        </div>
      </main>
    </div>
  );
}
