import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Database, 
  Code2, 
  Brain, 
  Sparkles, 
  Cloud, 
  Cpu, 
  Settings,
  Search,
  Bell,
  Plus,
  Upload,
  BookOpen,
  Rocket,
  ChevronRight,
  Clock,
  MoreHorizontal,
  FolderHeart,
  History,
  Bot,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Play,
  Pause,
  FileCode,
  Database as DatabaseIcon,
  AppWindow,
  BarChart3,
  Zap,
  FileText,
  HelpCircle,
  ExternalLink,
  Terminal,
  Layers,
  Activity,
  TrendingUp,
  Archive,
  Star,
  Clock3,
  ChevronDown,
  X,
  Lightbulb,
  ArrowRight,
  CpuIcon,
  HardDrive,
  Server
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line
} from 'recharts';

// 模拟数据
const resourceCards = [
  { 
    title: '算力配额', 
    used: 1250, 
    total: 2000, 
    unit: 'GPU卡时',
    percent: 62,
    icon: CpuIcon,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    trend: '-12%'
  },
  { 
    title: '数据资产', 
    used: 12, 
    total: 50, 
    unit: '数据集',
    size: '2.4TB',
    icon: DatabaseIcon,
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    trend: '+3'
  },
  { 
    title: '模型资产', 
    used: 8, 
    total: 20, 
    unit: '模型',
    versions: 23,
    icon: Brain,
    color: 'from-violet-500 to-violet-600',
    bgColor: 'bg-violet-50',
    textColor: 'text-violet-600',
    trend: '+1'
  },
  { 
    title: 'AI应用', 
    used: 3, 
    total: 5, 
    unit: '运行中',
    icon: AppWindow,
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-600',
    trend: '正常'
  },
];

const todos = [
  { id: 1, type: 'error', title: '训练任务异常', desc: 'Llama-3微调任务失败', time: '5分钟前', icon: AlertCircle },
  { id: 2, type: 'warning', title: '资源申请待审批', desc: '申请8卡A100集群', time: '1小时前', icon: Clock },
  { id: 3, type: 'info', title: '系统维护通知', desc: '今晚22:00-23:00例行维护', time: '3小时前', icon: Bell },
];

const quickActions = [
  { title: '开始实验', desc: '启动Notebook', icon: BookOpen, color: 'bg-blue-500', hoverColor: 'hover:bg-blue-600' },
  { title: '启动训练', desc: '提交训练任务', icon: Play, color: 'bg-violet-500', hoverColor: 'hover:bg-violet-600' },
  { title: '部署服务', desc: '发布推理服务', icon: Rocket, color: 'bg-emerald-500', hoverColor: 'hover:bg-emerald-600' },
  { title: '创建智能体', desc: '配置AI应用', icon: Bot, color: 'bg-amber-500', hoverColor: 'hover:bg-amber-600' },
];

