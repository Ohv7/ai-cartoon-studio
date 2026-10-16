import { createFileRoute } from '@tanstack/react-router';
import { Gallery } from '@/components/studio/gallery';
export const Route = createFileRoute('/gallery')({
 head: () => ({meta:[{title:'คลังภาพการ์ตูน | AI Cartoon Studio'},{name:'description',content:'รวบรวมและดูรูปตัวละครและฉากการ์ตูนที่บันทึกไว้ในโปรเจกต์'},{property:'og:title',content:'คลังภาพการ์ตูน | AI Cartoon Studio'},{property:'og:description',content:'รวมรูปตัวละครและฉากในพื้นที่สร้างสรรค์ของคุณ'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: Gallery,
});
