import React, { useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCheck,
  RotateCcw,
  Volume2,
  AlertTriangle,
  UploadCloud,
  CheckCircle2,
  Sparkles,
  Layers,
  Building2,
  CheckSquare,
  Trash2,
  Video,
  Image as ImageIcon,
  Check
} from 'lucide-react';
import { SectionDef, Language, TaskItem, LocationOption } from '../types';
import { ChecklistItemCard } from './ChecklistItemCard';
import { speakText } from '../utils/speechUtils';

interface ChecklistSectionViewProps {
  section: SectionDef;
  selectedLocation?: LocationOption | null;
  language: Language;
  speechSpeed: number;
  speakingId: string | null;
  hasErrors: boolean;
  hasPhotoError?: boolean;
  onToggleTask: (taskId: string) => void;
  onUpdatePhoto: (taskId: string, photoUrl?: string) => void;
  onMarkAllSectionDone: (sectionId: number) => void;
  onResetSection: (sectionId: number) => void;
  onUpdateResponseType: (sectionId: number, type: 'Cleaned' | 'Needs Cleaning' | 'Deep Cleaning Required') => void;
  onUpdateSectionPhoto: (sectionId: number, photoUrl?: string, mediaList?: string[]) => void;
  onBackToLocationSelect: () => void;
  onNextStepToSection10: () => void;
}

