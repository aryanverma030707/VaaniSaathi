import React, { useState } from 'react';
import { 
  X, 
  RefreshCw, 
  CheckCircle2, 
  Wifi, 
  Download, 
  Upload, 
  HardDrive, 
  ShieldCheck,
  Building2
} from 'lucide-react';
import { offlineStorage } from '../services/offlineStorage';
import { speechService } from '../services/speechService';

export default function BrcSyncModal({ isOpen, onClose, syncMeta, onSyncComplete }) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncStepText, setSyncStepText] = useState('');
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  const handleRunSync = () => {
    setIsSyncing(true);
    setCompleted(false);
    setSyncProgress(10);
    setSyncStepText('Connecting to BRC Dumka Wi-Fi Network...');

    setTimeout(() => {
      setSyncProgress(35);
      setSyncStepText('Uploading 6 offline classroom lesson logs to JEPC Server...');
    }, 800);

    setTimeout(() => {
      setSyncProgress(70);
      setSyncStepText('Downloading Week 4 Santali FLN Curriculum & Audio Blobs...');
    }, 1700);

    setTimeout(() => {
      setSyncProgress(100);
      setSyncStepText('Sync Complete! 60 Lessons cached in IndexedDB.');
      setIsSyncing(false);
      setCompleted(true);
      speechService.playBeep(700, 0.2);
      const updatedMeta = offlineStorage.recordSuccessfulBrcSync();
      if (onSyncComplete) onSyncComplete(updatedMeta);
    }, 2600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 no-print">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              झारखंड पलाश प्रशासनिक सिंक
            </span>
            <h3 className="text-xl font-bold text-white">
              बीआरसी साप्ताहिक सिंक (BRC Weekly Sync)
            </h3>
          </div>
        </div>

        {/* Info Box */}
        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
          ग्रामीण विद्यालयों में इंटरनेट न होने पर शिक्षक हर सोमवार <strong>प्रखंड संसाधन केंद्र (BRC)</strong> में टैबलेट को सिंक करते हैं। 10 सेकंड में पूरे सप्ताह का नया संताली पाठ्यक्रम डाउनलोड हो जाता है।
        </p>

        {/* Current Sync Status */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block mb-1">पिछला सिंक (Last Sync):</span>
            <strong className="text-white">{syncMeta?.lastSyncDate || '2 दिन पहले'}</strong>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block mb-1">ऑफलाइन कैश्ड पाठ:</span>
            <strong className="text-amber-400">{syncMeta?.cachedLessonsCount || 45} पाठ तैयार</strong>
          </div>
        </div>

        {/* Sync Progress Bar */}
        {isSyncing && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-300">
              <span>{syncStepText}</span>
              <span className="font-bold text-amber-400">{syncProgress}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${syncProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Completed Message */}
        {completed && (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center space-x-3 text-emerald-300 text-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <strong className="block text-white font-bold">टैबलेट सफलतापूर्वक सिंक हो गया!</strong>
              अगले 7 दिनों के लिए कक्षा में बिना इंटरनेट 100% ऑफलाइन शिक्षण जारी रखें।
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex space-x-3 pt-2">
          <button
            disabled={isSyncing}
            onClick={handleRunSync}
            className="flex-1 flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-sm shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'सिंक हो रहा है...' : 'अभी बीआरसी सिंक शुरू करें'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-all"
          >
            बंद करें
          </button>
        </div>

      </div>
    </div>
  );
}
