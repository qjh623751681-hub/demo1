import React, { useState } from 'react';
import DatasetDetail from './pages/DatasetDetail';
import {
  LayoutDashboard, Database, Code2, Brain, Sparkles, Cloud, Cpu, Settings,
  Search, Bell, Plus, Upload, Folder, FileText, Image, Music, Video,
  MoreVertical, ChevronRight, ChevronDown, Grid, List, Filter,
  Download, Share2, Trash2, Copy, Move, Edit3, Check, X,
  Clock, HardDrive, Users, Tag, FileJson, FileArchive, FileCode,
  Play, Pause, RotateCcw, GitBranch, Layers, Eye, History,
  ArrowLeft, ArrowRight, RefreshCw, SortAsc, FolderOpen,
  Table, AlignLeft, Type, Scissors, Wand2, Workflow,
  CheckCircle2, AlertCircle, Loader2, BoxSelect, Terminal, ExternalLink, HelpCircle,
  Zap, BookOpen, Bot, BarChart3, Settings2, FileSearch, Sparkles as SparkleIcon,
  ChevronLeft, Info, ArrowUpRight, Zap as Lightning
} from 'lucide-react';

// 模拟文件数据
const fileData = [
  { id: 1, name: '企业培训文档', type: 'folder', size: '-', items: 12, updated: '2026-03-28 10:23', owner: '张三', tags: ['内部资料', '培训'] },
  { id: 2, name: '产品说明书', type: 'folder', size: '-', items: 8, updated: '2026-03-27 18:45', owner: '李四', tags: ['产品', '公开'] },
  { id: 3, name: 'instruction-set-v2.jsonl', type: 'json', size: '2.4GB', items: null, updated: '2026-03-28 09:15', owner: '张三', tags: ['训练数据'] },
  { id: 4, name: 'coco-2024-subset.zip', type: 'zip', size: '18.6GB', items: null, updated: '2026-03-26 14:30', owner: '王五', tags: ['归档'] },
  { id: 5, name: 'image-preprocess.py', type: 'code', size: '12KB', items: null, updated: '2026-03-25 11:20', owner: '张三', tags: [] },
  { id: 6, name: '模型评估结果', type: 'folder', size: '-', items: 8, updated: '2026-03-24 16:00', owner: '赵六', tags: [] },
  { id: 7, name: 'weibo-sentiment.csv', type: 'csv', size: '856MB', items: null, updated: '2026-03-23 09:45', owner: '李四', tags: ['待标注'] },
  { id: 8, name: 'audio-samples.zip', type: 'zip', size: '5.2GB', items: null, updated: '2026-03-22 20:10', owner: '王五', tags: [] },
];

const datasetData = [
  { id: 1, name: '企业培训知识库', type: 'text', format: 'JSONL', samples: 125000, size: '2.4GB', status: 'ready', updated: '2小时前', owner: '张三', tags: ['知识库', '培训'], description: '企业内部培训文档知识库', dataSource: '/企业培训文档' },
  { id: 2, name: 'COCO 2024 Subset', type: 'multimodal', subtype: 'image-text', format: 'COCO', samples: 50000, size: '18.6GB', status: 'ready', updated: '昨天', owner: '王五', tags: ['目标检测', '图像描述'], description: 'COCO数据集的子集，用于多模态模型训练', dataSource: '/产品说明书' },
  { id: 3, name: '客服对话数据集', type: 'text', format: 'JSON', samples: 45000, size: '320MB', status: 'ready', updated: '1周前', owner: '赵六', tags: ['对话', '意图识别'], description: '客服场景的多轮对话数据，包含意图和槽位标注', dataSource: '/weibo-sentiment.csv' },
  { id: 4, name: '语音合成语料库', type: 'multimodal', subtype: 'audio-text', format: 'Custom', samples: 12000, size: '45.2GB', status: 'ready', updated: '2周前', owner: '王五', tags: ['TTS', '音频'], description: '高质量中文语音合成数据，多人多风格', dataSource: '/audio-samples.zip' },
];

