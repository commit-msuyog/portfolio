import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

const SUYOG_SYSTEM_PROMPT = `You are the interactive AI persona representing Suyog Verma's portfolio.

Suyog Verma is a Computer Science undergraduate student specializing in AI/ML, Computer Vision, and C++ Systems.

Key facts about Suyog:
- Degree: B.Tech in CSE (AI/ML Specialization & Honors).
- Location: New Delhi, India.
- Core Philosophy: "Craft over convention. Rejecting cookie-cutter SaaS templates in favor of deterministic engineering, explainable AI architectures, and low-latency C++ implementations."
- Featured Projects:
  1. PREHIER: Candidate vector embedding & semantic alignment engine replacing keyword filters with cosine similarity and adaptive question synthesis. Stack: Python, FastAPI, LangChain, Vector DB, Streamlit.
  2. Investigation Support System: Automated video triage & multi-object tracking for forensic video. Multithreaded OpenCV DNN & YOLOv8 + SORT filter at 44.6 FPS.
  3. CredInsight AI: Transparent credit-risk classification with XGBoost and SHAP to eliminate black-box loan bias.
- Open Source: nlohmann/json (40k+ stars) and Soup C++ framework.
- Languages: Python, C++ (C++17/20), C, SQL.
- Contact: suyogverma.dev@gmail.com.

Respond in character as an articulate, technically rigorous, concise AI assistant. Keep answers under 150 words unless asked for an in-depth breakdown.`;

function getDeterministicResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('c++') || q.includes('cpp') || q.includes('nlohmann') || q.includes('soup')) {
    return `Suyog's C++ work centers on deterministic systems and open source:\n\n• **nlohmann/json (40k+ stars)**: serialization buffer edge cases, Clang/MSVC benchmarks.\n• **Soup Framework**: socket abstractions and a deterministic memory allocator for C++20.`;
  }
  if (q.includes('prehier') || q.includes('premier') || q.includes('interview')) {
    return `**PREHIER** turns resumes into vector embeddings, scores them with cosine similarity against job requirements, and generates difficulty-adjusted technical questions.`;
  }
  if (q.includes('vision') || q.includes('investigation') || q.includes('opencv') || q.includes('video')) {
    return `**Investigation Support System**: YOLOv8 + SORT tracking on multithreaded OpenCV pipelines, benchmarked at 44.6 FPS for forensic video triage.`;
  }
  if (q.includes('credinsight') || q.includes('shap') || q.includes('credit') || q.includes('xgboost')) {
    return `**CredInsight AI**: explainable credit-risk scoring with XGBoost and SHAP values, giving exact feature attribution for every decision.`;
  }
  if (q.includes('contact') || q.includes('hire') || q.includes('intern') || q.includes('email')) {
    return `Email: **suyogverma.dev@gmail.com**. Open to internships, research roles, and AI/C++ systems engineering.`;
  }
  return `Suyog Verma is a B.Tech CSE (AI/ML) student focused on explainable AI and high-performance C++. Try asking about: "C++ contributions", "Explain PREHIER", "Computer Vision pipeline", or "Contact".`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.json({ reply: getDeterministicResponse(prompt), model: 'deterministic-fallback' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `${SUYOG_SYSTEM_PROMPT}\n\nUser Question: ${prompt}` }] },
      ],
    });
    return res.json({ reply: response.text || 'No response generated.', model: 'gemini-2.5-flash' });
  } catch (err) {
    console.error('Gemini error:', err);
    return res.json({ reply: getDeterministicResponse(prompt), model: 'fallback-on-error' });
  }
}