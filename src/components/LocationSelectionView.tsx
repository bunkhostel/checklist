import React, { useState } from 'react';
import {
  Bed,
  Layers,
  Store,
  Sparkles,
  Utensils,
  Bath,
  Footprints,
  Volume2,
  Code,
  Calendar,
  User,
  Clock,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Building2,
  DoorOpen,
  Search,
  Check
} from 'lucide-react';
import { LocationOption, Language, ShiftInfo, SectionDef } from '../types';
import { ALL_STAFF_MEMBERS } from '../data/allSectionsData';
import { speakText } from '../utils/speechUtils';

interface LocationSelectionViewProps {
  locations: LocationOption[];
  sections: SectionDef[];
  shiftInfo: ShiftInfo;
  onUpdateShiftInfo: (info: ShiftInfo) => void;
  language: Language;
  speechSpeed: number;
  onSelectLocation: (location: LocationOption) => void;
  onOpenExportModal: () => void;
}

export const LocationSelectionView: React.FC<LocationSelectionViewProps> = ({
  locations,
  sections,
  shiftInfo,
  onUpdateShiftInfo,
  language,
  speechSpeed,
  onSelectLocation,
  onOpenExportModal,
}) => {
  const isHindi = language === 'hi-IN';
  const [selectedFloorTab, setSelectedFloorTab] = useState<'all' | 'floor1' | 'floor2' | 'floor3'>('all');
  const [customRoomInput, setCustomRoomInput] = useState('');
  const [showCustomModal, setShowCustomModal] = useState(false);

  // Specific room list as per Section 1 requirements
  const ROOMS_FLOOR_1 = ['101', '102', '103', '104', '105', '106', '107'];
  const ROOMS_FLOOR_2 = ['201', '202', '203', '204', '205', '206', '207'];
  const ROOMS_FLOOR_3 = ['301', '302', '303', '304', '305', '306', '307'];

  // Helper to trigger room selection -> Routes 107, 207, Dorm Hall to Dorm (Sec 3), and all other rooms to Private Room (Sec 2)
  const handleSelectRoom = (roomName: string) => {
    const cleanNum = roomName.replace(/\D/g, '');
    const isDorm =
      cleanNum === '107' ||
      cleanNum === '207' ||
      roomName.toLowerCase().includes('dorm') ||
      roomName.toLowerCase().includes('डॉर्म');

    const formattedNameEn = roomName.toLowerCase().startsWith('room') || roomName.toLowerCase().includes('dorm')
      ? roomName
      : `Room ${roomName}`;
    const formattedNameHi = roomName.toLowerCase().includes('डॉर्म') || roomName.toLowerCase().includes('dorm')
      ? 'डॉर्म हॉल'
      : `कमरा ${roomName}`;

    onUpdateShiftInfo({
      ...shiftInfo,
      roomArea: formattedNameEn,
    });

    const roomLocation: LocationOption = {
      id: `room_${roomName.toLowerCase().replace(/\s+/g, '_')}`,
      nameEn: formattedNameEn,
      nameHi: formattedNameHi,
      formType: isDorm ? 'dorm' : 'room',
      mappedSectionId: isDorm ? 3 : 2, // CRITICAL: 107, 207, Dorm Hall -> Section 3; All other rooms -> Section 2 (Private Room)
      formNameEn: isDorm ? 'Dorm (Section 3)' : 'Private Room (Section 2)',
      formNameHi: isDorm ? 'डॉर्म (खंड 3)' : 'प्राइवेट रूम (खंड 2)',
      iconName: isDorm ? 'Bed' : 'DoorOpen',
      descriptionEn: isDorm
        ? `Cleanliness check for ${formattedNameEn} (Bunk beds, hallway, shoe rack, under-bed drawers, and bathroom)`
        : `Cleanliness check for ${formattedNameEn} (Bed, linen, bathroom, windows, furniture, general cleaning)`,
      descriptionHi: isDorm
        ? `${formattedNameHi} की सफाई की जांच (बंक बेड, गलियारा, जूतों का रैक, दराज और बाथरूम)`
        : `${formattedNameHi} की सफाई की जांच (बिस्तर, चादर, बाथरूम, खिड़की, फर्नीचर)`,
    };

    onSelectLocation(roomLocation);
  };

  const handleCustomRoomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customRoomInput.trim()) {
      handleSelectRoom(customRoomInput.trim());
      setShowCustomModal(false);
      setCustomRoomInput('');
    }
  };

  const getLocationIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bed':
        return <Bed className="w-6 h-6 text-amber-600" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-blue-600" />;
      case 'Store':
        return <Store className="w-6 h-6 text-emerald-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-purple-600" />;
      case 'Utensils':
        return <Utensils className="w-6 h-6 text-orange-600" />;
      case 'Bath':
        return <Bath className="w-6 h-6 text-cyan-600" />;
      case 'Footprints':
        return <Footprints className="w-6 h-6 text-rose-600" />;
      default:
        return <Building2 className="w-6 h-6 text-stone-600" />;
    }
  };

  const handleSpeak = (text: string, id: string) => {
    speakText(text, language, id, speechSpeed);
  };

  // Dorm form progress stats
  const dormSection = sections.find((s) => s.id === 3);
  const dormTotalTasks = dormSection?.tasks?.length || 0;
  const dormDoneTasks = dormSection?.tasks?.filter((t) => t.completed).length || 0;
  const isDormComplete = dormTotalTasks > 0 && dormDoneTasks === dormTotalTasks;

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Top Banner Card: Shift Meta & Title */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              {isHindi ? 'खंड 1: कमरे / क्षेत्र की जानकारी' : 'Section 1: Room / Area Information'}
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-950 tracking-tight">
              {isHindi ? 'आप किस कमरे या क्षेत्र की सफाई कर रहे हैं?' : 'Which room or area are you cleaning?'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed">
              {isHindi
                ? 'विशिष्ट कमरे (जैसे 107, 207, डॉर्म हॉल) या अन्य क्षेत्र पर टैप करें।'
                : 'Select a specific room number (e.g., Room 107, Room 207, Dorm Hall) or common area.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="btn-listen-screen1-prompt"
              onClick={() =>
                handleSpeak(
                  isHindi
                    ? 'आप किस कमरे या क्षेत्र की सफाई कर रहे हैं? नीचे दिए गए कमरों या सार्वजनिक क्षेत्रों में से अपना स्थान चुनें।'
                    : 'Which room or area are you cleaning? Please select your assigned room or common area below.',
                  'prompt-speech'
                )
              }
              className="w-11 h-11 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 flex items-center justify-center shrink-0 transition active:scale-95 shadow-sm"
              title={isHindi ? 'निर्देश सुनें' : 'Listen Prompt'}
            >
              <Volume2 className="w-5 h-5 text-amber-700" />
            </button>
          </div>
        </div>

        {/* Staff Selector: Quick Tap List for 6 Staff Members */}
        <div className="pt-3 border-t border-stone-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <User className="w-4 h-4 text-amber-600" />
              <span>{isHindi ? 'स्टाफ का नाम चुनें (Checked By):' : 'Select Staff Name (Checked By):'}</span>
            </span>
            <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
              {shiftInfo.checkedBy}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {ALL_STAFF_MEMBERS.map((st) => {
              const isSelected = shiftInfo.checkedBy === st.name;
              return (
                <button
                  key={st.id}
                  type="button"
                  id={`btn-staff-${st.id}`}
                  onClick={() => {
                    onUpdateShiftInfo({ ...shiftInfo, checkedBy: st.name });
                    handleSpeak(
                      isHindi ? `स्टाफ: ${st.nameHi}` : `Staff: ${st.name}`,
                      `staff-select-${st.id}`
                    );
                  }}
                  className={`py-2.5 px-3 rounded-2xl border-2 font-black text-xs flex items-center justify-center gap-2 transition active:scale-95 shadow-xs ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 border-amber-600 ring-2 ring-amber-300 shadow-md scale-102'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                  }`}
                >
                  <span className="text-base">{st.avatar}</span>
                  <span className="truncate">{isHindi ? st.nameHi : st.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3] text-stone-950 ml-auto" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Shift Meta Information (Date & Shift Timing) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-stone-100">
          {/* Date */}
          <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-2xl p-2.5 px-3">
            <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="block text-[10px] uppercase tracking-wider font-extrabold text-stone-400">
                {isHindi ? 'तारीख (Date)' : 'Date'}
              </span>
              <input
                type="date"
                value={shiftInfo.date}
                onChange={(e) => onUpdateShiftInfo({ ...shiftInfo, date: e.target.value })}
                className="w-full bg-transparent text-xs font-bold text-stone-800 focus:outline-none"
              />
            </div>
          </div>

          {/* Shift Timing */}
          <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-2xl p-2.5 px-3">
            <Clock className="w-4 h-4 text-stone-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="block text-[10px] uppercase tracking-wider font-extrabold text-stone-400">
                {isHindi ? 'शिफ्ट का समय' : 'Shift Timing'}
              </span>
              <select
                value={shiftInfo.shiftTiming}
                onChange={(e) =>
                  onUpdateShiftInfo({
                    ...shiftInfo,
                    shiftTiming: e.target.value as 'Morning' | 'Evening',
                  })
                }
                className="w-full bg-transparent text-xs font-bold text-stone-800 focus:outline-none cursor-pointer"
              >
                <option value="Morning">{isHindi ? '☀️ सुबह (Morning Shift)' : '☀️ Morning Shift'}</option>
                <option value="Evening">{isHindi ? '🌙 शाम (Evening Shift)' : '🌙 Evening Shift'}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION A: DETAILED ROOM & DORM SELECTION (Routing 107/207/Dorm to Sec 3, Others to Sec 2) */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 font-bold">
              <Bed className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-stone-900 leading-tight">
                {isHindi ? 'कमरे और डॉर्म (Rooms & Dorms)' : 'Specific Rooms & Dorms'}
              </h2>
              <p className="text-[11px] text-stone-500 font-medium">
                {isHindi
                  ? '107, 207, डॉर्म हॉल ➔ डॉर्म फॉर्म (खंड 3) | अन्य कमरे ➔ प्राइवेट रूम फॉर्म (खंड 2)'
                  : '107, 207, Dorm Hall ➔ Dorm Form (Sec 3) | All other rooms ➔ Private Room (Sec 2)'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
              {isHindi ? '107 / 207: डॉर्म' : '107/207: Dorm'}
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
              {isHindi ? 'अन्य: प्राइवेट रूम' : 'Others: Private'}
            </span>
          </div>
        </div>

        {/* Priority Quick Action Buttons (Room 107, Room 207, Dorm Hall, Other Room) */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400 block px-0.5">
            {isHindi ? '⭐ त्वरित चयन (Quick Rooms)' : '⭐ Quick Room Shortcuts'}
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              type="button"
              id="btn-room-107"
              onClick={() => handleSelectRoom('Room 107')}
              className="p-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-sm flex items-center justify-between gap-2 shadow-md transition active:scale-95 border-2 border-amber-400 group"
            >
              <div className="flex items-center gap-2">
                <DoorOpen className="w-5 h-5 text-stone-950" />
                <span>Room 107</span>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              id="btn-room-207"
              onClick={() => handleSelectRoom('Room 207')}
              className="p-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-sm flex items-center justify-between gap-2 shadow-md transition active:scale-95 border-2 border-amber-400 group"
            >
              <div className="flex items-center gap-2">
                <DoorOpen className="w-5 h-5 text-stone-950" />
                <span>Room 207</span>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              id="btn-room-dorm-hall"
              onClick={() => handleSelectRoom('Dorm Hall')}
              className="p-3.5 rounded-2xl bg-stone-900 hover:bg-black text-white font-black text-sm flex items-center justify-between gap-2 shadow-md transition active:scale-95 border-2 border-stone-800 group"
            >
              <div className="flex items-center gap-2">
                <Bed className="w-5 h-5 text-amber-400" />
                <span>{isHindi ? 'डॉर्म हॉल' : 'Dorm Hall'}</span>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              id="btn-room-other"
              onClick={() => setShowCustomModal(true)}
              className="p-3.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-black text-sm flex items-center justify-between gap-2 shadow-sm transition active:scale-95 border-2 border-stone-300"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-stone-600" />
                <span>{isHindi ? 'अन्य कमरा...' : 'Other Room...'}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </button>
          </div>
        </div>

        {/* Floor-by-Floor Complete Room Number Grid */}
        <div className="pt-2 border-t border-stone-100 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-500">
              {isHindi ? 'मंज़िल के अनुसार सभी कमरे (101-307)' : 'All Rooms by Floor (101-307)'}
            </span>
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setSelectedFloorTab('all')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  selectedFloorTab === 'all' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
                }`}
              >
                {isHindi ? 'सभी' : 'All'}
              </button>
              <button
                type="button"
                onClick={() => setSelectedFloorTab('floor1')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  selectedFloorTab === 'floor1' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
                }`}
              >
                1st Fl (101-107)
              </button>
              <button
                type="button"
                onClick={() => setSelectedFloorTab('floor2')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  selectedFloorTab === 'floor2' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
                }`}
              >
                2nd Fl (201-207)
              </button>
              <button
                type="button"
                onClick={() => setSelectedFloorTab('floor3')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  selectedFloorTab === 'floor3' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
                }`}
              >
                3rd Fl (301-307)
              </button>
            </div>
          </div>

          {/* Floor 1 Rooms */}
          {(selectedFloorTab === 'all' || selectedFloorTab === 'floor1') && (
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md inline-block">
                {isHindi ? 'पहली मंज़िल (First Floor)' : 'First Floor Rooms (101 - 107)'}
              </span>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                {ROOMS_FLOOR_1.map((rm) => (
                  <button
                    key={rm}
                    type="button"
                    id={`btn-room-${rm}`}
                    onClick={() => handleSelectRoom(rm)}
                    className={`py-3 px-2 rounded-xl font-black text-xs sm:text-sm text-center border-2 transition active:scale-95 flex flex-col items-center justify-center gap-0.5 ${
                      rm === '107'
                        ? 'border-amber-500 bg-amber-100 text-stone-950 font-black ring-2 ring-amber-300'
                        : 'border-stone-200 bg-stone-50 hover:bg-amber-50 hover:border-amber-400 text-stone-800'
                    }`}
                  >
                    <span className="text-[10px] text-stone-400 font-bold uppercase">Room</span>
                    <span>{rm}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Floor 2 Rooms */}
          {(selectedFloorTab === 'all' || selectedFloorTab === 'floor2') && (
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md inline-block">
                {isHindi ? 'दूसरी मंज़िल (Second Floor)' : 'Second Floor Rooms (201 - 207)'}
              </span>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                {ROOMS_FLOOR_2.map((rm) => (
                  <button
                    key={rm}
                    type="button"
                    id={`btn-room-${rm}`}
                    onClick={() => handleSelectRoom(rm)}
                    className={`py-3 px-2 rounded-xl font-black text-xs sm:text-sm text-center border-2 transition active:scale-95 flex flex-col items-center justify-center gap-0.5 ${
                      rm === '207'
                        ? 'border-amber-500 bg-amber-100 text-stone-950 font-black ring-2 ring-amber-300'
                        : 'border-stone-200 bg-stone-50 hover:bg-amber-50 hover:border-amber-400 text-stone-800'
                    }`}
                  >
                    <span className="text-[10px] text-stone-400 font-bold uppercase">Room</span>
                    <span>{rm}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Floor 3 Rooms */}
          {(selectedFloorTab === 'all' || selectedFloorTab === 'floor3') && (
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-800 bg-purple-50 px-2 py-0.5 rounded-md inline-block">
                {isHindi ? 'तीसरी मंज़िल (Third Floor)' : 'Third Floor Rooms (301 - 307)'}
              </span>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                {ROOMS_FLOOR_3.map((rm) => (
                  <button
                    key={rm}
                    type="button"
                    id={`btn-room-${rm}`}
                    onClick={() => handleSelectRoom(rm)}
                    className="py-3 px-2 rounded-xl font-black text-xs sm:text-sm text-center border-2 border-stone-200 bg-stone-50 hover:bg-amber-50 hover:border-amber-400 text-stone-800 transition active:scale-95 flex flex-col items-center justify-center gap-0.5"
                  >
                    <span className="text-[10px] text-stone-400 font-bold uppercase">Room</span>
                    <span>{rm}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SECTION B: HOSTEL COMMON AREAS & OTHER SECTIONS */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-black uppercase tracking-wider text-stone-500">
            {isHindi ? 'सार्वजनिक क्षेत्र और मंजिलें (Common Areas & Floors)' : 'Hostel Common Areas & Floors'}
          </h2>
          <span className="text-[11px] font-bold text-stone-400">
            {isHindi ? '6 विशिष्ट चेकलिस्ट फ़ॉर्म' : '6 Area Checklist Forms'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {locations
            .filter((loc) => loc.mappedSectionId !== 3) // Exclude duplicate generic dorm card from this section since rooms are prominently above
            .map((loc) => {
              const mappedSection = sections.find((s) => s.id === loc.mappedSectionId);
              const totalTasks = mappedSection?.tasks?.length || 0;
              const doneTasks = mappedSection?.tasks?.filter((t) => t.completed).length || 0;
              const isFullyCompleted = totalTasks > 0 && doneTasks === totalTasks;
              const isInProgress = doneTasks > 0 && doneTasks < totalTasks;

              return (
                <div
                  key={loc.id}
                  id={`btn-location-${loc.id}`}
                  className={`group relative bg-white border-2 rounded-3xl p-4 sm:p-5 flex flex-col justify-between gap-3.5 transition-all duration-200 hover:shadow-lg cursor-pointer active:scale-[0.98] ${
                    isFullyCompleted
                      ? 'border-emerald-500 bg-emerald-50/40'
                      : isInProgress
                      ? 'border-amber-400 bg-amber-50/30'
                      : 'border-stone-200 hover:border-amber-500'
                  }`}
                  onClick={() => {
                    if (loc.id === 'floors_terrace') {
                      handleSpeak(
                        isHindi ? 'कृपया नीचे दी गई मंज़िल चुनें: पहली, दूसरी, तीसरी, चौथी मंज़िल या छत।' : 'Please select a specific floor: 1st, 2nd, 3rd, 4th, or Terrace.',
                        'prompt-floor-select'
                      );
                      return;
                    }
                    onUpdateShiftInfo({
                      ...shiftInfo,
                      roomArea: loc.nameEn,
                    });
                    onSelectLocation(loc);
                  }}
                >
                  {/* Card Top */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-stone-100 group-hover:bg-amber-100 border border-stone-200 group-hover:border-amber-300 flex items-center justify-center shrink-0 transition-colors p-2.5">
                        {getLocationIcon(loc.iconName)}
                      </div>
                      <div>
                        <span className="inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                          {isHindi ? `फ़ॉर्म: ${loc.formNameHi}` : `Form: ${loc.formNameEn}`}
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-stone-900 leading-snug group-hover:text-amber-700 transition-colors mt-0.5">
                          {isHindi ? loc.nameHi : loc.nameEn}
                        </h3>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeak(
                          isHindi
                            ? `${loc.nameHi}। इसमें ${loc.descriptionHi} की चेकलिस्ट शामिल है।`
                            : `${loc.nameEn}. Includes checklist for ${loc.descriptionEn}.`,
                          `speak-loc-${loc.id}`
                        );
                      }}
                      className="w-10 h-10 rounded-xl bg-stone-50 hover:bg-amber-200 text-stone-700 border border-stone-200 flex items-center justify-center shrink-0 transition active:scale-95"
                      title={isHindi ? 'नाम सुनें' : 'Listen location'}
                    >
                      <Volume2 className="w-4 h-4 text-stone-700" />
                    </button>
                  </div>

                  {/* Subtitle / Details */}
                  <p className="text-xs text-stone-600 font-medium line-clamp-2">
                    {isHindi ? loc.descriptionHi : loc.descriptionEn}
                  </p>

                  {/* Floor Selector specific to Floors / Terrace - ONLY ALLOW SPECIFIC FLOOR SELECTION */}
                  {loc.id === 'floors_terrace' ? (
                    <div className="pt-2 border-t border-stone-100 space-y-2" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5" />
                          <span>{isHindi ? 'मंज़िल चुनें (केवल विशिष्ट मंज़िल चुनें):' : 'Select Specific Floor (Required):'}</span>
                        </span>
                        <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200">
                          {isHindi ? 'मंज़िल पर टैप करें' : 'Choose Floor'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {[
                          { id: 'first_floor', en: 'First Floor', hi: 'पहली मंज़िल', icon: '1️⃣' },
                          { id: 'second_floor', en: 'Second Floor', hi: 'दूसरी मंज़िल', icon: '2️⃣' },
                          { id: 'third_floor', en: 'Third Floor', hi: 'तीसरी मंज़िल', icon: '3️⃣' },
                          { id: 'fourth_floor', en: 'Fourth Floor', hi: 'चौथी मंज़िल', icon: '4️⃣' },
                          { id: 'terrace', en: 'Terrace', hi: 'छत (Terrace)', icon: '⛱️' },
                        ].map((fl) => (
                          <button
                            key={fl.id}
                            type="button"
                            id={`btn-floor-opt-${fl.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              const selectedFloorLocation = {
                                ...loc,
                                nameEn: fl.en,
                                nameHi: fl.hi,
                                descriptionEn: `Corridors, passages, windows, and dustbins for ${fl.en}`,
                                descriptionHi: `${fl.hi} के गलियारे, खिड़कियां और कूड़ेदान`,
                              };
                              onUpdateShiftInfo({
                                ...shiftInfo,
                                roomArea: fl.en,
                              });
                              handleSpeak(
                                isHindi ? `मंज़िल: ${fl.hi}` : `Floor: ${fl.en}`,
                                `floor-opt-${fl.id}`
                              );
                              onSelectLocation(selectedFloorLocation);
                            }}
                            className="py-2.5 px-2 rounded-2xl border-2 border-stone-200 bg-stone-50 hover:bg-amber-500 hover:text-stone-950 hover:border-amber-600 font-black text-xs text-center text-stone-800 transition active:scale-95 flex items-center justify-center gap-1.5 shadow-2xs group/fl"
                          >
                            <span className="text-sm">{fl.icon}</span>
                            <span className="truncate">{isHindi ? fl.hi : fl.en}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {/* Card Footer: Progress Pill & Action */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs font-bold text-stone-500">
                    <div className="flex items-center gap-1.5">
                      {isFullyCompleted ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-black">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          {isHindi ? 'पूर्ण (100% Done)' : '100% Done'}
                        </span>
                      ) : isInProgress ? (
                        <span className="text-amber-700 font-black">
                          {doneTasks}/{totalTasks} {isHindi ? 'कार्य पूर्ण' : 'tasks done'}
                        </span>
                      ) : (
                        <span>{totalTasks} {isHindi ? 'कार्य सूची' : 'tasks'}</span>
                      )}
                    </div>

                    {loc.id === 'floors_terrace' ? (
                      <span className="text-amber-800 font-bold text-[11px] italic">
                        {isHindi ? 'ऊपर दी गई मंज़िल चुनें 👆' : 'Tap floor above 👆'}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-stone-900 group-hover:text-amber-600 font-black text-xs">
                        <span>{isHindi ? 'चेकलिस्ट खोलें' : 'Open Form'}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Modal for Custom / Other Room Number */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-stone-900">
                {isHindi ? 'कमरे का नाम या नंबर दर्ज करें' : 'Enter Room Name or Number'}
              </h3>
              <button
                type="button"
                onClick={() => setShowCustomModal(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-500">
              {isHindi
                ? 'यह कमरा सीधे डॉर्म चेकलिस्ट फॉर्म (खंड 3) से जुड़ जाएगा।'
                : 'This room will open the Dorm checklist form (Section 3) directly.'}
            </p>

            <form onSubmit={handleCustomRoomSubmit} className="space-y-4">
              <input
                type="text"
                value={customRoomInput}
                onChange={(e) => setCustomRoomInput(e.target.value)}
                placeholder={isHindi ? 'जैसे: Room 107, Dorm 2, Suite B...' : 'e.g., Room 107, Dorm 4, Attic...'}
                autoFocus
                className="w-full px-4 py-3.5 rounded-2xl border-2 border-stone-300 focus:border-amber-500 focus:outline-none text-base font-bold text-stone-900"
              />

              <div className="flex items-center gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs"
                >
                  {isHindi ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={!customRoomInput.trim()}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-stone-950 font-black text-xs flex items-center gap-1.5 shadow-md"
                >
                  <span>{isHindi ? 'डॉर्म फॉर्म खोलें' : 'Open Dorm Form'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
