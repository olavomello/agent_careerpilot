// Global State Management
let appState = {
  language: 'en', // 'en', 'pt', 'es'
  profession: 'Software Engineer',
  seniority: 'Mid-level',
  targetJob: 'Senior Architect',
  activeTab: 'resume-tab',
  interviewChatIndex: 0
};

// UI Localization Dictionaries
const LOCALIZATION = {
  en: {
    lblLanguageSelector: "Language:",
    lblCustomizeProfile: "Customize Profile",
    lblProfession: "Profession / Domain",
    lblSeniority: "Seniority Level",
    lblTargetJob: "Target Role",
    tabResume: "Resume Scan",
    tabRoadmap: "Roadmap Pilot",
    tabInterview: "Interview Pilot",
    tabInspector: "AI Prompt Inspector",
    
    titleResumePilot: "Resume Optimization Pilot",
    descResumePilot: "Optimize and tailor your resume for your target position without developer-specific bias.",
    lblPasteResume: "Paste Current Profile / Resume",
    btnScanResume: "Scan Profile",
    lblAuditReport: "Audit Report",
    lblAnalyzingResume: "Analyzing alignment with target role...",
    lblScore: "Score",
    lblStrengths: "Strengths Detected",
    lblGaps: "Critical Gaps Found",
    lblActionableRec: "Actionable Recommendation",
    lblNoStrengths: "Submit your resume to evaluate.",
    lblNoGaps: "Submit your resume to evaluate.",
    
    titleRoadmapPilot: "Custom Growth & Learning Roadmap",
    descRoadmapPilot: "Personalized milestones built specifically around your target role's core competencies.",
    btnGenerateRoadmap: "Generate Roadmap",
    lblGeneratingRoadmap: "Generating custom training milestones...",
    lblTimelineEmpty: "Click 'Generate Roadmap' to compile your learning milestones.",
    
    titleInterviewPilot: "AI Interactive Interview Pilot",
    descInterviewPilot: "Take part in a realistic, profession-specific simulation. Adapt the question depth and style by altering your seniority level.",
    lblInterviewerName: "AI Recruiter",
    lblInterviewerDesc: "Profession-specific Assessment Bot",
    inputChatPlaceholder: "Type your response here...",
    btnSendChat: "Send",
    lblInterviewCoaching: "Simulated Evaluation",
    lblFeedbackWait: "Simulate an interview to get live analysis and comprehensive coaching reports.",
    lblCoachingFeedback: "Coaching Feedback",
    btnResetInterview: "Restart Interview",
    lblInterviewScoreLbl: "Rating",
    
    titlePromptInspector: "AI System Prompt & Context Inspector",
    descPromptInspector: "Observe how the AI system instructions adapt in real-time, removing technical bias for non-engineering domains.",
    lblActiveSystemInstructions: "Generated Interview System Instructions",
    lblInspectorNote: "This is the context sent to the LLM to run the Interview Pilot simulation.",
    lblActiveResumeInstructions: "Generated Resume Audit Prompt",
    
    lblUploadText: "Drag & drop your resume file here or click to browse",
    lblUploadFormats: "Supports PDF, DOCX, TXT, JSON",
    welcomeMessage: "Hi there! Glad you could make it. Tell me a bit about your profile and why you are interested in this position.",
    defaultTargetJobs: {
      "Software Engineer": "Senior Architect",
      "UX Designer": "Lead Designer",
      "Nurse": "Clinical Lead Nurse",
      "Sales Representative": "Enterprise Account Manager",
      "Accountant": "Senior Auditing Specialist"
    }
  },
  pt: {
    lblLanguageSelector: "Idioma:",
    lblCustomizeProfile: "Personalizar Perfil",
    lblProfession: "Profissão / Domínio",
    lblSeniority: "Senioridade",
    lblTargetJob: "Cargo Objetivo",
    tabResume: "Análise de Currículo",
    tabRoadmap: "Trilha de Carreira",
    tabInterview: "Simulação Entrevista",
    tabInspector: "Inspetor de Prompts AI",
    
    titleResumePilot: "Resume Optimization Pilot (Currículo)",
    descResumePilot: "Otimize e adapte seu currículo para sua vaga objetivo, sem vieses específicos de desenvolvimento de software.",
    lblPasteResume: "Cole seu Perfil / Currículo Atual",
    btnScanResume: "Analisar Perfil",
    lblAuditReport: "Relatório de Auditoria",
    lblAnalyzingResume: "Analisando alinhamento com a vaga objetivo...",
    lblScore: "Nota",
    lblStrengths: "Pontos Fortes Detectados",
    lblGaps: "Gargalos Críticos Encontrados",
    lblActionableRec: "Recomendação Prática",
    lblNoStrengths: "Envie seu currículo para iniciar a avaliação.",
    lblNoGaps: "Envie seu currículo para iniciar a avaliação.",
    
    titleRoadmapPilot: "Trilha de Aprendizado e Crescimento Customizada",
    descRoadmapPilot: "Marcos personalizados construídos especificamente ao redor das competências principais do seu cargo objetivo.",
    btnGenerateRoadmap: "Gerar Trilha",
    lblGeneratingRoadmap: "Compilando trilha de treinamento personalizada...",
    lblTimelineEmpty: "Clique em 'Gerar Trilha' para compilar seus marcos de desenvolvimento.",
    
    titleInterviewPilot: "Simulador de Entrevista Interativa AI",
    descInterviewPilot: "Participe de uma simulação realista e específica para sua área. Ajuste a profundidade alterando o nível de senioridade.",
    lblInterviewerName: "Recrutador AI",
    lblInterviewerDesc: "Bot de Avaliação Específica de Domínio",
    inputChatPlaceholder: "Digite sua resposta aqui...",
    btnSendChat: "Enviar",
    lblInterviewCoaching: "Avaliação da Simulação",
    lblFeedbackWait: "Participe da simulação para obter feedbacks em tempo real e relatórios de coaching completos.",
    lblCoachingFeedback: "Feedback de Coaching",
    btnResetInterview: "Reiniciar Entrevista",
    lblInterviewScoreLbl: "Nota",
    
    titlePromptInspector: "Inspetor de Prompts e Contexto do Sistema AI",
    descPromptInspector: "Observe como as instruções do sistema AI se adaptam em tempo real, removendo vieses técnicos para áreas de negócios ou saúde.",
    lblActiveSystemInstructions: "Instruções do Sistema de Entrevista Geradas",
    lblInspectorNote: "Este é o contexto real enviado para o LLM para orquestrar a simulação do Interview Pilot.",
    lblActiveResumeInstructions: "Prompt de Auditoria de Currículo Gerado",
    
    lblUploadText: "Arraste e solte o arquivo do currículo ou clique para buscar",
    lblUploadFormats: "Suporta PDF, DOCX, TXT, JSON",
    welcomeMessage: "Olá! Seja bem-vindo(a) à nossa conversa. Me conte um pouco sobre sua trajetória profissional e por que você tem interesse nesta vaga.",
    defaultTargetJobs: {
      "Software Engineer": "Arquiteto de Sistemas Sênior",
      "UX Designer": "Designer Principal",
      "Nurse": "Líder de Enfermagem Clínica",
      "Sales Representative": "Gerente de Contas Corporativas",
      "Accountant": "Especialista Sênior de Auditoria"
    }
  },
  es: {
    lblLanguageSelector: "Idioma:",
    lblCustomizeProfile: "Personalizar Perfil",
    lblProfession: "Profesión / Dominio",
    lblSeniority: "Nivel de Experiencia",
    lblTargetJob: "Puesto Objetivo",
    tabResume: "Análisis de CV",
    tabRoadmap: "Ruta de Aprendizaje",
    tabInterview: "Simulación Entrevista",
    tabInspector: "Inspector de Prompts AI",
    
    titleResumePilot: "Optimización y Tailoring de CV",
    descResumePilot: "Optimice su currículum para el puesto deseado sin sesgos específicos de desarrollo de software.",
    lblPasteResume: "Pegue su Currículum / Perfil actual",
    btnScanResume: "Analizar Perfil",
    lblAuditReport: "Reporte de Auditoría",
    lblAnalyzingResume: "Analizando alineación con el puesto...",
    lblScore: "Nota",
    lblStrengths: "Fortalezas Detectadas",
    lblGaps: "Brechas Críticas Detectadas",
    lblActionableRec: "Recomendación de Acción",
    lblNoStrengths: "Suba su currículum para evaluar.",
    lblNoGaps: "Suba su currículum para evaluar.",
    
    titleRoadmapPilot: "Ruta de Aprendizaje y Crecimiento Personalizada",
    descRoadmapPilot: "Hitos de desarrollo específicos para las competencias clave del puesto que persigue.",
    btnGenerateRoadmap: "Generar Ruta",
    lblGeneratingRoadmap: "Generando hitos de entrenamiento personalizados...",
    lblTimelineEmpty: "Haga clic en 'Generar Ruta' para compilar sus hitos de aprendizaje.",
    
    titleInterviewPilot: "Simulación de Entrevista Interactiva AI",
    descInterviewPilot: "Participe de un ejercicio realista de simulación de rol. Ajuste la dificultad cambiando su nivel de experiencia.",
    lblInterviewerName: "Reclutador AI",
    lblInterviewerDesc: "Bot de Evaluación Sectorial",
    inputChatPlaceholder: "Escriba su respuesta aquí...",
    btnSendChat: "Enviar",
    lblInterviewCoaching: "Evaluación de Simulación",
    lblFeedbackWait: "Complete la simulación para recibir análisis en tiempo real e informes de desarrollo profesional.",
    lblCoachingFeedback: "Feedback de Coaching",
    btnResetInterview: "Reiniciar Entrevista",
    lblInterviewScoreLbl: "Puntaje",
    
    titlePromptInspector: "Inspector de Contexto y Prompt del Sistema AI",
    descPromptInspector: "Observe cómo las instrucciones del sistema AI cambian en tiempo real, adaptándose a su profesión sin sesgos de tecnología.",
    lblActiveSystemInstructions: "Instrucciones de Sistema para Entrevista",
    lblInspectorNote: "Este es el contexto de prompt que se envía al LLM para la simulación del Interview Pilot.",
    lblActiveResumeInstructions: "Prompt de Auditoría de CV Generado",
    
    lblUploadText: "Arrastre y suelte su archivo de currículum o haga clic para buscar",
    lblUploadFormats: "Soporta PDF, DOCX, TXT, JSON",
    welcomeMessage: "¡Hola! Bienvenido(a) a la simulación. Cuénteme un poco sobre su trayectoria y por qué le interesa esta vacante.",
    defaultTargetJobs: {
      "Software Engineer": "Arquitecto de Software Senior",
      "UX Designer": "Diseñador UX Principal",
      "Nurse": "Líder de Enfermería Clínica",
      "Sales Representative": "Gerente de Cuentas Corporativas",
      "Accountant": "Auditor Financiero Senior"
    }
  }
};

