import { PageShell } from '@/components/shared/page-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'Account responsibilities',
    body: 'Keep your credentials secure, provide accurate information, and use the platform in ways that respect the publication and its participants.',
  },
  {
    title: 'Content rights',
    body: 'You retain ownership of submitted content while granting the platform the permissions needed to host, display, and distribute that content through the site.',
  },
  {
    title: 'Acceptable use',
    body: 'Do not use the product for spam, abuse, harassment, unauthorized scraping, or unlawful publishing activity.',
  },
]

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of Service"
      description={`The operating rules, publishing expectations, and usage boundaries for ${SITE_CONFIG.name}.`}
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
