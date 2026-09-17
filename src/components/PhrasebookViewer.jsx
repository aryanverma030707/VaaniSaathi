import React, { useState } from 'react';
import { 
  Search, 
  Volume2, 
  ShieldCheck, 
  BookOpen, 
  Filter, 
  Check, 
  Copy,
  Tag
} from 'lucide-react';
import { VERIFIED_PHRASES, CATEGORIES } from '../data/verifiedPhrasebook';
import { speechService } from '../services/speechService';

export default function PhrasebookViewer() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [playingId, setPlayingId] = useState(null);

  const filteredPhrases = VERIFIED_PHRASES.filter(phrase => {
    const matchesCategory = selectedCategory === 'all' || phrase.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      phrase.hindi.toLowerCase().includes(q) ||
      phrase.santali_roman.toLowerCase().includes(q) ||
      phrase.santali_olchiki.includes(q) ||
      phrase.lesson_tag.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const handlePlayAudio = (phrase) => {
    setPlayingId(phrase.id);
    speechService.speakSantaliPhonetic(phrase.santali_roman, 0.85);
    setTimeout(() => setPlayingId(null), 2000);
  };

  const handleCopy = (phrase) => {
    navigator.clipboard.writeText(`${phrase.santali_olchiki} (${phrase.santali_roman}) - ${phrase.hindi}`);
    setCopiedId(phrase.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header & Verification Badge */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Verified JEPC PALASH Repository</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              प्रमाणित संताली कक्षा वाक्यांश (Verified PALASH Phrasebook)
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              झारखंड शिक्षा परियोजना परिषद (JEPC) द्वारा जांची गई पाठ्यपुस्तक शब्दावली — शून्य एआई त्रुटि (Zero Hallucination).
            </p>
          </div>

          <div className="text-right">
            <span className="text-3xl font-extrabold text-amber-400">{filteredPhrases.length}</span>
            <span className="text-xs text-slate-400 block">सत्यापित वाक्यांश</span>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="हिंदी, संताली या अंग्रेजी उच्चारण से खोजें (Search by Hindi, Ol Chiki, or Roman)..."
            className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-all placeholder:text-slate-500"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Phrases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPhrases.map((phrase) => (
          <div
            key={phrase.id}
            className="bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-5 space-y-3 transition-all hover:shadow-lg"
          >
            {/* Meta header */}
            <div className="flex items-center justify-between text-xs">
              <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase ${
                phrase.speaker === 'teacher' 
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' 
                  : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
              }`}>
                {phrase.speaker === 'teacher' ? 'शिक्षक वाक्य' : 'विद्यार्थी की बात'}
              </span>

              <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                <Tag className="w-3 h-3 text-slate-500" />
                <span>{phrase.lesson_tag}</span>
              </span>
            </div>

            {/* Layer 1: Santali Language Ol Chiki Script */}
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase block mb-1">
                1. संताली भाषा (Ol Chiki Script):
              </span>
              <div className="text-2xl font-bold text-amber-300 font-olchiki tracking-wide bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                {phrase.santali_olchiki}
              </div>
            </div>

            {/* Layer 2: Indic Phonetic Sounds */}
            <div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase block mb-0.5">
                2. भारतीय ध्वन्यात्मक उच्चारण (Indic Phonetic Sounds):
              </span>
              <div className="text-sm font-bold text-white">
                "{speechService.romanToIndicPhonetic(phrase.santali_roman)}"
              </div>
              <div className="text-[11px] text-slate-400 italic">
                रोमन: {phrase.santali_roman}
              </div>
            </div>

            {/* Layer 3: True Translation in Hindi */}
            <div>
              <span className="text-[10px] text-blue-400 font-bold uppercase block mb-0.5">
                3. शुद्ध हिंदी अनुवाद (True Hindi Translation):
              </span>
              <div className="text-sm font-bold text-slate-100">
                "{phrase.hindi}"
              </div>
            </div>

            {/* Suggested reply if student speaking */}
            {phrase.suggested_reply && (
              <div className="text-xs bg-slate-950/80 border border-slate-800 p-2.5 rounded-lg text-slate-300">
                <span className="text-[10px] text-amber-400 font-bold block mb-0.5">शिक्षक का अनुशंसित उत्तर:</span>
                {phrase.suggested_reply}
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <span className="text-[11px] text-emerald-400 font-mono">
                विश्वसनीयता: {phrase.confidence}%
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopy(phrase)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all text-xs flex items-center space-x-1"
                  title="Copy phrase"
                >
                  {copiedId === phrase.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>

                <button
                  onClick={() => handlePlayAudio(phrase)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    playingId === phrase.id
                      ? 'bg-orange-500 text-white animate-pulse'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{playingId === phrase.id ? 'चल रहा है...' : 'सुनें'}</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
