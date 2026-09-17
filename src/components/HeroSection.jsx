import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  WifiOff, 
  FileText, 
  BookOpen, 
  Award
} from 'lucide-react';

export default function HeroSection({ onStartTeaching }) {
  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Header */}
      <section className="relative overflow-hidden pt-12 pb-16 text-center px-4">
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-gradient-to-tr from-amber-600/10 via-orange-500/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-6">
          <span>TEAM STORMBREAKER · GEEKS2CODE 2026</span>
          <span>•</span>
          <span>PILOT: JHARKHAND PALASH</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Teaching Tribal Children in the <br />
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
            Language They Speak at Home
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          A mother-tongue AI teaching companion delivering real-time Santali translation and auto-generated worksheets for Jharkhand's <strong className="text-amber-300">PALASH</strong> programme — engineered offline-first for low-connectivity classrooms.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onStartTeaching}
            className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-sm shadow-xl shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Open Classroom Station</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>

          <a
            href="#pipeline"
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all"
          >
            How VaaniSaathi Works
          </a>
        </div>

        {/* Pillar Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300">
          <span className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Real-time Translation</span>
          </span>
          <span className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800">
            <WifiOff className="w-3.5 h-3.5 text-amber-400" />
            <span>100% Offline-First</span>
          </span>
          <span className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>Mother-Tongue Learning</span>
          </span>
          <span className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800">
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span>Auto Worksheets & QR</span>
          </span>
          <span className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800">
            <Award className="w-3.5 h-3.5 text-orange-400" />
            <span>NIPUN Bharat Aligned</span>
          </span>
        </div>
      </section>

      {/* The Problem & Evidence */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                The Core Problem
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                Instruction in a language children don't speak at home
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Hindi-medium teachers across Jharkhand's tribal-belt primary schools are mandated by <strong className="text-amber-300">PALASH</strong> (run by JEPC) to deliver mother-tongue instruction. But Santali, Mundari, and Ho carry almost <strong>no digital learning infrastructure</strong> to support them.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                  <div className="text-2xl font-black text-amber-400">5</div>
                  <div className="text-[11px] text-slate-400 mt-1">Tribal languages in PALASH</div>
                </div>
                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                  <div className="text-2xl font-black text-amber-400">8 / 24</div>
                  <div className="text-[11px] text-slate-400 mt-1">Districts covered today</div>
                </div>
                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                  <div className="text-2xl font-black text-amber-400">1,000+</div>
                  <div className="text-[11px] text-slate-400 mt-1">PALASH schools waiting</div>
                </div>
              </div>
            </div>

            {/* UNESCO Callout Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-indigo-950/80 to-slate-900 border border-indigo-800/50 rounded-2xl p-6 text-center space-y-3">
              <div className="text-5xl sm:text-6xl font-black text-indigo-400 tracking-tight">
                44%
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                of Indian children begin school speaking a language different from the official medium of instruction.
              </p>
              <div className="text-[10px] text-slate-400 pt-2 border-t border-indigo-900/60">
                Source: UNESCO, "State of the Education Report for India — Bhasha Matters"
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The 5-Step Pipeline */}
      <section id="pipeline" className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">The Solution</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">How VaaniSaathi Works, Lesson by Lesson</h2>
          <p className="text-slate-400 text-xs max-w-xl mx-auto">
            A 5-step pipeline that turns one Hindi lesson into a localized, offline-ready Santali kit — audio, Ol Chiki script, and printable worksheets — in under 60 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2 relative">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center font-bold text-orange-400 text-sm">
              1
            </div>
            <h3 className="font-bold text-white text-sm">Teacher Input</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Teacher speaks or enters today's Hindi FLN lesson via single-tap mic.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2 relative">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 text-sm">
              2
            </div>
            <h3 className="font-bold text-white text-sm">Instant Translation</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Bhashini & AI4Bharat open models convert text to Ol Chiki with native audio.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2 relative">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center font-bold text-blue-400 text-sm">
              3
            </div>
            <h3 className="font-bold text-white text-sm">Curriculum Grounding</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Content is checked against NCERT & NIPUN Bharat learning benchmarks via RAG.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2 relative">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center font-bold text-purple-400 text-sm">
              4
            </div>
            <h3 className="font-bold text-white text-sm">Worksheet Studio</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Ready-to-print A4 Santali worksheets and QR flashcards generated in seconds.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2 relative">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 text-sm">
              5
            </div>
            <h3 className="font-bold text-white text-sm">Offline Delivery</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Cached locally in IndexedDB after a single BRC sync — zero mid-lesson stalls.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
