import { createFileRoute } from '@tanstack/react-router';
import { Dashboard } from '@/components/studio/dashboard';
export const Route = createFileRoute('/')({
 head: () => ({meta:[{title:'AI Cartoon Studio — สร้างวิดีโอการ์ตูนด้วยพลัง AI'},{name:'description',content:'พื้นที่สร้างสรรค์เรื่องราว ตัวละคร ฉาก และ Storyboard สำหรับวิดีโอการ์ตูนใน 3 ขั้นตอน'},{property:'og:title',content:'AI Cartoon Studio — พื้นที่แห่งจินตนาการ'},{property:'og:description',content:'เปลี่ยนไอเดียเป็นเรื่องราวการ์ตูน ด้วยสตูดิโอสร้างสรรค์ภาษาไทย'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: Dashboard,
});