const processingTasks = [
  { id: 1, name: '企业培训文档.pdf', type: '文档解析', size: '15.2MB', status: 'waiting', uploaded: '2026-03-28 10:23' },
  { id: 2, name: '产品图片-001.png', type: 'OCR识别', size: '2.5MB', status: 'processing', progress: 45, uploaded: '2026-03-28 10:25' },
  { id: 3, name: '技术规范.pdf', type: '文档清洗', size: '12.0MB', status: 'completed', progress: 100, uploaded: '2026-03-28 10:20' },
  { id: 4, name: '产品说明书.docx', type: '文档解析', size: '8.5MB', status: 'processing', progress: 80, uploaded: '2026-03-28 10:22' },
];

const annotationTasks = [
  { id: 1, name: '客服意图识别', dataset: '客服对话数据集', type: '意图识别', progress: 65, total: 5000, completed: 3250, annotators: 3, deadline: '2026-04-10', status: 'running', aiEnabled: true, aiAccuracy: 82 },
  { id: 2, name: '文档分类标注', dataset: '企业培训知识库', type: '文本分类', progress: 78, total: 10000, completed: 7800, annotators: 5, deadline: '2026-04-05', status: 'running', aiEnabled: true, aiAccuracy: 85 },
  { id: 3, name: '产品图片标注', dataset: 'COCO 2024 Subset', type: '目标检测', progress: 100, total: 5000, completed: 5000, annotators: 8, deadline: '2026-03-25', status: 'reviewing', aiEnabled: false, aiAccuracy: 0 },
];

const pipelineData = [
  { id: 1, name: '文档处理流水线', description: '知识库构建标准流程', nodes: ['上传', '解析', '清洗', '分块', '向量化'], runs: 128, lastRun: '2小时前', status: 'running', progress: 65, processed: 1234, total: 1890 },
  { id: 2, name: '数据增强流水线', description: '同义词替换+回译', nodes: ['读取', '同义词', '回译', '去重', '写入'], runs: 56, lastRun: '昨天', status: 'paused', progress: 100, processed: 560, total: 560 },
  { id: 3, name: '图片处理流水线', description: '目标检测数据预处理', nodes: ['读取', '增强', '转换', '保存'], runs: 34, lastRun: '3天前', status: 'success', progress: 100, processed: 450, total: 450 },
];

const navItems = [
  { icon: LayoutDashboard, label: '工作台' },
  { icon: Database, label: '数据中心', active: true },
  { icon: Code2, label: '开发环境' },
  { icon: Brain, label: '模型中心' },
  { icon: Sparkles, label: 'AI应用' },
  { icon: Cloud, label: '云服务' },
  { icon: Cpu, label: '算力中心' },
  { icon: Settings, label: '平台管理' },
];

const subNavItems = [
  { id: 'files', label: '文件管理', icon: Folder },
  { id: 'processing', label: '数据处理', icon: FileSearch },
  { id: 'datasets', label: '数据集', icon: Database },
  { id: 'annotation', label: '数据标注', icon: Tag, external: true },
  { id: 'pipeline', label: '数据流水线', icon: Workflow },
];

interface DataCenterProps {
  onNavigate?: (page: 'dashboard' | 'datacenter' | 'annotation') => void;
}

