import React, { useState, useRef } from 'react';
import {
  LayoutDashboard, Database, Code2, Brain, Sparkles, Cloud, Cpu, Settings,
  Search, Bell, Plus, Upload, Folder, FileText, Image, Music, Video,
  MoreVertical, ChevronRight, ChevronDown, Grid, List, Filter,
  Download, Share2, Trash2, Copy, Move, Edit3, Check, X,
  Clock, HardDrive, Users, Tag, FileJson, FileArchive, FileCode,
  Play, Pause, RotateCcw, GitBranch, Layers, Eye, History,
  ArrowLeft, ArrowRight, RefreshCw, SortAsc, FolderOpen,
  Table, AlignLeft, Type, Scissors, Wand2, Workflow,
  CheckCircle2, AlertCircle, Loader2, BoxSelect, Terminal, ExternalLink, HelpCircle
} from 'lucide-react';

// 模拟文件数据
const fileData = [
  { id: 1, name: '训练数据集', type: 'folder', size: '-', items: 12, updated: '2026-03-28 10:23', owner: '张三', tags: ['公开'] },
  { id: 2, name: '原始语料', type: 'folder', size: '-', items: 156, updated: '2026-03-27 18:45', owner: '李四', tags: ['敏感'] },
  { id: 3, name: 'instruction-set-v2.jsonl', type: 'json', size: '2.4GB', items: null, updated: '2026-03-28 09:15', owner: '张三', tags: ['训练中'] },
  { id: 4, name: 'coco-2024-subset.zip', type: 'zip', size: '18.6GB', items: null, updated: '2026-03-26 14:30', owner: '王五', tags: ['归档'] },
  { id: 5, name: 'image-preprocess.py', type: 'code', size: '12KB', items: null, updated: '2026-03-25 11:20', owner: '张三', tags: [] },
  { id: 6, name: '模型评估结果', type: 'folder', size: '-', items: 8, updated: '2026-03-24 16:00', owner: '赵六', tags: [] },
  { id: 7, name: 'weibo-sentiment.csv', type: 'csv', size: '856MB', items: null, updated: '2026-03-23 09:45', owner: '李四', tags: ['待标注'] },
  { id: 8, name: 'audio-samples.zip', type: 'zip', size: '5.2GB', items: null, updated: '2026-03-22 20:10', owner: '王五', tags: [] },
];

const datasetData = [
  { id: 1, name: 'Instruction Fine-tuning V2', type: 'text', format: 'JSONL', samples: 125000, size: '2.4GB', status: 'ready', updated: '2小时前', owner: '张三', tags: ['指令微调', '开源'], description: '基于开源指令数据集的清洗版本，用于大模型微调' },
  { id: 2, name: 'COCO 2024 Subset', type: 'multimodal', subtype: 'image-text', format: 'COCO', samples: 50000, size: '18.6GB', status: 'processing', updated: '昨天', owner: '王五', tags: ['目标检测', '图像描述'], description: 'COCO数据集的子集，用于多模态模型训练' },
  { id: 3, name: '微博情感分析语料', type: 'text', format: 'CSV', samples: 890000, size: '856MB', status: 'annotating', updated: '3天前', owner: '李四', tags: ['情感分析', '标注中'], description: '微博公开数据，正在进行情感标注' },
  { id: 4, name: '客服对话数据集', type: 'text', format: 'JSON', samples: 45000, size: '320MB', status: 'ready', updated: '1周前', owner: '赵六', tags: ['对话', '意图识别'], description: '客服场景的多轮对话数据，包含意图和槽位标注' },
  { id: 5, name: '语音合成语料库', type: 'multimodal', subtype: 'audio-text', format: 'Custom', samples: 12000, size: '45.2GB', status: 'ready', updated: '2周前', owner: '王五', tags: ['TTS', '音频'], description: '高质量中文语音合成数据，多人多风格' },
];

const annotationTasks = [
  { id: 1, name: '微博情感标注-第二轮', dataset: '微博情感分析语料', type: '文本分类', progress: 78, total: 10000, completed: 7800, annotators: 5, deadline: '2026-04-05', status: 'running' },
  { id: 2, name: '客服意图识别', dataset: '客服对话数据集', type: '意图识别', progress: 45, total: 5000, completed: 2250, annotators: 3, deadline: '2026-04-10', status: 'running' },
  { id: 3, name: 'COCO目标检测标注', dataset: 'COCO 2024 Subset', type: '目标检测', progress: 100, total: 5000, completed: 5000, annotators: 8, deadline: '2026-03-25', status: 'reviewing' },
];

