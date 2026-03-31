import React, { useState, useEffect } from 'react';
import AIPlatformDashboard from './App';
import DataCenter from './pages/DataCenter';
import AnnotationSystem from './AnnotationSystem';
import DevEnvironment from './pages/DevEnvironment';
import ModelCenter from './pages/ModelCenter';
import AIApplication from './pages/AIApplication';
import CloudService from './pages/CloudService';
import ComputeCenter from './pages/ComputeCenter';
import AdminCenter from './pages/AdminCenter';
import DatasetDetail from './pages/DatasetDetail';

export default function MainApp() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  // 通过URL参数控制页面
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    if (pageParam) {
      setCurrentPage(pageParam);
    } else {
      setCurrentPage('dashboard');
    }
  }, []);

  // 监听 URL 变化
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = urlParams.get('page');
      setCurrentPage(pageParam || 'dashboard');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    const url = new URL(window.location.href);
    if (page === 'dashboard') {
      url.searchParams.delete('page');
    } else {
      url.searchParams.set('page', page);
    }
    window.history.pushState({}, '', url);
  };

  return (
    <>
      {currentPage === 'dashboard' && <AIPlatformDashboard onNavigate={navigateTo} />}
      {currentPage === 'datacenter' && <DataCenter />}
      {currentPage === 'datacenter-files' && <DataCenter />}
      {currentPage === 'annotation' && <AnnotationSystem />}
      {currentPage === 'dev' && <DevEnvironment onNavigate={navigateTo} />}
      {currentPage === 'model' && <ModelCenter onNavigate={navigateTo} />}
      {currentPage === 'app' && <AIApplication onNavigate={navigateTo} />}
      {currentPage === 'cloud' && <CloudService onNavigate={navigateTo} />}
      {currentPage === 'compute' && <ComputeCenter onNavigate={navigateTo} />}
      {currentPage === 'admin' && <AdminCenter onNavigate={navigateTo} />}
      {currentPage === 'dataset' && <DatasetDetail dataset={{
        id: 1,
        name: '示例数据集',
        description: '这是一个示例数据集',
        type: 'text',
        format: 'JSONL',
        samples: 125000,
        size: '2.4GB',
        status: 'ready',
        updated: '2小时前',
        owner: '张三',
        tags: ['指令微调', '开源'],
        dataSource: 'huggingface'
      }} onBack={() => navigateTo('datacenter')} />}
    </>
  );
}
