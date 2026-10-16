import { createFileRoute } from '@tanstack/react-router';
import { StoryboardPage } from '@/components/studio/storyboard';
export const Route = createFileRoute('/storyboard')({
 head: () => ({meta:[{title:'Storyboard | AI Cartoon Studio'},{name:'description',content:'จัดลำดับฉาก บทสนทนา ตัวละคร มุมกล้อง และระยะเวลา'},{property:'og:title',content:'Storyboard | AI Cartoon Studio'},{property:'og:description',content:'จัดลำดับฉาก บทสนทนา ตัวละคร มุมกล้อง และระยะเวลา'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: StoryboardPage,
});
