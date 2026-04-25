import Link from 'next/link'
import { ArrowRight, Compass, FileText, LayoutGrid, Search, Sparkles } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { FOOTER_OVERRIDE_ENABLED, FooterOverride } from '@/overrides/footer'

const utilityLinks = [
  { name: 'Search', href: '/search' },
  { name: 'Contact', href: '/contact' },
  { name: 'Help', href: '/help' },
  { name: 'Privacy', href: '/privacy' },
]

const iconMap: Record<string, any> = {
  article: FileText,
  listing: LayoutGrid,
  classified: LayoutGrid,
  image: Compass,
  profile: Sparkles,
  sbm: Search,
  pdf: FileText,
}

export function Footer() {
  if (FOOTER_OVERRIDE_ENABLED) {
    return <FooterOverride />
  }

  const { recipe } = getFactoryState()
  const emphasisKeys = recipe.enabledTasks.length ? recipe.enabledTasks : [recipe.primaryTask]
  const activeTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const featuredTasks = activeTasks.filter((task) => emphasisKeys.includes(task.key as any))
  const primaryTask = featuredTasks.find((task) => task.key === recipe.primaryTask) || featuredTasks[0]

  return (
    <footer className="mt-10 border-t border-[rgba(45,56,87,0.12)] bg-[linear-gradient(180deg,rgba(18,25,44,1)_0%,rgba(26,35,60,1)_100%)] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.8fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-7 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/12 p-0.5">
                <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="56" height="56" className="h-full w-full scale-[1.16] object-cover" />
              </div>
              <div>
                <p className="text-xl font-semibold tracking-[-0.03em]">{SITE_CONFIG.name}</p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-300">{siteContent.footer.tagline}</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-8 text-slate-300">{SITE_CONFIG.description}</p>
            {primaryTask ? (
              <Link href={primaryTask.route} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#9ee1f3] px-4 py-2.5 text-sm font-semibold text-[#111a2d] transition hover:bg-[#b1ebfa]">
                Explore {primaryTask.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Featured desk</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-200">
              {featuredTasks.map((task) => {
                const Icon = iconMap[task.key] || LayoutGrid
                return (
                  <li key={task.key}>
                    <Link href={task.route} className="flex items-center gap-2 hover:text-white">
                      <Icon className="h-4 w-4" />
                      {task.label}
                    </Link>
                  </li>
                )
              })}
              <li>
                <Link href="/search" className="flex items-center gap-2 hover:text-white">
                  <Search className="h-4 w-4" />
                  Search archive
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Utilities</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              {utilityLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-5 text-sm text-slate-400">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
