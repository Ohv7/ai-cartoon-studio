import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Plus,
  FileText,
  Users,
  Image,
  Clapperboard,
  Video,
  FolderOpen,
  Settings,
  Sparkles,
  Search,
  Bell,
  Sun,
  Moon,
  PanelLeftClose,
  Menu,
  ChevronDown,
  HardDrive,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStudio } from "./provider";
export const navigation = [
  { to: "/", title: "หน้าหลัก", icon: LayoutDashboard },
  { to: "/new-project", title: "สร้างโปรเจกต์ใหม่", icon: Plus },
  { to: "/story", title: "เขียนเนื้อเรื่อง", icon: FileText },
  { to: "/characters", title: "สร้างตัวละคร", icon: Users },
  { to: "/scenes", title: "สร้างฉาก", icon: Image },
  { to: "/storyboard", title: "Storyboard", icon: Clapperboard },
  { to: "/video", title: "สร้างวิดีโอ", icon: Video },
  { to: "/projects", title: "โปรเจกต์ของฉัน", icon: FolderOpen },
  { to: "/settings", title: "ตั้งค่า", icon: Settings },
] as const;
export function StudioShell({ children }: { children: ReactNode }) {
  const { theme, toggleTheme, search, setSearch } = useStudio();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [notifications, setNotifications] = useState(false);
  return (
    <div
      className={`studio-shell ${collapsed ? "is-collapsed" : ""} ${mobile ? "mobile-open" : ""}`}
    >
      <div className="mobile-overlay" onClick={() => setMobile(false)} />
      <aside className="studio-sidebar">
        <Link to="/" className="brand" onClick={() => setMobile(false)}>
          <div className="brand-symbol">
            <Clapperboard size={22} />
          </div>
          <div className="brand-name">
            AI Cartoon
            <br />
            <span>Studio</span>
          </div>
        </Link>
        <div className="nav-caption">พื้นที่สร้างสรรค์ของคุณ</div>
        <nav className="studio-nav">
          {navigation.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: true }}
              className={`nav-item ${i === 7 ? "mt-6" : ""}`}
              title={item.title}
              onClick={() => setMobile(false)}
            >
              <item.icon size={18} strokeWidth={1.7} />
              <span className="nav-text">{item.title}</span>
              {i === 1 && <span className="nav-text ml-auto text-bright text-xs">+</span>}
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="local-status">
            <div className="flex items-center gap-2 text-foreground">
              <HardDrive size={15} className="text-bright" />
              พื้นที่ส่วนตัวของคุณ
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-success" />
            </div>
            <p className="text-muted-foreground text-[10px] mt-2 leading-5">
              บันทึกโปรเจกต์ไว้บนอุปกรณ์นี้
            </p>
          </div>
          <div className="sidebar-user">
            <div className="avatar">คุณ</div>
            <div>
              <div className="text-xs">นักสร้างสรรค์</div>
              <div className="text-[10px] text-muted-foreground mt-1">พื้นที่ทำงานส่วนตัว</div>
            </div>
            <Button asChild variant="ghost" size="icon" className="ml-auto">
              <Link to="/settings" title="ตั้งค่าโปรไฟล์">
                <Settings size={15} />
              </Link>
            </Button>
          </div>
        </div>
      </aside>
      <div className="studio-main">
        <header className="studio-topbar">
          <Button
            variant="ghost"
            size="icon"
            title="ย่อหรือเปิดเมนู"
            aria-label="ย่อหรือเปิดเมนู"
            onClick={() => {
              if (window.innerWidth <= 800) setMobile((v) => !v);
              else setCollapsed((v) => !v);
            }}
          >
            <Menu className="md:hidden" />
            <PanelLeftClose className="hidden md:block" />
          </Button>
          <h2 className="topbar-title text-base font-medium whitespace-nowrap">
            {navigation.find((n) => n.to === path)?.title || "AI Cartoon Studio"}
          </h2>
          <form
            className="top-search"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/projects" });
            }}
          >
            <Search size={15} />
            <input
              placeholder="ค้นหาโปรเจกต์ของคุณ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="ค้นหาโปรเจกต์"
            />
          </form>
          <div className="flex items-center gap-1 ml-auto md:ml-0">
            <Button
              variant="ghost"
              size="icon"
              title="เปลี่ยนธีม"
              aria-label="เปลี่ยนธีม"
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              title="การแจ้งเตือน"
              aria-label="การแจ้งเตือน"
              onClick={() => setNotifications((v) => !v)}
            >
              <Bell size={18} />
            </Button>
          </div>
          <Link to="/settings" className="flex items-center gap-2 border-l border-border pl-4">
            <div className="avatar">คุณ</div>
            <span className="top-user-name text-xs">นักสร้างสรรค์</span>
            <ChevronDown size={13} className="text-muted-foreground" />
          </Link>
          {notifications && (
            <div className="notification-popover">
              <div className="flex items-center justify-between mb-3">
                <h3>การแจ้งเตือน</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setNotifications(false)}
                  aria-label="ปิดการแจ้งเตือน"
                >
                  <X />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground leading-6">
                ยังไม่มีการแจ้งเตือนใหม่ โปรเจกต์ของคุณบันทึกไว้บนอุปกรณ์นี้
              </p>
            </div>
          )}
        </header>
        <main className="studio-content">{children}</main>
      </div>
    </div>
  );
}
