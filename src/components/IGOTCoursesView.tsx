import React, { useState } from 'react';
import { IGOTCourse, QuizAttempt } from '../types';
import {
  GraduationCap,
  BookOpen,
  Award,
  CheckCircle,
  ExternalLink,
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

interface IGOTCoursesViewProps {
  courses: IGOTCourse[];
  latestAttempt: QuizAttempt | null;
  onUpdateCourse: (updated: IGOTCourse) => void;
  onRetakeAssessment: () => void;
}

export const IGOTCoursesView: React.FC<IGOTCoursesViewProps> = ({
  courses,
  latestAttempt,
  onUpdateCourse,
  onRetakeAssessment,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterMode, setFilterMode] = useState<'all' | 'recommended' | 'enrolled'>('all');

  // Identify competencies flagged as gap
  const gapCompetencies = latestAttempt
    ? Object.entries(latestAttempt.competencyBreakdown || {})
        .filter(([_, stats]: [string, { isGap: boolean }]) => stats.isGap)
        .map(([name]) => name)
    : [];

  const filteredCourses = courses.filter((course) => {
    const isRecommended = gapCompetencies.includes(course.mappedCompetency);
    if (filterMode === 'recommended' && !isRecommended) return false;
    if (filterMode === 'enrolled' && !course.isEnrolled) return false;

    if (searchQuery.trim()) {
      const matchTitle = course.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchComp = course.mappedCompetency.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCode = course.code.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTitle || matchComp || matchCode;
    }
    return true;
  });

  const handleToggleEnroll = (course: IGOTCourse) => {
    const isEnrolledNow = !course.isEnrolled;
    onUpdateCourse({
      ...course,
      isEnrolled: isEnrolledNow,
      progressPercentage: isEnrolledNow ? 10 : 0,
    });
  };

  const handleAdvanceProgress = (course: IGOTCourse) => {
    const nextProg = Math.min(100, (course.progressPercentage || 0) + 30);
    onUpdateCourse({
      ...course,
      isEnrolled: true,
      progressPercentage: nextProg,
    });
  };

  return (
    <div id="igot-courses-container" className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-700 mb-1">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Step 05 & 06 • iGOT Karmayogi Capacity Building</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Personalized iGOT Karmayogi Training Pathways
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Courseware curated by the National Statistical Systems Training Academy (NSSTA) and Department of Personnel & Training (DoPT), mapped directly to FRAC civil services competencies.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onRetakeAssessment}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Verify Improvement (Re-Test)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200">
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              filterMode === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            All iGOT Modules ({courses.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('recommended')}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              filterMode === 'recommended'
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Gap-Targeted ({courses.filter((c) => gapCompetencies.includes(c.mappedCompetency)).length})</span>
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('enrolled')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              filterMode === 'enrolled'
                ? 'bg-purple-100 text-purple-900 border border-purple-300'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            My Active Enrolments ({courses.filter((c) => c.isEnrolled).length})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search iGOT modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-600 bg-white"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const isGapTargeted = gapCompetencies.includes(course.mappedCompetency);
          const isCompleted = (course.progressPercentage || 0) >= 100;

          return (
            <div
              key={course.id}
              id={`course-card-${course.id}`}
              className={`p-6 rounded-2xl bg-white border flex flex-col justify-between space-y-5 transition-all shadow-2xs ${
                isGapTargeted
                  ? 'border-amber-300 ring-1 ring-amber-200'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {course.code}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                    {course.badge}
                  </span>
                </div>

                {isGapTargeted && (
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    <span>Auto-Recommended for Your Identified Gap</span>
                  </div>
                )}

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {course.description}
                </p>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] space-y-1 text-slate-600">
                  <div>
                    Mapped Competency: <strong className="text-slate-800">{course.mappedCompetency}</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 pt-0.5">
                    <span>Provider: {course.provider}</span>
                    <span>{course.durationHours}</span>
                  </div>
                </div>
              </div>

              {/* Action / Progress Area */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                {course.isEnrolled && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-700">Course Progress</span>
                      <span className="font-mono font-bold text-slate-900">
                        {course.progressPercentage || 0}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full bg-purple-600 rounded-full transition-all duration-300"
                        style={{ width: `${course.progressPercentage || 0}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  {course.isEnrolled ? (
                    isCompleted ? (
                      <div className="w-full py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold text-center flex items-center justify-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Module Completed!</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleAdvanceProgress(course)}
                        className="flex-1 py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors cursor-pointer"
                      >
                        Continue Studying (+30%)
                      </button>
                    )
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleToggleEnroll(course)}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      Enroll via iGOT Karmayogi
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
