import { describe, it, expect } from "vitest";
import { makeProject, updateProject, progress, parseProjects, NEW_PROJECT_WORKSPACE } from "./model";
import { aiCapabilities } from "./ai";
describe("project lifecycle", () => {
  it("creates independent projects with empty editable workspaces", () => {
    const a = makeProject("ต้นฉบับ");
    const b = makeProject("เรื่องใหม่");
    expect(a.id).not.toBe(b.id);
    expect(a.name).toBe("ต้นฉบับ");
    expect(a.characters).toEqual([]);
    expect(a.scenes).toEqual([]);
    expect(a.demo).toBe(false);
  });
  it("persists and loads saved projects using JSON", () => {
    const p = makeProject("เรื่องของฉัน");
    p.story = "ต้นฉบับของฉัน";
    expect(parseProjects(JSON.stringify([p]))?.[0]?.story).toBe("ต้นฉบับของฉัน");
  });
  it("edits only the selected project", () => {
    const a = makeProject("หนึ่ง");
    const b = makeProject("สอง");
    const result = updateProject([a, b], a.id, { story: "ใหม่" });
    expect(result[0]?.story).toBe("ใหม่");
    expect(result[1]?.story).toBe("");
  });
  it("starts named projects with ideas and story rather than characters", () => {
    expect(NEW_PROJECT_WORKSPACE).toBe("/story");
  });
  it("counts character and scene images as two equal progress stages", () => {
    const p = makeProject("ภาพใหม่");
    expect(progress(p)).toBe(0);
    p.characters = [{ id: "c", name: "มินะ", gender: "หญิง", age: "เด็ก", personality: "", appearance: "", clothing: "", prompt: "", style: p.style, image: "forest" }];
    expect(progress(p)).toBe(50);
    p.scenes = [{ id: "s", name: "ป่า", description: "ป่าเขียว", location: "ป่า", time: "เช้า", mood: "อบอุ่น", style: p.style, image: "forest" }];
    expect(progress(p)).toBe(100);
  });
  it("keeps the project name separate from the story title", () => {
    const p = makeProject("คลังภาพของฉัน");
    expect(p.name).toBe("คลังภาพของฉัน");
    expect(p.title).toBe("");
    const edited = updateProject([p], p.id, { title: "การผจญภัยในป่า" });
    expect(edited[0]?.name).toBe("คลังภาพของฉัน");
    expect(edited[0]?.title).toBe("การผจญภัยในป่า");
    expect(parseProjects(JSON.stringify(edited))?.[0]?.title).toBe("การผจญภัยในป่า");
  });
  it("uses the stored project name as the story title for older saved projects", () => {
    const legacy = { id: "1", name: "โปรเจกต์เดิม", story: "", characters: [], scenes: [] };
    expect(parseProjects(JSON.stringify([legacy]))?.[0]?.title).toBe("โปรเจกต์เดิม");
  });
  it("keeps legacy stored projects readable without requiring video fields", () => {
    const p = makeProject("โปรเจกต์เดิม");
    const legacy = { ...p, shots: [{ id: "old" }], video: {} };
    expect(parseProjects(JSON.stringify([legacy]))?.[0]?.name).toBe("โปรเจกต์เดิม");
    expect(parseProjects(JSON.stringify([p]))?.[0]?.characters).toEqual([]);
  });
  it("does not claim real AI generation is connected", () => {
    expect(aiCapabilities).toEqual({ story: false, character: false, scene: false });
  });
});
