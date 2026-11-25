import { createContext, useContext, useEffect, useRef, useState } from 'react'

// ─── TRADUCTIONS ─────────────────────────────────────────────────────────────

const LANGS = ['fr', 'en', 'es']

const T = {
  fr: {
    nav: { competences: 'compétences', projets: 'projets', parcours: 'parcours', apropos: 'à propos', contact: 'contact' },
    available: 'Disponible',
    hero: {
      badge: 'Développeuse Full Stack · Tétouan, Maroc',
      age: '20 ans',
      desc: "Diplômée en développement web full stack, je conçois et développe des applications web complètes avec une attention particulière à la qualité du code et à la sécurité des données.",
      cta1: 'Voir mes projets',
      cta2: 'Me contacter →',
      stats: ['Projets', 'Note annuelle / 20', 'Stages entreprise', 'Technologies maîtrisées'],
    },
    skills: {
      eyebrow: 'Compétences',
      title: 'Ce que je maîtrise',
      groups: {
        front: 'Front-end', back: 'Back-end', db: 'Bases de données',
        arch: 'Architecture', tools: 'Outils', learning: 'En apprentissage',
      },
      agile: 'Approche Agile',
      oop: 'POO',
    },
    projects: {
      eyebrow: 'Projets',
      title: 'Mes réalisations',
      done: 'Terminé',
      // wip: 'En cours',
      view: "Voir l'écran",
      close: 'Fermer',
      visit: 'Voir le site →',
      shot: "Capture d'écran de",
      preview: 'Aperçu de',
      items: {
        eduflow: {
          title: 'EduFlow — Gestion des écoles privées',
          desc: "Application web de gestion des écoles privées au Maroc : espaces administrateur, professeur, élève et parent, classes et filières, notes et annonces. Architecture full-stack avec API REST sécurisée.",
        },
        heldi: {
          title: 'Heldi — Boutique cosmétique',
          desc: "Plateforme e-commerce complète dédiée aux produits cosmétiques. Catalogue produits, système de panier, gestion des commandes et sécurisation des données.",
        },
        appointment: {
          title: 'Smart Appointment',
          desc: "Système de prise de rendez-vous en ligne. Réservation, gestion et suivi avec interface intuitive, authentification sécurisée et panneaux admin/client.",
        },
        expense: {
          title: 'Expense Tracker',
          desc: "Application de gestion des dépenses personnelles avec catégorisation, filtres avancés, tableau de bord récapitulatif et visualisation des données.",
        },
                sourire: {
          title: "Sourire Élégance — Cabinet dentaire",
          desc: "Site vitrine d'un cabinet dentaire à Casablanca : présentation des soins, galerie et prise de rendez-vous via WhatsApp. Design moderne, animations fluides et interface responsive.",
        },
        eclat: {
          title: "Éclat Beauty Studio — Centre d'esthétique",
          desc: "Site vitrine d'un centre d'esthétique à Rabat : services, packs, galerie animée et réservation via WhatsApp. Animations soignées et interface responsive.",
        },
      },
    },
    timeline: {
      eyebrow: 'Parcours',
      title: 'Expérience & Formation',
      items: {
        lm3: {
          period: '2026 . 1 mois',
          title: 'Stage — Développement Web (remote)',
          org: '3LM Solutions · 100 % à distance',
          desc: "Optimisation d'EBI Services, plateforme SaaS et CRM d'entreprise : chatbot IA, espace client, générateur de devis, réservation par calendrier et statistiques. Front-end React/Vite (TypeScript), API REST Node.js/Express/MongoDB et agent IA en Python.",
        },
        garage: {
          period: '2026 . 1 mois',
          title: 'Stage — Développement Web',
          org: 'Entreprise Tétouan',
          desc: "Développement d'une application web de gestion de garage. Conception et intégration du front-end avec React et back-end Laravel en stack full-stack.",
        },
        ofppt: {
          period: '2024 – 2026',
          title: 'Technicien Spécialisé — Dev Digital (diplômée)',
          org: 'OFPPT · Tétouan',
          desc: "Diplôme obtenu après deux ans de formation intensive en développement web full stack. Mention en 1ère année : 15,67 — Moyenne générale 2ème année : 14,73 — Note annuelle : 17,22 — Examen national : 65,25/100.",
        },
        bac: {
          period: '2024',
          title: 'Baccalauréat Scientifique',
          org: 'Sciences Physiques, option Français · Tétouan',
          desc: "Baccalauréat obtenu avec option sciences physiques en filière française.",
        },
      },
    },
    about: {
      eyebrow: 'À propos',
      title: 'Mon profil',
      results: 'Résultats académiques',
      profile: 'Profil',
      languages: 'Langues',
      bio: "Titulaire d'un bac scientifique physique (option français) et diplômée Technicien Spécialisé en Développement Digital à l'OFPPT. Actuellement en stage chez 3LM Solutions.",
      qualitiesLabel: 'Qualités :',
      qualities: 'Sérieuse · Motivée · Organisée · Apprentissage rapide · Esprit d\'équipe',
      scores: ['1ère année — Mention', '2ème année — Moy. gén.', '2ème année — Annuel', 'Examen national'],
      langs: { ar: 'Arabe', fr: 'Français', en: 'Anglais', es: 'Espagnol' },
      levels: { native: 'Maternel', fluent: 'Courant', b1: 'Intermédiaire ', a1: 'Intermédiaire ' },
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Travaillons ensemble',
      ctaA: 'Prête pour un ',
      ctaB: 'stage',
      ctaC: ' ou un',
      ctaD: 'poste ',
      ctaE: 'junior',
      ctaF: ' ?',
      sub: "Je suis disponible pour toute opportunité de stage, alternance ou premier poste en développement web. N'hésitez pas à me contacter !",
      send: 'Envoyer un email →',
      phone: 'Téléphone',
    },
    footer: 'Hajar Bakali — Développeuse Full Stack',
  },

  en: {
    nav: { competences: 'skills', projets: 'projects', parcours: 'experience', apropos: 'about', contact: 'contact' },
    available: 'Available',
    hero: {
      badge: 'Full Stack Developer · Tetouan, Morocco',
      age: '20 years old',
      desc: "Graduate in full stack web development, I design and build complete web applications with a strong focus on code quality and data security.",
      cta1: 'See my projects',
      cta2: 'Contact me →',
      stats: ['Projects', 'Annual grade / 20', 'Internships', 'Technologies mastered'],
    },
    skills: {
      eyebrow: 'Skills',
      title: 'What I master',
      groups: {
        front: 'Front-end', back: 'Back-end', db: 'Databases',
        arch: 'Architecture', tools: 'Tools', learning: 'Currently learning',
      },
      agile: 'Agile approach',
      oop: 'OOP',
    },
    projects: {
      eyebrow: 'Projects',
      title: 'My work',
      done: 'Completed',
      wip: 'In progress',
      view: 'View screen',
      close: 'Close',
      visit: 'Visit site →',
      shot: 'Screenshot of',
      preview: 'Preview of',
      items: {
        eduflow: {
          title: 'EduFlow — Private school management',
          desc: "Web application for managing private schools in Morocco: administrator, teacher, student and parent spaces, classes and tracks, grades and announcements. Full-stack architecture with a secured REST API.",
        },
        heldi: {
          title: 'Heldi — Cosmetics store',
          desc: "Complete e-commerce platform dedicated to cosmetic products. Product catalog, shopping cart, order management and data security.",
        },
        appointment: {
          title: 'Smart Appointment',
          desc: "Online appointment booking system. Booking, management and tracking with an intuitive interface, secure authentication and admin/client panels.",
        },
        expense: {
          title: 'Expense Tracker',
          desc: "Personal expense management app with categorization, advanced filters, a summary dashboard and data visualization.",
        },
                sourire: {
          title: "Sourire Élégance — Dental clinic",
          desc: "Showcase website for a dental clinic in Casablanca: treatments, gallery and appointment booking via WhatsApp. Modern design, smooth animations and responsive layout.",
        },
        eclat: {
          title: "Éclat Beauty Studio — Beauty center",
          desc: "Showcase website for a beauty center in Rabat: services, packages, animated gallery and booking via WhatsApp. Polished animations and responsive layout.",
        },
      },
    },
    timeline: {
      eyebrow: 'Journey',
      title: 'Experience & Education',
      items: {
        lm3: {
          period: '2026 . 1 month',
          title: 'Internship — Web Development (remote)',
          org: '3LM Solutions · 100% remote',
          desc: "Optimization of EBI Services, an enterprise SaaS platform and CRM: AI chatbot, client portal, quote generator, calendar booking and analytics. React/Vite (TypeScript) front-end, Node.js/Express/MongoDB REST API and a Python AI agent.",
        },
        garage: {
          period: '2026 · 1 month',
          title: 'Internship — Web Development',
          org: 'Company in Tetouan',
          desc: "Development of a garage management web application. Front-end design and integration with React and a Laravel back-end in a full-stack setup.",
        },
        ofppt: {
          period: '2024 – 2026',
          title: 'Specialized Technician — Digital Development (graduated)',
          org: 'OFPPT · Tetouan',
          desc: "Diploma earned after two years of intensive training in full stack web development. 1st year grade: 15.67 — 2nd year average: 14.73 — Annual grade: 17.22 — National exam: 65.25/100.",
        },
        bac: {
          period: '2024',
          title: 'Scientific Baccalaureate',
          org: 'Physical Sciences, French option · Tetouan',
          desc: "Baccalaureate earned in the Physical Sciences track, French-language stream.",
        },
      },
    },
    about: {
      eyebrow: 'About',
      title: 'My profile',
      results: 'Academic results',
      profile: 'Profile',
      languages: 'Languages',
      bio: "Holder of a scientific baccalaureate in physical sciences (French option) and graduate of the Specialized Technician in Digital Development program at OFPPT. Currently interning at 3LM Solutions.",
      qualitiesLabel: 'Qualities:',
      qualities: 'Serious · Motivated · Organized · Fast learner · Team spirit',
      scores: ['1st year — Grade', '2nd year — Average', '2nd year — Annual', 'National exam'],
      langs: { ar: 'Arabic', fr: 'French', en: 'English', es: 'Spanish' },
      levels: { native: 'Native', fluent: 'Fluent', b1: 'Intermediate ', a1: 'Intermediate ' },
    },
    contact: {
      eyebrow: 'Contact',
      title: "Let's work together",
      ctaA: 'Ready for an ',
      ctaB: 'internship',
      ctaC: ' or a',
      ctaD: '',
      ctaE: 'junior role',
      ctaF: '?',
      sub: "I'm available for any internship, work-study or first job opportunity in web development. Feel free to get in touch!",
      send: 'Send an email →',
      phone: 'Phone',
    },
    footer: 'Hajar Bakali — Full Stack Developer',
  },

  es: {
    nav: { competences: 'habilidades', projets: 'proyectos', parcours: 'trayectoria', apropos: 'sobre mí', contact: 'contacto' },
    available: 'Disponible',
    hero: {
      badge: 'Desarrolladora Full Stack · Tetuán, Marruecos',
      age: '20 años',
      desc: "Graduada en desarrollo web full stack, diseño y desarrollo aplicaciones web completas con especial atención a la calidad del código y a la seguridad de los datos.",
      cta1: 'Ver mis proyectos',
      cta2: 'Contáctame →',
      stats: ['Proyectos', 'Nota anual / 20', 'Prácticas en empresa', 'Tecnologías dominadas'],
    },
    skills: {
      eyebrow: 'Habilidades',
      title: 'Lo que domino',
      groups: {
        front: 'Front-end', back: 'Back-end', db: 'Bases de datos',
        arch: 'Arquitectura', tools: 'Herramientas', learning: 'Aprendiendo',
      },
      agile: 'Enfoque Ágil',
      oop: 'POO',
    },
    projects: {
      eyebrow: 'Proyectos',
      title: 'Mis trabajos',
      done: 'Terminado',
      // wip: 'En curso',
      view: 'Ver pantalla',
      close: 'Cerrar',
      visit: 'Ver el sitio →',
      shot: 'Captura de pantalla de',
      preview: 'Vista previa de',
      items: {
        eduflow: {
          title: 'EduFlow — Gestión de escuelas privadas',
          desc: "Aplicación web para la gestión de escuelas privadas en Marruecos: espacios de administrador, profesor, alumno y padres, clases y especialidades, notas y avisos. Arquitectura full stack con API REST segura.",
        },
        heldi: {
          title: 'Heldi — Tienda de cosmética',
          desc: "Plataforma de comercio electrónico completa dedicada a productos cosméticos. Catálogo de productos, carrito de compras, gestión de pedidos y seguridad de los datos.",
        },
        appointment: {
          title: 'Smart Appointment',
          desc: "Sistema de reserva de citas en línea. Reserva, gestión y seguimiento con interfaz intuitiva, autenticación segura y paneles de administrador/cliente.",
        },
        expense: {
          title: 'Expense Tracker',
          desc: "Aplicación de gestión de gastos personales con categorización, filtros avanzados, panel de resumen y visualización de datos.",
        },
        sourire: {
          title: "Sourire Élégance — Clínica dental",
          desc: "Sitio web de presentación de una clínica dental en Casablanca: tratamientos, galería y reserva de citas por WhatsApp. Diseño moderno, animaciones fluidas e interfaz responsive.",
        },
        eclat: {
          title: "Éclat Beauty Studio — Centro de estética",
          desc: "Sitio web de presentación de un centro de estética en Rabat: servicios, packs, galería animada y reserva por WhatsApp. Animaciones cuidadas e interfaz responsive.",
        },
      },
    },
    timeline: {
      eyebrow: 'Trayectoria',
      title: 'Experiencia y Formación',
      items: {
        lm3: {
          period: '2026 . 1 mes',
          title: 'Prácticas — Desarrollo Web (remoto)',
          org: '3LM Solutions · 100 % a distancia',
          desc: "Optimización de EBI Services, plataforma SaaS y CRM empresarial: chatbot con IA, portal del cliente, generador de presupuestos, reserva con calendario y estadísticas. Front-end React/Vite (TypeScript), API REST Node.js/Express/MongoDB y agente de IA en Python.",
        },
        garage: {
          period: '2026 · 1 mes',
          title: 'Prácticas — Desarrollo Web',
          org: 'Empresa en Tetuán',
          desc: "Desarrollo de una aplicación web de gestión de talleres mecánicos. Diseño e integración del front-end con React y back-end con Laravel en una arquitectura full stack.",
        },
        ofppt: {
          period: '2024 – 2026',
          title: 'Técnico Especializado — Desarrollo Digital (graduada)',
          org: 'OFPPT · Tetuán',
          desc: "Título obtenido tras dos años de formación intensiva en desarrollo web full stack. Nota de 1.er año: 15,67 — Media general de 2.º año: 14,73 — Nota anual: 17,22 — Examen nacional: 65,25/100.",
        },
        bac: {
          period: '2024',
          title: 'Bachillerato Científico',
          org: 'Ciencias Físicas, opción Francés · Tetuán',
          desc: "Bachillerato obtenido en la rama de ciencias físicas, sección francesa.",
        },
      },
    },
    about: {
      eyebrow: 'Sobre mí',
      title: 'Mi perfil',
      results: 'Resultados académicos',
      profile: 'Perfil',
      languages: 'Idiomas',
      bio: "Titulada en bachillerato científico de ciencias físicas (opción francés) y graduada como Técnico Especializado en Desarrollo Digital en la OFPPT. Actualmente realizo prácticas en 3LM Solutions.",
      qualitiesLabel: 'Cualidades:',
      qualities: 'Seria · Motivada · Organizada · Aprendizaje rápido · Espíritu de equipo',
      scores: ['1.er año — Nota', '2.º año — Media general', '2.º año — Anual', 'Examen nacional'],
      langs: { ar: 'Árabe', fr: 'Francés', en: 'Inglés', es: 'Español' },
      levels: { native: 'Materno', fluent: 'Fluido', b1: 'Intermedio ', a1: 'Intermedio ' },
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Trabajemos juntos',
      ctaA: '¿Lista para unas ',
      ctaB: 'prácticas',
      ctaC: ' o un',
      ctaD: 'puesto ',
      ctaE: 'junior',
      ctaF: '?',
      sub: "Estoy disponible para cualquier oportunidad de prácticas, formación en alternancia o primer empleo en desarrollo web. ¡No dudes en contactarme!",
      send: 'Enviar un correo →',
      phone: 'Teléfono',
    },
    footer: 'Hajar Bakali — Desarrolladora Full Stack',
  },
}

