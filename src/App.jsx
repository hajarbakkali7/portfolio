import { useEffect, useRef, useState } from 'react'

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'compétences', href: '#competences' },
  { label: 'projets',     href: '#projets'     },
  { label: 'parcours',    href: '#parcours'     },
  { label: 'à propos',    href: '#apropos'      },
  { label: 'contact',     href: '#contact'      },
]

const SKILL_GROUPS = [
  {
    icon: '',
    name: 'Front-end',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Bootstrap'],
  },
  {
    icon: '',
    name: 'Back-end',
    tags: ['PHP', 'Laravel', 'Node.js', 'Express', 'Inertia'],
  },
  {
    icon: '',
    name: 'Bases de données',
    tags: ['MySQL', 'SQL', 'NoSQL'],
  },
  {
    icon: '',
    name: 'Architecture',
    tags: ['POO', 'Approche Agile', 'UML', 'MVC'],
  },
  {
    icon: '',
    name: 'Outils',
    tags: ['Git', 'GitHub', 'GitLab', 'Postman'],
  },
]

const PROJECTS = [
  {
    num: '01',
    title: 'Heldi — Boutique cosmétique',
    desc: "Plateforme e-commerce complète dédiée aux produits cosmétiques. Catalogue produits, système de panier, gestion des commandes et sécurisation des données.",
    stack: ['PHP', 'JavaScript', 'MySQL'],
    status: 'done',
    github: 'https://github.com/hajarbakkali7/HELDI',
  },
  {
    num: '02',
    title: 'Smart Appointment',
    desc: "Système de prise de rendez-vous en ligne. Réservation, gestion et suivi avec interface intuitive, authentification sécurisée et panneaux admin/client.",
    stack: ['PHP', 'JavaScript', 'MySQL'],
    status: 'done',
    github: 'https://github.com/hajarbakkali7/Smart-20Appointment',
  },
  {
    num: '03',
    title: 'Expense Tracker',
    desc: "Application de gestion des dépenses personnelles avec catégorisation, filtres avancés, tableau de bord récapitulatif et visualisation des données.",
    stack: ['PHP', 'JavaScript', 'MySQL'],
    status: 'done',
    github: 'https://github.com/hajarbakkali7/expense-tracker',
  },
  {
    num: '04',
    title: 'Gestion des terrains',
    desc: "Application de gestion et réservation de terrains sportifs. Planification, disponibilités en temps réel et système de réservation sécurisé.",
    stack: ['PHP', 'JavaScript', 'MySQL'],
    status: 'done',
    github: 'https://github.com/hajarbakkali7/application-web-gestion-terrain',
  },
  {
    num: '05',
    title: 'Application en cours — React × Laravel',
    desc: "Projet full-stack en développement actif avec React, Laravel et Inertia.js. Architecture moderne, API RESTful sécurisée et interface réactive.",
    stack: ['React', 'Laravel', 'Inertia.js', 'MySQL'],
    status: 'wip',
    github: null,
  },
]

const TIMELINE = [
  {
    period: '2026 · 1 mois',
    title: 'Stage — Développement Web',
    org: 'Entreprise Tétouan',
    desc: "Développement d'une application web de gestion de garage. Conception et intégration du front-end avec React, back-end Laravel et Inertia.js en stack full-stack.",
    stack: ['React', 'Laravel', 'Inertia'],
  },
  {
    period: '2024 – 2026',
    title: 'Technicien Spécialisé — Dev Digital',
    org: 'OFPPT · Tétouan',
    desc: "Formation intensive en développement web full stack. Mention en 1ère année : 15,67 — Moyenne générale 2ème année : 14,73 — Note annuelle : 17,22 — Examen national : 65,25/100.",
    stack: [],
  },
  {
    period: '2024',
    title: 'Baccalauréat Scientifique',
    org: 'Sciences Physiques, option Français · Tétouan',
    desc: "Baccalauréat obtenu avec option sciences physiques en filière française.",
    stack: [],
  },
]

