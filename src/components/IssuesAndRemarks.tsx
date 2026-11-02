import React from 'react';
import {
  AlertTriangle,
  Wrench,
  User,
  CheckSquare,
  MessageSquare,
  Volume2,
  Plus,
  ArrowLeft,
  Send,
  Sparkles,
  CheckCircle2,
  Mic,
  ShieldAlert
} from 'lucide-react';
import { IssueReport, Language, LocationOption } from '../types';
import { speakText } from '../utils/speechUtils';
import { VoiceTranscribeButton } from './VoiceTranscribeButton';

interface IssuesAndRemarksProps {
  report: IssueReport;
  selectedLocation?: LocationOption | null;
  onChange: (report: IssueReport) => void;
  language: Language;
  speechSpeed: number;
  onBackToChecklist: () => void;
  onSubmitShift: () => void;
}

const COMMON_ISSUES = [
  { en: 'Stained linen replaced', hi: 'गंदी चादर बदली गई' },
  { en: 'Bathroom drain cleared', hi: 'बाथरूम की नाली साफ की गई' },
  { en: 'Air Conditioner filter dusted', hi: 'एयर कंडीशनर (AC) फिल्टर साफ किया गया' },
  { en: 'Light bulb replaced', hi: 'बल्ब बदला गया' },
  { en: 'Extra toilet roll added', hi: 'अतिरिक्त टॉयलेट रोल रखा गया' },
  { en: 'All clean & inspected', hi: 'सब साफ और व्यवस्थित' },
];

