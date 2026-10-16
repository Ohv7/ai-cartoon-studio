import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Play, Pause, Video, Save, Sparkles, Clapperboard, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useStudio } from "./provider";
import { Heading, ActiveProject, NeedProject, DemoNotice, SelectField } from "./shared";
import type { Project } from "@/lib/studio/model";
import { imageFor } from "@/lib/studio/assets";
import { renderVideo } from "@/lib/studio/ai";
export function VideoPage() {
  const { active } = useStudio();
  return active ? <VideoWorkspace key={active.id} project={active} /> : <NeedProject />;
}
function VideoWorkspace({ project }: { project: Project }) {
  const { update } = useStudio();
  const [settings, setSettings] = useState(project.video);
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const shots = project.shots;
  const shot = shots[selected];
  const patch = (p: Partial<typeof settings>) => setSettings((s) => ({ ...s, ...p }));
  useEffect(() => {
    if (!playing || !shot) return;
    const timer = window.setTimeout(() => {
      if (selected < shots.length - 1) setSelected((i) => i + 1);
      else setPlaying(false);
    }, shot.duration * 1000);
    return () => window.clearTimeout(timer);
  }, [playing, selected, shots, shot]);
  const generate = async () => {
    setChecking(true);
    setError("");
    try {
      await renderVideo();
    } catch (e) {
      const message = e instanceof Error ? e.message : "ไม่สามารถสร้างวิดีโอได้";
      setError(message);
      toast.info(message);
    } finally {
      setChecking(false);
    }
  };
  return (
    <>
      <Heading
        title="เตรียมสร้างวิดีโอ"
        subtitle="กำหนดรูปแบบและตรวจสอบ Storyboard ก่อนสร้างแอนิเมชัน"
      />
      <ActiveProject />
      <DemoNotice video />
      <div className="workspace-grid">
        <section className="panel">
          <h2 className="panel-title">
            <Video size={19} className="text-bright" />
            ตัวอย่างภาพนิ่ง Storyboard
          </h2>
          <div className="video-preview" style={{ aspectRatio: settings.ratio.replace(":", "/") }}>
            {shot ? (
              <>
                <img
                  src={imageFor(shot.image)}
                  alt="ภาพนิ่งตัวอย่าง ไม่ใช่วิดีโอ AI"
                  width={1024}
                  height={768}
                />
                <span className="preview-tag image-label">
                  ตัวอย่างภาพนิ่ง · ฉาก {selected + 1}
                </span>
                <Button
                  className="play-control"
                  size="icon"
                  onClick={() => setPlaying((v) => !v)}
                  aria-label={playing ? "หยุดตัวอย่างภาพนิ่ง" : "เล่นตัวอย่างภาพนิ่ง"}
                >
                  {playing ? <Pause /> : <Play />}
                </Button>
              </>
            ) : (
              <div className="preview-empty border-0">
                <Clapperboard size={40} />
                <p>ยังไม่มีฉากใน Storyboard</p>
                <Button asChild variant="outline">
                  <Link to="/storyboard">เพิ่มฉากใน Storyboard</Link>
                </Button>
              </div>
            )}
          </div>
          {shot && (
            <div className="mt-4">
              <p className="text-sm">{shot.description}</p>
              {settings.subtitles && <p className="text-sm text-bright mt-2">{shot.dialogue}</p>}
            </div>
          )}
          <div className="flex justify-between text-xs text-muted-foreground mt-5">
            <span>ลำดับภาพนิ่งตัวอย่าง</span>
            <span>{shots.reduce((n, s) => n + s.duration, 0)} วินาที</span>
          </div>
          <div className="timeline">
            {shots.map((s, i) => (
              <Button
                key={s.id}
                variant={selected === i ? "secondary" : "ghost"}
                className="timeline-item h-auto p-2 flex-col"
                onClick={() => {
                  setSelected(i);
                  setPlaying(false);
                }}
              >
                <img src={imageFor(s.image)} alt={`ฉาก ${i + 1}`} width={1024} height={768} />
                <span className="text-xs">
                  ฉาก {i + 1} · {s.duration} วินาที
                </span>
              </Button>
            ))}
          </div>
        </section>
        <section className="panel">
          <h2 className="panel-title">ตั้งค่าวิดีโอ</h2>
          <SelectField
            label="ฉากที่แสดง"
            value={String(selected)}
            options={
              shots.length
                ? shots.map((_, i) => ({ value: String(i), label: `ฉาก ${i + 1}` }))
                : [{ value: "0", label: "ยังไม่มีฉาก" }]
            }
            onChange={(v) => setSelected(Number(v))}
          />
          <SelectField
            label="สไตล์แอนิเมชัน"
            value={settings.style}
            options={["3D Cartoon", "2D Cartoon", "Anime"]}
            onChange={(style) => patch({ style })}
          />
          <div className="field-row">
            <SelectField
              label="อัตราส่วนวิดีโอ"
              value={settings.ratio}
              options={["16:9", "9:16", "1:1"]}
              onChange={(ratio) => patch({ ratio })}
            />
            <SelectField
              label="ความละเอียด"
              value={settings.resolution}
              options={["720p", "1080p"]}
              onChange={(resolution) => patch({ resolution })}
            />
          </div>
          <SelectField
            label="เสียงบรรยาย (ยังไม่พร้อมใช้งาน)"
            value={settings.voice}
            options={["ไม่มีเสียงบรรยาย", "เสียงหญิงภาษาไทย", "เสียงชายภาษาไทย"]}
            onChange={(voice) => patch({ voice })}
          />
          <label className="flex items-center gap-3 my-5">
            <input
              type="checkbox"
              checked={settings.subtitles}
              onChange={(e) => patch({ subtitles: e.target.checked })}
            />
            แสดงบทสนทนาเป็นคำบรรยาย
          </label>
          <SelectField
            label="เพลงประกอบ (ยังไม่พร้อมใช้งาน)"
            value={settings.music}
            options={["ไม่มีเพลง", "ผจญภัย", "อบอุ่น", "แฟนตาซี"]}
            onChange={(music) => patch({ music })}
          />
          <div className="flex justify-between border-t border-border py-5 text-sm">
            <span className="text-muted-foreground">ความยาวรวม</span>
            <span>{shots.reduce((n, s) => n + s.duration, 0)} วินาที</span>
          </div>
          <Button
            variant="outline"
            className="w-full mb-3"
            onClick={() => {
              update(project.id, { video: settings });
              toast.success("บันทึกการตั้งค่าวิดีโอแล้ว");
            }}
          >
            <Save />
            บันทึกการตั้งค่า
          </Button>
          <Button
            variant="hero"
            className="w-full"
            onClick={generate}
            disabled={!shots.length || checking}
          >
            {checking ? <LoaderCircle className="animate-spin" /> : <Sparkles />}สร้างวิดีโอด้วย AI
          </Button>
          <p className="text-center text-xs text-muted-foreground mt-3">
            ยังไม่ได้เชื่อมต่อบริการ AI rendering
          </p>
          {checking && (
            <p role="status" className="text-bright mt-3">
              กำลังตรวจสอบบริการ...
            </p>
          )}
          {error && (
            <div role="status" className="demo-notice mt-5 mb-0">
              {error}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
