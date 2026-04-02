import React, { useState } from 'react';
import {
  Server as ServerIcon,
  HardDrive,
  Package,
  Box,
  Monitor,
  Building2,
  Layers as LayersIcon,
  Eye,
  GitBranch,
  Code,
  Gauge,
  FileText,
  LineChart,
  Bell,
  Map,
  Server,
  Search,
  Plus,
  Play,
  Pause,
  Download,
  RefreshCw,
  Settings,
  Cpu as CpuIcon,
  Gpu,
  MemoryStick,
  HardDrive as HardDriveIcon,
  AlertCircle,
  Globe,
  Lock,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Clock,
  MoreVertical,
  Edit3,
  Trash2,
  Key,
  User,
  Calendar,
  Zap,
  Thermometer,
  Power,
  RotateCw,
  Database,
  Tag,
  Filter,
  Share2,
  Activity,
  Terminal
} from 'lucide-react';

// 主模块导航
const mainModules = [
  { id: 'cluster', label: '集群管理', icon: ServerIcon },
  { id: 'baremetal', label: '裸金属管理', icon: HardDrive },
  { id: 'registry', label: '镜像仓库', icon: Package },
  { id: 'asset', label: '资产管理', icon: Box },
  { id: 'monitor', label: '监控告警', icon: Monitor },
  { id: 'digitaltwin', label: '数字孪生', icon: Building2 },
];

// 子模块配置
const subModules = {
  cluster: [
    { id: 'list', label: '集群列表', icon: LayersIcon },
    { id: 'node', label: '节点管理', icon: Server },
    { id: 'quota', label: '配额管理', icon: Gauge },
  ],
  baremetal: [
    { id: 'list', label: '服务器列表', icon: ServerIcon },
    { id: 'operation', label: '运维操作', icon: Settings },
    { id: 'monitor', label: '硬件监控', icon: Activity },
  ],
  registry: [
    { id: 'list', label: '镜像列表', icon: Package },
    { id: 'build', label: '构建任务', icon: Code },
    { id: 'sync', label: '分发同步', icon: Share2 },
  ],
  asset: [
    { id: 'overview', label: '资产总览', icon: Gauge },
    { id: 'ledger', label: '资产台账', icon: FileText },
    { id: 'allocation', label: '分配记录', icon: Clock },
  ],
  monitor: [
    { id: 'dashboard', label: '监控大盘', icon: LineChart },
    { id: 'alert', label: '告警管理', icon: Bell },
    { id: 'log', label: '日志中心', icon: FileText },
  ],
  digitaltwin: [
    { id: 'room', label: '机房视图', icon: Map },
    { id: 'rack', label: '机柜管理', icon: Server },
    { id: 'capacity', label: '容量分析', icon: Database },
  ],
};

interface ComputeCenterProps {
  onNavigate?: (page: string) => void;
}

