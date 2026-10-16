export type AIService = "story" | "character" | "scene";
// Integrate real AI through authenticated server functions, never frontend secrets.
export const aiCapabilities: Record<AIService, boolean> = { story: false, character: false, scene: false };
