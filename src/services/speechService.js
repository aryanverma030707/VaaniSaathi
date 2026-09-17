// Web Speech API Service with Indian Voice Accent & Authentic Phonetic Articulation

class SpeechService {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.audioContext = null;
    this.availableVoices = [];
    this.indianVoice = null;
    this.initVoices();
    this.initRecognition();
  }

  initVoices() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const loadVoices = () => {
      this.availableVoices = window.speechSynthesis.getVoices();
      
      // Use Hindi voices only so playback keeps a native Hindi accent.
      const hiVoice = this.availableVoices.find(v => 
        v.lang.toLowerCase() === 'hi-in' || v.lang.toLowerCase().startsWith('hi-') || v.name.includes('Hindi') || v.name.includes('हिन्दी')
      );

      this.indianVoice = hiVoice || null;
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  initRecognition() {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'hi-IN'; // Default Hindi speech recognition
    }
  }

  startListening(lang = 'hi-IN', onResult, onError, onEnd) {
    if (!this.recognition) {
      this.initRecognition();
    }

    if (!this.recognition) {
      if (onError) onError('Speech Recognition is not supported in this browser. Please use Chrome/Edge or type manually.');
      return;
    }

    try {
      this.recognition.lang = lang;
      this.isListening = true;

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.playBeep(600, 0.1);
        if (onResult) onResult(transcript);
      };

      this.recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        this.isListening = false;
        if (onError) onError(event.error);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (onEnd) onEnd();
      };

      this.playBeep(440, 0.1);
      this.recognition.start();
    } catch (err) {
      console.warn('Speech recognition start failed:', err);
      this.isListening = false;
      if (onError) onError(err.message || 'Microphone error');
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch {
        // ignore
      }
      this.isListening = false;
    }
  }

  getBestIndianVoice(preferHindi = true) {
    if (!this.availableVoices || this.availableVoices.length === 0) {
      this.availableVoices = window.speechSynthesis.getVoices();
    }

    const hi = this.availableVoices.find(v =>
      v.lang.toLowerCase() === 'hi-in' || v.lang.toLowerCase().startsWith('hi-') || v.name.includes('Hindi') || v.name.includes('हिन्दी')
    );
    if (hi) return hi;

    if (preferHindi) return null;

    const enIn = this.availableVoices.find(v => 
      v.lang === 'en-IN' || v.name.includes('India') || v.name.includes('Ravi') || v.name.includes('Heera')
    );
    if (enIn) return enIn;

    return this.indianVoice;
  }

  // Speak clear Hindi text with native Indian accent
  speakText(text, rate = 0.9) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = this.getBestIndianVoice(true);
    if (voice) utterance.voice = voice;
    utterance.lang = 'hi-IN';
    utterance.rate = rate;
    utterance.pitch = 1.0;

    window.speechSynthesis.speak(utterance);
  }

  // Convert Romanized Santali phonetics to natural Indic phonetic sounds
  // to ensure Indian voices pronounce it natively rather than Americanizing it!
  romanToIndicPhonetic(romanText) {
    let t = romanText.toLowerCase().trim();
    // Common Santali sound replacements to Devanagari syllables
    const soundMap = [
      [/chenre/g, 'चेनड़े'],
      [/dare/g, 'दारे'],
      [/durub/g, 'दुरुब'],
      [/kate/g, 'काते'],
      [/seren/g, 'सेरेङ'],
      [/edaya/g, 'एदाया'],
      [/eda/g, 'एदा'],
      [/joto/g, 'जोतो'],
      [/gidrạ|gidra/g, 'गिदरा'],
      [/am|amag/g, 'आमाग'],
      [/puthi/g, 'पुथी'],
      [/khulạu|khulau/g, 'खुलाऊ'],
      [/dag/g, 'दाग'],
      [/ñu|nu/g, 'ञू'],
      [/chalag/g, 'चालाग'],
      [/heñ|hen/g, 'हें'],
      [/paikhana/g, 'पायखाना'],
      [/pencil/g, 'पेंसिल'],
      [/ad ena/g, 'आद एना'],
      [/bujhạu|bujhau/g, 'बुझाऊ'],
      [/rengej/g, 'रेङ्गेज'],
      [/kidiña/g, 'किदिञा'],
      [/mit|mittang/g, 'मिद'],
      [/bar|barya/g, 'बार'],
      [/pe|peya/g, 'पे'],
      [/pun/g, 'पुन'],
      [/monre/g, 'मोणे'],
      [/turuy/g, 'तुरुय'],
      [/eyay/g, 'एयाय'],
      [/irạl|iral/g, 'इरल'],
      [/are/g, 'आरे'],
      [/gel/g, 'गेल'],
      [/miru/g, 'मीरु'],
      [/marag/g, 'माराग'],
      [/bir/g, 'बीर'],
      [/seta/g, 'सेता'],
      [/orag/g, 'ओड़ाग'],
      [/daka/g, 'दाका'],
      [/jom/g, 'जोम'],
      [/ayo/g, 'आयो'],
      [/baba/g, 'बाबा'],
      [/sabon/g, 'साबोन'],
      [/ti/g, 'ती'],
      [/arub/g, 'आरुब'],
      [/sarhao/g, 'सारहाव'],
      [/adi bhạgi/g, 'आडी भागी'],
      [/ch/g, 'च'],
      [/sh/g, 'श'],
      [/th/g, 'थ'],
      [/dh/g, 'ध'],
      [/kh/g, 'ख'],
      [/gh/g, 'घ'],
      [/bh/g, 'भ'],
      [/jh/g, 'झ'],
      [/ng/g, 'ङ'],
      [/ny|ñ/g, 'ञ'],
      [/r/g, 'र'],
      [/a/g, 'ा'],
      [/e/g, 'े'],
      [/i/g, 'ि'],
      [/o/g, 'ो'],
      [/u/g, 'ु']
    ];

    for (const [pattern, replacement] of soundMap) {
      t = t.replace(pattern, replacement);
    }
    return t;
  }

  // Speak phonetic Santali using an Indian voice
  speakSantaliPhonetic(romanText, rate = 0.82) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    // Prefer a Hindi voice so phonetic Santali is pronounced with a Hindi accent.
    const voice = this.getBestIndianVoice(true);
    
    // Convert to Indic phonetic sound string
    const phoneticIndic = this.romanToIndicPhonetic(romanText);

    // If Hindi voice is found, speak the Indic phonetics so it sounds 100% Indian!
    const textToSpeak = voice?.lang?.startsWith('hi') ? phoneticIndic : romanText;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    if (voice) utterance.voice = voice;
    utterance.lang = voice?.lang || 'hi-IN';
    utterance.rate = rate; // slightly deliberate for clear rural classroom articulation
    utterance.pitch = 1.0;

    window.speechSynthesis.speak(utterance);
  }

  // Gentle audio chime feedback
  playBeep(frequency = 520, duration = 0.15) {
    try {
      if (!this.audioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.audioContext = new AudioCtx();
      }
      if (!this.audioContext) return;

      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.type = 'sine';
      osc.frequency.value = frequency;
      gain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.audioContext.destination);
      osc.start();
      osc.stop(this.audioContext.currentTime + duration);
    } catch {
      // AudioContext may require user gesture
    }
  }
}

export const speechService = new SpeechService();

export function getIndicPhoneticSounds(romanText) {
  if (!romanText) return '';
  return speechService.romanToIndicPhonetic(romanText);
}
