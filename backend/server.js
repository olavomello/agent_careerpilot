/**
 * Express Server for CareerPilot AI
 * Exposes endpoints for the Resume Pilot, Interview Pilot, and Roadmap Pilot.
 * Simulates LLM responses based on profession, seniority, and selected language.
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const aiService = require('./services/ai.service');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Helper: Localized mock database responses for rich experiences
const MOCK_INTERVIEWS = {
  technology: {
    en: [
      "Hi there! Welcome to the Software Engineering interview. Let's start by discussing your experience with system scalability. How would you design a rate limiter for an API with millions of daily active users?",
      "Good approach. How do you handle cache invalidation in your design, and what data structure would you use to track rate limit counters?",
      "Excellent. Let's shift gears to code quality. How do you approach refactoring legacy code that lacks unit tests, and how do you ensure zero regression?"
    ],
    pt: [
      "Olá! Boas-vindas à entrevista de Engenharia de Software. Vamos começar discutindo escalabilidade. Como você projetaria um rate limiter (limitador de taxa) para uma API com milhões de usuários diários?",
      "Ótima abordagem. Como você trata a invalidação de cache no seu design e qual estrutura de dados utilizaria para monitorar os limites?",
      "Excelente. Vamos mudar de assunto para qualidade de código. Como você aborda a refatoração de código legado que não possui testes unitários e como garante que não haverá regressão?"
    ],
    es: [
      "¡Hola! Bienvenido a la entrevista de Ingeniería de Software. Comencemos hablando de la escalabilidad del sistema. ¿Cómo diseñarías un limitador de tasa (rate limiter) para una API con millones de usuarios activos diarios?",
      "Buen enfoque. ¿Cómo manejas la invalidación de caché en tu diseño y qué estructura de datos usarías para realizar un seguimiento de los contadores de límite de tasa?",
      "Excelente. Hablemos ahora de la calidad del código. ¿Cómo abordas la refactorización de código heredado (legacy) que carece de pruebas unitarias y cómo garantizas que no haya regresión?"
    ]
  },
  healthcare: {
    en: [
      "Welcome to your Clinical Nursing interview. Let's begin with a patient safety scenario. You notice a patient's heart rate spike suddenly, and their chart shows a penicillin allergy but there is an order for an antibiotic containing ampicillin. What is your immediate intervention?",
      "Correct clinical protocol. How would you handle communicating this discrepancy to the prescribing physician while maintaining team collaboration?",
      "Understood. If the patient's family becomes agitated due to the delay in administering the antibiotic, how do you handle their anxiety while prioritizing safety?"
    ],
    pt: [
      "Boas-vindas à entrevista de Enfermagem Clínica. Vamos começar com um cenário de segurança do paciente. Você nota um pico repentino na frequência cardíaca de um paciente. O prontuário mostra alergia a penicilina, mas há uma prescrição de ampicilina. Qual é a sua intervenção imediata?",
      "Protocolo clínico correto. Como você abordaria a comunicação desta discrepância com o médico prescritor mantendo a colaboração da equipe?",
      "Entendido. Se a família do paciente ficar agitada devido ao atraso na administração do antibiótico, como você gerencia essa ansiedade priorizando a segurança do paciente?"
    ],
    es: [
      "Bienvenido a la entrevista de Enfermería Clínica. Comencemos con un escenario de seguridad del paciente. Observa que la frecuencia cardíaca de un paciente aumenta repentinamente. Su historial muestra alergia a la penicilina, pero hay una orden de ampicilina. ¿Cuál es su intervención inmediata?",
      "Protocolo clínico correcto. ¿Cómo manejaría la comunicación de esta discrepancia al médico prescriptor mientras mantiene la colaboración del equipo?",
      "Entendido. Si la familia del paciente se inquieta debido a la demora en la administración del antibiótico, ¿cómo maneja su ansiedad mientras prioriza la seguridad?"
    ]
  },
  design: {
    en: [
      "Hello! Welcome to the UX Design interview. Let's talk about user-centered design. When starting a product design from scratch, how do you conduct user research to map user personas, and what UX heuristics do you prioritize?",
      "Interesting workflow. How do you balance user feedback showing a preference for a feature against stakeholder pressure to deploy a different layout?",
      "Excellent. How do you design for accessibility (e.g. WCAG guidelines), and how do you test your accessibility choices with actual users?"
    ],
    pt: [
      "Olá! Boas-vindas à entrevista de UX Design. Vamos falar sobre design centrado no usuário. Ao iniciar o design de um produto do zero, como você conduz a pesquisa com usuários para criar personas e quais heurísticas de UX prioriza?",
      "Fluxo de trabalho interessante. Como você equilibra o feedback do usuário (que prefere determinado recurso) com a pressão dos stakeholders para publicar um layout diferente?",
      "Excelente. Como você projeta pensando em acessibilidade (ex: diretrizes WCAG) e como testa essas decisões com usuários reais?"
    ],
    es: [
      "¡Hola! Bienvenido a la entrevista de Diseño UX. Hablemos de diseño centrado en el usuario. Al iniciar el diseño de un producto desde cero, ¿cómo realizas la investigación de usuarios para mapear personas y qué heurísticas de UX priorizas?",
      "Flujo de trabajo interesante. ¿Cómo equilibras los comentarios de los usuarios que muestran preferencia por una característica frente a la presión de los interesados (stakeholders) para implementar un diseño diferente?",
      "Excelente. ¿Cómo diseñas para la accesibilidad (por ejemplo, pautas WCAG) y cómo pruebas tus elecciones de accesibilidad con usuarios reales?"
    ]
  },
  sales: {
    en: [
      "Welcome. Let's jump straight into a sales scenario. You are pitching a high-value B2B software package, and the prospect objects saying, 'Your product looks great, but we don't have the budget for this right now.' How do you handle this objection?",
      "Strong rebuttal. How do you transition from handling that budget objection into discovering if budget is their true bottleneck or if they are masking a lack of trust?",
      "Excellent. Once you qualify that trust is the issue, how do you construct a value proposition that directly aligns with their key company pain points?"
    ],
    pt: [
      "Boas-vindas. Vamos direto ao cenário de vendas. Você está apresentando um software B2B de alto valor e o cliente em potencial diz: 'Seu produto é ótimo, mas não temos orçamento para isso no momento'. Como você contorna essa objeção?",
      "Forte resposta. Como você transiciona do contorno dessa objeção de orçamento para descobrir se o orçamento é o gargalo real ou se estão mascarando falta de confiança?",
      "Excelente. Uma vez identificado que o problema é confiança, como você constrói uma proposta de valor que se alinhe diretamente com as principais dores da empresa?"
    ],
    es: [
      "Bienvenido. Vayamos directamente a un escenario de ventas. Estás presentando un software B2B de alto valor y el cliente potencial objeta diciendo: 'Su producto se ve genial, pero no tenemos presupuesto para esto en este momento'. ¿Cómo manejas esta objeción?",
      "Fuerte respuesta. ¿Cómo haces la transición desde el manejo de esa objeción de presupuesto para descubrir si el presupuesto es su verdadero obstáculo o si están ocultando una falta de confianza?",
      "Excelente. Una vez que calificas que el problema es la confianza, ¿cómo construyes una propuesta de valor que se alinee directamente con los puntos de dolor clave de su empresa?"
    ]
  },
  finance: {
    en: [
      "Welcome to your Financial Analysis and Accounting interview. Suppose you are performing a ledger reconciliation and detect a repetitive variance in cash flow entries. How do you audit this and determine if it is a system glitch or compliance breach?",
      "Good methodology. How do you report these findings to the senior leadership team while ensuring compliance with GAAP/IFRS standards?",
      "Understood. If you are asked to adjust a depreciation timeline to meet quarterly earnings goals, what compliance regulations would you cite, and how do you handle the ethical challenge?"
    ],
    pt: [
      "Boas-vindas à sua entrevista de Análise Financeira e Contabilidade. Suponha que você esteja realizando uma reconciliação de razão e detecte uma variação repetitiva nas entradas de fluxo de caixa. Como você audita isso para saber se é falha do sistema ou quebra de conformidade?",
      "Boa metodologia. Como você reporta essas descobertas à liderança sênior garantindo conformidade com as normas GAAP/IFRS?",
      "Entendido. Se você for solicitado a ajustar uma linha do tempo de depreciação para atingir as metas de lucro trimestrais, quais regulamentos de conformidade citaria e como lidaria com esse desafio ético?"
    ],
    es: [
      "Bienvenido a su entrevista de Análisis Financiero y Contabilidad. Suponga que está realizando una conciliación de libro mayor y detecta una variación repetitiva en las entradas de flujo de caja. ¿Cómo audita esto y determina si es un error del sistema o un incumplimiento normativo?",
      "Buena metodología. ¿Cómo informa estos hallazgos al equipo de liderazgo senior mientras garantiza el cumplimiento de las normas GAAP/IFRS?",
      "Entendido. Si se le pide ajustar una línea de tiempo de depreciación para cumplir con las metas de ganancias trimestrais, ¿qué regulaciones de cumplimiento citaría y cómo manejaría el desafío ético?"
    ]
  }
};

// Route: Get Dynamic system prompts (used to display what gets sent to the AI)
app.post('/api/ai/prompts', (req, res) => {
  const { profession, seniority, targetJob, language } = req.body;
  if (!profession || !seniority || !targetJob) {
    return res.status(400).json({ error: "Missing required profile fields" });
  }

  const lang = language || 'en';
  const systemPrompt = aiService.generateInterviewSystemPrompt(profession, seniority, targetJob, lang);
  const resumePrompt = aiService.generateResumeAuditPrompt(profession, seniority, targetJob, lang);
  const roadmapPrompt = aiService.generateRoadmapPrompt(profession, seniority, targetJob, lang);

  res.json({
    systemPrompt,
    resumePrompt,
    roadmapPrompt
  });
});

// Route: Resume Optimization Pilot
app.post('/api/ai/resume-scan', (req, res) => {
  const { profession, seniority, targetJob, resumeText, language } = req.body;
  const lang = language || 'en';
  const score = Math.floor(Math.random() * 25) + 65; // random realistic score between 65 and 90

  // Simulate structured output tailored to language & profession
  let strengths = [];
  let gaps = [];

  if (lang === 'pt') {
    if (profession.toLowerCase().includes('engineer') || profession.toLowerCase().includes('software')) {
      strengths = ["Sólido portfólio no GitHub mostrando experiência prática com projetos em Node.js", "Bom entendimento de APIs RESTful e integração com bancos de dados relacionais"];
      gaps = ["Ausência de experiência descrita com arquitetura de microserviços", "Falta demonstrar competência prática com ferramentas de CI/CD (ex: GitHub Actions)"];
    } else if (profession.toLowerCase().includes('nurse')) {
      strengths = ["Excelente histórico com atendimento a pacientes graves na UTI", "Certificação ativa em Suporte Avançado de Vida (ACLS)"];
      gaps = ["Falta detalhar horas de estágio ou plantão na área de triagem de urgência", "Não há menção de experiência com sistemas digitais de prontuário eletrônico (PEP)"];
    } else if (profession.toLowerCase().includes('design')) {
      strengths = ["Portfólio visual excelente demonstrando wireframing e jornadas de usuários bem definidas", "Uso proficiente de ferramentas modernas de design (Figma, Adobe XD)"];
      gaps = ["Falta detalhar testes de usabilidade práticos e métricas de sucesso pós-lançamento", "Pouca ênfase em design acessível segundo diretrizes WCAG"];
    } else {
      strengths = ["Demonstra forte comunicação interpessoal e foco no cliente", "Histórico de metas alcançadas na carreira anterior"];
      gaps = ["Falta alinhar palavras-chave do currículo com as exigências específicas da vaga desejada", "Necessário descrever conquistas quantitativas usando métricas de negócios"];
    }
  } else if (lang === 'es') {
    if (profession.toLowerCase().includes('engineer') || profession.toLowerCase().includes('software')) {
      strengths = ["Sólido portafolio en GitHub que demuestra experiencia práctica con proyectos Node.js", "Buen entendimiento de APIs RESTful e integración de bases de datos"];
      gaps = ["Falta de experiencia descrita en arquitectura de microservicios", "Falta demostrar competencia práctica en herramientas de CI/CD (ej. GitHub Actions)"];
    } else if (profession.toLowerCase().includes('nurse')) {
      strengths = ["Excelente historial en atención al paciente crítico en UCI", "Certificación activa en Soporte Vital Cardiovascular Avanzado (ACLS)"];
      gaps = ["Falta detallar horas prácticas en áreas de triaje de emergencias", "Falta mencionar experiencia con software de historia clínica electrónica (HCE)"];
    } else if (profession.toLowerCase().includes('design')) {
      strengths = ["Excelente portafolio visual que demuestra wireframing y mapas de viaje de usuario", "Uso competente de herramientas modernas de diseño (Figma, Adobe XD)"];
      gaps = ["Falta detallar pruebas de usabilidad y métricas de impacto de diseño", "Poca evidencia de diseño accesible basado en las pautas WCAG"];
    } else {
      strengths = ["Demuestra fuertes habilidades de comunicación y orientación al cliente", "Historial comprobado de metas cumplidas en roles anteriores"];
      gaps = ["Falta alinear palabras clave del currículum con la vacante objetivo", "Falta de métricas de negocio cuantificables en la descripción de logros"];
    }
  } else {
    // English defaults
    if (profession.toLowerCase().includes('engineer') || profession.toLowerCase().includes('software')) {
      strengths = ["Solid GitHub portfolio demonstrating practical Node.js application builds", "Good understanding of RESTful API design and database integrations"];
      gaps = ["No experience highlighted with microservices architecture", "Needs clearer display of CI/CD pipeline building (e.g. GitHub Actions)"];
    } else if (profession.toLowerCase().includes('nurse')) {
      strengths = ["Excellent record of patient care in intensive care units (ICU)", "Active Advanced Cardiovascular Life Support (ACLS) certification"];
      gaps = ["Needs detail on clinical hours in emergency triage scenarios", "No mention of Electronic Health Records (EHR) software platforms used"];
    } else if (profession.toLowerCase().includes('design')) {
      strengths = ["Stunning visual portfolio demonstrating wireframing and user flow architecture", "Proficient in modern design design stacks (Figma, Adobe XD)"];
      gaps = ["Lacks data on practical usability testing and design impact metrics", "Limited highlight of accessible design standard alignment (WCAG)"];
    } else {
      strengths = ["Demonstrates strong interpersonal skills and client relationship focus", "Proven history of meeting timelines and targets in previous work"];
      gaps = ["Resume keywords are not matching target role description", "No quantifiable business outcomes or metrics shown in experience bullet points"];
    }
  }

  res.json({
    score,
    strengths,
    gaps,
    recommendations: lang === 'pt' ? 
      "Sugerimos incluir verbos de ação e reescrever sua seção de experiência focando nos resultados gerados, adicionando as palavras-chave identificadas." :
      (lang === 'es' ? "Recomendamos incluir verbos de acción y reformular su experiencia enfocándose en resultados concretos." :
      "We recommend adding strong action verbs and tailoring your experience section to emphasize outcomes rather than just lists of tasks.")
  });
});

// Route: Dynamic Career Roadmap Generator
app.post('/api/ai/roadmap', (req, res) => {
  const { profession, seniority, targetJob, language } = req.body;
  const lang = language || 'en';
  
  let phases = [];
  if (lang === 'pt') {
    phases = [
      {
        title: "Fase 1: Fundações e Alinhamento",
        skills: ["Revisão de conceitos essenciais", "Domínio de terminologias de " + profession, "Familiarização com ferramentas padrão da indústria"],
        duration: "Semanas 1-4"
      },
      {
        title: "Fase 2: Imersão Prática e Casos",
        skills: ["Prática direcionada", "Resolução de simulações de " + targetJob, "Construção de portfólio prático ou de casos reais"],
        duration: "Semanas 5-8"
      },
      {
        title: "Fase 3: Refinamento e Mentorias",
        skills: ["Entrevistas simuladas de comportamento e técnica", "Revisão por especialistas", "Networking estratégico na área"],
        duration: "Semanas 9-12"
      }
    ];
  } else if (lang === 'es') {
    phases = [
      {
        title: "Fase 1: Fundamentos y Alineación",
        skills: ["Revisión de conceptos esenciales", "Dominio de terminologías clave en " + profession, "Uso de herramientas líderes de la industria"],
        duration: "Semanas 1-4"
      },
      {
        title: "Fase 2: Inmersión Práctica y Casos",
        skills: ["Ejercicios específicos de la industria", "Estudios de caso simulados de " + targetJob, "Creación de portafolio o registro de experiencia"],
        duration: "Semanas 5-8"
      },
      {
        title: "Fase 3: Simulación y Conexiones",
        skills: ["Entrevistas de rol y comportamiento simuladas", "Feedback y revisión de desempeño", "Estrategia de red profesional"],
        duration: "Semanas 9-12"
      }
    ];
  } else {
    phases = [
      {
        title: "Phase 1: Foundation Alignment",
        skills: ["Mastering core concepts and workflows", "Understanding terms related to " + profession, "Familiarity with main industry tooling"],
        duration: "Weeks 1-4"
      },
      {
        title: "Phase 2: Project & Scenario Immersion",
        skills: ["Hands-on project work", "Simulating tasks for a " + targetJob, "Building case studies/portfolio items"],
        duration: "Weeks 5-8"
      },
      {
        title: "Phase 3: Readiness & Networking",
        skills: ["Mock behavior and dynamic simulations", "Self-assessments and review loops", "Targeted outreach and networking strategies"],
        duration: "Weeks 9-12"
      }
    ];
  }

  res.json({ phases });
});

// Route: Interactive Interview Chat Simulator
app.post('/api/ai/interview/chat', (req, res) => {
  const { profession, messageIndex, candidateAnswer, language } = req.body;
  const lang = language || 'en';

  const domain = profession ? 
    (profession.toLowerCase().includes('engineer') || profession.toLowerCase().includes('software') ? 'technology' : 
     profession.toLowerCase().includes('nurse') || profession.toLowerCase().includes('doctor') ? 'healthcare' :
     profession.toLowerCase().includes('design') ? 'design' :
     profession.toLowerCase().includes('sale') ? 'sales' : 'finance')
    : 'sales';

  const script = MOCK_INTERVIEWS[domain][lang] || MOCK_INTERVIEWS[domain]['en'];
  const nextIndex = (messageIndex || 0) + 1;

  if (nextIndex >= script.length) {
    return res.json({
      finished: true,
      feedback: lang === 'pt' ? 
        "Excelente trabalho concluindo esta simulação! Seu desempenho demonstra boa comunicação e raciocínio lógico no contexto do seu cargo." :
        (lang === 'es' ? "¡Excelente trabajo completando la simulación! Su desempeño muestra buena comunicación y lógica estructurada en su sector." :
        "Great job completing the simulation! Your answers demonstrate solid domain understanding, logical structuring, and clear communication."),
      score: 85
    });
  }

  res.json({
    finished: false,
    nextIndex: nextIndex,
    reply: script[nextIndex]
  });
});

// Serve frontend SPA entry for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`CareerPilot AI backend is running on http://localhost:${PORT}`);
});
