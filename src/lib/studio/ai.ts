export type AIService = 'story' | 'character' | 'scene' | 'video' | 'voice';
// Replace this adapter with authenticated server functions when a real AI service is connected.
export const aiCapabilities: Record<AIService,boolean> = { story:false,character:false,scene:false,video:false,voice:false };
export async function renderVideo(): Promise<never> { throw new Error('ยังไม่ได้เชื่อมต่อ AI rendering จึงยังไม่สามารถสร้างวิดีโอได้'); }
