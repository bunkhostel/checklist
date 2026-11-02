import React from 'react';
import { CheckCircle2, Award, Calendar, MapPin, User, Clock, RotateCcw, Share2, Printer, X, Sparkles } from 'lucide-react';
import { ShiftInfo, IssueReport, Language, LocationOption, SectionDef } from '../types';

interface ShiftSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
  shiftInfo: ShiftInfo;
  selectedLocation?: LocationOption | null;
  completedSection?: SectionDef | null;
  report: IssueReport;
  language: Language;
}

export const ShiftSuccessModal: React.FC<ShiftSuccessModalProps> = ({
  isOpen,
  onClose,
  onReset,
  shiftInfo,
  selectedLocation,
  completedSection,
  report,
  language,
}) => {
  if (!isOpen) return null;

  const isHindi = language === 'hi-IN';
  const tasksCount = completedSection?.tasks?.length || 0;
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-100 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Success Header with Badge */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner ring-8 ring-emerald-50">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900">
            {isHindi ? 'शिफ्ट सफलतापूर्वक सबमिट हुई! 🎉' : 'Shift Submitted Successfully! 🎉'}
          </h2>
          <p className="text-sm text-stone-600 font-medium">
            {isHindi
              ? 'बंक हॉस्टल हाउसकीपिंग रिकॉर्ड और ऑडिट लॉग दर्ज कर लिया गया है।'
              : 'Bunk Hostel housekeeping record and audit log have been stored.'}
          </p>
        </div>

        {/* Shift Details Summary Card */}
        <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3 text-sm">
          {shiftInfo.propertyName && (
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <span className="text-stone-500 font-medium flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                {isHindi ? 'संपत्ति:' : 'Property:'}
              </span>
              <span className="font-extrabold text-stone-900">
                {shiftInfo.propertyName}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <span className="text-stone-500 font-medium flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-600" />
              {isHindi ? 'सत्यापित क्षेत्र:' : 'Verified Area:'}
            </span>
            <span className="font-extrabold text-stone-900">
              {selectedLocation
                ? isHindi
                  ? selectedLocation.nameHi
                  : selectedLocation.nameEn
                : shiftInfo.roomArea}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <span className="text-stone-500 font-medium flex items-center gap-1.5">
              <User className="w-4 h-4 text-emerald-600" />
              {isHindi ? 'स्टाफ सदस्य:' : 'Staff Inspector:'}
            </span>
            <span className="font-extrabold text-stone-900">{shiftInfo.checkedBy}</span>
          </div>

          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <span className="text-stone-500 font-medium flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-indigo-600" />
              {isHindi ? 'तारीख व शिफ्ट:' : 'Date & Shift:'}
            </span>
            <span className="font-extrabold text-stone-900">
              {shiftInfo.date} ({shiftInfo.shiftTiming})
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <span className="text-stone-500 font-medium flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-stone-500" />
              {isHindi ? 'समय:' : 'Time Logged:'}
            </span>
            <span className="font-extrabold text-stone-900">{currentTime}</span>
          </div>

          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <span className="text-stone-500 font-medium flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              {isHindi ? 'सत्यापित कार्य:' : 'Verified Tasks:'}
            </span>
            <span className="font-black text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-lg text-xs">
              {tasksCount}/{tasksCount} (100% {isHindi ? 'पूर्ण' : 'Completed'})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-stone-500 font-medium flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              {isHindi ? 'रिपोर्ट स्थिति:' : 'Report Status:'}
            </span>
            <span
              className={`px-2 py-0.5 rounded-md text-xs font-black ${
                report.status === 'Completed'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-900'
              }`}
            >
              {report.status}
            </span>
          </div>

          {report.issuesIdentified && (
            <div className="pt-2 border-t border-stone-200 text-xs text-stone-700">
              <span className="font-bold text-stone-900 block mb-0.5">
                {isHindi ? 'मुद्दे / की गई कार्रवाई:' : 'Issues / Actions Logged:'}
              </span>
              <p className="bg-white p-2.5 rounded-xl border border-stone-200">
                {report.issuesIdentified} {report.correctiveAction ? `• ${report.correctiveAction}` : ''}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={onReset}
            className="w-full py-4 px-4 rounded-2xl bg-stone-900 hover:bg-black text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg transition active:scale-98"
          >
            <RotateCcw className="w-4 h-4 text-amber-400" />
            <span>{isHindi ? 'अगला क्षेत्र / नया फॉर्म शुरू करें' : 'Start Next Area / New Shift'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition"
          >
            {isHindi ? 'समीक्षा बंद करें' : 'Close Summary'}
          </button>
        </div>
      </div>
    </div>
  );
};
