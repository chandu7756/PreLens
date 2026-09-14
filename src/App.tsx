import React, { useState } from 'react';
import {
  UserRole,
  UserProfile,
  ActiveTab,
  TrainingDocument,
  MCQQuestion,
  Assessment,
  QuizAttempt,
  IGOTCourse,
  DepartmentMetric,
  NotificationItem,
} from './types';
import {
  INITIAL_DOCUMENTS,
  INITIAL_QUESTIONS,
  INITIAL_ASSESSMENTS,
  INITIAL_ATTEMPTS,
  IGOT_COURSES,
  DEPARTMENT_METRICS,
  INITIAL_NOTIFICATIONS,
} from './data/mospiData';
import { PRECONFIGURED_USERS } from './data/authUsers';
import { PrepLensHeader } from './components/PrepLensHeader';
import { DashboardOverview } from './components/DashboardOverview';
import { UploadAndGenerateEngine } from './components/UploadAndGenerateEngine';
import { AdminReviewQueue } from './components/AdminReviewQueue';
import { LearnerAssessments } from './components/LearnerAssessments';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { CompetencyGapAnalysis } from './components/CompetencyGapAnalysis';
import { IGOTCoursesView } from './components/IGOTCoursesView';
import { DepartmentAnalytics } from './components/DepartmentAnalytics';
import { NotificationsCenter } from './components/NotificationsCenter';
import { TechnicalArchitectureModal } from './components/TechnicalArchitectureModal';
import { LoginPage } from './components/LoginPage';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Shield, X } from 'lucide-react';

