import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Send,
  Volume2,
  AlertCircle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Language } from '../types';

interface StickyBottomBarProps {
  currentSectionIndex: number;
  totalSections: number;
  currentSectionRemaining: number;
  currentSectionTotal: number;
  hasErrors: boolean;
  language: Language;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onReadUnfinished: () => void;
}

export const StickyBottomBar: React.FC<StickyBottomBarProps> = ({
  currentSectionIndex,
  totalSections,
  currentSectionRemaining,
  currentSectionTotal,
  hasErrors,
  language,
  onPrev,
  onNext,
  onSubmit,
  onReadUnfinished,
}) => {
  const isHindi = language === 'hi-IN';
  const isFirst = currentSectionIndex === 0;
  const isLast = currentSectionIndex === totalSections - 1;

  return (
    <footer
      id="wizard-bottom-bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-stone-900/95 backdrop-blur-md border-t border-stone-800 text-white shadow-2xl py-3 px-4"
    >
      <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Previous Button */}
        <button
          type="button"
          id="btn-prev-category"
          onClick={onPrev}
          disabled={isFirst}
          className={`px-4 py-3.5 rounded-2xl font-black text-sm sm:text-base flex items-center gap-2 transition active:scale-95 ${
            isFirst
              ? 'opacity-30 cursor-not-allowed bg-stone-800 text-stone-500'
              : 'bg-stone-800 hover:bg-stone-700 text-white border border-stone-700 shadow-md'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>{isHindi ? 'पिछला खंड' : 'Previous Category'}</span>
        </button>

        {/* Audio Helper for this section */}
        {currentSectionRemaining > 0 && currentSectionTotal > 0 && (
          <button
            type="button"
            onClick={onReadUnfinished}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-500/30 transition"
            title="Read remaining tasks aloud"
          >
            <Volume2 className="w-4 h-4 text-amber-400" />
            <span>
              {currentSectionRemaining} {isHindi ? 'बाकी सुनें' : 'remaining'}
            </span>
          </button>
        )}

        {/* Next / Submit Button */}
        {isLast ? (
          <button
            type="button"
            id="btn-submit-shift"
            onClick={onSubmit}
            className={`px-6 py-3.5 rounded-2xl font-black text-sm sm:text-base flex items-center gap-2.5 shadow-lg active:scale-95 transition ${
              hasErrors
                ? 'bg-red-600 hover:bg-red-700 text-white ring-4 ring-red-400/40 animate-shake'
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-stone-950 font-black ring-4 ring-emerald-400/30'
            }`}
          >
            <Send className="w-5 h-5" />
            <span>{isHindi ? 'पूरी शिफ्ट सबमिट करें (Submit Shift)' : 'Submit Shift'}</span>
          </button>
        ) : (
          <button
            type="button"
            id="btn-next-category"
            onClick={onNext}
            className={`px-6 py-3.5 rounded-2xl font-black text-sm sm:text-base flex items-center gap-2 shadow-lg active:scale-95 transition ${
              hasErrors
                ? 'bg-red-600 hover:bg-red-700 text-white ring-4 ring-red-400/40 animate-shake'
                : 'bg-amber-500 hover:bg-amber-400 text-stone-950 ring-4 ring-amber-300/30'
            }`}
          >
            <span>{isHindi ? 'अगला खंड' : 'Next Category'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </footer>
  );
};