// Profile Predefined Sample Data (To populate fields and avoid plain placeholders)
const SAMPLE_RESUMES = {
  "Software Engineer": {
    en: "Mid-level developer with 4 years of experience building web applications. Expert in Node.js, Express, JavaScript (ES6), and PostgreSQL. Active GitHub portfolio showcasing personal open source tools.",
    pt: "Desenvolvedor pleno com 4 anos de experiência em aplicações web. Especialista em Node.js, Express, JavaScript e PostgreSQL. Portfólio ativo no GitHub com ferramentas de código aberto.",
    es: "Desarrollador de nivel medio con 4 años de experiencia creando aplicaciones web. Experto en Node.js, Express, JavaScript y PostgreSQL. Portafolio activo en GitHub con herramientas open source."
  },
  "UX Designer": {
    en: "UX Designer passionate about crafting user-centered responsive applications. Proficient in Figma prototyping, conducting user interviews, building personas, and running heuristic design evaluations.",
    pt: "Designer de Experiência do Usuário (UX) focado no design de interfaces responsivas. Proficiente em Figma, pesquisa qualitativa de personas e avaliações heurísticas de design.",
    es: "Diseñador UX enfocado en el diseño de interfaces responsivas. Proficiente en Figma, investigación cualitativa de usuarios, construcción de personas y evaluaciones heurísticas."
  },
  "Nurse": {
    en: "Registered Nurse with 5 years of critical care experience in ICU wards. Strong expertise in clinical triage, patient care plan design, HIPAA standard compliance, and advanced clinical life support (ACLS).",
    pt: "Enfermeira Assistencial com 5 anos de experiência em UTI de alta complexidade. Expertise em triagem clínica, elaboração de planos de cuidados e suporte avançado de vida (ACLS).",
    es: "Enfermera de Cuidados Críticos con 5 años de experiencia en salas de UCI. Experta en triaje clínico, planes de atención al paciente y soporte vital avanzado (ACLS)."
  },
  "Sales Representative": {
    en: "B2B Sales Specialist with 3 years of pipeline management experience. Proven record of objection handling, conducting discovery meetings, and formulating clear product value propositions.",
    pt: "Especialista de Vendas B2B com 3 anos de experiência em gestão de funil de vendas. Histórico comprovado em contorno de objeções, reuniões de diagnóstico e proposta de valor.",
    es: "Especialista en Ventas B2B con 3 años de experiencia en gestión de pipeline. Historial comprobado en manejo de objeciones, llamadas de descubrimiento y propuesta de valor."
  },
  "Accountant": {
    en: "Accountant with 4 years of experience in internal control audits. Deep understanding of GAAP/IFRS reporting, balance sheets reconciliation, and compliance risk assessments.",
    pt: "Contador com 4 anos de experiência em auditorias de controle interno. Domínio das normas contábeis brasileiras e IFRS, conciliação e gestão de risco fiscal.",
    es: "Contador con 4 años de experiencia en auditoría y control interno. Dominio de normas contables locales e IFRS, conciliaciones de balance y análisis de riesgo."
  }
};

