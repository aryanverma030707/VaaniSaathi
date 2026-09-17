import React, { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import Sidebar from "./components/Sidebar";
import HeroSection from "./components/HeroSection";
import TranslationStation from "./components/TranslationStation";
import WorksheetStudio from "./components/WorksheetStudio";
import PhrasebookViewer from "./components/PhrasebookViewer";
import BrcSyncModal from "./components/BrcSyncModal";
import { offlineStorage } from "./services/offlineStorage";

export default function App() {
  const [user, setUser] = useState(null); // null = show login
  const [currentTab, setCurrentTab] = useState("classroom");
  const [isOffline, setIsOffline] = useState(true);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [syncMeta, setSyncMeta] = useState(null);
  const [customWorksheetItems, setCustomWorksheetItems] = useState([]);

  useEffect(() => {
    setSyncMeta(offlineStorage.getSyncMetadata());
    setIsOffline(offlineStorage.isSimulatedOffline());
  }, []);

  const handleToggleOffline = (val) => {
    setIsOffline(val);
    offlineStorage.setSimulatedOffline(val);
  };

  const handleAddToWorksheet = (item) => {
    setCustomWorksheetItems(prev => [item, ...prev]);
  };

  const handleSyncComplete = (newMeta) => {
    setSyncMeta(newMeta);
  };

  // Show login if not authenticated
  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  return (
    <div className="flex min-h-screen text-[#141b1f]" style={{ background: '#f4f2f1' }}>
      {/* Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isOffline={isOffline}
        setIsOffline={handleToggleOffline}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
        syncMeta={syncMeta}
        user={user}
        onLogout={() => setUser(null)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <header className="no-print bg-white border-b px-8 py-4 flex items-center justify-between flex-shrink-0 shadow-sm" style={{ borderColor: '#e2e2e9' }}>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {currentTab === "classroom" && "Classroom Station"}
              {currentTab === "phrasebook" && "PALASH Phrasebook"}
              {currentTab === "worksheets" && "Worksheet Studio"}
              {currentTab === "showcase" && "Project Overview"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#70708f]">Welcome, <span className="font-semibold text-[#516c7b]">{user.name}</span></span>
            <div className="w-8 h-8 rounded-full bg-[#84c33c] flex items-center justify-center text-[#141b1f] font-bold text-sm shadow-md">
              {(user.name || "T")[0].toUpperCase()}
            </div>
          </div>
        </header>

        {/* Offline banner */}
        {isOffline && currentTab !== "showcase" && (
          <div className="no-print mx-6 mt-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-700">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <strong>100% ऑफलाइन मोड सक्रिय:</strong>&nbsp;सभी संताली वाक्यांश टैबलेट मेमोरी से चल रहे हैं।
            </div>
            <button
              onClick={() => setIsSyncModalOpen(true)}
              className="text-[#516c7b] hover:text-[#3c515d] underline font-semibold"
            >
              बीआरसी सिंक देखें
            </button>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 px-6 py-6 overflow-y-auto">
          {currentTab === "showcase" && (
            <HeroSection onStartTeaching={() => setCurrentTab("classroom")} />
          )}
          {currentTab === "classroom" && (
            <TranslationStation onAddToWorksheet={handleAddToWorksheet} isOffline={isOffline} />
          )}
          {currentTab === "worksheets" && (
            <WorksheetStudio customWorksheetItems={customWorksheetItems} />
          )}
          {currentTab === "phrasebook" && (
            <PhrasebookViewer />
          )}
        </main>

        {/* Footer */}
        <footer className="no-print border-t bg-white py-4 text-center text-xs text-[#70708f]" style={{ borderColor: '#e2e2e9' }}>
          <div className="flex flex-wrap items-center justify-between gap-2 px-8">
            <span><span className="font-bold text-[#6a9c30]">VaaniSaathi</span> · Team Stormbreaker · GEEKS2CODE 2026</span>
            <span>झारखंड पलाश (JEPC) · NEP 2020 · निपुण भारत</span>
            <span className="text-[#a4998e]">Offline-First for Tribal Classrooms</span>
          </div>
        </footer>
      </div>

      {/* BRC Sync Modal */}
      <BrcSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        syncMeta={syncMeta}
        onSyncComplete={handleSyncComplete}
      />
    </div>
  );
}
