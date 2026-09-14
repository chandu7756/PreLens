import React, { useState } from 'react';
import {
  UserRole,
  ActiveTab,
  UserProfile,
} from '../types';
import {
  BrainCircuit,
  Shield,
  GraduationCap,
  Bell,
  Layers,
  Sparkles,
  BarChart3,
  FileText,
  CheckSquare,
  HelpCircle,
  LogOut,
  User,
  ChevronDown,
} from 'lucide-react';

interface PrepLensHeaderProps {
  currentRole: UserRole;
  currentUser: UserProfile | null;
  onRoleChange: (role: UserRole) => void;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  unreadNotificationsCount: number;
  onOpenArchitecture: () => void;
  onLogout: () => void;
  onSwitchAccount: () => void;
}

export const PrepLensHeader: React.FC<PrepLensHeaderProps> = ({
  currentRole,
  currentUser,
  onRoleChange,
  activeTab,
  onTabChange,
  unreadNotificationsCount,
  onOpenArchitecture,
  onLogout,
  onSwitchAccount,
}) => {
  const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);
  return (
    <header id="preplens-header" className="sticky top-0 z-40 w-full bg-white border-b border-slate-200">
      {/* Official Government of India & MoSPI Top Bar */}
      <div className="bg-[#0f172a] text-slate-300 text-xs px-4 sm:px-8 py-2 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          {/* Official Emblem Mark */}
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] text-amber-400 font-bold">
              GOI
            </div>
            <div className="leading-tight">
              <span className="font-semibold text-slate-100 text-[12px] tracking-tight block sm:inline">
                Ministry of Statistics & Programme Implementation
              </span>
              <span className="text-slate-400 text-[11px] sm:ml-2 font-normal">
                Government of India
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="hidden xl:inline text-[11px] text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded border border-slate-700/60">
            SIH 2026 • <strong className="text-amber-400 font-mono">SIH26101</strong>
          </span>

          <button
            id="btn-open-sih-architecture"
            type="button"
            onClick={onOpenArchitecture}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium border border-slate-700 transition-colors cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span>Blueprint</span>
          </button>

          {/* User Profile Pill & Actions */}
          {currentUser && (
            <div className="relative">
              <div className="flex items-center gap-2 pl-2 pr-1 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${
                    currentUser.role === 'admin' ? 'bg-indigo-600' : 'bg-emerald-700'
                  }`}>
                    {currentUser.avatarInitials}
                  </div>
                  <div className="leading-none text-left hidden md:block">
                    <span className="font-semibold text-slate-100 block truncate max-w-[130px]">
                      {currentUser.name}
                    </span>
                    <span className="text-[9px] text-slate-400 uppercase font-mono">
                      {currentUser.employeeCode}
                    </span>
                  </div>
                </div>

                <div className="h-4 w-px bg-slate-700 mx-0.5 hidden md:block" />

                {/* Quick Role Indicator Tag */}
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                  currentUser.role === 'admin'
                    ? 'bg-indigo-900/80 text-indigo-300 border border-indigo-700/50'
                    : 'bg-emerald-900/80 text-emerald-300 border border-emerald-700/50'
                }`}>
                  {currentUser.role === 'admin' ? 'Admin' : 'Official'}
                </span>

                {/* Switch / Logout Button */}
                <button
                  id="btn-header-switch-account"
                  type="button"
                  onClick={onSwitchAccount}
                  className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 text-[10px] font-medium transition-colors cursor-pointer"
                  title="Switch user account"
                >
                  Switch
                </button>

                <button
                  id="btn-header-logout"
                  type="button"
                  onClick={onLogout}
                  className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition-colors cursor-pointer"
                  title="Sign Out of MoSPI Portal"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <button
            id="brand-home-link"
            type="button"
            onClick={() => onTabChange('overview')}
            className="flex items-center gap-3 text-left focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-slate-900">
                  PrepLens
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  iGOT Karmayogi
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Competency Assessment & Capacity-Building Engine
              </p>
            </div>
          </button>
        </div>

        {/* Streamlined Navigation Links */}
        <nav id="header-navigation" className="flex items-center gap-1 sm:gap-1.5">
          <button
            id="nav-tab-overview"
            type="button"
            onClick={() => onTabChange('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Dashboard
          </button>

          {currentRole === 'admin' ? (
            <>
              <button
                id="nav-tab-upload-engine"
                type="button"
                onClick={() => onTabChange('upload-engine')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'upload-engine'
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Question Studio</span>
              </button>

              <button
                id="nav-tab-admin-review"
                type="button"
                onClick={() => onTabChange('admin-review')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'admin-review'
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <CheckSquare className="w-3.5 h-3.5" />
                <span>Verification Queue</span>
              </button>

              <button
                id="nav-tab-analytics"
                type="button"
                onClick={() => onTabChange('analytics')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'analytics'
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Cadre Analytics</span>
              </button>
            </>
          ) : (
            <>
              <button
                id="nav-tab-learner-assessments"
                type="button"
                onClick={() => onTabChange('learner-assessments')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'learner-assessments' || activeTab === 'quiz-active'
                    ? 'bg-emerald-50 text-emerald-800 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Assessments</span>
              </button>

              <button
                id="nav-tab-gap-analysis"
                type="button"
                onClick={() => onTabChange('gap-analysis')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'gap-analysis'
                    ? 'bg-emerald-50 text-emerald-800 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Skill Gaps</span>
              </button>

              <button
                id="nav-tab-igot-courses"
                type="button"
                onClick={() => onTabChange('igot-courses')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'igot-courses'
                    ? 'bg-emerald-50 text-emerald-800 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>iGOT Modules</span>
              </button>
            </>
          )}

          {/* Notifications Button */}
          <button
            id="nav-btn-notifications"
            type="button"
            onClick={() => onTabChange('notifications')}
            className={`relative p-2 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'notifications'
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Notifications & Alerts"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