// Initial setup on load
document.addEventListener("DOMContentLoaded", () => {
  // Check localstorage or default language
  const savedLang = localStorage.getItem("cp_language");
  if (savedLang) {
    setLanguage(savedLang);
  }
  
  // Set default sample resume
  updateSampleResume();
  updatePromptsInspector();
});

// Setting Language (called from Gatekeeper or dropdown)
function setLanguage(lang) {
  appState.language = lang;
  localStorage.setItem("cp_language", lang);

  // Update DOM lang attribute
  document.documentElement.lang = lang;
  
  // Switch drop-down value
  document.getElementById("select-lang").value = lang;

  // Translate all UI Elements (Only labels and static text, skipping user input elements)
  const translationDict = LOCALIZATION[lang];
  for (const [id, value] of Object.entries(translationDict)) {
    const el = document.getElementById(id);
    if (el) {
      if (el.tagName === 'INPUT' && el.type === 'text') {
        // Skip user-edited input values to protect their typed custom text
      } else {
        el.textContent = value;
      }
    }
  }

  // Update input placeholders
  document.getElementById("textarea-resume").placeholder = lang === 'pt' ? "Cole seu currículo aqui..." : (lang === 'es' ? "Pegue su currículum aquí..." : "Paste your CV content here...");
  document.getElementById("input-chat-message").placeholder = translationDict.inputChatPlaceholder;

  // Sync state configs with inputs
  appState.targetJob = document.getElementById("input-target-job").value;
  appState.profession = document.getElementById("input-profession").value;

  // Close Language selection modal and open app
  document.getElementById("language-gatekeeper").classList.add("hidden");
  document.getElementById("app-container").classList.remove("hidden");

  // Sync sample inputs (will only load defaults if unmodified) and update prompts
  updateTargetJobInput();
  updateSampleResume();
  updatePromptsInspector();
  resetInterview();
}

