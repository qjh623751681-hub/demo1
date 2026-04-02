import React, { useState } from 'react';
import {
  LayoutDashboard, Database, Code2, Brain, Sparkles, Cloud, Cpu, Settings,
  Search, Bell, Plus, ChevronRight, MoreVertical, MessageSquare, Bot, Zap,
  ExternalLink, FileText, Copy, Trash2, Edit3, Play, Pause, Activity,
  TrendingUp, Users, Clock, CheckCircle2, AlertCircle, Star, Download,
  Code, Webhook, Shield, Eye
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: '工作台' },
  { icon: Database, label: '数据中心' },
  { icon: Code2, label: '开发环境' },
  { icon: Brain, label: '模型中心' },
  { icon: Sparkles, label: 'AI应用', active: true },
  { icon: Cloud, label: '云服务' },
  { icon: Cpu, label: '算力中心' },
  { icon: Settings, label: '平台管理' },
];

const subNavItems = [
  { id: 'agents', label: '智能体', icon: Bot },
  { id: 'workflows', label: '工作流', icon: Activity },
  { id: 'plugins', label: '插件市场', icon: Zap },
  { id: 'api', label: 'API管理', icon: Code },
];

// 智能体数据
const agentData = [
  { id: 1, name: '客服助手-专业版', description: '基于企业知识库的智能客服，支持多轮对话', type: 'chatbot', status: 'running', calls: 45230, avgResponse: '1.2s', satisfaction: 94.5, creator: '张三', updatedAt: '2小时前' },
  { id: 2, name: '文档问答助手', description: '上传文档即可进行智能问答，支持PDF/Word/MD', type: 'rag', status: 'running', calls: 12890, avgResponse: '2.1s', satisfaction: 91.2, creator: '李四', updatedAt: '昨天' },
  { id: 3, name: '代码生成助手', description: '基于内部代码库的智能编程助手', type: 'code', status: 'stopped', calls: 5620, avgResponse: '-', satisfaction: 0, creator: '王五', updatedAt: '3天前' },
  { id: 4, name: '数据分析助手', description: '自然语言查询数据，自动生成图表', type: 'data', status: 'running', calls: 8920, avgResponse: '3.5s', satisfaction: 88.7, creator: '赵六', updatedAt: '1周前' },
];

// 工作流数据
const workflowData = [
  { id: 1, name: '智能客服流程', description: '接收问题→检索知识库→生成回答→满意度评价', triggers: ['API调用', 'Webhook'], executions: 45230, successRate: 98.5 },
  { id: 2, name: '日报自动生成', description: '拉取数据→分析汇总→生成报告→邮件发送', triggers: ['定时任务'], executions: 180, successRate: 100 },
  { id: 3, name: '文档处理流程', description: '上传文档→解析内容→提取摘要→索引存储', triggers: ['文件上传'], executions: 2340, successRate: 96.2 },
];

// 插件数据
const pluginData = [
  { id: 1, name: 'Web搜索', description: '实时搜索互联网信息', author: '官方', installs: 12580, rating: 4.9 },
  { id: 2, name: '数据库查询', description: '连接SQL/NoSQL数据库', author: '官方', installs: 8920, rating: 4.7 },
  { id: 3, name: '邮件发送', description: 'SMTP邮件发送', author: '社区', installs: 5620, rating: 4.5 },
  { id: 4, name: '企业微信', description: '企业微信消息推送', author: '社区', installs: 3420, rating: 4.6 },
];