export const IssuesAndRemarks: React.FC<IssuesAndRemarksProps> = ({
  report,
  selectedLocation,
  onChange,
  language,
  speechSpeed,
  onBackToChecklist,
  onSubmitShift,
}) => {
  const isHindi = language === 'hi-IN';

  const handleSpeak = (text: string, id: string) => {
    speakText(text, language, id, speechSpeed);
  };

  const handleQuickChipClick = (issueText: string) => {
    const newText = report.issuesIdentified
      ? `${report.issuesIdentified}, ${issueText}`
      : issueText;
    onChange({ ...report, issuesIdentified: newText });
    handleSpeak(
      isHindi ? `जोड़ा गया: ${issueText}` : `Added: ${issueText}`,
      'quick-chip-added'
    );
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-stone-200 space-y-5 animate-fadeIn">
      {/* Top Header Card: Back to Area Checklist Button & Step Pill */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-stone-100">
        <button
          type="button"
          id="btn-back-to-checklist"
          onClick={onBackToChecklist}
          className="px-4 py-2.5 rounded-2xl bg-stone-900 hover:bg-black text-white font-black text-xs sm:text-sm flex items-center gap-2 transition active:scale-95 shadow-md"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400 stroke-[2.5]" />
          <span>{isHindi ? '⬅ चेकलिस्ट पर वापस जाएं (Back to Form)' : '⬅ Back to Area Checklist'}</span>
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-black text-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>{isHindi ? 'चरण 3: अंतिम रिपोर्ट' : 'Step 3: Final Report'}</span>
        </div>
      </div>

      {/* Section 10 Title & Audio Guidance */}
      <div className="flex items-start justify-between gap-3 pt-1">
        <div className="space-y-1">
          {selectedLocation && (
            <span className="inline-block text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg">
              ✓ {isHindi ? selectedLocation.nameHi : selectedLocation.nameEn} (चेकलिस्ट पूर्ण)
            </span>
          )}
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 font-black text-sm flex items-center justify-center shadow-sm">
              10
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 leading-tight">
              {isHindi
                ? '10. सफाई के मुद्दे और सुधारात्मक कार्रवाइयां'
                : '10. Cleanliness Issues & Corrective Actions'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            {isHindi
              ? 'पहचाने गए मुद्दे, की गई कार्रवाई, स्थिति और अंतिम टिप्पणियां दर्ज करें या बोलकर ट्रांसक्राइब करें।'
              : 'Log identified issues, corrective actions taken, assignee, and final notes by typing or Hindi voice dictation.'}
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            handleSpeak(
              isHindi
                ? 'खंड 10: सफाई के मुद्दे और सुधारात्मक कार्रवाइयां। यदि कोई समस्या पाई गई है, तो माइक दबाकर बोलें या लिखें, फिर पूरी शिफ्ट सबमिट करें।'
                : 'Section 10: Cleanliness Issues and Corrective Actions. Please enter any maintenance or issues found, then submit shift.',
              'section-10-intro'
            )
          }
          className="w-11 h-11 rounded-2xl bg-amber-50 hover:bg-amber-100 text-stone-800 border border-amber-200 flex items-center justify-center shrink-0 transition-all shadow-sm"
          title="Listen guidance"
        >
          <Volume2 className="w-5 h-5 text-amber-700" />
        </button>
      </div>

      {/* Voice Transcribe Banner Guide */}
      <div className="p-3.5 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent rounded-2xl border border-amber-300 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-stone-900 font-bold">
          <div className="w-7 h-7 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-black">
            <Mic className="w-4 h-4" />
          </div>
          <span>
            {isHindi
              ? '💡 हर फ़ील्ड में माइक (🎙️) दबाकर हिंदी में बोलें — यह अपने आप लिख जाएगा!'
              : '💡 Tap the microphone (🎙️) icon on any field to dictate in Hindi!'}
          </span>
        </div>
      </div>

      {/* Quick Tap Chips */}
      <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200 space-y-2">
        <label className="block text-xs font-black uppercase tracking-wider text-stone-600">
          {isHindi ? 'त्वरित विकल्प (टैप करके सीधे जोड़ें):' : 'Quick Options (Tap to auto-fill):'}
        </label>
        <div className="flex flex-wrap gap-2">
          {COMMON_ISSUES.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleQuickChipClick(isHindi ? item.hi : item.en)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold bg-white hover:bg-amber-100 text-stone-800 hover:text-amber-950 border border-stone-200 shadow-sm transition active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 text-amber-600 stroke-[3]" />
              <span>{isHindi ? item.hi : item.en}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 1. Issues Identified */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <label className="block text-xs font-extrabold text-stone-700 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>
              {isHindi
                ? 'पहचाने गए सफाई के मुद्दे (Issues Identified)'
                : 'Cleanliness Issues Identified'}
            </span>
          </label>
          <VoiceTranscribeButton
            fieldName={isHindi ? 'सफाई के मुद्दे' : 'Issues Identified'}
            currentValue={report.issuesIdentified}
            language={language}
            onTranscript={(transcribedText, mode) => {
              const updated =
                mode === 'append' && report.issuesIdentified
                  ? `${report.issuesIdentified}, ${transcribedText}`
                  : transcribedText;
              onChange({ ...report, issuesIdentified: updated });
            }}
          />
        </div>
        <div className="relative">
          <input
            type="text"
            value={report.issuesIdentified}
            onChange={(e) => onChange({ ...report, issuesIdentified: e.target.value })}
            placeholder={isHindi ? 'उदा. तकिया बदला गया, नल में लीकेज (या माइक दबाकर बोलें)...' : 'e.g. Broken mirror, stained bedsheet changed...'}
            className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 font-medium"
          />
        </div>
      </div>

      {/* 2. Corrective Action Taken */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <label className="block text-xs font-extrabold text-stone-700 flex items-center gap-1.5">
            <Wrench className="w-4 h-4 text-stone-600" />
            <span>
              {isHindi
                ? 'की गई सुधारात्मक कार्रवाई (Corrective Action Taken)'
                : 'Corrective Action Taken'}
            </span>
          </label>
          <VoiceTranscribeButton
            fieldName={isHindi ? 'सुधारात्मक कार्रवाई' : 'Action Taken'}
            currentValue={report.correctiveAction}
            language={language}
            onTranscript={(transcribedText, mode) => {
              const updated =
                mode === 'append' && report.correctiveAction
                  ? `${report.correctiveAction}, ${transcribedText}`
                  : transcribedText;
              onChange({ ...report, correctiveAction: updated });
            }}
          />
        </div>
        <input
          type="text"
          value={report.correctiveAction}
          onChange={(e) => onChange({ ...report, correctiveAction: e.target.value })}
          placeholder={isHindi ? 'उदा. तुरंत साफ किया गया और नया सामान रखा गया...' : 'e.g. Cleaned with disinfectant and replaced...'}
          className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 font-medium"
        />
      </div>

      {/* 3. Action Taken By */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <label className="block text-xs font-extrabold text-stone-700 flex items-center gap-1.5">
            <User className="w-4 h-4 text-stone-600" />
            <span>
              {isHindi
                ? 'किसके द्वारा कार्रवाई की गई? (Action Taken By?)'
                : 'Action Taken By?'}
            </span>
          </label>
          <VoiceTranscribeButton
            fieldName={isHindi ? 'स्टाफ का नाम' : 'Staff Name'}
            currentValue={report.actionTakenBy}
            language={language}
            size="sm"
            onTranscript={(transcribedText, mode) => {
              const updated =
                mode === 'append' && report.actionTakenBy
                  ? `${report.actionTakenBy}, ${transcribedText}`
                  : transcribedText;
              onChange({ ...report, actionTakenBy: updated });
            }}
          />
        </div>
        <input
          type="text"
          value={report.actionTakenBy}
          onChange={(e) => onChange({ ...report, actionTakenBy: e.target.value })}
          placeholder={isHindi ? 'उदा. जसवीर, राजेश्वरी, शोएब...' : 'e.g. Jasvir, Rajeshwari, Shouaib...'}
          className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 font-medium"
        />
      </div>

      {/* 4. Status Selection */}
      <div>
        <label className="block text-xs font-extrabold text-stone-700 mb-1.5 flex items-center gap-1.5">
          <CheckSquare className="w-4 h-4 text-stone-600" />
          {isHindi ? 'स्थिति (Status)' : 'Status'}
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              { key: 'Completed', labelEn: 'Completed', labelHi: 'पूर्ण' },
              { key: 'Pending', labelEn: 'Pending', labelHi: 'लंबित' },
              { key: 'Follow-up Required', labelEn: 'Follow-up Required', labelHi: 'फॉलो-अप चाहिए' },
            ] as const
          ).map((st) => {
            const isSelected = report.status === st.key;
            return (
              <button
                key={st.key}
                type="button"
                onClick={() => {
                  onChange({ ...report, status: st.key });
                  handleSpeak(isHindi ? st.labelHi : st.labelEn, `status-${st.key}`);
                }}
                className={`py-3.5 px-2 rounded-2xl border-2 text-xs sm:text-sm font-black transition-all text-center ${
                  isSelected
                    ? st.key === 'Completed'
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-300'
                      : st.key === 'Pending'
                      ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-md ring-2 ring-amber-300'
                      : 'bg-rose-600 text-white border-rose-700 shadow-md ring-2 ring-rose-300'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {isHindi ? st.labelHi : st.labelEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Final Remarks / Notes */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <label className="block text-xs font-extrabold text-stone-700 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-stone-600" />
            <span>
              {isHindi
                ? 'अंतिम टिप्पणी / नोट्स (Final Remarks / Notes)'
                : 'Final Remarks / Notes'}
            </span>
          </label>
          <VoiceTranscribeButton
            fieldName={isHindi ? 'अंतिम टिप्पणी' : 'Final Remarks'}
            currentValue={report.finalRemarks}
            language={language}
            onTranscript={(transcribedText, mode) => {
              const updated =
                mode === 'append' && report.finalRemarks
                  ? `${report.finalRemarks}\n${transcribedText}`
                  : transcribedText;
              onChange({ ...report, finalRemarks: updated });
            }}
          />
        </div>
        <textarea
          rows={3}
          value={report.finalRemarks}
          onChange={(e) => onChange({ ...report, finalRemarks: e.target.value })}
          placeholder={isHindi ? 'अतिरिक्त नोट्स या सुझाव (बोलकर ट्रांसक्राइब करें या लिखें)...' : 'Any final notes or observations for supervisor (dictate or type)...'}
          className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-4 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 resize-none font-medium"
        />
      </div>

      {/* Bottom Actions: Back to Checklist & Submit Shift */}
      <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToChecklist}
          className="w-full sm:w-auto px-5 py-4 rounded-2xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-black text-sm flex items-center justify-center gap-2 transition active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isHindi ? 'चेकलिस्ट पर लौटें' : 'Back to Checklist'}</span>
        </button>

        <button
          type="button"
          id="btn-submit-shift"
          onClick={onSubmitShift}
          className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition active:scale-95 ring-2 ring-emerald-400"
        >
          <Send className="w-5 h-5 stroke-[2.5]" />
          <span>{isHindi ? '🚀 पूरी शिफ्ट सबमिट करें (Submit Shift)' : '🚀 Submit Shift'}</span>
        </button>
      </div>
    </div>
  );
};

