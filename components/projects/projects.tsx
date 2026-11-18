 "use client";

import {
  ArrowRight,
  Bot,
  ExternalLink,
  Github,
  LifeBuoy,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";

/**
 * Project imagery below is mockup-only. All visuals are sourced from
 * Dribbble and credit belongs to the original creators on dribbble.com.
 * Replace these with your own work before shipping.
 */

type Project = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  iconLabel: string;
  title: string;
  description: string;
  meta: string;
  imageRatio: number;
  image: string;
  imageAlt: string;
  link?: string;
  liveUrl?: string;
};

const PROJECTS: Project[] = [
  {
    id: "helpdesk",
    icon: LifeBuoy,
    iconLabel: "Help Desk",
    title:
      "A web-based ticketing system designed to manage support tickets, users, and administrative workflows.",
    description:
      "A support ticket platform for submitting, tracking, and resolving requests with streamlined user and admin workflows.",
    meta: "Work Project, 2026",
    imageRatio: 3238 / 1626,
    image: "/opportunity-finder-preview.png",
    imageAlt: "Help Desk ticketing system landing page",
    link: "https://github.com/JosephGyimah/datamaker-ticketing-system",
    liveUrl: "https://datamaker-ticketing-payslip-system.vercel.app",
  },
  {
    id: "ai-opportunity-finder",
    icon: Bot,
    iconLabel: "AI Opportunity Finder",
    title:
      "An AI-powered platform that matches students with the right opportunities faster, smarter, and with full transparency.",
    description:
      "An AI-powered opportunity matcher for scholarships, internships, and programs, with clear explanations for every recommendation.",
    meta: "Personal Project, 2026",
    imageRatio: 2840 / 1550,
    image: "/helpdesk-preview.png",
    imageAlt: "AI Opportunity Finder platform landing page",
    link: "https://github.com/JosephGyimah/Opportunity-Finder",
    liveUrl: "https://opportunity-finder-green.vercel.app",
  },
];

export type ProjectsProps = {
  withHeadline?: boolean;
  viewMoreVisible?: boolean;
};

export function Projects({
  withHeadline = false,
  viewMoreVisible = false,
}: ProjectsProps): ReactNode {
  const items = viewMoreVisible ? PROJECTS.slice(0, 4) : PROJECTS;

  return (
    <section id="projects" className="relative w-full scroll-mt-24">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {withHeadline ? (
          <ProjectCarousel projects={items} />
        ) : null}

        {!withHeadline ? (
          <div className="columns-1 gap-6 md:columns-2 md:gap-7">
            {items.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ProjectCarousel({
  projects,
}: {
  projects: Project[];
}): ReactNode {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = projects[activeIndex] ?? projects[0];
  if (!active) return null;

  const showPrevious = (): void => {
    setActiveIndex((index) =>
      index === 0 ? projects.length - 1 : index - 1
    );
  };

  const showNext = (): void => {
    setActiveIndex((index) => (index + 1) % projects.length);
  };

  return (
    <div className="pb-12 sm:pb-16">
      <FadeIn className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
        <h2 className="text-foreground font-mono text-[26px] font-medium tracking-tight sm:text-[32px]">
          / projects
        </h2>
        <Link
          href="https://github.com/JosephGyimah"
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring group inline-flex shrink-0 items-center gap-2 text-[13px] font-medium text-cyan-400 sm:text-[15px]"
        >
          View all projects
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </FadeIn>

      <div className="relative">
        <button
          type="button"
          onClick={showPrevious}
          aria-label="Previous project"
          className="focus-ring absolute left-3 top-1/2 z-20 -translate-y-1/2 text-foreground/80 transition-colors hover:text-cyan-400 sm:left-5"
        >
          <span aria-hidden="true" className="text-[38px] leading-none sm:text-[48px]">
            ‹
          </span>
        </button>

        <button
          type="button"
          onClick={showNext}
          aria-label="Next project"
          className="focus-ring absolute right-3 top-1/2 z-20 -translate-y-1/2 text-foreground/80 transition-colors hover:text-cyan-400 sm:right-5"
        >
          <span aria-hidden="true" className="text-[38px] leading-none sm:text-[48px]">
            ›
          </span>
        </button>

        <div className="relative aspect-[16/10] min-h-105 overflow-hidden rounded-[1.25rem] border border-foreground/8 bg-neutral-950 sm:aspect-[16/8.5] sm:min-h-0 sm:rounded-[1.5rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={active.image}
                alt={active.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 1100px, calc(100vw - 48px)"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,6,23,0.95)_0%,rgba(2,6,23,0.62)_42%,rgba(2,6,23,0.08)_75%)]" />

              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-10 pb-12 text-center sm:pb-14">
                <h3 className="font-serif text-[30px] font-medium leading-tight tracking-tight text-white sm:text-[42px]">
                  {active.iconLabel}
                </h3>
                <p className="mt-3 max-w-[55ch] text-[13px] leading-[1.55] text-white/75 sm:text-[16px]">
                  {active.description}
                </p>
                <p className="mt-3 text-[11px] uppercase tracking-[0.12em] text-cyan-300 sm:text-[12px]">
                  {active.meta}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  {active.link ? (
                    <Link
                      href={active.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${active.iconLabel} on GitHub`}
                      className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/85 transition-colors hover:border-cyan-300/60 hover:text-cyan-300"
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  ) : null}
                  {active.liveUrl ? (
                    <Link
                      href={active.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${active.iconLabel}`}
                      className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/85 transition-colors hover:border-cyan-300/60 hover:text-cyan-300"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${project.iconLabel}`}
              aria-current={index === activeIndex}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex
                  ? "w-7 bg-cyan-400"
                  : "w-3 bg-foreground/20 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}): ReactNode {
  const Icon = project.icon;
  return (
    <FadeIn
      delay={Math.min(index * 0.06, 0.3)}
      className="mb-6 break-inside-avoid md:mb-7"
    >
      <article className="project-card flex cursor-pointer flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5">
        <header className="flex items-center justify-between gap-2.5 px-1 pt-2">
          <div className="flex items-center gap-2.5">
            <span className="border-foreground/10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-background">
              <Icon className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
            </span>
            <span className="text-sm font-medium tracking-tight text-foreground">
              {project.iconLabel}
            </span>
          </div>
          {project.link ? (
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on GitHub"
              className="border-foreground/8 hover:border-foreground/20 focus-ring inline-flex h-8 w-8 items-center justify-center rounded-lg border bg-background text-foreground/50 transition-colors hover:text-foreground"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </Link>
          ) : null}
        </header>

        <Link
          href={project.liveUrl ?? "#"}
          target={project.liveUrl ? "_blank" : undefined}
          rel={project.liveUrl ? "noopener noreferrer" : undefined}
          aria-label={`Open ${project.iconLabel}`}
          className="project-card__image ring-foreground/5 relative block w-full overflow-hidden rounded-2xl bg-foreground/5 ring-1"
          style={{ aspectRatio: project.imageRatio }}
        >
          <div className="project-card__image-inner">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(min-width: 1024px) 540px, (min-width: 768px) 45vw, 100vw"
              className="object-cover"
              priority={index < 2}
            />
          </div>
        </Link>

        <div className="flex flex-col gap-2.5 px-1 pb-1">
          <h3 className="text-[20px] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[22px]">
            {project.title}
          </h3>
          <p className="text-[14px] leading-normal tracking-tight text-foreground/65 sm:text-[15px]">
            {project.description}
          </p>
        </div>

        <p className="px-1 pb-2 text-[12px] tracking-tight text-foreground/50">
          {project.meta}
        </p>
      </article>
    </FadeIn>
  );
}
