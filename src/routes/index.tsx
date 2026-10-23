import { createFileRoute } from "@tanstack/react-router";
import { Projects } from "@/components/studio/projects";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Cartoon Studio — โปรเจกต์ภาพการ์ตูนของฉัน" },
      {
        name: "description",
        content:
          "จัดการโปรเจกต์ภาพการ์ตูน เริ่มจากไอเดียและเนื้อเรื่อง ก่อนออกแบบตัวละครและฉาก",
      },
      { property: "og:title", content: "AI Cartoon Studio — โปรเจกต์ภาพการ์ตูนของฉัน" },
      {
        property: "og:description",
        content: "รวมโปรเจกต์ภาพการ์ตูนของคุณ พร้อมเริ่มไอเดีย เนื้อเรื่อง ตัวละคร และฉาก",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Projects,
});
