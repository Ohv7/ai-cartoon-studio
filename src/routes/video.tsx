import { createFileRoute } from '@tanstack/react-router';
import { VideoPage } from '@/components/studio/video';
export const Route = createFileRoute('/video')({
 head: () => ({meta:[{title:'สร้างวิดีโอ | AI Cartoon Studio'},{name:'description',content:'เตรียมการตั้งค่าวิดีโอและดูภาพนิ่งตัวอย่าง Storyboard โดยไม่จำลองการสร้างวิดีโอ AI'},{property:'og:title',content:'สร้างวิดีโอ | AI Cartoon Studio'},{property:'og:description',content:'เตรียมการตั้งค่าวิดีโอและดูภาพนิ่งตัวอย่าง Storyboard โดยไม่จำลองการสร้างวิดีโอ AI'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: VideoPage,
});
