import React, { useState } from 'react';
import {
  LayoutDashboard, Database, Code2, Brain, Sparkles, Cloud, Cpu, Settings,
  Search, Bell, Plus, ChevronRight, MoreVertical, GitBranch, Clock, HardDrive,
  Download, Upload, Play, Pause, Trash2, Copy, Star, Zap, ExternalLink,
  FileText, Image, BarChart3, Activity, CheckCircle2, AlertCircle, Layers,
  Terminal, Box, Server, TrendingUp, Filter, HelpCircle, X, ChevronLeft, ChevronDown,
  ArrowRight, ArrowLeft, Info, Check, Loader2, Eye, Edit3, Save
} from 'lucide-react';

// 导航项
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

// 子导航项
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

  // 弹窗状态
  const [showModelModal, setShowModelModal] = useState(false);
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [showDeploymentModal, setShowDeploymentModal] = useState(false);

  // 分步表单状态
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // 通用字段
    name: '',
    description: '',
    // 模型仓库专用
    source: '',
    version: '',
    size: '',
    tags: [] as string[],
    // 训练任务专用
    model: '',
    dataset: '',
    gpu: '',
    trainingType: 'lora',
    // 评测专用
    dataset: '',
    evaluationType: 'accuracy',
    // 部署专用
    instances: 1,
    replica: '',
  });

  // 表单验证错误
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // 状态显示
  const getStatusBadge = (status: string) => {
    const configs: { [key: string]: { text: string; color: string } } = {
      published: { text: '已发布', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
      training: { text: '训练中', color: 'bg-blue-50 text-blue-600 border-blue-200' },
      running: { text: '运行中', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
      completed: { text: '已完成', color: 'bg-purple-50 text-purple-600 border-purple-200' },
      failed: { text: '失败', color: 'bg-red-50 text-red-600 border-red-200' },
      stopped: { text: '已停止', color: 'bg-gray-100 text-gray-600 border-gray-200' },
      paused: { text: '已暂停', color: 'bg-amber-50 text-amber-600 border-amber-200' },
      evaluating: { text: '评测中', color: 'bg-blue-50 text-blue-600 border-blue-200' },
      pending: { text: '待开始', color: 'bg-gray-100 text-gray-600 border-gray-200' },
      online: { text: '在线', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
      offline: { text: '离线', color: 'bg-gray-100 text-gray-600 border-gray-200' },
    };
    return <span className={`px-2 py-0.5 text-xs rounded-full border ${configs[status]?.color || 'bg-gray-100 text-gray-600'}`}>{configs[status]?.text || status}</span>;
  };

  // 验证表单
  const validateForm = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      // 基础信息
      if (!formData.name.trim()) {
        newErrors.name = '请输入名称';
      }
    } else if (step === 2) {
      // 具体配置
      if (activeTab === 'models') {
        if (!formData.source) {
          newErrors.source = '请选择来源';
        }
      } else if (activeTab === 'training') {
        if (!formData.model) {
          newErrors.model = '请选择模型';
        }
      } else if (activeTab === 'evaluation') {
        if (!formData.dataset) {
          newErrors.dataset = '请选择数据集';
        }
      }
    } else if (step === 3) {
      // 确认信息
      if (!formData.description?.trim()) {
        newErrors.description = '请输入描述';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 处理步骤切换
  const handleNextStep = () => {
    if (!validateForm(currentStep)) return;
    setTouched({});
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setTouched({});
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 处理提交
  const handleSubmit = () => {
    if (!validateForm(currentStep)) return;
    alert('创建成功！（演示模式）');
    handleClose();
  };

  const handleClose = () => {
    setShowModelModal(false);
    setShowTrainingModal(false);
    setShowEvaluationModal(false);
    setShowDeploymentModal(false);
    setCurrentStep(1);
    setFormData({
      name: '',
      description: '',
      source: '',
      version: '',
      size: '',
      tags: [],
      model: '',
      dataset: '',
      gpu: '',
      trainingType: 'lora',
      evaluationType: 'accuracy',
      instances: 1,
      replica: '',
    });
    setErrors({});
    setTouched({});
  };

  // 分步渲染函数
  const renderStep1 = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          名称 <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          placeholder="例如：我的自定义模型"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          onFocus={() => setTouched({ ...touched, name: true })}
          className={`w-full px-4 py-2 border ${
            errors.name && touched.name
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-200 focus:ring-blue-500'
          } rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50`}
        />
        {errors.name && touched.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
        <div className="flex items-center gap-2 mt-1">
          <HelpCircle className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-500">为模型起一个易于识别的名称</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          描述 <span className="text-red-500 ml-1">*</span>
        </label>
        <textarea
          placeholder="简要描述模型的用途、特点..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          onFocus={() => setTouched({ ...touched, description: true })}
          rows={3}
          className={`w-full px-4 py-2 border ${
            errors.description && touched.description
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-200 focus:ring-blue-500'
          } rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50`}
        />
        {errors.description && touched.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description}</p>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      {activeTab === 'models' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              来源 <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              className={`w-full px-4 py-2.5 border ${
                errors.source && touched.source
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-200 focus:ring-blue-500'
              } rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50`}
            >
              <option value="">请选择来源</option>
              <option value="official">官方模型</option>
              <option value="huggingface">Hugging Face</option>
              <option value="custom">自定义</option>
            </select>
            {errors.source && touched.source && (
              <p className="text-red-500 text-xs mt-1">{errors.source}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              版本号 <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              placeholder="例如：v1.0"
              value={formData.version}
              onChange={(e) => setFormData({ ...formData, version: e.target.value })}
              onFocus={() => setTouched({ ...touched, version: true })}
              className={`w-full px-4 py-2.5 border ${
                errors.version && touched.version
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-200 focus:ring-blue-500'
              } rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50`}
            />
            {errors.version && touched.version && (
              <p className="text-red-500 text-xs mt-1">{errors.version}</p>
            )}
            <div className="flex items-center gap-2 mt-1">
              <HelpCircle className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-500">使用语义化版本号，如 v1.0</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              大小
            </label>
            <input
              type="text"
              placeholder="例如：140GB"
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 focus:ring-blue-500 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
            />
            <div className="flex items-center gap-2 mt-1">
              <HelpCircle className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-500">可选，用于展示模型大小</span>
            </div>
          </div>
        </>
      )}

      {activeTab === 'training' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              选择模型 <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              className={`w-full px-4 py-2.5 border ${
                errors.model && touched.model
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-200 focus:ring-blue-500'
              } rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50`}
            >
              <option value="">请选择模型</option>
              {modelData.filter(m => m.status === 'published').map((model) => (
                <option key={model.id} value={model.name}>
                  {model.name} - {model.size}
                </option>
              ))}
            </select>
            {errors.model && touched.model && (
              <p className="text-red-500 text-xs mt-1">{errors.model}</p>
            )}
            <div className="flex items-center gap-2 mt-1">
              <Info className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-blue-600">只显示已发布的模型</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              选择数据集 <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              value={formData.dataset}
              onChange={(e) => setFormData({ ...formData, dataset: e.target.value })}
              className={`w-full px-4 py-2.5 border ${
                errors.dataset && touched.dataset
                  ? 'border-red-500 focus:-red-500'
                  : 'border-gray-200 focus:ring-blue-500'
              } rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50`}
            >
              <option value="">请选择数据集</option>
              <option value="instruction-set-v2">指令微调数据集</option>
              <option value="ImageNet-1K">ImageNet-1K</option>
              <option value="weibo-sentiment">微博情感数据集</option>
            </select>
            {errors.dataset && touched.dataset && (
              <p className="text-red-500 text-xs mt-1">{errors.dataset}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GPU资源
            </label>
            <select
              value={formData.gpu}
              onChange={((e) => setFormData({ ...formData, gpu: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 focus:ring-blue-500 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
            >
              <option value="">请选择GPU资源</option>
              <option value="A100 x 1">A100 x 1</option>
              <option value="A100 x 2">A100 x 2</option>
              <option value="A100 x 4">A100 x 4</option>
              <option value="A100 x 8">A100 x 8</option>
              <option value="H100 x 1">H100 x 1</option>
              <option value="H100 x 2">H100 x 2</option>
            </select>
            <div className="flex items-center gap-2 mt-1">
              <HelpCircle className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-500">根据模型大小选择合适的GPU配置</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              训练方式
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, trainingType: 'lora' })}
                className={`flex-1 px-4 py-2.5 border ${
                  formData.trainingType === 'lora'
                    ? 'bg-blue-50 text-blue-700 border-blue-500'
                    : 'border-gray-200 hover:border-gray-300'
                } rounded-lg text-sm font-medium transition-colors`}
              >
                LoRA（推荐）
                <span className="block text-xs text-blue-600 mt-1">轻量级微调</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, trainingType: 'full' })}
                className={`flex-1 px-4 py-2.5 border ${
                  formData.trainingType === 'full'
                    ? 'bg-purple-50 text-purple-700 border-purple-500'
                    : 'border-gray-200 hover:border-gray-300'
                } rounded-lg text-sm font-medium transition-colors`}
              >
                全量训练
                <span className="block text-xs text-purple-600 mt-1">完整参数优化</span>
              </button>
            </div>
            <div className="flex items-start gap-2 mt-2 text-xs text-gray-500">
              <Info className="w-3 h-3 text-gray-400 mt-0.5" />
              <p>LoRA推荐用于大部分场景，训练速度快且效果好</p>
              <p>全量训练适用于需要最佳性能的场景</p>
            </div>
          </div>
        </>
      )}

      {activeTab === 'evaluation' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            选择模型 <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            className={`w-full px-4 py-2.5 border ${
              errors.model && touched.model
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-200 focus:ring-blue-500'
            } rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50`}
          >
            <option value="">请选择模型</option>
            {modelData.filter(m => m.status === 'published' || m.status === 'training').map((model) => (
              <option key={model.id} value={model.name}>
                {model.name} {model.status === 'training' ? '(训练中)' : ''}
              </option>
            ))}
          </select>
          {errors.model && touched.model && (
            <p className="text-red-500 text-xs mt-1">{errors.model}</p>
          )}
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-2 mb-3">
          <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">确认信息</h4>
            <p className="text-sm text-blue-700 mt-1">请检查以下信息是否正确</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">名称：</span>
            <span className="font-medium text-gray-900">{formData.name}</span>
          </div>
          {activeTab === 'models' && (
            <>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">来源：</span>
                <span className="font-medium text-gray-900">{formData.source}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">版本：</span>
                <span className="font-medium text-gray-900">{formData.version}</span>
              </div>
              {formData.size && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">大小：</span>
                  <span className="font-medium text-gray-900">{formData.size}</span>
                </div>
              )}
            </>
          )}
          {activeTab === 'training' && (
            <>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">模型：</span>
                <span className="font-medium text-gray-900">{formData.model}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">数据集：</span>
                <span className="font-medium text-gray-900">{formData.dataset}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">GPU资源：</span>
                <span className="font-medium text-gray-900">{formData.gpu}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">训练方式：</span>
                <span className="font-medium text-gray-900">
                  {formData.trainingType === 'lora' ? 'LoRA（轻量级）' : '全量训练'}
                </span>
              </div>
            </>
          )}
          {activeTab === 'evaluation' && (
            <>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">模型：</span>
                <span className="font-medium text-gray-900">{formData.model}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">评测数据集：</span>
                <span className="font-medium text-gray-900">{formData.dataset}</span>
              </div>
            </>
          )}
          {formData.description && (
            <div className="flex items-start gap-2">
              <span className="text-gray-500">描述：</span>
              <span className="font-medium text-gray-900">{formData.description}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // 渲染弹窗内容
  const renderModalContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };

  const renderModels = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
          <Upload className="w-4 h-4" />上传模型
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl transition-colors">
          <GitBranch className="w-4 h-4" />模型对比
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {modelData.map((model) => (
          <div key={model.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${model.status === 'training' ? 'bg-blue-50' : 'bg-gradient-to-br from-blue-50 to-indigo-50'} rounded-xl flex items-center justify-center`}>
                  <Box className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{model.name}</h3>
                  <p className="text-sm text-gray-500">{model.source}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <getStatusBadge(model.status)}
                {model.rating > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                    <span className="text-sm text-gray-600">{model.rating}</span>
                  </div>
                )}
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-sm space-y-1 text-gray-600">
              <p><span className="text-gray-500">版本：</span>{model.version}</p>
              <p><span className="text-gray-500">大小：</span>{model.size}</p>
              <p><span className="text-gray-500">下载量：</span>{model.downloads.toLocaleString()}</p>
            </div>

            {model.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {model.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderTraining = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            setFormData({ name: '', description: '', model: '', dataset: '', gpu: '', trainingType: 'lora' });
            setCurrentStep(1);
            setShowTrainingModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />创建训练任务
        </button>
        <button
          onClick={() => alert('训练模板功能开发中...')}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl transition-colors"
        >
          <Layers className="w-4 h-4" />训练模板
        </button>
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
        <button
          onClick={() => {
            setFormData({ name: '', description: '', model: '', dataset: '' });
            setCurrentStep(1);
            setShowEvaluationModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />创建评测任务
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
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
        <button
          onClick={() => {
            setFormData({ name: '', description: '', instances: 1, replica: '' });
            setCurrentStep(1);
            setShowDeploymentModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />部署新服务
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font_label-semibold text-gray-900">部署服务列表</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {deploymentData.map((deploy) => (
            <div key={deploy.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{deploy.name}</h4>
                  <p className="text-sm text-gray-500">模型：{deploy.model}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(deploy.status)}
                  <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg">
                    <Play className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-4 text-sm mb-3">
                <div><span className="text-gray-500">版本：</span><span className="text-gray-900">{deploy.version}</span></div>
                <div><span className="text-gray-500">实例数：</span><span className="text-gray-900">{deploy.instances}</span></div>
                <div><span className="text-gray-500">QPS：</span><span className="text-gray-900">{deploy.qps}</span></div>
                <div><span className="text-gray-500">延迟：</span><span className="text-gray-900">{deploy.latency}</span></div>
                <div>
                  <div><span className="text-gray-500">调用次数：</span><span className="text-gray-900">{deploy.calls}</span></div>
                  <div className="text-xs text-gray-400">累计</div>
                </div>
                <div className="flex-1" />
                <button className="text-sm text-blue-600 hover:text-blue-700">查看详情</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 渲染创建弹窗
  const renderCreateModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* 头部 */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {activeTab === 'models' && '注册模型'}
            {activeTab === 'training' && '创建训练任务'}
            {activeTab === 'evaluation' && '创建评测任务'}
            {activeTab === 'deployment' && '部署服务'}
          </h3>
          <button onClick={handleClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* 进度指示器 */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
          {['基础信息', '配置参数', '确认信息'].map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 ${
                currentStep === index + 1 ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <div className={`w-8 h-8 rounded-full border-2 ${
                currentStep === index + 1 ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
              } flex items-center justify-center text-xs font-medium`}>
                {index + 1}
              </div>
              <span className="text-sm">{step}</span>
              {currentStep > index + 1 && (
                <div className="flex-1 h-0.5 bg-blue-500 mx-2"></div>
              )}
            </div>
          ))}
        </div>

        {/* 内容区 */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderModalContent()}
        </div>

        {/* 底部按钮 */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className={`px-6 py-2.5 text-sm font-medium rounded-xl transition-colors ${
              currentStep === 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            上一步
          </button>
          <div className="flex gap-2">
            {currentStep === 1 && (
              <button
                onClick={handleClose}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors"
              >
                取消
              </button>
            )}
            {currentStep === 2 && (
              <button
                onClick={handlePrevStep}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors"
              >
                上一步
              </button>
            )}
            {currentStep === 3 && (
              <button
                onClick={handlePrevStep}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors"
              >
                上一步
              </button>
            )}
            <button
              onClick={currentStep === 3 ? handleSubmit : handleNextStep}
              disabled={currentStep === 3 || Object.keys(errors).length > 0}
              className={`px-6 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                (currentStep === 3 && Object.keys(errors).length === 0)
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentStep === 3 ? '确认创建' : '下一步'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200/80 flex items-center justify-between px-6 sticky top-0 z-10">
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

      {/* 主内容区 */}
      <div className="flex-1 ml-16 min-w-0">
        <div className="p-6 max-w-[1600px] mx-auto">
          {/* Tab切换 */}
          <div className="flex items-center gap-1 mb-6 bg-white rounded-xl p-1 border border-gray-100 shadow-sm w-fit">
            {subNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>

          {activeTab === 'models' && renderModels()}
          {activeTab === 'training' && renderTraining()}
          {activeTab === 'evaluation' && renderEvaluation()}
          {activeTab === 'deployment' && renderDeployment()}
        </div>
      </div>

      {/* 弹窗 */}
      {(showModelModal || showTrainingModal || showEvaluationModal || showDeploymentModal) && (
        renderCreateModal()
      )}
    </div>
  );
}
