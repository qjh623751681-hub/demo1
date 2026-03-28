import React, { useState, useEffect } from 'react';
import AIPlatformDashboard from './App';
import DataCenter from './DataCenter';

export default function MainApp() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'datacenter'>('dashboard');
  
  // 通过URL参数控制页面
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    if (pageParam === 'datacenter') {
      setCurrentPage('datacenter');
    } else {
      setCurrentPage('dashboard');
    }
  }, []);

  // 监听 URL 变化
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = urlParams.get('page');
      setCurrentPage(pageParam === 'datacenter' ? 'datacenter' : 'dashboard');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: 'dashboard' | 'datacenter') => {
    setCurrentPage(page);
    const url = new URL(window.location.href);
    if (page === 'datacenter') {
      url.searchParams.set('page', 'datacenter');
    } else {
      url.searchParams.delete('page');
    }
    window.history.pushState({}, '', url);
  };

  return (
    <>
      {currentPage === 'dashboard' ? (
        <AIPlatformDashboard onNavigate={navigateTo} />
      ) : (
        <DataCenter onNavigate={navigateTo} />
      )}
    </>
  );
}