export const ChecklistSectionView: React.FC<ChecklistSectionViewProps> = ({
  section,
  selectedLocation,
  language,
  speechSpeed,
  speakingId,
  hasErrors,
  hasPhotoError = false,
  onToggleTask,
  onUpdatePhoto,
  onMarkAllSectionDone,
  onResetSection,
  onUpdateResponseType,
  onUpdateSectionPhoto,
  onBackToLocationSelect,
  onNextStepToSection10,
}) => {
  const isHindi = language === 'hi-IN';
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const tasks = section.tasks || [];
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const allCompleted = totalCount > 0 && completedCount === totalCount;

  // Media list attached (both single photoUpload and multiple mediaUploads)
  const mediaList = section.mediaUploads || (section.photoUpload ? [section.photoUpload] : []);
  const hasUploadedMedia = mediaList.length > 0;

  // Speak section title & summary
  const handleReadSectionOverview = () => {
    const title = isHindi ? section.titleHi : section.titleEn;
    const locName = selectedLocation ? (isHindi ? selectedLocation.nameHi : selectedLocation.nameEn) : '';
    const desc = isHindi ? section.descriptionHi : section.descriptionEn;
    const stats = isHindi
      ? `कुल ${totalCount} कार्य हैं, जिनमें से ${completedCount} पूरे हुए हैं।`
      : `Total ${totalCount} tasks, ${completedCount} completed.`;

    const textToSpeak = `${locName}। ${title}। ${desc}। ${stats}`;
    speakText(textToSpeak, language, `section-intro-${section.id}`, speechSpeed);
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newMediaUrls: string[] = [];
    const fileArray: File[] = Array.from(files);

    fileArray.forEach((file: File) => {
      // Use URL.createObjectURL or FileReader
      try {
        const objectUrl = URL.createObjectURL(file);
        newMediaUrls.push(objectUrl);
      } catch {
        // Fallback to FileReader
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            newMediaUrls.push(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    });

    const updatedList = [...mediaList, ...newMediaUrls];
    onUpdateSectionPhoto(section.id, updatedList[0], updatedList);

    // Speak positive confirmation
    const confirmSpeech = isHindi
      ? 'फोटो सफलतापूर्वक संलग्न की गई।'
      : 'Proof photo attached successfully.';
    speakText(confirmSpeech, language, 'media-upload-success', speechSpeed);
  };

  const handleRemoveMedia = (indexToRemove: number) => {
    const updatedList = mediaList.filter((_, idx) => idx !== indexToRemove);
    onUpdateSectionPhoto(section.id, updatedList[0] || undefined, updatedList);
  };

  const RESPONSE_OPTIONS: Array<{
    id: 'Cleaned' | 'Needs Cleaning' | 'Deep Cleaning Required';
    labelEn: string;
    labelHi: string;
    color: string;
  }> = [
    {
      id: 'Cleaned',
      labelEn: 'Cleaned',
      labelHi: 'साफ किया गया',
      color: 'border-emerald-500 bg-emerald-50 text-emerald-900',
    },
    {
      id: 'Needs Cleaning',
      labelEn: 'Needs Cleaning',
      labelHi: 'सफाई की आवश्यकता है',
      color: 'border-amber-500 bg-amber-50 text-amber-900',
    },
    {
      id: 'Deep Cleaning Required',
      labelEn: 'Deep Cleaning Required',
      labelHi: 'गहरी सफाई (डीप क्लीनिंग) आवश्यक है',
      color: 'border-red-500 bg-red-50 text-red-900',
    },
  ];

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Top Header Card: Back to Location Selection & Status */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <button
            type="button"
            id="btn-back-to-locations"
            onClick={onBackToLocationSelect}
            className="px-4 py-2.5 rounded-2xl bg-stone-900 hover:bg-black text-white font-black text-xs sm:text-sm flex items-center gap-2 transition active:scale-95 shadow-md"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400 stroke-[2.5]" />
            <span>{isHindi ? '⬅ कमरा / क्षेत्र बदलें' : '⬅ Change Room / Location'}</span>
          </button>

          {/* Step Pill */}
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs">
            <span>{isHindi ? 'चरण 2: चेकलिस्ट फ़ॉर्म' : 'Step 2: Area Checklist'}</span>
          </div>
        </div>

        {/* Location & Category Details */}
        <div className="pt-3 border-t border-stone-100 flex items-start justify-between gap-3">
          <div className="space-y-1">
            {selectedLocation && (
              <span className="inline-block text-[11px] font-black uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-lg">
                📍 {isHindi ? selectedLocation.nameHi : selectedLocation.nameEn}
              </span>
            )}
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 leading-tight">
              {isHindi ? section.titleHi : section.titleEn}
            </h2>
            <p className="text-xs text-stone-500 font-medium">
              {isHindi ? section.descriptionHi : section.descriptionEn}
            </p>
          </div>

          <button
            type="button"
            onClick={handleReadSectionOverview}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${
              speakingId === `section-intro-${section.id}`
                ? 'bg-amber-500 text-stone-950 ring-4 ring-amber-300 scale-105'
                : 'bg-stone-50 hover:bg-amber-100 text-stone-800 border-stone-200'
            }`}
            title={isHindi ? 'विवरण सुनें' : 'Listen overview'}
          >
            <Volume2 className="w-5 h-5 text-amber-700" />
          </button>
        </div>

        {/* Section Quick Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-stone-100 text-xs">
          <div className="flex items-center gap-2 font-bold text-stone-700">
            <span
              className={`px-3 py-1 rounded-xl text-xs font-black ${
                allCompleted
                  ? 'bg-emerald-100 text-emerald-800'
                  : completedCount > 0
                  ? 'bg-amber-100 text-amber-900'
                  : 'bg-stone-100 text-stone-700'
              }`}
            >
              {completedCount} / {totalCount} {isHindi ? 'कार्य पूर्ण' : 'Tasks Done'}
            </span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              id="btn-mark-all-done-section"
              onClick={() => onMarkAllSectionDone(section.id)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow-sm transition active:scale-95 text-xs"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>{isHindi ? 'सभी कार्य पूरे करें' : 'Mark All Done'}</span>
            </button>
            <button
              type="button"
              onClick={() => onResetSection(section.id)}
              className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold flex items-center gap-1 transition text-xs"
              title="Reset tasks"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isHindi ? 'रीसेट' : 'Reset'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Validation Alert Banner: Incomplete Tasks */}
      {hasErrors && !allCompleted && (
        <div
          id="validation-error-alert"
          className="p-4 rounded-3xl bg-red-600 text-white shadow-lg flex items-center justify-between gap-3 animate-shake border-2 border-red-700"
        >
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-6 h-6 text-amber-300 shrink-0 animate-pulse" />
            <div>
              <h4 className="font-extrabold text-sm sm:text-base">
                {isHindi
                  ? 'कृपया आगे बढ़ने से पहले लाल रंग वाले सभी कार्य पूरे करें!'
                  : 'Please complete all red highlighted tasks before proceeding!'}
              </h4>
              <p className="text-xs text-red-100">
                {isHindi
                  ? 'जब तक सभी कार्य पूरे नहीं हो जाते, आप अगले चरण (खंड 10) पर नहीं जा सकते।'
                  : 'All tasks must be checked before you can proceed to Section 10.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              speakText(
                isHindi
                  ? 'कृपया छूटे हुए काम पूरे करें और फोटो लें।'
                  : 'Please complete all remaining tasks and capture proof of work.',
                language,
                'validation-audio',
                speechSpeed
              )
            }
            className="w-10 h-10 rounded-xl bg-red-700 hover:bg-red-800 text-white flex items-center justify-center shrink-0"
            title="Listen warning"
          >
            <Volume2 className="w-5 h-5 text-amber-300" />
          </button>
        </div>
      )}

      {/* Checklist Tasks List */}
      <div className="space-y-3" id={`section-tasks-container-${section.id}`}>
        {tasks.map((task, index) => (
          <ChecklistItemCard
            key={task.id}
            task={task}
            index={index}
            language={language}
            speechSpeed={speechSpeed}
            isSpeaking={speakingId === `task-audio-${task.id}`}
            onToggle={onToggleTask}
            onUpdatePhoto={onUpdatePhoto}
          />
        ))}
      </div>

      {/* SECTION EXTRA REQUIREMENTS: MEDIA UPLOAD & RESPONSE TYPE */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-5">
        {/* MEDIA UPLOAD: PROOF OF WORK (PHOTO / VIDEO CAMERA CAPTURE) */}
        <div
          id="proof-of-work-upload-card"
          className={`rounded-3xl p-5 border-2 transition-all duration-300 space-y-4 ${
            hasPhotoError && !hasUploadedMedia
              ? 'border-red-500 bg-red-50/80 ring-4 ring-red-200 animate-shake'
              : hasUploadedMedia
              ? 'border-emerald-500 bg-emerald-50/30'
              : 'border-stone-200 bg-stone-50/60 hover:border-amber-400'
          }`}
        >
          {/* Header of Upload Section */}
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-stone-900 text-amber-400">
                <Camera className="w-3.5 h-3.5" />
                <span>{isHindi ? 'कार्य का प्रमाण (अनिवार्य)' : 'Proof of Work (Mandatory)'}</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-stone-900">
                {isHindi ? 'साफ किए गए क्षेत्र का फोटो / वीडियो लें' : 'Take Photo / Record Video of Cleaned Area'}
              </h3>
              <p className="text-xs text-stone-600 font-medium">
                {isHindi
                  ? 'शिफ्ट खत्म करने से पहले साफ किए गए क्षेत्र का लाइव फोटो या वीडियो खींचना अनिवार्य है।'
                  : 'Capture live camera proof of the cleaned area before proceeding to Section 10.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                speakText(
                  isHindi
                    ? 'कृपया साफ किए गए क्षेत्र का फोटो या वीडियो लें।'
                    : 'Please take a photo or record video of the cleaned area.',
                  language,
                  'photo-instruction-audio',
                  speechSpeed
                )
              }
              className="w-10 h-10 rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-amber-100 flex items-center justify-center shrink-0 transition"
              title={isHindi ? 'निर्देश सुनें' : 'Listen instruction'}
            >
              <Volume2 className="w-4 h-4 text-amber-700" />
            </button>
          </div>

          {/* Missing Photo Error Alert */}
          {hasPhotoError && !hasUploadedMedia && (
            <div
              id="photo-validation-error-alert"
              className="p-3.5 rounded-2xl bg-red-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-between gap-2 shadow-md animate-pulse"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0" />
                <span>
                  {isHindi
                    ? '⚠️ कृपया कमरे की फोटो लें! आगे बढ़ने के लिए फोटो अनिवार्य है।'
                    : '⚠️ Please take a photo of the room! Media proof is required to proceed.'}
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  speakText(
                    isHindi
                      ? 'कृपया छूटे हुए काम पूरे करें और फोटो लें।'
                      : 'Please take a photo of the room before proceeding.',
                    language,
                    'photo-missing-speech',
                    speechSpeed
                  )
                }
                className="w-8 h-8 rounded-lg bg-red-700 text-white flex items-center justify-center shrink-0"
              >
                <Volume2 className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          )}

          {/* Media Previews Grid (if attached) */}
          {hasUploadedMedia && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-800">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {isHindi
                    ? `${mediaList.length} मीडिया फाइल संलग्न (${selectedLocation?.nameEn || 'Room'})`
                    : `${mediaList.length} Media Attached (${selectedLocation?.nameEn || 'Room'})`}
                </span>
                <span className="text-[11px] text-stone-500 font-medium">
                  {isHindi ? 'प्रमाण सत्यापित' : 'Proof Verified'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {mediaList.map((url, idx) => (
                  <div
                    key={idx}
                    className="relative group rounded-2xl overflow-hidden border-2 border-emerald-500 bg-stone-900 aspect-video shadow-md flex items-center justify-center"
                  >
                    <img
                      src={url}
                      alt={`Proof thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-1.5 left-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-bold flex items-center gap-1 backdrop-blur-xs">
                      <ImageIcon className="w-3 h-3 text-amber-400" />
                      #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMedia(idx)}
                      className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-red-600/90 hover:bg-red-700 text-white flex items-center justify-center transition shadow-md"
                      title={isHindi ? 'हटाएं' : 'Remove photo'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MASSIVE PROMINENT CAMERA / VIDEO CAPTURE BUTTON */}
          <div className="pt-1">
            <input
              ref={fileInputRef}
              id="camera-native-file-input"
              type="file"
              accept="image/*,video/*"
              capture="environment"
              multiple
              onChange={handleMediaUpload}
              className="hidden"
            />

            <button
              type="button"
              id="btn-take-photo-proof"
              onClick={() => fileInputRef.current?.click()}
              className={`w-full py-5 px-6 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-3 transition-all duration-200 shadow-xl active:scale-[0.98] ${
                hasPhotoError && !hasUploadedMedia
                  ? 'bg-red-600 hover:bg-red-700 text-white ring-4 ring-red-300'
                  : hasUploadedMedia
                  ? 'bg-stone-900 hover:bg-black text-amber-400 border-2 border-emerald-500'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 ring-4 ring-amber-200'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-black/10 flex items-center justify-center shrink-0">
                <Camera className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="text-left">
                <span className="block leading-tight">
                  {hasUploadedMedia
                    ? isHindi
                      ? '➕ और फोटो / वीडियो जोड़ें'
                      : '➕ Add Another Photo / Video'
                    : isHindi
                    ? '📸 साफ किए गए क्षेत्र का फोटो / वीडियो लें'
                    : '📸 Take Photo / Record Video of Cleaned Area'}
                </span>
                <span className="block text-xs font-semibold opacity-80">
                  {isHindi ? 'कैमरा खोलने के लिए यहाँ टैप करें' : 'Tap to open device camera instantly'}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* RESPONSE TYPE RADIO SELECTION */}
        <div className="space-y-2 pt-3 border-t border-stone-100">
          <label className="block text-sm font-extrabold text-stone-900">
            {isHindi ? 'प्रतिक्रिया का प्रकार (Response Type)' : 'Response Type / Condition Status'}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {RESPONSE_OPTIONS.map((opt) => {
              const isSelected = (section.responseType || 'Cleaned') === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onUpdateResponseType(section.id, opt.id)}
                  className={`p-3 rounded-2xl border-2 font-bold text-xs sm:text-sm text-left transition flex items-center justify-between gap-2 ${
                    isSelected
                      ? `${opt.color} shadow-sm ring-2 ring-stone-900/10`
                      : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div>
                    <p className="font-extrabold">{isHindi ? opt.labelHi : opt.labelEn}</p>
                    <p className="text-[11px] opacity-75 font-medium">
                      {isHindi ? opt.labelEn : opt.labelHi}
                    </p>
                  </div>
                  {isSelected && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* BOTTOM STICKY ACTION BAR: NEXT STEP TO MANDATORY SECTION 10 */}
      <div className="pt-3 pb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToLocationSelect}
          className="w-full sm:w-auto px-5 py-4 rounded-2xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-black text-sm flex items-center justify-center gap-2 transition active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isHindi ? 'कमरा / स्थान बदलें' : 'Change Room / Location'}</span>
        </button>

        <button
          type="button"
          id="btn-next-step"
          onClick={onNextStepToSection10}
          className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition active:scale-95 ring-2 ring-amber-300"
        >
          <span>{isHindi ? 'अगला कदम: खंड 10 (मुद्दे और टिप्पणियां)' : 'Next Step: Section 10 (Issues & Remarks)'}</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