const activeTasks = [
  { 
    id: 1, 
    name: '实验-notebook-034', 
    type: 'notebook',
    typeLabel: 'Notebook',
    status: 'running',
    progress: 100,
    resource: 'A100 x 1',
    chip: 'NVIDIA A100',
    time: '2小时34分',
    startTime: '2026-03-28 08:05',
    user: '张三',
    image: 'pytorch:2.1-cuda12.1',
    icon: BookOpen
  },
  { 
    id: 2, 
    name: 'Llama-3-70B微调-v3', 
    type: 'training',
    typeLabel: '训练任务',
    status: 'running',
    progress: 78,
    resource: 'A100 x 8',
    chip: 'NVIDIA A100',
    time: '5小时12分',
    startTime: '2026-03-28 05:27',
    eta: '预计还需 1小时28分',
    user: '李四',
    dataset: 'instruction-set-v2',
    loss: '0.823',
    lr: '1e-5',
    icon: Play
  },
  { 
    id: 3, 
    name: '图像识别推理服务', 
    type: 'inference',
    typeLabel: '推理服务',
    status: 'running',
    progress: 100,
    resource: 'T4 x 2',
    chip: 'NVIDIA T4',
    time: '3天',
    qps: '1.2k',
    latency: '45ms',
    user: '王五',
    model: 'ResNet50-v2',
    replicas: 2,
    requests: '2.4M',
    icon: Activity
  },
  { 
    id: 4, 
    name: '客服机器人-生产版', 
    type: 'agent',
    typeLabel: '智能体',
    status: 'running',
    progress: 100,
    resource: '昇腾910 x 1',
    chip: '华为昇腾910',
    time: '7天',
    calls: '45.2k',
    user: '赵六',
    llm: 'Qwen-72B',
    avgResponse: '2.3s',
    satisfaction: '94%',
    icon: Bot
  },
  { 
    id: 5, 
    name: 'Stable Diffusion XL训练', 
    type: 'training',
    typeLabel: '训练任务',
    status: 'running',
    progress: 45,
    resource: 'A100 x 4',
    chip: 'NVIDIA A100',
    time: '8小时36分',
    startTime: '2026-03-28 01:55',
    eta: '预计还需 10小时',
    user: '张三',
    dataset: 'custom-art-50k',
    loss: '0.156',
    lr: '5e-6',
    icon: Play
  },
  { 
    id: 6, 
    name: '数据预处理-pipeline-089', 
    type: 'training',
    typeLabel: '流水线任务',
    status: 'queued',
    progress: 0,
    resource: 'CPU x 16',
    chip: 'Intel Xeon',
    time: '排队中',
    queuePosition: 3,
    eta: '预计15分钟后开始',
    user: '李四',
    steps: '清洗 → 标注 → 转换',
    icon: Loader2
  },
  { 
    id: 7, 
    name: '文档问答助手-测试版', 
    type: 'agent',
    typeLabel: '智能体',
    status: 'running',
    progress: 100,
    resource: '寒武纪MLU370 x 1',
    chip: '寒武纪MLU370',
    time: '12小时',
    calls: '1.8k',
    user: '王五',
    llm: 'ChatGLM3-6B',
    avgResponse: '1.8s',
    documents: 128,
    icon: Bot
  },
  { 
    id: 8, 
    name: 'OCR识别服务-v2', 
    type: 'inference',
    typeLabel: '推理服务',
    status: 'running',
    progress: 100,
    resource: '海光DCU x 2',
    chip: '海光DCU',
    time: '1天',
    qps: '856',
    latency: '62ms',
    user: '赵六',
    model: 'PaddleOCR-v4',
    replicas: 2,
    requests: '568K',
    icon: Activity
  },
  { 
    id: 9, 
    name: 'BERT-Base情感分析微调', 
    type: 'training',
    typeLabel: '训练任务',
    status: 'failed',
    progress: 67,
    resource: 'A100 x 2',
    chip: 'NVIDIA A100',
    time: '已运行 2小时18分',
    startTime: '2026-03-28 08:10',
    user: '张三',
    dataset: 'weibo-sentiment',
    error: 'CUDA OOM at step 15234',
    icon: AlertCircle
  },
  { 
    id: 10, 
    name: '语音识别ASR-demo', 
    type: 'inference',
    typeLabel: '推理服务',
    status: 'running',
    progress: 100,
    resource: '昇腾310 x 4',
    chip: '华为昇腾310',
    time: '5天',
    qps: '320',
    latency: '128ms',
    user: '李四',
    model: 'Whisper-large-v3',
    replicas: 4,
    requests: '892K',
    icon: Activity
  },
];

const efficiencyData = [
  { day: '周一', gpu: 45, cpu: 32 },
  { day: '周二', gpu: 52, cpu: 38 },
  { day: '周三', gpu: 48, cpu: 35 },
  { day: '周四', gpu: 68, cpu: 42 },
  { day: '周五', gpu: 72, cpu: 45 },
  { day: '周六', gpu: 65, cpu: 40 },
  { day: '周日', gpu: 58, cpu: 38 },
];