// ─── LANGUE (contexte) ───────────────────────────────────────────────────────

const LangContext = createContext({ lang: 'fr', t: T.fr, setLang: () => {} })
const useLang = () => useContext(LangContext)

function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-lang')
      return LANGS.includes(saved) ? saved : 'fr'
    } catch {
      return 'fr'
    }
  })

  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem('portfolio-lang', lang) } catch { /* ignore */ }
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, t: T[lang], setLang }}>
      {children}
    </LangContext.Provider>
  )
}

// ─── DONNÉES (non traduites) ─────────────────────────────────────────────────
// Images à placer dans  public/projects/

const NAV_LINKS = [
  { key: 'competences', href: '#competences' },
  { key: 'projets',     href: '#projets'     },
  { key: 'parcours',    href: '#parcours'    },
  { key: 'apropos',     href: '#apropos'     },
  { key: 'contact',     href: '#contact'     },
]

const SKILL_GROUPS = [
  { key: 'front',    tags: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Bootstrap'] },
  { key: 'back',     tags: ['PHP', 'Laravel', 'Node.js', 'Express', 'API REST'] },
  { key: 'db',       tags: ['MySQL', 'SQL', 'NoSQL', 'MongoDB'] },
  { key: 'arch',     tags: ['oop', 'agile', 'UML', 'MVC'] },
  { key: 'tools',    tags: ['Git', 'GitHub', 'GitLab', 'Postman'] },
  { key: 'learning', tags: ['Java'] },
]

const PROJECTS = [
  { id: 'eduflow',     num: '01', stack: ['React', 'Laravel', 'MySQL', 'API REST'], status: 'done',  github: null, image: '/projects/eduflow.png' },
  { id: 'heldi',       num: '02', stack: ['PHP', 'JavaScript', 'MySQL'], status: 'done', github: 'https://github.com/hajarbakkali7/HELDI', image: '/projects/heldi.png' },
  { id: 'appointment', num: '03', stack: ['PHP', 'JavaScript', 'MySQL'], status: 'done', github: 'https://github.com/hajarbakkali7/Smart-20Appointment', image: '/projects/smart-appointment.png' },
  { id: 'expense',     num: '04', stack: ['PHP', 'JavaScript', 'MySQL'], status: 'done', github: 'https://github.com/hajarbakkali7/expense-tracker', image: '/projects/expense-tracker.png' },
  { id: 'sourire', num: '05', stack: ['React', 'Tailwind CSS', 'Framer Motion'], status: 'done', github: null, demo: 'https://sourire-elegance.vercel.app/', image: '/projects/sourire-elegance.png' },
  { id: 'eclat',   num: '06', stack: ['React', 'Tailwind CSS', 'Framer Motion'], status: 'done', github: null, demo: 'https://eclat-beauty-seven.vercel.app/', image: '/projects/eclat-beauty.png' },
]

const TIMELINE = [
  { id: 'lm3',    stack: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Python'] },
  { id: 'garage', stack: ['React', 'Laravel'] },
  { id: 'ofppt',  stack: [] },
  { id: 'bac',    stack: [] },
]

const SCORES = [
  { value: '15,67 / 20',  pct: 0.784 },
  { value: '14,73 / 20',  pct: 0.737 },
  { value: '17,22 / 20',  pct: 0.861 },
  { value: '65,25 / 100', pct: 0.653 },
]

const LANGUAGES = [
  { flag: '🇲🇦', key: 'ar', level: 'native' },
  { flag: '🇫🇷', key: 'fr', level: 'fluent' },
  { flag: '🇬🇧', key: 'en', level: 'b1' },
  { flag: '🇪🇸', key: 'es', level: 'a1' },
]

// ─── ICÔNES SIMPLES (monochromes, héritent de la couleur du texte) ───────────

const svgProps = {
  width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round',
  'aria-hidden': true,
}

const Icons = {
  email: (
    <svg {...svgProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  phone: (
    <svg {...svgProps}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
    </svg>
  ),
  github: (
    <svg {...svgProps}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
  gitlab: (
    <svg {...svgProps}>
      <path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z" />
    </svg>
  ),
  linkedin: (
    <svg {...svgProps}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
}

const CONTACT_LINKS = [
  { icon: Icons.email,    label: 'Email',     value: 'bakalihajar47@gmail.com',          href: 'mailto:bakalihajar47@gmail.com' },
  { icon: Icons.phone,    labelKey: 'phone',  value: '+212 711 903 377',                 href: 'tel:+212711903377' },
  { icon: Icons.linkedin, label: 'LinkedIn',  value: 'linkedin.com/in/hajar-bakali',     href: 'https://www.linkedin.com/in/hajar-bakali-1b59773ab', external: true },
  { icon: Icons.github,   label: 'GitHub',    value: 'github.com/hajarbakkali7',         href: 'https://github.com/hajarbakkali7', external: true },
  { icon: Icons.gitlab,   label: 'GitLab',    value: 'gitlab.com/BKHAJAR',               href: 'https://gitlab.com/BKHAJAR', external: true },
]

// ─── HOOKS ──────────────────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view') }),
      { threshold: 0.1 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

function useCursorGlow() {
  useEffect(() => {
    const glow = document.querySelector('.cursor-glow')
    if (!glow) return
    const move = (e) => {
      glow.style.left = e.clientX + 'px'
      glow.style.top  = e.clientY + 'px'
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
}

function useScoreAnimation() {
  const ref = useRef(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true) },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return { ref, animated }
}

// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────

function TagList({ tags }) {
  return (
    <div className="tags">
      {tags.map(t => <span key={t} className="tag">{t}</span>)}
    </div>
  )
}

function SectionHeader({ eyebrow, title }) {
  return (
    <div className="section-header reveal">
      <div className="section-eyebrow">{eyebrow}</div>
      <h2 className="section-title">{title}</h2>
    </div>
  )
}

function LangSwitch() {
  const { lang, setLang } = useLang()
  return (
    <div className="lang-switch" role="group" aria-label="Language">
      {LANGS.map(l => (
        <button
          key={l}
          type="button"
          className={`lang-switch__btn${lang === l ? ' is-active' : ''}`}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

// ─── SECTIONS ────────────────────────────────────────────────────────────────

function Navbar() {
  const { t } = useLang()
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <span className="navbar__logo-dot" />
        hajar bakali
      </div>
      <ul className="navbar__links">
        {NAV_LINKS.map(l => (
          <li key={l.href}>
            <a href={l.href}>{t.nav[l.key]}</a>
          </li>
        ))}
      </ul>
      <LangSwitch />
      <div className="navbar__available">
        <span className="navbar__available-dot" />
        <span>{t.available}</span>
      </div>
    </nav>
  )
}

function Hero() {
  const { t } = useLang()
  const h = t.hero
  return (
    <section id="accueil" className="hero">
      <div className="hero__bg-grid" />
      <div className="hero__glow" />
      <div className="container">
        <div className="hero__inner">
          <div className="hero__badge">
            <span className="hero__badge-icon">🇲🇦</span>
            {h.badge}
          </div>

          <h1 className="hero__title">
            <span className="hero__title-name">Hajar</span>
            <span className="hero__title-surname">Bakali.</span>
          </h1>

          <div className="hero__role-line">
            <span className="hero__role">PHP · React · Laravel</span>
            <span className="hero__role-sep" />
            <span className="hero__role">{h.age}</span>
            <span className="hero__role-sep" />
            <span className="hero__role">Full Stack</span>
          </div>

          <p className="hero__desc">{h.desc}</p>

          <div className="hero__cta">
            <a href="#projets" className="btn btn--primary">{h.cta1}</a>
            <a href="#contact" className="btn">{h.cta2}</a>
            <a href="mailto:bakalihajar47@gmail.com" className="btn">
              bakalihajar47@gmail.com
            </a>
          </div>

          <div className="hero__stats">
            <div>
              <div className="hero__stat-num"><span>6</span></div>
              <div className="hero__stat-label">{h.stats[0]}</div>
            </div>
            <div>
              <div className="hero__stat-num"><span>17</span><span style={{ fontSize: '1.2rem' }}>,22</span></div>
              <div className="hero__stat-label">{h.stats[1]}</div>
            </div>
            <div>
              <div className="hero__stat-num"><span>2</span></div>
              <div className="hero__stat-label">{h.stats[2]}</div>
            </div>
            <div>
              <div className="hero__stat-num"><span>5</span></div>
              <div className="hero__stat-label">{h.stats[3]}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const { t } = useLang()
  const tagLabel = (tag) => (tag === 'oop' ? t.skills.oop : tag === 'agile' ? t.skills.agile : tag)

  return (
    <section id="competences" className="section">
      <div className="container">
        <SectionHeader eyebrow={t.skills.eyebrow} title={t.skills.title} />
        <div className="skills-categories reveal delay-1">
          {SKILL_GROUPS.map(group => (
            <div key={group.key} className="skill-cat">
              <div className="skill-cat__name">{t.skills.groups[group.key]}</div>
              <TagList tags={group.tags.map(tagLabel)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatusBadge({ status }) {
  const { t } = useLang()
  return (
    <span className={`project-card__status project-card__status--${status}`}>
      <span className="project-card__status-dot" />
      {status === 'done' ? t.projects.done : t.projects.wip}
    </span>
  )
}

function ProjectModal({ project, onClose }) {
  const { t } = useLang()

  useEffect(() => {
    if (!project) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [project, onClose])

  if (!project) return null
  const txt = t.projects.items[project.id]

  return (
    <div className="modal" onClick={onClose} role="dialog" aria-modal="true" aria-label={txt.title}>
      <div className="modal__box" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label={t.projects.close}>✕</button>

        <div className="modal__img-wrap">
          <img src={project.image} alt={`${t.projects.shot} ${txt.title}`} className="modal__img" />
        </div>

        <div className="modal__body">
          <div className="modal__head">
            <h3 className="modal__title">{txt.title}</h3>
            <StatusBadge status={project.status} />
          </div>
          <p className="modal__desc">{txt.desc}</p>
          <div className="modal__footer">
            <TagList tags={project.stack} />
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="project-card__link">
                GitHub →
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" className="project-card__link">
                {t.projects.visit}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Projects() {
  const { t } = useLang()
  const [active, setActive] = useState(null)

  return (
    <section id="projets" className="section">
      <div className="container">
        <SectionHeader eyebrow={t.projects.eyebrow} title={t.projects.title} />
        <div className="projects-grid reveal delay-1">
          {PROJECTS.map((p) => {
            const txt = t.projects.items[p.id]
            return (
              <div
                key={p.num}
                className="project-card project-card--clickable"
                onClick={() => setActive(p)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(p) } }}
                role="button"
                tabIndex={0}
              >
                <div className="project-card__thumb">
                  <img src={p.image} alt={`${t.projects.preview} ${txt.title}`} loading="lazy" />
                  <span className="project-card__thumb-hint">{t.projects.view}</span>
                </div>

                <div className="project-card__header">
                  <span className="project-card__num">{p.num}</span>
                  <StatusBadge status={p.status} />
                </div>

                <h3 className="project-card__title">{txt.title}</h3>
                <p className="project-card__desc">{txt.desc}</p>

                <div className="project-card__footer">
                  <TagList tags={p.stack} />
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="project-card__link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      GitHub →
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="project-card__link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t.projects.visit}
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  )
}

function ScoreSection() {
  const { t } = useLang()
  const { ref, animated } = useScoreAnimation()

  return (
    <div ref={ref}>
      {SCORES.map((s, i) => (
        <div key={i} className="score-row">
          <span className="score-label">{t.about.scores[i]}</span>
          <div className="score-bar-wrap">
            <div
              className={`score-bar${animated ? ' animated' : ''}`}
              style={{ width: `${s.pct * 100}%`, transitionDelay: animated ? '0.2s' : '0s' }}
            />
          </div>
          <span className="score-val">{s.value}</span>
        </div>
      ))}
    </div>
  )
}

function Timeline() {
  const { t } = useLang()
  return (
    <section id="parcours" className="section">
      <div className="container">
        <SectionHeader eyebrow={t.timeline.eyebrow} title={t.timeline.title} />
        <div className="timeline reveal delay-1">
          {TIMELINE.map((item) => {
            const txt = t.timeline.items[item.id]
            return (
              <div key={item.id} className="timeline-item">
                <div className="timeline-item__period">
                  <span className="timeline-item__dot" />
                  {txt.period}
                </div>
                <div>
                  <div className="timeline-item__title">{txt.title}</div>
                  <div className="timeline-item__org">{txt.org}</div>
                  <p className="timeline-item__desc">{txt.desc}</p>
                  {item.stack.length > 0 && <TagList tags={item.stack} />}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function About() {
  const { t } = useLang()
  const a = t.about
  return (
    <section id="apropos" className="section">
      <div className="container">
        <SectionHeader eyebrow={a.eyebrow} title={a.title} />
        <div className="about-layout reveal delay-1">

          <div className="about-card">
            <div className="about-card__label">
              <span className="about-card__label-icon">🎓</span>
              {a.results}
            </div>
            <ScoreSection />
          </div>

          <div className="about-card">
            <div className="about-card__label">
              <span className="about-card__label-icon">👤</span>
              {a.profile}
            </div>
            <div className="about-card__value">
              <strong>Hajar Bakali</strong> — {t.hero.age}<br />
              Tétouan, {t === T.fr ? 'Maroc' : t === T.en ? 'Morocco' : 'Marruecos'}<br /><br />
              {a.bio}<br /><br />
              <strong>{a.qualitiesLabel}</strong> {a.qualities}
            </div>
          </div>

          <div className="about-card about-card--full">
            <div className="about-card__label">
              <span className="about-card__label-icon">🌍</span>
              {a.languages}
            </div>
            <div className="lang-grid">
              {LANGUAGES.map(l => (
                <div key={l.key} className="lang-item">
                  <div className="lang-item__flag">{l.flag}</div>
                  <div className="lang-item__name">{a.langs[l.key]}</div>
                  <div className="lang-item__level">{a.levels[l.level]}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function Contact() {
  const { t } = useLang()
  const c = t.contact
  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeader eyebrow={c.eyebrow} title={c.title} />
        <div className="contact-wrap reveal delay-1">

          <div className="contact-cta">
            <h3 className="contact-cta__title">
              {c.ctaA}<span>{c.ctaB}</span>{c.ctaC}<br />
              {c.ctaD}<span>{c.ctaE}</span> {c.ctaF}
            </h3>
            <p className="contact-cta__sub">{c.sub}</p>
            <a href="mailto:bakalihajar47@gmail.com" className="btn btn--primary">
              {c.send}
            </a>
          </div>

          <div className="contact-links-panel">
            {CONTACT_LINKS.map(l => (
              <a
                key={l.value}
                href={l.href}
                className="contact-link"
                {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                <div className="contact-link__icon">{l.icon}</div>
                <div className="contact-link__info">
                  <div className="contact-link__label">{l.labelKey ? c[l.labelKey] : l.label}</div>
                  <div className="contact-link__value">{l.value}</div>
                </div>
                <span className="contact-link__arrow">↗</span>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer">
      <span className="footer__name">{t.footer}</span>
      <span className="footer__copy">© 2026 · Tétouan</span>
    </footer>
  )
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

function Page() {
  useScrollReveal()
  useCursorGlow()

  return (
    <>
      <div className="cursor-glow" />
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Timeline />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <LangProvider>
      <Page />
    </LangProvider>
  )
}