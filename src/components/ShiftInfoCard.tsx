import React from 'react';
import { Calendar, Sun, Moon, UserCheck, MapPin, Volume2, ArrowLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { ShiftInfo, Language } from '../types';
import { ALL_ROOM_AREAS, ALL_STAFF_MEMBERS } from '../data/allSectionsData';
import { speakText } from '../utils/speechUtils';

interface ShiftInfoCardProps {
  shiftInfo: ShiftInfo;
  onChange: (info: ShiftInfo) => void;
  language: Language;
  speechSpeed: number;
  onBackToMenu: () => void;
  onNextCategory?: () => void;
}

export const ShiftInfoCard: React.FC<ShiftInfoCardProps> = ({
  shiftInfo,
  onChange,
  language,
  speechSpeed,
  onBackToMenu,
  onNextCategory,
}) => {
  const isHindi = language === 'hi-IN';

  const handleSpeak = (text: string, id: string) => {
    speakText(text, language, id, speechSpeed);
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-stone-200 space-y-4 animate-fadeIn">
      {/* Top Header Card with Prominent "⬅ Back to Menu" Button */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-stone-100">
        <button
          type="button"
          id="btn-back-to-menu-shift"
          onClick={onBackToMenu}
          className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white font-black text-xs sm:text-sm flex items-center gap-2 transition active:scale-95 shadow-md"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400 stroke-[2.5]" />
          <span>{isHindi ? '⬅ मुख्य मेनू पर वापस जाएं (Back to Menu)' : '⬅ Back to Menu'}</span>
        </button>

        {onNextCategory && (
          <button
            type="button"
            onClick={onNextCategory}
            className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs flex items-center gap-1 transition ml-auto"
          >
            <span>{isHindi ? 'अगला खंड (Room)' : 'Next (Room)'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Section Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-amber-500 text-stone-950 font-black text-xs flex items-center justify-center shadow-sm">
              1
            </span>
            <h2 className="text-lg sm:text-xl font-black text-stone-900 leading-tight">
              {isHindi
                ? '1. कमरे / क्षेत्र की जानकारी'
                : '1. Room / Area Information'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 font-medium">
            {isHindi
              ? 'तारीख, कमरे का नाम / मंज़िल, शिफ्ट का समय और जांचकर्ता चुनें।'
              : 'Select date, room/floor, shift timing, and staff name.'}
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            handleSpeak(
              isHindi
                ? 'खंड 1: कमरे और क्षेत्र की जानकारी। तारीख, कमरा नंबर, शिफ्ट का समय और अपना नाम चुनें।'
                : 'Section 1: Room and area information. Select date, room number, shift timing, and staff name.',
              'section-1-audio'
            )
          }
          className="w-11 h-11 rounded-xl bg-stone-50 hover:bg-amber-100 text-stone-800 border border-stone-200 flex items-center justify-center shrink-0 transition-all"
          title="Listen section guidance"
        >
          <Volume2 className="w-5 h-5 text-amber-700" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        {/* Date Field */}
        <div>
          <label className="block text-xs font-extrabold text-stone-700 mb-1 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-stone-600" />
            {isHindi ? 'तारीख (Date - Day, month, year)' : 'Date (Day, month, year)'}
          </label>
          <input
            id="shift-date-input"
            type="date"
            value={shiftInfo.date}
            onChange={(e) => onChange({ ...shiftInfo, date: e.target.value })}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-3 text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
          />
        </div>

        {/* Room / Area Selector */}
        <div>
          <label className="block text-xs font-extrabold text-stone-700 mb-1 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-amber-600" />
            {isHindi ? 'कमरे का नाम / मंज़िल (Room Name / Floor)' : 'Room Name / Floor'}
          </label>
          <div className="relative">
            <select
              id="room-area-select"
              value={shiftInfo.roomArea}
              onChange={(e) => onChange({ ...shiftInfo, roomArea: e.target.value })}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-3 text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 appearance-none"
            >
              {ALL_ROOM_AREAS.map((area) => (
                <option key={area.id} value={area.id}>
                  {isHindi ? `${area.nameHi} (${area.name})` : `${area.name} - ${area.nameHi}`}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-stone-500 font-bold">
              ▼
            </div>
          </div>
        </div>
      </div>

      {/* Shift Timing */}
      <div>
        <label className="block text-xs font-extrabold text-stone-700 mb-1.5 flex items-center gap-1.5">
          <Sun className="w-4 h-4 text-amber-600" />
          {isHindi ? 'शिफ्ट का समय (Shift Timing)' : 'Shift Timing'}
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => {
              onChange({ ...shiftInfo, shiftTiming: 'Morning' });
              handleSpeak(isHindi ? 'सुबह की शिफ्ट चुनी गई' : 'Morning shift selected', 'shift-morning');
            }}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border-2 text-sm font-black transition-all ${
              shiftInfo.shiftTiming === 'Morning'
                ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-sm ring-2 ring-amber-300'
                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-900" />
            <span>{isHindi ? 'सुबह (Morning)' : 'Morning (सुबह)'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onChange({ ...shiftInfo, shiftTiming: 'Evening' });
              handleSpeak(isHindi ? 'शाम की शिफ्ट चुनी गई' : 'Evening shift selected', 'shift-evening');
            }}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border-2 text-sm font-black transition-all ${
              shiftInfo.shiftTiming === 'Evening'
                ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm ring-2 ring-indigo-300'
                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <Moon className="w-4 h-4 text-amber-300" />
            <span>{isHindi ? 'शाम (Evening)' : 'Evening (शाम)'}</span>
          </button>
        </div>
      </div>

      {/* Staff Member (Checked By) */}
      <div>
        <label className="block text-xs font-extrabold text-stone-700 mb-1.5 flex items-center gap-1.5">
          <UserCheck className="w-4 h-4 text-stone-600" />
          {isHindi ? 'जांचकर्ता (Checked By)' : 'Checked By (Staff Name)'}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {ALL_STAFF_MEMBERS.map((staff) => {
            const isSelected = shiftInfo.checkedBy === staff.name;
            return (
              <button
                key={staff.id}
                type="button"
                onClick={() => {
                  onChange({ ...shiftInfo, checkedBy: staff.name });
                  handleSpeak(
                    isHindi ? `स्टाफ: ${staff.nameHi}` : `Staff member: ${staff.name}`,
                    `staff-${staff.id}`
                  );
                }}
                className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl border-2 text-xs sm:text-sm font-extrabold transition-all text-left ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm ring-2 ring-emerald-300'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span className="text-xl">{staff.avatar}</span>
                <div className="truncate">
                  <div className="truncate text-sm">{staff.name}</div>
                  <div className="text-[11px] opacity-80 font-medium">{staff.nameHi}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Save & Return to Menu */}
      <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToMenu}
          className="w-full py-3.5 px-4 rounded-xl bg-stone-900 hover:bg-black text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400" />
          <span>{isHindi ? 'विवरण सुरक्षित करें और मेनू पर जाएं' : 'Save Details & Return to Menu'}</span>
        </button>
      </div>
    </div>
  );
};
