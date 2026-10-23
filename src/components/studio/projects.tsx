import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Plus,
  FolderOpen,
  Search,
  Sparkles,
  Save,
  Sun,
  Moon,
  HardDrive,
  ShieldCheck,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useStudio } from "./provider";
import { Heading, Field, SelectField, ProjectCard } from "./shared";
import { progress, NEW_PROJECT_WORKSPACE, CARTOON_STYLES } from "@/lib/studio/model";
export function NewProject() {
  const { create } = useStudio();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [style, setStyle] = useState("3D Cartoon");
  return (
    <>
      <Heading title="เริ่มต้นภาพการ์ตูนใหม่" subtitle="ให้จินตนาการของคุณเป็นจุดเริ่มต้น" />
      <div className="panel max-w-2xl mx-auto mt-10">
        <div className="step-icon mb-5">
          <Sparkles />
        </div>
        <h2 className="text-xl mb-2">สร้างโปรเจกต์ใหม่</h2>
        <p className="text-xs text-muted-foreground mb-7">
          ทุกเรื่องราวที่ยิ่งใหญ่ เริ่มจากไอเดียเล็ก ๆ
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!name.trim()) {
              toast.error("กรุณากรอกชื่อโปรเจกต์");
              return;
            }
            create(name, style);
            navigate({ to: NEW_PROJECT_WORKSPACE });
          }}
        >
          <Field label="ชื่อโปรเจกต์">
            <input
              autoFocus
              required
              maxLength={100}
              className="mt-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="เช่น การผจญภัยในป่ามหัศจรรย์"
            />
          </Field>
          <SelectField
            label="สไตล์การ์ตูน"
            value={style}
            options={CARTOON_STYLES}
            onChange={setStyle}
          />
          <div className="form-actions">
            <Button type="submit" variant="hero">
              <Plus />
              สร้างโปรเจกต์
            </Button>
            <Button asChild variant="outline">
              <Link to="/">ยกเลิก</Link>
            </Button>
          </div>
        </form>
        <div className="flex gap-2 items-center text-muted-foreground text-xs mt-7 pt-5 border-t border-border">
          <HardDrive size={14} />
          โปรเจกต์จะถูกบันทึกบนอุปกรณ์นี้
        </div>
      </div>
    </>
  );
}
export function Projects() {
  const { projects, search, setSearch, ready } = useStudio();
  const [filter, setFilter] = useState("ทั้งหมด");
  const [style, setStyle] = useState("ทุกสไตล์");
  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (style === "ทุกสไตล์" || p.style === style) &&
      (filter === "ทั้งหมด" ||
        (filter === "มีรูปตัวละครและฉากแล้ว" ? progress(p) === 100 : progress(p) < 100)),
  );
  return (
    <>
      <Heading
        title="โปรเจกต์ของฉัน"
        subtitle={`${projects.length} โปรเจกต์ภาพในพื้นที่สร้างสรรค์ของคุณ`}
      >
        <Button asChild>
          <Link to="/new-project">
            <Plus />
            สร้างโปรเจกต์ใหม่
          </Link>
        </Button>
      </Heading>
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-3 text-muted-foreground" size={17} />
          <input
            aria-label="ค้นหาในโปรเจกต์"
            className="pl-10"
            placeholder="ค้นหาชื่อโปรเจกต์..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="w-auto"
          aria-label="กรองสถานะ"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {["ทั้งหมด", "กำลังสร้างสรรค์", "มีรูปตัวละครและฉากแล้ว"].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
        <select
          className="w-auto"
          aria-label="กรองสไตล์"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        >
          {["ทุกสไตล์", ...CARTOON_STYLES].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </div>
      {!ready ? (
        <p>กำลังโหลด...</p>
      ) : filtered.length ? (
        <div className="project-grid all-projects">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} management />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <FolderOpen size={40} />
          <h2>ไม่พบโปรเจกต์</h2>
          <p>
            {projects.length
              ? "ลองค้นหาด้วยคำอื่นหรือเปลี่ยนตัวกรอง"
              : "สร้างเรื่องราวแรกของคุณได้เลย"}
          </p>
          <Button asChild>
            <Link to="/new-project">
              <Plus />
              สร้างโปรเจกต์ใหม่
            </Link>
          </Button>
        </div>
      )}
    </>
  );
}
export function Settings() {
  const { theme, toggleTheme, projects } = useStudio();
  return (
    <>
      <Heading title="ตั้งค่า" subtitle="ปรับพื้นที่สร้างสรรค์ให้เป็นแบบของคุณ" />
      <div className="max-w-3xl space-y-6">
        <section className="panel">
          <h2 className="panel-title">
            <Sun size={18} />
            รูปแบบการแสดงผล
          </h2>
          <div className="flex justify-between items-center gap-4">
            <div>
              <h3>ธีมของสตูดิโอ</h3>
              <p className="text-xs text-muted-foreground mt-2">
                {theme === "dark" ? "โหมดมืด" : "โหมดสว่าง"}
              </p>
            </div>
            <Button variant="secondary" onClick={toggleTheme}>
              {theme === "dark" ? <Sun /> : <Moon />}
              {theme === "dark" ? "ใช้โหมดสว่าง" : "ใช้โหมดมืด"}
            </Button>
          </div>
        </section>
        <section className="panel">
          <h2 className="panel-title">
            <HardDrive size={18} />
            ข้อมูลบนอุปกรณ์
          </h2>
          <p className="text-muted-foreground text-sm leading-7">
            มี {projects.length} โปรเจกต์บันทึกไว้บนเบราว์เซอร์นี้ ข้อมูลจะไม่ถูกซิงค์ข้ามอุปกรณ์
            และอาจหายไปเมื่อคุณล้างข้อมูลเบราว์เซอร์
          </p>
          <Button
            className="mt-5"
            variant="outline"
            onClick={() => {
              const blob = new Blob([JSON.stringify(projects, null, 2)], {
                type: "application/json",
              });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "ai-cartoon-studio-projects.json";
              a.click();
              URL.revokeObjectURL(url);
              toast.success("ส่งออกข้อมูลโปรเจกต์แล้ว");
            }}
          >
            <Download />
            สำรองข้อมูลโปรเจกต์
          </Button>
        </section>
        <section className="panel">
          <h2 className="panel-title">
            <ShieldCheck size={18} />
            บริการ AI
          </h2>
          <p className="text-sm text-muted-foreground leading-7">
            ยังไม่ได้เชื่อมต่อบริการสร้างรูปตัวละครและฉากด้วย AI
            ขณะนี้ใช้งานตัวอย่างและแก้ไขเนื้อหาได้โดยไม่มีค่าใช้จ่ายในการสร้าง AI
          </p>
          <span className="inline-block text-xs text-bright mt-4">สถานะ: โหมดตัวอย่าง</span>
        </section>
      </div>
    </>
  );
}
