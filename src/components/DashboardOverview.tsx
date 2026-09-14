import React from 'react';
import {
  ActiveTab,
  UserRole,
  QuizAttempt,
  TrainingDocument,
  MCQQuestion,
  UserProfile,
} from '../types';
import {
  UploadCloud,
  CheckCircle,
  FileCheck2,
  TrendingUp,
  Brain,
  ArrowRight,
  BookOpen,
  Award,
  AlertTriangle,
  BarChart3,
  UserCheck,
} from 'lucide-react';

interface DashboardOverviewProps {
  currentRole: UserRole;
  currentUser?: UserProfile | null;
  onTabChange: (tab: ActiveTab) => void;
  documents: TrainingDocument[];
  questions: MCQQuestion[];
  latestAttempt?: QuizAttempt;
  onOpenArchitecture: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  currentRole,
  currentUser,
  onTabChange,
  documents,
  questions,
  latestAttempt,
  onOpenArchitecture,
}) => {
  const approvedCount = questions.filter((q) => q.status === 'approved').length;
  const pendingCount = questions.filter((q) => q.status === 'pending_review').length;

  return (
    <div id="dashboard-overview-container" className="space-y-6 animate-in fade-in duration-200">
      {/* Executive Welcome Card */}
      <div className="rounded-xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Ministry of Statistics & Programme Implementation • Mission Karmayogi</span>
            {currentUser && (
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[11px] border border-slate-200">
                Logged in as: {currentUser.name} ({currentUser.role === 'admin' ? 'Director' : 'Official'})
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {currentUser ? `Welcome, ${currentUser.name}` : 'MoSPI Competency Assessment & Capacity Building'}
          </h1>

          <p className="text-sm text-slate-600 leading-relaxed">
            Automating statistical training for Indian Statistical Service (ISS) officers and field investigators.
            Ingest official manuals, generate verified FRAC-aligned assessments, pinpoint competency gaps, and automatically assign targeted training modules on <strong className="text-slate-900">iGOT Karmayogi</strong>.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            {currentRole === 'admin' ? (
              <>
                <button
                  id="btn-dash-upload"
                  type="button"
                  onClick={() => onTabChange('upload-engine')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Ingest Manual & Generate MCQs</span>
                </button>
                <button
                  id="btn-dash-review"
                  type="button"
                  onClick={() => onTabChange('admin-review')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <FileCheck2 className="w-4 h-4 text-slate-600" />
                  <span>Pending Review ({pendingCount})</span>
                </button>
              </>
            ) : (
              <>
                <button
                  id="btn-dash-take-quiz"
                  type="button"
                  onClick={() => onTabChange('learner-assessments')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Start Official Assessment</span>
                </button>
                <button
                  id="btn-dash-gaps"
                  type="button"
                  onClick={() => onTabChange('gap-analysis')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <TrendingUp className="w-4 h-4 text-slate-600" />
                  <span>Competency Gap Report</span>
                </button>
              </>
            )}

            <button
              id="btn-dash-architecture"
              type="button"
              onClick={onOpenArchitecture}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 text-xs font-medium hover:bg-slate-50 transition-colors cursor-pointer ml-auto"
            >
              <span>SIH Technical Blueprint</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              Training Manuals
            </span>
            <BookOpen className="w-4 h-4 text-slate-400" />
          </div>
          <span className="text-2xl font-bold text-slate-900 block mt-2">
            {documents.length}
          </span>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            NSS, CPI, PLFS & National Accounts
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              Verified Question Bank
            </span>
            <FileCheck2 className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-bold text-slate-900 block mt-2">
            {approvedCount} MCQs
          </span>
          <span className="text-[11px] text-emerald-600 font-medium block mt-0.5">
            Human verified (0% hallucination)
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              Review Queue
            </span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-2xl font-bold text-slate-900 block mt-2">
            {pendingCount}
          </span>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            Awaiting Director approval
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              iGOT Course Modules
            </span>
            <Award className="w-4 h-4 text-indigo-600" />
          </div>
          <span className="text-2xl font-bold text-slate-900 block mt-2">
            6 Modules
          </span>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            FRAC-mapped via NSSTA
          </span>
        </div>
      </div>

      {/* 6-Step Workflow Pipeline */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              6-Step Competency Assessment Lifecycle
            </h2>
            <p className="text-xs text-slate-500">
              Click any stage to navigate directly to its corresponding module
            </p>
          </div>
          <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded">
            SIH Problem Statement SIH26101 Workflow
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          <div
            onClick={() => onTabChange('upload-engine')}
            className="p-4 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-slate-50/70 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-indigo-600">01</span>
              <UploadCloud className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 mt-2">
              Ingest Official Manuals
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 leading-normal">
              Extract and segment text from NSS circulars, CPI manuals, and statistical schedules.
            </p>
          </div>

          <div
            onClick={() => onTabChange('admin-review')}
            className="p-4 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-slate-50/70 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-indigo-600">02</span>
              <Brain className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 mt-2">
              AI MCQ Generation
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 leading-normal">
              Gemini model generates 4-option MCQs with statistical reasoning and FRAC tags.
            </p>
          </div>

          <div
            onClick={() => onTabChange('admin-review')}
            className="p-4 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-slate-50/70 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-indigo-600">03</span>
              <FileCheck2 className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 mt-2">
              Human-in-the-Loop QA
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 leading-normal">
              MoSPI Training Directors inspect, refine, and certify questions before release.
            </p>
          </div>

          <div
            onClick={() => onTabChange('learner-assessments')}
            className="p-4 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-slate-50/70 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-indigo-600">04</span>
              <CheckCircle className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 mt-2">
              Cadre Role-Based Exams
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 leading-normal">
              Officials undertake timed benchmark tests on survey protocols and calculations.
            </p>
          </div>

          <div
            onClick={() => onTabChange('gap-analysis')}
            className="p-4 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-slate-50/70 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-indigo-600">05</span>
              <TrendingUp className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 mt-2">
              Competency Gap Detection
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 leading-normal">
              Scores below 70% threshold instantly flag specific knowledge deficits.
            </p>
          </div>

          <div
            onClick={() => onTabChange('igot-courses')}
            className="p-4 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-slate-50/70 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-indigo-600">06</span>
              <Award className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 mt-2">
              iGOT Karmayogi Remediation
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 leading-normal">
              Automated routing to NSSTA modules with follow-up re-evaluation tracking.
            </p>
          </div>
        </div>
      </div>

      {/* Latest Official Attempt Spotlight (if exists) */}
      {latestAttempt && (
        <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Latest Official Assessment Attempt
            </h3>
            <span className="text-xs text-slate-400">{latestAttempt.attemptedAt}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs items-center">
            <div>
              <span className="text-slate-500 block">Candidate</span>
              <span className="font-semibold text-slate-900 text-sm block">
                {latestAttempt.officialName}
              </span>
              <span className="text-[11px] text-slate-400">{latestAttempt.officialRole}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Assessment</span>
              <span className="font-medium text-slate-800 block truncate">
                {latestAttempt.assessmentTitle}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Score</span>
              <span className="font-bold text-slate-900 text-base block">
                {latestAttempt.scorePercentage.toFixed(1)}%
                <span className="text-xs font-normal text-slate-500 ml-1">
                  ({latestAttempt.correctAnswersCount}/{latestAttempt.totalQuestions})
                </span>
              </span>
            </div>
            <div className="flex items-center sm:justify-end">
              <button
                id="btn-view-gap-from-dash"
                type="button"
                onClick={() => onTabChange('gap-analysis')}
                className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-medium text-xs hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Inspect Gap Report →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
