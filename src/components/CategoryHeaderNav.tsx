import React from 'react';
import { ArrowLeft, Volume2, CheckCircle2, ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';
import { SectionDef, Language } from '../types';
import { speakText } from '../utils/speechUtils';

interface CategoryHeaderNavProps {
  section: SectionDef;
  totalSections: number;
  completedTasks: number;
  totalTasks: number;
  isComplete: boolean;
  language: Language;
  speechSpeed: number;
  onBackToMenu: () => void;
  onPrevCategory?: () => void;
  onNextCategory?: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const CategoryHeaderNav: React.FC<CategoryHeaderNavProps> = ({
  section,
  totalSections,
  completedTasks,
  totalTasks,
  isComplete,
  language,
  speechSpeed,
  onBackToMenu,
  onPrevCategory,
  onNextCategory,
  hasPrev,
  hasNext,
}) => {
  const isHindi = language === 'hi-IN';

  const handleReadCategoryIntro = () => {
    const title = isHindi ? section.titleHi : section.titleEn;
    const desc = isHindi ? section.descriptionHi : section.descriptionEn;
    const statusText = isHindi
      ? `खंड ${section.id}: ${title}। कुल ${totalTasks} कार्य हैं, जिनमें से ${completedTasks} पूरे हो चुके हैं।`
      : `Category ${section.id}: ${title}. ${completedTasks} of ${totalTasks} tasks completed.`;
    speakText(statusText, language, `category-nav-audio-${section.id}`, speechSpeed);
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm space-y-3">
      {/* Prominent Back to Menu Button Row */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <button
          type="button"
          id="btn-back-to-menu"
          onClick={onBackToMenu}
          className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white font-black text-sm sm:text-base flex items-center gap-2 transition active:scale-95 shadow-md ring-2 ring-stone-900/20"
        >
          <ArrowLeft className="w-5 h-5 text-amber-400 stroke-[2.5]" />
          <span>{isHindi ? '⬅ मुख्य मेनू पर वापस जाएं (Back to Menu)' : '⬅ Back to Menu'}</span>
        </button>

        {/* Quick Prev / Next Shortcuts */}
        <div className="flex items-center gap-1.5 ml-auto">
          {hasPrev && onPrevCategory && (
            <button
              type="button"
              onClick={onPrevCategory}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs flex items-center gap-1 transition"
              title={isHindi ? 'पिछला खंड' : 'Previous Category'}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{isHindi ? 'पिछला' : 'Prev'}</span>
            </button>
          )}

          {hasNext && onNextCategory && (
            <button
              type="button"
              onClick={onNextCategory}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs flex items-center gap-1 transition"
              title={isHindi ? 'अगला खंड' : 'Next Category'}
            >
              <span className="hidden sm:inline">{isHindi ? 'अगला' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Title & Status Row */}
      <div className="pt-2 border-t border-stone-100 flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-amber-500 text-stone-950 font-black text-xs flex items-center justify-center shadow-sm">
              {section.id}
            </span>
            <span className="text-xs font-extrabold uppercase tracking-wider text-stone-500">
              {isHindi ? `खंड ${section.id} / ${totalSections}` : `Category ${section.id} of ${totalSections}`}
            </span>
            {isComplete && (
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-600 text-white">
                <CheckCircle2 className="w-3 h-3" />
                {isHindi ? 'पूर्ण (100%)' : '100% Done'}
              </span>
            )}
          </div>
          <h2 className="text-lg sm:text-xl font-black text-stone-900 leading-tight">
            {isHindi ? section.titleHi : section.titleEn}
          </h2>
          <p className="text-xs text-stone-500 font-medium">
            {isHindi ? section.descriptionHi : section.descriptionEn}
          </p>
        </div>

        <button
          type="button"
          onClick={handleReadCategoryIntro}
          className="w-11 h-11 rounded-xl bg-stone-50 hover:bg-amber-100 text-stone-800 border border-stone-200 flex items-center justify-center shrink-0 transition"
          title={isHindi ? 'विवरण सुनें' : 'Listen category audio'}
        >
          <Volume2 className="w-5 h-5 text-amber-700" />
        </button>
      </div>
    </div>
  );
};
