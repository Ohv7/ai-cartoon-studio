import { describe,it,expect } from 'vitest';
import { makeProject,updateProject,reorderShots,parseProjects } from './model';
import { aiCapabilities,renderVideo } from './ai';
describe('project lifecycle',() => {
 it('creates independent projects with empty editable workspaces',() => {const a=makeProject('ต้นฉบับ');const b=makeProject('เรื่องใหม่'); expect(a.id).not.toBe(b.id);expect(a.name).toBe('ต้นฉบับ');expect(a.shots).toEqual([]);expect(a.demo).toBe(false);});
 it('persists and loads saved projects using JSON',() => {const p=makeProject('เรื่องของฉัน');p.story='ต้นฉบับของฉัน';expect(parseProjects(JSON.stringify([p]))?.[0].story).toBe('ต้นฉบับของฉัน');});
 it('edits only the selected project',() => {const a=makeProject('หนึ่ง');const b=makeProject('สอง');const result=updateProject([a,b],a.id,{story:'ใหม่'});expect(result[0].story).toBe('ใหม่');expect(result[1].story).toBe('');});
 it('reorders storyboard scenes without dropping scenes',() => {const shots=[{id:'a'},{id:'b'},{id:'c'}] as Parameters<typeof reorderShots>[0];expect(reorderShots(shots,0,1).map(s=>s.id)).toEqual(['b','a','c']);expect(reorderShots(shots,0,-1).map(s=>s.id)).toEqual(['a','b','c']);});
 it('does not offer fake video rendering',async() => {expect(aiCapabilities.video).toBe(false);await expect(renderVideo()).rejects.toThrow('ยังไม่ได้เชื่อมต่อ AI rendering');});
});
