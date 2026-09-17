import React from 'react';
import { 
  Languages, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  FileText, 
  BookOpen, 
  BarChart3, 
  Home, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  isOffline, 
  setIsOffline, 
  onOpenSyncModal,
  syncMeta 
}) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('showcase')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 font-bold text-white text-lg">
              <span className="font-olchiki text-xl">ᱚ</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200 bg-clip-text text-transparent">
                  VaaniSaathi
                </span>
                <span className="text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded-full">
                  PALASH FLN
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800/80">
            <button
              onClick={() => setCurrentTab('showcase')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'showcase'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Project Overview</span>
            </button>

            <button
              onClick={() => setCurrentTab('classroom')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'classroom'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-400 group-hover:text-amber-300" />
              <span>Classroom Station</span>
            </button>

            <button
              onClick={() => setCurrentTab('worksheets')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'worksheets'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Worksheet Studio</span>
            </button>

            <button
              onClick={() => setCurrentTab('phrasebook')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'phrasebook'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>PALASH Phrasebook</span>
            </button>


          </nav>

          {/* Right Action Controls: Offline Toggle & BRC Sync */}
          <div className="flex items-center space-x-2.5">
            
            {/* Offline Simulation Toggle */}
            <button
              onClick={() => setIsOffline(!isOffline)}
              title={isOffline ? "Currently in 100% Offline Mode (Airplane Mode)" : "Simulating Online Mode"}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                isOffline
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
              }`}
            >
              {isOffline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Offline Mode: Active</span>
                  <span className="sm:hidden">Offline</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-blue-400" />
                  <span className="hidden sm:inline">Online</span>
                </>
              )}
            </button>

            {/* BRC Sync Button */}
            <button
              onClick={onOpenSyncModal}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-md shadow-orange-600/20 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="font-semibold">BRC Sync</span>
              {syncMeta?.pendingUploads > 0 && (
                <span className="bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {syncMeta.pendingUploads}
                </span>
              )}
            </button>

          </div>

        </div>

        {/* Mobile Tab Bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800 text-[11px] font-medium">
          <button 
            onClick={() => setCurrentTab('showcase')}
            className={`px-2 py-1 rounded ${currentTab === 'showcase' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
            Overview
          </button>
          <button 
            onClick={() => setCurrentTab('classroom')}
            className={`px-2 py-1 rounded ${currentTab === 'classroom' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
            Classroom
          </button>
          <button 
            onClick={() => setCurrentTab('worksheets')}
            className={`px-2 py-1 rounded ${currentTab === 'worksheets' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
            Worksheets
          </button>
          <button 
            onClick={() => setCurrentTab('phrasebook')}
            className={`px-2 py-1 rounded ${currentTab === 'phrasebook' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
            Phrasebook
          </button>
          <button 
            onClick={() => setCurrentTab('analytics')}
            className={`px-2 py-1 rounded ${currentTab === 'analytics' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
            Analytics
          </button>
        </div>

      </div>
    </header>
  );
}
