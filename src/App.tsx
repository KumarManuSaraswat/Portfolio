import { useCallback, useEffect, useRef, useState } from 'react';
import BackgroundVideo from './components/BackgroundVideo';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StackGame from './components/StackGame';

const featuredProjects = [
  {
    title: 'DevFlow',
    summary:
      'A full-stack team-management platform built as a solo university project. DevFlow brings authentication, user roles, projects, task tracking, team workflows, and dashboard-style management into one practical product experience.',
    tags: ['MERN Stack', 'Authentication', 'Teams', 'CRUD'],
    impact: 'Full-stack team workflow platform',
    image: '/assets/devflow.png',
    imageAlt:
      'DevFlow dashboard showing team projects, tasks, and management features',
    link: 'https://devs-flow.netlify.app/teams',
    linkLabel: 'Ask about DevFlow',
  },
  {
    title: 'Ishana Vastu',
    summary:
      'A professional service and booking website created for a pranic healing and Vastu consultancy. The project focuses on clear service presentation, trust-building design, responsive layouts, and helping visitors take action easily.',
    tags: ['React', 'Responsive Design', 'Client Website', 'Netlify'],
    impact: 'Live client-focused service website',
    image: '/assets/ishana-vastu.png',
    imageAlt:
      'Ishana Vastu website homepage for pranic healing and Vastu consultation services',
    link: 'https://ishana-vastu.netlify.app/',
    linkLabel: 'Visit live website',
  },
  {
    title: 'Orniva',
    summary:
      'A polished portfolio web experience developed to explore modern UI design, responsive frontend development, visual storytelling, and a stronger way to present creative and technical work online.',
    tags: ['Frontend', 'UI Design', 'Vite', 'Portfolio'],
    impact: 'Creative frontend showcase',
    image: '/assets/orniva.png',
    imageAlt:
      'Orniva portfolio website showing a modern responsive frontend interface',
    link: 'https://orniva.netlify.app/',
    linkLabel: 'View project details',
  },
];

const strengths = [
  'Building practical MERN-style applications with React, Node.js, authentication, dashboards, CRUD operations, and REST APIs',
  'Designing responsive, polished interfaces that connect clear UX with modern frontend development',
  'Turning an idea into a complete project: planning features, writing code, testing workflows, deploying, and documenting',
  'Bringing creative direction to digital work through Blender 3D animation, visual design, thumbnails, and content creation',
];

const experience = [
  {
    role: 'Campus Lead',
    company: 'OpenAI Student Collective — JECRC University',
    period: '2026 — Present',
  },
  {
    role: 'Full-Stack Developer & Project Builder',
    company: 'Independent Projects and Client Work',
    period: '2024 — Present',
  },
  {
    role: 'Open-Source Contributor',
    company: 'Zulip',
    period: '2025 — Present',
  },
];

