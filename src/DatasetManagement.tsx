import React, { useState } from 'react';
import {
  Search, Bell, Plus, FileText, Image, Video, Filter, RefreshCw, SortAsc, Settings2,
  Database, Users, HardDrive, Globe, LayoutDashboard, Clock, Calendar,
  Shield, Tag, CheckCircle, AlertCircle, Info, Sparkles, Zap, Layers, BookOpen,
  MoreVertical, ChevronRight, X, Download, Eye, Edit3, Trash2, Folder,
  ArrowLeft, Grid, List, Play, Pause, Check, XCircle
} from 'lucide-react';

// 数据集类型配置
const datasetTypes = {
  text: { name: '文本数据集', icon: FileText, color: 'bg-blue-100 text-blue-700', colorLight: 'text-blue-600', bgColor: 'bg-blue-50' },
  multimodal: { name: '多模态数据集', icon: Image, color: 'bg-purple-100 text-purple-700', colorLight: 'text-purple-600', bgColor: 'bg-purple-50' }
};

// 数据集状态配置
const datasetStatus = {
  ready: { name: '就绪', icon: CheckCircle, color: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200' },
  processing: { name: '处理中', icon: RefreshCw, color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  annotating: { name: '标注中', icon: Play, color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
  error: { name: '错误', icon: AlertCircle, color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' }
};

// Mock 数据
const datasets = [
  {
    id: 1,
    name: '企业培训知识库',
    type: 'text',
    format: 'JSONL',
    samples: 125000,
    size: '2.4GB',
    status: 'ready',
    annotationProgress: 0,
    annotationTask: null,
    tags: ['知识库', '训练'],
    creator: '张三',
    createdAt: '2026-03-30 14:30',
    space: 'personal',
    description: '企业内部培训文档知识库，包含产品说明、技术规范等'
  },
  {
    id: 2,
    name: '客服对话数据集',
    type: 'text',
    format: 'JSON',
    samples: 45000,
    size: '320MB',
    status: 'annotating',
    annotationProgress: 65,
    annotationTask: '客服意图识别',
    tags: ['对话', '意图识别'],
    creator: '赵六',
    createdAt: '2026-03-24 10:00',
    space: 'team',
    description: '客服场景的多轮对话数据，包含意图和槽位标注'
  },
  {
    id: 3,
    name: 'COCO 2024 Subset',
    type: 'multimodal',
    format: 'COCO',
    samples: 50000,
    size: '18.6GB',
    status: 'ready',
    annotationProgress: 100,
    annotationTask: '图像标注',
    tags: ['目标检测', '图像描述'],
    creator: '王五',
    createdAt: '2026-03-29 16:45',
    space: 'team',
    description: 'COCO数据集的子集，用于多模态模型训练'
  }
];

interface DatasetManagementProps {
  onNavigate?: (page: string) => void;
}

export default function DatasetManagement({ onNavigate }: DatasetManagementProps) {
  const [selectedSpace, setSelectedSpace] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState<any>(null);
  const [createStep, setCreateStep] = useState(1);

  // 筛选数据集
  const filteredDatasets = datasets.filter(dataset => {
    if (selectedSpace !== 'all' && dataset.space !== selectedSpace) return false;
    if (selectedType !== 'all' && dataset.type !== selectedType) return false;
    if (selectedStatus !== 'all' && dataset.status !== selectedStatus) return false;
    if (searchQuery && !dataset.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // 统计信息
  const stats = {
    total: datasets.length,
    text: datasets.filter(d => d.type === 'text').length,
    multimodal: datasets.filter(d => d.type === 'multimodal').length,
    ready: datasets.filter(d => d.status === 'ready').length,
    annotating: datasets.filter(d => d.status === 'annotating').length
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center px-6 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-lg text-gray-800">AI PM</span>
          </div>
          <div className="h-6 w-px bg-gray-200"></div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Database className="w-4 h-4" />
            <span>数据中心</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">数据集管理</span>
          </div>
        </div>

        {/* 数据中心子模块快速导航 */}
        <div className="flex-1 flex items-center justify-center gap-1">
          <button
            onClick={() => onNavigate?.('datacenter')}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
              false
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            文件管理
          </button>
          <button
            onClick={() => onNavigate?.('datacenter-dataset')}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
              true
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            数据集管理
          </button>
          <button
            onClick={() => onNavigate?.('datacenter-annotation')}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
              false
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            标注管理
          </button>
          <button
            onClick={() => onNavigate?.('datacenter-pipeline')}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
              false
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            流水线管理
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索数据集..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
            PM
          </div>
        </div>
      </div>

      {/* 左侧导航 */}
      <div className="w-64 mt-14 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="text-xs font-semibold text-gray-500 mb-3">数据中心</div>
          <nav className="space-y-1">
            <button
              onClick={() => onNavigate?.('datacenter')}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-left"
            >
              <Folder size={16} />
              <span>文件管理</span>
            </button>
            <div className="flex items-center gap-3 px-3 py-2 text-sm text-blue-700 bg-blue-50 rounded-lg">
              <Database size={16} />
              <span className="font-medium">数据集</span>
            </div>
            <button
              onClick={() => onNavigate?.('datacenter-annotation')}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-left"
            >
              <Tag size={16} />
              <span>数据标注</span>
            </button>
            <button
              onClick={() => onNavigate?.('datacenter-pipeline')}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-left"
            >
              <Settings2 size={16} />
              <span>数据流水线</span>
            </button>
          </nav>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="text-xs font-semibold text-gray-500 mb-3">筛选</div>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-gray-600 mb-1.5">类型</div>
              <div className="space-y-1">
                <div
                  onClick={() => setSelectedType('all')}
                  className={`flex items-center justify-between px-3 py-1.5 text-sm rounded-lg cursor-pointer transition-colors ${
                    selectedType === 'all' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <span>全部</span>
                  <span className="text-xs text-gray-400">{stats.total}</span>
                </div>
                <div
                  onClick={() => setSelectedType('text')}
                  className={`flex items-center justify-between px-3 py-1.5 text-sm rounded-lg cursor-pointer transition-colors ${
                    selectedType === 'text' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <span>文本</span>
                  <span className="text-xs text-gray-400">{stats.text}</span>
                </div>
                <div
                  onClick={() => setSelectedType('multimodal')}
                  className={`flex items-center justify-between px-3 py-1.5 text-sm rounded-lg cursor-pointer transition-colors ${
                    selectedType === 'multimodal' ? 'bg-purple-50 text-purple-700' : 'hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <span>多模态</span>
                  <span className="text-xs text-gray-400">{stats.multimodal}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-1.5">状态</div>
              <div className="space-y-1">
                <div
                  onClick={() => setSelectedStatus('all')}
                  className={`flex items-center justify-between px-3 py-1.5 text-sm rounded-lg cursor-pointer transition-colors ${
                    selectedStatus === 'all' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <span>全部</span>
                </div>
                <div
                  onClick={() => setSelectedStatus('ready')}
                  className={`flex items-center justify-between px-3 py-1.5 text-sm rounded-lg cursor-pointer transition-colors ${
                    selectedStatus === 'ready' ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <CheckCircle size={14} />
                  <span>就绪</span>
                  <span className="text-xs text-gray-400">{stats.ready}</span>
                </div>
                <div
                  onClick={() => setSelectedStatus('annotating')}
                  className={`flex items-center justify-between px-3 py-1.5 text-sm rounded-lg cursor-pointer transition-colors ${
                    selectedStatus === 'annotating' ? 'bg-amber-50 text-amber-700' : 'hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <Play size={14} />
                  <span>标注中</span>
                  <span className="text-xs text-gray-400">{stats.annotating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1"></div>
      </div>

      {/* 右侧内容区 */}
      <div className="flex-1 mt-14 flex flex-col">
        {/* 顶部操作栏 */}
        <div className="px-6 py-4 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">当前空间：</span>
                <span className="font-medium text-gray-900">
                  {selectedSpace === 'all' ? '全部' : selectedSpace === 'personal' ? '个人空间' : selectedSpace === 'team' ? '团队空间' : '公共空间'}
                </span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-600">{filteredDatasets.length} 个数据集</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => { setCreateStep(1); setShowCreateModal(true); }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
              >
                <Plus size={16} />
                创建数据集
              </button>
            </div>
          </div>
        </div>

        {/* 数据集列表 */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredDatasets.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Database size={48} className="mb-4" />
              <p className="text-sm">暂无数据集</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDatasets.map(dataset => {
                const typeConfig = datasetTypes[dataset.type as keyof typeof datasetTypes];
                const statusConfig = datasetStatus[dataset.status as keyof typeof datasetStatus];
                const TypeIcon = typeConfig.icon;
                const StatusIcon = statusConfig.icon;

                return (
                  <div
                    key={dataset.id}
                    className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
                    onClick={() => { setSelectedDataset(dataset); setShowDetailModal(true); }}
                  >
                    {/* 标题行 */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${typeConfig.color}`}>
                          <TypeIcon size={18} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="text-base font-semibold text-gray-900">{dataset.name}</div>
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${typeConfig.bgColor} ${typeConfig.colorLight}`}>
                              {dataset.type === 'text' ? '文本' : '多模态'}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {typeConfig.name} · {dataset.format}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 border rounded-md text-xs font-medium ${statusConfig.bgColor} ${statusConfig.borderColor} ${statusConfig.color}`}>
                          <StatusIcon size={12} />
                          {statusConfig.name}
                        </div>
                        {dataset.annotationProgress > 0 && (
                          <div className={`flex items-center gap-1.5 px-2.5 py-1 border rounded-md text-xs font-medium ${dataset.status === 'annotating' ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                            <span>⏳ {dataset.annotationProgress}%</span>
                          </div>
                        )}
                        <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical size={14} className="text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {/* 统计信息 */}
                    <div className="mb-3 grid grid-cols-4 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">样本数</div>
                        <div className="text-sm font-semibold text-gray-900">{dataset.samples.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">大小</div>
                        <div className="text-sm font-semibold text-gray-900">{dataset.size}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">创建人</div>
                        <div className="text-sm text-gray-600">👤 {dataset.creator}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">创建时间</div>
                        <div className="text-sm text-gray-600">📅 {dataset.createdAt}</div>
                      </div>
                    </div>

                    {/* 标签和操作 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {dataset.tags.map((tag: string, idx: number) => (
                          <span key={idx} className={`px-2 py-0.5 text-xs rounded-full ${typeConfig.colorLight} ${typeConfig.bgColor}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          onClick={(e) => { e.stopPropagation(); }}
                        >
                          ▸ 详情
                        </button>
                        <button
                          className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          onClick={(e) => { e.stopPropagation(); }}
                        >
                          🏷️ 标注
                        </button>
                        <button
                          className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          onClick={(e) => { e.stopPropagation(); }}
                        >
                          ⬇️ 导出
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 创建数据集弹窗 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">创建数据集</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* 步骤条 */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      step === createStep
                        ? 'bg-blue-500 text-white'
                        : step < createStep
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step < createStep ? '✓' : step}
                    </div>
                    {step < 5 && <ChevronRight size={16} className="text-gray-300" />}
                  </div>
                ))}
              </div>
            </div>

            {/* 步骤内容 */}
            <div className="p-6">
              {createStep === 1 && (
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-4">选择数据集类型</div>
                  <div className="space-y-3">
                    <div
                      onClick={() => {}}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${true ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${datasetTypes.text.color}`}>
                          <FileText size={24} />
                        </div>
                        <div>
                          <div className="text-base font-semibold text-gray-900">📄 文本数据集</div>
                          <div className="text-sm text-gray-600 mt-1">适用于文本数据，如文档、对话、代码等</div>
                          <div className="text-xs text-gray-400 mt-2">支持格式：JSON、JSONL、CSV、TXT</div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${false ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${datasetTypes.multimodal.color}`}>
                          <Image size={24} />
                        </div>
                        <div>
                          <div className="text-base font-semibold text-gray-900">🖼️ 多模态数据集</div>
                          <div className="text-sm text-gray-600 mt-1">适用于图文、视频、音频等多模态数据</div>
                          <div className="text-xs text-gray-400 mt-2">支持格式：COCO、VOC、YOLO、自定义</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {createStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      数据集名称<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="输入数据集名称"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">描述</label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="输入数据集描述（选填）"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">标签</label>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">训练数据 ×</span>
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">知识库 ×</span>
                      <input
                        type="text"
                        className="px-3 py-1 border border-gray-200 rounded-lg text-xs"
                        placeholder="添加标签..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {createStep === 3 && (
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-4">选择数据源</div>
                  <div className="space-y-2">
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <input type="checkbox" className="rounded" />
                        <span className="font-medium text-sm">📂 文档资料</span>
                        <span className="text-xs text-gray-500">（3个文件 · 35.7MB）</span>
                      </div>
                      <div className="ml-6 space-y-1 text-xs text-gray-600">
                        <div>☐ 产品说明书/v2.0.pdf · 15.2MB</div>
                        <div>☐ 技术文档/规范.docx · 8.5MB</div>
                        <div>☐ 培训材料/培训.pdf · 12.0MB</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {createStep === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">数据格式</label>
                      <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        <option>JSON</option>
                        <option>JSONL</option>
                        <option>CSV</option>
                        <option>TXT</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">编码格式</label>
                      <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        <option>UTF-8</option>
                        <option>GBK</option>
                        <option>GB2312</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">分块策略</label>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                      <option>按字符数</option>
                      <option>按段落</option>
                      <option>按句子</option>
                      <option>不分块</option>
                    </select>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-700">预计处理时间：约 3 分钟</div>
                    <div className="text-sm text-blue-700">预计样本数：约 125,000 条</div>
                  </div>
                </div>
              )}

              {createStep === 5 && (
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <div className="text-sm font-medium text-gray-900 mb-3">📊 数据集概览</div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-gray-500">名称</div>
                        <div className="text-gray-900 font-medium">企业培训知识库</div>
                      </div>
                      <div>
                        <div className="text-gray-500">类型</div>
                        <div className="text-gray-900 font-medium">文本数据集</div>
                      </div>
                      <div>
                        <div className="text-gray-500">格式</div>
                        <div className="text-gray-900 font-medium">JSONL</div>
                      </div>
                      <div>
                        <div className="text-gray-500">来源文件</div>
                        <div className="text-gray-900 font-medium">3个文件 · 35.7MB</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="autoAnnotate" />
                    <label htmlFor="autoAnnotate" className="text-sm text-gray-700">创建后立即开始标注任务</label>
                  </div>
                </div>
              )}
            </div>

            {/* 底部按钮 */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                取消
              </button>
              {createStep > 1 && (
                <button
                  onClick={() => setCreateStep(createStep - 1)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  上一步
                </button>
              )}
              {createStep < 5 ? (
                <button
                  onClick={() => setCreateStep(createStep + 1)}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
                >
                  下一步
                </button>
              ) : (
                <button
                  onClick={() => { alert('创建成功'); setShowCreateModal(false); setCreateStep(1); }}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
                >
                  确认创建
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 数据集详情弹窗 */}
      {showDetailModal && selectedDataset && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">数据集详情</h3>
              <button
                onClick={() => { setShowDetailModal(false); setSelectedDataset(null); }}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              {/* 基本信息 */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${(datasetTypes[selectedDataset.type as keyof typeof datasetTypes]).color}`}>
                    {selectedDataset.type === 'text' ? <FileText size={28} /> : <Image size={28} />}
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-gray-900">{selectedDataset.name}</div>
                    <div className="text-sm text-gray-600 mt-1">{selectedDataset.description}</div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">类型</div>
                    <div className="text-sm font-medium text-gray-900">{(datasetTypes[selectedDataset.type as keyof typeof datasetTypes]).name}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">格式</div>
                    <div className="text-sm font-medium text-gray-900">{selectedDataset.format}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">样本数</div>
                    <div className="text-sm font-medium text-gray-900">{selectedDataset.samples.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">大小</div>
                    <div className="text-sm font-medium text-gray-900">{selectedDataset.size}</div>
                  </div>
                </div>
              </div>

              {/* 统计信息 */}
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="text-sm font-medium text-gray-900 mb-3">📊 统计信息</div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">{selectedDataset.samples.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">样本数</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">{selectedDataset.size}</div>
                    <div className="text-xs text-gray-500">总大小</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">256</div>
                    <div className="text-xs text-gray-500">平均长度</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">32M</div>
                    <div className="text-xs text-gray-500">字符数</div>
                  </div>
                </div>
              </div>

              {/* 标签 */}
              <div className="mb-6">
                <div className="text-sm font-medium text-gray-900 mb-3">🏷️ 标签</div>
                <div className="flex flex-wrap gap-2">
                  {selectedDataset.tags.map((tag: string, idx: number) => (
                    <span key={idx} className={`px-3 py-1 text-sm rounded-full ${(datasetTypes[selectedDataset.type as keyof typeof datasetTypes]).colorLight} ${(datasetTypes[selectedDataset.type as keyof typeof datasetTypes]).bgColor}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm">
                  <Eye size={16} />
                  查看详情
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                  <Tag size={16} />
                  创建标注任务
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                  <Download size={16} />
                  导出数据集
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
