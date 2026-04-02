import React, { useState } from 'react';
import {
  Search, Bell, Plus, Filter, RefreshCw, Settings2,
  Database, Settings, Folder, Play, Pause, CheckCircle, AlertCircle, Clock, Calendar,
  Layers, ChevronRight, X, MoreVertical, ArrowLeft, Eye, Edit3, Trash2, Copy, Download,
  HardDrive, Zap, FileText, Database as DatabaseIcon, Tag, Sparkles
} from 'lucide-react';

// 流水线类型
const pipelineTypes = {
  cleaning: { name: '数据清洗', icon: HardDrive, color: 'bg-blue-100 text-blue-700' },
  transform: { name: '数据转换', icon: Layers, color: 'bg-purple-100 text-purple-700' },
  enhancement: { name: '数据增强', icon: Zap, color: 'bg-emerald-100 text-emerald-700' }
};

// 流水线状态
const pipelineStatus = {
  idle: { name: '空闲', icon: Clock, color: 'text-gray-600 bg-gray-50' },
  running: { name: '运行中', icon: Play, color: 'text-blue-600 bg-blue-50' },
  completed: { name: '已完成', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
  failed: { name: '失败', icon: AlertCircle, color: 'text-red-600 bg-red-50' }
};

// Mock 流水线数据
const pipelines = [
  {
    id: 1,
    name: '文档清洗流水线',
    type: 'cleaning',
    status: 'running',
    lastRun: '2026-03-30 14:30',
    runCount: 156,
    description: '清洗文档数据、去重、格式转换'
  },
  {
    id: 2,
    name: '图像增强流水线',
    type: 'enhancement',
    status: 'idle',
    lastRun: '2026-03-29 10:00',
    runCount: 23,
    description: '图像数据增强、旋转、裁剪'
  },
  {
    id: 3,
    name: '文本转换流水线',
    type: 'transform',
    status: 'completed',
    lastRun: '2026-03-28 16:45',
    runCount: 89,
    description: '文本格式转换、编码转换、分块'
  }
];

// Mock 流水线模板
const pipelineTemplates = [
  {
    id: 1,
    name: '标准文档清洗',
    type: 'cleaning',
    nodes: ['去重', '格式转换', '编码转换', '验证'],
    description: '适用于文档数据的标准清洗流程'
  },
  {
    id: 2,
    name: '图像增强套件',
    type: 'enhancement',
    nodes: ['旋转', '裁剪', '翻转', '缩放'],
    description: '适用于图像数据的增强操作'
  },
  {
    id: 3,
    name: '文本分块处理',
    type: 'transform',
    nodes: ['按字符数分块', '按段落分块', '按句子分块'],
    description: '适用于文本数据的分块处理'
  }
];

// Mock 流水线实例
const pipelineInstances = [
  {
    id: 1,
    pipelineId: 1,
    name: '文档清洗流水线 #1',
    status: 'running',
    startTime: '2026-03-30 14:30',
    progress: 65,
    nodes: ['去重', '格式转换', '编码转换']
  },
  {
    id: 2,
    pipelineId: 3,
    name: '文本分块处理 #5',
    status: 'completed',
    startTime: '2026-03-29 10:00',
    progress: 100,
    nodes: ['按字符数分块', '按段落分块', '按句子分块']
  }
];

// Mock 任务记录
const taskRecords = [
  {
    id: 1,
    pipelineId: 1,
    instanceId: 1,
    name: '文档清洗流水线 #1',
    status: 'running',
    startTime: '2026-03-30 14:30:00',
    endTime: null,
    duration: '5m 30s',
    nodes: [
      { name: '去重', status: 'completed', duration: '2m' },
      { name: '格式转换', status: 'running', duration: '3m 30s' },
      { name: '编码转换', status: 'pending', duration: '0m' }
    ]
  },
  {
    id: 2,
    pipelineId: 3,
    instanceId: 2,
    name: '文本分块处理 #5',
    status: 'completed',
    startTime: '2026-03-29 10:00:00',
    endTime: '2026-03-29 10:15:00',
    duration: '15m',
    nodes: [
      { name: '按字符数分块', status: 'completed', duration: '5m' },
      { name: '按段落分块', status: 'completed', duration: '6m' },
      { name: '按句子分块', status: 'completed', duration: '4m' }
    ]
  }
];

interface PipelineManagementProps {
  onNavigate?: (page: string) => void;
}

export default function PipelineManagement({ onNavigate }: PipelineManagementProps) {
  const [activeTab, setActiveTab] = useState<'pipelines' | 'templates' | 'instances' | 'records'>('pipelines');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedInstance, setSelectedInstance] = useState<any>(null);

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
            <span className="text-gray-900 font-medium">流水线管理</span>
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
              false
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
              true
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
              placeholder="搜索流水线..."
              className="w-64 pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
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
              onClick={() => onNavigate?.('datacenter-dataset')}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-left"
            >
              <DatabaseIcon size={16} />
              <span>数据集</span>
            </button>
            <button
              onClick={() => onNavigate?.('datacenter-annotation')}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-left"
            >
              <Tag size={16} />
              <span>数据标注</span>
            </button>
            <div className="flex items-center gap-3 px-3 py-2 text-sm text-blue-700 bg-blue-50 rounded-lg">
              <Settings size={16} />
              <span className="font-medium">数据流水线</span>
            </div>
          </nav>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="text-xs font-semibold text-gray-500 mb-3">流水线类型</div>
          <div className="space-y-1">
            <div
              onClick={() => setActiveTab('pipelines')}
              className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors ${
                activeTab === 'pipelines' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              <span>🔧 流水线</span>
              <span className="text-xs text-gray-400">{pipelines.length}</span>
            </div>
            <div
              onClick={() => setActiveTab('templates')}
              className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors ${
                activeTab === 'templates' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              <span>📋 模板</span>
              <span className="text-xs text-gray-400">{pipelineTemplates.length}</span>
            </div>
            <div
              onClick={() => setActiveTab('instances')}
              className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors ${
                activeTab === 'instances' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              <span>⚡ 实例</span>
              <span className="text-xs text-gray-400">{pipelineInstances.length}</span>
            </div>
            <div
              onClick={() => setActiveTab('records')}
              className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors ${
                activeTab === 'records' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              <span>📝 记录</span>
              <span className="text-xs text-gray-400">{taskRecords.length}</span>
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
              <h2 className="text-lg font-semibold text-gray-900">
                {activeTab === 'pipelines' && '流水线'}
                {activeTab === 'templates' && '流水线模板'}
                {activeTab === 'instances' && '流水线实例'}
                {activeTab === 'records' && '任务记录'}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4 text-gray-600" />
              </button>
              {activeTab === 'pipelines' && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
                >
                  <Plus size={16} />
                  创建流水线
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 内容区 */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* 流水线列表 */}
          {activeTab === 'pipelines' && (
            <div className="space-y-4">
              {pipelines.map(pipeline => {
                const typeConfig: any = pipelineTypes[pipeline.type as keyof typeof pipelineTypes];
                const statusConfig: any = pipelineStatus[pipeline.status as keyof typeof pipelineStatus];
                const TypeIcon = typeConfig.icon;
                const StatusIcon = statusConfig.icon;

                return (
                  <div
                    key={pipeline.id}
                    className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${typeConfig.color}`}>
                          <TypeIcon size={18} />
                        </div>
                        <div>
                          <div className="text-base font-semibold text-gray-900">{pipeline.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {typeConfig.name} · {pipeline.description}
                          </div>
                        </div>
                      </div>
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 border rounded-md text-xs font-medium ${statusConfig.color}`}>
                        <StatusIcon size={12} />
                        {statusConfig.name}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">运行次数</div>
                        <div className="text-sm font-semibold text-gray-900">{pipeline.runCount} 次</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">最后运行</div>
                        <div className="text-sm text-gray-600">📅 {pipeline.lastRun}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">状态</div>
                        <div className="text-sm font-medium text-gray-900">{statusConfig.name}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                      <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm">
                        <Play size={16} className="mr-2" />
                        运行
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                        <Eye size={14} />
                        查看详情
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                        <Edit3 size={14} />
                        编辑
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all">
                        <Trash2 size={14} />
                        删除
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 流水线模板 */}
          {activeTab === 'templates' && (
            <div className="grid grid-cols-2 gap-4">
              {pipelineTemplates.map(template => {
                const typeConfig: any = pipelineTypes[template.type as keyof typeof pipelineTypes];
                const TypeIcon = typeConfig.icon;

                return (
                  <div
                    key={template.id}
                    className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${typeConfig.color}`}>
                        <TypeIcon size={18} />
                      </div>
                      <div>
                        <div className="text-base font-semibold text-gray-900">{template.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {typeConfig.name}
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-xs text-gray-500 mb-2">处理节点</div>
                      <div className="flex flex-wrap gap-1">
                        {template.nodes.map((node: string, idx: number) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {node}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 mb-3">
                      {template.description}
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                      <button className="flex-1 px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm">
                        使用模板
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                        <Eye size={14} />
                        查看
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 流水线实例 */}
          {activeTab === 'instances' && (
            <div className="space-y-4">
              {pipelineInstances.map(instance => {
                const statusConfig: any = pipelineStatus[instance.status as keyof typeof pipelineStatus];
                const StatusIcon = statusConfig.icon;

                return (
                  <div
                    key={instance.id}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100">
                          <Folder size={18} />
                        </div>
                        <div>
                          <div className="text-base font-semibold text-gray-900">{instance.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            开始时间：{instance.startTime}
                          </div>
                        </div>
                      </div>
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 border rounded-md text-xs font-medium ${statusConfig.color}`}>
                        <StatusIcon size={12} />
                        {statusConfig.name}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs text-gray-500 mb-2">进度</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${instance.progress}%` }}></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{instance.progress}%</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs text-gray-500 mb-2">处理节点</div>
                      <div className="space-y-1">
                        {instance.nodes.map((node: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <div className={`w-2 h-2 rounded-full ${idx < 2 ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                            <span className="text-gray-600">{node}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                      <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm">
                        查看详情
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                        <Eye size={14} />
                        日志
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 任务记录 */}
          {activeTab === 'records' && (
            <div className="space-y-4">
              {taskRecords.map(record => {
                const statusConfig: any = pipelineStatus[record.status as keyof typeof pipelineStatus];

                return (
                  <div
                    key={record.id}
                    className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${statusConfig.color}`}>
                          <DatabaseIcon size={18} />
                        </div>
                        <div>
                          <div className="text-base font-semibold text-gray-900">{record.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            开始时间：{record.startTime} · 结束时间：{record.endTime || '运行中...'}
                          </div>
                        </div>
                      </div>
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 border rounded-md text-xs font-medium ${statusConfig.color}`}>
                        <Clock size={12} />
                        {record.duration}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs text-gray-500 mb-2">处理节点</div>
                      <div className="grid grid-cols-3 gap-2">
                        {record.nodes.map((node: any, idx: number) => (
                          <div key={idx} className={`p-2 border rounded-lg ${node.status === 'completed' ? 'bg-emerald-50 border-emerald-200' : node.status === 'running' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900">{node.name}</span>
                              <span className="text-xs text-gray-500">{node.duration}</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {node.status === 'completed' ? '✓ 完成' : node.status === 'running' ? '⏳ 处理中' : '⏸️ 待处理'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                      <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                        <Eye size={14} />
                        查看日志
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                        <Download size={14} />
                        导出结果
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 创建流水线弹窗 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">创建流水线</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  流水线名称<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="输入流水线名称"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  流水线类型<span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input type="radio" name="pipelineType" className="w-4 h-4" />
                    <div className={`w-8 h-8 rounded flex items-center justify-center ${pipelineTypes.cleaning.color}`}>
                      <HardDrive size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">数据清洗</div>
                      <div className="text-xs text-gray-500">去重、格式转换、验证</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input type="radio" name="pipelineType" className="w-4 h-4" />
                    <div className={`w-8 h-8 rounded flex items-center justify-center ${pipelineTypes.transform.color}`}>
                      <Layers size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">数据转换</div>
                      <div className="text-xs text-gray-500">格式转换、编码转换</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input type="radio" name="pipelineType" className="w-4 h-4" />
                    <div className={`w-8 h-8 rounded flex items-center justify-center ${pipelineTypes.enhancement.color}`}>
                      <Zap size={16} />
                    </div>
                    <div>
                      <div className="text font-medium text-gray-900">数据增强</div>
                      <div className="text-xs text-gray-500">旋转、裁剪、缩放</div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  处理节点
                </label>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <button className="px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">
                      + 添加节点
                    </button>
                    <button className="px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">
                      从模板加载
                    </button>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                        <span>1</span>
                      </div>
                      <span>数据读取</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                        <span>2</span>
                      </div>
                      <span>格式转换</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-emerald-100 rounded flex items-center justify-center">
                        <span>3</span>
                      </div>
                      <span>数据验证</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  触发规则
                </label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                  <option>手动触发</option>
                  <option>定时触发</option>
                  <option>文件上传触发</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => { alert('创建成功'); setShowCreateModal(false); }}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
              >
                创建流水线
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