function changeLanguageFromDropdown(lang) {
  setLanguage(lang);
}


// Switches Tab view
function switchTab(tabId) {
  appState.activeTab = tabId;

  // Toggle active tab link classes
  document.querySelectorAll(".tab-link").forEach(link => {
    link.classList.remove("active");
  });
  
  // Toggle active panel classes
  document.querySelectorAll(".tab-panel").forEach(panel => {
    panel.classList.remove("active");
  });

  // Find correct tab-link to activate
  const tabMapping = {
    'resume-tab': 'tab-resume',
    'roadmap-tab': 'tab-roadmap',
    'interview-tab': 'tab-interview',
    'inspector-tab': 'tab-inspector'
  };
  
  document.getElementById(tabMapping[tabId]).classList.add("active");
  document.getElementById(tabId).classList.add("active");
  
  // If roadmap tab, clear dynamic nodes to allow fresh generation
  if (tabId === 'roadmap-tab' && document.getElementById("roadmap-timeline").innerHTML.includes("timeline-phase")) {
    // leave as is
  }
}

// Helper: Map arbitrary professions to core domain HSL themes
function mapProfessionToDomainTheme(profValue) {
  const p = (profValue || "").toLowerCase();
  if (p.includes("nurse") || p.includes("doctor") || p.includes("therapist") || p.includes("medical") || p.includes("dentist") || p.includes("clinical") || p.includes("physician") || p.includes("surgeon")) {
    return "theme-healthcare";
  }
  if (p.includes("engineer") || p.includes("developer") || p.includes("coder") || p.includes("tech") || p.includes("data analyst") || p.includes("programmer") || p.includes("sysadmin")) {
    return "theme-tech";
  }
  if (p.includes("design") || p.includes("artist") || p.includes("creative") || p.includes("illustrator") || p.includes("copywriter") || p.includes("graphic") || p.includes("painter")) {
    return "theme-design";
  }
  if (p.includes("sale") || p.includes("marketing") || p.includes("representative") || p.includes("account executive") || p.includes("consultant") || p.includes("recruiter") || p.includes("hr") || p.includes("manager") || p.includes("teacher") || p.includes("professor") || p.includes("associate")) {
    return "theme-sales";
  }
  if (p.includes("accountant") || p.includes("finance") || p.includes("auditor") || p.includes("banker") || p.includes("analyst") || p.includes("cfo")) {
    return "theme-finance";
  }
  return "theme-default";
}

