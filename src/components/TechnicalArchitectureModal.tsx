import React, { useState } from 'react';
import {
  X,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Scale,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Sparkles,
  Building,
} from 'lucide-react';

interface TechnicalArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechnicalArchitectureModal: React.FC<TechnicalArchitectureModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  if (!isOpen) return null;

  const slides = [
    {
      title: 'PrepLens: Executive Summary & Problem Formulation',
      subtitle: 'Smart India Hackathon 2026 • Problem Statement ID: SIH26101',
      badge: 'Overview & Problem Context',
      content: (
        <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">
                Problem Statement ID
              </span>
              <span className="text-base font-bold text-indigo-700 font-mono">SIH26101</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">
                Theme
              </span>
              <span className="text-base font-bold text-slate-900">Smart Education</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block">
                Category / Ministry
              </span>
              <span className="text-base font-bold text-slate-900">Software • MoSPI</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900">The Problem in MoSPI Civil Services:</h4>
            <p className="text-slate-600">
              The Ministry of Statistics and Programme Implementation (MoSPI) conducts critical national surveys (NSS, CPI, PLFS, ASI, NAS). However, capacity building for thousands of field investigators, statistical officers, and directors currently faces severe bottlenecks:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Manual question authoring is slow and inconsistent with newly updated statistical circulars.</li>
              <li>Training lacks precise diagnostic competency mapping to pinpoint individual methodological deficits.</li>
              <li>No automated link exists between identified skill gaps and course offerings on the <strong>iGOT Karmayogi</strong> digital learning portal.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-950 space-y-2">
            <h4 className="text-sm font-bold flex items-center gap-1.5 text-indigo-900">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              PrepLens Solution Overview:
            </h4>
            <p className="text-xs text-indigo-900/90 leading-relaxed">
              An AI-driven competency mapping and automated assessment engine that parses official MoSPI manuals, generates verified FRAC-aligned multiple choice questions, conducts real-time diagnostic gap detection, and automatically maps officials to custom iGOT Karmayogi course pathways.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Technical Approach & 6-Step System Architecture',
      subtitle: 'Visual Workflow of the End-to-End Competency Engine',
      badge: 'System Flow & Tech Stack',
      content: (
        <div className="space-y-5 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                01. Ingestion
              </span>
              <h5 className="font-bold text-slate-900 text-xs mt-2">Content Ingestion & OCR</h5>
              <p className="text-[11px] text-slate-500 mt-1">
                Admins upload official MoSPI manuals (PDF/Text). Text extraction segments methodology, sampling, and formulas.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                02. AI Generation
              </span>
              <h5 className="font-bold text-slate-900 text-xs mt-2">Gemini LLM Pipeline</h5>
              <p className="text-[11px] text-slate-500 mt-1">
                Generates 4-option MCQs with explanations, difficulty metrics, and FRAC competency tags.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                03. Human QA
              </span>
              <h5 className="font-bold text-slate-900 text-xs mt-2">Human-in-the-Loop Review</h5>
              <p className="text-[11px] text-slate-500 mt-1">
                MoSPI training directors inspect and authorize generated questions to guarantee 0% hallucination rate.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                04. Testing
              </span>
              <h5 className="font-bold text-slate-900 text-xs mt-2">Role-Based Timed Exams</h5>
              <p className="text-[11px] text-slate-500 mt-1">
                Officials take timed assessments on desktop or mobile CAPI devices, testing operational skills.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                05. Diagnostic
              </span>
              <h5 className="font-bold text-slate-900 text-xs mt-2">Competency Gap Engine</h5>
              <p className="text-[11px] text-slate-500 mt-1">
                Evaluates scores per competency. Performance &lt;70% benchmark triggers automated gap flags.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                06. Remediation
              </span>
              <h5 className="font-bold text-slate-900 text-xs mt-2">iGOT Course Routing</h5>
              <p className="text-[11px] text-slate-500 mt-1">
                Auto-assigns NSSTA/iGOT modules to resolve gaps, verified by follow-up re-examinations.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">
              Core Tech Stack Specifications:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              <div className="p-2 rounded bg-slate-800">Frontend: React + Tailwind</div>
              <div className="p-2 rounded bg-slate-800">Server: Node/Express</div>
              <div className="p-2 rounded bg-slate-800">AI Engine: Gemini LLM</div>
              <div className="p-2 rounded bg-slate-800">Framework: FRAC / iGOT</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Feasibility Analysis: Technical, Operational & Legal',
      subtitle: 'Robust Implementation Proof for Mission Karmayogi',
      badge: 'Feasibility & Readiness',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
              <h4 className="font-bold text-emerald-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Technical Feasibility
              </h4>
              <ul className="text-xs space-y-1.5 text-emerald-900/90 list-disc pl-4">
                <li>Proven LLM zero-shot and few-shot reasoning for statistical domains.</li>
                <li>Fast JSON structured output ensures machine-readable question schema.</li>
                <li>Modular API architecture easily integrates into iGOT Karmayogi API endpoints.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 space-y-2">
              <h4 className="font-bold text-sky-950 flex items-center gap-1.5">
                <Building className="w-4 h-4 text-sky-600" />
                Operational Feasibility
              </h4>
              <ul className="text-xs space-y-1.5 text-sky-900/90 list-disc pl-4">
                <li>Zero change resistance: uses existing MoSPI circulars as ground truth.</li>
                <li>Low training overhead for MoSPI Training Directors via clean web UI.</li>
                <li>Supports offline CAPI sync for field workers in remote rural circles.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-2">
              <h4 className="font-bold text-purple-950 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-purple-600" />
                Legal & Ethical Alignment
              </h4>
              <ul className="text-xs space-y-1.5 text-purple-900/90 list-disc pl-4">
                <li>Strict alignment with Mission Karmayogi civil services competency guidelines.</li>
                <li>No sensitive personal citizen data used; strictly pedagogical content.</li>
                <li>Human-in-the-loop ensures complete compliance with official gazette rules.</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Impact, Civil Services Benefits & Risk Mitigation',
      subtitle: 'Quantifiable Outcomes for MoSPI & Mission Karmayogi',
      badge: 'Impact & Risk Management',
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Benefits to MoSPI & Civil Servants:
              </h4>
              <ul className="text-xs space-y-1 text-slate-600 list-disc pl-4">
                <li><strong>85% Reduction in Assessment Authoring Time</strong>: Manual question writing replaced by instant AI drafting.</li>
                <li><strong>Zero Subjectivity</strong>: Quantitative benchmark scorecards aligned with FRAC levels.</li>
                <li><strong>Hyper-Targeted Learning</strong>: Officers only take courses for their verified gaps instead of generic long lectures.</li>
                <li><strong>Higher National Data Integrity</strong>: Fewer survey enumeration errors in NSS, CPI, and NAS releases.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
              <h4 className="font-bold text-amber-950 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                Risks & Concrete Mitigation Strategies:
              </h4>
              <ul className="text-xs space-y-1 text-amber-900/90 list-disc pl-4">
                <li><strong>Risk: AI Hallucinations in formulas</strong> → <em>Mitigation:</em> Strict Grounding in official text + Human Review approval gate before publishing.</li>
                <li><strong>Risk: Low field officer adoption</strong> → <em>Mitigation:</em> Intuitive single-click assessment interface & micro-learning modules.</li>
                <li><strong>Risk: Infrastructure latency</strong> → <em>Mitigation:</em> Offline curriculum fallback cache guarantees zero downtime.</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const currentSlide = slides[activeSlide];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150">
        {/* Top Bar */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between gap-4 border-b border-slate-800">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 block">
              {currentSlide.badge} • Slide {activeSlide + 1} of {slides.length}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
              {currentSlide.title}
            </h2>
            <p className="text-xs text-slate-300">{currentSlide.subtitle}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Body */}
        <div className="p-6 overflow-y-auto flex-1">{currentSlide.content}</div>

        {/* Footer Navigation */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            disabled={activeSlide === 0}
            onClick={() => setActiveSlide((prev) => prev - 1)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 hover:bg-white text-xs font-semibold text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Slide</span>
          </button>

          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  i === activeSlide ? 'bg-indigo-600 w-6' : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          {activeSlide < slides.length - 1 ? (
            <button
              type="button"
              onClick={() => setActiveSlide((prev) => prev + 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <span>Next Slide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <span>Close Slides</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
