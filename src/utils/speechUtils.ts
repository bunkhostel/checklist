import { Language } from '../types';

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Play pleasant synthetic chime for completing a task
export function playSuccessChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(659.25, now);
    osc.frequency.exponentialRampToValueAtTime(987.77, now + 0.12);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  } catch {
    // Ignore audio autoplay restrictions
  }
}

// Play alert tone when validation finds missing tasks
export function playAlertTone() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.setValueAtTime(330, now + 0.15);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  } catch {
    // Ignore
  }
}

// Play mic start listening tone (rising chirp)
export function playMicStartBeep() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  } catch {
    // Ignore
  }
}

// Play mic stop listening tone (descending chirp)
export function playMicStopBeep() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(780, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.14);

    gain.gain.setValueAtTime(0.16, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  } catch {
    // Ignore
  }
}

// Voice synthesis status tracking
let currentSpeakingId: string | null = null;
let speakingListeners: ((speakingId: string | null) => void)[] = [];

export function subscribeSpeakingStatus(listener: (speakingId: string | null) => void) {
  speakingListeners.push(listener);
  return () => {
    speakingListeners = speakingListeners.filter(l => l !== listener);
  };
}

function notifySpeaking(id: string | null) {
  currentSpeakingId = id;
  speakingListeners.forEach(l => l(id));
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    notifySpeaking(null);
  }
}

let availableVoices: SpeechSynthesisVoice[] = [];

// Force voices to load asynchronously for mobile browsers
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  availableVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    availableVoices = window.speechSynthesis.getVoices();
  };
}

/**
 * Speaks exact text string using Web Speech API.
 * Ensures the actual content string is read out smoothly.
 */
export function speakText(
  text: string,
  lang: Language = 'hi-IN',
  elementId?: string,
  rate: number = 0.85
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis is not supported in this browser.');
    return;
  }

  // Cancel any currently playing audio
  window.speechSynthesis.cancel();

  // Strip any accidental English or HTML if passed, ensuring pure clean text
  const cleanText = text ? text.trim() : '';
  if (!cleanText) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = lang || 'hi-IN';
  utterance.rate = rate; // 0.85 for clear mobile comprehension
  utterance.pitch = 1.0;

  // Fallback if voices array is still empty
  if (availableVoices.length === 0) {
    availableVoices = window.speechSynthesis.getVoices();
  }

  // Find the best Hindi voice
  const hindiVoice = availableVoices.find(
    v =>
      v.lang === 'hi-IN' ||
      v.lang === 'hi_IN' ||
      v.lang.includes('hi') ||
      (v.name && (v.name.toLowerCase().includes('hindi') || v.name.includes('हिन्दी') || v.name.toLowerCase().includes('lekha') || v.name.toLowerCase().includes('kalpana')))
  );

  if (hindiVoice) {
    utterance.voice = hindiVoice;
  }

  utterance.onstart = () => {
    notifySpeaking(elementId || 'global');
  };

  utterance.onend = () => {
    notifySpeaking(null);
  };

  utterance.onerror = () => {
    notifySpeaking(null);
  };

  // Workaround for Chrome speech synthesis pauses
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }

  window.speechSynthesis.speak(utterance);
}

// ==========================================
// HINDI SPEECH RECOGNITION (SPEECH-TO-TEXT)
// ==========================================

export interface SpeechRecognitionResultPayload {
  transcript: string;
  isFinal: boolean;
}

export interface SpeechRecognitionOptions {
  lang?: Language;
  continuous?: boolean;
  interimResults?: boolean;
  onStart?: () => void;
  onResult: (payload: SpeechRecognitionResultPayload) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
}

// Check if Web Speech API Speech Recognition is supported
export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
}

/**
 * Start listening for Hindi / English speech and transcribe in real-time.
 * Returns an object with `stop` and `abort` methods.
 */
export function startHindiTranscription(options: SpeechRecognitionOptions): {
  stop: () => void;
  abort: () => void;
} {
  if (typeof window === 'undefined') {
    options.onError?.('Window is not defined.');
    return { stop: () => {}, abort: () => {} };
  }

  // Stop any ongoing TTS speech so microphone doesn't pick up computer audio
  stopSpeaking();

  const SpeechRecognitionClass =
    (window as unknown as { SpeechRecognition: any }).SpeechRecognition ||
    (window as unknown as { webkitSpeechRecognition: any }).webkitSpeechRecognition;

  if (!SpeechRecognitionClass) {
    options.onError?.('Speech recognition is not supported in this browser. Please use Google Chrome or Edge.');
    return { stop: () => {}, abort: () => {} };
  }

  let recognition: any = null;

  try {
    recognition = new SpeechRecognitionClass();
    recognition.lang = options.lang || 'hi-IN';
    recognition.continuous = options.continuous ?? false;
    recognition.interimResults = options.interimResults ?? true;
    recognition.maxAlternatives = 1;

    playMicStartBeep();

    recognition.onstart = () => {
      options.onStart?.();
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        const text = result[0]?.transcript || '';
        if (result.isFinal) {
          finalTranscript += text;
        } else {
          interimTranscript += text;
        }
      }

      if (finalTranscript.trim()) {
        options.onResult({
          transcript: finalTranscript.trim(),
          isFinal: true,
        });
      } else if (interimTranscript.trim()) {
        options.onResult({
          transcript: interimTranscript.trim(),
          isFinal: false,
        });
      }
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition event error:', event.error);
      playMicStopBeep();
      let errorMsg = 'माइक्रोफ़ोन त्रुटि हुई (Microphone error)';
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        errorMsg = 'माइक्रोफ़ोन की अनुमति नहीं मिली (Microphone permission denied)';
      } else if (event.error === 'no-speech') {
        errorMsg = 'कोई आवाज़ सुनाई नहीं दी, कृपया दोबारा बोलें (No speech detected)';
      } else if (event.error === 'network') {
        errorMsg = 'नेटवर्क त्रुटि (Network error with speech service)';
      }
      options.onError?.(errorMsg);
    };

    recognition.onend = () => {
      playMicStopBeep();
      options.onEnd?.();
    };

    recognition.start();

    return {
      stop: () => {
        try {
          recognition?.stop();
        } catch {
          // Ignore
        }
      },
      abort: () => {
        try {
          recognition?.abort();
        } catch {
          // Ignore
        }
      },
    };
  } catch (err: any) {
    options.onError?.(err?.message || 'Could not start speech recognition');
    return { stop: () => {}, abort: () => {} };
  }
}