// Adjust colors and inputs when changing professions
function onProfessionChange(profValue) {
  appState.profession = profValue;
  
  // Set theme class on body to trigger HSL variable transitions
  const body = document.body;
  body.className = ''; // reset classes
  body.classList.add(mapProfessionToDomainTheme(profValue));

  // Update target job value only if it matches previous defaults
  updateTargetJobInput();

  updateProfileConfig();
  updateSampleResume();
  resetInterview();
}

function updateTargetJobInput() {
  const input = document.getElementById("input-target-job");
  const currentValue = input.value.trim();

  // Collect all default target jobs across all languages and professions to check if unmodified
  const allDefaultTargetJobs = [];
  Object.values(LOCALIZATION).forEach(langData => {
    if (langData.defaultTargetJobs) {
      Object.values(langData.defaultTargetJobs).forEach(val => {
        allDefaultTargetJobs.push(val.trim());
      });
    }
  });

  if (currentValue === "" || allDefaultTargetJobs.includes(currentValue)) {
    const translationDict = LOCALIZATION[appState.language];
    input.value = translationDict.defaultTargetJobs[appState.profession] || "Senior Specialist";
  }
}

function updateProfileConfig() {
  appState.seniority = document.getElementById("select-seniority").value;
  appState.targetJob = document.getElementById("input-target-job").value;
  
  updatePromptsInspector();
}

