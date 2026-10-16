import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { toast } from 'sonner';
import { demoProjects, makeProject, parseProjects, STORE_KEY, updateProject, type Project } from '@/lib/studio/model';
type Studio = { projects: Project[]; active: Project | undefined; ready: boolean; theme: string; search: string; setSearch: (v: string) => void; toggleTheme: () => void; select: (id: string) => void; create: (name: string, style: string) => Project; update: (id: string, patch: Partial<Project>) => void; remove: (id: string) => void };
const Context = createContext<Studio | null>(null);
export function StudioProvider({ children }: { children: ReactNode }) {
 const [projects,setProjects] = useState<Project[]>([]); const [activeId,setActiveId] = useState(''); const [ready,setReady] = useState(false); const [theme,setTheme] = useState('dark'); const [search,setSearch] = useState('');
 useEffect(() => { try { const stored = parseProjects(localStorage.getItem(STORE_KEY)); const initial = stored ?? demoProjects(); setProjects(initial); setActiveId(localStorage.getItem('studio-active') || initial[0]?.id || ''); setTheme(localStorage.getItem('studio-theme') || 'dark'); } catch { setProjects(demoProjects()); toast.error('ไม่สามารถอ่านข้อมูลในเครื่องได้'); } setReady(true); }, []);
 useEffect(() => { if(!ready) return; try { localStorage.setItem(STORE_KEY,JSON.stringify(projects)); localStorage.setItem('studio-active',activeId); localStorage.setItem('studio-theme',theme); } catch { toast.error('บันทึกไม่สำเร็จ พื้นที่จัดเก็บในเครื่องอาจเต็ม'); } },[projects,activeId,theme,ready]);
 useEffect(() => { document.documentElement.dataset['theme'] = theme; },[theme]);
 const create = (name: string, style: string) => { const p = makeProject(name,style); setProjects(prev => [p,...prev]); setActiveId(p.id); toast.success('สร้างโปรเจกต์เรียบร้อย'); return p; };
 const update = (id: string, patch: Partial<Project>) => setProjects(prev => updateProject(prev,id,patch));
 const remove = (id: string) => { setProjects(prev => prev.filter(p => p.id !== id)); if(activeId === id) setActiveId(projects.find(p => p.id !== id)?.id || ''); toast.success('ลบโปรเจกต์เรียบร้อย'); };
 return <Context.Provider value={{ projects,active: projects.find(p => p.id === activeId) || projects[0],ready,theme,search,setSearch,toggleTheme: () => setTheme(t => t === 'dark' ? 'light' : 'dark'),select:setActiveId,create,update,remove }}>{children}</Context.Provider>;
}
export function useStudio() { const context = useContext(Context); if(!context) throw new Error('StudioProvider missing'); return context; }
