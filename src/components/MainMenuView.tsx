import React from 'react';
import {
  Building2,
  Calendar,
  Bed,
  Layers,
  Utensils,
  Store,
  Sparkles,
  Footprints,
  Bath,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ChevronRight,
  Send,
  Volume2,
  Code,
  CheckCheck
} from 'lucide-react';
import { SectionDef, ShiftInfo, IssueReport, Language } from '../types';
import { speakText, playAlertTone } from '../utils/speechUtils';

interface MainMenuViewProps {
  sections: SectionDef[];
  shiftInfo: ShiftInfo;
  report: IssueReport;
  language: Language;
  speechSpeed: number;
  invalidSectionIds: number[];
  onSelectCategory: (sectionId: number) => void;
  onSubmitShift: () => void;
  onOpenExportModal: () => void;
  onMarkAllDoneGlobal: () => void;
}

// Visual icons map for the 10 categories
const CATEGORY_ICONS: Record<number, React.ReactNode> = {
  1: <Calendar className="w-5 h-5 text-amber-700" />,
  2: <Bed className="w-5 h-5 text-blue-600" />,
  3: <Layers className="w-5 h-5 text-indigo-600" />,
  4: <Footprints className="w-5 h-5 text-emerald-600" />,
  5: <Utensils className="w-5 h-5 text-orange-600" />,
  6: <Store className="w-5 h-5 text-purple-600" />,
  7: <Sparkles className="w-5 h-5 text-teal-600" />,
  8: <Building2 className="w-5 h-5 text-cyan-600" />,
  9: <Bath className="w-5 h-5 text-sky-600" />,
  10: <AlertTriangle className="w-5 h-5 text-rose-600" />,
};

