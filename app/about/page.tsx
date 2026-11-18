import { AboutSection } from "@/components/about/about-section";
import { ContactCard } from "@/components/contact/contact-card";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: "About me, background, and how to get in touch.",
  path: "/about",
});

export default function AboutPage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      {/* <section className="mx-auto w-full max-w-312 pt-40 sm:pt-56">
        <PolaroidStrip />
      </section> */}

      <div className="pt-40 pb-16 sm:pt-56 sm:pb-24">
        <AboutSection />
      </div>

      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
