import { createFileRoute } from "@tanstack/react-router";
import { NewProject } from "@/components/studio/projects";
export const Route = createFileRoute("/new-project")({
  head: () => ({
    meta: [
      { title: "สร้างโปรเจกต์ใหม่ | AI Cartoon Studio" },
      { name: "description", content: "เริ่มโปรเจกต์รูปตัวละครและฉากใหม่ พร้อมเลือกสไตล์ภาพการ์ตูน" },
      { property: "og:title", content: "สร้างโปรเจกต์ใหม่ | AI Cartoon Studio" },
      {
        property: "og:description",
        content: "เริ่มโปรเจกต์รูปตัวละครและฉากใหม่ พร้อมเลือกสไตล์ภาพการ์ตูน",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewProject,
});
