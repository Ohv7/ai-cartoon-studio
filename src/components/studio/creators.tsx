import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Users,
  Image,
  Sparkles,
  Save,
  RotateCcw,
  LoaderCircle,
  ArrowRight,
  Pencil,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useStudio } from "./provider";
import { Heading, ActiveProject, NeedProject, Field, SelectField, DemoNotice } from "./shared";
import { imageFor } from "@/lib/studio/assets";
import type { Character, Scene, Project } from "@/lib/studio/model";
import { CARTOON_STYLES } from "@/lib/studio/model";
const emptyCharacter: Character = {
  id: "",
  name: "",
  gender: "ไม่ระบุ",
  age: "ไม่ระบุ",
  personality: "",
  appearance: "",
  clothing: "",
  prompt: "",
  style: "3D Cartoon",
  image: "",
};
const emptyScene: Scene = {
  id: "",
  name: "",
  description: "",
  location: "",
  time: "เช้า",
  mood: "อบอุ่น",
  style: "3D Cartoon",
  image: "",
};
export function CharacterPage() {
  const { active } = useStudio();
  return active ? <Characters key={active.id} project={active} /> : <NeedProject />;
}
function Characters({ project }: { project: Project }) {
  const { update, active } = useStudio();
  const characters = active?.characters || project.characters;
  const [draft, setDraft] = useState<Character>({ ...emptyCharacter, style: project.style });
  const [busy, setBusy] = useState(false);
  const patch = (p: Partial<Character>) => setDraft((prev) => ({ ...prev, ...p }));
  const generate = () => {
    if (!draft.name.trim()) {
      toast.error("กรุณากรอกชื่อตัวละคร");
      return;
    }
    setBusy(true);
    window.setTimeout(() => {
      patch({
        image: draft.style === "Anime" ? "world" : draft.gender === "ไม่ระบุ" ? "space" : "forest",
      });
      setBusy(false);
      toast.info("แสดงภาพตัวอย่างสำเร็จรูป ไม่ได้สร้างจากคำอธิบาย");
    }, 650);
  };
  const save = () => {
    if (!draft.name.trim()) {
      toast.error("กรุณากรอกชื่อตัวละคร");
      return;
    }
    const character = { ...draft, id: draft.id || crypto.randomUUID(), name: draft.name.trim() };
    update(project.id, {
      characters: draft.id
        ? characters.map((c) => (c.id === draft.id ? character : c))
        : [...characters, character],
    });
    toast.success("บันทึกตัวละครแล้ว");
    setDraft({ ...emptyCharacter, style: project.style });
  };
  return (
    <>
      <Heading title="สร้างตัวละคร" subtitle="มอบชีวิตและเอกลักษณ์ให้ตัวละครในเรื่องราว" />
      <ActiveProject />
      <DemoNotice />
      <div className="workspace-grid">
        <section className="panel">
          <h2 className="panel-title">
            <Users className="text-bright" size={19} />
            รายละเอียดตัวละคร
          </h2>
          <Field label="ชื่อตัวละคร">
            <input
              className="mt-2"
              value={draft.name}
              onChange={(e) => patch({ name: e.target.value })}
              placeholder="เช่น มินะ"
            />
          </Field>
          <div className="field-row">
            <SelectField
              label="เพศ (ไม่บังคับ)"
              value={draft.gender}
              options={["ไม่ระบุ", "หญิง", "ชาย", "อื่น ๆ"]}
              onChange={(gender) => patch({ gender })}
            />
            <SelectField
              label="ช่วงอายุ (ไม่บังคับ)"
              value={draft.age}
              options={["ไม่ระบุ", "เด็ก", "วัยรุ่น", "ผู้ใหญ่", "ผู้สูงอายุ"]}
              onChange={(age) => patch({ age })}
            />
          </div>
          <Field label="บุคลิกและนิสัย">
            <input
              className="mt-2"
              value={draft.personality}
              onChange={(e) => patch({ personality: e.target.value })}
              placeholder="กล้าหาญ ร่าเริง ช่างสงสัย"
            />
          </Field>
          <Field label="ลักษณะภายนอก">
            <textarea
              className="mt-2"
              rows={2}
              value={draft.appearance}
              onChange={(e) => patch({ appearance: e.target.value })}
              placeholder="สีผม รูปร่าง ลักษณะเด่น..."
            />
          </Field>
          <Field label="เสื้อผ้าและเครื่องประดับ">
            <input
              className="mt-2"
              value={draft.clothing}
              onChange={(e) => patch({ clothing: e.target.value })}
              placeholder="เสื้อกันฝนสีเหลือง และกระเป๋าเป้"
            />
          </Field>
          <Field label="Character prompt">
            <textarea
              className="mt-2"
              rows={2}
              value={draft.prompt}
              onChange={(e) => patch({ prompt: e.target.value })}
              placeholder="รายละเอียดเพิ่มเติมสำหรับตัวละคร"
            />
          </Field>
          <SelectField
            label="สไตล์ตัวละคร"
            value={draft.style}
            options={CARTOON_STYLES}
            onChange={(style) => patch({ style })}
          />
          <Button variant="hero" className="w-full" onClick={generate} disabled={busy}>
            {busy ? <LoaderCircle className="animate-spin" /> : <Sparkles />}สร้างตัวละครด้วย AI
            (ตัวอย่าง)
          </Button>
        </section>
        <section className="panel">
          <h2 className="panel-title">ภาพตัวอย่างตัวละคร</h2>
          {draft.image ? (
            <div className="relative">
              <img
                className="preview-image"
                src={imageFor(draft.image)}
                alt="ภาพตัวอย่างสำเร็จรูปตัวละคร"
                width={1024}
                height={768}
              />
              <span className="image-label">ภาพตัวอย่างสำเร็จรูป</span>
            </div>
          ) : (
            <div className="preview-empty">
              <Users size={46} strokeWidth={1} />
              <p>ยังไม่มีภาพตัวอย่างตัวละคร</p>
            </div>
          )}
          <div className="form-actions">
            <Button variant="outline" disabled={busy} onClick={generate}>
              <RotateCcw />
              สร้างใหม่
            </Button>
            <Button disabled={busy} onClick={save}>
              <Save />
              บันทึกตัวละคร
            </Button>
          </div>
          <div className="mt-7 border-t border-border pt-5">
            <h3 className="text-sm">
              ตัวละครของโปรเจกต์ <span className="text-bright">{characters.length}</span>
            </h3>
            <div className="gallery">
              {characters.map((c) => (
                <article className="gallery-item" key={c.id}>
                  {c.image && (
                    <img src={imageFor(c.image)} alt={c.name} width={1024} height={768} />
                  )}
                  <div>
                    <p className="text-sm">{c.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{c.style}</p>
                    <div className="flex justify-end mt-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`แก้ไข ${c.name}`}
                        onClick={() => setDraft(c)}
                      >
                        <Pencil />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`ลบ ${c.name}`}
                        onClick={() => {
                          update(project.id, {
                            characters: characters.filter((x) => x.id !== c.id),
                          });
                          toast.success("ลบตัวละครแล้ว");
                        }}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {!characters.length && (
              <p className="text-xs text-muted-foreground mt-5">ยังไม่มีตัวละครที่บันทึก</p>
            )}
          </div>
        </section>
      </div>
      <div className="flex justify-end mt-6">
        <Button asChild>
          <Link to="/scenes">
            สร้างฉากต่อไป
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </>
  );
}
export function ScenePage() {
  const { active } = useStudio();
  return active ? <Scenes key={active.id} project={active} /> : <NeedProject />;
}
function Scenes({ project }: { project: Project }) {
  const { active, update } = useStudio();
  const scenes = active?.scenes || project.scenes;
  const [draft, setDraft] = useState<Scene>({ ...emptyScene, style: project.style });
  const [busy, setBusy] = useState(false);
  const patch = (p: Partial<Scene>) => setDraft((prev) => ({ ...prev, ...p }));
  const generate = () => {
    if (!draft.name.trim() || !draft.description.trim()) {
      toast.error("กรุณากรอกชื่อและคำอธิบายฉาก");
      return;
    }
    setBusy(true);
    window.setTimeout(() => {
      patch({
        image: draft.location.includes("อวกาศ")
          ? "space"
          : draft.location.includes("ป่า")
            ? "forest"
            : "world",
      });
      setBusy(false);
      toast.info("แสดงภาพฉากตัวอย่างสำเร็จรูป");
    }, 650);
  };
  const save = () => {
    if (!draft.name.trim() || !draft.description.trim()) {
      toast.error("กรุณากรอกชื่อและคำอธิบายฉาก");
      return;
    }
    const scene = { ...draft, id: draft.id || crypto.randomUUID() };
    update(project.id, {
      scenes: draft.id ? scenes.map((s) => (s.id === draft.id ? scene : s)) : [...scenes, scene],
      image: draft.image || project.image,
    });
    toast.success("บันทึกฉากแล้ว");
    setDraft({ ...emptyScene, style: project.style });
  };
  return (
    <>
      <Heading title="สร้างฉากและโลกของคุณ" subtitle="ออกแบบสภาพแวดล้อมที่ทำให้เรื่องราวมีชีวิต" />
      <ActiveProject />
      <DemoNotice />
      <div className="workspace-grid">
        <section className="panel">
          <h2 className="panel-title">
            <Image className="text-bright" size={19} />
            รายละเอียดฉาก
          </h2>
          <Field label="ชื่อฉาก">
            <input
              className="mt-2"
              value={draft.name}
              onChange={(e) => patch({ name: e.target.value })}
              placeholder="เช่น ป่ามหัศจรรย์"
            />
          </Field>
          <Field label="คำอธิบายฉาก">
            <textarea
              className="mt-2"
              rows={5}
              value={draft.description}
              onChange={(e) => patch({ description: e.target.value })}
              placeholder="บรรยายสถานที่และสิ่งที่ต้องการให้ปรากฏในฉาก"
            />
          </Field>
          <Field label="สถานที่">
            <input
              className="mt-2"
              value={draft.location}
              onChange={(e) => patch({ location: e.target.value })}
              placeholder="ป่า เมือง อวกาศ..."
            />
          </Field>
          <div className="field-row">
            <SelectField
              label="ช่วงเวลา"
              value={draft.time}
              options={["เช้า", "กลางวัน", "เย็น", "กลางคืน"]}
              onChange={(time) => patch({ time })}
            />
            <SelectField
              label="อารมณ์และบรรยากาศ"
              value={draft.mood}
              options={["อบอุ่น", "ลึกลับ", "สนุกสนาน", "สงบ", "ตื่นเต้น", "เศร้า"]}
              onChange={(mood) => patch({ mood })}
            />
          </div>
          <SelectField
            label="สไตล์ฉาก"
            value={draft.style}
            options={CARTOON_STYLES}
            onChange={(style) => patch({ style })}
          />
          <Button variant="hero" className="w-full" onClick={generate} disabled={busy}>
            {busy ? <LoaderCircle className="animate-spin" /> : <Sparkles />}สร้างฉากด้วย AI
            (ตัวอย่าง)
          </Button>
        </section>
        <section className="panel">
          <h2 className="panel-title">ภาพตัวอย่างฉาก</h2>
          {draft.image ? (
            <div className="relative">
              <img
                className="preview-image"
                src={imageFor(draft.image)}
                alt="ฉากตัวอย่างสำเร็จรูป"
                width={1024}
                height={768}
              />
              <span className="image-label">ภาพตัวอย่างสำเร็จรูป</span>
            </div>
          ) : (
            <div className="preview-empty">
              <Image size={45} strokeWidth={1} />
              <p>ยังไม่มีภาพตัวอย่างฉาก</p>
            </div>
          )}
          <div className="form-actions">
            <Button disabled={busy} onClick={save}>
              <Save />
              บันทึกฉาก
            </Button>
            <Button
              variant="outline"
              onClick={() => setDraft({ ...emptyScene, style: project.style })}
            >
              <PlusIcon />
              เพิ่มฉากใหม่
            </Button>
          </div>
          <div className="mt-7 border-t border-border pt-5">
            <h3>ฉากที่บันทึกไว้ ({scenes.length})</h3>
            <div className="gallery">
              {scenes.map((s) => (
                <article className="gallery-item" key={s.id}>
                  {s.image && (
                    <img src={imageFor(s.image)} alt={s.name} width={1024} height={768} />
                  )}
                  <div>
                    <p>{s.name}</p>
                    <div className="flex mt-2 justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`แก้ไขฉาก ${s.name}`}
                        onClick={() => setDraft(s)}
                      >
                        <Pencil />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`ลบฉาก ${s.name}`}
                        onClick={() =>
                          update(project.id, { scenes: scenes.filter((x) => x.id !== s.id) })
                        }
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {!scenes.length && (
              <p className="text-xs text-muted-foreground mt-5">ยังไม่มีฉากที่บันทึก</p>
            )}
          </div>
        </section>
      </div>
      <div className="flex justify-end mt-6">
        <Button asChild>
          <Link to="/gallery">
            ดูคลังภาพการ์ตูน
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </>
  );
}
function PlusIcon() {
  return <span aria-hidden="true">+</span>;
}
