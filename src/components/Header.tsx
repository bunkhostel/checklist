import React from 'react';
import { Volume2, VolumeX, Languages, Sparkles, Building2, CheckCircle2, ShieldCheck, Compass } from 'lucide-react';
import { Language, PropertyId } from '../types';
import { stopSpeaking } from '../utils/speechUtils';
import { PROPERTIES } from '../data/propertyData';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  speechSpeed: number;
  onSpeechSpeedChange: (speed: number) => void;
  completedCount: number;
  totalCount: number;
  isSpeaking: boolean;
  onSwitchToAdmin: () => void;
  activePropertyId?: PropertyId | null;
  onChangeProperty?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  speechSpeed,
  onSpeechSpeedChange,
  completedCount,
  totalCount,
  isSpeaking,
  onSwitchToAdmin,
  activePropertyId,
  onChangeProperty,
}) => {
  const isHindi = language === 'hi-IN';
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const currentProp = activePropertyId ? PROPERTIES[activePropertyId] : null;

  return (
    <header className="sticky top-0 z-30 bg-stone-900 text-stone-100 shadow-md border-b border-stone-800 backdrop-blur-md">
      {/* Top Brand Bar */}
      <div className="max-w-3xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          {/* Logo & Hostel Name */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-stone-950 font-black text-xl shadow-inner shrink-0 ring-2 ring-amber-400/30">
              B
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white truncate">
                  Bunk Hostel
                </h1>
                {currentProp && (
                  <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full border shadow-sm ${currentProp.badgeColor}`}>
                    {currentProp.nameEn}
                  </span>
                )}
                {!currentProp && (
                  <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30 shrink-0">
                    Multi-Property
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-300 truncate font-medium">
                {isHindi ? 'हाउसकीपिंग पोर्टल (सफाई जांच)' : 'Housekeeping Portal'}
              </p>
            </div>
          </div>

          {/* Controls: Audio Stop, Admin Switch & Language Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            {isSpeaking && (
              <button
                id="stop-audio-button"
                onClick={stopSpeaking}
                title="Stop Audio"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold animate-pulse transition-all shadow"
              >
                <VolumeX className="w-4 h-4" />
                <span className="hidden xs:inline">{isHindi ? 'रोकें' : 'Stop'}</span>
              </button>
            )}

            {/* Change property button if in sub-screen */}
            {currentProp && onChangeProperty && (
              <button
                type="button"
                onClick={onChangeProperty}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-bold border border-stone-700 transition"
                title="Change Property"
              >
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{isHindi ? 'संपत्ति' : 'Property'}</span>
              </button>
            )}

            {/* Admin Audit Portal Switcher Button */}
            <button
              id="switch-to-admin-portal-btn"
              onClick={onSwitchToAdmin}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 hover:text-amber-300 text-xs font-bold border border-amber-500/30 shadow-sm transition"
              title="Open Admin Housekeeping Audit Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Admin</span>
            </button>

            {/* Language Switch Button */}
            <div className="flex items-center bg-stone-800 p-0.5 rounded-xl border border-stone-700">
              <button
                id="lang-hindi-toggle"
                onClick={() => onLanguageChange('hi-IN')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  isHindi
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-stone-300 hover:text-white'
                }`}
                title="हिंदी में सुनें और पढ़ें"
              >
                हिन्दी
              </button>
              <button
                id="lang-english-toggle"
                onClick={() => onLanguageChange('en-IN')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  !isHindi
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-stone-300 hover:text-white'
                }`}
                title="Read and listen in English"
              >
                ENG
              </button>
            </div>
          </div>
        </div>

        {/* Status Bar: Live Task Progress & Quick Speech Speed */}
        <div className="mt-3 pt-2.5 border-t border-stone-800/80 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-300">
              {isHindi ? 'कुल प्रगति:' : 'Progress:'}
            </span>
            <span className="font-bold text-amber-400">
              {completedCount}/{totalCount}
            </span>
            <span className="text-stone-400">({progressPercent}%)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-stone-400 hidden sm:inline">
              {isHindi ? 'आवाज गति:' : 'Voice Speed:'}
            </span>
            <div className="flex items-center gap-1 bg-stone-800 px-1.5 py-0.5 rounded-lg border border-stone-700/60">
              <button
                onClick={() => onSpeechSpeedChange(0.85)}
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition ${
                  speechSpeed < 0.9 ? 'bg-stone-700 text-amber-300 font-bold' : 'text-stone-400'
                }`}
              >
                0.8x
              </button>
              <button
                onClick={() => onSpeechSpeedChange(1.0)}
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition ${
                  speechSpeed >= 0.9 && speechSpeed <= 1.05 ? 'bg-stone-700 text-amber-300 font-bold' : 'text-stone-400'
                }`}
              >
                1.0x
              </button>
              <button
                onClick={() => onSpeechSpeedChange(1.15)}
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition ${
                  speechSpeed > 1.05 ? 'bg-stone-700 text-amber-300 font-bold' : 'text-stone-400'
                }`}
              >
                1.2x
              </button>
            </div>
          </div>
        </div>

        {/* Animated Progress Line */}
        <div className="w-full bg-stone-800 h-1.5 rounded-full mt-2 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ease-out ${
              progressPercent === 100 ? 'bg-emerald-400' : 'bg-amber-400'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </header>
  );
};


