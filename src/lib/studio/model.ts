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
export type Project = {
  id: string;
  name: string;
  title: string;
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
};
export const STORE_KEY = "ai-cartoon-studio-v1";
export const NEW_PROJECT_WORKSPACE = "/story" as const;
export const CARTOON_STYLES = ["3D Cartoon", "2D Cartoon", "Anime", "มังงะขาวดำ", "คอมิกสี", "มังงะสยองขวัญ"];
export function makeProject(name: string, style = "3D Cartoon"): Project {
  return {
    id: crypto.randomUUID(),
    name: name.trim(),
    title: "",
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

  };
}
export function progress(p: Project) {
  return (Number(p.characters.some(c => !!c.image)) + Number(p.scenes.some(s => !!s.image))) * 50;
}
export function updateProject(projects: Project[], id: string, patch: Partial<Project>) {
  return projects.map((p) => (p.id === id ? { ...p, ...patch, id: p.id } : p));
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
          Array.isArray(p.scenes),
      )
    )
      return null;
    return value.map((p) => ({
      ...p,
      title: typeof p.title === "string" ? p.title : p.name,
    }));
  } catch {
    return null;
  }
}
export function demoProjects(): Project[] {
  return ["การผจญภัยในป่ามหัศจรรย์", "หุ่นยนต์น้อยท่องอวกาศ", "ความลับของเกาะลอยฟ้า"].map(
    (name, i) => {
      const p = makeProject(name);
      p.demo = true;
      p.title = name;
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
      return p;
    },
  );
}
