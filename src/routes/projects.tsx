import { createFileRoute } from '@tanstack/react-router';
import { Projects } from '@/components/studio/projects';
export const Route = createFileRoute('/projects')({
 head: () => ({meta:[{title:'โปรเจกต์ของฉัน | AI Cartoon Studio'},{name:'description',content:'ค้นหา เปิด แก้ไข และจัดการโปรเจกต์การ์ตูนของคุณ'},{property:'og:title',content:'โปรเจกต์ของฉัน | AI Cartoon Studio'},{property:'og:description',content:'ค้นหา เปิด แก้ไข และจัดการโปรเจกต์การ์ตูนของคุณ'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: Projects,
});