export const MainMenuView: React.FC<MainMenuViewProps> = ({
  sections,
  shiftInfo,
  report,
  language,
  speechSpeed,
  invalidSectionIds,
  onSelectCategory,
  onSubmitShift,
  onOpenExportModal,
  onMarkAllDoneGlobal,
}) => {
  const isHindi = language === 'hi-IN';

  // Helper to compute category completion status
  const getCategoryStatus = (sec: SectionDef) => {
    const isInvalid = invalidSectionIds.includes(sec.id);

    if (sec.type === 'meta') {
      const isComplete = Boolean(shiftInfo.date && shiftInfo.roomArea && shiftInfo.checkedBy);
      return {
        isComplete,
        inProgress: false,
        total: 1,
        completed: isComplete ? 1 : 0,
        isInvalid,
      };
    }

    if (sec.type === 'checklist') {
      const tasks = sec.tasks || [];
      const total = tasks.length;
      const completed = tasks.filter((t) => t.completed).length;
      const isComplete = total > 0 && completed === total;
      const inProgress = completed > 0 && completed < total;
      return {
        isComplete,
        inProgress,
        total,
        completed,
        isInvalid,
      };
    }

    if (sec.type === 'issues') {
      const isComplete = Boolean(report.status);
      const inProgress = Boolean(report.issuesIdentified || report.correctiveAction);
      return {
        isComplete,
        inProgress: inProgress && !isComplete,
        total: 1,
        completed: isComplete ? 1 : 0,
        isInvalid,
      };
    }

    return { isComplete: false, inProgress: false, total: 0, completed: 0, isInvalid };
  };

  // Speak dashboard instructions
  const handleReadDashboardIntro = () => {
    const text = isHindi
      ? 'मुख्य मेनू: सफाई का कमरा या खंड चुनें। सभी खंडों को पूरा करने के बाद नीचे सबमिट बटन दबाएं।'
      : 'Main Menu: Select a room or category to inspect. Complete all sections and tap Submit Shift at the bottom.';
    speakText(text, language, 'dashboard-intro', speechSpeed);
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Top Banner with Instructions and Shift Details preview */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 mb-1">
              {isHindi ? 'हाउसकीपिंग डैशबोर्ड' : 'Housekeeping Dashboard'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 leading-tight">
              {isHindi ? 'कमरा / क्षेत्र चुनें' : 'Select Room or Category'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-medium mt-0.5">
              {isHindi
                ? 'चेकलिस्ट खोलने के लिए नीचे दिए गए किसी भी कार्ड पर टैप करें।'
                : 'Tap any room or category below to open and update its checklist.'}
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              id="dashboard-audio-btn"
              onClick={handleReadDashboardIntro}
              className="w-11 h-11 rounded-xl bg-stone-100 hover:bg-amber-100 text-stone-800 border border-stone-200 flex items-center justify-center transition shadow-sm"
              title={isHindi ? 'डैशबोर्ड निर्देश सुनें' : 'Listen menu instructions'}
            >
              <Volume2 className="w-5 h-5 text-amber-700" />
            </button>
          </div>
        </div>

        {/* Current Shift Summary Pill Strip */}
        <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-2 font-bold text-stone-700">
            <span className="px-2.5 py-1 bg-stone-100 rounded-lg flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-stone-500" />
              {shiftInfo.date || 'Today'}
            </span>
            <span className="px-2.5 py-1 bg-stone-100 rounded-lg">
              Room: {shiftInfo.roomArea}
            </span>
            <span className="px-2.5 py-1 bg-stone-100 rounded-lg">
              Shift: {shiftInfo.shiftTiming}
            </span>
            <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg">
              Staff: {shiftInfo.checkedBy}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onSelectCategory(1)}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 underline ml-auto"
          >
            {isHindi ? 'शिफ्ट विवरण बदलें ✎' : 'Edit Shift Info ✎'}
          </button>
        </div>
      </div>

      {/* Validation Error Alert Box if any sections failed submission */}
      {invalidSectionIds.length > 0 && (
        <div
          id="dashboard-validation-alert"
          className="p-4 sm:p-5 rounded-2xl bg-red-600 text-white shadow-lg flex items-center justify-between gap-3 animate-shake border-2 border-red-700"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-7 h-7 text-amber-300 shrink-0 animate-pulse" />
            <div>
              <h4 className="font-extrabold text-sm sm:text-base">
                {isHindi
                  ? 'कृपया सबमिट करने से पहले लाल रंग वाले सभी खंड पूरे करें!'
                  : 'Please complete the red sections before submitting!'}
              </h4>
              <p className="text-xs text-red-100 mt-0.5">
                {isHindi
                  ? `${invalidSectionIds.length} खंडों में अधूरे कार्य बाकी हैं। उन पर टैप करें और पूरा करें।`
                  : `${invalidSectionIds.length} categories have incomplete tasks. Tap them below to complete.`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              playAlertTone();
              speakText(
                isHindi
                  ? 'कृपया सबमिट करने से पहले लाल रंग वाले सभी खंड पूरे करें।'
                  : 'Please complete the red sections before submitting.',
                language,
                'red-section-alert',
                speechSpeed
              );
            }}
            className="w-10 h-10 rounded-xl bg-red-700 hover:bg-red-800 text-white flex items-center justify-center shrink-0"
            title="Listen alert"
          >
            <Volume2 className="w-5 h-5 text-amber-300" />
          </button>
        </div>
      )}

      {/* 10 Category Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {sections.map((sec) => {
          const status = getCategoryStatus(sec);
          const icon = CATEGORY_ICONS[sec.id] || <Sparkles className="w-5 h-5" />;

          // Menu Status Indicators (Visual UI):
          // - Incomplete validation error: Bright RED background + red border + shake
          // - 100% complete: Green background (emerald)
          // - In progress: Yellow/Orange border + subtle amber tint
          // - Not started: Neutral white background with subtle border
          let cardStyle =
            'bg-white border-stone-200 text-stone-900 hover:border-stone-400 hover:shadow-md';
          let badgeStyle = 'bg-stone-100 text-stone-700';
          let statusText = isHindi ? 'शुरू नहीं हुआ' : 'Not Started';

          if (status.isInvalid && !status.isComplete) {
            cardStyle =
              'bg-red-50 border-2 border-red-500 text-red-950 shadow-md ring-2 ring-red-400/50 animate-shake';
            badgeStyle = 'bg-red-600 text-white font-bold animate-pulse';
            statusText = isHindi ? 'अधूरा (Incomplete!)' : 'Incomplete!';
          } else if (status.isComplete) {
            cardStyle =
              'bg-emerald-50/90 border-2 border-emerald-500 text-emerald-950 shadow-sm hover:border-emerald-600';
            badgeStyle = 'bg-emerald-600 text-white font-bold';
            statusText = isHindi ? 'पूर्ण (100% Done)' : '100% Complete ✓';
          } else if (status.inProgress) {
            cardStyle =
              'bg-amber-50/60 border-2 border-amber-500 text-stone-900 shadow-sm hover:border-amber-600';
            badgeStyle = 'bg-amber-500 text-stone-950 font-black';
            statusText = isHindi ? 'प्रगति पर है (In Progress)' : 'In Progress';
          }

          const percent =
            status.total > 0 ? Math.round((status.completed / status.total) * 100) : 0;

          return (
            <button
              key={sec.id}
              id={`menu-category-btn-${sec.id}`}
              type="button"
              onClick={() => onSelectCategory(sec.id)}
              className={`text-left rounded-2xl p-4 sm:p-5 border transition-all duration-200 cursor-pointer select-none relative flex flex-col justify-between group active:scale-[0.99] ${cardStyle}`}
            >
              <div>
                {/* Header Row: Category Badge & Status */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-sm ${
                        status.isComplete
                          ? 'bg-emerald-600 text-white'
                          : status.isInvalid
                          ? 'bg-red-600 text-white'
                          : 'bg-amber-500 text-stone-950'
                      }`}
                    >
                      {sec.id}
                    </span>
                    <div className="p-1.5 rounded-lg bg-stone-100/80 shrink-0">{icon}</div>
                  </div>

                  <span className={`text-[11px] px-2.5 py-1 rounded-lg ${badgeStyle}`}>
                    {statusText}
                  </span>
                </div>

                {/* Titles */}
                <h3 className="text-base font-extrabold text-stone-900 group-hover:text-amber-700 transition line-clamp-1">
                  {isHindi ? sec.titleHi : sec.titleEn}
                </h3>
                <p className="text-xs text-stone-500 font-medium line-clamp-1 mt-0.5">
                  {isHindi ? sec.titleEn : sec.titleHi}
                </p>
              </div>

              {/* Bottom Progress Row */}
              <div className="mt-4 pt-2.5 border-t border-stone-200/60 flex items-center justify-between gap-2 text-xs">
                {sec.type === 'checklist' ? (
                  <div className="flex items-center gap-2 font-bold">
                    <span
                      className={
                        status.isComplete
                          ? 'text-emerald-700'
                          : status.isInvalid
                          ? 'text-red-700'
                          : 'text-stone-600'
                      }
                    >
                      {status.completed}/{status.total} {isHindi ? 'कार्य पूर्ण' : 'tasks'}
                    </span>
                    <span className="text-[11px] text-stone-400">({percent}%)</span>
                  </div>
                ) : sec.type === 'meta' ? (
                  <span className="font-bold text-stone-600">
                    {shiftInfo.roomArea} • {shiftInfo.shiftTiming}
                  </span>
                ) : (
                  <span className="font-bold text-stone-600">
                    Status: {report.status || 'Pending'}
                  </span>
                )}

                <div className="flex items-center gap-1 font-bold text-amber-700 group-hover:translate-x-0.5 transition">
                  <span className="text-xs">{isHindi ? 'खोलें' : 'Open'}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* Progress bar inside card for in-progress checklists */}
              {sec.type === 'checklist' && percent > 0 && percent < 100 && (
                <div className="w-full bg-stone-200 h-1 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Global Quick Action Strip & Standalone Single-File Export */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-stone-200/80 rounded-2xl border border-stone-300 text-xs">
        <button
          type="button"
          onClick={onMarkAllDoneGlobal}
          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black flex items-center gap-1.5 transition shadow-sm"
        >
          <CheckCheck className="w-4 h-4" />
          <span>{isHindi ? 'सभी 10 खंड पूरे करें (Mark All Done)' : 'Mark All Categories Done'}</span>
        </button>

        <button
          type="button"
          onClick={onOpenExportModal}
          className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-black text-amber-300 font-black flex items-center gap-1.5 transition shadow-sm ml-auto"
        >
          <Code className="w-4 h-4 text-amber-400" />
          <span>{isHindi ? 'HTML कोड (सिंगल फ़ाइल)' : 'Export Standalone HTML'}</span>
        </button>
      </div>

      {/* Prominent Large "Submit Shift" Button at the very bottom of the Main Menu */}
      <div className="pt-2 pb-6">
        <button
          type="button"
          id="btn-submit-shift-main"
          onClick={onSubmitShift}
          className={`w-full py-4 sm:py-5 px-6 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-xl transition active:scale-[0.99] ${
            invalidSectionIds.length > 0
              ? 'bg-red-600 hover:bg-red-700 text-white ring-4 ring-red-400/40 animate-shake'
              : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-stone-950 ring-4 ring-emerald-400/30'
          }`}
        >
          <Send className="w-6 h-6 stroke-[2.5]" />
          <span>
            {isHindi
              ? 'पूरी शिफ्ट सबमिट करें (Submit Housekeeping Shift)'
              : 'Submit Housekeeping Shift'}
          </span>
        </button>
        <p className="text-center text-xs text-stone-500 font-medium mt-2">
          {isHindi
            ? 'सबमिट करने से पहले सभी 10 श्रेणियों की जांच पूरी होनी चाहिए।'
            : 'All 10 categories must be completed before final shift submission.'}
        </p>
      </div>
    </div>
  );
};
