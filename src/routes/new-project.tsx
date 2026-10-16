import { createFileRoute } from '@tanstack/react-router';
import { NewProject } from '@/components/studio/projects';
export const Route = createFileRoute('/new-project')({
 head: () => ({meta:[{title:'สร้างโปรเจกต์ใหม่ | AI Cartoon Studio'},{name:'description',content:'เริ่มสร้างเรื่องราวการ์ตูนใหม่และเลือกสไตล์แอนิเมชัน'},{property:'og:title',content:'สร้างโปรเจกต์ใหม่ | AI Cartoon Studio'},{property:'og:description',content:'เริ่มสร้างเรื่องราวการ์ตูนใหม่และเลือกสไตล์แอนิเมชัน'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: NewProject,
});
