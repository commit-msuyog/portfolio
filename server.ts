import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const SUYOG_SYSTEM_PROMPT = `You are the interactive AI persona representing Suyog Verma's portfolio.
Suyog Verma is a Computer Science undergraduate student specializing in AI/ML, Computer Vision, and C++ Systems.
Key facts about Suyog:
- Degree: B.Tech in CSE (AI/ML Specialization & Honors).
- Location: New Delhi, India (Coordinates: 28.6139° N, 77.2090° E).
- Core Philosophy: "Craft over convention. Rejecting cookie-cutter SaaS templates in favor of deterministic engineering, explainable AI architectures, and low-latency C++ implementations."
- Featured Projects:
  1. PREHIER: Candidate vector embedding & semantic alignment engine replacing keyword filters with cosine similarity and adaptive question synthesis. Stack: Python, FastAPI, LangChain, Vector DB, Streamlit.
  2. Investigation Support System: Automated video triage & multi-object tracking for forensic video. Detects anomalies and tracks trajectories with multithreaded OpenCV DNN & YOLOv8 + SORT filter at 44.6 FPS.
  3. CredInsight AI: Transparent credit-risk classification with XGBoost and SHAP (Shapley Additive exPlanations) to eliminate black-box loan bias with mathematical feature attribution.
- Open Source Stewardship:
  - nlohmann/json (40k+ stars): Contributed serialization buffer corner case fix, MSVC/Clang benchmarks, and type-safe lexer recovery.
  - Soup C++ framework: Socket abstraction, deterministic memory allocator, C++20 compliance.
- Languages: Python (ML/Scientific), C++ (C++17/20, high-performance systems), C (OS & memory), SQL.
- Contact: suyogverma.dev@gmail.com. Available for Summer & Fall 2025 technical internships, research assistantships, and systems engineering roles.

Respond in character as an articulate, technically rigorous, concise AI assistant for Suyog's portfolio. Keep responses informative, technical, and formatted neatly (can use markdown and code snippets). Keep answers under 150 words unless asked for an in-depth breakdown.`;

// AI Assistant endpoint
app.post('/api/ask-ai', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Deterministic intelligent fallback when API key is not configured in local environment
      return res.json({
        reply: getDeterministicResponse(prompt),
        model: 'deterministic-fallback'
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `${SUYOG_SYSTEM_PROMPT}\n\nUser Question: ${prompt}` }]
        }
      ]
    });

    const reply = response.text || 'No response generated.';
    return res.json({ reply, model: 'gemini-3.8-flash' });
  } catch (error: any) {
    console.error('Gemini API error:', error);
    // Graceful fallback to deterministic response
    const { prompt } = req.body;
    return res.json({
      reply: getDeterministicResponse(prompt || ''),
      model: 'fallback-on-error'
    });
  }
});

function getDeterministicResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('c++') || q.includes('cpp') || q.includes('nlohmann') || q.includes('soup')) {
    return `Suyog's C++ engineering centers on deterministic systems and open-source contribution:\n\n• **nlohmann/json (40k+ stars)**: Diagnosed serialization buffer edge cases in lexer states, benchmarked Clang/MSVC builds, and validated memory safety.\n• **Soup Framework**: Worked on socket abstractions and deterministic zero-heap memory allocators for C++20.\n• Philosophy: No unexplained overhead, deterministic cache locality, and zero-leak memory discipline.`;
  }
  if (q.includes('prehier') || q.includes('premier') || q.includes('interview') || q.includes('screening')) {
    return `**PREHIER** is Suyog's candidate evaluation engine. Rather than regex keyword matching, it parses resume token streams into high-dimensional vector embeddings, computes cosine similarity against job requirement clusters, and dynamically generates difficulty-adjusted technical questions tailored to the candidate's verified seniority level.`;
  }
  if (q.includes('vision') || q.includes('investigation') || q.includes('opencv') || q.includes('video')) {
    return `**Investigation Support System**: Built for forensic video triage. Employs YOLOv8 deep feature inference coupled with a SORT (Simple Online Realtime Tracking) filter on multithreaded OpenCV pipelines. Benchmarked at 44.6 FPS with real-time bounding box rectification and trajectory spatial prediction.`;
  }
  if (q.includes('credinsight') || q.includes('shap') || q.includes('credit') || q.includes('xgboost')) {
    return `**CredInsight AI**: Replaces black-box credit scoring with explainable tree ensembles (XGBoost). Computes game-theoretic Shapley values (SHAP) for every applicant, giving exact mathematical attribution for approval or denial (e.g., Debt-to-Income impact vs liquid reserves) with 92.4% confidence and 0.912 AUC-ROC on LendingClub data.`;
  }
  if (q.includes('contact') || q.includes('hire') || q.includes('intern') || q.includes('email')) {
    return `Suyog is open for **Summer & Fall 2025** technical internships, research roles, and AI/C++ systems engineering.\n\n• Email: **suyogverma.dev@gmail.com**\n• Turnaround: Usually under 24 hours.\n• Location: New Delhi (Open to remote or global relocation).`;
  }
  return `Suyog Verma is a B.Tech CSE (AI/ML) engineer specializing in verifiable AI architectures and high-performance C++ systems. Core highlights:\n\n• **3 Featured Architectures**: Prehier (Embedding evaluation), Investigation Support System (44.6 FPS video triage), and CredInsight (SHAP explainability).\n• **Open Source**: Direct merged contributions to \`nlohmann/json\` and \`Soup\`.\n• What would you like to explore? (Try asking about: "C++ contributions", "Explain PREHIER", "Computer Vision pipeline", or "Contact")`;
}

// Development with Vite vs Production
const isProduction = process.env.NODE_ENV === 'production';

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
