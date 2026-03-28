import React, { useState } from 'react';
import {
  LayoutDashboard, Database, Code2, Brain, Sparkles, Cloud, Cpu, Settings,
  Search, Bell, Plus, ChevronRight, MoreVertical, Server, Database as DbIcon,
  HardDrive, Network, Shield, Key, Globe, Activity, TrendingUp, AlertTriangle,
  CheckCircle2, Clock, DollarSign, Zap, ExternalLink, FileText, RefreshCw,
  Download, Upload, Play, Pause, Trash2, Edit3, Copy, Eye, Filter
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: '工作台' },
  { icon: Database, label: '数据中心' },
  { icon: Code2, label: '开发环境' },
  { icon: Brain, label: '模型中心' },
  { icon: Sparkles, label: 'AI应用' },
  { icon: Cloud, label: '云服务', active: true },
  { icon: Cpu, label: '算力中心' },
  { icon: Settings, label: '平台管理' },
];

const subNavItems = [
  { id: 'storage', label: '对象存储', icon: HardDrive },
  { id: 'database', label: '云数据库', icon: DbIcon },
  { id: 'network', label: '网络', icon: Network },
  { id: 'security', label: '安全', icon: Shield },
];

// 存储桶数据
const bucketData = [
  { id: 1, name: 'model-assets-prod', region: '华东-上海', storage: '1.2TB', objects: 45230, publicAccess: false, createdAt: '2026-01-15' },
  { id: 2, name: 'dataset-raw-data', region: '华北-北京', storage: '8.5TB', objects: 128900, publicAccess: false, createdAt: '2026-02-20' },
  { id: 3, name: 'training-checkpoints', region: '华南-广州', storage: '3.6TB', objects: 5620, publicAccess: false, createdAt: '2026-03-01' },
  { id: 4, name: 'public-datasets', region: '华东-上海', storage: '450GB', objects: 2340, publicAccess: true, createdAt: '2025-12-10' },
];

// 数据库实例数据
const dbData = [
  { id: 1, name: 'user-data-mysql', type: 'MySQL', version: '8.0', status: 'running', cpu: 45, memory: 62, connections: 128, storage: '500GB' },
  { id: 2, name: 'vector-db-pg', type: 'PostgreSQL', version: '15', status: 'running', cpu: 78, memory: 85, connections: 256, storage: '2TB' },
  { id: 3, name: 'cache-redis', type: 'Redis', version: '7.0', status: 'running', cpu: 23, memory: 45, connections: 1024, storage: '50GB' },
  { id: 4, name: 'log-es', type: 'Elasticsearch', version: '8.0', status: 'stopped', cpu: 0, memory: 0, connections: 0, storage: '1.5TB' },
];

// 网络配置数据
const networkData = [
  { id: 1, name: 'vpc-prod-main', cidr: '10.0.0.0/16', subnets: 6, instances: 45, status: 'active' },
  { id: 2, name: 'vpc-dev-test', cidr: '172.16.0.0/16', subnets: 3, instances: 12, status: 'active' },
];

export default function CloudService({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [activeTab, setActiveTab] = useState('storage');

  const getStatusBadge = (status: string) => {
    const configs: { [key: string]: { text: string; color: string } } = {
      running: { text: '运行中', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
      stopped: { text: '已停止', color: 'bg-gray-100 text-gray-600 border-gray-200' },
      active: { text: '活跃', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
    };
    return <span className={`px-2 py-0.5 text-xs rounded-full border ${configs[status].color}`}>{configs[status].text}</span>;
  };

  const renderStorage = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">存储总量</div>
          <div className="text-2xl font-bold text-gray-900">14.5 TB</div>
          <div className="mt-2 text-sm text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />+12.5%
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">对象总数</div>
          <div className="text-2xl font-bold text-gray-900">186k</div>
          <div className="mt-2 text-sm text-gray-400">本月新增 23k</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">本月流量</div>
          <div className="text-2xl font-bold text-gray-900">2.8 TB</div>
          <div className="mt-2 text-sm text-gray-400">下载 1.2 TB</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">预估费用</div>
          <div className="text-2xl font-bold text-gray-900">¥1,245</div>
          <div className="mt-2 text-sm text-gray-400">本月累计</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
          <Plus className="w-4 h-4" />创建存储桶
        </button>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="搜索存储桶..." className="pl-10 pr-4 py-2 w-64 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">存储桶列表</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {bucketData.map((bucket) => (
            <div key={bucket.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center">
                    <HardDrive className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{bucket.name}</h4>
                    <p className="text-sm text-gray-500">{bucket.region}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {bucket.publicAccess ? (
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-xs rounded-full border border-amber-200">公开</span>
                  ) : (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">私有</span>
                  )}
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span>存储: {bucket.storage}</span>
                <span>对象: {bucket.objects.toLocaleString()}</span>
                <span>创建: {bucket.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDatabase = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
          <Plus className="w-4 h-4" />创建数据库
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {dbData.map((db) => (
          <div key={db.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                  <DbIcon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{db.name}</h3>
                  <p className="text-sm text-gray-500">{db.type} {db.version}</p>
                </div>
              </div>
              {getStatusBadge(db.status)}
            </div>
            {db.status === 'running' && (
              <>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-semibold text-gray-900">{db.cpu}%</div>
                    <div className="text-xs text-gray-500">CPU</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-semibold text-gray-900">{db.memory}%</div>
                    <div className="text-xs text-gray-500">内存</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-semibold text-gray-900">{db.connections}</div>
                    <div className="text-xs text-gray-500">连接</div>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${db.memory}%` }} />
                </div>
              </>
            )}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-500">存储: {db.storage}</span>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">管理</button>
                <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">连接</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNetwork = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
          <Plus className="w-4 h-4" />创建VPC
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">VPC网络</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {networkData.map((vpc) => (
            <div key={vpc.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Network className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{vpc.name}</h4>
                    <p className="text-sm text-gray-500">CIDR: {vpc.cidr}</p>
                  </div>
                </div>
                {getStatusBadge(vpc.status)}
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span>子网: {vpc.subnets} 个</span>
                <span>实例: {vpc.instances} 台</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">安全组</div>
              <div className="text-xl font-bold text-gray-900">12 个</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <Key className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">密钥对</div>
              <div className="text-xl font-bold text-gray-900">8 个</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">安全告警</div>
              <div className="text-xl font-bold text-gray-900">0</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
        <Shield className="w-16 h-16 text-gray-200 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">安全中心</h3>
        <p className="text-gray-500">防火墙配置、访问控制、安全审计等功能</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 flex font-sans">
      <aside className="w-16 bg-white border-r border-gray-200/80 flex flex-col items-center py-4 fixed h-full z-20 shadow-sm">
        <div className="mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Cloud className="w-6 h-6 text-white" />
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
            <span className="text-gray-900 font-semibold">云服务</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="全局搜索..." className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-gray-400" />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors border border-gray-200/60 hover:border-gray-300">
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">云服务文档</span>
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

          {activeTab === 'storage' && renderStorage()}
          {activeTab === 'database' && renderDatabase()}
          {activeTab === 'network' && renderNetwork()}
          {activeTab === 'security' && renderSecurity()}
        </div>
      </main>
    </div>
  );
}
