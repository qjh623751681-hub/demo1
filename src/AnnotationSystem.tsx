import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, ArrowRight, Check, ChevronRight, Database, FileText, Plus, Save, Settings,
  Users, Tag, Clock, CheckCircle2, AlertCircle, Loader2, X, ChevronDown, Eye,
  LayoutGrid, List, Filter, Search, MoreVertical, Download, Trash2, Edit3,
  Play, Pause, RotateCcw, GitBranch, Upload, Folder, FileJson, FileArchive,
  FileCode, Table, AlignLeft, Image, Music, HardDrive, BoxSelect, Terminal,
  History, BarChart3, TrendingUp, PieChart, ArrowUpRight, ArrowDownRight,
  Zap, LayoutDashboard, Code2, Brain, Sparkles, Cloud, Cpu, Settings as SettingsIcon,
  Bell, HelpCircle, ExternalLink, ChevronLeft, Copy, Move, Share2, Star,
  Maximize2, Minimize2, Grid, Split, Merge, Scissors, Wand2, Workflow,
  Layers, GitCommit, GitMerge, GitPullRequest, Activity, RefreshCw
} from 'lucide-react';

// ==================== 类型定义 ====================

interface LabelConfig {
  id: string;
  name: string;
  color: string;
  shortcut?: string;
  children?: LabelConfig[];
}

interface TaskConfig {
  name: string;
  description: string;
  datasetId: string;
  annotationType: 'classification' | 'ner' | 'relation' | 'intent';
  labels: LabelConfig[];
  allowMultiple: boolean;
  required: boolean;
  instruction: string;
}

interface AssignmentConfig {
  annotators: string[];
  samplesPerPerson: number;
  overlapRate: number;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
}

interface AnnotationTask {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'creating' | 'running' | 'paused' | 'completed';
  progress: number;
  totalSamples: number;
  completedSamples: number;
  annotators: number;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
}

// ==================== 模拟数据 ====================

const mockDatasets = [
  { id: 'ds1', name: '微博情感分析语料', samples: 10000, format: 'CSV', size: '856MB' },
  { id: 'ds2', name: '客服对话数据集', samples: 5000, format: 'JSON', size: '320MB' },
  { id: 'ds3', name: '新闻分类语料', samples: 50000, format: 'JSONL', size: '2.1GB' },
];

const mockTeamMembers = [
  { id: 'u1', name: '张三', avatar: 'ZS', role: '标注员', currentLoad: 2 },
  { id: 'u2', name: '李四', avatar: 'LS', role: '标注员', currentLoad: 1 },
  { id: 'u3', name: '王五', avatar: 'WW', role: '标注员', currentLoad: 3 },
  { id: 'u4', name: '赵六', avatar: 'ZL', role: '质检员', currentLoad: 0 },
];