const pipelineData = [
  { id: 1, name: '数据清洗-去重-分割', description: '标准训练数据准备流程', runs: 128, lastRun: '2小时前', status: 'success' },
  { id: 2, name: '图片增强与格式转换', description: '目标检测数据预处理', runs: 56, lastRun: '昨天', status: 'success' },
  { id: 3, name: '文本数据增强', description: '同义词替换+回译', runs: 34, lastRun: '3天前', status: 'failed' },
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
  { id: 'datasets', label: '数据集', icon: Database },
  { id: 'annotation', label: '数据标注', icon: Tag },
  { id: 'pipeline', label: '数据流水线', icon: Workflow },
];

interface DataCenterProps {
  onNavigate?: (page: 'dashboard' | 'datacenter') => void;
}

export default function DataCenter({ onNavigate }: DataCenterProps) {
  const [activeTab, setActiveTab] = useState('files');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const toggleSelection = (id: number) => {
    setSelectedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const selectAll = () => {
    if (selectedItems.length === fileData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(fileData.map(f => f.id));
    }
  };

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
      annotating: 'bg-amber-50 text-amber-600 border-amber-200',
      running: 'bg-blue-50 text-blue-600 border-blue-200',
      reviewing: 'bg-purple-50 text-purple-600 border-purple-200',
      success: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      failed: 'bg-red-50 text-red-600 border-red-200',
    };
    const labels: {[key: string]: string} = {
      ready: '就绪', processing: '处理中', annotating: '标注中', running: '运行中', reviewing: '审核中', success: '成功', failed: '失败'
    };
    return <span className={`px-2 py-0.5 text-xs rounded-full border ${styles[status] || styles.ready}`}>{labels[status] || status}</span>;
  };

  const renderFiles = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowUploadModal(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"><Upload className="w-4 h-4" />上传文件</button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl transition-colors"><Plus className="w-4 h-4" />新建文件夹</button>
          {selectedItems.length > 0 && (
            <div className="flex items-center gap-2 ml-4">
              <span className="text-sm text-gray-500">已选择 {selectedItems.length} 项</span>
              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Download className="w-4 h-4" /></button>
              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Share2 className="w-4 h-4" /></button>
              <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}><List className="w-5 h-5" /></button>
          <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}><Grid className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-4 text-sm text-gray-500">
          <input type="checkbox" checked={selectedItems.length === fileData.length && fileData.length > 0} onChange={selectAll} className="rounded border-gray-300" />
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
              <input type="checkbox" checked={selectedItems.includes(file.id)} onChange={() => toggleSelection(file.id)} className="rounded border-gray-300" />
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
              <button className="w-10 p-2 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"><MoreVertical className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center"><HardDrive className="w-5 h-5 text-blue-600" /></div>
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
            <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center"><Folder className="w-5 h-5 text-violet-600" /></div>
            <div><div className="text-sm text-gray-500">文件夹</div><div className="text-xl font-bold text-gray-900">24 个</div></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center"><FileText className="w-5 h-5 text-emerald-600" /></div>
            <div><div className="text-sm text-gray-500">文件</div><div className="text-xl font-bold text-gray-900">1,286 个</div></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDatasets = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"><Plus className="w-4 h-4" />创建数据集</button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl transition-colors"><Upload className="w-4 h-4" />导入数据</button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="搜索数据集..." className="pl-10 pr-4 py-2 w-64 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500" />
          </div>
          <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-700"><Filter className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {datasetData.map((dataset) => (
          <div key={dataset.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
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
                <button className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">预览</button>
                <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">管理</button>
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
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center"><BoxSelect className="w-5 h-5 text-blue-600" /></div>
            <div><div className="text-2xl font-bold text-gray-900">12,450</div><div className="text-sm text-gray-500">今日标注</div></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-emerald-600" /></div>
            <div><div className="text-2xl font-bold text-gray-900">89.2%</div><div className="text-sm text-gray-500">质检通过率</div></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center"><Users className="w-5 h-5 text-amber-600" /></div>
            <div><div className="text-2xl font-bold text-gray-900">16</div><div className="text-sm text-gray-500">标注人员</div></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center"><Clock className="w-5 h-5 text-purple-600" /></div>
            <div><div className="text-2xl font-bold text-gray-900">5</div><div className="text-sm text-gray-500">进行中</div></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">标注任务</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"><Plus className="w-4 h-4" />新建任务</button>
        </div>
        <div className="divide-y divide-gray-50">
          {annotationTasks.map((task) => (
            <div key={task.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{task.name}</h4>
                  <p className="text-sm text-gray-500 mt-0.5">数据集: {task.dataset} · 类型: {task.type}</p>
                </div>
                {getStatusBadge(task.status)}
              </div>
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>进度 {task.progress}%</span>
                    <span>{task.completed.toLocaleString()} / {task.total.toLocaleString()} 条</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${task.progress}%` }}></div></div>
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
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"><Plus className="w-4 h-4" />创建流水线</button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl transition-colors"><Layers className="w-4 h-4" />模板市场</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {pipelineData.map((pipeline) => (
          <div key={pipeline.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center"><Workflow className="w-6 h-6 text-blue-600" /></div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"><Play className="w-4 h-4" /></button>
                <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"><Edit3 className="w-4 h-4" /></button>
                <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"><MoreVertical className="w-4 h-4" /></button>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{pipeline.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{pipeline.description}</p>
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
        <button className="border-2 border-dashed border-gray-200 rounded-2xl p-5 flex flex-col items-center justify-center text-gray-400 hover:border-blue-300 hover:text-blue-600 transition-colors min-h-[200px]"><Plus className="w-8 h-8 mb-2" /><span className="font-medium">创建新流水线</span></button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100"><h3 className="font-semibold text-gray-900">最近运行</h3></div>
        <div className="divide-y divide-gray-50">
          {[
            { name: '数据清洗-去重-分割', time: '2小时前', duration: '15分32秒', status: 'success', input: 'raw-data-v3', output: 'cleaned-data-v3' },
            { name: '图片增强与格式转换', time: '昨天', duration: '2小时18分', status: 'success', input: 'coco-subset', output: 'coco-augmented' },
            { name: '文本数据增强', time: '3天前', duration: '8分45秒', status: 'failed', input: 'weibo-corpus', output: '-' },
          ].map((run, idx) => (
            <div key={idx} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${run.status === 'success' ? 'bg-emerald-50' : 'bg-red-50'}`}>
                  {run.status === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{run.name}</div>
                  <div className="text-sm text-gray-500">输入: {run.input} → 输出: {run.output}</div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span>{run.time}</span>
                <span>耗时: {run.duration}</span>
                <button className="text-blue-600 hover:text-blue-700">查看日志</button>
              </div>
            </div>
          ))}
        </div>
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
        <div className="mt-auto pt-4 border-t border-gray-100 w-full px-2 space-y-1">
          <button className="w-full aspect-square rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"><HelpCircle className="w-5 h-5" /></button>
          <button className="w-full aspect-square rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-md">PM</div>
          </button>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="flex-1 ml-16 min-w-0">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200/80 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">首页</span>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <span className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">数据中心</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="全局搜索..." className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-gray-400" />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors border border-gray-200/60 hover:border-gray-300">
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">产品白皮书</span>
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </button>
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
            {subNavItems.map((item) => (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                <item.icon className="w-4 h-4" />{item.label}
              </button>
            ))}
          </div>
          {activeTab === 'files' && renderFiles()}
          {activeTab === 'datasets' && renderDatasets()}
          {activeTab === 'annotation' && renderAnnotation()}
          {activeTab === 'pipeline' && renderPipeline()}
        </div>
      </main>

      {/* 上传弹窗 */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[560px] max-w-[90vw]">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">上传文件</h3>
              <button onClick={() => setShowUploadModal(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6">
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-blue-300 hover:bg-blue-50/30 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-900 font-medium">点击或拖拽文件到此处上传</p>
                <p className="text-sm text-gray-500 mt-1">支持单个文件最大 50GB</p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  {['ZIP', 'JSON', 'CSV', '图片', '视频'].map(f => <span key={f} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{f}</span>)}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
              <button onClick={() => setShowUploadModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">取消</button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">开始上传</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