export default function ComputeCenter({ onNavigate }: ComputeCenterProps) {
  const [activeModule, setActiveModule] = useState('cluster');
  const [activeSubModule, setActiveSubModule] = useState('list');

  // 状态标签组件（完全对齐工作台样式）
  const StatusBadge = ({ status, size = 'md' }: { status: string; size?: 'sm' | 'md' }) => {
    const configs: Record<string, { text: string; color: string }> = {
      running: { text: '运行中', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
      online: { text: '在线', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
      offline: { text: '离线', color: 'bg-red-50 text-red-600 border-red-200' },
      maintenance: { text: '维护中', color: 'bg-amber-50 text-amber-600 border-amber-200' },
      healthy: { text: '健康', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
      warning: { text: '告警', color: 'bg-amber-50 text-amber-600 border-amber-200' },
      critical: { text: '严重', color: 'bg-red-50 text-red-600 border-red-200' },
      success: { text: '成功', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
      failed: { text: '失败', color: 'bg-red-50 text-red-600 border-red-200' },
      completed: { text: '已完成', color: 'bg-purple-50 text-purple-600 border-purple-200' },
      public: { text: '公有', color: 'bg-blue-50 text-blue-600 border-blue-200' },
      private: { text: '私有', color: 'bg-amber-50 text-amber-600 border-amber-200' },
      '使用中': { text: '使用中', color: 'bg-green-50 text-green-600 border-green-200' },
      '闲置': { text: '闲置', color: 'bg-gray-100 text-gray-600 border-gray-200' },
      '已处理': { text: '已处理', color: 'bg-green-50 text-green-600 border-green-200' },
      '未处理': { text: '未处理', color: 'bg-red-50 text-red-600 border-red-200' },
    };
    const config = configs[status] || { text: status, color: 'bg-gray-100 text-gray-600 border-gray-200' };
    const padding = size === 'sm' ? 'px-1.5 py-0.5 text-xs' : 'px-2 py-0.5 text-sm';
    return <span className={`rounded-full border ${padding} ${config.color} font-medium`}>{config.text}</span>;
  };

  // 获取当前子模块列表
  const currentSubModules = subModules[activeModule as keyof typeof subModules] || [];

  // ==============================
  // 集群管理 - 集群列表
  // ==============================
  const renderClusterList = () => (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">集群管理</h2>
          <p className="text-sm text-gray-500 mt-1">共纳管 3 个K8s集群，96个计算节点</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl transition-all hover:shadow-sm">
            <Filter className="w-4 h-4" />筛选
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all hover:shadow-md hover:shadow-blue-500/20">
            <Plus className="w-4 h-4" />纳管新集群
          </button>
        </div>
      </div>

      {/* 集群概览卡片（对齐工作台卡片样式） */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {[
          { name: '生产集群', version: 'v1.27.3', nodes: 32, gpus: 64, totalMemory: '2TB', totalStorage: '100TB', status: 'running', cpuUsage: 45, gpuUsage: 78, memoryUsage: 62, storageUsage: 35 },
          { name: '测试集群', version: 'v1.26.5', nodes: 16, gpus: 32, totalMemory: '1TB', totalStorage: '50TB', status: 'running', cpuUsage: 23, gpuUsage: 45, memoryUsage: 38, storageUsage: 22 },
          { name: '开发集群', version: 'v1.25.10', nodes: 8, gpus: 8, totalMemory: '512GB', totalStorage: '20TB', status: 'maintenance', cpuUsage: 12, gpuUsage: 0, memoryUsage: 18, storageUsage: 10 },
        ].map((cluster, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5 group cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{cluster.name}</h3>
                  <StatusBadge status={cluster.status} size="sm" />
                </div>
                <p className="text-xs text-gray-500">Kubernetes {cluster.version}</p>
              </div>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">节点数</p>
                <p className="text-lg font-bold text-gray-900">{cluster.nodes}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">GPU卡数</p>
                <p className="text-lg font-bold text-gray-900">{cluster.gpus}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">总内存</p>
                <p className="text-sm font-semibold text-gray-900">{cluster.totalMemory}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">总存储</p>
                <p className="text-sm font-semibold text-gray-900">{cluster.totalStorage}</p>
              </div>
            </div>
            <div className="space-y-2.5">
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>CPU使用率</span>
                  <span className="font-medium">{cluster.cpuUsage}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all group-hover:scale-x-105" style={{ width: `${cluster.cpuUsage}%` }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>GPU使用率</span>
                  <span className="font-medium">{cluster.gpuUsage}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all group-hover:scale-x-105" style={{ width: `${cluster.gpuUsage}%` }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>内存使用率</span>
                  <span className="font-medium">{cluster.memoryUsage}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-violet-600 rounded-full transition-all group-hover:scale-x-105" style={{ width: `${cluster.memoryUsage}%` }} />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-gray-50">
              <button className="px-3 py-1.5 text-sm bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-lg transition-colors flex items-center gap-1">
                查看详情 <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ==============================
  // 裸金属管理 - 服务器列表
  // ==============================
  const renderBaremetalList = () => (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">裸金属管理</h2>
          <p className="text-sm text-gray-500 mt-1">共管理 56 台物理服务器</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl transition-all hover:shadow-sm">
            <Download className="w-4 h-4" />导出
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all hover:shadow-md hover:shadow-green-500/20">
            <Plus className="w-4 h-4" />上架服务器
          </button>
        </div>
      </div>

      {/* 统计概览卡片（对齐工作台样式） */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { title: '总服务器数', value: 56, icon: <ServerIcon className="w-5 h-5 text-blue-600" />, trend: '+2 本月新增' },
          { title: '运行中', value: 48, icon: <Play className="w-5 h-5 text-emerald-600" />, trend: '98% 在线率' },
          { title: '离线', value: 5, icon: <Pause className="w-5 h-5 text-red-600" />, trend: '2台待修复' },
          { title: '维护中', value: 3, icon: <Settings className="w-5 h-5 text-amber-600" />, trend: '预计今日完成' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-gray-50 rounded-xl">{stat.icon}</div>
              <span className="text-xs text-gray-500">{stat.trend}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* 服务器列表（对齐工作台列表样式） */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">服务器列表</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="搜索服务器..." className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50" />
            </div>
            <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50">
              <option value="">全部状态</option>
              <option value="online">运行中</option>
              <option value="offline">离线</option>
              <option value="maintenance">维护中</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">主机名</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IPMI地址</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">配置</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">GPU配置</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SN序列号</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">位置</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {[
                { name: 'gpu-server-01', ipmi: '10.0.0.101', cpu: 'Intel Xeon Platinum 8358 x 2', memory: '1TB', gpu: 'A100 80GB x 8', storage: '4TB SSD + 10TB HDD', sn: 'SN2023001', location: 'A机房-1机柜-U15', status: 'online' },
                { name: 'gpu-server-02', ipmi: '10.0.0.102', cpu: 'Intel Xeon Platinum 8358 x 2', memory: '1TB', gpu: 'A100 80GB x 8', storage: '4TB SSD + 10TB HDD', sn: 'SN2023002', location: 'A机房-1机柜-U16', status: 'online' },
                { name: 'gpu-server-03', ipmi: '10.0.0.103', cpu: 'Intel Xeon Platinum 8358 x 2', memory: '1TB', gpu: 'A100 80GB x 8', storage: '4TB SSD + 10TB HDD', sn: 'SN2023003', location: 'A机房-1机柜-U17', status: 'online' },
                { name: 'cpu-server-01', ipmi: '10.0.0.201', cpu: 'AMD EPYC 7742 x 2', memory: '256GB', gpu: '-', storage: '2TB SSD + 20TB HDD', sn: 'SN2023015', location: 'B机房-3机柜-U08', status: 'maintenance' },
                { name: 'storage-server-01', ipmi: '10.0.0.251', cpu: 'Intel Xeon Silver 4314 x 2', memory: '128GB', gpu: '-', storage: '24TB HDD x 12', sn: 'SN2023036', location: 'B机房-5机柜-U22', status: 'offline' },
              ].map((server, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{server.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">{server.ipmi}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{server.cpu}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{server.memory} / {server.storage}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{server.gpu}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">{server.sn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{server.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={server.status} size="sm" /></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-1.5">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="详情">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="远程控制">
                        <Terminal className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="更多操作">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // 渲染当前页面
  const renderCurrentPage = () => {
    if (activeModule === 'cluster' && activeSubModule === 'list') return renderClusterList();
    if (activeModule === 'baremetal' && activeSubModule === 'list') return renderBaremetalList();
    
    // 其他模块占位，后续按同样标准补充
    return (
      <div className="p-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-10 h-10 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">功能开发中</h3>
          <p className="text-gray-500 max-w-md mx-auto">该页面正在按照工作台相同的精细度开发中，即将上线，敬请期待</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-50/50">
      {/* 左侧一级导航 */}
      <div className="w-64 bg-white border-r border-gray-100 shadow-sm flex flex-col">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">算力中心</h2>
          <p className="text-xs text-gray-500 mt-1">GPU集群、算力资源统一管理</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          {mainModules.map((module) => {
            const Icon = module.icon;
            const isActive = activeModule === module.id;
            return (
              <button
                key={module.id}
                onClick={() => {
                  setActiveModule(module.id);
                  setActiveSubModule(subModules[module.id as keyof typeof subModules][0].id);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all mb-0.5 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{module.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* 中间二级导航（对齐工作台样式） */}
      <div className="w-48 bg-gray-50 border-r border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {mainModules.find(m => m.id === activeModule)?.label}
          </h3>
        </div>
        <nav className="flex-1 overflow-y-auto p-2">
          {currentSubModules.map((subModule) => {
            const Icon = subModule.icon;
            const isActive = activeSubModule === subModule.id;
            return (
              <button
                key={subModule.id}
                onClick={() => setActiveSubModule(subModule.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all mb-0.5 ${
                  isActive
                    ? 'bg-white text-blue-600 shadow-sm font-medium'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{subModule.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* 右侧内容区 */}
      <div className="flex-1 overflow-y-auto">
        {renderCurrentPage()}
      </div>
    </div>
  );
}