import React, { useRef } from 'react';
import {
  Volume2,
  Check,
  Camera,
  AlertCircle,
  Sparkles,
  X
} from 'lucide-react';
import { TaskItem, Language } from '../types';
import { speakText, stopSpeaking, playSuccessChime } from '../utils/speechUtils';

interface ChecklistItemCardProps {
  task: TaskItem;
  index: number;
  language: Language;
  speechSpeed: number;
  isSpeaking: boolean;
  onToggle: (taskId: string) => void;
  onUpdatePhoto?: (taskId: string, photoUrl?: string) => void;
}

export const ChecklistItemCard: React.FC<ChecklistItemCardProps> = ({
  task,
  index,
  language,
  speechSpeed,
  isSpeaking,
  onToggle,
  onUpdatePhoto,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const taskTextRef = useRef<HTMLParagraphElement | null>(null);
  const isHindi = language === 'hi-IN';

  const handleAudioSpeak = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isSpeaking) {
      stopSpeaking();
      return;
    }
    // Grab text directly from the button clicked
    const buttonElement = e.currentTarget;
    const textToSpeak = buttonElement.getAttribute('data-hindi') || task.titleHi;

    if (textToSpeak) {
      speakText(textToSpeak, 'hi-IN', `task-audio-${task.id}`, speechSpeed || 0.85);
    }
  };

  const handleCardClick = () => {
    if (!task.completed) {
      playSuccessChime();
    }
    onToggle(task.id);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdatePhoto) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onUpdatePhoto(task.id, reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // State-based card styling:
  // - Error / Unchecked when validation failed: Bright Red background + red border
  // - Completed: Light green + emerald accents
  // - Default: Clean white card with crisp borders
  let cardClass = 'bg-white border-stone-200 text-stone-900 shadow-sm hover:border-stone-300';
  if (task.hasError && !task.completed) {
    cardClass = 'bg-red-50 border-2 border-red-500 text-red-950 shadow-md ring-2 ring-red-300/50 animate-shake';
  } else if (task.completed) {
    cardClass = 'bg-emerald-50/90 border-2 border-emerald-500 text-emerald-950 shadow-sm';
  }

  return (
    <div
      id={`task-item-${task.id}`}
      data-task-id={task.id}
      onClick={handleCardClick}
      className={`task-card task-item relative rounded-2xl p-4 sm:p-5 border transition-all duration-200 cursor-pointer select-none ${cardClass}`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Large Custom Checkbox Toggle Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
          aria-checked={task.completed}
          role="checkbox"
          id={`checkbox-${task.id}`}
          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 border-2 transition-all duration-200 ${
            task.completed
              ? 'bg-emerald-600 border-emerald-700 text-white shadow-md scale-105'
              : task.hasError
              ? 'bg-red-100 border-red-500 text-red-700 font-bold'
              : 'bg-stone-50 border-stone-300 text-transparent hover:border-amber-500 hover:bg-stone-100'
          }`}
          title={task.completed ? 'Mark uncompleted' : 'Mark completed'}
        >
          {task.completed ? (
            <Check className="w-6 h-6 stroke-[3] text-white" />
          ) : task.hasError ? (
            <AlertCircle className="w-6 h-6 text-red-600 animate-pulse" />
          ) : (
            <span className="text-xs font-bold text-stone-400">{index + 1}</span>
          )}
        </button>

        {/* Task Description Body with data-hindi attribute */}
        <div className="flex-1 min-w-0">
          {/* Sub-Category Badge if available */}
          {task.subCategoryEn && (
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-md ${
                  task.completed
                    ? 'bg-emerald-200/70 text-emerald-900'
                    : task.hasError
                    ? 'bg-red-200 text-red-900'
                    : 'bg-stone-100 text-stone-700'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-600" />
                {isHindi ? task.subCategoryHi || task.subCategoryEn : task.subCategoryEn}
              </span>

              {task.completed && (
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-emerald-600 text-white">
                  {isHindi ? 'पूर्ण ✓' : 'Completed ✓'}
                </span>
              )}

              {task.hasError && !task.completed && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-red-600 text-white flex items-center gap-1 animate-pulse">
                  <AlertCircle className="w-3 h-3" />
                  {isHindi ? 'यह कार्य पूरा करें!' : 'Incomplete!'}
                </span>
              )}
            </div>
          )}

          {/* Bilingual Descriptions - exact target for Speech API with data-hindi */}
          <div className="task-text space-y-0.5" data-hindi={task.titleHi}>
            <p
              ref={taskTextRef}
              data-hindi={task.titleHi}
              className={`task-primary-text text-sm sm:text-base font-bold leading-snug ${
                task.completed
                  ? 'text-emerald-950 line-through opacity-85'
                  : task.hasError
                  ? 'text-red-950 font-extrabold'
                  : 'text-stone-900'
              }`}
            >
              {isHindi ? task.titleHi : task.titleEn}
            </p>
            <p
              data-hindi={task.titleHi}
              className={`task-secondary-text text-xs leading-relaxed ${
                task.completed
                  ? 'text-emerald-800/80 opacity-75'
                  : 'text-stone-500 font-medium'
              }`}
            >
              {isHindi ? task.titleEn : task.titleHi}
            </p>
          </div>

          {/* Photo Preview if attached */}
          {task.photoUrl && (
            <div className="mt-2.5 flex items-center gap-2 p-1.5 bg-stone-100 rounded-xl border border-stone-200 max-w-fit">
              <img
                src={task.photoUrl}
                alt="Verification"
                className="w-12 h-12 object-cover rounded-lg border border-stone-300"
              />
              <span className="text-xs font-semibold text-stone-700">
                {isHindi ? 'फोटो संलग्न' : 'Photo Attached'}
              </span>
              {onUpdatePhoto && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdatePhoto(task.id, undefined);
                  }}
                  className="p-1 text-stone-400 hover:text-red-600 rounded-full"
                  title="Remove photo"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Action Controls: Audio Speaker Button & Photo Trigger */}
        <div className="flex flex-col items-center gap-1.5 shrink-0 ml-1">
          {/* Big Speaker Button */}
          <button
            type="button"
            id={`speaker-btn-${task.id}`}
            onClick={handleAudioSpeak}
            data-hindi={task.titleHi}
            className={`audio-btn w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all shadow-sm active:scale-95 ${
              isSpeaking
                ? 'bg-amber-500 text-stone-950 ring-4 ring-amber-300 scale-105'
                : 'bg-stone-100 hover:bg-amber-100 text-stone-800 hover:text-amber-900 border border-stone-200'
            }`}
            title={isHindi ? 'आवाज में सुनें' : 'Listen Task Audio (Hindi)'}
            aria-label="Play Audio"
          >
            <Volume2 className="w-5 h-5 text-amber-700" />
          </button>

          {/* Photo attachment trigger */}
          {onUpdatePhoto && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
                title={isHindi ? 'फोटो जोड़ें' : 'Attach Photo'}
              >
                <Camera className="w-4 h-4" />
              </button>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
