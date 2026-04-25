'use client'

import type { ReactNode } from 'react'
import { Compass } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main>
        <section className="border-b border-[rgba(45,56,87,0.12)] bg-[linear-gradient(180deg,rgba(18,25,44,0.98)_0%,rgba(29,38,66,0.97)_74%,rgba(248,242,232,0.98)_74.2%,rgba(248,242,232,0.98)_100%)]">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9ee1f3] backdrop-blur">
                  <Compass className="h-3.5 w-3.5" />
                  Editorial surface
                </div>
                <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                  {title}
                </h1>
                {description && (
                  <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-200">{description}</p>
                )}
              </div>
              {actions && <div className="flex flex-wrap gap-3 [&_.button]:rounded-full">{actions}</div>}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
          <div className="rounded-[2.2rem] border border-[rgba(45,56,87,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(247,241,232,0.96))] p-6 shadow-[0_24px_80px_rgba(47,35,26,0.08)] sm:p-8 lg:p-10">
            {children}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
