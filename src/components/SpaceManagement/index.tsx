import React, { useState } from 'react';
import {
  Search, Plus, HardDrive, Users, Clock, CheckCircle2, AlertTriangle,
  BookOpen, Bot, BarChart3, ArrowUpRight, Folder, Database, Tag,
  Upload, FileText, ChevronRight, MoreVertical, Settings
} from 'lucide-react';

interface Space {
  id: string;
  name: string;
  type: 'personal' | 'team' | 'project';
  quota: number;
  used: number;
  fileCount: number;
  processingCount: number;
}

const mockSpaces: Space[] = [
  {
    id: 'personal',
    name: '个人空间',
    type: 'personal',
    quota: 50 * 1024 * 1024 * 1024, // 50GB
    used: 15.2 * 1024 * 1024 * 1024, // 15.2GB
    fileCount: 325,
    processingCount: 3
  },
  {
    id: 'team-ai',
    name: 'AI研发部',
    type: 'team',
    quota: 100 * 1024 * 1024 * 1024, // 100GB
    used: 45.8 * 1024 * 1024 * 1024, // 45.8GB
    fileCount: 1234,
    processingCount: 12
  },
  {
    id: 'project-a',
    name: '项目A',
    type: 'project',
    quota: 20 * 1024 * 1024 * 1024, // 20GB
    used: 12.5 * 1024 * 1024 * 1024, // 12.5GB
    fileCount: 156,
    processingCount: 0
  },
];

const recentActivities = [
  { id: 1, type: 'upload', user: '张三', content: '上传了 企业培训文档.pdf', time: '2分钟前' },
  { id: 2, type: 'annotation', user: '李四', content: '完成了 客服意图标注任务', time: '15分钟前' },
  { id: 3, type: 'pipeline', user: '系统', content: '数据清洗流水线 处理完成 156个文件', time: '1小时前' },
  { id: 4, type: 'dataset', user: '王五', content: '新增数据集 产品说明知识库', time: '3小时前' },
];

interface SpaceManagementProps {
  onSelectSpace: (space: Space) => void;
  onCreateSpace: () => void;
  onQuickAction: (action: 'upload' | 'dataset' | 'annotation' | 'pipeline') => void;
}

export default function SpaceManagement({ onSelectSpace, onCreateSpace, onQuickAction }: SpaceManagementProps) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadScenario, setUploadScenario] = useState<'knowledge' | 'training' | 'analysis' | 'custom' | null>(null);

  const formatSize = (bytes: number): string => {
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)}GB`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}MB`;
    return `${bytes}B`;
  };

  const getQuotaPercentage = (used: number, quota: number): string => {
    return ((used / quota) * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* 搜索栏 */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="搜索所有空间的数据..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-gray-400"
        />
      </div>

      {/* 我的空间 */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">我的空间</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockSpaces.map((space) => (
            <div
              key={space.id}
              onClick={() => onSelectSpace(space)}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    space.type === 'personal' ? 'bg-blue-50' :
                    space.type === 'team' ? 'bg-purple-50' : 'bg-emerald-50'
                  }`}>
                    {space.type === 'personal' && <Folder className="w-6 h-6 text-blue-600" />}
                    {space.type === 'team' && <Users className="w-6 h-6 text-purple-600" />}
                    {space.type === 'project' && <BarChart3 className="w-6 h-6 text-emerald-600" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{space.name}</h4>
                    <p className="text-sm text-gray-500 mt-0.5">{space.type === 'personal' ? '个人专属空间' : space.type === 'team' ? '团队共享空间' : '项目协作空间'}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">存储空间</span>
                  <span className="font-medium text-gray-900">{formatSize(space.used)} / {formatSize(space.quota)}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${getQuotaPercentage(space.used, space.quota)}%`,
                      backgroundColor: parseFloat(getQuotaPercentage(space.used, space.quota)) > 90 ? '#EF4444' : '#3B82F6'
                    }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{space.fileCount} 个文件</span>
                  <span>{space.processingCount} 个处理中</span>
                </div>
              </div>
              <button className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                进入空间
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={onCreateSpace}
          className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/30 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">创建新空间</span>
        </button>
      </div>

      {/* 快速入口 */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">快速入口</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button onClick={() => {
            setShowUploadModal(true);
            onQuickAction('upload');
          }} className="p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-300 hover:bg-blue-50/30 transition-all text-left group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Upload className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">上传文件</span>
            </div>
            <p className="text-xs text-gray-500">支持场景化引导</p>
          </button>
          <button onClick={() => onQuickAction('dataset')} className="p-4 bg-white border border-gray-100 rounded-xl hover:border-purple-300 hover:bg-purple-50/30 transition-all text-left group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-purple-600" />
              </div>
              <span className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">创建数据集</span>
            </div>
            <p className="text-xs text-gray-500">4步创建向导</p>
          </button>
          <button onClick={() => onQuickAction('annotation')} className="p-4 bg-white border border-gray-100 rounded-xl hover:border-amber-300 hover:bg-amber-50/30 transition-all text-left group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                <Tag className="w-5 h-5 text-amber-600" />
              </div>
              <span className="font-medium text-gray-900 group-hover:text-amber-600 transition-colors">开始标注</span>
            </div>
            <p className="text-xs text-gray-500">AI预标注 + 人工修正</p>
          </button>
          <button onClick={() => onQuickAction('pipeline')} className="p-4 bg-white border border border-gray-100 rounded-xl hover:border-emerald-300 hover:bg-emerald-50/30 transition-all text-left group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">创建流水线</span>
            </div>
            <p className="text-xs text-gray-500">自动化数据处理</p>
          </button>
        </div>
      </div>

      {/* 数据质量监控 */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">数据质量监控</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">98.5%</div>
                <div className="text-xs text-gray-500">数据完整度</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">95.2%</div>
                <div className="text-xs text-gray-500">处理成功率</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">0</div>
                <div className="text-xs text-gray-500">异常数</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 最近活动 */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">最近活动</h3>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-50">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                  {activity.type === 'upload' && <Upload className="w-4 h-4 text-gray-500" />}
                  {activity.type === 'annotation' && <Tag className="w-4 h-4 text-gray-500" />}
                  {activity.type === 'pipeline' && <BarChart3 className="w-4 h-4 text-gray-500" />}
                  {activity.type === 'dataset' && <Database className="w-4 h-4 text-gray-500" />}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span>
                    <span className="text-gray-500 mx-1">{activity.content}</span>
                  </div>
                  <div className="text-xs text-gray-400">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 上传弹窗 */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[700px] max-w-[90vw]">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">数据上传</h3>
              <button onClick={() => setShowUploadModal(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="w-5 h-5" />
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
                      <ChevronRight className="w-4 h-4 inline rotate-180" />返回
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
                        <div className="w-5 h-5 text-blue-600">
                          <ArrowUpRight />
                        </div>
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
                        <option>个人空间</option>
                        <option>AI研发部</option>
                        <option>项目A</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 block mb-1.5">敏感度</label>
                      <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                        <option value="public">公开</option>
                        <option value="internal">内部</option>
                        <option value="confidential">机密</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 block mb-1.5">标签</label>
                      <div className="flex items-center gap-2">
                        {uploadScenario === 'knowledge' ? ['内部资料', '培训'] : ['训练数据', '公开'].map(tag => (
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
    </div>
  );
}
