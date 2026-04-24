import { PageShell } from '@/components/shared/page-shell'

const sections = [
  {
    title: 'Information we receive',
    body: 'We collect the account details you provide, the content you publish, and the basic usage information needed to keep the platform secure and functional.',
  },
  {
    title: 'How information is used',
    body: 'Data helps us deliver accounts, improve discovery, support publishing workflows, maintain operational health, and respond to support requests.',
  },
  {
    title: 'Your controls',
    body: 'You can manage your account details, adjust communication preferences, and request removal of content or account access when appropriate.',
  },
]

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      description="How information is handled across the editorial product, archive surfaces, and supporting account flows."
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