const labelColors = [
  { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', solid: 'bg-red-500' },
  { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', solid: 'bg-green-500' },
  { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', solid: 'bg-blue-500' },
  { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200', solid: 'bg-yellow-500' },
  { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', solid: 'bg-purple-500' },
  { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200', solid: 'bg-pink-500' },
  { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', solid: 'bg-indigo-500' },
  { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', solid: 'bg-orange-500' },
];

// ==================== 组件：步骤条 ====================

const StepIndicator = ({ steps, currentStep }: { steps: string[]; currentStep: number }) => (
  <div className="flex items-center justify-center mb-8">
    <div className="flex items-center">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isPending = index > currentStep;
        
        return (
          <React.Fragment key={index}>
            {/* 步骤圆点 */}
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                isCompleted ? 'bg-emerald-500 text-white' :
                isCurrent ? 'bg-blue-600 text-white ring-4 ring-blue-100' :
                'bg-gray-100 text-gray-400'
              }`}>
                {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
              </div>
              <span className={`mt-2 text-xs font-medium transition-colors ${
                isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'
              }`}>
                {step}
              </span>
            </div>
            
            {/* 连接线 */}
            {index < steps.length - 1 && (
              <div className={`w-24 h-0.5 mx-4 transition-all duration-500 ${
                index < currentStep ? 'bg-emerald-500' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  </div>
);

// ==================== 组件：表单输入 ====================

const FormField = ({ label, required, children, error }: { label: string; required?: boolean; children: React.ReactNode; error?: string }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

const Input = ({ value, onChange, placeholder, type = 'text' }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) => (
  <input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
  />
);

const TextArea = ({ value, onChange, placeholder, rows = 4 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    rows={rows}
    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
  />
);

const Select = ({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; placeholder?: string }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
  </div>
);

// ==================== 页面1：任务列表 ====================

const TaskList = ({ onCreateTask, onViewTask }: { onCreateTask: () => void; onViewTask: (task: AnnotationTask) => void }) => {
  const [tasks] = useState<AnnotationTask[]>([
    { id: '1', name: '微博情感标注-第3轮', description: '对微博文本进行正面/负面/中性情感分类', status: 'running', progress: 78, totalSamples: 10000, completedSamples: 7800, annotators: 5, deadline: '2026-04-05', priority: 'high', createdAt: '2026-03-20' },
    { id: '2', name: '客服意图识别', description: '识别客服对话中的用户意图', status: 'running', progress: 45, totalSamples: 5000, completedSamples: 2250, annotators: 3, deadline: '2026-04-10', priority: 'medium', createdAt: '2026-03-22' },
    { id: '3', name: '新闻实体标注', description: '标注新闻中的人名、地名、机构名', status: 'completed', progress: 100, totalSamples: 2000, completedSamples: 2000, annotators: 4, deadline: '2026-03-25', priority: 'high', createdAt: '2026-03-15' },
    { id: '4', name: '产品评论分类', description: '电商产品评论的多标签分类', status: 'draft', progress: 0, totalSamples: 3000, completedSamples: 0, annotators: 0, deadline: '2026-04-15', priority: 'low', createdAt: '2026-03-28' },
  ]);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getStatusBadge = (status: AnnotationTask['status']) => {
    const configs = {
      draft: { text: '草稿', color: 'bg-gray-100 text-gray-600' },
      creating: { text: '创建中', color: 'bg-blue-50 text-blue-600' },
      running: { text: '进行中', color: 'bg-emerald-50 text-emerald-600' },
      paused: { text: '已暂停', color: 'bg-amber-50 text-amber-600' },
      completed: { text: '已完成', color: 'bg-purple-50 text-purple-600' },
    };
    const config = configs[status];
    return <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${config.color}`}>{config.text}</span>;
  };

  const getPriorityBadge = (priority: AnnotationTask['priority']) => {
    const configs = {
      high: { text: '高', color: 'bg-red-50 text-red-600' },
      medium: { text: '中', color: 'bg-yellow-50 text-yellow-600' },
      low: { text: '低', color: 'bg-gray-50 text-gray-600' },
    };
    return <span className={`px-2 py-0.5 text-xs rounded ${configs[priority].color}`}>{configs[priority].text}</span>;
  };

  const filteredTasks = filterStatus === 'all' ? tasks : tasks.filter(t => t.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
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

      {/* 任务列表 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">标注任务</h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              {[{ id: 'all', label: '全部' }, { id: 'running', label: '进行中' }, { id: 'completed', label: '已完成' }, { id: 'draft', label: '草稿' }].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterStatus(f.id)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    filterStatus === f.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <button onClick={onCreateTask} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
              <Plus className="w-4 h-4" />新建任务
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {filteredTasks.map((task) => (
            <div key={task.id} className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => onViewTask(task)}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold text-gray-900">{task.name}</h4>
                  {getPriorityBadge(task.priority)}
                  {getStatusBadge(task.status)}
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" onClick={(e) => { e.stopPropagation(); }}>
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-3">{task.description}</p>
              <div className="flex items-center gap-6">
                <div className="flex-1 max-w-md">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                    <span>进度 {task.progress}%</span>
                    <span>{task.completedSamples.toLocaleString()} / {task.totalSamples.toLocaleString()} 条</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${task.progress}%` }} />
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{task.annotators} 人</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />截止 {task.deadline}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==================== 页面2：创建任务向导 ====================

const CreateTaskWizard = ({ onCancel, onComplete }: { onCancel: () => void; onComplete: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taskConfig, setTaskConfig] = useState<TaskConfig>({
    name: '',
    description: '',
    datasetId: '',
    annotationType: 'classification',
    labels: [],
    allowMultiple: false,
    required: true,
    instruction: '',
  });
  const [assignmentConfig, setAssignmentConfig] = useState<AssignmentConfig>({
    annotators: [],
    samplesPerPerson: 0,
    overlapRate: 0,
    deadline: '',
    priority: 'medium',
  });

  const steps = ['基础信息', '标注配置', '任务分配', '确认创建'];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    onComplete();
  };

  const addLabel = () => {
    const newLabel: LabelConfig = {
      id: `label-${Date.now()}`,
      name: '',
      color: labelColors[taskConfig.labels.length % labelColors.length].solid,
      shortcut: (taskConfig.labels.length + 1).toString(),
    };
    setTaskConfig({ ...taskConfig, labels: [...taskConfig.labels, newLabel] });
  };

  const updateLabel = (id: string, updates: Partial<LabelConfig>) => {
    setTaskConfig({
      ...taskConfig,
      labels: taskConfig.labels.map(l => l.id === id ? { ...l, ...updates } : l),
    });
  };

  const removeLabel = (id: string) => {
    setTaskConfig({ ...taskConfig, labels: taskConfig.labels.filter(l => l.id !== id) });
  };

  const selectedDataset = mockDatasets.find(d => d.id === taskConfig.datasetId);

  // Step 1: 基础信息
  const renderStep1 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <FormField label="任务名称" required>
        <Input value={taskConfig.name} onChange={(v) => setTaskConfig({ ...taskConfig, name: v })} placeholder="例如：微博情感标注-第3轮" />
      </FormField>
      <FormField label="任务描述">
        <TextArea value={taskConfig.description} onChange={(v) => setTaskConfig({ ...taskConfig, description: v })} placeholder="描述标注任务的背景、目的等信息" />
      </FormField>
      <FormField label="选择数据集" required>
        <Select
          value={taskConfig.datasetId}
          onChange={(v) => setTaskConfig({ ...taskConfig, datasetId: v })}
          placeholder="请选择数据集"
          options={mockDatasets.map(d => ({ value: d.id, label: `${d.name} (${d.samples.toLocaleString()}条)` }))}
        />
      </FormField>
      {selectedDataset && (
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <h4 className="text-sm font-medium text-blue-900 mb-2">数据集预览</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div><span className="text-blue-600">样本数：</span><span className="text-blue-900 font-medium">{selectedDataset.samples.toLocaleString()}</span></div>
            <div><span className="text-blue-600">格式：</span><span className="text-blue-900 font-medium">{selectedDataset.format}</span></div>
            <div><span className="text-blue-600">大小：</span><span className="text-blue-900 font-medium">{selectedDataset.size}</span></div>
          </div>
        </div>
      )}
    </div>
  );

  // Step 2: 标注配置
  const renderStep2 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <FormField label="标注类型" required>
        <div className="grid grid-cols-4 gap-3">
          {[
            { id: 'classification', label: '文本分类', icon: Tag },
            { id: 'ner', label: '命名实体', icon: BoxSelect },
            { id: 'relation', label: '关系抽取', icon: GitMerge },
            { id: 'intent', label: '意图识别', icon: MessageSquare },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setTaskConfig({ ...taskConfig, annotationType: type.id as any })}
              className={`p-4 rounded-xl border-2 transition-all ${
                taskConfig.annotationType === type.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <type.icon className={`w-6 h-6 mx-auto mb-2 ${taskConfig.annotationType === type.id ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className={`text-sm font-medium ${taskConfig.annotationType === type.id ? 'text-blue-900' : 'text-gray-600'}`}>{type.label}</span>
            </button>
          ))}
        </div>
      </FormField>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-gray-900">标签配置</h4>
          <button onClick={addLabel} className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700">
            <Plus className="w-4 h-4" />添加标签
          </button>
        </div>
        <div className="space-y-3">
          {taskConfig.labels.map((label, index) => {
            const colorConfig = labelColors.find(c => c.solid === label.color) || labelColors[0];
            return (
              <div key={label.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-4 h-4 rounded-full ${label.color}`} />
                <input
                  type="text"
                  value={label.name}
                  onChange={(e) => updateLabel(label.id, { name: e.target.value })}
                  placeholder="标签名称"
                  className="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  value={label.shortcut}
                  onChange={(e) => updateLabel(label.id, { shortcut: e.target.value })}
                  placeholder="快捷键"
                  className="w-20 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-center focus:outline-none focus:border-blue-500"
                />
                <button onClick={() => removeLabel(label.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
          {taskConfig.labels.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <Tag className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">点击"添加标签"开始配置</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={taskConfig.allowMultiple}
            onChange={(e) => setTaskConfig({ ...taskConfig, allowMultiple: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">允许多选</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={taskConfig.required}
            onChange={(e) => setTaskConfig({ ...taskConfig, required: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">必填</span>
        </label>
      </div>

      <FormField label="标注说明">
        <TextArea value={taskConfig.instruction} onChange={(v) => setTaskConfig({ ...taskConfig, instruction: v })} placeholder="编写标注规范说明，可包含示例、注意事项等" rows={6} />
      </FormField>
    </div>
  );

  // Step 3: 任务分配
  const renderStep3 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <FormField label="选择标注人员" required>
        <div className="grid grid-cols-2 gap-3">
          {mockTeamMembers.filter(m => m.role === '标注员').map((member) => {
            const isSelected = assignmentConfig.annotators.includes(member.id);
            return (
              <button
                key={member.id}
                onClick={() => {
                  const newAnnotators = isSelected
                    ? assignmentConfig.annotators.filter(id => id !== member.id)
                    : [...assignmentConfig.annotators, member.id];
                  setAssignmentConfig({ ...assignmentConfig, annotators: newAnnotators });
                }}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                  isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                  isSelected ? 'bg-blue-500' : 'bg-gray-400'
                }`}>
                  {member.avatar}
                </div>
                <div className="flex-1 text-left">
                  <div className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>{member.name}</div>
                  <div className="text-xs text-gray-500">当前负载：{member.currentLoad}个任务</div>
                </div>
                {isSelected && <Check className="w-5 h-5 text-blue-600" />}
              </button>
            );
          })}
        </div>
      </FormField>

      {selectedDataset && assignmentConfig.annotators.length > 0 && (
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
          <h4 className="text-sm font-medium text-emerald-900 mb-2">分配预览</h4>
          <div className="text-sm text-emerald-700">
            每人分配 <span className="font-semibold">{Math.floor(selectedDataset.samples / assignmentConfig.annotators.length)}</span> 条样本
            {assignmentConfig.overlapRate > 0 && (
              <span>（重叠率 {assignmentConfig.overlapRate}%）</span>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        <FormField label="重叠率（%）">
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="100"
              value={assignmentConfig.overlapRate}
              onChange={(e) => setAssignmentConfig({ ...assignmentConfig, overlapRate: parseInt(e.target.value) })}
              className="flex-1"
            />
            <span className="w-12 text-right text-sm font-medium text-gray-900">{assignmentConfig.overlapRate}%</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">同一样本分配给多人标注，用于一致性检验</p>
        </FormField>

        <FormField label="优先级">
          <div className="flex gap-2">
            {[{ id: 'high', label: '高' }, { id: 'medium', label: '中' }, { id: 'low', label: '低' }].map((p) => (
              <button
                key={p.id}
                onClick={() => setAssignmentConfig({ ...assignmentConfig, priority: p.id as any })}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  assignmentConfig.priority === p.id
                    ? p.id === 'high' ? 'bg-red-50 text-red-600 border border-red-200' :
                      p.id === 'medium' ? 'bg-yellow-50 text-yellow-600 border border-yellow-200' :
                      'bg-gray-100 text-gray-600 border border-gray-200'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </FormField>
      </div>

      <FormField label="截止日期" required>
        <Input type="date" value={assignmentConfig.deadline} onChange={(v) => setAssignmentConfig({ ...assignmentConfig, deadline: v })} />
      </FormField>
    </div>
  );

  // Step 4: 确认创建
  const renderStep4 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">任务名称</h4>
          <p className="text-lg font-semibold text-gray-900">{taskConfig.name}</p>
          <p className="text-sm text-gray-600 mt-1">{taskConfig.description}</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">数据集</h4>
            <p className="text-sm text-gray-900">{selectedDataset?.name}</p>
            <p className="text-xs text-gray-500">{selectedDataset?.samples.toLocaleString()}条样本</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">标注类型</h4>
            <p className="text-sm text-gray-900">
              {taskConfig.annotationType === 'classification' ? '文本分类' :
               taskConfig.annotationType === 'ner' ? '命名实体' :
               taskConfig.annotationType === 'relation' ? '关系抽取' : '意图识别'}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">截止日期</h4>
            <p className="text-sm text-gray-900">{assignmentConfig.deadline}</p>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">标签配置（{taskConfig.labels.length}个）</h4>
          <div className="flex flex-wrap gap-2">
            {taskConfig.labels.map((label) => (
              <span key={label.id} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-white border`}>
                <span className={`w-2 h-2 rounded-full ${label.color}`} />
                {label.name}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">分配人员（{assignmentConfig.annotators.length}人）</h4>
          <div className="flex gap-2">
            {assignmentConfig.annotators.map((id) => {
              const member = mockTeamMembers.find(m => m.id === id);
              return member ? (
                <div key={id} className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border">
                  <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">{member.avatar}</div>
                  <span className="text-sm text-gray-700">{member.name}</span>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">创建后操作</h4>
            <p className="text-sm text-blue-700 mt-1">任务创建后将自动通知标注人员，你可以在任务详情页监控进度、管理样本、导出数据。</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">创建标注任务</h2>
          <button onClick={onCancel} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <StepIndicator steps={steps} currentStep={currentStep} />
          
          <div className="mt-8">
            {currentStep === 0 && renderStep1()}
            {currentStep === 1 && renderStep2()}
            {currentStep === 2 && renderStep3()}
            {currentStep === 3 && renderStep4()}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
              currentStep === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />上一步
          </button>
          
          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
            >
              下一步<ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" />创建中...</>
              ) : (
                <><Check className="w-4 h-4" />确认创建</>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ==================== 页面3：标注执行界面 ====================

const AnnotationWorkspace = ({ onBack }: { onBack: () => void }) => {
  const [currentSampleIndex, setCurrentSampleIndex] = useState(0);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [showShortcuts, setShowShortcuts] = useState(false);

  const samples = [
    { id: 1, text: '这个产品真的太好用了，强烈推荐给大家！', status: 'pending' },
    { id: 2, text: '质量一般般，没有想象中那么好。', status: 'completed', labels: ['中性'] },
    { id: 3, text: '太差了，完全不值这个价，后悔购买。', status: 'pending' },
    { id: 4, text: '物流很快，包装也很精美，满意。', status: 'pending' },
    { id: 5, text: '客服态度恶劣，问题也不解决。', status: 'disputed' },
  ];

  const labels = [
    { id: 'positive', name: '正面', color: 'bg-emerald-500', shortcut: '1' },
    { id: 'negative', name: '负面', color: 'bg-red-500', shortcut: '2' },
    { id: 'neutral', name: '中性', color: 'bg-blue-500', shortcut: '3' },
  ];

  const toggleLabel = (labelId: string) => {
    setSelectedLabels(prev => 
      prev.includes(labelId) 
        ? prev.filter(id => id !== labelId)
        : [...prev, labelId]
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSubmitting(false);
    if (currentSampleIndex < samples.length - 1) {
      setCurrentSampleIndex(currentSampleIndex + 1);
      setSelectedLabels([]);
    }
  };

  const currentSample = samples[currentSampleIndex];

  return (
    <div className="h-[calc(100vh-64px)] flex">
      {/* 左栏：样本列表 */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-900">样本列表</span>
            <span className="text-xs text-gray-500">{currentSampleIndex + 1}/{samples.length}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${((currentSampleIndex + 1) / samples.length) * 100}%` }} />
          </div>
          <div className="flex gap-1 mt-3">
            {[{ id: 'all', label: '全部' }, { id: 'completed', label: '已完成' }, { id: 'pending', label: '未完成' }].map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`flex-1 py-1 text-xs rounded ${filter === f.id ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {samples.map((sample, index) => (
            <button
              key={sample.id}
              onClick={() => setCurrentSampleIndex(index)}
              className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                index === currentSampleIndex ? 'bg-blue-50 border border-blue-200' :
                sample.status === 'completed' ? 'bg-emerald-50 text-emerald-700' :
                sample.status === 'disputed' ? 'bg-amber-50 text-amber-700' :
                'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">#{sample.id}</span>
                {sample.status === 'completed' && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                {sample.status === 'disputed' && <AlertCircle className="w-3.5 h-3.5 text-amber-500" />}
              </div>
              <p className="mt-1 line-clamp-2 text-gray-700">{sample.text}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 中间：标注画布 */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* 顶部工具栏 */}
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium text-gray-900">微博情感标注-第3轮</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowShortcuts(!showShortcuts)} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
              快捷键
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 标注区域 */}
        <div className="flex-1 flex">
          <div className="flex-1 p-8">
            <div className="max-w-3xl mx-auto">
              {/* 样本内容 */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs text-gray-400">样本 #{currentSample.id}</span>
                  {currentSample.status === 'disputed' && (
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-xs rounded-full flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />争议样本
                    </span>
                  )}
                </div>
                <p className="text-xl text-gray-900 leading-relaxed">{currentSample.text}</p>
              </div>

              {/* 标签选择 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-sm font-medium text-gray-700 mb-4">选择标签</h3>
                <div className="flex gap-3">
                  {labels.map((label) => {
                    const isSelected = selectedLabels.includes(label.id);
                    return (
                      <button
                        key={label.id}
                        onClick={() => toggleLabel(label.id)}
                        className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                          isSelected 
                            ? `border-transparent text-white` 
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                        style={{ backgroundColor: isSelected ? undefined : 'white' }}
                      >
                        <div className={`w-full h-full flex flex-col items-center justify-center ${isSelected ? label.color : ''} rounded-lg p-3 -m-3`}>
                          <span className="text-lg font-semibold">{label.name}</span>
                          <span className="text-xs mt-1 opacity-75">快捷键 {label.shortcut}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 右栏：辅助信息 */}
          <div className="w-80 bg-white border-l border-gray-200 p-4">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">样本信息</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">来源</span><span className="text-gray-900">微博采集</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">创建时间</span><span className="text-gray-900">2026-03-20</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">字数</span><span className="text-gray-900">{currentSample.text.length}字</span></div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">历史标注</h4>
                {currentSample.status === 'disputed' ? (
                  <div className="space-y-2">
                    <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600">张三：</span>
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">负面</span>
                      </div>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600">李四：</span>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded">正面</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">暂无历史标注</p>
                )}
              </div>

              {showShortcuts && (
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">快捷键</h4>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between"><span className="text-gray-500">1-3</span><span className="text-gray-700">选择标签</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Enter</span><span className="text-gray-700">提交</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">← →</span><span className="text-gray-700">切换样本</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Space</span><span className="text-gray-700">跳过</span></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 底部操作栏 */}
        <div className="h-16 bg-white border-t border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">保存草稿</button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors flex items-center gap-1.5">
              <span>跳过</span><span className="text-xs text-gray-400">(Space)</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleSubmit}
              disabled={selectedLabels.length === 0 || isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl transition-colors"
            >
              {isSubmitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" />提交中...</>
              ) : (
                <><span>提交并下一条</span><ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== 页面4：质检审核 ====================

const QualityReview = ({ onBack }: { onBack: () => void }) => {
  const [selectedSample, setSelectedSample] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'disputed' | 'pending'>('all');

  const samples = [
    { id: 1, text: '这个产品真的太好用了！', annotations: [{ user: '张三', label: '正面' }, { user: '李四', label: '正面' }], status: 'approved' },
    { id: 2, text: '质量一般般吧。', annotations: [{ user: '张三', label: '中性' }, { user: '李四', label: '中性' }], status: 'approved' },
    { id: 3, text: '太差了，完全不值这个价！', annotations: [{ user: '张三', label: '负面' }, { user: '李四', label: '正面' }], status: 'disputed' },
    { id: 4, text: '物流很快，满意。', annotations: [{ user: '张三', label: '正面' }, { user: '李四', label: '正面' }], status: 'pending' },
  ];

  const stats = {
    total: 10000,
    reviewed: 6500,
    approved: 5800,
    rejected: 450,
    disputed: 250,
    passRate: 89.2,
  };

  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">审核进度</div>
              <div className="text-2xl font-bold text-gray-900">{((stats.reviewed / stats.total) * 100).toFixed(1)}%</div>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-500">{stats.reviewed.toLocaleString()} / {stats.total.toLocaleString()} 条</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">通过率</div>
              <div className="text-2xl font-bold text-emerald-600">{stats.passRate}%</div>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-500">{stats.approved.toLocaleString()} 条通过</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">打回重标</div>
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <RotateCcw className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-500">{((stats.rejected / stats.reviewed) * 100).toFixed(1)}% 比例</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">争议样本</div>
              <div className="text-2xl font-bold text-amber-600">{stats.disputed}</div>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-500">需人工仲裁</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 样本列表 */}
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">审核样本</h3>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              {[{ id: 'all', label: '全部' }, { id: 'disputed', label: '争议' }, { id: 'pending', label: '待审核' }].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id as any)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    filter === f.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {samples.map((sample) => (
              <div
                key={sample.id}
                onClick={() => setSelectedSample(sample.id)}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedSample === sample.id ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-400">#{sample.id}</span>
                      {sample.status === 'disputed' && (
                        <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-xs rounded-full">争议</span>
                      )}
                      {sample.status === 'pending' && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">待审核</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-900">{sample.text}</p>
                  </div>
                  <div className="flex gap-1">
                    {sample.annotations.map((ann, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 text-xs rounded ${
                          sample.status === 'disputed' && idx === 1
                            ? 'bg-amber-50 text-amber-600 border border-amber-200'
                            : 'bg-blue-50 text-blue-600'
                        }`}
                      >
                        {ann.user}: {ann.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 审核详情 */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">审核操作</h3>
          {selectedSample ? (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-700">{samples.find(s => s.id === selectedSample)?.text}</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">标注结果对比</h4>
                {samples.find(s => s.id === selectedSample)?.annotations.map((ann, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                    <span className="text-sm text-gray-600">{ann.user}</span>
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">{ann.label}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <button className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" />采纳通过
                </button>
                <button className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Edit3 className="w-4 h-4" />修改标注
                </button>
                <button className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors flex items-center justify-center gap-2">
                  <RotateCcw className="w-4 h-4" />打回重标
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <Eye className="w-12 h-12 mx-auto mb-3" />
              <p className="text-sm">选择左侧样本进行审核</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// MessageSquare icon component
const MessageSquare = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

// ==================== 主入口组件 ====================

export default function AnnotationSystem() {
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'workspace' | 'review'>('list');
  const [selectedTask, setSelectedTask] = useState<AnnotationTask | null>(null);

  const handleCreateTask = () => {
    setCurrentView('create');
  };

  const handleViewTask = (task: AnnotationTask) => {
    setSelectedTask(task);
    setCurrentView('workspace');
  };

  const handleCompleteCreate = () => {
    setCurrentView('list');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* 顶部导航 */}
      <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200/80 flex items-center justify-between px-6 sticky top-0 z-10">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400 hover:text-gray-600 cursor-pointer">首页</span>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <span className="text-gray-400 hover:text-gray-600 cursor-pointer">数据中心</span>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <span className="text-gray-900 font-semibold">
            {currentView === 'list' && '数据标注'}
            {currentView === 'create' && '创建标注任务'}
            {currentView === 'workspace' && '标注工作区'}
            {currentView === 'review' && '质检审核'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {currentView === 'list' && (
            <button onClick={() => setCurrentView('review')} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl transition-colors">
              <CheckCircle2 className="w-4 h-4" />质检审核
            </button>
          )}
        </div>
      </header>

      {/* 主内容区 */}
      <main className="p-6 max-w-[1600px] mx-auto">
        {currentView === 'list' && (
          <TaskList onCreateTask={handleCreateTask} onViewTask={handleViewTask} />
        )}
        {currentView === 'create' && (
          <CreateTaskWizard onCancel={handleBackToList} onComplete={handleCompleteCreate} />
        )}
        {currentView === 'workspace' && (
          <AnnotationWorkspace onBack={handleBackToList} />
        )}
        {currentView === 'review' && (
          <QualityReview onBack={handleBackToList} />
        )}
      </main>
    </div>
  );
}
