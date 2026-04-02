import React, { useState } from 'react';
import {
  LayoutDashboard, Database, Code2, Brain, Sparkles, Cloud, Cpu, Settings,
  Search, Bell, Plus, ChevronRight, MoreVertical, Server, Activity, TrendingUp,
  AlertTriangle, CheckCircle2, Clock, Thermometer, Zap, HardDrive, MemoryStick,
  Gauge, Filter, Download, Pause, Play, RefreshCw, ExternalLink, FileText
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: '工作台' },
  { icon: Database, label: '数据中心' },
  { icon: Code2, label: '开发环境' },
  { icon: Brain, label: '模型中心' },
  { icon: Sparkles, label: 'AI应用' },
  { icon: Cloud, label: '云服务' },
  { icon: Cpu, label: '算力中心', active: true },
  { icon: Settings, label: '平台管理' },
];

const subNavItems = [
  { id: 'overview', label: '资源概览', icon: Activity },
  { id: 'gpu', label: 'GPU集群', icon: Server },
  { id: 'scheduling', label: '调度策略', icon: Gauge },
  { id: 'monitoring', label: '监控告警', icon: AlertTriangle },
];

// GPU节点数据
const gpuNodes = [
  { id: 'gpu-node-01', name: 'A100-Node-01', type: 'NVIDIA A100', gpuCount: 8, cpu: 128, memory: '1TB', status: 'running', utilization: 87, temperature: 72, power: 2850 },
  { id: 'gpu-node-02', name: 'A100-Node-02', type: 'NVIDIA A100', gpuCount: 8, cpu: 128, memory: '1TB', status: 'running', utilization: 65, temperature: 68, power: 2400 },
  { id: 'gpu-node-03', name: 'A100-Node-03', type: 'NVIDIA A100', gpuCount: 8, cpu: 128, memory: '1TB', status: 'maintenance', utilization: 0, temperature: 45, power: 150 },
  { id: 'gpu-node-04', name: 'H100-Node-01', type: 'NVIDIA H100', gpuCount: 8, cpu: 192, memory: '2TB', status: 'running', utilization: 92, temperature: 75, power: 3200 },
  { id: 'gpu-node-05', name: 'Ascend-Node-01', type: '华为昇腾910', gpuCount: 8, cpu: 96, memory: '768GB', status: 'running', utilization: 78, temperature: 65, power: 2100 },
  { id: 'gpu-node-06', name: 'MLU-Node-01', type: '寒武纪MLU370', gpuCount: 8, cpu: 64, memory: '512GB', status: 'running', utilization: 45, temperature: 58, power: 1800 },
];

// 任务队列数据
const queueData = [
  { id: 1, name: 'Llama-3-70B微调', user: '张三', priority: 'high', status: 'running', progress: 78, gpu: 'A100 x 8', duration: '5h 12m' },
  { id: 2, name: 'SDXL训练任务', user: '李四', priority: 'normal', status: 'running', progress: 45, gpu: 'A100 x 4', duration: '8h 36m' },
  { id: 3, name: 'ResNet50推理', user: '王五', priority: 'normal', status: 'queued', progress: 0, gpu: 'T4 x 2', estimatedStart: '15分钟后' },
  { id: 4, name: '数据预处理', user: '赵六', priority: 'low', status: 'queued', progress: 0, gpu: 'CPU x 16', estimatedStart: '45分钟后' },
];

