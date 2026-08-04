import { useEffect, useRef } from 'react'

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'compétences', href: '#competences' },
  { label: 'projets',     href: '#projets'     },
  { label: 'à propos',    href: '#apropos'      },
  { label: 'contact',     href: '#contact'      },
]

const SKILLS = [
  {
    label: 'Front-end',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Bootstrap'],
  },
  {
    label: 'Back-end',
    tags: ['PHP', 'Laravel', 'Node.js', 'MySQL'],
  },
  {
    label: 'Outils',
    tags: ['Git', 'GitHub', 'GitLab'],
  },
]

const PROJECTS = [
  {
    num: '01',
    title: 'Expense Tracker',
    desc: "Application de gestion des dépenses personnelles avec catégorisation, filtres et tableau de bord récapitulatif.",
    stack: ['JavaScript', 'PHP', 'MySQL'],
  },
  {
    num: '02',
    title: 'Smart Appointment',
    desc: "Système de prise de rendez-vous en ligne permettant la réservation, la gestion et le suivi des appointments.",
    stack: ['JavaScript', 'PHP', 'MySQL'],
  },
  {
    num: '03',
    title: 'Heldi — Boutique cosmétique',
    desc: "Plateforme e-commerce dédiée aux produits cosmétiques avec catalogue, panier d'achat et gestion des commandes.",
    stack: ['JavaScript', 'PHP', 'MySQL'],
  },
]

const CONTACT_LINKS = [
  { label: 'bakalihajar47@gmail.com', href: 'mailto:bakalihajar47@gmail.com' },
  { label: '+212 711 903 377',        href: 'tel:+212711903377'              },
  { label: 'GitHub',                  href: 'https://github.com/',  external: true },
  { label: 'GitLab',                  href: 'https://gitlab.com/', external: true },
]

const SOFT_SKILLS = [
  'Sérieuse', 'Motivée', 'Apprentissage rapide',
  'Organisée', "Esprit d'équipe", 'Impliquée',
]

// ─── Custom hook: fade-in on scroll ─────────────────────────────────────────

function useFadeIn() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}

// ─── Small reusable components ───────────────────────────────────────────────

function TagList({ tags }) {
  return (
    <div className="tags">
      {tags.map((t) => (
        <span key={t} className="tag">{t}</span>
      ))}
    </div>
  )
}

function SectionLabel({ children }) {
  return <div className="section-label fade-in">{children}</div>
}

// ─── Section components ──────────────────────────────────────────────────────

function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar__logo">hajar bakali</span>
      <ul className="navbar__links">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="container">
        <p className="hero__eyebrow">Disponible pour un stage ou alternance</p>
        <div className="hero__initials">HB</div>
        <h1 className="hero__title">
          Hajar<br />
          <span className="hero__title--dim">Bakali.</span>
        </h1>
        <p className="hero__role">Développeuse Full Stack — Tétouan, Maroc</p>
        <p className="hero__desc">
          Étudiante en 2ᵉ année développement web full stack.
          Je conçois des applications web complètes, du front-end au back-end,
          avec rigueur et implication.
        </p>
        <div className="hero__cta">
          <a href="#projets" className="btn btn--solid">Voir mes projets</a>
          <a href="mailto:bakalihajar47@gmail.com" className="btn">Me contacter</a>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="competences" className="section">
      <div className="container">
        <SectionLabel>Compétences</SectionLabel>
        <div className="skills-grid fade-in delay-1">
          {SKILLS.map((group) => (
            <div key={group.label} className="skill-group">
              <div className="skill-group__label">{group.label}</div>
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
        <SectionLabel>Projets</SectionLabel>
        <div className="projects-list fade-in delay-1">
          {PROJECTS.map((project) => (
            <div key={project.num} className="project-card">
              <span className="project-card__num">{project.num}</span>
              <div>
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.desc}</p>
                <TagList tags={project.stack} />
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
        <SectionLabel>À propos</SectionLabel>
        <div className="about-grid fade-in delay-1">
          <div className="about-cell">
            <div className="about-cell__label">Formation</div>
            <p className="about-cell__value">
              2ᵉ année — Développement Web Full Stack<br />
              Tétouan, Maroc
            </p>
          </div>
          <div className="about-cell">
            <div className="about-cell__label">Disponibilité</div>
            <p className="about-cell__value">
              Ouverte aux stages<br />
              et opportunités junior
            </p>
          </div>
          <div className="about-cell about-cell--full">
            <div className="about-cell__label">Qualités personnelles</div>
            <TagList tags={SOFT_SKILLS} />
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
        <SectionLabel>Contact</SectionLabel>
        <div className="contact-box fade-in delay-1">
          <h2 className="contact-box__title">Travaillons ensemble.</h2>
          <p className="contact-box__sub">
            Je suis disponible pour un stage, une alternance ou un premier poste junior.
          </p>
          <div className="contact-links">
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="contact-link"
                {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                <span className="contact-link__dot" />
                {link.label}
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
      <span className="footer__name">Hajar Bakali</span>
      <span className="footer__copy">© 2025 — Développeuse Full Stack</span>
    </footer>
  )
}

// ─── App root ────────────────────────────────────────────────────────────────

export default function App() {
  useFadeIn()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
