import type { ReactNode } from "react";

import { Education } from "./education";
import { Experience } from "./experience";
import { Skills } from "./skills";
import { Stack } from "./stack";
import { FadeIn } from "@/components/ui/motion-primitives";

export function AboutSection(): ReactNode {
  return (
    <section id="about" className="w-full scroll-mt-24">
      <div className="mx-auto w-full max-w-160 px-6 sm:px-10">
        <FadeIn>
          <div className="rounded-4xl border border-foreground/5 bg-foreground/1.5 p-8 sm:p-12 dark:bg-foreground/3">
            <h2 className="font-serif text-[1.75rem] font-medium tracking-tight text-foreground sm:text-[2rem]">
              Hello! I&rsquo;m <span className="border-b border-foreground/30 pb-0.5">Joseph Gyimah</span>.
            </h2>
            <div className="mt-8 space-y-6 text-[17px] leading-[1.7] tracking-tight text-foreground/75 sm:text-[18px]">
              <p>
                A <strong className="font-semibold text-cyan-400">Software Engineer and Agentic Engineer</strong> passionate about building useful systems and tackling real-world problems with technology.
              </p>
              <p>
                My focus is on <strong className="font-semibold text-cyan-400">AI Automation and AI Agentic Engineering</strong>, building systems that are not just functional, but intelligent. I enjoy working on projects that have a tangible impact and push the boundaries of what software can do.
              </p>
              <p>
                I&rsquo;m driven by a clear goal: <strong className="font-semibold text-cyan-400">Build impactful software and grow into a world-class developer</strong>.
                <em className="mt-2 block text-center">Always learning, always building</em>
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-10 pb-2 sm:mt-12">
          <div className="flex flex-col gap-10">
            <Experience />
            <Education />
            <Skills />
            <Stack />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
