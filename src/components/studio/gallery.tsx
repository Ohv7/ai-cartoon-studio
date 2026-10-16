import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Images, Users, Image, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStudio } from './provider';
import { Heading, ActiveProject, NeedProject, DemoNotice, Modal } from './shared';
import { imageFor } from '@/lib/studio/assets';
export function Gallery() {
 const {active} = useStudio();
 const [filter,setFilter] = useState('ทั้งหมด');
 const [preview,setPreview] = useState<{name:string;image:string;description:string} | null>(null);
 if(!active) return <NeedProject/>;
 const items = [ ...active.characters.filter(c => c.image).map(c => ({id:c.id,name:c.name,image:c.image,description:[c.appearance,c.clothing,c.personality].filter(Boolean).join(' · '),type:'ตัวละคร',style:c.style})), ...active.scenes.filter(s => s.image).map(s => ({id:s.id,name:s.name,image:s.image,description:s.description,type:'ฉาก',style:s.style})) ];
 const visible = items.filter(item => filter === 'ทั้งหมด' || item.type === filter);
 return <><Heading title="คลังภาพการ์ตูน" subtitle="รูปตัวละครและฉากที่บันทึกไว้ในโปรเจกต์"><div className="flex gap-2"><Button asChild variant="outline"><Link to="/characters"><Users/>สร้างตัวละคร</Link></Button><Button asChild><Link to="/scenes"><Image/>สร้างฉาก</Link></Button></div></Heading><ActiveProject/><DemoNotice/><div className="flex items-center gap-4 mb-6"><select aria-label="ประเภทภาพ" className="w-auto" value={filter} onChange={e => setFilter(e.target.value)}>{['ทั้งหมด','ตัวละคร','ฉาก'].map(value => <option key={value}>{value}</option>)}</select><span className="text-xs text-muted-foreground">{visible.length} รูป</span></div>{visible.length ? <div className="project-grid all-projects">{visible.map(item => <article className="project-card" key={`${item.type}-${item.id}`}><div className="project-cover"><img src={imageFor(item.image)} alt={item.name} width={1024} height={768} loading="lazy"/><span className="image-label">ภาพตัวอย่าง · {item.type}</span></div><div className="project-info"><h3>{item.name}</h3><p className="text-xs text-muted-foreground mb-4">{item.style}</p><Button variant="secondary" size="sm" onClick={() => setPreview(item)}><Eye/>ดูรูป</Button><Button asChild variant="ghost" size="sm"><Link to={item.type === 'ตัวละคร' ? '/characters' : '/scenes'}>แก้ไขรายละเอียด</Link></Button></div></article>)}</div> : <div className="empty-state"><Images size={42}/><h2>ยังไม่มีรูปที่บันทึกไว้</h2><p>รูปตัวละครและฉากของโปรเจกต์จะอยู่ที่นี่</p><Button asChild><Link to="/characters">เริ่มสร้างตัวละคร</Link></Button></div>}{preview && <Modal title={preview.name} onClose={() => setPreview(null)}><img className="preview-image" src={imageFor(preview.image)} alt={preview.name} width={1024} height={768}/><p className="text-xs text-bright mt-3">ภาพตัวอย่างสำเร็จรูป ไม่ได้สร้างด้วย AI จากคำอธิบาย</p><p className="text-sm text-muted-foreground mt-4 leading-7">{preview.description}</p></Modal>}</>;
}
