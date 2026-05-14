import { FileText, Mail, MessageSquareText, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'
import { ContactLeadForm } from "@/components/shared/contact-lead-form";

const lanes = [
  {
    icon: FileText,
    title: 'Editorial submissions',
    body: 'Pitch essays, reported pieces, analysis series, and article ideas that match the publication tone.',
  },
  {
    icon: Mail,
    title: 'Partnership requests',
    body: 'Reach out for newsletter collaborations, archive sponsorships, and issue-level brand conversations.',
  },
  {
    icon: Sparkles,
    title: 'Contributor support',
    body: 'Ask about publishing workflow, formatting, profile questions, and guidance for a smoother launch.',
  },
]

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main>
        <section className="border-b border-[rgba(45,56,87,0.12)] bg-[linear-gradient(180deg,rgba(18,25,44,0.98)_0%,rgba(29,38,66,0.97)_74%,rgba(248,242,232,0.98)_74.2%,rgba(248,242,232,0.98)_100%)]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9ee1f3]">
                  <MessageSquareText className="h-3.5 w-3.5" />
                  Contact the desk
                </div>
                <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">
                  Start the right conversation without falling into a generic form stack.
                </h1>
                <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-300">
                  Whether you are pitching a story, asking about publication workflow, or coordinating a partnership,
                  this page routes the message through a clearer editorial lens.
                </p>
                <div className="mt-8 grid gap-4">
                  {lanes.map((lane) => (
                    <div key={lane.title} className="rounded-[1.8rem] border border-white/10 bg-white/6 p-5 text-white">
                      <lane.icon className="h-5 w-5 text-[#9ee1f3]" />
                      <h2 className="mt-3 text-xl font-semibold">{lane.title}</h2>
                      <p className="mt-2 text-sm leading-7 text-slate-300">{lane.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-[rgba(45,56,87,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(247,241,232,0.96))] p-7 shadow-[0_24px_80px_rgba(47,35,26,0.08)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Editorial inbox</p>
                    <h2 className="mt-2 text-2xl font-semibold text-foreground">Send a message</h2>
                  </div>
                  <div className="rounded-full bg-[rgba(25,41,74,0.06)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1f2c55]">
                    {SITE_CONFIG.name}
                  </div>
                </div>

                <ContactLeadForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