export default function ComputeCenter({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusBadge = (status: string) => {
    const configs: { [key: string]: { text: string; color: string } } = {
      running: { text: '运行中', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
      maintenance: { text: '维护中', color: 'bg-amber-50 text-amber-600 border-amber-200' },
      offline: { text: '离线', color: 'bg-gray-100 text-gray-600 border-gray-200' },
    };
    return <span className={`px-2 py-0.5 text-xs rounded-full border ${configs[status].color}`}>{configs[status].text}</span>;
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* 资源统计 */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-500">GPU总数</div>
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Server className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">48 卡</div>
          <div className="mt-2 text-sm text-emerald-600 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />42 卡可用
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-500">整体利用率</div>
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <Gauge className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">73%</div>
          <div className="mt-2 text-sm text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />+5.2%
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-500">排队任务</div>
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">8 个</div>
          <div className="mt-2 text-sm text-gray-500">预计等待 15 分钟</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-500">平均温度</div>
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <Thermometer className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">68°C</div>
          <div className="mt-2 text-sm text-gray-500">正常范围</div>
        </div>
      </div>

      {/* GPU类型分布 */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">GPU类型分布</h3>
          <div className="space-y-4">
            {[
              { type: 'NVIDIA A100', count: 24, used: 20, color: 'bg-blue-500' },
              { type: 'NVIDIA H100', count: 8, used: 8, color: 'bg-emerald-500' },
              { type: '华为昇腾910', count: 8, used: 6, color: 'bg-purple-500' },
              { type: '寒武纪MLU370', count: 8, used: 4, color: 'bg-amber-500' },
            ].map((item) => (
              <div key={item.type}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-gray-700">{item.type}</span>
                  <span className="text-sm text-gray-500">{item.used}/{item.count} 卡</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${(item.used / item.count) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">任务队列</h3>
          <div className="space-y-3">
            {queueData.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900 text-sm">{task.name}</div>
                  <div className="text-xs text-gray-500">{task.user} · {task.gpu}</div>
                </div>
                <div className="text-right">
                  {task.status === 'running' ? (
                    <>
                      <div className="text-xs text-gray-500 mb-1">{task.progress}%</div>
                      <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${task.progress}%` }} />
                      </div>
                    </>
                  ) : (
                    <span className="text-xs text-amber-600">{task.estimatedStart}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderGPU = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
            <Plus className="w-4 h-4" />添加节点
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl transition-colors">
            <Gauge className="w-4 h-4" />资源调度
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="搜索节点..." className="pl-10 pr-4 py-2 w-64 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {gpuNodes.map((node) => (
          <div key={node.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{node.name}</h3>
                  <p className="text-sm text-gray-500">{node.type}</p>
                </div>
              </div>
              {getStatusBadge(node.status)}
            </div>

            {node.status === 'running' && (
              <>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-sm font-semibold text-gray-900">{node.utilization}%</div>
                    <div className="text-xs text-gray-500">利用率</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-sm font-semibold text-gray-900">{node.temperature}°C</div>
                    <div className="text-xs text-gray-500">温度</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-sm font-semibold text-gray-900">{node.power}W</div>
                    <div className="text-xs text-gray-500">功耗</div>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                  <div className={`h-full rounded-full ${node.utilization > 90 ? 'bg-red-500' : node.utilization > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${node.utilization}%` }} />
                </div>
              </>
            )}

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>{node.gpuCount} GPU</span>
              <span>{node.cpu} CPU</span>
              <span>{node.memory} 内存</span>
            </div>

            <div className="flex gap-2">
              {node.status === 'running' ? (
                <button className="flex-1 py-2 text-sm text-amber-600 hover:bg-amber-50 rounded-lg transition-colors flex items-center justify-center gap-1">
                  <Pause className="w-4 h-4" />暂停
                </button>
              ) : (
                <button className="flex-1 py-2 text-sm text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors flex items-center justify-center gap-1">
                  <Play className="w-4 h-4" />启动
                </button>
              )}
              <button className="flex-1 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">详情</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderScheduling = () => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
      <Gauge className="w-16 h-16 text-gray-200 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">智能调度策略</h3>
      <p className="text-gray-500">支持优先级调度、 gang-scheduling、亲和性调度等多种策略</p>
    </div>
  );

  const renderMonitoring = () => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
      <AlertTriangle className="w-16 h-16 text-gray-200 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">监控告警</h3>
      <p className="text-gray-500">实时监控GPU温度、利用率、显存使用等指标，异常自动告警</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 flex font-sans">
      <aside className="w-16 bg-white border-r border-gray-200/80 flex flex-col items-center py-4 fixed h-full z-20 shadow-sm">
        <div className="mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Zap className="w-6 h-6 text-white" />
          </div>
        </div>
        <nav className="flex-1 flex flex-col gap-0.5 w-full px-2">
          {navItems.map((item, index) => {
            const handleClick = () => {
              if (item.label === '工作台') onNavigate?.('dashboard');
              else if (item.label === '数据中心') onNavigate?.('datacenter');
              else if (item.label === '开发环境') onNavigate?.('dev');
              else if (item.label === '模型中心') onNavigate?.('model');
              else if (item.label === 'AI应用') onNavigate?.('app');
              else if (item.label === '云服务') onNavigate?.('cloud');
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
            <span className="text-gray-900 font-semibold">算力中心</span>
          </div>
          {/* 平台模块快速导航 */}
          <div className="flex-1 flex items-center justify-center gap-1">
            <button onClick={() => onNavigate?.('dashboard')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-gray-600 hover:bg-gray-50">工作台</button>
            <button onClick={() => onNavigate?.('datacenter')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-gray-600 hover:bg-gray-50">数据中心</button>
            <button onClick={() => onNavigate?.('dev')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-gray-600 hover:bg-gray-50">开发环境</button>
            <button onClick={() => onNavigate?.('model')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-gray-600 hover:bg-gray-50">模型中心</button>
            <button onClick={() => onNavigate?.('app')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-gray-600 hover:bg-gray-50">AI应用</button>
            <button onClick={() => onNavigate?.('cloud')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-gray-600 hover:bg-gray-50">云服务</button>
            <button onClick={() => onNavigate?.('compute')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all bg-blue-50 text-blue-700">算力中心</button>
            <button onClick={() => onNavigate?.('admin')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-gray-600 hover:bg-gray-50">平台管理</button>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="全局搜索..." className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-gray-400" />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors border border-gray-200/60 hover:border-gray-300">
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">算力文档</span>
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

          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'gpu' && renderGPU()}
          {activeTab === 'scheduling' && renderScheduling()}
          {activeTab === 'monitoring' && renderMonitoring()}
        </div>
      </main>
    </div>
  );
}
