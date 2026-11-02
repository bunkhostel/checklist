import React, { useState } from 'react';
import {
  Building2,
  Calendar,
  Clock,
  User,
  Volume2,
  Bed,
  DoorOpen,
  Layers,
  Sparkles,
  Store,
  Bath,
  Sun,
  Footprints,
  Trees,
  Coffee,
  Palmtree,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { PropertyId, Language, ShiftInfo, LocationOption, FormType } from '../types';
import { PROPERTIES } from '../data/propertyData';
import { speakText } from '../utils/speechUtils';

interface StaffAreaSelectionViewProps {
  propertyId: PropertyId;
  shiftInfo: ShiftInfo;
  onUpdateShiftInfo: (info: ShiftInfo) => void;
  language: Language;
  speechSpeed: number;
  onBackToPropertySelect: () => void;
  onSelectArea: (location: LocationOption) => void;
}

export const StaffAreaSelectionView: React.FC<StaffAreaSelectionViewProps> = ({
  propertyId,
  shiftInfo,
  onUpdateShiftInfo,
  language,
  speechSpeed,
  onBackToPropertySelect,
  onSelectArea,
}) => {
  const isHindi = language === 'hi-IN';
  const property = PROPERTIES[propertyId] || PROPERTIES.landlopers;

  // Selected sub-tab for room organization if many rooms (e.g. Tapovan, Rishikesh, Delhi)
  const [tapovanFloorFilter, setTapovanFloorFilter] = useState<string>('all');
  const [rishikeshFloorFilter, setRishikeshFloorFilter] = useState<string>('all');
  const [delhiRoomFilter, setDelhiRoomFilter] = useState<string>('all');

  const handleStaffChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateShiftInfo({
      ...shiftInfo,
      checkedBy: e.target.value,
    });
  };

  const handleTimingChange = (timing: 'Morning' | 'Evening') => {
    onUpdateShiftInfo({
      ...shiftInfo,
      shiftTiming: timing,
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateShiftInfo({
      ...shiftInfo,
      date: e.target.value,
    });
  };

  // Helper to trigger dorm selection
  const handleSelectDorm = (dormId: string) => {
    const formattedEn = dormId.toLowerCase().includes('dorm') ? dormId : `Dorm ${dormId}`;
    const formattedHi = dormId.toLowerCase().includes('dorm') ? 'डॉर्म हॉल' : `डॉर्म ${dormId}`;
    const loc: LocationOption = {
      id: `${propertyId}_dorm_${dormId.toLowerCase().replace(/\s+/g, '_')}`,
      nameEn: formattedEn,
      nameHi: formattedHi,
      propertyId,
      propertyNameEn: property.nameEn,
      propertyNameHi: property.nameHi,
      formType: 'dorm',
      mappedSectionId: 3,
      formNameEn: 'Dorm Cleaning Form',
      formNameHi: 'डॉर्म सफाई फ़ॉर्म',
      iconName: 'Bed',
      descriptionEn: `Bunk beds, charging stations, lockers, bathroom and room cleanliness for ${formattedEn}`,
      descriptionHi: `${formattedHi} के बंक बेड, चार्जिंग स्टेशन, लॉकर, बाथरूम और कमरे की सफाई`,
    };

    onUpdateShiftInfo({
      ...shiftInfo,
      roomArea: loc.nameEn,
    });
    onSelectArea(loc);
  };

  // Helper to trigger private room selection
  const handleSelectPrivateRoom = (roomId: string) => {
    const loc: LocationOption = {
      id: `${propertyId}_room_${roomId.toLowerCase()}`,
      nameEn: `Room ${roomId}`,
      nameHi: `कमरा ${roomId}`,
      propertyId,
      propertyNameEn: property.nameEn,
      propertyNameHi: property.nameHi,
      formType: 'room',
      mappedSectionId: 2,
      formNameEn: 'Private Room Cleaning Form',
      formNameHi: 'प्राइवेट रूम सफाई फ़ॉर्म',
      iconName: 'DoorOpen',
      descriptionEn: `Bed linen, bathroom, windows, furniture & general cleaning for Room ${roomId}`,
      descriptionHi: `कमरा ${roomId} के बिस्तर, बाथरूम, खिड़की, फर्नीचर और साधारण सफाई`,
    };

    onUpdateShiftInfo({
      ...shiftInfo,
      roomArea: loc.nameEn,
    });
    onSelectArea(loc);
  };

  // Helper to trigger common area selection
  const handleSelectCommonArea = (area: {
    id: string;
    nameEn: string;
    nameHi: string;
    formType: FormType;
    iconName?: string;
  }) => {
    let mappedSecId = 4;
    let fNameEn = 'Common Area Form';
    let fNameHi = 'साझा क्षेत्र फ़ॉर्म';

    if (area.formType === 'reception') {
      mappedSecId = 6;
      fNameEn = 'Reception Cleaning Form';
      fNameHi = 'रिसेप्शन सफाई फ़ॉर्म';
    } else if (area.formType === 'washroom') {
      mappedSecId = 9;
      fNameEn = 'Common Washroom Form';
      fNameHi = 'साझा वॉशरूम फ़ॉर्म';
    } else if (area.formType === 'staircase') {
      mappedSecId = 8;
      fNameEn = 'Corridors & Stairs Form';
      fNameHi = 'गलियारे एवं सीढ़ियां फ़ॉर्म';
    } else if (area.formType === 'yoga_hall') {
      mappedSecId = 7;
      fNameEn = 'Yoga Hall Form';
      fNameHi = 'योग हॉल फ़ॉर्म';
    } else if (area.formType === 'cafe') {
      mappedSecId = 5;
      fNameEn = 'Cafe/Restaurant Form';
      fNameHi = 'कैफ़े / रेस्तरां फ़ॉर्म';
    } else if (area.formType === 'terrace' || area.formType === 'garden') {
      mappedSecId = 4;
      fNameEn = `${area.nameEn} Form`;
      fNameHi = `${area.nameHi} फ़ॉर्म`;
    }

    const loc: LocationOption = {
      id: `${propertyId}_common_${area.id}`,
      nameEn: area.nameEn,
      nameHi: area.nameHi,
      propertyId,
      propertyNameEn: property.nameEn,
      propertyNameHi: property.nameHi,
      formType: area.formType,
      mappedSectionId: mappedSecId,
      formNameEn: fNameEn,
      formNameHi: fNameHi,
      iconName: area.iconName || 'Building2',
      descriptionEn: `Cleanliness check for ${area.nameEn}`,
      descriptionHi: `${area.nameHi} की सफाई की जांच`,
    };

    onUpdateShiftInfo({
      ...shiftInfo,
      roomArea: loc.nameEn,
    });
    onSelectArea(loc);
  };

  const getCommonAreaIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Store':
        return <Store className="w-5 h-5 text-emerald-600" />;
      case 'Bath':
        return <Bath className="w-5 h-5 text-cyan-600" />;
      case 'Sun':
        return <Sun className="w-5 h-5 text-amber-600" />;
      case 'Trees':
        return <Trees className="w-5 h-5 text-green-600" />;
      case 'Footprints':
        return <Footprints className="w-5 h-5 text-rose-600" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-blue-600" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-amber-700" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-purple-600" />;
      default:
        return <Building2 className="w-5 h-5 text-stone-600" />;
    }
  };

  // Filtered Tapovan Rooms
  const filteredTapovanRooms = property.privateRooms.filter((r) => {
    if (tapovanFloorFilter === 'all') return true;
    return r.startsWith(tapovanFloorFilter);
  });

  // Filtered Rishikesh Rooms
  const filteredRishikeshRooms = property.privateRooms.filter((r) => {
    if (rishikeshFloorFilter === 'all') return true;
    return r.startsWith(rishikeshFloorFilter);
  });

  // Filtered Delhi Rooms
  const filteredDelhiRooms = property.privateRooms.filter((r) => {
    if (delhiRoomFilter === 'all') return true;
    if (delhiRoomFilter === 'D') return r.startsWith('D');
    if (delhiRoomFilter === 'P') return r.startsWith('P');
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      {/* Property Breadcrumb & Change Button */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToPropertySelect}
              className="p-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition"
              title="Change Property"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${property.badgeColor}`}>
                  {property.nameEn}
                </span>
                <span className="text-xs text-stone-500 font-semibold">
                  {isHindi ? 'चयनित संपत्ति' : 'Active Property'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-0.5">
                {property.nameEn} <span className="text-stone-400 font-normal">/</span> {property.nameHi}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onBackToPropertySelect}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3.5 py-2 rounded-xl border border-amber-200 transition self-start sm:self-center"
          >
            {isHindi ? '← दूसरी संपत्ति चुनें' : '← Switch Property'}
          </button>
        </div>
      </div>

      {/* SHIFT CONTROLS: DYNAMIC STAFF DROPDOWN, TIMING & DATE */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-base">
            <User className="w-5 h-5 text-amber-600" />
            <span>{isHindi ? 'शिफ्ट विवरण एवं कर्मचारी' : 'Shift Inspector & Timing'}</span>
          </div>

          <button
            type="button"
            onClick={() => {
              const speech = isHindi
                ? `कर्मचारी चुनें। उपलब्ध स्टाफ: ${property.staff.join(', ')}।`
                : `Select staff member. Available staff: ${property.staff.join(', ')}.`;
              speakText(speech, language, 'speak-staff-options', speechSpeed);
            }}
            className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 transition"
            title="Audio"
          >
            <Volume2 className="w-4 h-4 text-amber-700" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Dynamic Staff Dropdown based on property */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-700">
              {isHindi ? 'कर्मचारी चुनें (Checked By) *' : 'Checked By (Staff Member) *'}
            </label>
            <div className="relative">
              <select
                id="select-staff-member"
                value={shiftInfo.checkedBy}
                onChange={handleStaffChange}
                className="w-full bg-stone-50 border-2 border-stone-200 focus:border-amber-500 focus:bg-white rounded-2xl px-3.5 py-3 text-stone-900 font-bold text-sm outline-none transition appearance-none cursor-pointer"
              >
                {property.staff.map((staffName) => (
                  <option key={staffName} value={staffName}>
                    {staffName} ({property.nameEn})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-stone-500 font-bold text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Shift Timing */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-700">
              {isHindi ? 'शिफ्ट का समय (Shift Timing)' : 'Shift Timing'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleTimingChange('Morning')}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
                  shiftInfo.shiftTiming === 'Morning'
                    ? 'bg-amber-500 border-amber-600 text-white shadow-sm'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{isHindi ? 'सुबह' : 'Morning'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleTimingChange('Evening')}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
                  shiftInfo.shiftTiming === 'Evening'
                    ? 'bg-amber-500 border-amber-600 text-white shadow-sm'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{isHindi ? 'शाम' : 'Evening'}</span>
              </button>
            </div>
          </div>

          {/* Shift Date */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-stone-700">
              {isHindi ? 'तारीख (Date)' : 'Inspection Date'}
            </label>
            <div className="relative">
              <input
                type="date"
                value={shiftInfo.date}
                onChange={handleDateChange}
                className="w-full bg-stone-50 border-2 border-stone-200 focus:border-amber-500 focus:bg-white rounded-2xl px-3.5 py-2.5 text-stone-900 font-bold text-sm outline-none transition"
              />
            </div>
          </div>
        </div>
      </div>

      {/* DYNAMIC AREA SELECTION SECTION */}
      <div className="space-y-6">
        {/* 1. DORMS SECTION (IF PROPERTY HAS DORMS) */}
        {property.dorms && property.dorms.length > 0 && (
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <Bed className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-stone-900 text-lg">
                    Dorms / डॉर्म्स ({property.dorms.length})
                  </h3>
                  <p className="text-xs text-stone-500">
                    {isHindi
                      ? 'बंक बेड, चार्जिंग स्टेशन, लॉकर और डॉर्म चेकलिस्ट'
                      : 'Routes to Dorm checklist form with bunk beds & charging stations'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  const speech = isHindi
                    ? `डॉर्म चुनें: ${property.dorms?.join(', ')}`
                    : `Select dorm: ${property.dorms?.join(', ')}`;
                  speakText(speech, language, 'speak-dorms', speechSpeed);
                }}
                className="p-2 rounded-xl bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-800 transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {property.dorms.map((dormId) => (
                <button
                  key={dormId}
                  id={`btn-dorm-${dormId}`}
                  type="button"
                  onClick={() => handleSelectDorm(dormId)}
                  className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 hover:bg-amber-100/90 border-2 border-amber-200 hover:border-amber-500 text-left transition-all group flex flex-col justify-between shadow-sm active:scale-95"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                      DORM
                    </span>
                    <Bed className="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                  </div>

                  <div className="mt-3">
                    <div className="text-2xl font-black text-stone-900 group-hover:text-amber-900">
                      {dormId}
                    </div>
                    <div className="text-xs text-stone-600 font-semibold mt-0.5">
                      डॉर्म {dormId}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs font-bold text-amber-700 group-hover:text-amber-900 border-t border-amber-200/60 pt-2">
                    <span>{isHindi ? 'चेकलिस्ट खोलें' : 'Open Form'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 2. PRIVATE ROOMS SECTION */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-100 text-blue-800">
                <DoorOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-stone-900 text-lg">
                  Private Rooms / प्राइवेट रूम ({property.privateRooms.length})
                </h3>
                <p className="text-xs text-stone-500">
                  {isHindi
                    ? 'बिस्तर, चादर, बाथरूम, खिड़की एवं फर्नीचर चेकलिस्ट'
                    : 'Routes to Private Room checklist form'}
                </p>
              </div>
            </div>

            {/* Filter Tabs for Tapovan (1st-6th Floor) */}
            {propertyId === 'tapovan' && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                {['all', '1', '2', '3', '4', '5', '6'].map((fl) => (
                  <button
                    key={fl}
                    type="button"
                    onClick={() => setTapovanFloorFilter(fl)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                      tapovanFloorFilter === fl
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {fl === 'all' ? (isHindi ? 'सभी' : 'All') : `${fl}${fl === '1' ? 'st' : fl === '2' ? 'nd' : fl === '3' ? 'rd' : 'th'} Fl`}
                  </button>
                ))}
              </div>
            )}

            {/* Filter Tabs for Rishikesh (1st-3rd Floor) */}
            {propertyId === 'rishikesh' && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                {['all', '1', '2', '3'].map((fl) => (
                  <button
                    key={fl}
                    type="button"
                    onClick={() => setRishikeshFloorFilter(fl)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                      rishikeshFloorFilter === fl
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {fl === 'all' ? (isHindi ? 'सभी' : 'All') : `${fl}${fl === '1' ? 'st' : fl === '2' ? 'nd' : 'rd'} Floor`}
                  </button>
                ))}
              </div>
            )}

            {/* Filter Tabs for Delhi (D-Rooms vs P-Rooms) */}
            {propertyId === 'delhi' && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                {[
                  { id: 'all', label: isHindi ? 'सभी रूम' : 'All Rooms' },
                  { id: 'D', label: 'D-Rooms (D1-D4)' },
                  { id: 'P', label: 'P-Rooms (P1-P8)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setDelhiRoomFilter(item.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                      delhiRoomFilter === item.id
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
            {(propertyId === 'tapovan'
              ? filteredTapovanRooms
              : propertyId === 'rishikesh'
              ? filteredRishikeshRooms
              : propertyId === 'delhi'
              ? filteredDelhiRooms
              : property.privateRooms
            ).map((roomId) => (
              <button
                key={roomId}
                id={`btn-room-${roomId}`}
                type="button"
                onClick={() => handleSelectPrivateRoom(roomId)}
                className="p-4 rounded-2xl bg-stone-50 hover:bg-blue-50/80 border-2 border-stone-200 hover:border-blue-500 text-left transition-all group flex flex-col justify-between active:scale-95 shadow-sm"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-bold text-stone-500 group-hover:text-blue-700 uppercase">
                    ROOM
                  </span>
                  <DoorOpen className="w-4 h-4 text-stone-400 group-hover:text-blue-600 group-hover:scale-110 transition-transform" />
                </div>

                <div className="my-2">
                  <div className="text-xl font-black text-stone-900 group-hover:text-blue-900">
                    {roomId}
                  </div>
                  <div className="text-[11px] text-stone-500 font-medium">
                    कमरा {roomId}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-bold text-stone-600 group-hover:text-blue-700 pt-1.5 border-t border-stone-200/60">
                  <span>{isHindi ? 'जांचें' : 'Audit'}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 3. COMMON AREAS SECTION */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-100 text-purple-800">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-stone-900 text-lg">
                  Common Areas / साझा क्षेत्र ({property.commonAreas.length})
                </h3>
                <p className="text-xs text-stone-500">
                  {isHindi
                    ? 'रिसेप्शन, सीढ़ियां, छत, वॉशरूम एवं गलियारे'
                    : 'Reception, Staircase, Terrace, Common Washroom & Floors'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const speech = isHindi
                  ? `साझा क्षेत्र: ${property.commonAreas.map((a) => a.nameHi).join(', ')}`
                  : `Common areas: ${property.commonAreas.map((a) => a.nameEn).join(', ')}`;
                speakText(speech, language, 'speak-common-areas', speechSpeed);
              }}
              className="p-2 rounded-xl bg-stone-100 hover:bg-purple-100 text-stone-700 hover:text-purple-800 transition"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            {property.commonAreas.map((area) => (
              <button
                key={area.id}
                id={`btn-common-${area.id}`}
                type="button"
                onClick={() => handleSelectCommonArea(area)}
                className="p-4 rounded-2xl bg-stone-50 hover:bg-purple-50/80 border-2 border-stone-200 hover:border-purple-500 text-left transition-all group flex items-start gap-3.5 shadow-sm active:scale-95"
              >
                <div className="p-3 rounded-xl bg-white border border-stone-200 group-hover:border-purple-300 group-hover:bg-purple-100/50 transition-colors flex-shrink-0">
                  {getCommonAreaIcon(area.iconName)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-stone-900 group-hover:text-purple-900 text-sm truncate">
                    {area.nameEn}
                  </div>
                  <div className="text-xs text-stone-600 font-medium">
                    {area.nameHi}
                  </div>
                  <div className="text-[11px] font-bold text-purple-700 mt-1 flex items-center gap-1">
                    <span>{isHindi ? 'फॉर्म भरें' : 'Open Form'}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
