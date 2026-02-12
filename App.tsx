
import React, { useState, useEffect } from 'react';
import { Page, AppConfig } from './types';
import { DEFAULT_CONFIG } from './constants';
import Layout from './components/Layout';
import PublicView from './components/PublicView';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard';
import FootballLoader from './components/FootballLoader';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Persistence simulation
  useEffect(() => {
    const savedConfig = localStorage.getItem('rrg_soft_config');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
    const authStatus = localStorage.getItem('rrg_soft_auth');
    if (authStatus === 'true') {
      setIsLoggedIn(true);
    }

    // Initial loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleUpdateConfig = (newConfig: AppConfig) => {
    setConfig(newConfig);
    localStorage.setItem('rrg_soft_config', JSON.stringify(newConfig));
  };

  const handleLogin = (status: boolean) => {
    setIsLoggedIn(status);
    if (status) {
      setCurrentPage('admin');
      localStorage.setItem('rrg_soft_auth', 'true');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
    localStorage.removeItem('rrg_soft_auth');
  };

  if (isLoading) {
    return <FootballLoader />;
  }

  return (
    <Layout>
      {currentPage === 'home' && (
        <PublicView 
          config={config} 
          onGoToLogin={() => setCurrentPage('login')} 
        />
      )}
      {currentPage === 'login' && (
        <LoginForm 
          onLogin={handleLogin} 
          onBack={() => setCurrentPage('home')} 
        />
      )}
      {currentPage === 'admin' && (
        isLoggedIn ? (
          <AdminDashboard 
            config={config} 
            onUpdate={handleUpdateConfig} 
            onLogout={handleLogout}
            onBack={() => setCurrentPage('home')}
          />
        ) : (
          <LoginForm onLogin={handleLogin} onBack={() => setCurrentPage('home')} />
        )
      )}
    </Layout>
  );
};

export default App;
