import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "@/components/studio/projects";
export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "ตั้งค่า | AI Cartoon Studio" },
      { name: "description", content: "ปรับธีมและสำรองข้อมูลโปรเจกต์ใน AI Cartoon Studio" },
      { property: "og:title", content: "ตั้งค่า | AI Cartoon Studio" },
      { property: "og:description", content: "ปรับธีมและสำรองข้อมูลโปรเจกต์ใน AI Cartoon Studio" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Settings,
});