export const App: React.FC = () => {
  // Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('preplens_current_user');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    // Default to initial demo user or null; defaulting to null displays the official login portal
    return null;
  });

  const [welcomeToast, setWelcomeToast] = useState<UserProfile | null>(null);

  const [currentRole, setCurrentRole] = useState<UserRole>(() => currentUser?.role || 'learner');
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');

  // Application Data States
  const [documents, setDocuments] = useState<TrainingDocument[]>(INITIAL_DOCUMENTS);
  const [questions, setQuestions] = useState<MCQQuestion[]>(INITIAL_QUESTIONS);
  const [assessments, setAssessments] = useState<Assessment[]>(INITIAL_ASSESSMENTS);
  const [attempts, setAttempts] = useState<QuizAttempt[]>(INITIAL_ATTEMPTS);
  const [courses, setCourses] = useState<IGOTCourse[]>(IGOT_COURSES);
  const [departmentMetrics] = useState<DepartmentMetric[]>(DEPARTMENT_METRICS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Active state for quiz taking
  const [activeQuizAssessment, setActiveQuizAssessment] = useState<Assessment | null>(null);
  const [selectedAttemptForReview, setSelectedAttemptForReview] = useState<QuizAttempt | null>(
    attempts[0] || null
  );

  // Architecture Modal
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState<boolean>(false);

  // Login handler
  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setCurrentRole(user.role);
    setWelcomeToast(user);
    if (user.role === 'admin') {
      setActiveTab('overview');
    } else {
      setActiveTab('overview');
    }
    // Auto dismiss toast after 6 seconds
    setTimeout(() => {
      setWelcomeToast(null);
    }, 6000);
  };

  // Logout handler
  const handleLogout = () => {
    try {
      localStorage.removeItem('preplens_current_user');
    } catch {
      // ignore
    }
    setCurrentUser(null);
    setActiveTab('overview');
  };

  // Switch account handler (brings back login portal)
  const handleSwitchAccount = () => {
    setCurrentUser(null);
  };

  // Handlers
  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    if (currentUser) {
      // Find matching preset for role if switching
      const match = PRECONFIGURED_USERS.find((u) => u.profile.role === role);
      if (match) {
        setCurrentUser(match.profile);
      }
    }
    if (role === 'admin' && (activeTab === 'learner-assessments' || activeTab === 'quiz-active' || activeTab === 'gap-analysis')) {
      setActiveTab('upload-engine');
    } else if (role === 'learner' && (activeTab === 'upload-engine' || activeTab === 'admin-review' || activeTab === 'analytics')) {
      setActiveTab('learner-assessments');
    }
  };

  const handleAddDocument = (doc: TrainingDocument) => {
    setDocuments((prev) => [doc, ...prev]);
  };

  const handleAddGeneratedQuestions = (newQuestions: MCQQuestion[]) => {
    setQuestions((prev) => [...newQuestions, ...prev]);

    // Push notification for Admin
    const newNotif: NotificationItem = {
      id: 'notif-' + Date.now(),
      type: 'approval',
      title: `${newQuestions.length} New AI Questions Generated`,
      message: 'Freshly generated MCQs await human verification before publication.',
      timestamp: 'Just now',
      read: false,
      actionLabel: 'Review Queue',
      actionTab: 'admin-review',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleUpdateQuestion = (updated: MCQQuestion) => {
    setQuestions((prev) => prev.map((q) => (q.id === updated.id ? updated : q)));
  };

  const handleApproveAllPending = () => {
    const reviewer = currentUser?.name || 'MoSPI Training Director';
    setQuestions((prev) =>
      prev.map((q) =>
        q.status === 'pending_review'
          ? { ...q, status: 'approved', reviewedBy: reviewer }
          : q
      )
    );
  };

  const handleStartQuiz = (assessment: Assessment) => {
    setActiveQuizAssessment(assessment);
    setActiveTab('quiz-active');
  };

  const handleCancelQuiz = () => {
    setActiveQuizAssessment(null);
    setActiveTab('learner-assessments');
  };

  const handleCompleteQuiz = (newAttempt: QuizAttempt) => {
    setAttempts((prev) => [newAttempt, ...prev]);
    setSelectedAttemptForReview(newAttempt);
    setActiveQuizAssessment(null);

    // Check if any gaps exist to create alert
    const hasGap = Object.values(newAttempt.competencyBreakdown).some((stat) => stat.isGap);
    if (hasGap) {
      const gapNotif: NotificationItem = {
        id: 'notif-' + Date.now(),
        type: 'gap_alert',
        title: 'Competency Gap Alert Identified',
        message: `Evaluation in "${newAttempt.assessmentTitle}" indicated proficiency below 70%. Targeted iGOT modules assigned.`,
        timestamp: 'Just now',
        read: false,
        actionLabel: 'View Gaps',
        actionTab: 'gap-analysis',
      };
      setNotifications((prev) => [gapNotif, ...prev]);
    }

    setActiveTab('gap-analysis');
  };

  const handleViewAttemptReport = (attempt: QuizAttempt) => {
    setSelectedAttemptForReview(attempt);
    setActiveTab('gap-analysis');
  };

  const handleUpdateCourse = (updated: IGOTCourse) => {
    setCourses((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  // If unauthenticated, show the Login Portal
  if (!currentUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Real-Feel Authenticated Session Welcome Toast */}
      <AnimatePresence>
        {welcomeToast && (
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.95 }}
            className="fixed top-18 right-4 sm:right-8 z-50 max-w-sm sm:max-w-md w-full bg-white/95 backdrop-blur-md border-2 border-emerald-500/30 rounded-xl shadow-2xl p-4 flex items-start gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 uppercase tracking-widest">
                <Shield className="w-3.5 h-3.5" />
                <span>NIC Parichay SSO • Verified Session</span>
              </div>
              <div className="text-sm font-bold text-slate-900 truncate">
                Welcome, {welcomeToast.name}
              </div>
              <div className="text-xs text-slate-600 truncate font-medium">
                {welcomeToast.designation}
              </div>
              <div className="text-[10px] text-slate-400 font-mono pt-0.5 truncate">
                {welcomeToast.division} • {welcomeToast.station}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setWelcomeToast(null)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <PrepLensHeader
        currentRole={currentRole}
        currentUser={currentUser}
        onRoleChange={handleRoleChange}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        unreadNotificationsCount={unreadNotificationsCount}
        onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
        onLogout={handleLogout}
        onSwitchAccount={handleSwitchAccount}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8">
        {activeTab === 'overview' && (
          <DashboardOverview
            currentRole={currentRole}
            currentUser={currentUser}
            onTabChange={setActiveTab}
            documents={documents}
            questions={questions}
            latestAttempt={selectedAttemptForReview || attempts[0] || null}
            onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
          />
        )}

        {activeTab === 'upload-engine' && (
          <UploadAndGenerateEngine
            documents={documents}
            onAddDocument={handleAddDocument}
            onAddGeneratedQuestions={handleAddGeneratedQuestions}
            onGoToReview={() => setActiveTab('admin-review')}
          />
        )}

        {activeTab === 'admin-review' && (
          <AdminReviewQueue
            questions={questions}
            onUpdateQuestion={handleUpdateQuestion}
            onApproveAllPending={handleApproveAllPending}
          />
        )}

        {activeTab === 'learner-assessments' && (
          <LearnerAssessments
            assessments={assessments}
            attempts={attempts}
            questions={questions}
            currentUser={currentUser}
            onStartQuiz={handleStartQuiz}
            onViewAttemptReport={handleViewAttemptReport}
          />
        )}

        {activeTab === 'quiz-active' && activeQuizAssessment && (
          <InteractiveQuiz
            assessment={activeQuizAssessment}
            questions={questions}
            currentUser={currentUser}
            onCompleteQuiz={handleCompleteQuiz}
            onCancelQuiz={handleCancelQuiz}
          />
        )}

        {activeTab === 'gap-analysis' && (
          <CompetencyGapAnalysis
            latestAttempt={selectedAttemptForReview || attempts[0] || null}
            courses={courses}
            onNavigateToCourses={() => setActiveTab('igot-courses')}
            onRetakeAssessment={() => setActiveTab('learner-assessments')}
          />
        )}

        {activeTab === 'igot-courses' && (
          <IGOTCoursesView
            courses={courses}
            latestAttempt={selectedAttemptForReview || attempts[0] || null}
            onUpdateCourse={handleUpdateCourse}
            onRetakeAssessment={() => setActiveTab('learner-assessments')}
          />
        )}

        {activeTab === 'analytics' && (
          <DepartmentAnalytics metrics={departmentMetrics} />
        )}

        {activeTab === 'notifications' && (
          <NotificationsCenter
            notifications={notifications}
            onMarkAsRead={handleMarkNotificationRead}
            onMarkAllAsRead={handleMarkAllNotificationsRead}
            onNavigateTab={setActiveTab}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200 py-6 px-4 sm:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-800">PrepLens Platform</span>
            <span>•</span>
            <span>Smart India Hackathon 2026 (PS ID: SIH26101)</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Ministry of Statistics & Programme Implementation</span>
            <span>•</span>
            <button
              type="button"
              onClick={() => setIsArchitectureModalOpen(true)}
              className="text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
            >
              Technical Deck & Slides
            </button>
          </div>
        </div>
      </footer>

      {/* Technical Architecture Slides Modal */}
      <TechnicalArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />
    </div>
  );
};
export default App;

