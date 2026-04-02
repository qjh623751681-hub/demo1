import React, { useState } from 'react';
import {
  Search, Bell, Upload, Folder, FolderOpen, FileText, Image, Music, Video,
  MoreVertical, ChevronRight, ChevronDown, Download, Share2, Trash2, Edit3, X, Tag,
  FileJson, FileArchive, FileCode, Lock, Unlock, Eye, Grid, List, Filter, Settings2,
  LayoutDashboard, Database, Users, Globe, Box, HardDrive, Clock, Calendar,
  Shield, AlertCircle, CheckCircle, Info, Sparkles, Zap, Layers, BookOpen,
  Star, ChevronLeft, ExternalLink, Copy, Move, RefreshCw, SortAsc, Menu
} from 'lucide-react';

// 文件类型配置
const fileTypes = {
  model: { name: '模型文件', icon: Box, color: 'bg-amber-100 text-amber-700', extensions: ['.pt', '.pth', '.onnx', '.safetensors'] },
  data: { name: '数据文件', icon: FileJson, color: 'bg-emerald-100 text-emerald-700', extensions: ['.csv', '.json', '.parquet', '.npy'] },
  document: { name: '文档', icon: FileText, color: 'bg-blue-100 text-blue-700', extensions: ['.pdf', '.docx', '.txt', '.md'] },
  image: { name: '图片', icon: Image, color: 'bg-pink-100 text-pink-700', extensions: ['.jpg', '.png', '.gif', '.webp'] },
  video: { name: '视频', icon: Video, color: 'bg-orange-100 text-orange-700', extensions: ['.mp4', '.avi', '.mov'] },
  audio: { name: '音频', icon: Music, color: 'bg-purple-100 text-purple-700', extensions: ['.mp3', '.wav', '.m4a'] },
  code: { name: '代码', icon: FileCode, color: 'bg-red-100 text-red-700', extensions: ['.py', '.js', '.java', '.cpp'] },
  archive: { name: '压缩包', icon: FileArchive, color: 'bg-gray-100 text-gray-700', extensions: ['.zip', '.rar', '.tar'] },
  other: { name: '其他', icon: FileText, color: 'bg-gray-100 text-gray-600', extensions: [] }
};