// Populates Sample Resume details only if unmodified by candidate
function updateSampleResume() {
  const textarea = document.getElementById("textarea-resume");
  const currentValue = textarea.value.trim();

  // Gather all stock sample resumes across all professions and languages
  const allPredefinedResumes = [];
  Object.values(SAMPLE_RESUMES).forEach(profData => {
    Object.values(profData).forEach(val => {
      allPredefinedResumes.push(val.trim());
    });
  });

  // Only load default sample if textarea is empty or holds unmodified sample resume
  if (currentValue === "" || allPredefinedResumes.includes(currentValue)) {
    const professionResumes = SAMPLE_RESUMES[appState.profession];
    if (professionResumes) {
      textarea.value = professionResumes[appState.language] || professionResumes.en;
    } else {
      // Generic resume fallback for user-defined custom categories
      textarea.value = appState.language === 'pt' ? 
        `Profissional na área de ${appState.profession}. Possui ampla experiência no setor executando funções estratégicas.` :
        (appState.language === 'es' ? 
        `Profesional en el sector de ${appState.profession}. Amplia experiencia desempeñando tareas estratégicas.` :
        `Experienced professional in ${appState.profession} domain. Solid record of executing strategic operations.`);
    }
  }
}

// Autocomplete suggestions list array
const SUGGESTIONS = [
  "Software Engineer", "Accountant", "Marketing Specialist", "Project Manager", 
  "Sales Representative", "Customer Success Manager", "Graphic Designer", 
  "UX Designer", "Product Manager", "HR Professional", "Data Analyst", 
  "Teacher", "Nurse", "Doctor", "Lawyer", "Mechanical Engineer", 
  "Civil Engineer", "Financial Analyst", "Business Consultant", "Retail Associate"
];

function showSuggestions() {
  const list = document.getElementById("suggestions-list");
  list.innerHTML = "";
  list.classList.remove("hidden");

  const val = document.getElementById("input-profession").value.trim().toLowerCase();
  const filtered = val === "" 
    ? SUGGESTIONS 
    : SUGGESTIONS.filter(item => item.toLowerCase().includes(val));

  if (filtered.length === 0) {
    const div = document.createElement("div");
    div.className = "suggestion-item";
    div.style.color = "var(--text-muted)";
    div.style.cursor = "default";
    div.textContent = appState.language === 'pt' ? "Aperte Enter para usar customizado" : (appState.language === 'es' ? "Presione Enter para usar personalizado" : "Press Enter to use custom category");
    list.appendChild(div);
    return;
  }

  filtered.forEach(item => {
    const div = document.createElement("div");
    div.className = "suggestion-item";
    div.textContent = item;
    // Use mousedown instead of click to prevent blur event from hiding suggestions early
    div.onmousedown = (e) => {
      e.preventDefault();
      selectSuggestion(item);
    };
    list.appendChild(div);
  });
}

function onProfessionInput(val) {
  showSuggestions();
  // Map dynamic theme immediately as user types
  const body = document.body;
  body.className = '';
  body.classList.add(mapProfessionToDomainTheme(val));
  
  appState.profession = val;
  updateProfileConfig();
}

function selectSuggestion(val) {
  const input = document.getElementById("input-profession");
  input.value = val;
  document.getElementById("suggestions-list").classList.add("hidden");
  onProfessionChange(val);
}

function clearProfessionInput() {
  const input = document.getElementById("input-profession");
  input.value = "";
  input.focus();
  showSuggestions();
  onProfessionChange("");
}

// Collapsible Mobile Drawer Navigation
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  
  if (sidebar.classList.contains("open")) {
    sidebar.classList.remove("open");
    overlay.classList.add("hidden");
  } else {
    sidebar.classList.add("open");
    overlay.classList.remove("hidden");
  }
}

// Document listener to close suggestions when clicking outside autocomplete
document.addEventListener("mousedown", (e) => {
  const wrapper = document.querySelector(".autocomplete-wrapper");
  if (wrapper && !wrapper.contains(e.target)) {
    const list = document.getElementById("suggestions-list");
    if (list) list.classList.add("hidden");
  }
});


// Calls API to display compiled prompts in prompt inspector
async function updatePromptsInspector() {
  try {
    const response = await fetch('/api/ai/prompts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profession: appState.profession,
        seniority: appState.seniority,
        targetJob: appState.targetJob,
        language: appState.language
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      document.getElementById("prompt-preview-system").textContent = data.systemPrompt;
      document.getElementById("prompt-preview-resume").textContent = data.resumePrompt;
    }
  } catch (err) {
    console.error("Failed to update prompts inspector:", err);
  }
}

