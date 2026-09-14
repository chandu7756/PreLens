import React from 'react';
import {
  QuizAttempt,
  IGOTCourse,
  ActiveTab,
} from '../types';
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Award,
  ArrowRight,
  BookOpen,
  GraduationCap,
  ShieldAlert,
  RotateCcw,
} from 'lucide-react';

interface CompetencyGapAnalysisProps {
  latestAttempt: QuizAttempt | null;
  courses: IGOTCourse[];
  onNavigateToCourses: (suggestedCompetency?: string) => void;
  onRetakeAssessment: () => void;
}

export const CompetencyGapAnalysis: React.FC<CompetencyGapAnalysisProps> = ({
  latestAttempt,
  courses,
  onNavigateToCourses,
  onRetakeAssessment,
}) => {
  if (!latestAttempt) {
    return (
      <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 space-y-4">
        <TrendingUp className="w-10 h-10 mx-auto text-indigo-500" />
        <h2 className="text-lg font-bold text-slate-900">
          No Assessment Evaluated Yet
        </h2>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Take one of the assigned MoSPI competency assessments to generate a real-time gap analysis and personalized training roadmap.
        </p>
        <button
          type="button"
          onClick={onRetakeAssessment}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer"
        >
          View Available Assessments
        </button>
      </div>
    );
  }

  type CompetencyStat = { total: number; correct: number; percentage: number; isGap: boolean };
  const breakdownEntries: [string, CompetencyStat][] = Object.entries(latestAttempt?.competencyBreakdown || {});
  const criticalGaps = breakdownEntries.filter(([_, stats]) => stats.isGap);
  const proficientAreas = breakdownEntries.filter(([_, stats]) => !stats.isGap);

  return (
    <div id="competency-gap-analysis-container" className="space-y-6 animate-in fade-in duration-200">
      {/* Overview Banner */}
      <div className="p-6 rounded-xl bg-white border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-semibold text-indigo-600 mb-1">
              Diagnostic Assessment Scorecard
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Competency Evaluation & Gap Diagnostics
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Assessment: <strong className="text-slate-900">{latestAttempt.assessmentTitle}</strong> • Official:{' '}
              <strong className="text-slate-900">{latestAttempt.officialName}</strong> ({latestAttempt.officialRole})
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-center min-w-[120px]">
              <span className="text-[11px] font-semibold text-slate-500 block uppercase">
                Overall Mark
              </span>
              <span className="text-2xl font-bold text-slate-900">
                {latestAttempt.scorePercentage.toFixed(1)}%
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                {latestAttempt.correctAnswersCount}/{latestAttempt.totalQuestions} Correct
              </span>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-center min-w-[120px]">
              <span className="text-[11px] font-semibold text-slate-500 block uppercase">
                Gaps Flagged
              </span>
              <span className={`text-2xl font-bold ${
                criticalGaps.length > 0 ? 'text-amber-600' : 'text-emerald-600'
              }`}>
                {criticalGaps.length}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                {criticalGaps.length > 0 ? 'Action Needed' : 'Benchmark Met'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Gap Alert Callout (If Gaps Detected) */}
      {criticalGaps.length > 0 && (
        <div className="p-5 rounded-xl bg-amber-50 border border-amber-200 space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-amber-950">
                Action Required: {criticalGaps.length} Competency Gap Identified Below 70% Benchmark
              </h3>
              <p className="text-xs text-amber-900/90 leading-relaxed">
                As per MoSPI training directives, performance below the 70% threshold triggers automated capacity-building pathways on <strong>iGOT Karmayogi</strong>.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {criticalGaps.map(([compName, stat]) => {
              const matchedCourse = courses.find((c) => c.mappedCompetency === compName);

              return (
                <div
                  key={compName}
                  className="p-4 rounded-xl bg-white border border-amber-200 shadow-2xs flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{compName}</span>
                      <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                        {stat.percentage}% (Score: {stat.correct}/{stat.total})
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Deficit identified in methodological calculations or rules.
                    </p>
                  </div>

                  {matchedCourse && (
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div className="text-[10px] text-indigo-700 font-semibold truncate max-w-[200px]">
                        Course: {matchedCourse.title}
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigateToCourses(compName)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                      >
                        <span>Enroll on iGOT</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Detailed Competency Breakdown Grid */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              FRAC Competency Diagnostic Breakdown
            </h2>
            <p className="text-xs text-slate-500">
              Evaluated against MoSPI official civil services benchmarks
            </p>
          </div>
          <button
            type="button"
            onClick={onRetakeAssessment}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-Take Assessment</span>
          </button>
        </div>

        <div className="space-y-5">
          {breakdownEntries.map(([compName, stats]) => {
            const isGap = stats.isGap;

            return (
              <div
                key={compName}
                id={`gap-card-${compName.replace(/\s+/g, '-').toLowerCase()}`}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-900">{compName}</span>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span>Tested: {stats.total} questions</span>
                      <span>•</span>
                      <span>Correct: {stats.correct}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        isGap
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      }`}
                    >
                      {isGap ? 'Gap Identified (<70%)' : 'Proficient (Passed)'}
                    </span>
                    <span className="font-mono font-bold text-sm text-slate-900">
                      {stats.percentage}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar with Benchmark Marker */}
                <div className="relative pt-1">
                  <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isGap ? 'bg-amber-500' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${Math.max(5, stats.percentage)}%` }}
                    />
                  </div>
                  {/* 70% threshold pin */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-slate-700/60"
                    style={{ left: '70%' }}
                    title="70% Passing Benchmark"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                  <span>0%</span>
                  <span className="text-slate-700 font-semibold">Benchmark: 70%</span>
                  <span>100%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Suggested Next Steps / iGOT Action Bar */}
      <div className="p-6 rounded-2xl bg-indigo-900 text-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-sky-400" />
            <span>Ready to Address Identified Skill Gaps?</span>
          </h3>
          <p className="text-xs text-indigo-200 max-w-xl">
            Access curated iGOT Karmayogi modules aligned directly with the National Statistical Systems Training Academy (NSSTA) guidelines.
          </p>
        </div>

        <button
          id="btn-goto-igot-pathways"
          type="button"
          onClick={() => onNavigateToCourses()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-xs transition-colors shrink-0 shadow-xs cursor-pointer"
        >
          <span>View iGOT Karmayogi Pathways</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