const SCORES = [
  { label: '1ère année — Mention',   value: '15,67 / 20', pct: 0.784 },
  { label: '2ème année — Moy. gén.', value: '14,73 / 20', pct: 0.737 },
  { label: '2ème année — Annuel',    value: '17,22 / 20', pct: 0.861 },
  { label: 'Examen national',        value: '65,25 / 100', pct: 0.653 },
]

const LANGUAGES = [
  { flag: '🇲🇦', name: 'Arabe',    level: 'Maternel' },
  { flag: '🇫🇷', name: 'Français', level: 'Courant'  },
  { flag: '🇬🇧', name: 'Anglais',  level: 'B1'       },
  { flag: '🇪🇸', name: 'Espagnol', level: 'A1'       },
]

const CONTACT_LINKS = [
  { icon: '', label: 'Email',   value: 'bakalihajar47@gmail.com', href: 'mailto:bakalihajar47@gmail.com' },
  { icon: '', label: 'Téléphone', value: '+212 711 903 377',     href: 'tel:+212711903377'              },
  { icon: '', label: 'GitHub',  value: 'github.com/hajar',       href: 'https://github.com/hajarbakkali7', external: true },
  { icon: '', label: 'GitLab',  value: 'gitlab.com/hajar',       href: 'https://gitlab.com/BKHAJAR', external: true },
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

// ─── SECTIONS ────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <span className="navbar__logo-dot" />
        hajar bakali
      </div>
      <ul className="navbar__links">
        {NAV_LINKS.map(l => (
          <li key={l.href}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>
      <div className="navbar__available">
        <span className="navbar__available-dot" />
        <span>Disponible</span>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section id="accueil" className="hero">
      <div className="hero__bg-grid" />
      <div className="hero__glow" />
      <div className="container">
        <div className="hero__inner">
          <div className="hero__badge">
            <span className="hero__badge-icon">🇲🇦</span>
            Développeuse Full Stack · Tétouan, Maroc
          </div>

          <h1 className="hero__title">
            <span className="hero__title-name">Hajar</span>
            <span className="hero__title-surname">Bakali.</span>
          </h1>

          <div className="hero__role-line">
            <span className="hero__role">PHP · React · Laravel</span>
            <span className="hero__role-sep" />
            <span className="hero__role">20 ans</span>
            <span className="hero__role-sep" />
            <span className="hero__role">Full Stack</span>
          </div>

          <p className="hero__desc">
            Étudiante passionnée en développement web full stack, je conçois
            et développe des applications web complètes avec une attention
            particulière à la qualité du code et à la sécurité des données.
          </p>

          <div className="hero__cta">
            <a href="#projets" className="btn btn--primary">Voir mes projets</a>
            <a href="#contact"  className="btn">Me contacter →</a>
            <a href="mailto:bakalihajar47@gmail.com" className="btn">
              bakalihajar47@gmail.com
            </a>
          </div>

          <div className="hero__stats">
            <div>
              <div className="hero__stat-num"><span>4</span></div>
              <div className="hero__stat-label">Projets GitHub</div>
            </div>
            <div>
              <div className="hero__stat-num"><span>17</span><span style={{fontSize:'1.2rem'}}>,22</span></div>
              <div className="hero__stat-label">Note annuelle / 20</div>
            </div>
            <div>
              <div className="hero__stat-num"><span>1</span></div>
              <div className="hero__stat-label">Stage entreprise</div>
            </div>
            <div>
              <div className="hero__stat-num"><span>5</span></div>
              <div className="hero__stat-label">Technologies maîtrisées</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="competences" className="section">
      <div className="container">
        <SectionHeader eyebrow="Compétences" title="Ce que je maîtrise" />
        <div className="skills-categories reveal delay-1">
          {SKILL_GROUPS.map(group => (
            <div key={group.name} className="skill-cat">
              <span className="skill-cat__icon">{group.icon}</span>
              <div className="skill-cat__name">{group.name}</div>
              <TagList tags={group.tags} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projets" className="section">
      <div className="container">
        <SectionHeader eyebrow="Projets" title="Mes réalisations" />
        <div className="projects-grid reveal delay-1">
          {PROJECTS.map((p, i) => (
            <div
              key={p.num}
              className={`project-card${i === PROJECTS.length - 1 && PROJECTS.length % 2 !== 0 ? ' project-card--wide' : ''}`}
            >
              <div className="project-card__header">
                <span className="project-card__num">{p.num}</span>
                <span className={`project-card__status project-card__status--${p.status}`}>
                  <span className="project-card__status-dot" />
                  {p.status === 'done' ? 'Terminé' : 'En cours'}
                </span>
              </div>

              <h3 className="project-card__title">{p.title}</h3>
              <p className="project-card__desc">{p.desc}</p>

              <div className="project-card__footer">
                <TagList tags={p.stack} />
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="project-card__link"
                  >
                    GitHub →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ScoreSection() {
  const { ref, animated } = useScoreAnimation()

  return (
    <div ref={ref}>
      {SCORES.map(s => (
        <div key={s.label} className="score-row">
          <span className="score-label">{s.label}</span>
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
  return (
    <section id="parcours" className="section">
      <div className="container">
        <SectionHeader eyebrow="Parcours" title="Expérience & Formation" />
        <div className="timeline reveal delay-1">
          {TIMELINE.map((item, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-item__period">
                <span className="timeline-item__dot" />
                {item.period}
              </div>
              <div>
                <div className="timeline-item__title">{item.title}</div>
                <div className="timeline-item__org">{item.org}</div>
                <p className="timeline-item__desc">{item.desc}</p>
                {item.stack.length > 0 && <TagList tags={item.stack} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="apropos" className="section">
      <div className="container">
        <SectionHeader eyebrow="À propos" title="Mon profil" />
        <div className="about-layout reveal delay-1">

          <div className="about-card">
            <div className="about-card__label">
              <span className="about-card__label-icon">🎓</span>
              Résultats académiques
            </div>
            <ScoreSection />
          </div>

          <div className="about-card">
            <div className="about-card__label">
              <span className="about-card__label-icon">👤</span>
              Profil
            </div>
            <div className="about-card__value">
              <strong>Hajar Bakali</strong> — 20 ans<br />
              Tétouan, Maroc<br /><br />
              Titulaire d'un bac scientifique physique (option français), 
              actuellement en 2ème année de formation Technicien Spécialisé 
              en Développement Digital à l'OFPPT.<br /><br />
              <strong>Qualités :</strong> Sérieuse · Motivée · Organisée · 
              Apprentissage rapide · Esprit d'équipe
            </div>
          </div>

          <div className="about-card about-card--full">
            <div className="about-card__label">
              <span className="about-card__label-icon">🌍</span>
              Langues
            </div>
            <div className="lang-grid">
              {LANGUAGES.map(l => (
                <div key={l.name} className="lang-item">
                  <div className="lang-item__flag">{l.flag}</div>
                  <div className="lang-item__name">{l.name}</div>
                  <div className="lang-item__level">{l.level}</div>
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
  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeader eyebrow="Contact" title="Travaillons ensemble" />
        <div className="contact-wrap reveal delay-1">

          <div className="contact-cta">
            <h3 className="contact-cta__title">
              Prête pour un <span>stage</span> ou un<br />
              poste <span>junior</span> ?
            </h3>
            <p className="contact-cta__sub">
              Je suis disponible pour toute opportunité de stage, 
              alternance ou premier poste en développement web. 
              N'hésitez pas à me contacter !
            </p>
            <a href="mailto:bakalihajar47@gmail.com" className="btn btn--primary">
              Envoyer un email →
            </a>
          </div>

          <div className="contact-links-panel">
            {CONTACT_LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="contact-link"
                {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                <div className="contact-link__icon">{l.icon}</div>
                <div className="contact-link__info">
                  <div className="contact-link__label">{l.label}</div>
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
  return (
    <footer className="footer">
      <span className="footer__name">Hajar Bakali — Développeuse Full Stack</span>
      <span className="footer__copy">© 2025 · Tétouan, Maroc</span>
    </footer>
  )
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

export default function App() {
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
