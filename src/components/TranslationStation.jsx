import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  PlusCircle, 
  Check, 
  Layers,
  Key,
  X,
  Send,
  RefreshCw,
  Radio
} from 'lucide-react';
import { speechService } from '../services/speechService';
import { 
  translateWithGemini, 
  findLocalVerifiedMatch, 
  getGeminiApiKey, 
  setGeminiApiKey 
} from '../services/geminiService';
import { STUDENT_TAP_PALETTE } from '../data/verifiedPhrasebook';
import { offlineStorage } from '../services/offlineStorage';

export default function TranslationStation({ onAddToWorksheet, isOffline }) {
  const [activeSpeaker, setActiveSpeaker] = useState('teacher'); // 'teacher' (hi->sa) or 'student' (sa->hi)
  const [inputText, setInputText] = useState('चिड़िया पेड़ पर बैठकर गाना गाती है।');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [translationResult, setTranslationResult] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState(0.82); // 0.82x for authentic clear articulation
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Gemini API Key Modal
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [currentKey, setCurrentKey] = useState('');

  // Initial load
  useEffect(() => {
    const key = getGeminiApiKey();
    setCurrentKey(key);
    setApiKeyInput(key);
    handleTranslate(inputText, 'hi_to_sa');
  }, []);

  const handleSaveApiKey = () => {
    setGeminiApiKey(apiKeyInput);
    setCurrentKey(apiKeyInput);
    setIsKeyModalOpen(false);
    // Retranslate with new key
    handleTranslate(inputText, activeSpeaker === 'teacher' ? 'hi_to_sa' : 'sa_to_hi');
  };

  const handleTranslate = async (textToTranslate, direction = 'hi_to_sa') => {
    if (!textToTranslate || !textToTranslate.trim()) return;
    setIsLoading(true);

    try {
      let result;
      if (isOffline && !currentKey) {
        // Use 100% offline local matching & dynamic lexicon
        result = findLocalVerifiedMatch(textToTranslate, direction);
      } else {
        // Use Gemini Flash with local fallback
        result = await translateWithGemini(textToTranslate, direction);
      }

      setTranslationResult(result);

      // Log lesson activity for offline telemetry
      offlineStorage.logLessonActivity({
        source_text: textToTranslate,
        target_text: result.santali_olchiki || result.hindi,
        direction,
        confidence: result.confidence
      });
    } catch (err) {
      console.warn('Translation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const startVoiceInput = () => {
    const lang = 'hi-IN';
    setIsListening(true);

    speechService.startListening(
      lang,
      (transcript) => {
        setInputText(transcript);
        setIsListening(false);
        handleTranslate(transcript, activeSpeaker === 'teacher' ? 'hi_to_sa' : 'sa_to_hi');
      },
      (error) => {
        console.warn('Voice recognition error:', error);
        setIsListening(false);
      },
      () => setIsListening(false)
    );
  };

  const stopVoiceInput = () => {
    speechService.stopListening();
    setIsListening(false);
  };

  const playAudio = () => {
    if (!translationResult) return;
    setIsPlayingAudio(true);

    if (activeSpeaker === 'teacher') {
      // Speak authentic phonetic Santali with Indian accent
      speechService.speakSantaliPhonetic(translationResult.santali_roman, audioSpeed);
    } else {
      // Speak Hindi translation with Indian accent
      speechService.speakText(translationResult.hindi, 0.9);
    }

    setTimeout(() => setIsPlayingAudio(false), 2400);
  };

  const playCustomText = (text, isHindi = false) => {
    if (isHindi) {
      speechService.speakText(text, 0.9);
    } else {
      speechService.speakSantaliPhonetic(text, audioSpeed);
    }
  };

  const handleTapPalette = (item) => {
    setActiveSpeaker('student');
    setInputText(item.label_sa);
    const mockResult = {
      santali_olchiki: item.label_sa,
      santali_roman: item.phonetic,
      hindi: item.reply_hi,
      confidence: 100,
      nipun_competency: 'Student Urgent Need',
      cultural_note: 'One-tap emergency communication tile for shy learners.',
      suggested_reply: item.label_sa,
      source: 'tap_palette',
      is_verified_fallback: true
    };
    setTranslationResult(mockResult);
    speechService.speakSantaliPhonetic(item.phonetic, audioSpeed);
  };

  const handleAddCurrentToWorksheet = () => {
    if (!translationResult) return;
    if (onAddToWorksheet) {
      onAddToWorksheet({
        hindi: activeSpeaker === 'teacher' ? inputText : translationResult.hindi,
        santali: translationResult.santali_olchiki,
        roman: translationResult.santali_roman
      });
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Top Banner with Indian Voice Accent Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 px-4 py-2.5 rounded-2xl text-xs shadow-sm">
        
        {/* Accent Status */}
        <div className="flex items-center space-x-2 text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>आवाज़ उच्चारण: <strong>भारतीय हिंदी/संताली लहजा (Indian Accent)</strong></span>
          <button 
            onClick={() => speechService.speakSantaliPhonetic('Chenre dare re durub akana', 0.82)}
            className="text-emerald-700 hover:underline text-[11px] ml-1"
          >
            (टेस्ट सुनें)
          </button>
        </div>

        {/* Gemini AI Status badge (read-only, no key input) */}
        <div className="flex items-center space-x-1.5 px-3 py-1 rounded-xl font-semibold border bg-emerald-50 border-emerald-200 text-emerald-700 text-[11px]">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Gemini AI: सक्रिय (Active)</span>
        </div>

      </div>

      {/* Speaker Mode Switcher: Teacher vs Student Voice */}
      <div className="bg-white border border-slate-200 p-2 rounded-2xl flex items-center justify-between shadow-sm">
        
        <button
          onClick={() => {
            setActiveSpeaker('teacher');
            const defaultHi = 'चिड़िया पेड़ पर बैठकर गाना गाती है।';
            setInputText(defaultHi);
            handleTranslate(defaultHi, 'hi_to_sa');
          }}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer ${
            activeSpeaker === 'teacher'
              ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className={`w-2.5 h-2.5 rounded-full ${activeSpeaker === 'teacher' ? 'bg-white/60' : 'bg-amber-200'}`}></span>
          <span>🔵 शिक्षक माइक (Teacher: Hindi ➔ Santali)</span>
        </button>

        <button
          onClick={() => {
            setActiveSpeaker('student');
            const defaultSa = 'ᱤᱧ ᱫᱟᱜ ᱧᱩ ᱤᱧ ᱪᱟᱞᱟᱜ-ᱟ?';
            setInputText(defaultSa);
            handleTranslate(defaultSa, 'sa_to_hi');
          }}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer ${
            activeSpeaker === 'student'
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
              : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
          }`}
        >
          <span className={`w-2.5 h-2.5 rounded-full ${activeSpeaker === 'student' ? 'bg-white/60' : 'bg-emerald-200'}`}></span>
          <span>🟢 विद्यार्थी माइक (Student: Santali ➔ Hindi)</span>
        </button>

      </div>

      {/* Main Interactive Station Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-6 relative overflow-hidden">
        
        {/* Active Mode Banner */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-2">
            <span className={`w-3 h-3 rounded-full ${activeSpeaker === 'teacher' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-400 animate-pulse'}`}></span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              {activeSpeaker === 'teacher' ? 'शिक्षक मोड (Teacher Input)' : 'विद्यार्थी मोड (Two-Way Student Voice)'}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {translationResult?.source === 'gemini_flash' ? (
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 border border-emerald-200 text-emerald-700">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Gemini Flash Live</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 border border-emerald-200 text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Verified PALASH Grounded</span>
              </span>
            )}

            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md font-mono">
              विश्सनीयता: {translationResult?.confidence || 95}%
            </span>
          </div>
        </div>

        {/* Input Text & Action Buttons */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-500 flex items-center justify-between">
            <span>
              {activeSpeaker === 'teacher' 
                ? 'अपना कस्टम वाक्य लिखें या बोलें (Type Any Hindi Sentence):' 
                : 'विद्यार्थी की बात (Santali Voice/Text):'}
            </span>
            <span className="text-[11px] text-emerald-600">
              {activeSpeaker === 'teacher' ? 'कस्टम पाठ अनुवाद' : 'दो-तरफ़ा संवाद'}
            </span>
          </label>

          {/* Combined Input Bar with Direct Translate & Voice Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1 flex items-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleTranslate(inputText, activeSpeaker === 'teacher' ? 'hi_to_sa' : 'sa_to_hi');
                  }
                }}
                placeholder={activeSpeaker === 'teacher' ? 'कोई भी हिंदी वाक्य लिखें (उदा. बच्चे मैदान में खेल रहे हैं)...' : 'उदा. ᱤᱧ ᱫᱟᱜ ᱧᱩ ᱤᱧ ᱪᱟᱞᱟᱜ-ᱟ?...'}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 pr-20 text-slate-900 text-base focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-400 transition-all placeholder:text-slate-400"
              />

              {/* Clear button if text exists */}
              {inputText && (
                <button
                  type="button"
                  onClick={() => setInputText('')}
                  className="absolute right-12 text-slate-400 hover:text-slate-600 p-1"
                  title="Clear text"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Voice Mic Button inside input */}
              <button
                type="button"
                onClick={isListening ? stopVoiceInput : startVoiceInput}
                className={`absolute right-2 w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  isListening
                    ? 'bg-red-500 text-white animate-bounce shadow-lg shadow-red-500/30'
                    : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700'
                }`}
                title="माइक से बोलें (Click to Speak)"
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            </div>

            {/* DEDICATED TRANSLATE BUTTON */}
            <button
              type="button"
              disabled={isLoading || !inputText.trim()}
              onClick={() => handleTranslate(inputText, activeSpeaker === 'teacher' ? 'hi_to_sa' : 'sa_to_hi')}
              className="px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50 cursor-pointer shrink-0"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
              ) : (
                <Sparkles className="w-4 h-4 text-white" />
              )}
              <span>{isLoading ? 'अनुवाद हो रहा है...' : 'अनुवाद करें (Translate)'}</span>
            </button>
          </div>

          {/* Quick Preset Prompts */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="text-[11px] text-slate-400 self-center">उदा. त्वरित वाक्य:</span>
            {(activeSpeaker === 'teacher' ? [
              'चिड़िया पेड़ पर बैठकर गाना गाती है।',
              'बच्चे स्कूल में खेल रहे हैं।',
              'पेड़ हमें मीठे फल देते हैं।',
              'एक, दो, तीन, चार, पांच।'
            ] : [
              'ᱤᱧ ᱫᱟᱜ ᱧᱩ ᱤᱧ ᱪᱟᱞᱟᱜ-ᱟ?',
              'ᱤᱧᱟᱜ ᱯᱮᱱᱥᱤᱞ ᱟᱫ ᱮᱱᱟ᱾',
              'ᱤᱧ ᱵᱟᱹᱧ ᱵᱩᱡᱷᱟᱹᱣ ᱞᱮᱫᱟ᱾',
              'ᱤᱧ ᱨᱮᱸᱜᱮᱡ ᱠᱤᱫᱤᱧᱟ᱾'
            ]).map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputText(preset);
                  handleTranslate(preset, activeSpeaker === 'teacher' ? 'hi_to_sa' : 'sa_to_hi');
                }}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all cursor-pointer"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Translation Output Display Card */}
        {translationResult && (
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-inner">
            
            {/* Header with Competency */}
            <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-3">
              <span className="text-slate-400 font-medium flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>निपुण भारत लक्ष्य: <strong className="text-slate-200">{translationResult.nipun_competency}</strong></span>
              </span>

              {/* Playback speed toggle */}
              <div className="flex items-center space-x-1.5 text-[11px] text-slate-400">
                <span>गति:</span>
                <button
                  onClick={() => setAudioSpeed(0.82)}
                  className={`px-2 py-0.5 rounded cursor-pointer ${audioSpeed === 0.82 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800'}`}
                >
                  0.82x (धीमी)
                </button>
                <button
                  onClick={() => setAudioSpeed(1.0)}
                  className={`px-2 py-0.5 rounded cursor-pointer ${audioSpeed === 1.0 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800'}`}
                >
                  1.0x
                </button>
              </div>
            </div>

            {/* 3 MANDATORY OUTPUT LAYERS: SANTALI SCRIPT, INDIC PHONETICS, AND TRUE HINDI TRANSLATION */}
            <div className="space-y-4">
              
              {/* 1. TEXT WRITTEN IN SANTALI LANGUAGE (OL CHIKI SCRIPT) */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/30 via-orange-950/20 to-slate-900 border border-amber-500/30 space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-amber-400 tracking-wider uppercase">
                  <span>1. संताली भाषा (Santali in Ol Chiki Script)</span>
                  <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded text-amber-300 font-normal">ओल चिकी लिपि</span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-amber-300 font-olchiki tracking-wide leading-relaxed pt-1">
                  {translationResult.santali_olchiki}
                </div>
              </div>

              {/* 2. INDIC PHONETIC SOUNDS (DEVANAGARI & ROMAN PRONUNCIATION) */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-400 tracking-wider uppercase">
                    2. भारतीय ध्वन्यात्मक उच्चारण (Indic Phonetic Sounds)
                  </span>
                  <button
                    onClick={playAudio}
                    className="flex items-center space-x-1.5 px-3 py-1 rounded-lg font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 shadow cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isPlayingAudio ? 'बोल रहा है...' : 'संताली में सुनें (Indian Voice)'}</span>
                  </button>
                </div>
                <div className="text-xl font-bold text-white font-sans">
                  "{speechService.romanToIndicPhonetic(translationResult.santali_roman)}"
                </div>
                <div className="text-xs text-slate-400 italic">
                  रोमन उच्चारण (Roman Guide): {translationResult.santali_roman}
                </div>
              </div>

              {/* 3. TRUE TRANSLATION IN HINDI */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-[11px] font-bold text-emerald-700 tracking-wider uppercase">
                  3. शुद्ध हिंदी अनुवाद (True Translation in Hindi)
                </div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900">
                  "{translationResult.hindi_translation || translationResult.hindi || inputText}"
                </div>
              </div>

              {/* If Student Mode, also show recommended teacher reply */}
              {activeSpeaker === 'student' && translationResult.suggested_reply && (
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-amber-400 font-bold uppercase block">शिक्षक के लिए अनुशंसित उत्तर:</span>
                    <span className="text-sm font-bold text-white">{translationResult.suggested_reply}</span>
                  </div>
                  <button
                    onClick={() => playCustomText(translationResult.suggested_reply)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>उत्तर बोलें</span>
                  </button>
                </div>
              )}

            </div>

            {/* Bottom Actions: Add to Worksheet */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <div className="text-[11px] text-slate-400">
                {translationResult.cultural_note}
              </div>

              <button
                onClick={handleAddCurrentToWorksheet}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">वर्कशीट में जोड़ा गया!</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span>वर्कशीट में जोड़ें</span>
                  </>
                )}
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Shy Student Tap Palette */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center space-x-1.5">
            <span>शर्मीले बच्चों के लिए वन-टैप सहायता (Student Quick Tap Palette)</span>
          </h3>
          <span className="text-[11px] text-slate-400">
            बच्चे सीधे आइकन छूकर अपनी बात कह सकते हैं
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {STUDENT_TAP_PALETTE.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTapPalette(item)}
              className="flex flex-col items-center p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 transition-all text-center group cursor-pointer"
            >
              <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <span className="text-xs font-bold text-slate-700">
                {item.label_hi}
              </span>
              <span className="text-[10px] text-emerald-700 font-olchiki mt-0.5">
                {item.label_sa}
              </span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