export default function AIApplication({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [activeTab, setActiveTab] = useState('agents');

  const getStatusBadge = (status: string) => {
    const configs: { [key: string]: { text: string; color: string } } = {
      running: { text: '运行中', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
      stopped: { text: '已停止', color: 'bg-gray-100 text-gray-600 border-gray-200' },
      error: { text: '异常', color: 'bg-red-50 text-red-600 border-red-200' },
    };
    return <span className={`px-2 py-0.5 text-xs rounded-full border ${configs[status].color}`}>{configs[status].text}</span>;
  };

  const getTypeBadge = (type: string) => {
    const labels: { [key: string]: string } = {
      chatbot: '对话机器人',
      rag: '知识问答',
      code: '代码助手',
      data: '数据分析',
    };
    return <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full">{labels[type]}</span>;
  };

  const renderAgents = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
            <Plus className="w-4 h-4" />创建智能体
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl transition-colors">
            <Download className="w-4 h-4" />导入
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="搜索智能体..." className="pl-10 pr-4 py-2 w-64 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {agentData.map((agent) => (
          <div key={agent.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-violet-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {getTypeBadge(agent.type)}
                    {getStatusBadge(agent.status)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">{agent.description}</p>
            <div className="grid grid-cols-3 gap-3 py-3 border-y border-gray-100 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{(agent.calls / 1000).toFixed(1)}k</div>
                <div className="text-xs text-gray-500">调用次数</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{agent.avgResponse}</div>
                <div className="text-xs text-gray-500">平均响应</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{agent.satisfaction > 0 ? `${agent.satisfaction}%` : '-'}</div>
                <div className="text-xs text-gray-500">满意度</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">创建者: {agent.creator} · {agent.updatedAt}</span>
              <div className="flex gap-2">
                {agent.status === 'running' ? (
                  <button className="px-3 py-1.5 text-sm text-amber-600 hover:bg-amber-50 rounded-lg transition-colors flex items-center gap-1">
                    <Pause className="w-3.5 h-3.5" />暂停
                  </button>
                ) : (
                  <button className="px-3 py-1.5 text-sm text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-1">
                    <Play className="w-3.5 h-3.5" />启动
                  </button>
                )}
                <button className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">测试</button>
              </div>
            </div>
          </div>
        ))}
        <button className="border-2 border-dashed border-gray-200 rounded-2xl p-5 flex flex-col items-center justify-center text-gray-400 hover:border-blue-300 hover:text-blue-600 transition-colors min-h-[200px]">
          <Plus className="w-8 h-8 mb-2" />
          <span className="font-medium">创建新智能体</span>
        </button>
      </div>
    </div>
  );

  const renderWorkflows = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
          <Plus className="w-4 h-4" />创建工作流
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">工作流列表</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {workflowData.map((workflow) => (
            <div key={workflow.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{workflow.name}</h4>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Play className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-3">{workflow.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-500">触发器:</span>
                  <div className="flex gap-1">
                    {workflow.triggers.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">{t}</span>
                    ))}
                  </div>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500">执行: <span className="text-gray-900 font-medium">{workflow.executions.toLocaleString()}</span></span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500">成功率: <span className="text-emerald-600 font-medium">{workflow.successRate}%</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPlugins = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="搜索插件..." className="pl-10 pr-4 py-2 w-64 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {pluginData.map((plugin) => (
          <div key={plugin.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-3">
              <Zap className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{plugin.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{plugin.description}</p>
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400" />{plugin.rating}</span>
              <span>{(plugin.installs / 1000).toFixed(1)}k 安装</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-400">作者: {plugin.author}</span>
              <button className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">安装</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAPI = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Webhook className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">API Key</div>
              <div className="text-xl font-bold text-gray-900">3 个</div>
            </div>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700">管理密钥 →</button>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">今日调用</div>
              <div className="text-xl font-bold text-gray-900">12.5k</div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-emerald-600">
            <TrendingUp className="w-4 h-4" />+23.5%
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">平均延迟</div>
              <div className="text-xl font-bold text-gray-900">245ms</div>
            </div>
          </div>
          <div className="text-sm text-gray-500">P99: 890ms</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
        <Code className="w-16 h-16 text-gray-200 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">API 管理功能开发中</h3>
        <p className="text-gray-500">查看API文档、管理访问密钥、监控调用情况</p>
        <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
          查看API文档
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 flex font-sans">
      <aside className="w-16 bg-white border-r border-gray-200/80 flex flex-col items-center py-4 fixed h-full z-20 shadow-sm">
        <div className="mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>
        <nav className="flex-1 flex flex-col gap-0.5 w-full px-2">
          {navItems.map((item, index) => {
            const handleClick = () => {
              if (item.label === '工作台') onNavigate?.('dashboard');
              else if (item.label === '数据中心') onNavigate?.('datacenter');
              else if (item.label === '开发环境') onNavigate?.('dev');
              else if (item.label === '模型中心') onNavigate?.('model');
              else if (item.label === '云服务') onNavigate?.('cloud');
              else if (item.label === '算力中心') onNavigate?.('compute');
              else if (item.label === '平台管理') onNavigate?.('admin');
            };
            return (
              <button key={index} onClick={handleClick} className={`group relative w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-200 ${item.active ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}>
                <item.icon className="w-5 h-5" strokeWidth={item.active ? 2 : 1.5} />
                {item.active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-blue-600 rounded-r-full" />}
                <span className="absolute left-full ml-3 px-2.5 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-lg">
                  {item.label}
                  <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 ml-16 min-w-0">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200/80 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">首页</span>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <span className="text-gray-900 font-semibold">AI应用</span>
          </div>
          {/* 平台模块快速导航 */}
          <div className="flex-1 flex items-center justify-center gap-1">
            <button onClick={() => onNavigate?.('dashboard')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-gray-600 hover:bg-gray-50">工作台</button>
            <button onClick={() => onNavigate?.('datacenter')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-gray-600 hover:bg-gray-50">数据中心</button>
            <button onClick={() => onNavigate?.('dev')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-gray-600 hover:bg-gray-50">开发环境</button>
            <button onClick={() => onNavigate?.('model')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-gray-600 hover:bg-gray-50">模型中心</button>
            <button onClick={() => onNavigate?.('app')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all bg-blue-50 text-blue-700">AI应用</button>
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
              <span className="text-sm font-medium">应用文档</span>
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </button>
          </div>
        </header>

        <div className="p-6 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-1 mb-6 bg-white rounded-xl p-1 border border-gray-100 shadow-sm w-fit">
            {subNavItems.map((item) => (
              <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                <item.icon className="w-4 h-4" />{item.label}
              </button>
            ))}
          </div>

          {activeTab === 'agents' && renderAgents()}
          {activeTab === 'workflows' && renderWorkflows()}
          {activeTab === 'plugins' && renderPlugins()}
          {activeTab === 'api' && renderAPI()}
        </div>
      </main>
    </div>
  );
}

// Missing icon component
const UsersPanel = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);
