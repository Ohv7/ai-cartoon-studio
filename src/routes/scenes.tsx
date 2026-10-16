import { createFileRoute } from '@tanstack/react-router';
import { ScenePage } from '@/components/studio/creators';
export const Route = createFileRoute('/scenes')({
 head: () => ({meta:[{title:'สร้างฉาก | AI Cartoon Studio'},{name:'description',content:'ออกแบบฉาก สถานที่ ช่วงเวลา และบรรยากาศในโลกการ์ตูน'},{property:'og:title',content:'สร้างฉาก | AI Cartoon Studio'},{property:'og:description',content:'ออกแบบฉาก สถานที่ ช่วงเวลา และบรรยากาศในโลกการ์ตูน'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: ScenePage,
});
