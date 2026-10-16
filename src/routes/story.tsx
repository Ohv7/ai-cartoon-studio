import { createFileRoute } from "@tanstack/react-router";
import { StoryPage } from "@/components/studio/story";
export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "เขียนเนื้อเรื่อง | AI Cartoon Studio" },
      {
        name: "description",
        content: "เขียนและแก้ไขเนื้อเรื่องการ์ตูน เลือกแนวเรื่องและกลุ่มผู้ชม",
      },
      { property: "og:title", content: "เขียนเนื้อเรื่อง | AI Cartoon Studio" },
      {
        property: "og:description",
        content: "เขียนและแก้ไขเนื้อเรื่องการ์ตูน เลือกแนวเรื่องและกลุ่มผู้ชม",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StoryPage,
});
