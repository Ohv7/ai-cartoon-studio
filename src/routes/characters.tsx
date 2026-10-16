import { createFileRoute } from "@tanstack/react-router";
import { CharacterPage } from "@/components/studio/creators";
export const Route = createFileRoute("/characters")({
  head: () => ({
    meta: [
      { title: "สร้างตัวละคร | AI Cartoon Studio" },
      { name: "description", content: "ออกแบบบุคลิก ลักษณะ และสไตล์ตัวละครสำหรับเรื่องราวของคุณ" },
      { property: "og:title", content: "สร้างตัวละคร | AI Cartoon Studio" },
      {
        property: "og:description",
        content: "ออกแบบบุคลิก ลักษณะ และสไตล์ตัวละครสำหรับเรื่องราวของคุณ",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CharacterPage,
});