export default function App() {
  const [backgroundSettled, setBackgroundSettled] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const startedAt = useRef(performance.now());
  const settleBackground = useCallback(() => setBackgroundSettled(true), []);

  useEffect(() => {
    // A failed or stalled video must never make the portfolio inaccessible.
    const timeout = window.setTimeout(settleBackground, 12000);
    return () => window.clearTimeout(timeout);
  }, [settleBackground]);

  useEffect(() => {
    if (!backgroundSettled) return;
    const timer = window.setTimeout(() => setRevealed(true), Math.max(0, 5000 - (performance.now() - startedAt.current)));
    return () => window.clearTimeout(timer);
  }, [backgroundSettled]);

  useEffect(() => {
    if (revealed) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [revealed]);

  return (
    <>
    <BackgroundVideo enabled={revealed} onReady={settleBackground} onError={settleBackground} />
    <LoadingScreen revealed={revealed} />
    <main
      id="mainframe-app"
      inert={!revealed}
      aria-hidden={!revealed}
      style={{ visibility: revealed ? 'visible' : 'hidden' }}
      className="relative min-h-screen w-full select-text text-black"
    >
      <Navbar />
      <Hero />

      <section
        id="about"
        className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-8 sm:px-8 md:px-12"
      >
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-white/30 bg-white/75 p-6 shadow-[0_12px_32px_rgba(0,0,0,0.14)] backdrop-blur-md sm:p-8">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-black/60">
              About me
            </p>

            <h2 className="max-w-xl text-3xl leading-tight text-black sm:text-4xl">
              I build useful web experiences and bring creative ideas to life.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-black/75 sm:text-lg">
              I’m Kumar Manu Saraswat, a B.Tech Computer Science student
              specializing in Software Product Engineering at Kalvium × JECRC
              University. I build full-stack web applications with React,
              JavaScript, Node.js, APIs, authentication, dashboards, and CRUD
              workflows. Alongside development, I enjoy Blender 3D animation,
              character work, digital design, and creating visual content that
              gives projects more personality.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-7 text-black/75 sm:text-lg">
              I’m actively seeking internships, freelance projects,
              open-source opportunities, and collaborations where I can solve
              real problems, strengthen my engineering skills, and contribute
              with both technical and creative thinking.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/20 bg-black/75 p-6 text-white shadow-[0_12px_32px_rgba(0,0,0,0.2)] backdrop-blur-md sm:p-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/70">
              Snapshot
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <div className="text-3xl font-semibold">MERN</div>
                <p className="text-sm text-white/75">
                  React, Node.js, JavaScript, APIs, authentication, and
                  full-stack workflows
                </p>
              </div>

              <div>
                <div className="text-3xl font-semibold">3D + Design</div>
                <p className="text-sm text-white/75">
                  Blender animation, character work, thumbnails, and visual
                  storytelling
                </p>
              </div>

              <div>
                <div className="text-3xl font-semibold">2029</div>
                <p className="text-sm text-white/75">
                  Expected B.Tech graduation in Computer Science and Software
                  Product Engineering
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="work"
        className="relative z-10 mx-auto max-w-6xl px-6 pb-20 sm:px-8 md:px-12"
      >
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/80">
              Selected work
            </p>

            <h2 className="mt-2 text-3xl text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-4xl">
              Projects built through code and curiosity
            </h2>
          </div>

          <a
            href="#contact"
            className="hidden text-sm font-medium text-white underline-offset-4 hover:underline sm:inline-block"
          >
            Let’s work together
          </a>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <article
              key={project.title}
              className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-white/60 bg-white/85 p-4 shadow-[0_12px_32px_rgba(0,0,0,0.18)] backdrop-blur-md transition duration-300 hover:border-white hover:bg-white/95 hover:shadow-[0_24px_48px_rgba(0,0,0,0.24)] motion-safe:hover:-translate-y-2 sm:p-5"
            >
              <a
                href={project.link}
                target={project.link.startsWith('http') ? '_blank' : undefined}
                rel={project.link.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={`Visit ${project.title}`}
                className="relative mb-6 block aspect-[3/2] shrink-0 overflow-hidden rounded-[20px] bg-black/10 ring-1 ring-black/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              >
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="h-full w-full object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-105"
                  loading="lazy"
                />
                <span aria-hidden="true" className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/80 text-xl text-white shadow-lg transition-colors group-hover:bg-black">↗</span>
              </a>

              <div className="mb-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-black/5 bg-black/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-black/65"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-2xl font-semibold tracking-tight text-black">{project.title}</h3>

              <p className="mt-3 mb-6 text-sm leading-6 text-black/70">
                {project.summary}
              </p>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-5">
                <span className="text-sm font-medium text-black">
                  {project.impact}
                </span>

                <a
                  href={project.link}
                  target={
                    project.link.startsWith('http') ? '_blank' : undefined
                  }
                  rel={
                    project.link.startsWith('http')
                      ? 'noreferrer'
                      : undefined
                  }
                  className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                >
                  {project.linkLabel}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <StackGame />

      <section
        id="process"
        className="relative z-10 mx-auto max-w-6xl px-6 pb-20 sm:px-8 md:px-12"
      >
        <div className="rounded-[30px] border border-white/30 bg-white/75 p-6 shadow-[0_12px_32px_rgba(0,0,0,0.14)] backdrop-blur-md sm:p-8 md:p-10">
          <div className="mb-8 max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-black/60">
              How I work
            </p>

            <h2 className="mt-2 text-3xl text-black sm:text-4xl">
              Build, test, learn, refine, repeat.
            </h2>

            <p className="mt-4 text-base leading-7 text-black/75">
              I learn best by building real projects. Every project is a chance
              to improve my code quality, understand product decisions, solve
              new problems, and create something more useful than the version
              before it.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {strengths.map((item, index) => (
              <div
                key={item}
                className="rounded-[22px] border border-black/10 bg-white/80 p-5 shadow-sm"
              >
                <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-medium text-white">
                  0{index + 1}
                </div>

                <p className="text-base leading-7 text-black/80">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 sm:px-8 md:px-12">
        <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-white/20 bg-black/75 p-6 text-white shadow-[0_12px_32px_rgba(0,0,0,0.2)] backdrop-blur-md sm:p-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/70">
              Experience
            </p>

            <h2 className="mt-3 text-3xl text-white">My current journey</h2>

            <p className="mt-4 text-sm leading-6 text-white/75">
              Growing through hands-on development, community leadership,
              open-source contribution, and creative project work.
            </p>
          </div>

          <div className="space-y-4">
            {experience.map((item) => (
              <div
                key={`${item.company}-${item.period}`}
                className="flex flex-col items-start gap-3 rounded-[22px] border border-white/30 bg-white/75 px-5 py-4 shadow-[0_12px_32px_rgba(0,0,0,0.14)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="text-xl text-black">{item.role}</div>
                  <div className="text-sm text-black/60">{item.company}</div>
                </div>

                <span className="text-right text-sm uppercase tracking-[0.12em] text-black/50">
                  {item.period}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="relative z-10 mx-auto max-w-6xl px-6 pb-28 sm:px-8 md:px-12"
      >
        <div className="rounded-[30px] border border-white/30 bg-white/80 p-6 shadow-[0_12px_32px_rgba(0,0,0,0.16)] backdrop-blur-md sm:p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-stretch lg:gap-10">
            <div className="max-w-xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-black/60">
                Let’s build something memorable
              </p>

              <h2 className="mt-2 text-3xl text-black sm:text-5xl">
                Open to internships, freelance projects, collaborations, and
                meaningful learning opportunities.
              </h2>

              <p className="mt-4 text-base leading-7 text-black/75">
                If you need a developer for a web project, want to collaborate
                on an idea, or have an opportunity where I can contribute and
                grow, I would love to hear from you.
              </p>
            </div>

            <div className="flex min-w-0 w-full flex-col justify-between gap-8 sm:gap-10">
              <img
                src="/assets/contact-minecraft.png"
                alt="Three Minecraft characters relaxing together beneath pink blossoms"
                width={2560}
                height={1440}
                loading="lazy"
                className="aspect-video w-full rounded-[22px] object-cover shadow-lg lg:aspect-[4/3]"
              />
              <div className="flex flex-wrap gap-3">
              <a
                href="mailto:kumarsaraswat1983@gmail.com"
                className="inline-flex items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Email me
              </a>

              <a
                href="https://ishana-vastu.netlify.app/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white"
              >
                Visit a live project
              </a>

              <a
                href="#work"
                className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white"
              >
                View work
              </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer
        id="agency-footer"
        className="pointer-events-none fixed bottom-5 left-5 z-10 select-none text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:bottom-6 sm:left-8 md:left-10"
      >
        Kumar Manu Saraswat &copy; 2026
      </footer>
    </main>
    </>
  );
}
