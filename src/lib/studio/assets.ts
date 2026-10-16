import world from '@/assets/studio-world.jpg';
import forest from '@/assets/forest-adventure.jpg';
import space from '@/assets/space-adventure.jpg';
export const artwork: Record<string, string> = { world, forest, space };
export function imageFor(key: string) { return artwork[key] || world; }
