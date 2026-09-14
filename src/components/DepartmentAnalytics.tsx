import React from 'react';
import { DepartmentMetric } from '../types';
import {
  BarChart3,
  Users,
  Award,
  AlertTriangle,
  TrendingUp,
  Building2,
  CheckCircle2,
  FileSpreadsheet,
} from 'lucide-react';

interface DepartmentAnalyticsProps {
  metrics: DepartmentMetric[];
}

export const DepartmentAnalytics: React.FC<DepartmentAnalyticsProps> = ({ metrics }) => {
  const totalOfficials = metrics.reduce((acc, m) => acc + m.totalOfficials, 0);
  const totalAssessed = metrics.reduce((acc, m) => acc + m.assessedCount, 0);
  const totalCriticalGaps = metrics.reduce((acc, m) => acc + m.criticalGapsCount, 0);
  const overallAvg = (
    metrics.reduce((acc, m) => acc + m.averageScore, 0) / metrics.length
  ).toFixed(1);

  return (
    <div id="department-analytics-container" className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Step 06 • Centralized Monitoring & Analytics</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              MoSPI Division-Wise Competency Readiness Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Real-time monitoring of statistical capabilities, assessment throughput, and competency gaps across all major directorates and regional field offices.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Live Cadre Sync
            </span>
          </div>
        </div>
      </div>

      {/* Aggregate KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total MoSPI Officers
            </span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-slate-900 block mt-2">
            {totalOfficials.toLocaleString()}
          </span>
          <span className="text-xs text-slate-500 block mt-1">
            Across 5 statistical divisions
          </span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Evaluated on PrepLens
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-slate-900 block mt-2">
            {totalAssessed.toLocaleString()}
          </span>
          <span className="text-xs text-emerald-600 font-semibold block mt-1">
            {Math.round((totalAssessed / totalOfficials) * 100)}% Coverage
          </span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Average Score
            </span>
            <TrendingUp className="w-4 h-4 text-sky-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-slate-900 block mt-2">
            {overallAvg}%
          </span>
          <span className="text-xs text-slate-500 block mt-1">
            Passing benchmark: 70%
          </span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Identified Skill Gaps
            </span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-amber-600 block mt-2">
            {totalCriticalGaps}
          </span>
          <span className="text-xs text-slate-500 block mt-1">
            Officers routed to iGOT modules
          </span>
        </div>
      </div>

      {/* Division Table & Comparative Breakdown */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Division Competency Metrics & Primary Gap Mapping
            </h2>
            <p className="text-xs text-slate-500">
              Sorted by operational cadre coverage and readiness index
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Division Name</th>
                <th className="py-3 px-4">Total Officers</th>
                <th className="py-3 px-4">Assessed</th>
                <th className="py-3 px-4">Avg Score</th>
                <th className="py-3 px-4">Readiness Rate</th>
                <th className="py-3 px-4">Primary Gap Competency</th>
                <th className="py-3 px-4 text-right">Gaps Flagged</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {metrics.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{m.departmentName}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono">{m.totalOfficials}</td>
                  <td className="py-3.5 px-4 font-mono">{m.assessedCount}</td>
                  <td className="py-3.5 px-4 font-bold font-mono text-slate-900">
                    {m.averageScore}%
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full"
                          style={{ width: `${m.readinessRate}%` }}
                        />
                      </div>
                      <span className="font-semibold text-[11px]">{m.readinessRate}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 font-medium">
                      {m.primaryGapCompetency}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-amber-600">
                    {m.criticalGapsCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
