/**
 * AI Service for CareerPilot AI
 * Dynamically constructs prompt templates, system instructions, and schemas
 * tailored to a user's profession, seniority, target job, and preferred language.
 * Follows the guidelines specified in AGENTS.md.
 */

const DOMAIN_TAXONOMY = {
  technology: {
    focusAreas: {
      en: "Clean code, systems design, scalability, CI/CD, data structures and algorithms",
      pt: "Código limpo, design de sistemas, escalabilidade, CI/CD, estruturas de dados e algoritmos",
      es: "Código limpio, diseño de sistemas, escalabilidad, CI/CD, estructuras de datos y algoritmos"
    },
    keyVocabulary: ["Complexity", "Latency", "Refactoring", "Architecture", "Idempotency"],
    exerciseFormat: {
      en: "Interactive Code Review or System Design Critique",
      pt: "Revisão Interativa de Código ou Crítica de Arquitetura de Sistemas",
      es: "Revisión Interactiva de Código o Crítica de Diseño de Sistemas"
    }
  },
  healthcare: {
    focusAreas: {
      en: "Patient safety, clinical triage, HIPAA/compliance, therapeutic communication, medical ethics",
      pt: "Segurança do paciente, triagem clínica, conformidade regulatória, comunicação terapêutica, ética médica",
      es: "Seguridad del paciente, triaje clínico, cumplimiento normativo, comunicación terapéutica, ética médica"
    },
    keyVocabulary: ["Intervention", "Protocol", "Assessment", "Care plan", "Contraindication"],
    exerciseFormat: {
      en: "Clinical Case Scenario Roleplay",
      pt: "Simulação de Cenário Clínico e Planejamento de Cuidados",
      es: "Simulación de Escenario Clínico y Planificación de Cuidados"
    }
  },
  design: {
    focusAreas: {
      en: "User research, wireframing, UX heuristics, visual hierarchy, user journey mapping, design systems",
      pt: "Pesquisa com usuários, wireframing, heurísticas de UX, hierarquia visual, mapeamento de jornada, design systems",
      es: "Investigación con usuarios, wireframing, heurísticas de UX, jerarquía visual, mapa de experiencia, design systems"
    },
    keyVocabulary: ["Affordance", "Fitts' Law", "Persona", "Usability", "Wireframe"],
    exerciseFormat: {
      en: "Design Critique or Whiteboard Challenge Walkthrough",
      pt: "Crítica de Design ou Exercício de Desafio Whiteboard",
      es: "Crítica de Diseño o Ejercicio de Desafío de Pizarra Blanca"
    }
  },
  sales: {
    focusAreas: {
      en: "Sales pipeline, objection handling, closing strategies, B2B/B2C communication, active listening",
      pt: "Pipeline de vendas, contorno de objeções, estratégias de fechamento, comunicação B2B/B2C, escuta ativa",
      es: "Pipeline de ventas, manejo de objeciones, estrategias de cierre, comunicación B2B/B2C, escucha activa"
    },
    keyVocabulary: ["Discovery", "LTV/CAC", "Qualifying", "Value Proposition", "Churn"],
    exerciseFormat: {
      en: "Objection Handling Roleplay & Elevator Pitch critique",
      pt: "Simulação de Contorno de Objeções e Crítica de Pitch de Vendas",
      es: "Simulación de Manejo de Objeciones y Crítica de Pitch de Ventas"
    }
  },
  finance: {
    focusAreas: {
      en: "Auditing, cash flow statements, GAAP/IFRS standards, reconciliation, risk assessment and modeling",
      pt: "Auditoria, demonstrações de fluxo de caixa, normas GAAP/IFRS, reconciliação, avaliação de risco e modelagem",
      es: "Auditoría, estados de flujo de caja, normas GAAP/IFRS, conciliación, evaluación de riesgos y modelado"
    },
    keyVocabulary: ["Ledger", "Variance", "EBITDA", "Compliance", "Equity", "Depreciation"],
    exerciseFormat: {
      en: "Ledger Audit Simulation or Financial Risk Case Study",
      pt: "Simulação de Auditoria de Razão ou Estudo de Caso de Risco Financeiro",
      es: "Simulación de Auditoría de Libro Mayor o Estudio de Caso de Riesgo Financiero"
    }
  }
};