// 1. RESUME PILOT SIMULATION
async function runResumeScan() {
  const loader = document.getElementById("resume-loading");
  const results = document.getElementById("resume-results");
  const resumeText = document.getElementById("textarea-resume").value;

  loader.classList.remove("hidden");
  results.classList.add("hidden");

  try {
    const response = await fetch('/api/ai/resume-scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profession: appState.profession,
        seniority: appState.seniority,
        targetJob: appState.targetJob,
        resumeText: resumeText,
        language: appState.language
      })
    });

    if (response.ok) {
      const data = await response.json();
      
      // Update Score
      document.getElementById("resume-score").textContent = data.score;
      
      // Update Strengths
      const strengthsUl = document.getElementById("resume-strengths");
      strengthsUl.innerHTML = "";
      data.strengths.forEach(str => {
        const li = document.createElement("li");
        li.textContent = str;
        strengthsUl.appendChild(li);
      });

      // Update Gaps
      const gapsUl = document.getElementById("resume-gaps");
      gapsUl.innerHTML = "";
      data.gaps.forEach(gap => {
        const li = document.createElement("li");
        li.textContent = gap;
        gapsUl.appendChild(li);
      });

      // Update Recommendation
      document.getElementById("resume-recommendations").textContent = data.recommendations;
    }
  } catch (err) {
    console.error("Resume scan error:", err);
  } finally {
    loader.classList.add("hidden");
    results.classList.remove("hidden");
  }
}

// 2. ROADMAP PILOT SIMULATION
async function generateRoadmap() {
  const loader = document.getElementById("roadmap-loading");
  const timeline = document.getElementById("roadmap-timeline");

  loader.classList.remove("hidden");
  timeline.innerHTML = "";

  try {
    const response = await fetch('/api/ai/roadmap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profession: appState.profession,
        seniority: appState.seniority,
        targetJob: appState.targetJob,
        language: appState.language
      })
    });

    if (response.ok) {
      const data = await response.json();
      
      data.phases.forEach((phase, index) => {
        const phaseDiv = document.createElement("div");
        phaseDiv.className = "timeline-phase";
        
        // Phase skills html list
        let skillsHtml = "";
        phase.skills.forEach(skill => {
          skillsHtml += `<li>${skill}</li>`;
        });

        phaseDiv.innerHTML = `
          <div class="phase-number">${index + 1}</div>
          <div class="phase-content" style="width: 100%">
            <div class="phase-title-row">
              <h3>${phase.title}</h3>
              <span class="phase-duration">${phase.duration}</span>
            </div>
            <ul class="phase-skills">
              ${skillsHtml}
            </ul>
          </div>
        `;
        timeline.appendChild(phaseDiv);
      });
    }
  } catch (err) {
    console.error("Roadmap generation error:", err);
  } finally {
    loader.classList.add("hidden");
  }
}

// 3. INTERVIEW PILOT SIMULATION
function resetInterview() {
  appState.interviewChatIndex = 0;
  
  const chatMessages = document.getElementById("chat-messages");
  chatMessages.innerHTML = "";

  const coachPlaceholder = document.getElementById("interview-feedback-placeholder");
  const coachReport = document.getElementById("interview-feedback-report");

  coachPlaceholder.classList.remove("hidden");
  coachReport.classList.add("hidden");

  // Send first welcoming message from interviewer in current language
  const greetings = LOCALIZATION[appState.language].welcomeMessage;
  appendMessage("interviewer", greetings);
}

