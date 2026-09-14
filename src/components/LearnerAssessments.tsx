import React from 'react';
import { Assessment, QuizAttempt, MCQQuestion, UserProfile } from '../types';
import {
  Clock,
  Award,
  CheckCircle2,
  Play,
  History,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

interface LearnerAssessmentsProps {
  assessments: Assessment[];
  attempts: QuizAttempt[];
  questions: MCQQuestion[];
  currentUser?: UserProfile | null;
  onStartQuiz: (assessment: Assessment) => void;
  onViewAttemptReport: (attempt: QuizAttempt) => void;
}

export const LearnerAssessments: React.FC<LearnerAssessmentsProps> = ({
  assessments,
  attempts,
  questions,
  currentUser,
  onStartQuiz,
  onViewAttemptReport,
}) => {
  const officialName = currentUser?.name || 'Statistical Officer (SSO)';
  const officialCadre = currentUser?.employeeCode ? `MoSPI ID: ${currentUser.employeeCode}` : 'MoSPI Cadre: SSO-8421';
  const officialDesignation = currentUser?.designation
    ? `${currentUser.designation} • ${currentUser.division || 'Field Operations Division'}`
    : 'Senior Statistical Officer • Field Operations Division';
  const avatarInitials = currentUser?.avatarInitials || 'SO';

  return (
    <div id="learner-assessments-container" className="space-y-6 animate-in fade-in duration-200">
      {/* Official Candidate Profile Bar */}
      <div className="p-5 rounded-xl bg-white border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-sm">
              {avatarInitials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-slate-900">{officialName}</h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                  {officialCadre}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {officialDesignation}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <div className="text-left md:text-right">
              <span className="text-slate-500 block">Completed</span>
              <span className="font-bold text-slate-900 text-sm">{attempts.length} Assessments</span>
            </div>
            <div className="h-6 w-px bg-slate-200 hidden md:block" />
            <div className="text-left md:text-right">
              <span className="text-slate-500 block">Status</span>
              <span className="font-bold text-amber-600 text-sm">1 Competency Gap</span>
            </div>
          </div>
        </div>
      </div>

      {/* Available Assessments Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Assigned Competency Assessments
          </h2>
          <p className="text-xs text-slate-500">
            Mandatory capability evaluations aligned with official MoSPI statistical responsibilities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {assessments.map((asst) => {
            // Check available approved questions for this assessment
            const availableQuestions = questions.filter(
              (q) => asst.questionIds.includes(q.id) && q.status === 'approved'
            );
            const pastAttempt = attempts.find((att) => att.assessmentId === asst.id);

            return (
              <div
                key={asst.id}
                id={`assessment-card-${asst.id}`}
                className="p-5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 flex flex-col justify-between space-y-4 transition-all"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {asst.division}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {asst.durationMinutes} Mins
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {asst.title}
                  </h3>

                  <p className="text-xs text-slate-500">
                    Role: <span className="text-slate-700 font-medium">{asst.targetCadre}</span>
                  </p>

                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">
                      Competencies Covered:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {asst.competenciesCovered.map((comp, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-600"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Benchmark Passing Mark:</span>
                    <span className="font-semibold text-slate-800">{asst.passPercentage}%</span>
                  </div>

                  {pastAttempt ? (
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600 font-medium">Last Attempt:</span>
                        <span
                          className={`font-bold ${
                            pastAttempt.scorePercentage >= asst.passPercentage
                              ? 'text-emerald-700'
                              : 'text-amber-700'
                          }`}
                        >
                          {pastAttempt.scorePercentage.toFixed(1)}% ({pastAttempt.correctAnswersCount}/{pastAttempt.totalQuestions})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onViewAttemptReport(pastAttempt)}
                          className="flex-1 py-1.5 text-center text-xs font-semibold rounded-md bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 cursor-pointer"
                        >
                          View Scorecard
                        </button>
                        <button
                          type="button"
                          onClick={() => onStartQuiz(asst)}
                          className="flex-1 py-1.5 text-center text-xs font-bold rounded-md bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer"
                        >
                          Re-Take
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      id={`btn-start-${asst.id}`}
                      type="button"
                      onClick={() => onStartQuiz(asst)}
                      className="w-full py-2 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Start Assessment ({availableQuestions.length} Questions)</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Historical Attempts Ledger */}
      {attempts.length > 0 && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <History className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Completed Assessment Record
            </h3>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {attempts.map((att) => (
              <div key={att.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-slate-900">{att.assessmentTitle}</h4>
                  <div className="flex items-center gap-2 text-slate-500 mt-0.5">
                    <span>{att.attemptedAt}</span>
                    <span>•</span>
                    <span>{att.totalQuestions} Questions</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="font-bold text-slate-900 text-sm">
                      {att.scorePercentage.toFixed(1)}%
                    </span>
                    <span className="block text-[11px] text-slate-500">
                      {att.correctAnswersCount} of {att.totalQuestions} correct
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onViewAttemptReport(att)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-semibold cursor-pointer"
                  >
                    <span>Inspect Breakdown</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
