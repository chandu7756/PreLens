import React, { useState } from 'react';
import { MCQQuestion } from '../types';
import {
  CheckCircle2,
  XCircle,
  Edit3,
  Check,
  Search,
  Filter,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  Layers,
} from 'lucide-react';

interface AdminReviewQueueProps {
  questions: MCQQuestion[];
  onUpdateQuestion: (updated: MCQQuestion) => void;
  onApproveAllPending: () => void;
}

export const AdminReviewQueue: React.FC<AdminReviewQueueProps> = ({
  questions,
  onUpdateQuestion,
  onApproveAllPending,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending_review' | 'approved' | 'rejected'>('pending_review');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);

  // Edit form state
  const [editQuestionText, setEditQuestionText] = useState<string>('');
  const [editOptions, setEditOptions] = useState<string[]>([]);
  const [editCorrectIndex, setEditCorrectIndex] = useState<number>(0);
  const [editExplanation, setEditExplanation] = useState<string>('');

  const filteredQuestions = questions.filter((q) => {
    if (filterStatus !== 'all' && q.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const matchQ = q.question.toLowerCase().includes(searchQuery.toLowerCase());
      const matchComp = q.competency.toLowerCase().includes(searchQuery.toLowerCase());
      return matchQ || matchComp;
    }
    return true;
  });

  const pendingCount = questions.filter((q) => q.status === 'pending_review').length;

  const startEditing = (q: MCQQuestion) => {
    setEditingQuestionId(q.id);
    setEditQuestionText(q.question);
    setEditOptions([...q.options]);
    setEditCorrectIndex(q.correctIndex);
    setEditExplanation(q.explanation);
  };

  const saveEdit = (q: MCQQuestion) => {
    onUpdateQuestion({
      ...q,
      question: editQuestionText,
      options: editOptions,
      correctIndex: editCorrectIndex,
      explanation: editExplanation,
    });
    setEditingQuestionId(null);
  };

  const handleApprove = (q: MCQQuestion) => {
    onUpdateQuestion({
      ...q,
      status: 'approved',
      reviewedBy: 'MoSPI Training Administrator',
    });
  };

  const handleReject = (q: MCQQuestion) => {
    onUpdateQuestion({
      ...q,
      status: 'rejected',
      reviewedBy: 'MoSPI Training Administrator',
    });
  };

  return (
    <div id="admin-review-container" className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 rounded-xl bg-white border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-indigo-600 mb-1">
              Quality Assurance & Verification
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              MCQ Verification Queue
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Inspect generated questions to ensure statistical precision, adjust wording, and authorize items for official candidate assessments.
            </p>
          </div>

          {pendingCount > 0 && (
            <button
              id="btn-approve-all-pending"
              type="button"
              onClick={onApproveAllPending}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve All Pending ({pendingCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200">
        {/* Status Pills */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <button
            id="filter-status-pending"
            type="button"
            onClick={() => setFilterStatus('pending_review')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              filterStatus === 'pending_review'
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Pending Review ({pendingCount})
          </button>
          <button
            id="filter-status-approved"
            type="button"
            onClick={() => setFilterStatus('approved')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              filterStatus === 'approved'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Approved ({questions.filter((q) => q.status === 'approved').length})
          </button>
          <button
            id="filter-status-rejected"
            type="button"
            onClick={() => setFilterStatus('rejected')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              filterStatus === 'rejected'
                ? 'bg-rose-100 text-rose-900 border border-rose-300'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Rejected ({questions.filter((q) => q.status === 'rejected').length})
          </button>
          <button
            id="filter-status-all"
            type="button"
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              filterStatus === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            All Questions ({questions.length})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="search-questions-input"
            type="text"
            placeholder="Search questions or competency..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-600 bg-white"
          />
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 text-slate-500 space-y-2">
            <HelpCircle className="w-8 h-8 mx-auto text-slate-400" />
            <p className="text-sm font-semibold text-slate-700">No questions found in this view</p>
            <p className="text-xs text-slate-500">
              Generate new MCQs in the Upload Engine or change filter settings.
            </p>
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const isEditing = editingQuestionId === q.id;

            return (
              <div
                key={q.id}
                id={`review-question-card-${q.id}`}
                className={`p-6 rounded-2xl bg-white border transition-all ${
                  q.status === 'pending_review'
                    ? 'border-amber-300 ring-1 ring-amber-200 shadow-xs'
                    : q.status === 'approved'
                    ? 'border-slate-200 shadow-2xs'
                    : 'border-rose-200 bg-rose-50/30'
                }`}
              >
                {/* Top Question Badges */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono">
                      Q#{idx + 1}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {q.competency}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {q.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {q.status === 'pending_review' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                        <AlertTriangle className="w-3 h-3" />
                        Pending Human Review
                      </span>
                    )}
                    {q.status === 'approved' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-3 h-3" />
                        Approved for Official Tests
                      </span>
                    )}
                    {q.status === 'rejected' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
                        <XCircle className="w-3 h-3" />
                        Rejected
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Area */}
                {isEditing ? (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Edit Question Statement:
                      </label>
                      <textarea
                        rows={3}
                        value={editQuestionText}
                        onChange={(e) => setEditQuestionText(e.target.value)}
                        className="w-full p-2.5 text-xs rounded-lg border border-slate-300 font-medium focus:outline-none focus:border-indigo-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 block">
                        Edit Options (Select radio to designate correct answer):
                      </label>
                      {editOptions.map((opt, oIdx) => (
                        <div key={oIdx} className="flex items-center gap-3">
                          <input
                            type="radio"
                            name={`correct-${q.id}`}
                            checked={editCorrectIndex === oIdx}
                            onChange={() => setEditCorrectIndex(oIdx)}
                            className="text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) => {
                              const updated = [...editOptions];
                              updated[oIdx] = e.target.value;
                              setEditOptions(updated);
                            }}
                            className="flex-1 p-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-indigo-600"
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Edit Statistical Explanation / Reference:
                      </label>
                      <textarea
                        rows={2}
                        value={editExplanation}
                        onChange={(e) => setEditExplanation(e.target.value)}
                        className="w-full p-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-indigo-600"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingQuestionId(null)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => saveEdit(q)}
                        className="px-4 py-1.5 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
                      >
                        Save Modifications
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {q.question}
                    </h3>

                    {/* Options list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-xl text-xs flex items-start gap-2 border ${
                            oIdx === q.correctIndex
                              ? 'bg-emerald-50/80 border-emerald-300 font-semibold text-emerald-950'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                              oIdx === q.correctIndex
                                ? 'bg-emerald-600 text-white font-bold'
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="leading-snug">{opt}</span>
                        </div>
                      ))}
                    </div>

                    {/* Explanation */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Official Explanation:
                      </span>
                      <p className="leading-relaxed text-slate-600">{q.explanation}</p>
                      {q.reviewedBy && (
                        <p className="text-[11px] text-slate-400 pt-1">
                          Verified by: {q.reviewedBy}
                        </p>
                      )}
                    </div>

                    {/* Action Controls */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                      <div className="text-[11px] text-slate-500">
                        Target Cadre: <strong className="text-slate-700">{q.fracRole}</strong>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => startEditing(q)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        {q.status !== 'rejected' && (
                          <button
                            type="button"
                            onClick={() => handleReject(q)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        )}

                        {q.status !== 'approved' && (
                          <button
                            type="button"
                            onClick={() => handleApprove(q)}
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approve & Authorize</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
