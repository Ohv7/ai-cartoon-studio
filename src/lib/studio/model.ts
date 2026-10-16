export type Character = {
  id: string;
  name: string;
  gender: string;
  age: string;
  personality: string;
  appearance: string;
  clothing: string;
  prompt: string;
  style: string;
  image: string;
};
export type Scene = {
  id: string;
  name: string;
  description: string;
  location: string;
  time: string;
  mood: string;
  style: string;
  image: string;
};
export type Shot = {
  id: string;
  description: string;
  dialogue: string;
  camera: string;
  duration: number;
  characters: string[];
  image: string;
};
export type VideoSettings = {
  style: string;
  ratio: string;
  resolution: string;
  voice: string;
  subtitles: boolean;
  music: string;
};
export type Project = {
  id: string;
  name: string;
  createdAt: string;
  style: string;
  image: string;
  demo: boolean;
  story: string;
  brief: string;
  genre: string;
  length: string;
  audience: string;
  characterCount: number;
  characters: Character[];
  scenes: Scene[];
  shots: Shot[];
  video: VideoSettings;
};
export const STORE_KEY = "ai-cartoon-studio-v1";
export function makeProject(name: string, style = "3D Cartoon"): Project {
  return {
    id: crypto.randomUUID(),
    name: name.trim(),
    createdAt: new Date().toISOString(),
    style,
    image: "world",
    demo: false,
    story: "",
    brief: "",
    genre: "ผจญภัย",
    length: "สั้น",
    audience: "ทุกวัย",
    characterCount: 2,
    characters: [],
    scenes: [],
    shots: [],
    video: {
      style,
      ratio: "16:9",
      resolution: "1080p",
      voice: "ไม่มีเสียงบรรยาย",
      subtitles: true,
      music: "ไม่มีเพลง",
    },
  };
}
export function progress(p: Project) {
  return Math.round(
    ([!!p.story.trim(), p.characters.length > 0 && p.scenes.length > 0, p.shots.length > 0].filter(
      Boolean,
    ).length /
      3) *
      100,
  );
}
export function updateProject(projects: Project[], id: string, patch: Partial<Project>) {
  return projects.map((p) => (p.id === id ? { ...p, ...patch, id: p.id } : p));
}
export function reorderShots(shots: Shot[], index: number, direction: number) {
  const target = index + direction;
  if (target < 0 || target >= shots.length) return shots;
  const current = shots[index];
  const next = shots[target];
  if (!current || !next) return shots;
  const result = [...shots];
  result[index] = next;
  result[target] = current;
  return result;
}
export function parseProjects(raw: string | null): Project[] | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw);
    if (
      !Array.isArray(value) ||
      !value.every(
        (p) =>
          typeof p.id === "string" &&
          typeof p.name === "string" &&
          typeof p.story === "string" &&
          Array.isArray(p.characters) &&
          Array.isArray(p.scenes) &&
          Array.isArray(p.shots) &&
          p.video,
      )
    )
      return null;
    return value;
  } catch {
    return null;
  }
}
export function demoProjects(): Project[] {
  return ["การผจญภัยในป่ามหัศจรรย์", "หุ่นยนต์น้อยท่องอวกาศ", "ความลับของเกาะลอยฟ้า"].map(
    (name, i) => {
      const p = makeProject(name);
      p.demo = true;
      p.image = ["forest", "space", "world"][i] || "world";
      p.createdAt = "2026-10-16T04:00:00Z";
      p.story = `${name}\n\nมินะและบลูออกเดินทางเพื่อค้นหาความหมายของมิตรภาพ เมื่อพวกเขาพบเส้นทางที่ไม่เคยมีใครรู้จัก การผจญภัยครั้งใหม่จึงเริ่มขึ้น ทั้งสองต้องร่วมมือกันผ่านอุปสรรค และค้นพบว่าความกล้าหาญเริ่มต้นจากการเชื่อใจเพื่อน`;
      if (i !== 1) {
        p.characters = [
          {
            id: `${p.id}-c`,
            name: "มินะ",
            gender: "หญิง",
            age: "เด็ก",
            personality: "กล้าหาญและใจดี",
            appearance: "ผมสั้นสีน้ำตาล",
            clothing: "เสื้อกันฝนสีเหลือง",
            prompt: "",
            style: "3D Cartoon",
            image: "forest",
          },
        ];
        p.scenes = [
          {
            id: `${p.id}-s`,
            name: "ป่ามหัศจรรย์",
            description: "ป่าเขียวชอุ่มและสะพานหินโบราณ",
            location: "ป่า",
            time: "เช้า",
            mood: "อบอุ่น",
            style: "3D Cartoon",
            image: p.image,
          },
        ];
      }
      if (i === 2)
        p.shots = [
          {
            id: `${p.id}-shot`,
            description: "มินะได้พบกับบลูบนเกาะลอยฟ้า",
            dialogue: "ไปผจญภัยด้วยกันไหม?",
            camera: "มุมกว้าง",
            duration: 5,
            characters: p.characters[0] ? [p.characters[0].id] : [],
            image: p.image,
          },
        ];
      return p;
    },
  );
}
