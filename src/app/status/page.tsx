import { Activity, CheckCircle2, Clock3 } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'

const services = [
  { name: 'Editorial web app', status: 'Operational' },
  { name: 'Search and archive index', status: 'Operational' },
  { name: 'Media delivery', status: 'Operational' },
]

const incidents = [
  { date: 'Mar 12, 2026', title: 'Delayed notifications', status: 'Resolved' },
  { date: 'Feb 22, 2026', title: 'Search indexing lag', status: 'Resolved' },
]

export default function StatusPage() {
  return (
    <PageShell
      title="System Status"
      description="A calmer operational snapshot for the publication, archive, and supporting delivery surfaces."
    >
      <div className="space-y-8">
        <div className="rounded-[2rem] border border-[rgba(45,56,87,0.12)] bg-[#19294a] p-6 text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9ee1f3]">
            <Activity className="h-3.5 w-3.5" />
            Live overview
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">All core services are currently stable.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-8 text-slate-300">
            This page keeps the system view aligned with the editorial product tone while leaving uptime and incident reporting straightforward.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.name} className="rounded-[1.8rem] border border-[rgba(45,56,87,0.12)] bg-white/75 p-5">
              <CheckCircle2 className="h-5 w-5 text-[#1f2c55]" />
              <h2 className="mt-4 text-lg font-semibold text-foreground">{service.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{service.status}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[2rem] border border-[rgba(45,56,87,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(247,241,232,0.95))] p-6">
          <h3 className="text-xl font-semibold text-foreground">Incident history</h3>
          <div className="mt-5 space-y-3">
            {incidents.map((incident) => (
              <div key={incident.title} className="flex flex-col gap-3 rounded-[1.4rem] border border-[rgba(45,56,87,0.12)] bg-white/75 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">{incident.date}</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{incident.title}</p>
                </div>
                <div className="inline-flex items-center gap-2 text-sm font-medium text-[#1f2c55]">
                  <Clock3 className="h-4 w-4" />
                  {incident.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  )
}
