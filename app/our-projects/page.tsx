"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  cctvAndRelatedProjects,
  type Project,
  type YearlyProjects,
} from "./projects";

const BRAND = "#07518a";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, delay, ease: [0.25, 1, 0.5, 1] },
});

function yearToId(year: string): string {
  return `year-${year.replace(/\s+/g, "-")}`;
}

/* ─── Horizontal timeline: year nodes as scroll links ─── */
function HorizontalTimelineBar({ years }: { years: string[] }) {
  return (
    <div className="relative w-full overflow-x-auto pb-2">
      <div className="flex min-w-max items-center gap-0 px-2">
        {years.map((year, i) => {
          const id = yearToId(year);
          return (
            <React.Fragment key={year}>
              {i > 0 && (
                <div
                  className="h-0.5 flex-1 min-w-[24px] max-w-[80px] shrink-0"
                  style={{ backgroundColor: `${BRAND}40` }}
                />
              )}
              <a
                href={`#${id}`}
                className="flex flex-col items-center shrink-0 rounded px-2 py-1 transition-opacity hover:opacity-80 focus:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#07518a]"
              >
                <div
                  className="h-3 w-3 rounded-full shrink-0"
                  style={{
                    backgroundColor: BRAND,
                    boxShadow: `0 0 0 4px #fff, 0 0 0 5px ${BRAND}30`,
                  }}
                />
                <span
                  className="mt-2 text-sm font-bold whitespace-nowrap"
                  style={{ color: BRAND }}
                >
                  {year}
                </span>
              </a>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 text-left shadow-sm transition-all hover:shadow-md hover:border-gray-300">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {project.serialNo != null && (
          <span
            className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
            style={{ backgroundColor: BRAND }}
          >
            {project.serialNo}
          </span>
        )}
        {project.location && (
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
            {project.location}
          </span>
        )}
        <span className="text-xs font-medium text-gray-500">{project.year}</span>
      </div>
      <h3 className="text-base sm:text-lg font-bold text-gray-900">
        {project.customer}
      </h3>
      <p className="mt-1.5 text-sm text-gray-600 leading-relaxed line-clamp-3">
        {project.scope}
      </p>
    </div>
  );
}

function YearSection({ yearGroup }: { yearGroup: YearlyProjects }) {
  const { year, projects } = yearGroup;
  const id = yearToId(year);
  return (
    <section id={id} className="scroll-mt-28">
      <h3
        className="text-2xl sm:text-3xl font-extrabold mb-6"
        style={{ color: BRAND }}
      >
        {year}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard
            key={`${year}-${i}-${project.customer}`}
            project={project}
          />
        ))}
      </div>
      {projects.length === 0 && (
        <p className="text-gray-500 text-sm">No projects listed yet for this year.</p>
      )}
    </section>
  );
}

export default function OurProjectsPage() {
  const yearlyGroups = [...cctvAndRelatedProjects].reverse();
  const years = yearlyGroups.map((g) => g.year);
  const firstYear = cctvAndRelatedProjects[0]?.year ?? "—";
  const lastYear = cctvAndRelatedProjects[cctvAndRelatedProjects.length - 1]?.year ?? "—";

  return (
    <div className="min-h-screen bg-white">
      {/* ───────────── HERO (gradient only, no image) ───────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#07518a] via-[#064e82] to-[#043662] pt-32 pb-20 sm:pt-36 sm:pb-28 text-white">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <motion.p
            {...fade(0)}
            className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-blue-200 mb-4"
          >
            Portfolio
          </motion.p>
          <motion.h1
            {...fade(0.06)}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight"
          >
            Our Projects
          </motion.h1>
          <motion.p
            {...fade(0.12)}
            className="mt-5 text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed"
          >
            CCTV, surveillance, webcasting, solar, and system integration
            projects — delivered year by year across India.
          </motion.p>
        </div>
      </section>

      {/* ───────────── INTRO ───────────── */}
      <section className="border-b border-gray-200 bg-gray-50/80 py-10 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <span
            className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wider"
            style={{
              borderColor: `${BRAND}33`,
              color: BRAND,
              background: "#ffffff",
            }}
          >
            YEAR WISE
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-neutral-900">
            Projects as Milestones
          </h2>
          <p className="mt-3 text-neutral-600 max-w-xl mx-auto">
            From <strong>{firstYear}</strong> to <strong>{lastYear}</strong> —
            explore our delivered projects by year.
          </p>
        </div>
      </section>

      {/* ───────────── HORIZONTAL TIMELINE BAR ───────────── */}
      <section className="sticky top-0 z-20 border-b border-gray-200 bg-white py-6 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <HorizontalTimelineBar years={years} />
        </div>
      </section>

      {/* ───────────── YEAR SECTIONS (content below horizontal tree) ───────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 pb-24 space-y-16">
        {yearlyGroups.map((yearGroup) => (
          <YearSection key={yearGroup.year} yearGroup={yearGroup} />
        ))}
      </div>

      {/* ───────────── CTA (gradient only, no image) ───────────── */}
      <section
        className="py-20"
        style={{
          background: "linear-gradient(135deg, #07518a 0%, #043662 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <motion.h2
            {...fade(0)}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight"
          >
            Have a project in mind?
          </motion.h2>
          <motion.p
            {...fade(0.08)}
            className="mt-4 text-base sm:text-lg text-blue-100 leading-relaxed"
          >
            From advisory and design to deployment and long-term operations —
            we deliver end-to-end across India.
          </motion.p>
          <motion.div
            {...fade(0.16)}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold bg-white text-[#07518a] shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all"
            >
              Get in Touch
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/casestudy"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors"
            >
              Case studies
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
