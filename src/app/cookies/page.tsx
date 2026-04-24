import { PageShell } from '@/components/shared/page-shell'

const sections = [
  {
    title: 'Essential cookies',
    body: 'These support sign-in state, security, and the core features required for the site to function reliably.',
  },
  {
    title: 'Analytics cookies',
    body: 'Analytics help us understand traffic, reading patterns, and product performance so we can improve the experience.',
  },
  {
    title: 'Preference cookies',
    body: 'Preference storage can remember settings and small interface choices that make return visits smoother.',
  },
]

export default function CookiesPage() {
  return (
    <PageShell
      title="Cookie Policy"
      description="A plain-language overview of the cookie categories used to support the product experience."
    >
      <div className="rounded-[2rem] border border-[rgba(45,56,87,0.12)] bg-white/72 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Last updated: March 16, 2026</p>
        <div className="mt-5 grid gap-4">
          {sections.map((section) => (
            <div key={section.title} className="rounded-[1.5rem] border border-[rgba(45,56,87,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(247,241,232,0.92))] p-5">
              <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
              <p className="mt-3 text-sm leading-8 text-muted-foreground">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
