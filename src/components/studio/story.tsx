import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { FileText, Sparkles, Save, ArrowRight, LoaderCircle, PenLine } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useStudio } from "./provider";
import { Heading, ActiveProject, NeedProject, Field, SelectField, DemoNotice } from "./shared";
import type { Project } from "@/lib/studio/model";
export function StoryPage() {
  const { active } = useStudio();
  if (!active) return <NeedProject />;
  return <StoryWorkspace key={active.id} project={active} />;
}
function StoryWorkspace({ project }: { project: Project }) {
  const { update } = useStudio();
  const [draft, setDraft] = useState(project);
  const [busy, setBusy] = useState(false);
  const patch = (values: Partial<Project>) => setDraft((p) => ({ ...p, ...values }));
  const save = () => {
    if (!draft.name.trim() || !draft.story.trim()) {
      toast.error("กรุณากรอกชื่อและเนื้อเรื่อง");
      return false;
    }
    update(project.id, draft);
    toast.success("บันทึกเนื้อเรื่องแล้ว");
    return true;
  };
  const demo = () => {
    if (!draft.brief.trim()) {
      toast.error("กรุณาเล่าไอเดียของคุณก่อน");
      return;
    }
    setBusy(true);
    window.setTimeout(() => {
      patch({
        story: `${draft.name}\n\nตัวอย่างเนื้อเรื่องแนว${draft.genre} สำหรับ${draft.audience}\n\n${draft.brief}\n\nในเช้าวันหนึ่ง ตัวละครหลักพบกับสิ่งที่ไม่คาดคิด และตัดสินใจออกเดินทางพร้อมเพื่อนร่วมทาง ระหว่างทางพวกเขาได้พบอุปสรรคที่ต้องอาศัยความกล้าหาญและการร่วมมือกัน\n\nเมื่อมาถึงช่วงเวลาสำคัญ พวกเขาเลือกช่วยเหลือกันแทนที่จะยอมแพ้ ในที่สุดการเดินทางจึงทำให้ทุกคนเข้าใจความหมายของมิตรภาพ และกลับบ้านพร้อมเรื่องราวที่ไม่มีวันลืม\n\n[เนื้อเรื่องตัวอย่างสำเร็จรูป ไม่ได้สร้างด้วย AI]`,
      });
      setBusy(false);
      toast.info("โหลดเนื้อเรื่องตัวอย่างแล้ว สามารถแก้ไขได้");
    }, 650);
  };
  return (
    <>
      <Heading title="ไอเดียและเนื้อเรื่อง" subtitle="เปลี่ยนไอเดียให้เป็นเรื่องราวที่น่าจดจำ" />
      <ActiveProject />
      <DemoNotice />
      <div className="workspace-grid">
        <section className="panel">
          <h2 className="panel-title">
            <FileText className="text-bright" size={19} />
            จุดเริ่มต้นของเรื่องราว
          </h2>
          <Field label="ชื่อเนื้อเรื่อง">
            <input
              className="mt-2"
              required
              value={draft.name}
              onChange={(e) => patch({ name: e.target.value })}
              placeholder="ตั้งชื่อเรื่องราวของคุณ"
            />
          </Field>
          <Field label="ไอเดียหรือคำอธิบายเนื้อเรื่อง">
            <textarea
              className="mt-2"
              rows={5}
              value={draft.brief}
              onChange={(e) => patch({ brief: e.target.value })}
              placeholder="เล่าถึงตัวละคร การผจญภัย หรือสิ่งที่อยากให้เกิดขึ้นในเรื่อง..."
            />
          </Field>
          <div className="field-row">
            <SelectField
              label="แนวเนื้อเรื่อง"
              value={draft.genre}
              options={["ผจญภัย", "แฟนตาซี", "ตลก", "ดราม่า", "การศึกษา", "ไซไฟ"]}
              onChange={(genre) => patch({ genre })}
            />
            <SelectField
              label="ความยาวเนื้อเรื่อง"
              value={draft.length}
              options={["สั้น", "ปานกลาง", "ยาว"]}
              onChange={(length) => patch({ length })}
            />
          </div>
          <div className="field-row">
            <SelectField
              label="กลุ่มผู้ชม"
              value={draft.audience}
              options={["ทุกวัย", "เด็ก", "วัยรุ่น", "ผู้ใหญ่"]}
              onChange={(audience) => patch({ audience })}
            />
            <Field label="จำนวนตัวละครหลัก">
              <input
                className="mt-2"
                type="number"
                min={1}
                max={20}
                value={draft.characterCount}
                onChange={(e) =>
                  patch({ characterCount: Math.min(20, Math.max(1, Number(e.target.value))) })
                }
              />
            </Field>
          </div>
          <Button className="w-full" variant="hero" disabled={busy} onClick={demo}>
            {busy ? <LoaderCircle className="animate-spin" /> : <Sparkles />}ให้ AI
            ช่วยแต่งเนื้อเรื่อง<span className="text-[10px] opacity-75">(ตัวอย่าง)</span>
          </Button>
        </section>
        <section className="panel flex flex-col">
          <div className="flex justify-between">
            <h2 className="panel-title">
              <PenLine size={19} className="text-bright" />
              เนื้อเรื่องของคุณ
            </h2>
            <span className="text-[10px] text-muted-foreground">
              {draft.story.length.toLocaleString("th-TH")} ตัวอักษร
            </span>
          </div>
          <textarea
            aria-label="เนื้อเรื่องของคุณ"
            className="flex-1 min-h-96"
            value={draft.story}
            onChange={(e) => patch({ story: e.target.value })}
            placeholder="เขียนเนื้อเรื่องต้นฉบับของคุณที่นี่ หรือเริ่มต้นจากตัวอย่าง..."
          />
          <div className="form-actions">
            <Button variant="outline" onClick={save}>
              <Save />
              บันทึกเนื้อเรื่อง
            </Button>
            <Button asChild>
              <Link
                to="/characters"
                onClick={(e) => {
                  if (!save()) e.preventDefault();
                }}
              >
                 ไปสร้างตัวละคร
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
