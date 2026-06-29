/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActivePage, PartnerRole } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ServicesView from './components/ServicesView';
import KamaiKartPlatform from './components/KamaiKartPlatform';
import BecomePartnerView from './components/BecomePartnerView';
import OtherViews from './components/OtherViews';
import { LogIn, UserCheck, CheckCircle2, ShieldCheck, X, Sparkles, AlertCircle } from 'lucide-react';
import OnboardingTutorial from './components/OnboardingTutorial';
import EnterpriseAuthSystem, { UserAccount, getSystemState, saveSystemState } from './components/EnterpriseAuthSystem';
import RoleDashboards from './components/RoleDashboards';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedRole, setSelectedRole] = useState<PartnerRole>('merchant');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');

  // User Authentication state
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);

  // Sync user session on boot
  useEffect(() => {
    const state = getSystemState();
    if (state.currentUser) {
      setCurrentUser(state.currentUser);
      setActivePage('portal');
    }
  }, []);

  // Onboarding states
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [onboardingRole, setOnboardingRole] = useState<'customer' | 'merchant' | 'ppm'>('customer');

  // Auth modal states
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'register'>('login');

  // Manage dark mode class on document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle opening authentication modals
  const openAuthModal = (type: 'login' | 'register') => {
    setAuthType(type);
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    const state = getSystemState();
    state.currentUser = null;
    saveSystemState(state);
    setCurrentUser(null);
    setActivePage('home');
  };

  const handleAuthSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    setAuthModalOpen(false);
    setActivePage('portal');
  };

  const refreshUserSession = () => {
    const state = getSystemState();
    if (state.currentUser) {
      setCurrentUser({ ...state.currentUser });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 font-sans antialiased transition-colors flex flex-col justify-between">
      
      {/* 1. STICKY HEADER */}
      <Header 
        activePage={activePage} 
        setActivePage={setActivePage}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        language={language}
        setLanguage={setLanguage}
        openAuthModal={openAuthModal}
        openOnboarding={(role) => {
          setOnboardingRole(role);
          setOnboardingOpen(true);
        }}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* 2. MAIN SUB-PORTAL ROUTER */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomeView 
            setActivePage={setActivePage} 
            setSelectedRole={setSelectedRole} 
            language={language} 
            openAuthModal={openAuthModal} 
            openOnboarding={(role) => {
              setOnboardingRole(role);
              setOnboardingOpen(true);
            }}
          />
        )}
        
        {activePage === 'about' && (
          <AboutView language={language} />
        )}
        
        {activePage === 'services' && (
          <ServicesView 
            setActivePage={setActivePage} 
            setSelectedRole={setSelectedRole} 
          />
        )}
        
        {activePage === 'kamaikart' && (
          <KamaiKartPlatform language={language} />
        )}
        
        {activePage === 'partner' && (
          <BecomePartnerView 
            selectedRole={selectedRole} 
            setSelectedRole={setSelectedRole} 
            language={language} 
          />
        )}

        {(activePage === 'career' || activePage === 'blog' || activePage === 'news' || activePage === 'support') && (
          <OtherViews viewType={activePage} language={language} />
        )}

        {/* Support direct routing option for contacts */}
        {activePage === 'contact' && (
          <OtherViews viewType="support" language={language} />
        )}

        {activePage === 'portal' && currentUser && (
          <RoleDashboards 
            user={currentUser} 
            language={language} 
            onLogout={handleLogout}
            onStateUpdate={refreshUserSession}
          />
        )}
      </main>

      {/* 3. CORPORATE FOOTER */}
      <Footer 
        setActivePage={setActivePage} 
        setSelectedRole={setSelectedRole} 
        language={language} 
      />

      {/* 4. PREMIUM LOGIN & REGISTRATION MODAL */}
      {authModalOpen && (
        <EnterpriseAuthSystem 
          language={language} 
          onAuthSuccess={handleAuthSuccess} 
          onClose={() => setAuthModalOpen(false)} 
        />
      )}

      {/* 5. INTERACTIVE ONBOARDING TUTORIAL */}
      <OnboardingTutorial 
        isOpen={onboardingOpen} 
        onClose={() => setOnboardingOpen(false)} 
        initialRole={onboardingRole}
        language={language}
      />

    </div>
  );
}
