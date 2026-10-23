# Portfolio

My personal portfolio website: a single page that introduces me, shows my projects and open-source work, lists the tools I use, and tells people how to reach me.

**Live site:** thesuyog.in

## About this project

I built this in one day at the **AI Skills House Phase II offline workshop** (organised by IICT) at the Google Gurugram office on 22 October 2026. I'm still learning web development, so this is a learning project and a work in progress.

## Workflow

This is how the project went from idea to repository:

1. **Design:** explored the look and layout in **Google Stitch**.
2. **Build:** moved into **Google AI Studio** and used prompts to generate the React code, then refined it step by step by describing what I wanted changed.
3. **Review:** checked each change in AI Studio's preview and read through the generated code to understand how the components fit together.
4. **Version control:** exported the project to this GitHub repository.
5. **Deploy:** hosting it live is the next step, and I'll add the link above once it's up.

Most of the code was generated with AI Studio. My part was the direction, the content, and learning how the pieces fit together along the way.

## What's on the site

- A single-page layout with sections for the intro, engineering philosophy, projects, open source, toolkit, and academic background, plus a contact footer.
- Detail pop-ups for each project and open-source entry.
- An index drawer for jumping between sections.
- A custom animated cursor on desktop (turned off on touch screens), a scrolling ticker, and entrance animations.
- An AI terminal: a chat-style window where visitors can ask questions about me. It uses the Gemini API when a key is configured and falls back to pre-written answers when it isn't.

The interactive panels in the projects section run on sample data. They are visual demos, not live models.

## Tools used

- **Design and build:** Google Stitch, Google AI Studio
- **Front end:** React, TypeScript, Vite, Tailwind CSS, `motion`, `lucide-react`
- **Back end:** Node.js with Express
- **AI:** Gemini API (`@google/genai`)