// 权限配置
const permissions = {
  private: { name: '私有', icon: Lock, color: 'bg-red-50 text-red-600 border-red-200' },
  team: { name: '团队', icon: Users, color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
  public: { name: '公开', icon: Globe, color: 'bg-blue-50 text-blue-600 border-blue-200' }
};

// 分享权限配置
const sharePermissions = {
  view: { name: '只读', icon: Eye, color: 'text-gray-500 bg-gray-50' },
  use: { name: '可用', icon: Download, color: 'text-blue-500 bg-blue-50' },
  edit: { name: '可编辑', icon: Edit3, color: 'text-purple-500 bg-purple-50' }
};

// 空间数据结构
const spaceData = {
  'personal': {
    name: '个人空间',
    icon: LayoutDashboard,
    quota: 50,
    used: 15.2,
    folders: [
      {
        id: 'p-docs',
        name: '文档资料',
        type: 'folder',
        expanded: true,
        children: [
          {
            id: 'p-docs-product',
            name: '产品说明书',
            type: 'folder',
            expanded: false,
            children: []
          },
          {
            id: 'p-docs-tech',
            name: '技术文档',
            type: 'folder',
            expanded: false,
            children: []
          },
          {
            id: 'p-docs-training',
            name: '培训材料',
            type: 'folder',
            expanded: false,
            children: []
          }
        ]
      },
      {
        id: 'p-models',
        name: '模型文件',
        type: 'folder',
        expanded: false,
        children: [
          {
            id: 1,
            name: 'bert-base-chinese.pt',
            type: 'model',
            size: '420MB',
            uploadTime: '2026-03-30 14:30',
            permission: 'private',
            sharePermission: 'use',
            tags: ['NLP', '生产模型']
          },
          {
            id: 2,
            name: 'llama-7b.safetensors',
            type: 'model',
            size: '13.2GB',
            uploadTime: '2026-03-29 16:45',
            permission: 'team',
            sharePermission: 'use',
            tags: ['LLM', '训练中']
          }
        ]
      },
      {
        id: 'p-datasets',
        name: '数据集',
        type: 'folder',
        expanded: false,
        children: [
          {
            id: 3,
            name: 'training_data.csv',
            type: 'data',
            size: '156MB',
            uploadTime: '2026-03-30 09:20',
            permission: 'team',
            sharePermission: 'use',
            tags: ['训练数据', '分类']
          },
          {
            id: 4,
            name: 'test_data.jsonl',
            type: 'data',
            size: '89MB',
            uploadTime: '2026-03-28 15:30',
            permission: 'private',
            sharePermission: 'view',
            tags: ['测试', '评估']
          }
        ]
      },
      {
        id: 'p-public',
        name: '公共资源',
        type: 'folder',
        expanded: false,
        children: []
      }
    ]
  },
  'team': {
    name: '团队空间',
    icon: Users,
    quota: 100,
    used: 45.8,
    departments: [
      {
        id: 'team-research',
        name: '研发一部',
        icon: Users,
        expanded: true,
        folders: [
          {
            id: 'tr-models',
            name: '模型库',
            type: 'folder',
            expanded: false,
            children: [
              {
                id: 5,
                name: 'gpt-4o-mini.pt',
                type: 'model',
                size: '3.2GB',
                uploadTime: '2026-03-30 11:45',
                permission: 'team',
                sharePermission: 'edit',
                tags: ['生产环境', '对话']
              },
              {
                id: 6,
                name: 'qwen-14b.safetensors',
                type: 'model',
                size: '28GB',
                uploadTime: '2026-03-29 14:20',
                permission: 'team',
                sharePermission: 'edit',
                tags: ['LLM', '预训练']
              }
            ]
          },
          {
            id: 'tr-datasets',
            name: '数据集库',
            type: 'folder',
            expanded: false,
            children: [
              {
                id: 7,
                name: 'corpus_zh_2024.json',
                type: 'data',
                size: '2.4GB',
                uploadTime: '2026-03-29 14:20',
                permission: 'team',
                sharePermission: 'edit',
                tags: ['预训练', '中文']
              }
            ]
          }
        ]
      },
      {
        id: 'team-data',
        name: '数据中心',
        icon: HardDrive,
        expanded: false,
        folders: [
          {
            id: 'td-process',
            name: '处理任务',
            type: 'folder',
            expanded: false,
            children: []
          }
        ]
      },
      {
        id: 'team-algo',
        name: '算法团队',
        icon: Zap,
        expanded: false,
        folders: []
      }
    ]
  },
  'public': {
    name: '公共空间',
    icon: Globe,
    quota: 500,
    used: 8.9,
    folders: [
      {
        id: 'pub-docs',
        name: '平台文档',
        type: 'folder',
        expanded: true,
        children: [
          {
            id: 8,
            name: '平台使用手册.pdf',
            type: 'document',
            size: '8.9MB',
            uploadTime: '2026-03-25 10:00',
            permission: 'public',
            sharePermission: 'view',
            tags: ['文档', '手册']
          },
          {
            id: 9,
            name: '开发指南.md',
            type: 'document',
            size: '2.1MB',
            uploadTime: '2026-03-24 15:30',
            permission: 'public',
            sharePermission: 'view',
            tags: ['文档', '开发']
          }
        ]
      },
      {
        id: 'pub-ui',
        name: 'UI资源',
        type: 'folder',
        expanded: false,
        children: [
          {
            id: 10,
            name: 'logo.png',
            type: 'image',
            size: '256KB',
            uploadTime: '2026-03-20 15:30',
            permission: 'public',
            sharePermission: 'view',
            tags: ['UI', '素材']
          }
        ]
      },
      {
        id: 'pub-data',
        name: '公共数据集',
        type: 'folder',
        expanded: false,
        children: []
      }
    ]
  }
};

// 常用标签
const commonTags = ['训练数据', '生产模型', '测试', '文档', 'NLP', 'LLM', '评估', '知识库', '对话', '预训练'];

// 团队列表
const teams = [
  { id: 'research', name: '研发一部' },
  { id: 'data', name: '数据中心' },
  { id: 'algorithm', name: '算法团队' }
];

interface DataCenterFileManagementProps {
  onNavigate?: (page: string) => void;
}

export default function DataCenterFileManagement({ onNavigate }: DataCenterFileManagementProps) {
  const [selectedSpace, setSelectedSpace] = useState('personal');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  // 弹窗状态
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  // 表单状态
  const [uploadTags, setUploadTags] = useState<string[]>([]);
  const [uploadData, setUploadData] = useState({
    filename: '',
    permission: 'private',
    team: '',
    sharePermission: 'view'
  });
  const [folderName, setFolderName] = useState('');
  const [permissionData, setPermissionData] = useState({
    permission: 'private',
    team: '',
    sharePermission: 'view'
  });

  // 获取当前空间数据
  const currentSpace: any = spaceData[selectedSpace as keyof typeof spaceData];

  // 递归获取文件夹下的所有文件
  const getFilesInFolder = (folder: any): any[] => {
    if (folder.type !== 'folder') {
      return [folder];
    }

    let files: any[] = [];
    if (folder.children) {
      folder.children.forEach((child: any) => {
        files = files.concat(getFilesInFolder(child));
      });
    }
    return files;
  };

  // 获取当前显示的文件列表
  const getDisplayFiles = () => {
    if (!selectedFolder) {
      // 未选中文件夹，显示当前空间下所有文件
      let allFiles: any[] = [];

      if (selectedSpace === 'personal' || selectedSpace === 'public') {
        // 个人空间和公共空间：遍历所有文件夹
        currentSpace.folders.forEach((folder: any) => {
          allFiles = allFiles.concat(getFilesInFolder(folder));
        });
      } else if (selectedSpace === 'team') {
        // 团队空间：遍历所有部门的所有文件夹
        currentSpace.departments.forEach((dept: any) => {
          dept.folders.forEach((folder: any) => {
            allFiles = allFiles.concat(getFilesInFolder(folder));
          });
        });
      }

      return allFiles;
    }

    // 选中了文件夹，显示该文件夹下的文件
    const findFolder = (items: any[]): any => {
      for (const item of items) {
        if (item.id === selectedFolder) {
          return item;
        }
        if (item.children) {
          const found = findFolder(item.children);
          if (found) return found;
        }
      }
      return null;
    };

    let folder = null;
    if (selectedSpace === 'personal' || selectedSpace === 'public') {
      folder = findFolder(currentSpace.folders);
    } else if (selectedSpace === 'team') {
      for (const dept of currentSpace.departments) {
        folder = findFolder(dept.folders);
        if (folder) break;
      }
    }

    if (!folder || folder.type !== 'folder') {
      return [];
    }

    return getFilesInFolder(folder);
  };

  const displayFiles = getDisplayFiles();

  // 切换文件夹展开状态
  const toggleFolder = (folderId: string) => {
    // 简化处理，不实际更新状态
    setSelectedFolder(folderId);
  };

  // 渲染团队空间的树形结构
  const renderTeamSpaceTree = () => {
    return currentSpace.departments.map((dept: any) => {
      const DeptIcon = dept.icon;
      return (
        <div key={dept.id}>
          <div
            className={`flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg transition-all duration-200 ${
              false ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-700'
            }`}
            onClick={() => toggleFolder(dept.id)}
          >
            <ChevronRight
              size={14}
              className={`transition-transform duration-200 ${dept.expanded ? 'rotate-90' : ''}`}
            />
            <DeptIcon size={16} />
            <span className="text-sm font-medium">{dept.name}</span>
          </div>

          {dept.expanded && dept.folders && (
            <div className="ml-4">
              {dept.folders.map((folder: any) => renderTreeItem(folder, 1))}
            </div>
          )}
        </div>
      );
    });
  };

  // 渲染个人空间或公共空间的树形结构
  const renderSimpleSpaceTree = () => {
    return currentSpace.folders.map((folder: any) => renderTreeItem(folder, 0));
  };

  // 递归渲染树形节点
  const renderTreeItem = (item: any, level: number = 0) => {
    const isSelected = selectedFolder === item.id;
    const IconComponent = item.type === 'folder' ? (item.expanded ? FolderOpen : Folder) : (fileTypes[item.type as keyof typeof fileTypes]?.icon || FileText);

    return (
      <div key={item.id}>
        <div
          className={`flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg transition-all duration-200 ${
            isSelected
              ? 'bg-blue-50 text-blue-700'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
          style={{ paddingLeft: `${level * 16 + 12}px` }}
          onClick={() => {
            if (item.type === 'folder') {
              toggleFolder(item.id);
              setSelectedFolder(item.id);
            } else {
              setSelectedFolder(item.id);
            }
          }}
        >
          {item.type === 'folder' && (
            <ChevronRight
              size={14}
              className={`transition-transform duration-200 ${item.expanded ? 'rotate-90' : ''}`}
            />
          )}
          <IconComponent size={16} />
          <span className="flex-1 text-sm font-medium truncate">{item.name}</span>
        </div>

        {item.type === 'folder' && item.expanded && item.children && (
          <div>
            {item.children.map((child: any) => renderTreeItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // 添加标签
  const addTag = (tag: string) => {
    if (!uploadTags.includes(tag)) {
      setUploadTags([...uploadTags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setUploadTags(uploadTags.filter(t => t !== tag));
  };

  // 上传文件（简化处理）
  const handleUpload = () => {
    alert('上传成功（简化处理）');
    setShowUploadModal(false);
    setUploadTags([]);
    setUploadData({ filename: '', permission: 'private', team: '', sharePermission: 'view' });
  };

  // 新建文件夹（简化处理）
  const handleCreateFolder = () => {
    alert('创建成功（简化处理）');
    setShowFolderModal(false);
    setFolderName('');
  };

  // 更新权限（简化处理）
  const handlePermissionUpdate = () => {
    alert('权限修改成功（简化处理）');
    setShowPermissionModal(false);
    setSelectedFile(null);
  };

  // 删除文件（简化处理）
  const handleDelete = (fileId: number) => {
    if (confirm('确定要删除这个文件吗？')) {
      alert('删除成功（简化处理）');
    }
  };

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
            <span className="text-gray-900 font-medium">文件管理</span>
          </div>
        </div>

        {/* 数据中心子模块快速导航 */}
        <div className="flex-1 flex items-center justify-center gap-1">
          <button
            onClick={() => onNavigate?.('datacenter')}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
              true
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
              false
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
              placeholder="搜索文件..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
            PM
          </div>
        </div>
      </div>

      {/* 左侧导航 */}
      <div className="w-72 mt-14 bg-white border-r border-gray-200 flex flex-col">
        {/* 存储空间指示器 */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">{currentSpace.name}</span>
            <span className="text-xs text-gray-500">{currentSpace.used}GB / {currentSpace.quota}GB</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: `${(currentSpace.used / currentSpace.quota) * 100}%` }}></div>
          </div>
        </div>

        {/* 空间切换（纵向） */}
        <div className="p-2 space-y-1">
          <div
            onClick={() => { setSelectedSpace('personal'); setSelectedFolder(null); }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
              selectedSpace === 'personal'
                ? 'bg-blue-50 text-blue-700'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <LayoutDashboard size={18} />
            <span className="text-sm font-medium">个人空间</span>
          </div>
          <div
            onClick={() => { setSelectedSpace('team'); setSelectedFolder(null); }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
              selectedSpace === 'team'
                ? 'bg-blue-50 text-blue-700'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <Users size={18} />
            <span className="text-sm font-medium">团队空间</span>
          </div>
          <div
            onClick={() => { setSelectedSpace('public'); setSelectedFolder(null); }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
              selectedSpace === 'public'
                ? 'bg-blue-50 text-blue-700'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <Globe size={18} />
            <span className="text-sm font-medium">公共空间</span>
          </div>
        </div>

        <div className="h-px bg-gray-200 my-2"></div>

        {/* 文件树 */}
        <div className="flex-1 overflow-y-auto p-2">
          {selectedSpace === 'team' ? renderTeamSpaceTree() : renderSimpleSpaceTree()}
        </div>
      </div>

      {/* 右侧内容区 */}
      <div className="flex-1 mt-14 flex flex-col">
        {/* 操作栏 */}
        <div className="px-6 py-4 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFolderModal(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                <Folder size={16} />
                新建文件夹
              </button>
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
              >
                <Upload size={16} />
                上传文件
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <SortAsc className="w-4 h-4 text-gray-600" />
              </button>
              <div className="h-6 w-px bg-gray-200"></div>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 文件列表 */}
        <div className="flex-1 overflow-y-auto p-6">
          {displayFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <FolderOpen size={48} className="mb-4" />
              <p className="text-sm">暂无文件</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              {/* 表头 */}
              <div className="flex items-center px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-600 uppercase tracking-wider">
                <div className="w-1/2 flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>文件名</span>
                </div>
                <div className="w-1/6">类型</div>
                <div className="w-1/6">大小</div>
                <div className="w-1/6">标签</div>
                <div className="w-1/6">权限</div>
                <div className="w-1/6">上传时间</div>
                <div className="w-1/8">操作</div>
              </div>

              {/* 文件列表 */}
              {displayFiles.map(file => {
                const typeConfig = fileTypes[file.type as keyof typeof fileTypes] || fileTypes.other;
                const permissionConfig = permissions[file.permission as keyof typeof permissions];
                const shareConfig = sharePermissions[file.sharePermission as keyof typeof sharePermissions];
                const TypeIcon = typeConfig.icon;
                const PermissionIcon = permissionConfig.icon;
                const ShareIcon = shareConfig.icon;

                return (
                  <div
                    key={file.id}
                    className="flex items-center px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-1/2 flex items-center gap-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${typeConfig.color}`}>
                        <TypeIcon size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{file.name}</div>
                      </div>
                    </div>
                    <div className="w-1/6 text-sm text-gray-600">{typeConfig.name}</div>
                    <div className="w-1/6 text-sm text-gray-600">{file.size}</div>
                    <div className="w-1/6 flex flex-wrap gap-1">
                      {file.tags?.map((tag: string, idx: number) => (
                        <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="w-1/6 flex items-center gap-2">
                      <span className={`px-2 py-1 border rounded-md text-xs font-medium flex items-center gap-1 ${permissionConfig.color}`}>
                        <PermissionIcon size={12} />
                        {permissionConfig.name}
                      </span>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 ${shareConfig.color}`}>
                        <ShareIcon size={12} />
                        {shareConfig.name}
                      </span>
                    </div>
                    <div className="w-1/6 text-sm text-gray-500 flex items-center gap-1">
                      <Clock size={12} />
                      {file.uploadTime}
                    </div>
                    <div className="w-1/8 flex items-center gap-1">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="下载">
                        <Download size={14} className="text-gray-600" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedFile(file);
                          setPermissionData({
                            permission: file.permission,
                            team: '',
                            sharePermission: file.sharePermission
                          });
                          setShowPermissionModal(true);
                        }}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                        title="权限设置"
                      >
                        <Shield size={14} className="text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(file.id)}
                        className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                        title="删除"
                      >
                        <Trash2 size={14} className="text-gray-600" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="更多">
                        <MoreVertical size={14} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 上传文件弹窗 */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">上传文件</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  选择文件 <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-sm text-gray-600">点击或拖拽文件到此处上传</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">文件名</label>
                <input
                  type="text"
                  value={uploadData.filename}
                  onChange={(e) => setUploadData({ ...uploadData, filename: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="输入文件名"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  文件权限 <span className="text-red-500">*</span>
                </label>
                <select
                  value={uploadData.permission}
                  onChange={(e) => setUploadData({ ...uploadData, permission: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {Object.entries(permissions).map(([key, config]) => (
                    <option key={key} value={key}>{config.name}</option>
                  ))}
                </select>
              </div>

              {uploadData.permission === 'team' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    选择团队 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={uploadData.team}
                    onChange={(e) => setUploadData({ ...uploadData, team: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">请选择团队</option>
                    {teams.map(team => (
                      <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  分享权限 <span className="text-red-500">*</span>
                </label>
                <select
                  value={uploadData.sharePermission}
                  onChange={(e) => setUploadData({ ...uploadData, sharePermission: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {Object.entries(sharePermissions).map(([key, config]) => (
                    <option key={key} value={key}>{config.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">标签</label>
                <div className="flex flex-wrap gap-2 p-3 border border-gray-200 rounded-lg min-h-[42px]">
                  {uploadTags.map(tag => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:bg-blue-100 rounded-full"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    className="flex-1 min-w-[100px] text-sm outline-none"
                    placeholder="输入标签，回车添加"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        addTag(e.currentTarget.value.trim());
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {commonTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => addTag(tag)}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleUpload}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
              >
                确认上传
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 新建文件夹弹窗 */}
      {showFolderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">新建文件夹</h3>
              <button
                onClick={() => setShowFolderModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  文件夹名称 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="输入文件夹名称"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setShowFolderModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleCreateFolder}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
              >
                确认创建
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 权限设置弹窗 */}
      {showPermissionModal && selectedFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">权限设置</h3>
              <button
                onClick={() => {
                  setShowPermissionModal(false);
                  setSelectedFile(null);
                }}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">文件名</label>
                <input
                  type="text"
                  value={selectedFile.name}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  文件权限 <span className="text-red-500">*</span>
                </label>
                <select
                  value={permissionData.permission}
                  onChange={(e) => setPermissionData({ ...permissionData, permission: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {Object.entries(permissions).map(([key, config]) => (
                    <option key={key} value={key}>{config.name}</option>
                  ))}
                </select>
              </div>

              {permissionData.permission === 'team' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    选择团队 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={permissionData.team}
                    onChange={(e) => setPermissionData({ ...permissionData, team: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">请选择团队</option>
                    {teams.map(team => (
                      <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  分享权限 <span className="text-red-500">*</span>
                </label>
                <select
                  value={permissionData.sharePermission}
                  onChange={(e) => setPermissionData({ ...permissionData, sharePermission: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {Object.entries(sharePermissions).map(([key, config]) => (
                    <option key={key} value={key}>{config.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowPermissionModal(false);
                  setSelectedFile(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={handlePermissionUpdate}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
              >
                确认修改
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
