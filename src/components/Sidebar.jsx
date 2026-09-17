import React from "react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  GraduationCap,
  Settings,
  HelpCircle,
  MessageSquare,
  WifiOff,
  Wifi,
  RefreshCw,
  LogOut
} from "lucide-react";

// Project Overview first, then core tools
const NAV_ITEMS = [
  { id: "showcase",   label: "Project Overview",    icon: Users },
  { id: "classroom",  label: "Classroom Station",   icon: LayoutDashboard },
  { id: "phrasebook", label: "PALASH Phrasebook",   icon: BookOpen },
  { id: "worksheets", label: "Worksheet Studio",    icon: GraduationCap },
];

const BOTTOM_ITEMS = [
  { id: "settings", label: "Settings",    icon: Settings },
  { id: "help",     label: "Help",        icon: HelpCircle },
  { id: "contact",  label: "Contact Us",  icon: MessageSquare },
];

// Light palette tokens from the product color system.
const C = {
  sidebar:     "#f0f3f5",
  sidebarBdr:  "#c1cfd7",
  navActive:   "#e1ec13",
  navActiveTx: "#141b1f",
  navHoverBg:  "#e0e7eb",
  navTx:       "#3c515d",
  navTxHover:  "#141b1f",
  brand:       "#6a9c30",
  brandSub:    "#516c7b",
  userBg:      "#e0e7eb",
  userTx:      "#3c515d",
  divider:     "#e0e7eb",
  syncBtn:     "#84c33c",
  syncBtnTx:   "#141b1f",
};

export default function Sidebar({ currentTab, setCurrentTab, isOffline, setIsOffline, onOpenSyncModal, syncMeta, user, onLogout }) {
  return (
    <aside
      className="no-print w-56 flex-shrink-0 flex flex-col min-h-screen"
      style={{ background: C.sidebar, borderRight: `1px solid ${C.sidebarBdr}` }}
    >
      {/* Brand */}
      <div className="px-5 py-5 flex items-center gap-3" style={{ borderBottom: `1px solid ${C.divider}` }}>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-lg flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #84c33c, #6a9c30)" }}
        >
          <span className="font-olchiki text-lg">ᱚ</span>
        </div>
        <div>
          <div className="font-extrabold text-sm tracking-tight leading-tight" style={{ color: "#28363e" }}>VaaniSaathi</div>
          <div className="text-[10px] font-semibold" style={{ color: C.brand }}>PALASH FLN</div>
        </div>
      </div>

      {/* User */}
      <div className="px-4 py-4 flex items-center gap-3" style={{ borderBottom: `1px solid ${C.divider}` }}>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
          style={{ background: C.userBg, color: C.userTx }}
        >
          {(user?.name || "T")[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold truncate" style={{ color: "#28363e" }}>{user?.name || "Teacher"}</div>
          <div className="text-[11px] truncate" style={{ color: C.brandSub }}>Teacher</div>
        </div>
        <button
          onClick={onLogout}
          title="Logout"
          style={{ color: C.navTx }}
          onMouseEnter={e => e.currentTarget.style.color = C.brand}
          onMouseLeave={e => e.currentTarget.style.color = C.navTx}
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const active = currentTab === id;
          return (
            <button
              key={id}
              onClick={() => setCurrentTab(id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={active
                ? { background: C.navActive, color: C.navActiveTx, fontWeight: 700 }
                : { color: C.navTx }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = C.navHoverBg; e.currentTarget.style.color = C.navTxHover; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.navTx; } }}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Offline Toggle */}
      <div className="px-3 py-3" style={{ borderTop: `1px solid ${C.divider}` }}>
        <button
          onClick={() => setIsOffline(!isOffline)}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all"
          style={isOffline
            ? { background: "#e6f3d8", border: "1px solid #b5db8a", color: "#4f7524" }
            : { background: "#ffffff", border: `1px solid ${C.sidebarBdr}`, color: C.navTx }}
        >
          {isOffline
            ? <WifiOff className="w-3.5 h-3.5" style={{ color: C.brand }} />
            : <Wifi className="w-3.5 h-3.5" style={{ color: C.brandSub }} />}
          <span>{isOffline ? "Offline Mode: On" : "Online Mode"}</span>
        </button>
        <button
          onClick={onOpenSyncModal}
          className="mt-2 w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all"
          style={{ background: C.syncBtn, color: C.syncBtnTx }}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>BRC Sync</span>
          {syncMeta?.pendingUploads > 0 && (
            <span className="ml-auto bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {syncMeta.pendingUploads}
            </span>
          )}
        </button>
      </div>

      {/* Bottom Nav */}
      <div className="px-3 py-3 space-y-0.5" style={{ borderTop: `1px solid ${C.divider}` }}>
        {BOTTOM_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-all"
            style={{ color: C.navTx }}
            onMouseEnter={e => { e.currentTarget.style.color = C.navTxHover; e.currentTarget.style.background = C.navHoverBg; }}
            onMouseLeave={e => { e.currentTarget.style.color = C.navTx; e.currentTarget.style.background = "transparent"; }}
          >
            <Icon className="w-3.5 h-3.5 flex-shrink-0" />
            {label}
          </button>
        ))}
      </div>
    </aside>
  );
}
