import { PageShell } from '@/components/shared/page-shell'

const licenses = [
  { name: 'Next.js', description: 'MIT License' },
  { name: 'React', description: 'MIT License' },
  { name: 'Tailwind CSS', description: 'MIT License' },
]

export default function LicensesPage() {
  return (
    <PageShell
      title="Licenses"
      description="Open-source acknowledgements and framework licenses that support the product."
    >
      <div className="grid gap-4">
        {licenses.map((license) => (
          <div key={license.name} className="rounded-[1.6rem] border border-[rgba(45,56,87,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(247,241,232,0.94))] p-5">
            <h3 className="text-lg font-semibold text-foreground">{license.name}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{license.description}</p>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
