"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

type Entry = {
  company: string;
  role: string;
  period: string;
  logoSrc?: string;
  highlights: string[];
};

const ENTRIES: Entry[] = [
  {
    company: "Datamaker",
    role: "Assistant I.T. Manager",
    period: "2024 - Present",
    logoSrc: "/datamaker.png",
    highlights: [
      "Developed a project management web app which was used to replace existing Excel workflows with 100+ users.",
      "Built automations for attendance and other internal tools.",
      "Collaborated with senior managers and project managers to learn more about teamwork and operations.",
      "Managed day-to-day IT support, including troubleshooting technical issues and coordinating system solutions.",
      "Supported device setup, account access, and internal technology operations across the team.",
    ],
  },
];

export function Experience(): ReactNode {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = ENTRIES[activeIndex]!;

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-foreground font-mono text-[26px] font-medium tracking-tight sm:text-[32px]">
        / experience
      </h3>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-[5.5rem_1fr] sm:gap-8">
        <div
          role="tablist"
          aria-label="Experience"
          className="flex gap-2 overflow-x-auto sm:flex-col sm:overflow-visible"
        >
          {ENTRIES.map((entry, index) => (
            <button
              key={`${entry.company}-${entry.period}`}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              className={`focus-ring flex h-11 shrink-0 items-center border-b-2 border-transparent px-3 text-left text-[14px] transition-colors sm:w-full sm:border-b-0 sm:border-l-2 ${
                activeIndex === index
                  ? "border-cyan-400 text-foreground"
                  : "text-foreground/55 hover:text-foreground hover:border-foreground/20"
              }`}
            >
              {entry.company}
            </button>
          ))}
        </div>

        <article
          role="tabpanel"
          className="border-l-2 border-cyan-400/90 pl-5 sm:pl-7"
        >
          <div className="flex items-start gap-3">
            <CompanyLogo entry={active} />
            <div className="min-w-0">
              <h4 className="text-foreground whitespace-nowrap text-[15px] font-semibold leading-tight tracking-tight sm:text-[24px]">
                {active.role} <span className="text-cyan-400">@ {active.company}</span>
              </h4>
              <p className="text-foreground/45 mt-2 font-mono text-[12px] uppercase tracking-[0.08em] sm:text-[13px]">
                {active.period}
              </p>
            </div>
          </div>

          <ul className="mt-5 flex flex-col gap-4">
            {active.highlights.map((highlight) => (
              <li
                key={highlight}
                className="text-foreground/65 flex items-start gap-3 text-[15px] leading-[1.55] tracking-tight sm:text-[16px]"
              >
                <span aria-hidden="true" className="mt-1 text-cyan-400">
                  ▷
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}

function CompanyLogo({ entry }: { entry: Entry }): ReactNode {
  const initials = entry.company.charAt(0);
  return (
    <span
      className="ring-foreground/8 hidden h-12 w-12 shrink-0 items-center justify-center bg-white ring-1 sm:inline-flex dark:ring-white/10"
      aria-hidden="true"
      style={{
        borderRadius: 14,
      }}
    >
      {entry.logoSrc ? (
        <Image
          src={entry.logoSrc}
          alt=""
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
          draggable={false}
        />
      ) : (
        <span className="text-[18px] font-semibold tracking-tight text-white">
          {initials}
        </span>
      )}
    </span>
  );
}
