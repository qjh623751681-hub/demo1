import React, { useState } from 'react';
import {
  ArrowLeft, Edit3, Download, Share2, MoreVertical, Users, Clock,
  FileText, GitBranch, Eye, CheckCircle2, Lock, Unlock,
  ChevronRight, ChevronDown, Calendar, HardDrive, Tag,
  ExternalLink, Copy, Filter, Search, SortAsc, Layers,
  History, BarChart3, Settings
} from 'lucide-react';

interface DatasetDetailProps {
  dataset: {
    id: number;
    name: string;
    description: string;
    type: string;
    subtype?: string;
    format: string;
    samples: number;
    size: string;
    status: string;
    updated: string;
    owner: string;
    tags: string[];
    dataSource: string;
  };
  onBack: () => void;
}

export default function DatasetDetail({ dataset, onBack }: DatasetDetailProps) {
  const [activeTab, setActiveTab] = useState('basic');
  const [showShareModal, setShowShareModal] = useState(false);

  const tabs = [
    { id: 'basic', label: '基本信息', icon: FileText },
    { id: 'preview', label: '数据预览', icon: Eye },
    { id: 'versions', label: '版本管理', icon: GitBranch },
    { id: 'lineage', label: '血缘追踪', icon: Layers },
    { id: 'permissions', label: '权限', icon: Lock },
  ];

  // 模拟版本数据
  const versions = [
    { id: 'v1.0.3', status: 'published', date: '2026-03-28', samples: 125000, isMain: true },
    { id: 'v1.0.2', status: 'archived', date: '2026-03-25', samples: 120000, isMain: false },
    { id: 'v1.0.1', status: 'published', date: '2026-03-20', samples: 120000, isMain: false },
    { id: 'v1.0.0', status: 'archived', date: '2026-03-15', samples: 100000, isMain: false },
  ];

  // 模拟数据预览
  const previewData = [
    { id: 1, input: '用户问：如何提升Python代码性能？', output: '可以使用以下方法：1.使用列表推导式代替循环...', source: '训练集' },
    { id: 2, input: '用户问：什么是机器学习？', output: '机器学习是人工智能的一个分支，通过算法从数据中学习...', source: '训练集' },
    { id: 3, input: '用户问：如何训练一个神经网络？', output: '训练神经网络需要以下步骤：1.准备数据集...', source: '训练集' },
    { id: 4, input: '用户问：什么是过拟合？', output: '过拟合是指模型在训练数据上表现很好...', source: '训练集' },
    { id: 5, input: '用户问：如何防止过拟合？', output: '防止过拟合的方法包括：1.正则化...', source: '训练集' },
  ];

  // 模拟血缘数据
  const lineageData = {
    upstream: [
      { id: 1, name: '原始语料/raw-data-v3.jsonl', type: 'file', date: '2026-03-20' },
      { id: 2, name: '数据清洗Pipeline', type: 'pipeline', date: '2026-03-25' },
    ],
    downstream: [
      { id: 1, name: 'Llama-3-70B微调任务', type: 'training', date: '2026-03-28' },
      { id: 2, name: '模型评估-v1', type: 'evaluation', date: '2026-03-29' },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4 max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-bold text-gray-900">{dataset.name}</h1>
                  {dataset.status === 'ready' && (
                    <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-600 text-xs rounded-full border border-emerald-200">✅ 就绪</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{dataset.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors border border-gray-200">
                <Edit3 className="w-4 h-4" />
                <span className="text-sm font-medium">编辑</span>
              </button>
              <button onClick={() => setShowShareModal(true)} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors border border-gray-200">
                <Share2 className="w-4 h-4" />
                <span className="text-sm font-medium">分享</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">导出</span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-[73px] z-10">
        <div className="px-6 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-[1600px] mx-auto">
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">基本信息</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm text-gray-500 block mb-1.5">数据集名称</label>
                    <div className="font-medium text-gray-900">{dataset.name}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1.5">数据集描述</label>
                    <div className="font-medium text-gray-900">{dataset.description}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1.5">数据集类型</label>
                    <div className="font-medium text-gray-900">
                      {dataset.type === 'text' ? '文本数据' : `多模态 (${dataset.subtype})`}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1.5">数据格式</label>
                    <div className="font-medium text-gray-900">{dataset.format}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1.5">样本数量</label>
                    <div className="font-medium text-gray-900">{dataset.samples.toLocaleString()}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1.5">数据大小</label>
                    <div className="font-medium text-gray-900">{dataset.size}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1.5">创建时间</label>
                    <div className="font-medium text-gray-900">2026-03-20</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1.5">更新时间</label>
                    <div className="font-medium text-gray-900">{dataset.updated}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1.5">所有者</label>
                    <div className="font-medium text-gray-900">{dataset.owner}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1.5">数据来源</label>
                    <div className="font-medium text-gray-900 flex items-center gap-1">
                      <HardDrive className="w-4 h-4 text-gray-400" />
                      {dataset.dataSource}
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <label className="text-sm text-gray-500 block mb-2">标签</label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {dataset.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
                        {tag}
                      </span>
                    ))}
                    <button className="px-3 py-1.5 border border-dashed border-gray-300 text-gray-500 text-sm rounded-full hover:border-blue-500 hover:text-blue-600 transition-colors">
                      + 添加标签
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">关联标注任务</h2>
              </div>
              <div className="p-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Tag className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">微博情感标注-第二轮</div>
                      <div className="text-sm text-gray-500">进度 78% · 标注员: 5人 · 截止: 2026-04-05</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm">
                    进入标注
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="font-semibold text-gray-900">数据预览</h2>
                <span className="text-sm text-gray-500">显示前 5 条 / 共 {dataset.samples.toLocaleString()} 条</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200">
                  <Filter className="w-4 h-4" />
                  过滤
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200">
                  <SortAsc className="w-4 h-4" />
                  排序
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-50">
              {previewData.map((item) => (
                <div key={item.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-[80px,1fr,1fr] gap-4">
                    <div className="text-sm text-gray-500 font-medium">#{item.id}</div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">输入</div>
                      <div className="text-sm text-gray-700 bg-gray-50 rounded-lg p-2">{item.input}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">输出</div>
                      <div className="text-sm text-gray-700 bg-gray-50 rounded-lg p-2">{item.output}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <div className="text-sm text-gray-500">第 1 页 / 共 25,000 页</div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-50 rounded-lg border border-gray-200">
                  上一页
                </button>
                <button className="px-3 py-1.5 text-sm text-gray-700 bg-blue-50 text-blue-600 rounded-lg">
                  下一页
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'versions' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">版本历史</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm">
                  <Copy className="w-4 h-4" />
                  对比版本
                </button>
              </div>
              <div className="divide-y divide-gray-50">
                {versions.map((version) => (
                  <div key={version.id} className={`px-6 py-4 hover:bg-gray-50 transition-colors ${version.isMain ? 'bg-blue-50/30' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-100">
                          <GitBranch className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">{version.id}</span>
                            {version.status === 'published' && (
                              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs rounded-full">✅ 已发布</span>
                            )}
                            {version.status === 'archived' && (
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">⚪ 已归档</span>
                            )}
                            {version.isMain && (
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full border border-blue-200">主版本</span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 mt-0.5">
                            {version.samples.toLocaleString()} 样本 · 创建于 {version.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">预览</button>
                        {version.isMain ? (
                          <button className="px-3 py-1.5 text-sm text-gray-400 rounded-lg" disabled>设为主版本</button>
                        ) : (
                          <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">设为主版本</button>
                        )}
                        <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">下载</button>
                        <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">恢复</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lineage' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
            <Layers className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">数据血缘追踪</h3>
            <p className="text-gray-500">可视化展示数据从源头到下游的完整链路</p>
          </div>
        )}

        {activeTab === 'permissions' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
            <Lock className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">权限管理</h3>
            <p className="text-gray-500">管理用户和组的访问权限</p>
          </div>
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[500px] max-w-[90vw]">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">分享数据集</h3>
              <button onClick={() => setShowShareModal(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="text-sm text-gray-500 block mb-2">链接分享</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value="https://platform.example.com/datasets/instruction-finetuning-v2"
                    readOnly
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                  />
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-2">访问权限</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-all">
                    <input type="radio" name="access" className="w-4 h-4 text-blue-600" defaultChecked />
                    <Unlock className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">公开</div>
                      <div className="text-xs text-gray-500">任何拥有链接的人都可以查看</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-all">
                    <input type="radio" name="access" className="w-4 h-4 text-blue-600" />
                    <Lock className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">私有</div>
                      <div className="text-xs text-gray-500">仅授权用户可以访问</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
              <button onClick={() => setShowShareModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                取消
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
                复制链接
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