export default function DataCenter({ onNavigate }: DataCenterProps) {
  const [activeTab, setActiveTab] = useState('files');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadScenario, setUploadScenario] = useState<'knowledge' | 'training' | 'analysis' | 'custom' | null>(null);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [showDatasetCreateModal, setShowDatasetCreateModal] = useState(false);
  const [showPipelineCreateModal, setShowPipelineCreateModal] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState<typeof datasetData[0] | null>(null);
  const [createStep, setCreateStep] = useState(1);
  const [selectedProcessingTask, setSelectedProcessingTask] = useState<typeof processingTasks[0] | null>(null);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'folder': return <Folder className="w-6 h-6 text-amber-500" />;
      case 'json': return <FileJson className="w-6 h-6 text-blue-500" />;
      case 'zip': return <FileArchive className="w-6 h-6 text-purple-500" />;
      case 'code': return <FileCode className="w-6 h-6 text-emerald-500" />;
      case 'csv': return <Table className="w-6 h-6 text-cyan-500" />;
      default: return <FileText className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: {[key: string]: string} = {
      ready: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      processing: 'bg-blue-50 text-blue-600 border-blue-200',
      running: 'bg-blue-50 text-blue-600 border-blue-200',
      reviewing: 'bg-purple-50 text-purple-600 border-purple-200',
      success: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      failed: 'bg-red-50 text-red-600 border-red-200',
      paused: 'bg-amber-50 text-amber-600 border-amber-200',
      waiting: 'bg-gray-50 text-gray-600 border-gray-200',
      completed: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    };
    const labels: {[key: string]: string} = {
      ready: '就绪', processing: '处理中', running: '运行中', reviewing: '审核中', success: '成功', failed: '失败', paused: '已暂停', waiting: '等待中', completed: '已完成'
    };
    return <span className={`px-2 py-0.5 text-xs rounded-full border ${styles[status] || styles.ready}`}>{labels[status] || status}</span>;
  };

  const renderFiles = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowUploadModal(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
            <Upload className="w-4 h-4" />上传文件
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl transition-colors">
            <Plus className="w-4 h-4" />新建文件夹
          </button>
          {selectedItems.length > 0 && (
            <div className="flex items-center gap-2 ml-4">
              <span className="text-sm text-gray-500">已选择 {selectedItems.length} 项</span>
              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>
            <List className="w-5 h-5" />
          </button>
          <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>
            <Grid className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-4 text-sm text-gray-500">
          <input type="checkbox" checked={selectedItems.length === fileData.length && fileData.length > 0} onChange={() => setSelectedItems(selectedItems.length === fileData.length ? [] : fileData.map(f => f.id))} className="rounded border-gray-300" />
          <span className="flex-1">名称</span>
          <span className="w-24 text-center">大小</span>
          <span className="w-20 text-center">文件数</span>
          <span className="w-40">修改时间</span>
          <span className="w-24">所有者</span>
          <span className="w-32">标签</span>
          <span className="w-10"></span>
        </div>
        <div className="divide-y divide-gray-50">
          {fileData.map((file) => (
            <div key={file.id} className="px-4 py-3 flex items-center gap-4 hover:bg-gray-50 transition-colors group">
              <input type="checkbox" checked={selectedItems.includes(file.id)} onChange={() => setSelectedItems(prev => prev.includes(file.id) ? prev.filter(i => i !== file.id) : [...prev, file.id])} className="rounded border-gray-300" />
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {getFileIcon(file.type)}
                <span className="font-medium text-gray-900 truncate">{file.name}</span>
                {file.type === 'folder' && <ChevronRight className="w-4 h-4 text-gray-400" />}
              </div>
              <span className="w-24 text-center text-sm text-gray-500">{file.size}</span>
              <span className="w-20 text-center text-sm text-gray-500">{file.items || '-'}</span>
              <span className="w-40 text-sm text-gray-500">{file.updated}</span>
              <span className="w-24 text-sm text-gray-500">{file.owner}</span>
              <span className="w-32 flex gap-1 flex-wrap">
                {file.tags.map((tag, idx) => <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{tag}</span>)}
              </span>
              <button className="w-10 p-2 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <HardDrive className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">已使用存储</div>
              <div className="text-xl font-bold text-gray-900">126.8 GB</div>
            </div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full w-[63%] bg-blue-500 rounded-full"></div></div>
          <div className="text-xs text-gray-400 mt-2">配额: 200 GB</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center">
              <Folder className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">文件夹</div>
              <div className="text-xl font-bold text-gray-900">24 个</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">文件</div>
              <div className="text-xl font-bold text-gray-900">1,286 个</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProcessing = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <FileSearch className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">待处理任务</div>
              <div className="text-xl font-bold text-gray-900">3 个</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <Play className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">处理中</div>
              <div className="text-xl font-bold text-gray-900">2 个</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">今日完成</div>
              <div className="text-xl font-bold text-gray-900">156 个</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">处理失败</div>
              <div className="text-xl font-bold text-gray-900">0 个</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">待处理任务</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
            <Settings2 className="w-4 h-4" />处理配置
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          {processingTasks.map((task) => (
            <div key={task.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{task.name}</h4>
                    <p className="text-sm text-gray-500">处理类型: {task.type} · 文件大小: {task.size}</p>
                  </div>
                </div>
                {getStatusBadge(task.status)}
              </div>
              {task.status === 'processing' && (
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>进度 {task.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${task.progress}%` }}></div>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">暂停</button>
                </div>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-500 mt-3">
                <span>上传时间: {task.uploaded}</span>
                <div className="flex gap-2">
                  <button onClick={() => setSelectedProcessingTask(task)} className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">查看详情</button>
                  <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">删除</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">处理中任务</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {processingTasks.filter(t => t.status === 'processing').map((task) => (
            <div key={task.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{task.name}</h4>
                    <p className="text-sm text-gray-500">处理类型: {task.type} · 文件大小: {task.size}</p>
                  </div>
                </div>
                {getStatusBadge(task.status)}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>进度 {task.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${task.progress}%` }}></div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">查看日志</button>
                  <button className="px-3 py-1.5 text-sm text-amber-600 hover:bg-amber-50 rounded-lg">暂停</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button className="text-sm text-gray-500 hover:text-gray-700">查看已完成的156个处理任务 →</button>
      </div>
    </div>
  );

  const renderDatasets = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowDatasetCreateModal(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
            <Plus className="w-4 h-4" />创建数据集
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="搜索数据集..." className="pl-10 pr-4 py-2 w-64 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500" />
          </div>
          <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-700">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">快速筛选：</span>
        {[
          { id: 'all', label: '全部', count: 4 },
          { id: 'knowledge', label: '知识库数据', count: 1 },
          { id: 'training', label: '训练数据', count: 2 },
          { id: 'test', label: '测试数据', count: 1 },
        ].map((filter) => (
          <button key={filter.id} className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            {filter.label} {filter.count}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {datasetData.map((dataset) => (
          <div
            key={dataset.id}
            onClick={() => setSelectedDataset(dataset)}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${dataset.type === 'text' ? 'bg-blue-50' : 'bg-purple-50'}`}>
                  {dataset.type === 'text' ? <AlignLeft className="w-6 h-6 text-blue-600" /> : dataset.subtype === 'image-text' ? <Image className="w-6 h-6 text-purple-600" /> : <Music className="w-6 h-6 text-purple-600" />}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{dataset.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{dataset.description}</p>
                </div>
              </div>
              {getStatusBadge(dataset.status)}
            </div>
            <div className="grid grid-cols-4 gap-4 py-3 border-y border-gray-100 my-3">
              <div className="text-center"><div className="text-lg font-bold text-gray-900">{dataset.samples.toLocaleString()}</div><div className="text-xs text-gray-500">样本数</div></div>
              <div className="text-center"><div className="text-lg font-bold text-gray-900">{dataset.size}</div><div className="text-xs text-gray-500">大小</div></div>
              <div className="text-center"><div className="text-lg font-bold text-gray-900">{dataset.format}</div><div className="text-xs text-gray-500">格式</div></div>
              <div className="text-center"><div className="text-lg font-bold text-gray-900">{dataset.updated}</div><div className="text-xs text-gray-500">更新</div></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {dataset.tags.map((tag, idx) => <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{tag}</span>)}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => e.stopPropagation()} className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">预览</button>
                <button onClick={(e) => e.stopPropagation()} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">管理</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnnotation = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <BoxSelect className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">12,450</div>
              <div className="text-sm text-gray-500">今日标注</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">89.2%</div>
              <div className="text-sm text-gray-500">质检通过率</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">16</div>
              <div className="text-sm text-gray-500">标注人员</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">5</div>
              <div className="text-sm text-gray-500">进行中</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">标注任务</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
            <Plus className="w-4 h-4" />新建任务
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          {annotationTasks.map((task) => (
            <div key={task.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{task.name}</h4>
                  <p className="text-sm text-gray-500 mt-0.5">数据集: {task.dataset} · 类型: {task.type}</p>
                  {task.aiEnabled && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full">AI预标注启用</span>
                      <span className="text-xs text-gray-500">准确率: {task.aiAccuracy}%</span>
                    </div>
                  )}
                </div>
                {getStatusBadge(task.status)}
              </div>
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>进度 {task.progress}%</span>
                    <span>{task.completed.toLocaleString()} / {task.total.toLocaleString()} 条</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${task.progress}%` }}></div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" />{task.annotators} 人</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />截止 {task.deadline}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">查看详情</button>
                  {task.status === 'reviewing' && <button className="px-3 py-1.5 text-sm text-emerald-600 hover:bg-emerald-50 rounded-lg">开始审核</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPipeline = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowPipelineCreateModal(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
            <Plus className="w-4 h-4" />创建流水线
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl transition-colors">
            <Layers className="w-4 h-4" />模板市场
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
        <h3 className="font-semibold text-gray-900 mb-4">快速开始</h3>
        <div className="grid grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/30 transition-colors text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-medium text-gray-900">知识库构建</span>
            </div>
            <p className="text-sm text-gray-500">文档解析 → 清洗 → 分块 → 向量化</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/30 transition-colors text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-purple-600" />
              </div>
              <span className="font-medium text-gray-900">模型训练</span>
            </div>
            <p className="text-sm text-gray-500">数据增强 → 标注 → 训练 → 评估</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/30 transition-colors text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="font-medium text-gray-900">数据清洗</span>
            </div>
            <p className="text-sm text-gray-500">去重 → 去噪 → 标准化 → 验证</p>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {pipelineData.map((pipeline) => (
          <div key={pipeline.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center">
                <Workflow className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Play className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{pipeline.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{pipeline.description}</p>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">{pipeline.nodes.join(' → ')}</span>
            </div>
            {pipeline.status === 'running' && (
              <>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>进度 {pipeline.progress}%</span>
                  <span>{pipeline.processed}/{pipeline.total}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pipeline.progress}%` }}></div>
                </div>
              </>
            )}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="text-gray-500"><span className="font-medium text-gray-900">{pipeline.runs}</span> 次运行</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500">{pipeline.lastRun}</span>
              </div>
              {getStatusBadge(pipeline.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {selectedDataset ? (
        <DatasetDetail
          dataset={{
            ...selectedDataset,
            dataSource: selectedDataset.dataSource || '/训练数据集',
          }}
          onBack={() => setSelectedDataset(null)}
        />
      ) : (
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
                const isWorkspace = item.label === '工作台';
                const handleClick = () => { if (isWorkspace && onNavigate) onNavigate('dashboard'); };
                return (
                  <button
                    key={index}
                    onClick={handleClick}
                    className={`group relative w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-200 ${item.active ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}
                  >
                    <item.icon className="w-5 h-5" strokeWidth={item.active ? 2 : 1.5} />
                    {item.active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-blue-600 rounded-r-full"></div>}
                    <span className="absolute left-full ml-3 px-2.5 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-lg">
                      {item.label}
                      <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                    </span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* 主内容区 */}
          <main className="flex-1 ml-16 min-w-0">
            {/* Header */}
            <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200/80 flex items-center justify-between px-6 sticky top-0 z-10">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">首页</span>
                <ChevronRight className="w-4 h-4 text-gray-300" />
                <span className="text-gray-400">数据中心</span>
                <ChevronRight className="w-4 h-4 text-gray-300" />
                <span className="text-gray-900 font-semibold">
                  {activeTab === 'files' && '文件管理'}
                  {activeTab === 'processing' && '数据处理'}
                  {activeTab === 'datasets' && '数据集'}
                  {activeTab === 'annotation' && '数据标注'}
                  {activeTab === 'pipeline' && '数据流水线'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="全局搜索..." className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-gray-400" />
                </div>
                <button className="relative p-2.5 text-gray-500 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-200">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>
                <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                  <div className="text-right hidden sm:block">
                    <div className="text-sm font-semibold text-gray-900">产品经理</div>
                    <div className="text-xs text-gray-500">管理员</div>
                  </div>
                  <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-md ring-2 ring-white">PM</div>
                </div>
              </div>
            </header>

            {/* 子导航 + 内容 */}
            <div className="p-6 max-w-[1600px] mx-auto">
              <div className="flex items-center gap-1 mb-6 bg-white rounded-xl p-1 border border-gray-100 shadow-sm w-fit">
                {subNavItems.map((item) => {
                  const handleClick = () => {
                    if (item.id === 'annotation' && item.external) {
                      onNavigate?.('annotation');
                    } else {
                      setActiveTab(item.id);
                    }
                  };
                  return (
                    <button key={item.id} onClick={handleClick} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                      <item.icon className="w-4 h-4" />{item.label}
                    </button>
                  );
                })}
              </div>

              {activeTab === 'files' && renderFiles()}
              {activeTab === 'processing' && renderProcessing()}
              {activeTab === 'datasets' && renderDatasets()}
              {activeTab === 'annotation' && renderAnnotation()}
              {activeTab === 'pipeline' && renderPipeline()}
            </div>
          </main>
        </div>
      )}

      {/* 上传弹窗 */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[800px] max-w-[90vw]">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">数据上传</h3>
              <button onClick={() => setShowUploadModal(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              {!uploadScenario ? (
                <>
                  <p className="text-gray-500 mb-4">您想做什么？</p>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <button onClick={() => setUploadScenario('knowledge')} className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/30 transition-all text-left">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="font-semibold text-gray-900 mb-1">构建知识库</div>
                      <div className="text-sm text-gray-500">文档向量化 · 快速检索</div>
                    </button>
                    <button onClick={() => setUploadScenario('training')} className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50/30 transition-all text-left">
                      <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-3">
                        <Bot className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="font-semibold text-gray-900 mb-1">训练模型</div>
                      <div className="text-sm text-gray-500">数据标注 · 模型微调</div>
                    </button>
                    <button onClick={() => setUploadScenario('analysis')} className="p-6 border-2 border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50/30 transition-all text-left">
                      <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-3">
                        <BarChart3 className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div className="font-semibold text-gray-900 mb-1">数据分析</div>
                      <div className="text-sm text-gray-500">数据统计 · 报表生成</div>
                    </button>
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <button onClick={() => setUploadScenario('custom')} className="text-sm text-gray-500 hover:text-gray-700">或者自定义上传 →</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <button onClick={() => setUploadScenario(null)} className="text-sm text-gray-500 hover:text-gray-700">
                      <ChevronLeft className="w-4 h-4 inline" />返回
                    </button>
                    <span className="font-semibold text-gray-900">
                      {uploadScenario === 'knowledge' && '构建企业知识库'}
                      {uploadScenario === 'training' && '训练模型数据准备'}
                      {uploadScenario === 'analysis' && '数据分析'}
                      {uploadScenario === 'custom' && '自定义上传'}
                    </span>
                  </div>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-blue-300 hover:bg-blue-50/30 transition-colors cursor-pointer mb-6">
                    <Upload className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-900 font-medium">点击或拖拽文件到此处上传</p>
                    <p className="text-sm text-gray-500 mt-1">支持单个文件最大 50GB</p>
                    <div className="flex items-center justify-center gap-2 mt-4">
                      {['PDF', 'Word', 'Excel', 'TXT', '图片'].map(f => <span key={f} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{f}</span>)}
                    </div>
                  </div>
                  {uploadScenario === 'knowledge' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-blue-900 mb-1">上传后自动处理</div>
                          <div className="text-sm text-blue-700">文档解析（提取文本、表格）→ 智能分段（按章节）→ 元数据提取 → 向量化生成</div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-500 block mb-1.5">目标存储空间</label>
                      <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                        <option>企业存储空间A</option>
                        <option>企业存储空间B</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 block mb-1.5">标签</label>
                      <div className="flex items-center gap-2">
                        {['内部资料', '培训'].map(tag => (
                          <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">{tag}</span>
                        ))}
                        <button className="px-3 py-1 border border-dashed border-gray-300 text-gray-500 text-sm rounded-full hover:border-blue-500 hover:text-blue-600 transition-colors">
                          + 添加标签
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
              <button onClick={() => setShowUploadModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">取消</button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">开始上传</button>
            </div>
          </div>
        </div>
      )}

      {/* 数据处理配置弹窗 */}
      {showProcessingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[600px] max-w-[90vw]">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">处理配置</h3>
              <button onClick={() => setShowProcessingModal(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <SparkleIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-blue-900 mb-1">推荐方案：标准知识库处理</div>
                    <div className="text-sm text-blue-700">文档解析（智能提取）→ 智能分段（512字/块）→ 元数据提取 → 向量化生成（bge-large-zh）</div>
                    <div className="mt-2 text-xs text-blue-600">预计效果：检索准确率85%+ | 预计耗时：3-5分钟/文档</div>
                  </div>
                </div>
                <button className="mt-3 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                  使用此方案
                </button>
              </div>
              <div className="text-center">
                <button onClick={() => setShowProcessingModal(false)} className="text-sm text-gray-500 hover:text-gray-700">
                  自定义配置 →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 数据集创建弹窗 */}
      {showDatasetCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[700px] max-w-[90vw] max-h-[90vh] overflow-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="font-semibold text-gray-900">
                {createStep === 1 && '创建数据集 - 步骤 1/4'}
                {createStep === 2 && '创建数据集 - 步骤 2/4'}
                {createStep === 3 && '创建数据集 - 步骤 3/4'}
                {createStep === 4 && '创建数据集 - 步骤 4/4'}
              </h3>
              <button onClick={() => setShowDatasetCreateModal(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              {createStep === 1 && (
                <>
                  <div className="mb-4">
                    <label className="text-sm text-gray-500 block mb-2">选择数据来源</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['从文件管理选择', '从处理完成的任务选择', '手动添加数据'].map((source, idx) => (
                        <button key={idx} className={`p-4 border rounded-xl text-left transition-all ${idx === 0 ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                          <div className="font-medium text-gray-900 mb-1">{source}</div>
                          <div className="text-xs text-gray-500">
                            {idx === 0 && '从已上传的文件中选择'}
                            {idx === 1 && '选择处理完成的数据'}
                            {idx === 2 && '手动输入或上传'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-2">已选择的数据</label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-gray-400" />
                          <span className="text-sm text-gray-900">企业培训文档.pdf (已处理)</span>
                        </div>
                        <button className="text-gray-400 hover:text-red-600">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-gray-400" />
                          <span className="text-sm text-gray-900">产品说明书.docx (已处理)</span>
                        </div>
                        <button className="text-gray-400 hover:text-red-600">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <button className="mt-3 text-sm text-blue-600 hover:text-blue-700">+ 添加更多数据</button>
                  </div>
                </>
              )}
              {createStep === 2 && (
                <>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-500 block mb-1.5">数据集名称</label>
                      <input type="text" value="企业培训知识库" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 block mb-1.5">数据集描述</label>
                      <textarea rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="描述数据集的内容和用途..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-500 block mb-1.5">数据集类型</label>
                        <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                          <option>文档数据集</option>
                          <option>图像数据集</option>
                          <option>多模态数据集</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500 block mb-1.5">数据分类</label>
                        <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                          <option>培训文档</option>
                          <option>产品文档</option>
                          <option>技术文档</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 block mb-1.5">用途</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                          <span className="text-sm text-gray-700">用于构建知识库</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span className="text-sm text-gray-700">用于模型训练</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span className="text-sm text-gray-700">用于模型评估</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {createStep === 3 && (
                <>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-500 block mb-2">数据分块</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button className="p-3 border border-blue-500 bg-blue-50 rounded-xl text-left">
                          <div className="font-medium text-gray-900 mb-1">智能分段</div>
                          <div className="text-xs text-gray-500">按段落/章节分段</div>
                        </button>
                        <button className="p-3 border border-gray-200 rounded-xl text-left hover:border-gray-300">
                          <div className="font-medium text-gray-900 mb-1">固定长度分段</div>
                          <div className="text-xs text-gray-500">固定字符数</div>
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-500 block mb-1.5">分块大小</label>
                        <input type="number" defaultValue={500} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                      </div>
                      <div>
                        <label className="text-sm text-gray-500 block mb-1.5">重叠度</label>
                        <input type="number" defaultValue={50} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 block mb-2">元数据提取</label>
                      <div className="space-y-2">
                        {['提取标题', '提取作者', '提取日期', '提取关键词'].map((item, idx) => (
                          <label key={idx} className="flex items-center gap-2">
                            <input type="checkbox" defaultChecked={idx < 3} className="rounded border-gray-300" />
                            <span className="text-sm text-gray-700">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
              {createStep === 4 && (
                <>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">数据集名称</span>
                          <span className="text-gray-900 font-medium">企业培训知识库</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">数据来源</span>
                          <span className="text-gray-900">2个文档</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">用途</span>
                          <span className="text-gray-900">用于构建知识库</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">处理规则</span>
                          <span className="text-gray-900">智能分段、提取元数据</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 block mb-2">预计数据量</label>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-gray-900">3</div>
                          <div className="text-xs text-gray-500">文档数</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-gray-900">1,256</div>
                          <div className="text-xs text-gray-500">分块数</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-gray-900">15.2GB</div>
                          <div className="text-xs text-gray-500">预计大小</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 block mb-2">创建后自动</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                          <span className="text-sm text-gray-700">添加到知识库</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span className="text-sm text-gray-700">立即开始向量索引</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between sticky bottom-0 bg-white">
              <button onClick={() => setCreateStep(Math.max(1, createStep - 1))} disabled={createStep === 1} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                上一步
              </button>
              <div className="flex items-center gap-2">
                {createStep === 4 ? (
                  <button onClick={() => setShowDatasetCreateModal(false)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
                    创建数据集
                  </button>
                ) : (
                  <button onClick={() => setCreateStep(createStep + 1)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
                    下一步
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 流水线创建弹窗 */}
      {showPipelineCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[900px] max-w-[90vw] max-h-[90vh] overflow-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="font-semibold text-gray-900">创建流水线</h3>
              <button onClick={() => setShowPipelineCreateModal(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <label className="text-sm text-gray-500 block mb-2">流水线名称</label>
                <input type="text" placeholder="输入流水线名称..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
              </div>
              <div className="mb-6">
                <label className="text-sm text-gray-500 block mb-2">流水线描述</label>
                <textarea rows={2} placeholder="描述流水线的用途..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
              </div>
              <div className="mb-6">
                <label className="text-sm text-gray-500 block mb-2">可视化编排</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
                  <Workflow className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-900 font-medium">拖拽节点到此处编排流水线</p>
                  <p className="text-sm text-gray-500 mt-1">或选择模板快速开始</p>
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm">上传节点</button>
                    <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm">解析节点</button>
                    <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm">清洗节点</button>
                    <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm">写入节点</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end sticky bottom-0 bg-white">
              <button onClick={() => setShowPipelineCreateModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                取消
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
                保存流水线
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
