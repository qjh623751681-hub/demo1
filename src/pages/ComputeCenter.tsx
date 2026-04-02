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
  AlertTriangle
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
    { id: 'detail', label: '集群详情', icon: Eye },
  ],
  baremetal: [
    { id: 'list', label: '物理机列表', icon: ServerIcon },
    { id: 'lifecycle', label: '生命周期管理', icon: GitBranch },
  ],
  registry: [
    { id: 'list', label: '镜像列表', icon: Package },
    { id: 'build', label: '镜像构建', icon: Code },
  ],
  asset: [
    { id: 'overview', label: '资产总览', icon: Gauge },
    { id: 'ledger', label: '资产台账', icon: FileText },
  ],
  monitor: [
    { id: 'dashboard', label: '监控大盘', icon: LineChart },
    { id: 'alert', label: '告警管理', icon: Bell },
  ],
  digitaltwin: [
    { id: 'room', label: '机房3D视图', icon: Map },
    { id: 'rack', label: '机柜管理', icon: Server },
  ],
};

interface ComputeCenterProps {
  onNavigate?: (page: string) => void;
}

export default function ComputeCenter({ onNavigate }: ComputeCenterProps) {
  const [activeModule, setActiveModule] = useState('cluster');
  const [activeSubModule, setActiveSubModule] = useState('list');

  // 状态标签组件
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
    };
    const config = configs[status] || { text: status, color: 'bg-gray-100 text-gray-600 border-gray-200' };
    const padding = size === 'sm' ? 'px-1.5 py-0.5 text-xs' : 'px-2 py-0.5 text-sm';
    return <span className={`rounded-full border ${padding} ${config.color}`}>{config.text}</span>;
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
          <p className="text-sm text-gray-500 mt-1">共纳管 3 个K8s集群</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
          <Plus className="w-4 h-4" />纳管新集群
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {[
          { name: '生产集群', version: 'v1.27.3', nodes: 32, gpus: 64, totalMemory: '2TB', totalStorage: '100TB', status: 'running', cpuUsage: 45, gpuUsage: 78, memoryUsage: 62, storageUsage: 35 },
          { name: '测试集群', version: 'v1.26.5', nodes: 16, gpus: 32, totalMemory: '1TB', totalStorage: '50TB', status: 'running', cpuUsage: 23, gpuUsage: 45, memoryUsage: 38, storageUsage: 22 },
          { name: '开发集群', version: 'v1.25.10', nodes: 8, gpus: 8, totalMemory: '512GB', totalStorage: '20TB', status: 'maintenance', cpuUsage: 12, gpuUsage: 0, memoryUsage: 18, storageUsage: 10 },
        ].map((cluster, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{cluster.name}</h3>
                <p className="text-xs text-gray-500 mt-1">K8s {cluster.version}</p>
              </div>
              <StatusBadge status={cluster.status} size="sm" />
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">节点数</p>
                <p className="text-lg font-semibold text-gray-900">{cluster.nodes}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">GPU卡数</p>
                <p className="text-lg font-semibold text-gray-900">{cluster.gpus}</p>
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
            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>CPU使用率</span>
                  <span>{cluster.cpuUsage}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${cluster.cpuUsage}%` }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>GPU使用率</span>
                  <span>{cluster.gpuUsage}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${cluster.gpuUsage}%` }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>内存使用率</span>
                  <span>{cluster.memoryUsage}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${cluster.memoryUsage}%` }} />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-4">
              <button className="px-3 py-1.5 text-sm bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-lg transition-colors" onClick={() => setActiveSubModule('detail')}>
                查看详情
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ==============================
  // 裸金属管理 - 物理机列表
  // ==============================
  const renderBaremetalList = () => (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">裸金属管理</h2>
          <p className="text-sm text-gray-500 mt-1">共管理 56 台物理服务器</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors">
            <Plus className="w-4 h-4" />上架服务器
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl transition-colors">
            <Download className="w-4 h-4" />导出清单
          </button>
        </div>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { title: '总服务器数', value: 56, icon: <ServerIcon className="w-5 h-5 text-blue-600" /> },
          { title: '运行中', value: 48, icon: <Play className="w-5 h-5 text-emerald-600" /> },
          { title: '离线', value: 5, icon: <Pause className="w-5 h-5 text-red-600" /> },
          { title: '维护中', value: 3, icon: <Settings className="w-5 h-5 text-amber-600" /> },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-50 rounded-lg">{stat.icon}</div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* 物理机列表 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">物理机列表</h3>
          <div className="flex items-center gap-2">
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CPU型号</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">GPU配置</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">内存</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">存储</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SN序列号</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {[
                { name: 'gpu-server-01', ipmi: '10.0.0.101', cpu: 'Intel Xeon Platinum 8358', gpu: 'A100 x 8', memory: '1TB', storage: '4TB SSD + 10TB HDD', sn: 'SN2023001', status: 'online' },
                { name: 'gpu-server-02', ipmi: '10.0.0.102', cpu: 'Intel Xeon Platinum 8358', gpu: 'A100 x 8', memory: '1TB', storage: '4TB SSD + 10TB HDD', sn: 'SN2023002', status: 'online' },
                { name: 'gpu-server-03', ipmi: '10.0.0.103', cpu: 'Intel Xeon Platinum 8358', gpu: 'A100 x 8', memory: '1TB', storage: '4TB SSD + 10TB HDD', sn: 'SN2023003', status: 'online' },
                { name: 'gpu-server-04', ipmi: '10.0.0.104', cpu: 'Intel Xeon Platinum 8358', gpu: 'A100 x 8', memory: '1TB', storage: '4TB SSD + 10TB HDD', sn: 'SN2023004', status: 'online' },
                { name: 'cpu-server-01', ipmi: '10.0.0.201', cpu: 'AMD EPYC 7742', gpu: '-', memory: '256GB', storage: '2TB SSD + 20TB HDD', sn: 'SN2023015', status: 'maintenance' },
                { name: 'cpu-server-02', ipmi: '10.0.0.202', cpu: 'AMD EPYC 7742', gpu: '-', memory: '256GB', storage: '2TB SSD + 20TB HDD', sn: 'SN2023016', status: 'offline' },
              ].map((server, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{server.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">{server.ipmi}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{server.cpu}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{server.gpu}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{server.memory}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{server.storage}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">{server.sn}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={server.status} size="sm" /></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">详情</button>
                    <button className="text-amber-600 hover:text-amber-900 mr-3">远程控制</button>
                    <button className="text-red-600 hover:text-red-900">下架</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ==============================
  // 裸金属管理 - 生命周期管理
  // ==============================
  const renderBaremetalLifecycle = () => (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">生命周期管理</h2>
          <p className="text-sm text-gray-500 mt-1">服务器上架、下架、重装、固件升级等操作</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
          <Play className="w-4 h-4" />批量操作
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">操作记录</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 text-xs font-medium text-gray-500 uppercase">操作类型</th>
                  <th className="text-left py-3 text-xs font-medium text-gray-500 uppercase">服务器</th>
                  <th className="text-left py-3 text-xs font-medium text-gray-500 uppercase">操作人</th>
                  <th className="text-left py-3 text-xs font-medium text-gray-500 uppercase">执行时间</th>
                  <th className="text-left py-3 text-xs font-medium text-gray-500 uppercase">状态</th>
                  <th className="text-right py-3 text-xs font-medium text-gray-500 uppercase">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { type: '操作系统重装', server: 'gpu-server-01', user: '张三', time: '2026-03-28 14:30', status: 'success' },
                  { type: '固件升级', server: 'cpu-server-01', user: '李四', time: '2026-03-27 09:15', status: 'failed' },
                  { type: '服务器上架', server: 'gpu-server-03', user: '王五', time: '2026-03-26 16:45', status: 'success' },
                  { type: 'RAID配置', server: 'storage-server-01', user: '赵六', time: '2026-03-25 11:20', status: 'success' },
                  { type: 'BIOS更新', server: 'gpu-server-02', user: '张三', time: '2026-03-24 15:10', status: 'success' },
                ].map((op, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="py-3 text-sm text-gray-900">{op.type}</td>
                    <td className="py-3 text-sm text-gray-900">{op.server}</td>
                    <td className="py-3 text-sm text-gray-900">{op.user}</td>
                    <td className="py-3 text-sm text-gray-600">{op.time}</td>
                    <td className="py-3"><StatusBadge status={op.status} size="sm" /></td>
                    <td className="py-3 text-right text-sm">
                      <button className="text-blue-600 hover:text-blue-900">查看日志</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  // ==============================
  // 镜像仓库 - 镜像列表
  // ==============================
  const renderRegistryList = () => (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">镜像仓库</h2>
          <p className="text-sm text-gray-500 mt-1">共存储 238 个容器镜像</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
          <Plus className="w-4 h-4" />构建镜像
        </button>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { title: '总镜像数', value: 238, icon: <Package className="w-5 h-5 text-blue-600" /> },
          { title: '公有镜像', value: 156, icon: <Globe className="w-5 h-5 text-emerald-600" /> },
          { title: '私有镜像', value: 82, icon: <Lock className="w-5 h-5 text-amber-600" /> },
          { title: '总存储', value: '2.4TB', icon: <HardDrive className="w-5 h-5 text-purple-600" /> },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-50 rounded-lg">{stat.icon}</div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* 镜像列表 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">镜像列表</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="搜索镜像..." className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50" />
            </div>
            <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50">
              <option value="">全部类型</option>
              <option value="public">公有镜像</option>
              <option value="private">私有镜像</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">镜像名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">版本</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">大小</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">拉取次数</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">更新时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">创建人</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {[
                { name: 'pytorch/pytorch', version: '2.1.0-cuda12.1', size: '8.2GB', type: 'public', pulls: 15689, updated: '2026-03-28', creator: '系统' },
                { name: 'tensorflow/tensorflow', version: '2.15.0-gpu', size: '6.7GB', type: 'public', pulls: 12456, updated: '2026-03-25', creator: '系统' },
                { name: 'nvidia/cuda', version: '12.1.1-cudnn8-runtime-ubuntu22.04', size: '2.3GB', type: 'public', pulls: 9876, updated: '2026-03-20', creator: '系统' },
                { name: 'company/llm-training', version: 'v1.3.5', size: '12.5GB', type: 'private', pulls: 3456, updated: '2026-03-28', creator: '张三' },
                { name: 'company/cv-inference', version: 'v2.0.0', size: '4.8GB', type: 'private', pulls: 2345, updated: '2026-03-26', creator: '李四' },
              ].map((image, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{image.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">{image.version}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{image.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      image.type === 'public' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {image.type === 'public' ? '公有' : '私有'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{image.pulls.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{image.updated}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{image.creator}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">详情</button>
                    <button className="text-gray-600 hover:text-gray-900 mr-3">拉取命令</button>
                    <button className="text-red-600 hover:text-red-900">删除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ==============================
  // 镜像仓库 - 镜像构建
  // ==============================
  const renderRegistryBuild = () => (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">镜像构建</h2>
          <p className="text-sm text-gray-500 mt-1">从代码源自动构建容器镜像</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
          <Plus className="w-4 h-4" />新建构建任务
        </button>
      </div>

      {/* 构建任务列表 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">构建任务列表</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">任务名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">代码源</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">镜像名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">版本</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">构建时长</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">创建时间</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {[
                { name: 'LLM训练镜像构建', repo: 'gitlab.com/ai/llm-training', image: 'company/llm-training', version: 'v1.3.5', status: 'success', duration: '12分35秒', createdAt: '2026-03-28 14:30', creator: '张三' },
                { name: 'CV推理镜像构建', repo: 'gitlab.com/ai/cv-inference', image: 'company/cv-inference', version: 'v2.0.0', status: 'success', duration: '8分12秒', createdAt: '2026-03-26 10:15', creator: '李四' },
                { name: '数据处理镜像构建', repo: 'gitlab.com/ai/data-processing', image: 'company/data-processing', version: 'v0.8.0', status: 'failed', duration: '5分47秒', createdAt: '2026-03-25 16:45', creator: '王五' },
                { name: 'Notebook基础镜像', repo: 'gitlab.com/platform/notebook-image', image: 'company/notebook-base', version: 'v202403', status: 'running', duration: '已运行3分20秒', createdAt: '2026-03-29 09:10', creator: '赵六' },
              ].map((task, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{task.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">{task.repo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.image}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">{task.version}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={task.status} size="sm" /></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.duration}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{task.createdAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">查看日志</button>
                    {task.status !== 'running' && (
                      <button className="text-amber-600 hover:text-amber-900">重新构建</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ==============================
  // 资产管理 - 资产总览
  // ==============================
  const renderAssetOverview = () => (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">资产总览</h2>
        <p className="text-sm text-gray-500 mt-1">GPU/CPU/存储资产统计与分配情况</p>
      </div>

      {/* 核心资产统计 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { 
            title: 'GPU资源', 
            total: 128, 
            allocated: 92, 
            free: 36, 
            unit: '张',
            usage: 72,
            icon: <Gpu className="w-6 h-6 text-green-600" />,
            color: 'from-green-500 to-emerald-600'
          },
          { 
            title: 'CPU核心', 
            total: 2048, 
            allocated: 1356, 
            free: 692, 
            unit: '核',
            usage: 66,
            icon: <CpuIcon className="w-6 h-6 text-blue-600" />,
            color: 'from-blue-500 to-indigo-600'
          },
          { 
            title: '存储容量', 
            total: 500, 
            allocated: 320, 
            free: 180, 
            unit: 'TB',
            usage: 64,
            icon: <HardDriveIcon className="w-6 h-6 text-amber-600" />,
            color: 'from-amber-500 to-orange-600'
          },
        ].map((asset, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-50 rounded-xl">{asset.icon}</div>
                <div>
                  <p className="text-sm text-gray-500">{asset.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-0.5">
                    {asset.allocated} / {asset.total} {asset.unit}
                  </p>
                </div>
              </div>
              <span className="text-lg font-bold text-gray-900">{asset.usage}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
              <div 
                className={`h-full rounded-full bg-gradient-to-r ${asset.color}`} 
                style={{ width: `${asset.usage}%` }} 
              />
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>已分配：{asset.allocated} {asset.unit}</span>
              <span>剩余：{asset.free} {asset.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* GPU型号分布 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">GPU型号分布</h3>
          <div className="space-y-4">
            {[
              { name: 'NVIDIA A100 80GB', count: 64, percent: 50, color: 'bg-blue-500' },
              { name: 'NVIDIA A800 80GB', count: 32, percent: 25, color: 'bg-purple-500' },
              { name: 'NVIDIA T4 16GB', count: 16, percent: 12.5, color: 'bg-amber-500' },
              { name: '华为昇腾910', count: 16, percent: 12.5, color: 'bg-red-500' },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <span className="text-sm font-medium text-gray-900">{item.count} 张 ({item.percent}%)</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">资产分配趋势</h3>
          <div className="h-56 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <LineChart className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p>资产分配趋势图表</p>
            </div>
          </div>
        </div>
      </div>

      {/* 最近分配记录 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">最近分配记录</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">资源类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">规格</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">使用人</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">用途</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">分配时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">到期时间</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {[
                { type: 'GPU', spec: 'A100 x 8', user: '张三', purpose: 'Llama3-70B模型训练', allocated: '2026-03-25', expire: '2026-04-25' },
                { type: 'GPU', spec: 'A100 x 4', user: '李四', purpose: 'SDXL模型训练', allocated: '2026-03-26', expire: '2026-04-10' },
                { type: 'CPU', spec: '32C 128GB', user: '王五', purpose: '数据预处理', allocated: '2026-03-27', expire: '2026-04-05' },
                { type: '存储', spec: '10TB', user: '赵六', purpose: '数据集存储', allocated: '2026-03-28', expire: '2026-12-31' },
              ].map((record, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      record.type === 'GPU' ? 'bg-green-50 text-green-600' : 
                      record.type === 'CPU' ? 'bg-blue-50 text-blue-600' : 
                      'bg-amber-50 text-amber-600'
                    }`}>
                      {record.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.spec}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.purpose}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.allocated}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.expire}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ==============================
  // 资产管理 - 资产台账
  // ==============================
  const renderAssetLedger = () => (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">资产台账</h2>
          <p className="text-sm text-gray-500 mt-1">硬件资产全生命周期管理</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl transition-colors">
          <Download className="w-4 h-4" />导出台账
        </button>
      </div>

      {/* 资产列表 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">硬件资产列表</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="搜索资产..." className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50" />
            </div>
            <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50">
              <option value="">全部类型</option>
              <option value="gpu">GPU服务器</option>
              <option value="cpu">CPU服务器</option>
              <option value="storage">存储设备</option>
              <option value="network">网络设备</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">资产名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">型号</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SN序列号</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">采购日期</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">过保日期</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">使用状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">使用人</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">位置</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {[
                { name: 'GPU服务器01', type: 'GPU服务器', model: 'NVIDIA A100 x 8', sn: 'SN2023001', purchase: '2023-03-15', expire: '2026-03-14', status: '使用中', user: '张三', location: 'A机房-1机柜-U15' },
                { name: 'GPU服务器02', type: 'GPU服务器', model: 'NVIDIA A100 x 8', sn: 'SN2023002', purchase: '2023-03-15', expire: '2026-03-14', status: '使用中', user: '李四', location: 'A机房-1机柜-U16' },
                { name: '存储阵列01', type: '存储设备', model: 'Dell PowerStore 500T', sn: 'SN2023015', purchase: '2023-05-20', expire: '2026-05-19', status: '使用中', user: '运维组', location: 'B机房-3机柜-U20' },
                { name: '计算节点01', type: 'CPU服务器', model: 'Dell PowerEdge R750', sn: 'SN2023025', purchase: '2023-06-10', expire: '2026-06-09', status: '闲置', user: '-', location: 'A机房-2机柜-U08' },
              ].map((asset, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{asset.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.model}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">{asset.sn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{asset.purchase}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{asset.expire}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      asset.status === '使用中' ? 'bg-green-50 text-green-600' : 
                      asset.status === '闲置' ? 'bg-gray-100 text-gray-600' : 
                      'bg-red-50 text-red-600'
                    }`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{asset.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ==============================
  // 监控告警 - 监控大盘
  // ==============================
  const renderMonitorDashboard = () => (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">监控大盘</h2>
        <p className="text-sm text-gray-500 mt-1">集群、节点、任务三级监控视图</p>
      </div>

      {/* 健康状态概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { title: '集群健康度', value: '96%', status: 'healthy', icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" /> },
          { title: '告警总数', value: '12', status: 'warning', icon: <AlertTriangle className="w-5 h-5 text-amber-600" /> },
          { title: '严重告警', value: '2', status: 'critical', icon: <AlertCircle className="w-5 h-5 text-red-600" /> },
          { title: '节点在线率', value: '98%', status: 'healthy', icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" /> },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-50 rounded-lg">{stat.icon}</div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* 使用率趋势图 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">GPU使用率趋势</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <LineChart className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p>GPU使用率趋势图</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">CPU使用率趋势</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <LineChart className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p>CPU使用率趋势图</p>
            </div>
          </div>
        </div>
      </div>

      {/* GPU利用率Top5节点 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">GPU利用率Top5节点</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">节点名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">GPU型号</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">GPU使用率</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">显存使用率</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">温度</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">功耗</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {[
                { name: 'gpu-node-01', model: 'A100 80GB', gpuUsage: 98, memoryUsage: 92, temperature: 72, power: 420 },
                { name: 'gpu-node-02', model: 'A100 80GB', gpuUsage: 95, memoryUsage: 88, temperature: 68, power: 400 },
                { name: 'gpu-node-03', model: 'A100 80GB', gpuUsage: 92, memoryUsage: 85, temperature: 70, power: 390 },
                { name: 'gpu-node-04', model: 'A100 80GB', gpuUsage: 89, memoryUsage: 76, temperature: 65, power: 370 },
                { name: 'gpu-node-05', model: 'A100 80GB', gpuUsage: 85, memoryUsage: 72, temperature: 67, power: 360 },
              ].map((node, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{node.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{node.model}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${node.gpuUsage}%` }} />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{node.gpuUsage}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${node.memoryUsage}%` }} />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{node.memoryUsage}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{node.temperature}°C</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{node.power}W</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ==============================
  // 监控告警 - 告警管理
  // ==============================
  const renderAlertManagement = () => (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">告警管理</h2>
          <p className="text-sm text-gray-500 mt-1">查看和处理系统告警事件</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl transition-colors">
            <Settings className="w-4 h-4" />告警规则
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl transition-colors">
            <Download className="w-4 h-4" />导出
          </button>
        </div>
      </div>

      {/* 告警统计 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { title: '严重告警', count: 2, color: 'bg-red-50 text-red-600 border-red-200' },
          { title: '警告告警', count: 10, color: 'bg-amber-50 text-amber-600 border-amber-200' },
          { title: '通知告警', count: 24, color: 'bg-blue-50 text-blue-600 border-blue-200' },
        ].map((stat, idx) => (
          <div key={idx} className={`rounded-2xl border ${stat.color} p-5`}>
            <p className="text-3xl font-bold">{stat.count}</p>
            <p className="text-sm font-medium mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* 告警列表 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">告警列表</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="搜索告警..." className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50" />
            </div>
            <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50">
              <option value="">全部级别</option>
              <option value="critical">严重</option>
              <option value="warning">警告</option>
              <option value="info">通知</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">级别</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">告警内容</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">资源类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">资源名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">触发时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {[
                { level: 'critical', content: 'GPU温度过高', resourceType: '节点', resourceName: 'gpu-node-01', time: '2026-03-29 14:32:15', status: '未处理' },
                { level: 'critical', content: '节点磁盘空间不足', resourceType: '节点', resourceName: 'storage-node-03', time: '2026-03-29 12:18:45', status: '未处理' },
                { level: 'warning', content: 'GPU使用率超过90%', resourceType: '节点', resourceName: 'gpu-node-02', time: '2026-03-29 15:10:22', status: '未处理' },
                { level: 'warning', content: '内存使用率超过85%', resourceType: '节点', resourceName: 'cpu-node-05', time: '2026-03-29 13:45:08', status: '已处理' },
                { level: 'info', content: '节点离线恢复', resourceType: '节点', resourceName: 'gpu-node-04', time: '2026-03-29 10:05:33', status: '已处理' },
              ].map((alert, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      alert.level === 'critical' ? 'bg-red-50 text-red-600' : 
                      alert.level === 'warning' ? 'bg-amber-50 text-amber-600' : 
                      'bg-blue-50 text-blue-600'
                    }`}>
                      {alert.level === 'critical' ? '严重' : alert.level === 'warning' ? '警告' : '通知'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.content}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.resourceType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.resourceName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{alert.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      alert.status === '未处理' ? 'bg-red-50 text-red-600 border border-red-200' : 
                      'bg-green-50 text-green-600 border border-green-200'
                    }`}>
                      {alert.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">查看详情</button>
                    {alert.status === '未处理' && (
                      <button className="text-green-600 hover:text-green-900">标记已处理</button>
                    )}
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
    if (activeModule === 'baremetal' && activeSubModule === 'lifecycle') return renderBaremetalLifecycle();
    if (activeModule === 'registry' && activeSubModule === 'list') return renderRegistryList();
    if (activeModule === 'registry' && activeSubModule === 'build') return renderRegistryBuild();
    if (activeModule === 'asset' && activeSubModule === 'overview') return renderAssetOverview();
    if (activeModule === 'asset' && activeSubModule === 'ledger') return renderAssetLedger();
    if (activeModule === 'monitor' && activeSubModule === 'dashboard') return renderMonitorDashboard();
    if (activeModule === 'monitor' && activeSubModule === 'alert') return renderAlertManagement();
    
    // 数字孪生模块占位（不做3D功能）
    if (activeModule === 'digitaltwin') {
      return (
        <div className="p-6">
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏗️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">3D可视化功能暂未开放</h3>
            <p className="text-gray-500">该功能属于可选模块，如有需要可后续定制开发</p>
          </div>
        </div>
      );
    }

    return (
      <div className="p-6">
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🚧</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">功能开发中</h3>
          <p className="text-gray-500">该功能正在开发中，敬请期待</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* 左侧一级导航 */}
      <div className="w-64 bg-white border-r border-gray-100 shadow-sm flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">算力中心</h2>
          <p className="text-xs text-gray-500 mt-1">GPU集群、裸金属、资产管理</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-2">
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
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
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

      {/* 中间二级导航 */}
      <div className="w-48 bg-gray-50 border-r border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
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
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
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
      <div className="flex-1 overflow-y-auto bg-gray-50/50">
        {renderCurrentPage()}
      </div>
    </div>
  );
}