// Map typical professions to our system taxonomies
function mapProfessionToDomain(profession) {
  const p = (profession || "").toLowerCase();
  if (p.includes("engineer") || p.includes("developer") || p.includes("coder") || p.includes("tech") || p.includes("data analyst")) {
    return "technology";
  }
  if (p.includes("nurse") || p.includes("doctor") || p.includes("therapist") || p.includes("medical") || p.includes("dentist")) {
    return "healthcare";
  }
  if (p.includes("design") || p.includes("artist") || p.includes("creative") || p.includes("illustrator")) {
    return "design";
  }
  if (p.includes("sale") || p.includes("marketing") || p.includes("account executive") || p.includes("business dev")) {
    return "sales";
  }
  if (p.includes("accountant") || p.includes("finance") || p.includes("auditor") || p.includes("banker")) {
    return "finance";
  }
  // Default fallback to sales/business taxonomy for generic roles
  return "sales";
}

/**
 * Returns localized instruction language headers based on chosen language
 */
function getLanguageLabel(lang) {
  const mapping = {
    en: "English",
    pt: "Portuguese (Português)",
    es: "Spanish (Español)"
  };
  return mapping[lang] || mapping.en;
}

class AIService {
  /**
   * Generates the system prompt for Interview Pilot Simulation
   */
  generateInterviewSystemPrompt(profession, seniority, targetJob, language = "en") {
    const domainKey = mapProfessionToDomain(profession);
    const domain = DOMAIN_TAXONOMY[domainKey];
    const focus = domain.focusAreas[language] || domain.focusAreas.en;
    const vocabulary = domain.keyVocabulary.join(", ");
    const exercise = domain.exerciseFormat[language] || domain.exerciseFormat.en;
    const targetLanguage = getLanguageLabel(language);

    return `You are an expert interviewer specializing in ${profession} at the ${seniority} level.
Your goal is to conduct a highly realistic, interactive interview tailored to the role of ${targetJob}.

Rules:
1. Conduct the interview ONE question at a time. Do not dump all questions at once.
2. Adapt your language to ${profession}. Do NOT use software development terminology unless the profession is Software Engineering.
3. Focus on: ${focus}.
4. Use standard industry vocabulary when appropriate (e.g. ${vocabulary}).
5. Respond in character, acknowledging the candidate's last answer and asking the next logical question. Keep your responses concise (under 3 sentences).
6. Ensure the exercise format is: ${exercise}.
7. Language constraint: You MUST ask questions, comment, and provide feedback exclusively in ${targetLanguage}. Do not use any other language.`;
  }

  /**
   * Generates the resume scanning/optimizing system prompt
   */
  generateResumeAuditPrompt(profession, seniority, targetJob, language = "en") {
    const targetLanguage = getLanguageLabel(language);
    return `Analyze the candidate's resume/profile under the context of:
- Profession: ${profession}
- Seniority: ${seniority}
- Target Role: ${targetJob}

Provide an actionable, structured audit with three sections:
1. "Tailoring Score": Out of 100, based on keyword matching and relevance to standard ${profession} roles.
2. "Strengths": What makes them stand out for ${targetJob}.
3. "Critical Gaps": Specific missing items (e.g. portfolio, clinical hours, sales metrics, regulatory certifications). DO NOT suggest coding portfolios to non-technical users.

Language constraint: You MUST write your complete analysis in ${targetLanguage}. Do not use any other language. Ensure headers are descriptive and readable.`;
  }

  /**
   * Generates the dynamic learning roadmap prompt
   */
  generateRoadmapPrompt(profession, seniority, targetJob, language = "en") {
    const targetLanguage = getLanguageLabel(language);
    return `Generate a personalized learning and training roadmap for a ${seniority} ${profession} transition or upgrade towards becoming a ${targetJob}.

Provide a structured, phase-by-phase learning path.
For each phase, outline:
- Phase Title
- Key Skills to master (contextualized for ${profession}, NO software engineer bias unless requested)
- Recommended Actions or Certifications

Language constraint: You MUST write the entire roadmap in ${targetLanguage}.`;
  }
}

module.exports = new AIService();
