import { Link } from "@tanstack/react-router";
import {
  CalendarDays,
  ArrowUpRight,
  MoreHorizontal,
  FolderOpen,
  Info,
  X,
  Check,
  ChevronDown,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useStudio } from "./provider";
import { progress, type Project } from "@/lib/studio/model";
import { imageFor } from "@/lib/studio/assets";
export function Heading({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <div className="workspace-heading flex justify-between gap-4 flex-wrap">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
export function DemoNotice() {
  return <div className="demo-notice"><Info size={17}/><span>โหมดตัวอย่าง: ยังไม่ได้เชื่อมต่อบริการ AI ภาพและเนื้อหาที่แสดงเป็นตัวอย่างสำเร็จรูป ไม่ได้สร้างจากคำอธิบายของคุณ คุณสามารถแก้ไขรายละเอียดและบันทึกได้</span></div>;
}
export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="field">
      <label>
        {label}
        {children}
      </label>
    </div>
  );
}
export function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: (string | { value: string; label: string })[];
  onChange: (v: string) => void;
}) {
  return (
    <Field label={label}>
      <select className="mt-2" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) =>
          typeof o === "string" ? (
            <option key={o}>{o}</option>
          ) : (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ),
        )}
      </select>
    </Field>
  );
}
export function ActiveProject() {
  const { active, projects, select } = useStudio();
  return (
    <div className="flex items-center gap-2 mb-6 text-xs text-muted-foreground">
      <FolderOpen size={15} className="text-bright" />
      <span className="whitespace-nowrap">โปรเจกต์ปัจจุบัน</span>
      <select
        aria-label="โปรเจกต์ปัจจุบัน"
        className="max-w-xs py-2"
        value={active?.id || ""}
        onChange={(e) => select(e.target.value)}
      >
        {projects.map((p) => (
          <option value={p.id} key={p.id}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
}
export function NeedProject() {
  const { active, ready } = useStudio();
  if (!ready) return <div className="empty-state">กำลังโหลดโปรเจกต์...</div>;
  if (active) return null;
  return (
    <div className="empty-state">
      <FolderOpen size={40} />
      <h2>เริ่มเรื่องราวใหม่ของคุณ</h2>
      <p>ยังไม่มีโปรเจกต์</p>
      <Button asChild>
        <Link to="/new-project">สร้างโปรเจกต์ใหม่</Link>
      </Button>
    </div>
  );
}
export function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="ปิด">
            <X />
          </Button>
        </div>
        {children}
      </section>
    </div>
  );
}
export function ProjectCard({
  project,
  management = false,
}: {
  project: Project;
  management?: boolean;
}) {
  const { select, remove, update } = useStudio();
  const [menu, setMenu] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(project.name);
  const percentage = progress(project);
  return (
    <article className="project-card">
      <Link
        to="/gallery"
        onClick={() => select(project.id)}
        className="block project-cover"
        aria-label={`เปิด ${project.name}`}
      >
        <img
          src={imageFor(project.image)}
          alt={project.name}
          width={1024}
          height={768}
          loading="lazy"
        />
        <span className="image-label">{project.demo ? "โปรเจกต์ตัวอย่าง" : project.style}</span>
      </Link>
      <div className="project-info">
        <div className="flex items-center gap-1">
          <Link to="/gallery" onClick={() => select(project.id)} className="min-w-0 flex-1">
            <h3 className="truncate">{project.name}</h3>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            aria-label={`จัดการ ${project.name}`}
            onClick={() => setMenu((v) => !v)}
          >
            <MoreHorizontal size={17} />
          </Button>
        </div>
        <div className="project-meta">
          <CalendarDays size={12} />
          {new Date(project.createdAt).toLocaleDateString("th-TH", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
          <span className="ml-auto">{project.style}</span>
        </div>
        <div className="flex justify-between text-[10px] mt-4">
          <span className={percentage === 100 ? "text-success" : "text-bright"}>
            {percentage === 100
              ? "มีรูปตัวละครและฉากแล้ว"
              : percentage === 0
                ? "โปรเจกต์ใหม่"
                : "กำลังสร้างสรรค์"}
          </span>
          <span className="text-muted-foreground">{percentage}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${percentage}%` }} />
        </div>
        {(management || menu) && (
          <div className="flex gap-2 mt-3">
            <Button asChild variant="secondary" size="sm">
              <Link to="/gallery" onClick={() => select(project.id)}>
                เปิด <ArrowUpRight size={12} />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
              แก้ไข
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive ml-auto"
              onClick={() => setDeleting(true)}
            >
              ลบ
            </Button>
          </div>
        )}
      </div>
      {deleting && (
        <Modal title="ลบโปรเจกต์นี้?" onClose={() => setDeleting(false)}>
          <p className="text-muted-foreground mb-6">
            {project.name} จะถูกลบออกจากอุปกรณ์นี้และไม่สามารถกู้คืนได้
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeleting(false)}>
              ยกเลิก
            </Button>
            <Button variant="destructive" onClick={() => remove(project.id)}>
              ยืนยันการลบ
            </Button>
          </div>
        </Modal>
      )}
      {editing && (
        <Modal title="แก้ไขชื่อโปรเจกต์" onClose={() => setEditing(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!name.trim()) return;
              update(project.id, { name: name.trim() });
              setEditing(false);
            }}
          >
            <Field label="ชื่อโปรเจกต์">
              <input
                className="mt-2"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
            <Button type="submit">
              <Check />
              บันทึก
            </Button>
          </form>
        </Modal>
      )}
    </article>
  );
}
