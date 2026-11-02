import React from 'react';
import {
  Compass,
  Mountain,
  Building2,
  Palmtree,
  Volume2,
  Users,
  DoorOpen,
  Layers,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { PropertyId, Language } from '../types';
import { PROPERTIES } from '../data/propertyData';
import { speakText } from '../utils/speechUtils';

interface PropertySelectionViewProps {
  language: Language;
  speechSpeed: number;
  onSelectProperty: (propertyId: PropertyId) => void;
}

export const PropertySelectionView: React.FC<PropertySelectionViewProps> = ({
  language,
  speechSpeed,
  onSelectProperty,
}) => {
  const isHindi = language === 'hi-IN';

  const handleSpeakProperty = (propertyId: PropertyId, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const buttonElement = e.currentTarget;
    const directHindi = buttonElement.getAttribute('data-hindi');
    const prop = PROPERTIES[propertyId];
    
    // Accurate bilingual text matching the exact content written in the card
    const dormCount = prop.dorms?.length || 0;
    const roomCount = prop.privateRooms?.length || 0;
    const staffList = prop.staff.join(', ');
    
    let specsHindi = '';
    if (dormCount > 0 && roomCount > 0) {
      specsHindi = `${dormCount} डॉर्म और ${roomCount} कमरे। ${staffList}।`;
    } else if (roomCount > 0) {
      specsHindi = `${roomCount} कमरे। ${staffList}।`;
    } else {
      specsHindi = `${staffList}।`;
    }

    const speech = directHindi || (isHindi
      ? `${prop.nameHi}। ${prop.taglineHi}। ${specsHindi}`
      : `${prop.nameEn}. ${prop.taglineEn}. ${dormCount > 0 ? `${dormCount} Dorms, ` : ''}${roomCount} Rooms. Staff: ${staffList}.`);
      
    speakText(speech, isHindi ? 'hi-IN' : 'en-IN', `prop-speak-${propertyId}`, speechSpeed || 0.85);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      {/* Banner / Title Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-100/50 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{isHindi ? 'चरण 1: संपत्ति चयन' : 'Step 1: Property Selection'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Select Property / संपत्ति चुनें
            </h1>
            <p className="text-stone-600 text-sm sm:text-base mt-1">
              {isHindi
                ? 'सफाई शिफ्ट और ऑडिट शुरू करने के लिए अपनी संपत्ति पर टैप करें।'
                : 'Tap your property to begin the housekeeping shift & checklist.'}
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const fullSpeech = isHindi
                ? 'कृपया संपत्ति का चयन करें। लैंडलोपर्स, तपोवन, दिल्ली, अथवा ऋषिकेश।'
                : 'Please select a property: Landlopers, Tapovan, Delhi, or Rishikesh.';
              speakText(fullSpeech, language, 'intro-property-select', speechSpeed);
            }}
            className="self-start sm:self-center p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-2 font-bold text-sm transition shadow-sm"
            title="Listen Instructions"
          >
            <Volume2 className="w-5 h-5 text-amber-700 animate-pulse" />
            <span className="text-xs">{isHindi ? 'ऑडियो सुनें' : 'Listen'}</span>
          </button>
        </div>
      </div>

      {/* FOUR MASSIVE PROPERTY CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5">
        {/* 1. LANDLOPERS */}
        <div
          role="button"
          tabIndex={0}
          id="btn-prop-landlopers"
          onClick={() => onSelectProperty('landlopers')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectProperty('landlopers');
            }
          }}
          className="w-full text-left bg-white hover:bg-emerald-50/40 rounded-3xl p-5 sm:p-6 border-2 border-stone-200 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all group relative overflow-hidden cursor-pointer"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                <Compass className="w-8 h-8 sm:w-9 sm:h-9" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xl sm:text-2xl font-black text-stone-900 group-hover:text-emerald-800 transition-colors">
                    Landlopers
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-stone-500">/</span>
                  <span className="text-lg sm:text-xl font-bold text-stone-700">लैंडलोपर्स</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Riverside Hub
                  </span>
                </div>

                <p className="text-sm text-stone-600 font-medium">
                  {isHindi ? 'रिवरसाइड एवं हिल व्यू प्रॉपर्टी' : 'Riverside & Hill View Hub'}
                </p>

                {/* Quick Spec Pills */}
                <div className="flex items-center gap-3 pt-2 text-xs text-stone-500 flex-wrap">
                  <div className="flex items-center gap-1.5 bg-stone-100 px-2.5 py-1 rounded-lg">
                    <DoorOpen className="w-3.5 h-3.5 text-stone-600" />
                    <span>4 Dorms (D1–D4) + 4 Rooms (R1–R4)</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-stone-100 px-2.5 py-1 rounded-lg">
                    <Users className="w-3.5 h-3.5 text-stone-600" />
                    <span>4 Staff: Jasvir, Rajeshwari, Yashodha, Jubin</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              <button
                type="button"
                data-hindi="लैंडलोपर्स। रिवरसाइड एवं हिल व्यू प्रॉपर्टी। 4 डॉर्म, 4 कमरे। स्टाफ: जसवीर, राजेश्वरी, यशोधरा, जुबिन।"
                onClick={(e) => handleSpeakProperty('landlopers', e)}
                className="p-2.5 rounded-xl bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-800 transition"
                title="Audio"
              >
                <Volume2 className="w-5 h-5" />
              </button>

              <div className="w-10 h-10 rounded-full bg-stone-100 group-hover:bg-emerald-600 text-stone-400 group-hover:text-white flex items-center justify-center transition-colors">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* 2. TAPOVAN */}
        <div
          role="button"
          tabIndex={0}
          id="btn-prop-tapovan"
          onClick={() => onSelectProperty('tapovan')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectProperty('tapovan');
            }
          }}
          className="w-full text-left bg-white hover:bg-amber-50/40 rounded-3xl p-5 sm:p-6 border-2 border-stone-200 hover:border-amber-500 shadow-sm hover:shadow-md transition-all group relative overflow-hidden cursor-pointer"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                <Mountain className="w-8 h-8 sm:w-9 sm:h-9" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xl sm:text-2xl font-black text-stone-900 group-hover:text-amber-800 transition-colors">
                    Tapovan
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-stone-500">/</span>
                  <span className="text-lg sm:text-xl font-bold text-stone-700">तपोवन</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                    6 Floors
                  </span>
                </div>

                <p className="text-sm text-stone-600 font-medium">
                  {isHindi ? 'योग एवं माउंटेन वैली स्टे' : 'Yoga & Mountain Valley Retreat'}
                </p>

                {/* Quick Spec Pills */}
                <div className="flex items-center gap-3 pt-2 text-xs text-stone-500 flex-wrap">
                  <div className="flex items-center gap-1.5 bg-stone-100 px-2.5 py-1 rounded-lg">
                    <DoorOpen className="w-3.5 h-3.5 text-stone-600" />
                    <span>16 Private Rooms (101–601)</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-stone-100 px-2.5 py-1 rounded-lg">
                    <Layers className="w-3.5 h-3.5 text-stone-600" />
                    <span>6 Floors & Common Areas</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-stone-100 px-2.5 py-1 rounded-lg">
                    <Users className="w-3.5 h-3.5 text-stone-600" />
                    <span>5 Staff: Jasvir, Rajeshwari, Yashodha, Jubin, Ajay</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              <button
                type="button"
                data-hindi="तपोवन। योग एवं माउंटेन वैली स्टे। 16 प्राइवेट कमरे, 6 मंज़िल और कॉमन एरिया। स्टाफ: जसवीर, राजेश्वरी, यशोधरा, जुबिन, अजय।"
                onClick={(e) => handleSpeakProperty('tapovan', e)}
                className="p-2.5 rounded-xl bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-800 transition"
                title="Audio"
              >
                <Volume2 className="w-5 h-5" />
              </button>

              <div className="w-10 h-10 rounded-full bg-stone-100 group-hover:bg-amber-600 text-stone-400 group-hover:text-white flex items-center justify-center transition-colors">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* 3. DELHI */}
        <div
          role="button"
          tabIndex={0}
          id="btn-prop-delhi"
          onClick={() => onSelectProperty('delhi')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectProperty('delhi');
            }
          }}
          className="w-full text-left bg-white hover:bg-indigo-50/40 rounded-3xl p-5 sm:p-6 border-2 border-stone-200 hover:border-indigo-500 shadow-sm hover:shadow-md transition-all group relative overflow-hidden cursor-pointer"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-100 border border-indigo-300 text-indigo-700 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                <Building2 className="w-8 h-8 sm:w-9 sm:h-9" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xl sm:text-2xl font-black text-stone-900 group-hover:text-indigo-800 transition-colors">
                    Delhi
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-stone-500">/</span>
                  <span className="text-lg sm:text-xl font-bold text-stone-700">दिल्ली</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-300">
                    City Center
                  </span>
                </div>

                <p className="text-sm text-stone-600 font-medium">
                  {isHindi ? 'कैपिटल सिटी बंक सेंटर' : 'Capital City Bunk Center'}
                </p>

                {/* Quick Spec Pills */}
                <div className="flex items-center gap-3 pt-2 text-xs text-stone-500 flex-wrap">
                  <div className="flex items-center gap-1.5 bg-stone-100 px-2.5 py-1 rounded-lg">
                    <DoorOpen className="w-3.5 h-3.5 text-stone-600" />
                    <span>6 Dorms (B1–B7) + 12 Rooms (D1–P8)</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-stone-100 px-2.5 py-1 rounded-lg">
                    <Users className="w-3.5 h-3.5 text-stone-600" />
                    <span>3 Staff: Shouaib, Rohit, Sureandar</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              <button
                type="button"
                data-hindi="दिल्ली। कैपिटल सिटी बंक सेंटर। 6 डॉर्म, 12 कमरे। स्टाफ: शोएब, रोहित, सुरेंद्र।"
                onClick={(e) => handleSpeakProperty('delhi', e)}
                className="p-2.5 rounded-xl bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-800 transition"
                title="Audio"
              >
                <Volume2 className="w-5 h-5" />
              </button>

              <div className="w-10 h-10 rounded-full bg-stone-100 group-hover:bg-indigo-600 text-stone-400 group-hover:text-white flex items-center justify-center transition-colors">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* 4. RISHIKESH */}
        <div
          role="button"
          tabIndex={0}
          id="btn-prop-rishikesh"
          onClick={() => onSelectProperty('rishikesh')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectProperty('rishikesh');
            }
          }}
          className="w-full text-left bg-white hover:bg-teal-50/40 rounded-3xl p-5 sm:p-6 border-2 border-stone-200 hover:border-teal-500 shadow-sm hover:shadow-md transition-all group relative overflow-hidden cursor-pointer"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-teal-100 border border-teal-300 text-teal-700 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                <Palmtree className="w-8 h-8 sm:w-9 sm:h-9" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xl sm:text-2xl font-black text-stone-900 group-hover:text-teal-800 transition-colors">
                    Rishikesh
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-stone-500">/</span>
                  <span className="text-lg sm:text-xl font-bold text-stone-700">ऋषिकेश</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-300">
                    Yoga & Ganga Hub
                  </span>
                </div>

                <p className="text-sm text-stone-600 font-medium">
                  {isHindi ? 'पवित्र गंगा एवं शांत बंक प्रवास' : 'Holy Ganga & Serene Bunk Retreat'}
                </p>

                {/* Quick Spec Pills */}
                <div className="flex items-center gap-3 pt-2 text-xs text-stone-500 flex-wrap">
                  <div className="flex items-center gap-1.5 bg-stone-100 px-2.5 py-1 rounded-lg">
                    <DoorOpen className="w-3.5 h-3.5 text-stone-600" />
                    <span>3 Dorms (107, 207, Dorm Hall) + 19 Rooms (101–307)</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-stone-100 px-2.5 py-1 rounded-lg">
                    <Layers className="w-3.5 h-3.5 text-stone-600" />
                    <span>4 Floors, Yoga Hall & Cafe</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-stone-100 px-2.5 py-1 rounded-lg">
                    <Users className="w-3.5 h-3.5 text-stone-600" />
                    <span>4 Staff: Jasvir, Rajeshwari, Yashodha, Jubin</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              <button
                type="button"
                data-hindi="ऋषिकेश। पवित्र गंगा एवं शांत बंक प्रवास। 3 डॉर्म, 19 कमरे, 4 मंज़िल, योग हॉल एवं कैफ़े। स्टाफ: जसवीर, राजेश्वरी, यशोधरा, जुबिन।"
                onClick={(e) => handleSpeakProperty('rishikesh', e)}
                className="p-2.5 rounded-xl bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-800 transition"
                title="Audio"
              >
                <Volume2 className="w-5 h-5" />
              </button>

              <div className="w-10 h-10 rounded-full bg-stone-100 group-hover:bg-teal-600 text-stone-400 group-hover:text-white flex items-center justify-center transition-colors">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Footer / Assurance */}
      <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl flex items-center gap-3 text-xs text-stone-600">
        <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
        <span>
          {isHindi
            ? 'प्रत्येक संपत्ति के लिए संबंधित कर्मचारी, डॉर्म, कमरे एवं साझा क्षेत्र स्वचालित रूप से लोड होते हैं।'
            : 'Staff members, dorms, private rooms, and common areas are dynamically mapped for each property.'}
        </span>
      </div>
    </div>
  );
};
