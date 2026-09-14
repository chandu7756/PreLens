import React, { useState, useEffect } from 'react';
import {
  Assessment,
  MCQQuestion,
  QuizAttempt,
  UserProfile,
} from '../types';
import {
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Send,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface InteractiveQuizProps {
  assessment: Assessment;
  questions: MCQQuestion[];
  currentUser?: UserProfile | null;
  onCompleteQuiz: (attempt: QuizAttempt) => void;
  onCancelQuiz: () => void;
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({
  assessment,
  questions,
  currentUser,
  onCompleteQuiz,
  onCancelQuiz,
}) => {
  // Filter only questions belonging to this assessment that are approved
  const activeQuestions = questions.filter(
    (q) => assessment.questionIds.includes(q.id) && q.status === 'approved'
  );

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(
    (assessment.durationMinutes || 10) * 60
  );
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  // Timer countdown
  useEffect(() => {
    if (secondsRemaining <= 0) {
      handleAutoSubmit();
      return;
    }
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining]);

  const currentQ = activeQuestions[currentIndex];
  const answeredCount = Object.keys(selectedAnswers).length;

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const calculateResultsAndSubmit = () => {
    let correctCount = 0;
    const competencyStats: Record<
      string,
      { total: number; correct: number; percentage: number; isGap: boolean }
    > = {};

    activeQuestions.forEach((q) => {
      const selected = selectedAnswers[q.id];
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) correctCount++;

      if (!competencyStats[q.competency]) {
        competencyStats[q.competency] = {
          total: 0,
          correct: 0,
          percentage: 0,
          isGap: false,
        };
      }
      competencyStats[q.competency].total += 1;
      if (isCorrect) {
        competencyStats[q.competency].correct += 1;
      }
    });

    // Compute percentage and gap status (<70% is gap)
    Object.keys(competencyStats).forEach((comp) => {
      const c = competencyStats[comp];
      c.percentage = c.total > 0 ? Math.round((c.correct / c.total) * 100) : 0;
      c.isGap = c.percentage < 70;
    });

    const totalQuestions = activeQuestions.length || 1;
    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

    const newAttempt: QuizAttempt = {
      id: 'att-' + Date.now(),
      assessmentId: assessment.id,
      assessmentTitle: assessment.title,
      officialName: currentUser?.name || 'Statistical Officer (SSO)',
      officialRole: currentUser?.designation || 'Senior Statistical Officer',
      division: currentUser?.division || 'Field Operations Division (FOD)',
      attemptedAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        month: 'short',
        day: 'numeric',
      }),
      answers: selectedAnswers,
      scorePercentage,
      totalQuestions: activeQuestions.length,
      correctAnswersCount: correctCount,
      competencyBreakdown: competencyStats,
    };

    onCompleteQuiz(newAttempt);
  };

  const handleAutoSubmit = () => {
    calculateResultsAndSubmit();
  };

  if (!currentQ || activeQuestions.length === 0) {
    return (
      <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 space-y-4">
        <HelpCircle className="w-10 h-10 mx-auto text-amber-500" />
        <h2 className="text-lg font-bold text-slate-900">
          No Approved Questions Available for this Assessment
        </h2>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Please switch to the Admin Portal and approve generated questions in the Review Queue before starting this test.
        </p>
        <button
          type="button"
          onClick={onCancelQuiz}
          className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold cursor-pointer"
        >
          Return to Assessment Catalog
        </button>
      </div>
    );
  }

  return (
    <div id="interactive-quiz-container" className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Quiz Header with Timer & Progress */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
            Official Timed Assessment
          </span>
          <h2 className="text-base font-bold text-slate-900 line-clamp-1">
            {assessment.title}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {/* Real-time countdown timer */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold ${
              secondsRemaining < 120
                ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <Clock className="w-4 h-4 text-slate-500" />
            <span>Time Left: {formatTimer(secondsRemaining)}</span>
          </div>

          <button
            id="btn-quiz-finish-early"
            type="button"
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs cursor-pointer"
          >
            Submit Exam
          </button>
        </div>
      </div>

      {/* Question Palette Strip */}
      <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5">
          {activeQuestions.map((q, idx) => {
            const isAnswered = selectedAnswers[q.id] !== undefined;
            const isCurrent = idx === currentIndex;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isCurrent
                    ? 'ring-2 ring-indigo-600 bg-indigo-600 text-white shadow-xs'
                    : isAnswered
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        <span className="text-xs text-slate-500 shrink-0 font-medium">
          {answeredCount} of {activeQuestions.length} answered
        </span>
      </div>

      {/* Main Question Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono">
              Question {currentIndex + 1} of {activeQuestions.length}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-100">
              {currentQ.competency}
            </span>
          </div>

          <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
            {currentQ.difficulty}
          </span>
        </div>

        {/* Question Statement */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
          {currentQ.question}
        </h3>

        {/* 4 Multiple Choice Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt, oIdx) => {
            const isSelected = selectedAnswers[currentQ.id] === oIdx;

            return (
              <button
                key={oIdx}
                type="button"
                onClick={() => handleSelectOption(currentQ.id, oIdx)}
                className={`w-full p-4 rounded-xl text-left border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 ring-1 ring-indigo-500/30'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-colors ${
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {String.fromCharCode(65 + oIdx)}
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">
                  {opt}
                </div>
              </button>
            );
          })}
        </div>

        {/* Prev / Next Navigation Controls */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Question</span>
          </button>

          {currentIndex < activeQuestions.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer"
            >
              <span>Next Question</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowSubmitModal(true)}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Review & Finalize Submission</span>
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-5 border border-slate-200 shadow-xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Submit Assessment?
                </h3>
                <p className="text-xs text-slate-500">
                  Instant grading & competency gap analysis will be triggered
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Total Questions:</span>
                <span className="font-bold text-slate-900">{activeQuestions.length}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Questions Answered:</span>
                <span className="font-bold text-emerald-700">{answeredCount}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Questions Skipped:</span>
                <span className="font-bold text-amber-700">
                  {activeQuestions.length - answeredCount}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Continue Quiz
              </button>
              <button
                type="button"
                onClick={calculateResultsAndSubmit}
                className="px-5 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs cursor-pointer"
              >
                Confirm & Grade Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
