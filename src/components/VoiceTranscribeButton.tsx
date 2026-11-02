import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Sparkles, X, Check, Volume2, AlertCircle } from 'lucide-react';
import { Language } from '../types';
import {
  startHindiTranscription,
  isSpeechRecognitionSupported,
  speakText,
} from '../utils/speechUtils';

interface VoiceTranscribeButtonProps {
  onTranscript: (transcribedText: string, mode: 'append' | 'replace') => void;
  language?: Language;
  fieldName?: string;
  currentValue?: string;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const VoiceTranscribeButton: React.FC<VoiceTranscribeButtonProps> = ({
  onTranscript,
  language = 'hi-IN',
  fieldName = 'फील्ड',
  currentValue = '',
  placeholder = 'बोलकर लिखें...',
  size = 'md',
  showLabel = true,
  className = '',
}) => {
  const isHindi = language === 'hi-IN';
  const [isListening, setIsListening] = useState<boolean>(false);
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [insertMode, setInsertMode] = useState<'append' | 'replace'>('append');
  const [isSupported, setIsSupported] = useState<boolean>(true);

  const recognitionHandleRef = useRef<{ stop: () => void; abort: () => void } | null>(null);

  useEffect(() => {
    setIsSupported(isSpeechRecognitionSupported());
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionHandleRef.current) {
        recognitionHandleRef.current.abort();
      }
    };
  }, []);

  const handleToggleListening = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isListening) {
      // Stop listening and apply transcript
      recognitionHandleRef.current?.stop();
      setIsListening(false);
      if (liveTranscript.trim()) {
        onTranscript(liveTranscript.trim(), insertMode);
      }
      return;
    }

    setErrorMessage(null);
    setLiveTranscript('');

    const handle = startHindiTranscription({
      lang: 'hi-IN',
      continuous: true,
      interimResults: true,
      onStart: () => {
        setIsListening(true);
      },
      onResult: (payload) => {
        setLiveTranscript(payload.transcript);
        if (payload.isFinal) {
          // Immediately send final result if user paused
          onTranscript(payload.transcript, insertMode);
        }
      },
      onError: (err) => {
        setIsListening(false);
        setErrorMessage(err);
      },
      onEnd: () => {
        setIsListening(false);
      },
    });

    recognitionHandleRef.current = handle;
  };

  const handleApplyTranscript = () => {
    if (liveTranscript.trim()) {
      onTranscript(liveTranscript.trim(), insertMode);
      setLiveTranscript('');
    }
    recognitionHandleRef.current?.stop();
    setIsListening(false);
  };

  const handleCancel = () => {
    recognitionHandleRef.current?.abort();
    setIsListening(false);
    setLiveTranscript('');
    setErrorMessage(null);
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-xs sm:text-sm',
    lg: 'px-4 py-2 text-sm sm:text-base',
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {/* Main Trigger Button */}
      <button
        type="button"
        onClick={handleToggleListening}
        aria-label={isHindi ? 'हिंदी में बोलकर लिखें' : 'Transcribe Hindi Speech'}
        className={`inline-flex items-center gap-1.5 font-black rounded-xl transition-all shadow-sm active:scale-95 select-none ${
          isListening
            ? 'bg-red-600 text-white ring-4 ring-red-300 animate-pulse'
            : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
        } ${sizeClasses[size]}`}
        title={
          isListening
            ? isHindi
              ? 'रोकने और जोड़ने के लिए टैप करें'
              : 'Tap to stop and apply'
            : isHindi
            ? 'हिंदी में बोलकर लिखें (वॉइस ट्रांसक्राइब)'
            : 'Voice Transcribe in Hindi (Speech-to-Text)'
        }
      >
        {isListening ? (
          <>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <MicOff className="w-4 h-4 text-white animate-bounce" />
            {showLabel && <span>{isHindi ? 'सुन रहा हूँ... (रोकें)' : 'Listening... (Stop)'}</span>}
          </>
        ) : (
          <>
            <Mic className="w-4 h-4 text-amber-800" />
            {showLabel && (
              <span>{isHindi ? '🎙️ बोलकर लिखें (Hindi)' : '🎙️ Hindi Voice'}</span>
            )}
          </>
        )}
      </button>

      {/* Floating Active Transcription Modal / Overlay when recording */}
      {isListening && (
        <div className="absolute right-0 top-full mt-2 z-50 w-72 sm:w-80 p-3.5 bg-stone-900 text-white rounded-2xl shadow-2xl border border-stone-700 animate-scaleUp">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-stone-800 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
              <span>{isHindi ? `🎤 ${fieldName} के लिए बोलें` : `🎤 Dictate for ${fieldName}`}</span>
            </div>
            <button
              type="button"
              onClick={handleCancel}
              className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Real-time speech transcript bubble */}
          <div className="my-2.5 p-2.5 bg-stone-800/90 rounded-xl min-h-[56px] flex flex-col justify-center border border-stone-700">
            {liveTranscript ? (
              <p className="text-sm font-bold text-white leading-snug break-words">
                "{liveTranscript}"
              </p>
            ) : (
              <p className="text-xs text-stone-400 italic flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>{isHindi ? 'हिंदी में स्पष्ट बोलें (उदा. चादर बदली गई)...' : 'Speak clearly in Hindi...'}</span>
              </p>
            )}
          </div>

          {/* Mode switch: Append vs Replace */}
          {currentValue && (
            <div className="flex items-center justify-between text-[11px] font-bold text-stone-300 mb-2">
              <span>{isHindi ? 'जोड़ने का तरीका:' : 'Mode:'}</span>
              <div className="flex items-center gap-1 bg-stone-800 p-0.5 rounded-lg border border-stone-700">
                <button
                  type="button"
                  onClick={() => setInsertMode('append')}
                  className={`px-2 py-0.5 rounded ${
                    insertMode === 'append' ? 'bg-amber-500 text-stone-950' : 'text-stone-400'
                  }`}
                >
                  {isHindi ? '+ जोड़ें (Append)' : '+ Append'}
                </button>
                <button
                  type="button"
                  onClick={() => setInsertMode('replace')}
                  className={`px-2 py-0.5 rounded ${
                    insertMode === 'replace' ? 'bg-amber-500 text-stone-950' : 'text-stone-400'
                  }`}
                >
                  {isHindi ? 'बदलें (Replace)' : 'Replace'}
                </button>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleApplyTranscript}
              disabled={!liveTranscript.trim()}
              className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>{isHindi ? 'फ़ॉर्म में डालें (Insert)' : 'Apply to Field'}</span>
            </button>
            <button
              type="button"
              onClick={handleToggleListening}
              className="py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1"
            >
              <MicOff className="w-3.5 h-3.5" />
              <span>{isHindi ? 'रोकें' : 'Stop'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Error alert toast */}
      {errorMessage && (
        <div className="absolute right-0 top-full mt-2 z-50 w-72 p-2.5 bg-red-900 text-white rounded-xl text-xs shadow-xl border border-red-700 flex items-start justify-between gap-2 animate-shake">
          <div className="flex items-start gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <p className="font-semibold">{errorMessage}</p>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-red-300 hover:text-white p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