const recentActivities = [
  { id: 1, title: '启动了 Notebook "实验-034"', module: '开发环境', time: '10分钟前', icon: BookOpen, color: 'text-blue-500' },
  { id: 2, title: '提交了训练任务 "Llama-3微调"', module: '模型中心', time: '1小时前', icon: Play, color: 'text-violet-500' },
  { id: 3, title: '部署了推理服务 "图像识别-v2"', module: 'AI应用', time: '3小时前', icon: Rocket, color: 'text-emerald-500' },
  { id: 4, title: '上传了数据集 "COCO-2024-subset"', module: '数据中心', time: '昨天', icon: Upload, color: 'text-cyan-500' },
  { id: 5, title: '创建了智能体 "文档助手"', module: 'AI应用', time: '昨天', icon: Bot, color: 'text-amber-500' },
];

const favorites = [
  { name: 'ImageNet-1K', type: '数据集', module: '数据中心', icon: DatabaseIcon, color: 'bg-cyan-50 text-cyan-600' },
  { name: 'ResNet-50-v2', type: '模型', module: '模型中心', icon: Brain, color: 'bg-violet-50 text-violet-600' },
  { name: '训练环境配置', type: '模板', module: '开发环境', icon: FileCode, color: 'bg-blue-50 text-blue-600' },
  { name: '客服机器人-v1', type: '智能体', module: 'AI应用', icon: Bot, color: 'bg-amber-50 text-amber-600' },
  { name: '数据预处理脚本', type: 'Notebook', module: '开发环境', icon: BookOpen, color: 'bg-purple-50 text-purple-600' },
];

const navItems = [
  { icon: LayoutDashboard, label: '工作台', active: true },
  { icon: Database, label: '数据中心' },
  { icon: Code2, label: '开发环境' },
  { icon: Brain, label: '模型中心' },
  { icon: Sparkles, label: 'AI应用' },
  { icon: Cloud, label: '云服务' },
  { icon: Cpu, label: '算力中心' },
  { icon: Settings, label: '平台管理' },
];

interface AIPlatformDashboardProps {
  onNavigate?: (page: 'dashboard' | 'datacenter') => void;
}

