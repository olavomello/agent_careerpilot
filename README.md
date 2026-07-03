# CareerPilot AI — Universal Career Copilot

**CareerPilot AI** is a production-quality, adaptive AI Career Copilot built to accompany candidates of any industry, seniority, and career path (from Software Engineers and UX Designers to Nurses, Sales Representatives, and Accountants) throughout their hiring journey.

Unlike typical career assistants, CareerPilot AI does not assume a software engineering background. Every evaluation, resume scan, simulated interview question, and training roadmap is compiled dynamically based on the candidate's target job, experience level, and preferred language.

[APP - Deployed at Vercel](https://agent-careerpilot.vercel.app/)

## Key Features

1. **Language Gatekeeper (Multi-language Integration)**
   - Automatically prompts candidates to select their preferred language (English, Portuguese, Spanish) at initial load.
   - Instantly translates the frontend UI elements, sample resume profiles, and instructs the AI simulation engine to operate exclusively in that language.
2. **Dynamic UI Theme Alignment**
   - The UI color accent shifts dynamically using CSS Custom Properties depending on the chosen profession (e.g., Indigo for Technology, Teal for Healthcare, Magenta for Creative/Design, Orange for Sales, Sapphire for Finance).
3. **Resume Pilot (Profile Tailoring)**
   - Audits resumes against the candidate's target role. It identifies key strengths and points out critical gaps (such as regulatory certifications or client portfolios) without pushing coding portfolios to non-technical users.
4. **Roadmap Pilot (Personalized Milestones)**
   - Outlines a phase-by-phase learning path structured around standard professional benchmarks.
5. **Interview Pilot (Dynamic Simulation)**
   - Conducts an interactive, turn-by-turn mock interview. It matches the tone, vocabulary, and exercise formats appropriate to the domain (e.g. system design code critiques for engineers, patient clinical safety plans for nurses, or B2B objections for sales reps).
6. **Prompt Inspector**
   - A live developer dashboard that shows the exact system prompts and instructions sent to the AI, adapting on the fly as language, profession, or seniority parameters change.

---

## Folder Structure

```text
├── .agents/
│   └── AGENTS.md            # Guidelines for AI Builders modifying this repository
├── backend/
│   ├── server.js            # Express server, route registry, and API controllers
│   └── services/
│       └── ai.service.js    # System Prompt Taxonomy & Dynamic Compiler Engine
├── frontend/
│   ├── index.html           # Semantic HTML5 SPA layout
│   ├── styles.css           # Glassmorphism design tokens & responsive CSS
│   └── app.js               # State controller, multi-language mappings, and API bridge
├── .gitignore               # System & dependency ignores
├── AGENTS.md                # System instructions & dynamic prompt guidelines
├── docker-compose.yml       # Production container orchestration
└── package.json             # Root dependency configuration
```

---

## Architecture & Dynamic Prompt Engineering

The backend uses a localized system instruction taxonomy (`backend/services/ai.service.js`) to tailor LLM responses. For example:

- **Sales Rep / Marketing**: Injects sales pipeline vocabulary (e.g., LTV/CAC, Discovery) and schedules a "Sales Objection Elevator Pitch" roleplay exercise.
- **Nurse / Healthcare**: Injects clinical triage terms (e.g., Care Plan, Contraindication) and forces a "Clinical Case Scenario" roleplay.

### Prompt Translation Constraint

When generating system prompts, the target language selection is compiled into the system instructions:

```text
Language constraint: You MUST ask questions and provide feedback in {language}. Do not use any other language.
```

---

## Local Development Setup

Ensure you have [Node.js](https://nodejs.org/) (version 18+) installed.

### 1. Install Dependencies

Clone the repository and run:

```bash
npm install
```

### 2. Start the Server

Run the local Express development server:

```bash
npm run dev
```

The application will start on **`http://localhost:5000`**. You can open it in your browser to experience the responsive UI theme shifting, interactive interview simulator, and localized resume audit in Action.

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.
