import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Sparkles } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/site-config";

const roles = [
  { title: "Editorial Product Designer", location: "Remote", type: "Full-time", level: "Mid-senior" },
  { title: "Frontend Engineer", location: "Remote", type: "Full-time", level: "Senior" },
  { title: "Audience and Community Lead", location: "Hybrid", type: "Part-time", level: "Mid" },
];

const benefits = [
  "Remote-friendly schedules with focused collaboration windows",
  "Learning budget for research, writing, and design craft",
  "Small-team ownership across visible editorial surfaces",
  "Time to refine quality instead of shipping endless noise",
];

export default function CareersPage() {
  return (
    <PageShell
      title="Careers"
      description={`Help shape the editorial experience, archive systems, and product quality behind ${SITE_CONFIG.name}.`}
      actions={
        <Button asChild className="rounded-full bg-[#9ee1f3] text-[#111a2d] hover:bg-[#b1ebfa]">
          <Link href="/contact">Start an application</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          {roles.map((role) => (
            <div key={role.title} className="rounded-[1.9rem] border border-[rgba(45,56,87,0.12)] bg-white/75 p-6">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#51617c]">
                <span className="rounded-full bg-[rgba(25,41,74,0.06)] px-3 py-1 text-[#1f2c55]">{role.level}</span>
                <span>{role.type}</span>
                <span>{role.location}</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-foreground">{role.title}</h2>
              <p className="mt-3 text-sm leading-8 text-muted-foreground">
                Work on publication-first interfaces, stronger archive quality, and supporting surfaces that feel materially better than base templates.
              </p>
              <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1f2c55] hover:text-[#314675]">
                View role
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="rounded-[2rem] border border-[rgba(45,56,87,0.12)] bg-[#19294a] p-6 text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9ee1f3]">
              <BriefcaseBusiness className="h-3.5 w-3.5" />
              Working style
            </div>
            <h3 className="mt-4 text-2xl font-semibold">Join a team building for reading quality, not feed fatigue.</h3>
            <p className="mt-3 text-sm leading-8 text-slate-300">
              We care about clarity, pacing, craft, and the details that make a publication feel intentional from the first scroll.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[rgba(45,56,87,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(247,241,232,0.95))] p-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(25,41,74,0.06)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1f2c55]">
              <Sparkles className="h-3.5 w-3.5" />
              Why here
            </div>
            <div className="mt-4 space-y-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="rounded-[1.2rem] border border-[rgba(45,56,87,0.12)] bg-white/75 px-4 py-3 text-sm leading-7 text-muted-foreground">
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
