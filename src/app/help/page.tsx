import Link from 'next/link'
import { BookOpen, Compass, LifeBuoy, Search } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { mockFaqs } from '@/data/mock-data'

const topics = [
  {
    icon: BookOpen,
    title: 'Publishing basics',
    description: 'Understand how article-first publishing works, what appears where, and how the archive is organized.',
  },
  {
    icon: Search,
    title: 'Search and discovery',
    description: 'Learn how filters, archive search, and supporting routes help readers move through the site.',
  },
  {
    icon: LifeBuoy,
    title: 'Support requests',
    description: 'Get routed to the right lane for editorial help, account support, or publication questions.',
  },
]

export default function HelpPage() {
  return (
    <PageShell
      title="Help Center"
      description="Guides, answers, and support pathways designed for the publication experience."
      actions={
        <Button asChild className="rounded-full bg-[#9ee1f3] text-[#111a2d] hover:bg-[#b1ebfa]">
          <Link href="/contact">Contact support</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="grid gap-4 md:grid-cols-3">
            {topics.map((topic) => (
              <div key={topic.title} className="rounded-[1.8rem] border border-[rgba(45,56,87,0.12)] bg-white/72 p-5">
                <topic.icon className="h-5 w-5 text-[#1f2c55]" />
                <h2 className="mt-4 text-lg font-semibold text-foreground">{topic.title}</h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{topic.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[2rem] border border-[rgba(45,56,87,0.12)] bg-[#19294a] p-6 text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9ee1f3]">
              <Compass className="h-3.5 w-3.5" />
              Quick guidance
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">Need the fastest route?</h3>
            <p className="mt-3 max-w-2xl text-sm leading-8 text-slate-300">
              Search if you are trying to find an existing piece, contact support if you need account help, and use the archive if you want to browse by latest publication flow.
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[rgba(45,56,87,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(247,241,232,0.95))] p-6">
          <h3 className="text-xl font-semibold text-foreground">Frequently asked questions</h3>
          <Accordion type="single" collapsible className="mt-4">
            {mockFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-b border-[rgba(45,56,87,0.12)]">
                <AccordionTrigger className="text-left text-foreground hover:no-underline">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-sm leading-7 text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </PageShell>
  )
}
