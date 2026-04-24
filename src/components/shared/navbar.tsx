'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, Menu, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { NAVBAR_OVERRIDE_ENABLED, NavbarOverride } from '@/overrides/navbar'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

export function Navbar() {
  if (NAVBAR_OVERRIDE_ENABLED) {
    return <NavbarOverride />
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const { recipe } = getFactoryState()

  const highlightedTaskKeys = recipe.enabledTasks.length ? recipe.enabledTasks : [recipe.primaryTask]
  const highlightedTasks = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled && highlightedTaskKeys.includes(task.key as any)),
    [highlightedTaskKeys]
  )
  const staticLinks = useMemo(
    () => [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    []
  )
  const secondaryTasks = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled && !highlightedTaskKeys.includes(task.key as any)),
    [highlightedTaskKeys]
  )
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[rgba(45,56,87,0.12)] bg-[rgba(251,247,240,0.82)] text-foreground backdrop-blur-2xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[1.5rem] border border-[rgba(45,56,87,0.12)] p-0.5 shadow-[0_12px_30px_rgba(40,31,24,0.08)]">
              <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="56" height="56" className="h-full w-full scale-[1.16] object-cover" />
            </div>
            <div className="min-w-0">
              <span className="block truncate text-xl font-semibold tracking-[-0.04em] text-foreground">{SITE_CONFIG.name}</span>
              <span className="hidden text-[10px] uppercase tracking-[0.28em] text-muted-foreground sm:block">Issue-style reading experience</span>
            </div>
          </Link>

          <div className="hidden items-center gap-2 xl:flex">
            {highlightedTasks.map((task) => {
              const isActive = pathname.startsWith(task.route)
              return (
                <Link
                  key={task.key}
                  href={task.route}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-semibold transition',
                    isActive
                      ? 'bg-[#19294a] text-white shadow-[0_10px_24px_rgba(25,41,74,0.18)]'
                      : 'text-[#33415f] hover:bg-[rgba(25,41,74,0.06)] hover:text-foreground'
                  )}
                >
                  {task.label}
                </Link>
              )
            })}
            {staticLinks.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-semibold transition',
                    isActive
                      ? 'bg-[#19294a] text-white shadow-[0_10px_24px_rgba(25,41,74,0.18)]'
                      : 'text-[#33415f] hover:bg-[rgba(25,41,74,0.06)] hover:text-foreground'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="icon" asChild className="hidden rounded-full border border-[rgba(45,56,87,0.12)] bg-white md:flex">
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>

          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" asChild className="rounded-full px-4">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className="rounded-full bg-[#19294a] text-white hover:bg-[#24375f]">
                <Link href="/register">
                  Join free
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}

          <Button variant="ghost" size="icon" className="rounded-full border border-[rgba(45,56,87,0.12)] bg-white lg:hidden" onClick={() => setIsMobileMenuOpen((value) => !value)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {isMobileMenuOpen ? (
        <div className="border-t border-[rgba(45,56,87,0.12)] bg-[rgba(251,247,240,0.96)] lg:hidden">
          <div className="mx-auto max-w-7xl space-y-3 px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/search" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 rounded-[1.4rem] border border-[rgba(45,56,87,0.12)] bg-white px-4 py-3 text-sm font-semibold text-muted-foreground">
              <Search className="h-4 w-4" />
              Search archive
            </Link>

            {highlightedTasks.map((task) => {
              const isActive = pathname.startsWith(task.route)
              return (
                <Link
                  key={task.key}
                  href={task.route}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center justify-between rounded-[1.4rem] px-4 py-3 text-sm font-semibold transition',
                    isActive
                      ? 'bg-[#19294a] text-white'
                      : 'border border-[rgba(45,56,87,0.12)] bg-white text-foreground'
                  )}
                >
                  <span>{task.label}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )
            })}

            {staticLinks.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center justify-between rounded-[1.4rem] px-4 py-3 text-sm font-semibold transition',
                    isActive
                      ? 'bg-[#19294a] text-white'
                      : 'border border-[rgba(45,56,87,0.12)] bg-white text-foreground'
                  )}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )
            })}

            {secondaryTasks.length ? (
              <div className="rounded-[1.4rem] border border-[rgba(45,56,87,0.12)] bg-[rgba(25,41,74,0.03)] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Other available formats</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {secondaryTasks.map((task) => (
                    <Link
                      key={task.key}
                      href={task.route}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="rounded-full border border-[rgba(45,56,87,0.12)] bg-white px-3 py-1.5 text-xs font-semibold text-[#33415f]"
                    >
                      {task.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
