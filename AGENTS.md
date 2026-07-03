# CareerPilot AI — AI Builder & Agent Guidelines (AGENTS.md)

Welcome, AI Agent or Developer. This document contains the operational rules, architectural design principles, and prompting templates required to maintain, expand, and run **CareerPilot AI**.

CareerPilot AI is a **universal AI Career Copilot** that dynamically adapts to a candidate's profession, seniority, and industry without assuming a software engineering background.

---

## 1. Core Platform Principles

When modifying or interacting with the CareerPilot AI repository, adhere to the following principles:

1. **Zero Technical Bias by Default**: Never assume the user needs coding interviews, portfolio reviews, or specific business metrics unless their target profile explicitly dictates it.
2. **Adaptive Taxonomy**: Dynamic layouts, terminology, and AI simulations must align exactly with the profession's standard practices.
   - *Example (Software Engineering)*: Focus on algorithms, system design, framework selection, and debugging.
   - *Example (Nursing)*: Focus on clinical care plans, triage, patient safety, communication, and medical ethics.
   - *Example (UX Design)*: Focus on design sprints, wireframing, user testing, usability heuristics, and portfolios.
   - *Example (Sales)*: Focus on negotiation, objection handling, sales cycles (B2B/B2C), and product demos.
3. **Seniority Calibration**: Differentiate advice, roadmaps, and interview intensity between entry-level, mid-level, senior, and executive candidates.
4. **Actionable Growth**: Do not just point out flaws. The AI Copilot must offer clear learning path recommendations, mock assessment scenarios, and resume adjustments.
5. **Dynamic Localization (Multi-language Integration)**: The candidate must select their preferred language at the very beginning of their session. The entire interface, UI content, and AI response prompts must be compiled and outputted exclusively in the selected language (e.g., English, Portuguese, Spanish).

---

## 2. Dynamic Prompt Engineering Guidelines

The backend uses a dynamic prompt generator (`ai.service.js`) to shape the LLM's personality, vocabulary, and questions. When editing the AI services, use the templates defined below.

### A. System Prompts Taxonomy

The table below outlines the core attributes mapped per domain. All prompt compilation must respect the selected target language constraint.

| Domain | Focus Areas | Key Vocabulary / Terminology | Simulated Exercise |
| :--- | :--- | :--- | :--- |
| **Technology** | Clean code, systems design, scalability, CI/CD, algorithms | "Complexity", "Latency", "Refactoring", "Architecture" | Code review, design critique |
| **Healthcare** | Patient safety, clinical triage, HIPAA/compliance, empathy | "Intervention", "Protocol", "Assessment", "Care plan" | Clinical scenario roleplay |
| **Design** | User research, wireframing, UX heuristics, visual hierarchy | "Affordance", "Fitts' Law", "Persona", "Usability" | Design critique, whiteboard challenge |
| **Sales** | Funnel, objection handling, closing, pipeline, B2B | "Discovery", "LTV/CAC", "Qualifying", "Value Prop" | Objection roleplay, pitch critique |
| **Finance** | Auditing, cash flow, GAAP/IFRS, reconciliation, risk | "Ledger", "Variance", "EBITDA", "Compliance", "Equity" | Ledger audit, risk assessment |

### B. Prompt Template: Interview Pilot Simulation
```
You are an expert interviewer specializing in {profession} at the {seniority} level.
Your goal is to conduct a highly realistic, interactive interview tailored to the role of {target_job}.

Rules:
1. Conduct the interview ONE question at a time.
2. Adapt your language to {profession}. Do NOT use software development terminology unless the profession is Software Engineering.
3. Focus on: {focus_areas}
4. Respond in character, acknowledging the candidate's last answer and asking the next logical question. Keep your responses concise (under 3 sentences).
5. Ensure the exercise format is: {exercise_format}
6. Language constraint: You MUST ask questions and provide feedback in {language}. Do not use any other language.
```

### C. Prompt Template: Resume Scan & Optimization
```
Analyze the candidate's resume/profile under the context of:
- Profession: {profession}
- Seniority: {seniority}
- Target Role: {target_job}

Provide an actionable, structured audit with three sections:
1. "Tailoring Score": Out of 100, based on keyword matching and relevance to standard {profession} roles.
2. "Strengths": What makes them stand out for {target_job}.
3. "Critical Gaps": Specific missing items (e.g. portfolio, clinical hours, sales metrics, regulatory certifications). DO NOT suggest coding portfolios to non-technical users.

Language constraint: You MUST write your complete analysis in {language}.
```

---

## 3. UI/UX Design System Rules

For frontend updates, you must maintain a highly premium visual style.

1. **Vibrant HSL Palette Shift**: The interface color accent must shift dynamically based on the chosen career path:
   - *Tech/Eng*: Cyber Cyan / Indigo (`hsl(220, 90%, 50%)`)
   - *Healthcare*: Healing Teal (`hsl(170, 75%, 40%)`)
   - *Design/Creative*: Artistic Amber / Magenta (`hsl(330, 80%, 55%)`)
   - *Sales/Marketing*: Dynamic Emerald / Orange (`hsl(140, 70%, 42%)`)
   - *Finance/Admin*: Classic Sapphire (`hsl(215, 60%, 30%)`)
2. **Glassmorphism**: Use semi-transparent frosted-glass surfaces for cards and sidebars:
   ```css
   background: rgba(255, 255, 255, 0.05);
   backdrop-filter: blur(16px);
   border: 1px solid rgba(255, 255, 255, 0.1);
   ```
3. **Micro-Animations**: All button hovers, page transitions, and status updates must use smooth cubic-bezier transitions (`transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);`).
4. **No Placeholders**: Render real mock data, functional chats, and dynamically generated roadmap cards.
5. **Language Gatekeeper**: The application must initialize with a modern language selection screen or a clear header selector, which instantly translates all static UI keys, placeholder examples, and updates the state of the AI Agent simulation.

---

## 4. Development Workflow & Validation for AI Agents

When editing this codebase:

1. **Keep documentation updated**: If you add a new profession to the switcher, update the system prompt taxonomy in this `AGENTS.md` and the frontend UI state mappings.
2. **Verify layouts**: Verify that changing the active career on the frontend changes the styling theme, updates the sample resume text, switches the interview simulation questions, and regenerates the roadmap modules.
3. **Verify Language Localization**: Changing the language must translate all interface text (sidebar, buttons, panel titles) and reset/reconfigure active AI simulation sessions in the targeted language.
4. **No External Framework Bloat**: Use modern standard HTML5, CSS3 Custom Properties, and ES6 Javascript. Avoid adding heavy, unnecessary NPM modules. Keep it modular, clean, and fast.
