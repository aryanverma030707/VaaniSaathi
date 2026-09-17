import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  FileText, 
  CheckCircle2, 
  BarChart3, 
  MapPin, 
  Download,
  Award
} from 'lucide-react';

export default function AnalyticsDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Top Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
              Jharkhand PALASH Telemetry & Impact
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              पायलट प्रभाव एवं प्रगति विश्लेषण (Pilot Impact & Analytics)
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              दुमका पायलट ब्लॉक के 42 प्राथमिक विद्यालयों से संकलित साप्ताहिक ऑफलाइन सिंक डेटा।
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>42 Active Pilot Classrooms</span>
            </span>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">मातृभाषा पाठ (Lessons Taught)</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">1,480+</div>
          <div className="text-[11px] text-emerald-400 font-medium flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>+24% this month in Dumka</span>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">शिक्षक का समय बचाया (Hours Saved)</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">495 hrs</div>
          <div className="text-[11px] text-slate-400">
            हस्तलिखित अनुवाद और चार्ट बनाने से मुक्ति
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">प्रिंटेड वर्कशीट (Sheets Printed)</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">4,120</div>
          <div className="text-[11px] text-slate-400">
            QR कोड के साथ घर पर अभ्यास
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">एफएलएन समझ वृद्धि (FLN Comprehension)</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-400">+38%</div>
          <div className="text-[11px] text-emerald-400 font-medium">
            मातृभाषा माध्यम से सीखने की दर
          </div>
        </div>

      </div>

      {/* District Pilot Coverage & NIPUN Alignment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* District Status List */}
        <div className="lg:col-span-6 bg-slate-900/70 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>झारखंड जिला पायलट प्रगति (District Status)</span>
          </h3>

          <div className="space-y-3">
            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
              <div>
                <div className="font-bold text-white text-sm">दुमका (Dumka) — संताल परगना</div>
                <div className="text-xs text-slate-400">भाषा: संताली (Ol Chiki) • 42 विद्यालय सक्रिय</div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                Phase 1 Active
              </span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
              <div>
                <div className="font-bold text-white text-sm">पाकुड़ (Pakur) — संताल परगना</div>
                <div className="text-xs text-slate-400">भाषा: संताली • 28 विद्यालय ऑनबोर्डिंग</div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                Onboarding
              </span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
              <div>
                <div className="font-bold text-white text-sm">पश्चिमी सिंहभूम (West Singhbhum)</div>
                <div className="text-xs text-slate-400">भाषा: हो (Ho) एवं मुंडारी (Mundari)</div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-400">
                Phase 2 Pipeline
              </span>
            </div>
          </div>
        </div>

        {/* NIPUN Bharat FLN Competencies Progress */}
        <div className="lg:col-span-6 bg-slate-900/70 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>निपुण भारत बुनियादी अधिगम परिणाम (FLN Goals)</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>मौखिक अभिव्यक्ति (Oral Expression in Mother Tongue)</span>
                <span className="font-bold text-amber-400">88%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>ओल चिकी वर्ण पहचान (Ol Chiki Letter Recognition)</span>
                <span className="font-bold text-blue-400">76%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '76%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>संख्या ज्ञान १ से ५ (Basic Number Sense 1-5)</span>
                <span className="font-bold text-emerald-400">92%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>घर पर QR ऑडियो सुनकर दोहराना (Home Audio QR Scans)</span>
                <span className="font-bold text-purple-400">65%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
