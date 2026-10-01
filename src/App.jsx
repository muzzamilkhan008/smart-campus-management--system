import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';

// Pages & Dashboards
import { LandingPage } from './components/landing/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { TeacherDashboard } from './components/dashboards/TeacherDashboard';
import { StudentDashboard } from './components/dashboards/StudentDashboard';
import { ParentDashboard } from './components/dashboards/ParentDashboard';

// Modules
import { StudentManagement } from './components/modules/StudentManagement';
import { FacultyManagement } from './components/modules/FacultyManagement';
import { AttendanceManagement } from './components/modules/AttendanceManagement';
import { AcademicManagement } from './components/modules/AcademicManagement';
import { GradesManagement } from './components/modules/GradesManagement';
import { CampusEvents } from './components/modules/CampusEvents';
import { NotificationsCenter } from './components/modules/NotificationsCenter';
import { Announcements } from './components/modules/Announcements';
import { FeeManagement } from './components/modules/FeeManagement';
import { LibraryManagement } from './components/modules/LibraryManagement';
import { SupportSystem } from './components/modules/SupportSystem';
import { CampusFacilities } from './components/modules/CampusFacilities';
import { AnalyticsDashboard } from './components/modules/AnalyticsDashboard';
import { AiAssistant } from './components/modules/AiAssistant';
import { AboutProjectModal } from './components/modules/AboutProjectModal';

export function AppContent() {
  const { user, currentView, activeTab } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  // If user is viewing public landing page
  if (currentView === 'landing') {
    return (
      <>
        <LandingPage onOpenAboutModal={() => setIsAboutModalOpen(true)} />
        <AboutProjectModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
      </>
    );
  }

  // If user is on login page
  if (currentView === 'login' || !user) {
    return <LoginPage />;
  }

  // Render role dashboard depending on role and active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        if (user.role === 'teacher') return <TeacherDashboard />;
        if (user.role === 'student') return <StudentDashboard />;
        if (user.role === 'parent') return <ParentDashboard />;
        return <AdminDashboard />;
      case 'students':
        return <StudentManagement />;
      case 'teachers':
        return <FacultyManagement />;
      case 'attendance':
        return <AttendanceManagement />;
      case 'academics':
        return <AcademicManagement />;
      case 'grades':
        return <GradesManagement />;
      case 'events':
        return <CampusEvents />;
      case 'notifications':
        return <NotificationsCenter />;
      case 'announcements':
        return <Announcements />;
      case 'fees':
        return <FeeManagement />;
      case 'library':
        return <LibraryManagement />;
      case 'support':
        return <SupportSystem />;
      case 'facilities':
        return <CampusFacilities />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'ai-assistant':
        return <AiAssistant />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-900 transition-colors">
      <Navbar
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
      />

      <div className="flex flex-1">
        <Sidebar />
        <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {renderTabContent()}
        </main>
      </div>

      <Footer onOpenAboutModal={() => setIsAboutModalOpen(true)} />
      <AboutProjectModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
    </div>
  );
}
