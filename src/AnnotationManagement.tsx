import React, { useState } from 'react';
import {
  Search, Bell, Plus, Filter, RefreshCw, Settings2,
  Database, Tag, Play, Pause, CheckCircle, AlertCircle, Eye, Edit3, Trash2,
  ChevronRight, X, Clock, Calendar, FileText, Layers, Settings, HardDrive, Zap,
  MoreVertical, Folder, ArrowLeft, User, Users, Check, XCircle, Upload, Download, Smile, Sparkles
} from 'lucide-react';

// 标注任务类型
const annotationTypes = {
  classification: { name: '文本分类', icon: FileText, color: 'bg-blue-100 text-blue-700' },
  ner: { name: '实体识别', icon: Tag, color: 'bg-purple-100 text-purple-700' },
  relation: { name: '关系抽取', icon: Layers, color: 'bg-emerald-100 text-emerald-700' },
  sentiment: { name: '情感分析', icon: Smile, color: 'bg-amber-100 text-amber-700' }
};

// 标注任务状态
const taskStatus = {
  pending: { name: '待开始', icon: Clock, color: 'text-gray-600 bg-gray-50' },
  running: { name: '进行中', icon: Play, color: 'text-blue-600 bg-blue-50' },
  completed: { name: '已完成', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
  reviewing: { name: '审核中', icon: Eye, color: 'text-purple-600 bg-purple-50' }
};

// Mock 标注任务数据
const annotationTasks = [
  {
    id: 1,
    name: '客服意图识别标注',
    dataset: '客服对话数据集',
    type: 'classification',
    progress: 65,
    total: 5000,
    completed: 3250,
    assignedUsers: ['张三', '李四', '王五'],
    status: 'running',
    aiEnabled: true,
    aiAccuracy: 82,
    createdAt: '2026-03-28 10:00',
    deadline: '2026-04-10'
  },
  {
    id: 2,
    name: '图像标注任务',
    dataset: 'COCO 2024 Subset',
    type: 'object_detection',
    progress: 30,
    total: 500,
    completed: 150,
    assignedUsers: ['赵六'],
    status: 'running',
    aiEnabled: false,
    createdAt: '2026-03-29 14:00',
    deadline: '2026-04-15'
  },
  {
    id: 3,
    name: '实体识别标注',
    dataset: '企业文档数据集',
    type: 'ner',
    progress: 100,
    total: 1000,
    completed: 1000,
    assignedUsers: ['孙七', '周八'],
    status: 'reviewing',
    aiEnabled: true,
    aiAccuracy: 75,
    createdAt: '2026-03-25 09:00',
    deadline: '2026-04-05'
  },
  {
    id: 4,
    name: '情感分析标注',
    dataset: '评论数据集',
    type: 'sentiment',
    progress: 0,
    total: 2000,
    completed: 0,
    assignedUsers: ['吴九'],
    status: 'pending',
    aiEnabled: false,
    createdAt: '2026-03-30 16:00',
    deadline: '2026-04-20'
  }
];

interface AnnotationManagementProps {
  onNavigate?: (page: string) => void;
}

export default function AnnotationManagement({ onNavigate }: AnnotationManagementProps) {
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showAnnotationTool, setShowAnnotationTool] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

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
            <span className="text-gray-900 font-medium">标注管理</span>
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
              true
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
              placeholder="搜索标注任务..."
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
              <Database size={16} />
              <span>数据集</span>
            </button>
            <div className="flex items-center gap-3 px-3 py-2 text-sm text-blue-700 bg-blue-50 rounded-lg">
              <Tag size={16} />
              <span className="font-medium">数据标注</span>
            </div>
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
          <div className="text-xs font-semibold text-gray-500 mb-3">标注任务</div>
          <div className="space-y-1">
            <div className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
              <span>进行中</span>
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">2</span>
            </div>
            <div className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
              <span>已完成</span>
              <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full">1</span>
            </div>
            <div className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
              <span>待开始</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">1</span>
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
              <div className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">4 个标注任务</span>
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
                onClick={() => setShowTaskModal(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
              >
                <Plus size={16} />
                创建标注任务
              </button>
            </div>
          </div>
        </div>

        {/* 标注任务列表 */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {annotationTasks.map(task => {
              const typeConfig: any = annotationTypes[task.type as keyof typeof annotationTypes] || annotationTypes.classification;
              const statusConfig: any = taskStatus[task.status as keyof typeof taskStatus];
              const TypeIcon = typeConfig.icon;
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={task.id}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
                >
                  {/* 标题行 */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${typeConfig.color}`}>
                        <TypeIcon size={18} />
                      </div>
                      <div>
                        <div className="text-base font-semibold text-gray-900">{task.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          📊 {task.dataset} · {typeConfig.name}
                        </div>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 border rounded-md text-xs font-medium ${statusConfig.color}`}>
                      <StatusIcon size={12} />
                      {statusConfig.name}
                    </div>
                  </div>

                  {/* 进度和统计 */}
                  <div className="mb-4 grid grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">进度</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${task.progress}%` }}></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{task.progress}%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">已完成</div>
                      <div className="text-sm text-gray-600">{task.completed.toLocaleString()} / {task.total.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">分配人员</div>
                      <div className="text-sm text-gray-600">
                        {task.assignedUsers.map((user: string, idx: number) => (
                          <span key={idx} className="inline-flex items-center gap-1 bg-gray-100 rounded-full px-2 py-0.5 mr-1">
                            👤 {user}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">截止日期</div>
                      <div className="text-sm text-gray-600">📅 {task.deadline}</div>
                    </div>
                  </div>

                  {/* AI预标注 */}
                  {task.aiEnabled && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <div className="text-xs text-blue-600">
                        🤖 AI预标注已启用 · 准确率 {task.aiAccuracy}%
                      </div>
                    </div>
                  )}

                  {/* 操作按钮 */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                    {task.status === 'running' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedTask(task); setShowAnnotationTool(true); }}
                        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
                      >
                        <Play size={16} className="mr-2" />
                        继续标注
                      </button>
                    )}
                    {task.status === 'pending' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedTask(task); setShowAnnotationTool(true); }}
                        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
                      >
                        <Play size={16} className="mr-2" />
                        开始标注
                      </button>
                    )}
                    {task.status === 'completed' && (
                      <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-sm">
                        <CheckCircle size={16} className="mr-2" />
                        查看结果
                      </button>
                    )}
                    {task.status === 'reviewing' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedTask(task); setShowReviewModal(true); }}
                        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all shadow-sm"
                      >
                        <Eye size={16} className="mr-2" />
                        质检审核
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 创建标注任务弹窗 */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">创建标注任务</h3>
              <button
                onClick={() => setShowTaskModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  任务名称<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="输入任务名称"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  选择数据集<span className="text-red-500">*</span>
                </label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                  <option>客服对话数据集</option>
                  <option>COCO 2024 Subset</option>
                  <option>企业文档数据集</option>
                  <option>评论数据集</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  标注类型<span className="text-red-500">*</span>
                </label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                  <option>文本分类</option>
                  <option>实体识别</option>
                  <option>关系抽取</option>
                  <option>情感分析</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  标签体系
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg">
                    <span>产品咨询</span>
                    <span className="text-xs text-blue-600">🔵</span>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg">
                    <span>投诉建议</span>
                    <span className="text-xs text-amber-600">🟡</span>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg">
                    <span>订单查询</span>
                    <span className="text-xs text-emerald-600">🟢</span>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg">
                    <span>账号问题</span>
                    <span className="text-xs text-purple-600">🟣</span>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg">
                    <span>其他</span>
                    <span className="text-xs text-gray-600">⚪</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  分配人员<span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" defaultChecked />
                    <span>张三</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" defaultChecked />
                    <span>李四</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" defaultChecked />
                    <span>王五</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    截止日期
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    AI 预标注
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    <option>不启用</option>
                    <option>启用</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setShowTaskModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => { alert('创建成功'); setShowTaskModal(false); }}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
              >
                创建任务
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 标注工具弹窗（文本分类） */}
      {showAnnotationTool && selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">标注工具 - {selectedTask.name}</h3>
                <div className="text-xs text-gray-500 mt-1">
                  进度: {selectedTask.progress}% · 样本 {selectedTask.completed}/{selectedTask.total}
                </div>
              </div>
              <button
                onClick={() => { setShowAnnotationTool(false); setSelectedTask(null); }}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                {/* 样本展示区 */}
                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="text-xs text-gray-500 mb-2">样本 {selectedTask.completed}/{selectedTask.total}</div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-900 mb-2">
                      <span className="font-medium text-gray-700">用户：</span>请问怎么查询订单？
                    </div>
                    <div className="text-sm text-gray-900 mb-2">
                      <span className="font-medium text-gray-700">客服：</span>您好，可以进入个人中心查看订单状态。
                    </div>
                    <div className="text-sm text-gray-900">
                      <span className="font-medium text-gray-700">用户：</span>好的，谢谢！
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                    <div className="text-xs text-blue-600">
                      🤖 AI预标注: 订单查询 (82%)
                    </div>
                  </div>
                </div>

                {/* 标注操作区 */}
                <div>
                  <div className="text-xs text-gray-500 mb-3">📌 选择标签</div>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium">产品咨询</span>
                        <span className="text-xs text-gray-400">1234</span>
                      </div>
                      <input type="radio" name="label" />
                    </label>
                    <label className="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm font-medium">订单查询</span>
                        <span className="text-xs text-gray-400">3250</span>
                      </div>
                      <input type="radio" name="label" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                        <span className="text-sm font-medium">投诉建议</span>
                        <span className="text-xs text-gray-400">567</span>
                      </div>
                      <input type="radio" name="label" />
                    </label>
                    <label className="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm font-medium">账号问题</span>
                        <span className="text-xs text-gray-400">890</span>
                      </div>
                      <input type="radio" name="label" />
                    </label>
                    <label className="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        <span className="text-sm font-medium">无法判断</span>
                        <span className="text-xs text-gray-400">45</span>
                      </div>
                      <input type="radio" name="label" />
                    </label>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs text-gray-500 mb-2">备注（可选）</label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      placeholder="添加备注..."
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <ArrowLeft size={14} className="mr-1" />
                  上一个
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  跳过
                </button>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm">
                提交
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 质检审核弹窗 */}
      {showReviewModal && selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">质检审核 - {selectedTask.name}</h3>
                <div className="text-xs text-gray-500 mt-1">
                  总样本: {selectedTask.total} · 已标注: {selectedTask.completed}
                </div>
              </div>
              <button
                onClick={() => { setShowReviewModal(false); setSelectedTask(null); }}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                {/* 样本和标注结果 */}
                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="text-xs text-gray-500 mb-2">样本 1 / {selectedTask.total}</div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-900 mb-2">
                      <span className="font-medium text-gray-700">用户：</span>请问怎么查询订单？
                    </div>
                    <div className="text-sm text-gray-900 mb-2">
                      <span className="font-medium text-gray-700">客服：</span>您好，可以进入个人中心查看订单状态。
                    </div>
                    <div className="text-sm text-gray-900">
                      <span className="font-medium text-gray-700">用户：</span>好的，谢谢！
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-emerald-50 rounded-lg">
                    <div className="text-xs text-emerald-600 font-medium mb-1">
                      标注结果：订单查询
                    </div>
                    <div className="text-xs text-gray-500">
                      标注人: 张三 · 2026-03-28 14:30
                    </div>
                  </div>
                </div>

                {/* 质检操作 */}
                <div>
                  <div className="text-xs text-gray-500 mb-3">✅ 审核操作</div>
                  <div className="space-y-3">
                    <button className="w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-sm">
                      <CheckCircle size={16} className="mr-2" />
                      通过
                    </button>
                    <button className="w-full px-4 py-3 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all">
                      <XCircle size={16} className="mr-2" />
                      驳回
                    </button>
                    <div>
                      <label className="block text-xs text-gray-500 mb-2">审核意见</label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        placeholder="输入审核意见..."
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <button className="px-3 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                上一个
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                下一个
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
