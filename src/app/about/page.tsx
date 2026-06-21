import Link from "next/link";
import { ArrowRight, Compass, FileText, LibraryBig, Sparkles } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { mockTeamMembers } from "@/data/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";

const highlights = [
  { label: "Published perspectives", value: "Weekly", icon: FileText },
  { label: "Archive rhythm", value: "Deep reads", icon: LibraryBig },
  { label: "Editorial standard", value: "Human-led", icon: Sparkles },
];

const pillars = [
  {
    title: "Slow down the feed",
    description:
      "We favor stronger hierarchy, clearer reading flow, and more thoughtful framing over generic content sprawl.",
  },
  {
    title: "Keep supporting formats accessible",
    description:
      "Images, documents, references, and related task surfaces stay available without taking over the publication identity.",
  },
  {
    title: "Design for return visits",
    description:
      "The archive is structured to reward browsing, revisiting, and following ideas across multiple pieces.",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is built as a modern editorial product: issue-like presentation, premium reading comfort, and quieter supporting discovery around the archive.`}
      actions={
        <>
          <Button variant="outline" asChild className="rounded-full border-white/15 bg-white/8 text-white hover:bg-white/14">
           
          </Button>
          <Button asChild className="rounded-full bg-[#9ee1f3] text-[#111a2d] hover:bg-[#b1ebfa]">
            <Link href="/contact">Contact editorial desk</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-[rgba(45,56,87,0.12)] bg-white/70 p-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(25,41,74,0.06)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1f2c55]">
              <Compass className="h-3.5 w-3.5" />
              Editorial mission
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-foreground">
              A journal-shaped product for essays, dispatches, and signals that deserve more room.
            </h2>
            <p className="mt-4 text-sm leading-8 text-muted-foreground">
              Instead of presenting every route like the same repeated module, the site is organized around an
              article-first reading experience with a stronger sense of cover story, archive depth, and narrative
              pacing.
            </p>
            <p className="mt-4 text-sm leading-8 text-muted-foreground">
              Supporting surfaces still matter, but they now work in service of the publication rather than competing
              with it.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.label} className="rounded-[1.7rem] border border-[rgba(45,56,87,0.12)] bg-[rgba(255,255,255,0.78)] p-5">
                <item.icon className="h-5 w-5 text-[#1f2c55]" />
                <p className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-foreground">{item.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-[1.8rem] border border-[rgba(45,56,87,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(247,241,232,0.95))] p-6">
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-8 text-muted-foreground">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>

      
    </PageShell>
  );
}
