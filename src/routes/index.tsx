import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/studio/dashboard";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Cartoon Studio — สร้างรูปและฉากการ์ตูนด้วย AI" },
      {
        name: "description",
        content:
          "พื้นที่ออกแบบรูปตัวละครและฉากการ์ตูน พร้อมคลังภาพและการบันทึกโปรเจกต์",
      },
      { property: "og:title", content: "AI Cartoon Studio — พื้นที่แห่งจินตนาการ" },
      {
        property: "og:description",
        content: "เปลี่ยนไอเดียเป็นรูปและฉากการ์ตูน ด้วยสตูดิโอสร้างสรรค์ภาษาไทย",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});
