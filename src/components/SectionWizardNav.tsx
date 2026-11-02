import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Volume2,
  Sparkles,
  Send
} from 'lucide-react';
import { SectionDef, Language } from '../types';

interface SectionWizardNavProps {
  sections: SectionDef[];
  currentSectionIndex: number;
  onSelectSection: (index: number) => void;
  onNextSection: () => void;
  onPrevSection: () => void;
  onSubmitShift: () => void;
  isSectionComplete: (sectionIndex: number) => boolean;
  hasErrors: boolean;
  language: Language;
}

export const SectionWizardNav: React.FC<SectionWizardNavProps> = ({
  sections,
  currentSectionIndex,
  onSelectSection,
  onNextSection,
  onPrevSection,
  onSubmitShift,
  isSectionComplete,
  hasErrors,
  language,
}) => {
  const isHindi = language === 'hi-IN';
  const currentSection = sections[currentSectionIndex];
  const isFirstSection = currentSectionIndex === 0;
  const isLastSection = currentSectionIndex === sections.length - 1;

  // Calculate total progress across all 10 sections
  const completedSectionsCount = sections.filter((_, idx) => isSectionComplete(idx)).length;
  const progressPercent = Math.round((completedSectionsCount / sections.length) * 100);

  return (
    <div className="space-y-3">
      {/* Top Visual Progress Indicator */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-900 font-extrabold text-xs">
              {isHindi
                ? `खंड ${currentSectionIndex + 1} / ${sections.length}`
                : `Category ${currentSectionIndex + 1} of ${sections.length}`}
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-stone-900 line-clamp-1">
              {isHindi ? currentSection.titleHi : currentSection.titleEn}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-600 bg-stone-100 px-2.5 py-1 rounded-lg">
              {completedSectionsCount}/{sections.length} {isHindi ? 'पूर्ण' : 'Done'} ({progressPercent}%)
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden p-0.5 border border-stone-200">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${Math.max(5, progressPercent)}%` }}
          />
        </div>

        {/* Category Step Pills (1 to 10) */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 pt-1">
          {sections.map((sec, idx) => {
            const isCurrent = idx === currentSectionIndex;
            const isDone = isSectionComplete(idx);

            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => onSelectSection(idx)}
                className={`py-1.5 px-1 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center gap-0.5 border ${
                  isCurrent
                    ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-md ring-2 ring-amber-300'
                    : isDone
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300 hover:bg-emerald-200'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
                title={isHindi ? sec.titleHi : sec.titleEn}
              >
                <div className="flex items-center gap-0.5">
                  <span>{idx + 1}</span>
                  {isDone && <CheckCircle2 className="w-2.5 h-2.5 text-emerald-700" />}
                </div>
                <span className="text-[9px] uppercase tracking-tighter truncate max-w-full hidden sm:inline opacity-80">
                  {idx === 0 ? 'Info' : idx === 9 ? 'Issues' : `Sec ${idx + 1}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