export default function AIPlatformDashboard({ onNavigate }: AIPlatformDashboardProps) {
  const [activeTab, setActiveTab] = useState('全部');
  const [showGuide, setShowGuide] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const taskTabs = ['全部', 'Notebook', '训练任务', '推理服务', '智能体'];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'running': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'queued': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'failed': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'notebook': return 'bg-blue-100 text-blue-700';
      case 'training': return 'bg-violet-100 text-violet-700';
      case 'inference': return 'bg-emerald-100 text-emerald-700';
      case 'agent': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex font-sans">
      {/* 左侧边栏 */}
      <aside className="w-16 bg-white border-r border-gray-200/80 flex flex-col items-center py-4 fixed h-full z-20 shadow-sm">
        {/* Logo */}
        <div className="mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Zap className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 flex flex-col gap-0.5 w-full px-2">
          {navItems.map((item, index) => {
            const isDatacenter = item.label === '数据中心';
            
            const handleClick = () => {
              if (isDatacenter && onNavigate) {
                onNavigate('datacenter');
              }
            };
            
            return (
              <button
                key={index}
                onClick={handleClick}
                className={`group relative w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-200 ${
                  item.active 
                    ? 'bg-blue-50 text-blue-600 shadow-sm' 
                    : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                }`}
              >
                <item.icon className="w-5 h-5" strokeWidth={item.active ? 2 : 1.5} />
                {item.active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-blue-600 rounded-r-full"></div>
                )}
                {/* Tooltip */}
                <span className="absolute left-full ml-3 px-2.5 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-lg">
                  {item.label}
                  <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                </span>
              </button>
            );
          })}
        </nav>

        {/* 底部帮助 */}
        <div className="mt-auto pt-4 border-t border-gray-100 w-full px-2 space-y-1">
          <button className="w-full aspect-square rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
          <button className="w-full aspect-square rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-md">
              PM
            </div>
          </button>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="flex-1 ml-16 min-w-0">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200/80 flex items-center justify-between px-6 sticky top-0 z-10">
          {/* 面包屑 */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">首页</span>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <span className="text-gray-900 font-semibold">工作台</span>
          </div>

          {/* 右侧操作区 */}
          <div className="flex items-center gap-3">
            {/* 搜索框 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索资源、任务、模型..."
                className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-gray-400"
              />
            </div>

            {/* 帮助文档 */}
            <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors border border-gray-200/60 hover:border-gray-300">
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">产品白皮书</span>
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </button>

            {/* 通知 */}
            <button className="relative p-2.5 text-gray-500 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-200">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>

            {/* 用户头像 */}
            <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-semibold text-gray-900">产品经理</div>
                <div className="text-xs text-gray-500">管理员</div>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-md ring-2 ring-white">
                PM
              </div>
            </div>
          </div>
        </header>

        {/* 页面内容 */}
        <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
          {/* 新手引导横幅 */}
          {showGuide && (
            <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-violet-50 border border-blue-100 rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <Lightbulb className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">👋 欢迎使用 AI 算力调度平台</h3>
                    <p className="text-sm text-gray-600 mt-1">4步快速开始：①上传数据 → ②启动环境 → ③训练模型 → ④部署应用</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm shadow-blue-500/20">
                    开始引导
                  </button>
                  <button 
                    onClick={() => setShowGuide(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 资源概览卡片 */}
          <div className="grid grid-cols-4 gap-4">
            {resourceCards.map((card, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 ${card.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <card.icon className={`w-5 h-5 ${card.textColor}`} />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    card.trend.startsWith('+') || card.trend === '正常' 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : 'bg-red-50 text-red-600'
                  }`}>
                    {card.trend}
                  </span>
                </div>
                <h3 className="text-sm text-gray-500 font-medium">{card.title}</h3>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-gray-900">{card.used}</span>
                  <span className="text-sm text-gray-400">/ {card.total} {card.unit}</span>
                </div>
                {card.size && <div className="text-xs text-gray-400 mt-1">{card.size}</div>}
                {card.versions && <div className="text-xs text-gray-400 mt-1">{card.versions} 个版本</div>}
                {/* 进度条 */}
                <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${card.color} transition-all duration-500`}
                    style={{ width: `${card.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* 主工作区：任务监控 + 侧边栏 */}
          <div className="grid grid-cols-3 gap-6">
            {/* 活跃任务监控 - 占2/3 */}
            <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Activity className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">活跃任务监控</h3>
                    <p className="text-xs text-gray-500 mt-0.5">实时运行中的 Notebook、训练任务、推理服务和智能体</p>
                  </div>
                </div>
                <div className="flex gap-1 bg-gray-100/80 p-1 rounded-xl">
                  {taskTabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                        activeTab === tab
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div className="divide-y divide-gray-50 max-h-[480px] overflow-y-auto">
                {activeTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="px-6 py-4 hover:bg-gray-50/50 transition-colors group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 ${getTypeStyle(task.type).replace('text-', 'bg-').replace('700', '50')} rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <task.icon className={`w-5 h-5 ${getTypeStyle(task.type).replace('bg-', '').replace('100', '600')}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        {/* 第一行：名称 + 标签 + 状态 */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-gray-900 text-sm">{task.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getTypeStyle(task.type)}`}>
                            {task.typeLabel}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusStyle(task.status)}`}>
                            {task.status === 'running' ? '运行中' : task.status === 'queued' ? '排队中' : task.status === 'failed' ? '失败' : '已完成'}
                          </span>
                          {task.chip && (
                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                              {task.chip}
                            </span>
                          )}
                        </div>
                        
                        {/* 第二行：核心指标 */}
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Server className="w-3.5 h-3.5" />
                            {task.resource}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock3 className="w-3.5 h-3.5" />
                            {task.status === 'queued' ? task.time : `运行 ${task.time}`}
                          </span>
                          {task.user && (
                            <span className="flex items-center gap-1">
                              <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white text-[8px]">
                                {task.user.charAt(0)}
                              </div>
                              {task.user}
                            </span>
                          )}
                          
                          {/* 类型特定指标 */}
                          {task.type === 'training' && task.loss && (
                            <span className="flex items-center gap-1 text-violet-600">
                              <BarChart3 className="w-3.5 h-3.5" />
                              Loss: {task.loss}
                            </span>
                          )}
                          {task.type === 'training' && task.lr && (
                            <span className="text-gray-400">LR: {task.lr}</span>
                          )}
                          {task.qps && (
                            <span className="flex items-center gap-1 text-emerald-600">
                              <TrendingUp className="w-3.5 h-3.5" />
                              QPS {task.qps}
                            </span>
                          )}
                          {task.latency && (
                            <span className="text-gray-400">延迟: {task.latency}</span>
                          )}
                          {task.calls && (
                            <span className="flex items-center gap-1 text-amber-600">
                              <Bot className="w-3.5 h-3.5" />
                              {task.calls} 次调用
                            </span>
                          )}
                          {task.replicas && (
                            <span className="text-gray-400">{task.replicas} 副本</span>
                          )}
                          {task.requests && (
                            <span className="text-gray-400">{task.requests} 请求</span>
                          )}
                          {task.avgResponse && (
                            <span className="text-gray-400">平均响应: {task.avgResponse}</span>
                          )}
                          {task.satisfaction && (
                            <span className="flex items-center gap-1 text-emerald-600">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              满意度 {task.satisfaction}
                            </span>
                          )}
                        </div>
                        
                        {/* 第三行：额外信息（数据集、模型、错误等） */}
                        {(task.dataset || task.model || task.image || task.llm || task.steps || task.error || task.eta || task.queuePosition) && (
                          <div className="mt-2 text-xs">
                            {task.dataset && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 rounded mr-2">
                                <DatabaseIcon className="w-3 h-3" />
                                {task.dataset}
                              </span>
                            )}
                            {task.model && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-violet-50 text-violet-600 rounded mr-2">
                                <Brain className="w-3 h-3" />
                                {task.model}
                              </span>
                            )}
                            {task.image && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded mr-2">
                                <Layers className="w-3 h-3" />
                                {task.image}
                              </span>
                            )}
                            {task.llm && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-600 rounded mr-2">
                                <Sparkles className="w-3 h-3" />
                                {task.llm}
                              </span>
                            )}
                            {task.steps && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-cyan-50 text-cyan-600 rounded mr-2">
                                <ArrowRight className="w-3 h-3" />
                                {task.steps}
                              </span>
                            )}
                            {task.documents && (
                              <span className="text-gray-400">{task.documents} 个文档</span>
                            )}
                            {task.eta && (
                              <span className="text-amber-600 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {task.eta}
                              </span>
                            )}
                            {task.queuePosition && (
                              <span className="text-amber-600">排队位置: #{task.queuePosition}</span>
                            )}
                            {task.error && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-600 rounded">
                                <AlertCircle className="w-3 h-3" />
                                {task.error}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* 右侧：进度条 + 操作 */}
                      <div className="flex items-center gap-3">
                        {task.status !== 'queued' && (
                          <div className="w-24">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-gray-500">进度</span>
                              <span className={`font-medium ${task.status === 'failed' ? 'text-red-600' : 'text-gray-900'}`}>{task.progress}%</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-500 ${
                                  task.status === 'failed' 
                                    ? 'bg-red-500' 
                                    : task.status === 'success'
                                    ? 'bg-emerald-500'
                                    : 'bg-gradient-to-r from-blue-500 to-blue-600'
                                }`}
                                style={{ width: `${task.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        {/* 操作按钮 */}
                        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="查看日志">
                            <Terminal className="w-4 h-4" />
                          </button>
                          {task.status === 'running' && (
                            <button className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="暂停">
                              <Pause className="w-4 h-4" />
                            </button>
                          )}
                          <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="停止">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/50">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  查看全部任务 <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 侧边栏 - 占1/3 */}
            <div className="space-y-6">
              {/* 待办与告警 */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <h3 className="font-semibold text-gray-900">待办与告警</h3>
                  </div>
                  <span className="text-xs font-medium px-2 py-0.5 bg-red-50 text-red-600 rounded-full">3</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {todos.map((todo) => (
                    <div key={todo.id} className="px-5 py-3.5 hover:bg-gray-50/50 cursor-pointer transition-colors">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          todo.type === 'error' ? 'bg-red-50' : 
                          todo.type === 'warning' ? 'bg-amber-50' : 'bg-blue-50'
                        }`}>
                          <todo.icon className={`w-4 h-4 ${
                            todo.type === 'error' ? 'text-red-500' : 
                            todo.type === 'warning' ? 'text-amber-500' : 'text-blue-500'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 text-sm">{todo.title}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{todo.desc}</div>
                          <div className="text-xs text-gray-400 mt-1">{todo.time}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 快速入口 */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500" />
                    <h3 className="font-semibold text-gray-900">快速入口</h3>
                  </div>
                </div>
                <div className="p-3 grid grid-cols-2 gap-2">
                  {quickActions.map((action, idx) => (
                    <button 
                      key={idx}
                      className="p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all text-left group"
                    >
                      <div className={`w-9 h-9 ${action.color} ${action.hoverColor} rounded-lg flex items-center justify-center mb-2 transition-colors`}>
                        <action.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="font-medium text-gray-900 text-sm">{action.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{action.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 底部区域：效率分析 + 最近动态 + 我的收藏 */}
          <div className="grid grid-cols-3 gap-6">
            {/* 资源效率分析 */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-violet-500" />
                  <h3 className="font-semibold text-gray-900">资源效率分析</h3>
                </div>
                <span className="text-xs text-gray-400">本周</span>
              </div>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={efficiencyData}>
                    <defs>
                      <linearGradient id="colorGpu" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#9ca3af'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#9ca3af'}} unit="%" />
                    <Tooltip 
                      contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                    />
                    <Area type="monotone" dataKey="gpu" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorGpu)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">本周平均利用率</span>
                  <span className="font-semibold text-gray-900">68%</span>
                </div>
                <div className="mt-2 flex items-start gap-2 text-xs text-emerald-600 bg-emerald-50 rounded-lg p-2">
                  <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>建议开启混合精度训练，可提升约 40% 效率</span>
                </div>
              </div>
            </div>

            {/* 最近动态 */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5 text-cyan-500" />
                  <h3 className="font-semibold text-gray-900">最近动态</h3>
                </div>
              </div>
              <div className="relative">
                <div className="absolute left-2 top-2 bottom-2 w-px bg-gray-100"></div>
                <div className="space-y-4">
                  {recentActivities.slice(0, 4).map((activity, idx) => (
                    <div key={activity.id} className="flex items-start gap-3 relative">
                      <div className="w-4 h-4 bg-white border-2 border-gray-200 rounded-full z-10 flex-shrink-0 mt-0.5"></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-900 leading-tight">{activity.title}</div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                          <span className={activity.color}>{activity.module}</span>
                          <span>·</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 我的收藏 */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  <h3 className="font-semibold text-gray-900">我的收藏</h3>
                </div>
                <button className="text-xs text-gray-400 hover:text-gray-600">管理</button>
              </div>
              <div className="space-y-2">
                {favorites.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group">
                    <div className={`w-9 h-9 ${item.color} rounded-lg flex items-center justify-center`}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm">{item.name}</div>
                      <div className="text-xs text-gray-400">{item.type} · {item.module}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}