# AI Cartoon Studio

Create a modern, professional, responsive AI Cartoon Video Generator website called AI Cartoon Studio.

The website allows users to create AI-generated cartoon videos through a simple 3-step workflow:

Enter an original story or use AI to generate a story.

Generate and customize characters, scenes, and backgrounds.

Convert the story into a storyboard and prepare animated cartoon videos.

1. Design Theme

Design a modern AI SaaS dashboard with a premium, futuristic, clean, and minimal interface.

Color Palette:

Primary Blue: #2563EB

Bright Blue: #38BDF8

Dark Background: #080F1E

Sidebar Background: #0F172A

Card Background: #172338

White: #FFFFFF

Light Gray: #E2E8F0

Design requirements:

Use a blue, black, and white color scheme.

Dark sidebar with glowing blue active navigation.

Modern rounded cards and buttons.

Subtle blue gradient backgrounds.

Soft shadows and blue glowing effects.

Smooth hover animations and transitions.

Clean typography using Inter and Prompt fonts.

Use Lucide icons throughout the website.

Fully responsive for desktop, tablet, and mobile.

Professional dashboard layout similar to modern AI creative platforms.

Avoid overly colorful or childish UI.

The entire user interface must be in Thai, except for commonly used AI terms.

2. Website Layout

Create a fixed sidebar on the left with a logo at the top.

Sidebar navigation:

หน้าหลัก (Dashboard)

สร้างโปรเจกต์ใหม่ (New Project)

เขียนเนื้อเรื่อง (Story Generator)

สร้างตัวละคร (Character Creator)

สร้างฉาก (Scene Generator)

Storyboard

สร้างวิดีโอ (Video Generator)

โปรเจกต์ของฉัน (My Projects)

ตั้งค่า (Settings)

The top navigation bar should contain:

Page title

Search bar

Notification icon

User profile avatar

Light/Dark mode toggle

3. Dashboard Page

Create a beautiful dashboard homepage.

At the top, display a hero section with the heading:

"สร้างวิดีโอการ์ตูนด้วยพลัง AI"

Subtitle:
"เปลี่ยนจินตนาการของคุณให้กลายเป็นวิดีโอการ์ตูนได้ง่าย ๆ เพียง 3 ขั้นตอน"

Include a glowing blue primary button:
"เริ่มสร้างวิดีโอ"

Below the hero section, create 3 workflow cards:

Step 01: สร้างเนื้อเรื่อง
Users can write their own story or ask AI to generate one.

Step 02: สร้างตัวละครและฉาก
Users can generate characters, define personalities, and create backgrounds.

Step 03: สร้าง Storyboard และวิดีโอ
Users can divide stories into scenes, choose animation styles, and prepare cartoon videos.

Add a recent projects section with thumbnail previews and progress indicators.

4. Story Generator Page

Create an AI Story Generator interface.

Include:

Story title input

Large story description textarea

Genre dropdown: ผจญภัย, แฟนตาซี, ตลก, ดราม่า, การศึกษา, ไซไฟ

Story length selection: สั้น, ปานกลาง, ยาว

Target audience selection

Number of main characters

Button: "ให้ AI ช่วยแต่งเนื้อเรื่อง"

Button: "บันทึกเนื้อเรื่อง"

Button: "ไปขั้นตอนถัดไป"

Show the generated story in an editable text editor on the right side.

5. Character Creator Page

Create an AI character design workspace.

Features:

Character name

Gender and age range (optional)

Personality

Appearance description

Clothing and accessories

Character prompt

Character style selection:

Anime

3D Cartoon

2D Cartoon

Add a large character preview panel.

Include buttons:

"สร้างตัวละครด้วย AI"

"สร้างใหม่"

"บันทึกตัวละคร"

Allow users to create multiple characters and display them in a character gallery.

6. Scene Generator Page

Allow users to design cartoon environments.

Inputs:

Scene name

Scene description

Location

Time of day

Mood and atmosphere

Background style

Display a large scene preview.

Buttons:

"สร้างฉากด้วย AI"

"บันทึกฉาก"

7. Storyboard Editor

Create a visual storyboard editor.

Each storyboard card should contain:

Scene number

Scene preview

Scene description

Characters appearing in the scene

Dialogue

Camera angle

Duration in seconds

Users should be able to:

Add scenes

Edit scenes

Delete scenes

Reorder scenes

Assign characters to scenes

Edit dialogue

Preview the storyboard

Use a modern timeline-style layout with visual scene cards.

8. Video Generator Page

Create a video generation workspace.

Layout:

Large video preview area

Storyboard scene selection

Animation style selection

Video aspect ratio: 16:9, 9:16, 1:1

Resolution: 720p, 1080p

Voiceover settings

Subtitle toggle

Background music option

Video duration display

Include a prominent button:
"สร้างวิดีโอด้วย AI"

Below the preview, display a video timeline containing storyboard scenes.

Provide a progress indicator during video generation.

When a real video generation API is not connected, show clearly labeled demo previews and explain that AI rendering is not yet available. Do not simulate a completed AI-generated video or fake downloadable video files.

9. My Projects Page

Create a project management interface.

Show projects as grid cards containing:

Project thumbnail

Project name

Creation date

Progress status

Animation style

Buttons: Open, Edit, Delete

Include project search and filtering.

10. Functionality and Technical Requirements

Use:

React

TypeScript

Tailwind CSS

shadcn/ui

Lucide React icons

Implement:

React Router for page navigation

Reusable components

Functional forms and validation

Working project creation and editing

Project saving and loading using localStorage initially

Functional dark/light mode

Responsive sidebar

Toast notifications

Loading and empty states

Editable storyboard scenes

Consistent project data across all pages

Build the app with a modular architecture so that real AI APIs can be integrated later for:

Story generation using an LLM

Character image generation

Background image generation

AI text-to-video generation

Text-to-speech voiceovers

Do not expose API keys in frontend code.

For now, create a polished, fully navigable MVP with functional project management and clearly labeled demo states wherever external AI generation is not connected.

Important: Prioritize a beautiful user interface, intuitive workflow, Thai language support, and a consistent premium blue-black-white visual design.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9b70d081-7071-5d2c-b164-e6e61b251684).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
