import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, PlusCircle, FolderOpen, BarChart3, Search, Bell, User, Zap, Menu, X, PanelLeftClose, PanelLeftOpen, LogOut, ChevronDown, MessagesSquare } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: PlusCircle, label: "Create Ad", path: "/create-ad" },
  { icon: FolderOpen, label: "Ad Library", path: "/ad-library" },
  { icon: MessagesSquare, label: "Previous Chats", path: "/chat-history" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [topProfileOpen, setTopProfileOpen] = useState(false);
  const [bottomProfileOpen, setBottomProfileOpen] = useState(false);

  return (
    <div className="flex h-screen gradient-mesh overflow-hidden">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 glass-strong flex flex-col transition-all duration-300
        md:relative md:translate-x-0
        ${sidebarCollapsed ? "md:w-16" : "md:w-64"}
        w-64
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className={`flex items-center gap-2 border-b border-border py-5 ${sidebarCollapsed ? "px-3 md:justify-center" : "px-6"}`}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 shrink-0">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          {!sidebarCollapsed && <span className="font-bold text-foreground">Adlyrix</span>}
          <button
            className={`ml-auto hidden md:inline-flex items-center justify-center rounded-full border border-border/70 bg-background/40 text-muted-foreground transition-all hover:text-foreground ${sidebarCollapsed ? "h-8 w-8" : "h-8 w-8"}`}
            onClick={() => setSidebarCollapsed((current) => !current)}
          >
            {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
          <button className="ml-auto md:hidden text-muted-foreground" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ icon: Icon, label, path }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center rounded-lg py-2.5 text-sm font-medium transition-all ${
                  sidebarCollapsed ? "justify-center px-1.5" : "gap-3 px-3"
                } ${
                  active
                    ? "bg-primary/15 text-primary glow-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
                title={sidebarCollapsed ? label : undefined}
              >
                <Icon size={18} />
                {!sidebarCollapsed && label}
              </Link>
            );
          })}
        </nav>

        <div className="relative mx-3 mb-4">
          <button
            type="button"
            onClick={() => setBottomProfileOpen((current) => !current)}
            className={`glass-subtle w-full rounded-lg p-3 flex items-center ${sidebarCollapsed ? "justify-center px-1" : "gap-3"}`}
          >
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold shrink-0">
              AM
            </div>
            {!sidebarCollapsed && (
              <>
                <div className="text-left">
                  <p className="text-xs font-medium text-foreground">Alex Morgan</p>
                  <p className="text-[10px] text-muted-foreground">Pro Plan</p>
                </div>
                <ChevronDown size={14} className="ml-auto text-muted-foreground" />
              </>
            )}
          </button>

          {bottomProfileOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 rounded-lg border border-border bg-card p-2 shadow-lg">
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
              >
                <LogOut size={14} /> Logout
              </Link>
            </div>
          )}
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-background/50 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="glass-strong flex items-center justify-between px-6 py-3 border-b border-border">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-muted-foreground" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <div className="relative hidden sm:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search campaigns..."
                className="w-64 rounded-lg border border-border bg-input pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-lg p-2 text-muted-foreground hover:bg-secondary transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setTopProfileOpen((current) => !current)}
                className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold"
              >
                <User size={16} />
              </button>

              {topProfileOpen && (
                <div className="absolute right-0 top-11 w-40 rounded-lg border border-border bg-card p-2 shadow-lg">
                  <Link
                    to="/login"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
                  >
                    <LogOut size={14} /> Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