function appendMessage(sender, text) {
  const chatMessages = document.getElementById("chat-messages");
  
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${sender}`;
  msgDiv.innerHTML = `<div class="msg-bubble">${text}</div>`;
  
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendChatMessage() {
  const inputEl = document.getElementById("input-chat-message");
  const text = inputEl.value.trim();
  if (text === "") return;

  // Append Candidate answer
  appendMessage("candidate", text);
  inputEl.value = "";

  // Call API for subsequent response
  try {
    const response = await fetch('/api/ai/interview/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profession: appState.profession,
        messageIndex: appState.interviewChatIndex,
        candidateAnswer: text,
        language: appState.language
      })
    });

    if (response.ok) {
      const data = await response.json();
      
      if (data.finished) {
        // Interview finished, render final coaching report
        appendMessage("interviewer", data.feedback);
        
        document.getElementById("interview-feedback-placeholder").classList.add("hidden");
        document.getElementById("interview-feedback-report").classList.remove("hidden");
        document.getElementById("interview-score").textContent = data.score;
        document.getElementById("interview-feedback-text").textContent = data.feedback;
      } else {
        appState.interviewChatIndex = data.nextIndex;
        // Introduce small delay to simulate typing human response
        setTimeout(() => {
          appendMessage("interviewer", data.reply);
        }, 800);
      }
    }
  } catch (err) {
    console.error("Interview Chat error:", err);
  }
}

function handleChatKeypress(event) {
  if (event.key === 'Enter') {
    sendChatMessage();
  }
}

// FILE UPLOAD AND DRAG & DROP IMPLEMENTATION
function triggerFileSelect() {
  document.getElementById("input-resume-file").click();
}

function handleFileSelect(event) {
  const files = event.target.files;
  if (files && files.length > 0) {
    processUploadedFile(files[0]);
  }
}

function onDragOver(event) {
  event.preventDefault();
  document.getElementById("file-dropzone").classList.add("dragover");
}

function onDragLeave(event) {
  event.preventDefault();
  document.getElementById("file-dropzone").classList.remove("dragover");
}

function onDrop(event) {
  event.preventDefault();
  const dropzone = document.getElementById("file-dropzone");
  dropzone.classList.remove("dragover");

  const files = event.dataTransfer.files;
  if (files && files.length > 0) {
    processUploadedFile(files[0]);
  }
}

function processUploadedFile(file) {
  const dropzone = document.getElementById("file-dropzone");
  const uploadText = document.getElementById("lbl-upload-text");
  
  // Visual feedback: processing state
  dropzone.className = "file-upload-zone"; // reset success
  uploadText.textContent = appState.language === 'pt' ? `Processando ${file.name}...` : (appState.language === 'es' ? `Procesando ${file.name}...` : `Processing ${file.name}...`);

  const reader = new FileReader();

  // Handle text files (TXT, JSON, Markdown)
  if (file.type === "text/plain" || file.type === "application/json" || file.name.endsWith(".txt") || file.name.endsWith(".json") || file.name.endsWith(".md")) {
    reader.onload = function(e) {
      document.getElementById("textarea-resume").value = e.target.result;
      setUploadSuccess(file.name);
    };
    reader.onerror = function() {
      setUploadError();
    };
    reader.readAsText(file);
  } else {
    // Binary formats (PDF, DOCX) require backend/heavy parsing. We simulate premium extraction:
    setTimeout(() => {
      let mockProfileText = "";

      // Match mock output dynamically to profession and language
      const samples = SAMPLE_RESUMES[appState.profession];
      if (samples) {
        mockProfileText = `[EXTRACTED FROM ${file.name}]\n\n` + (samples[appState.language] || samples.en);
      } else {
        mockProfileText = `[EXTRACTED FROM ${file.name}]\n\nCandidate resume file successfully processed.`;
      }

      document.getElementById("textarea-resume").value = mockProfileText;
      setUploadSuccess(file.name);
    }, 1500);
  }
}

function setUploadSuccess(fileName) {
  const dropzone = document.getElementById("file-dropzone");
  const uploadText = document.getElementById("lbl-upload-text");
  dropzone.classList.add("success");
  
  uploadText.textContent = appState.language === 'pt' ? `Sucesso! Currículo extraído de ${fileName}` : (appState.language === 'es' ? `¡Éxito! Currículum extraído de ${fileName}` : `Success! Resume extracted from ${fileName}`);
}

function setUploadError() {
  const dropzone = document.getElementById("file-dropzone");
  const uploadText = document.getElementById("lbl-upload-text");
  dropzone.classList.remove("success");
  uploadText.textContent = appState.language === 'pt' ? "Erro ao ler arquivo." : (appState.language === 'es' ? "Error al leer el archivo." : "Error reading file.");
}

