import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Compass, FileText, LayoutGrid, MoveRight, Search, Sparkles } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchTaskPosts } from '@/lib/task-data'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import type { SitePost } from '@/lib/site-connector'
import { HOME_PAGE_OVERRIDE_ENABLED, HomePageOverride } from '@/overrides/home-page'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/',
    title: siteContent.home.metadata.title,
    description: siteContent.home.metadata.description,
    openGraphTitle: siteContent.home.metadata.openGraphTitle,
    openGraphDescription: siteContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...siteContent.home.metadata.keywords],
  })
}

type EnabledTask = (typeof SITE_CONFIG.tasks)[number]
type TaskFeedItem = { task: EnabledTask; posts: SitePost[] }

const taskIcons: Partial<Record<TaskKey, any>> = {
  article: FileText,
  listing: LayoutGrid,
  classified: LayoutGrid,
  image: Compass,
  profile: Sparkles,
  sbm: Search,
  pdf: FileText,
}

function getTaskHref(task: TaskKey, slug: string) {
  const route = SITE_CONFIG.tasks.find((item) => item.key === task)?.route || `/${task}`
  return `${route}/${slug}`
}

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage = typeof post?.content === 'object' && post?.content && Array.isArray((post.content as any).images)
    ? (post.content as any).images.find((url: unknown) => typeof url === 'string' && url)
    : null
  const logo = typeof post?.content === 'object' && post?.content && typeof (post.content as any).logo === 'string'
    ? (post.content as any).logo
    : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

function formatDate(value?: string) {
  if (!value) return 'Fresh from the desk'
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return 'Fresh from the desk'
  return parsed.toLocaleDateString('en-IN', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function EditorialHome({
  primaryTask,
  articlePosts,
  backgroundTasks,
  backgroundFeed,
}: {
  primaryTask?: EnabledTask
  articlePosts: SitePost[]
  backgroundTasks: EnabledTask[]
  backgroundFeed: TaskFeedItem[]
}) {
  const lead = articlePosts[0]
  const sideStories = articlePosts.slice(1, 5)
  const dispatches = articlePosts.slice(1, 7)

  return (
    <main className="pb-6">
      <section className="border-b border-[rgba(45,56,87,0.12)] bg-[linear-gradient(180deg,rgba(14,18,34,0.98)_0%,rgba(25,31,53,0.98)_72%,rgba(33,41,69,0.96)_100%)] text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-300">
              <span className="rounded-full border border-white/12 bg-white/6 px-3 py-1">Current issue</span>
              <span>{siteContent.navbar.tagline}</span>
            </div>
            <Link href="/search" className="inline-flex items-center gap-2 text-sm text-slate-200 transition hover:text-white">
              Search archive
              <Search className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-8 py-8 lg:grid-cols-[0.7fr_1.3fr_0.7fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8ed6f0]">{siteContent.hero.badge}</p>
              <h1 className="mt-5 max-w-md text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl">
                Essays, dispatches, and deeply readable stories.
              </h1>
              <p className="mt-5 max-w-sm text-sm leading-8 text-slate-300">{SITE_CONFIG.description}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={primaryTask?.route || '/articles'} className="inline-flex items-center gap-2 rounded-full bg-[#9ee1f3] px-5 py-3 text-sm font-semibold text-[#111a2d] transition hover:bg-[#b1ebfa]">
                  {siteContent.hero.primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href={siteContent.hero.secondaryCta.href} className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  {siteContent.hero.secondaryCta.label}
                </Link>
              </div>
              <div className="mt-8 grid gap-3">
                {siteContent.home.sidePoints.slice(0, 3).map((point) => (
                  <div key={point} className="rounded-[1.6rem] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-slate-200">
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <div>
              {lead ? (
                <Link href={getTaskHref('article', lead.slug)} className="group block overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/6 shadow-[0_35px_90px_rgba(0,0,0,0.28)] backdrop-blur">
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <ContentImage src={getPostImage(lead)} alt={lead.title} fill className="object-cover transition duration-700 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,20,0.08)_0%,rgba(6,10,20,0.18)_32%,rgba(6,10,20,0.78)_100%)]" />
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-[#10192e]/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9ee1f3] backdrop-blur">
                        <Sparkles className="h-3.5 w-3.5" />
                        Lead story
                      </div>
                      <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.05em] text-white sm:text-4xl">
                        {lead.title}
                      </h2>
                      <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-200">
                        {lead.summary || 'A cover-story style entry point into the publication, with more room for narrative setup and visual tone.'}
                      </p>
                      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-slate-300">
                        <span>{formatDate(lead.publishedAt)}</span>
                        <span className="h-1 w-1 rounded-full bg-slate-400" />
                        <span>{siteContent.hero.focusLabel}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="obsidian-dark-panel rounded-[2.4rem] p-8 text-white">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-300">Lead story</p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">The article archive will surface here as soon as new pieces are published.</h2>
                </div>
              )}
            </div>

            <aside className="rounded-[2rem] border border-white/10 bg-white/6 p-5 backdrop-blur">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">From the desk</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Inside this issue</h2>
                </div>
                <Link href="/articles" className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9ee1f3] hover:text-white">
                  Archive
                </Link>
              </div>
              <div className="mt-5 space-y-5">
                {sideStories.map((post, index) => (
                  <Link key={post.id} href={getTaskHref('article', post.slug)} className="block border-b border-white/10 pb-5 last:border-b-0 last:pb-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Dispatch {index + 1}</p>
                    <h3 className="mt-2 text-lg font-semibold leading-snug text-white">{post.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      {post.summary || 'A supporting dispatch from the latest editorial run.'}
                    </p>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="obsidian-panel rounded-[2rem] p-7">
            <p className="editorial-label">{siteContent.home.introBadge}</p>
            <h2 className="obsidian-rule mt-5 text-3xl font-semibold tracking-[-0.04em] text-foreground">
              {siteContent.home.introTitle}
            </h2>
            {siteContent.home.introParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="mt-4 text-sm leading-8 text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ['Primary lane', primaryTask?.label || 'Articles'],
              ['Stories on page', `${articlePosts.length || 0}`],
              ['Other active formats', `${backgroundTasks.length}`],
            ].map(([label, value]) => (
              <div key={label} className="obsidian-panel rounded-[1.8rem] p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">{label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground">{value}</p>
              </div>
            ))}
            <div className="obsidian-panel rounded-[1.8rem] p-6 sm:col-span-3">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">{siteContent.hero.featureCardBadge}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-foreground">{siteContent.hero.featureCardTitle}</h3>
                </div>
                <Link href="/articles" className="inline-flex items-center gap-2 rounded-full border border-[rgba(45,56,87,0.12)] px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-[rgba(32,45,76,0.05)]">
                  Browse archive
                  <MoveRight className="h-4 w-4" />
                </Link>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-muted-foreground">
                {siteContent.hero.featureCardDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 border-b border-[rgba(45,56,87,0.12)] pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Latest dispatches</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Fresh pieces from the journal archive.</h2>
          </div>
          <Link href="/articles" className="text-sm font-semibold text-foreground transition hover:text-primary">
            View all articles
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {dispatches.map((post) => (
            <TaskPostCard key={post.id} post={post} href={getTaskHref('article', post.slug)} taskKey="article" />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-[2rem] border border-[rgba(45,56,87,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(247,241,232,0.92))] p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Other formats</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground">Everything else stays available, just quieter.</h2>
            <p className="mt-4 text-sm leading-8 text-muted-foreground">
              Listings, images, saved references, documents, and profile pages still work with the same routes and logic. They are simply moved into lower-emphasis discovery surfaces so the site no longer feels like a generic mixed-format feed.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {backgroundTasks.map((task) => {
              const preview = backgroundFeed.find((item) => item.task.key === task.key)?.posts[0]
              const Icon = taskIcons[task.key] || LayoutGrid

              return (
                <Link key={task.key} href={task.route} className="group rounded-[1.8rem] border border-[rgba(45,56,87,0.12)] bg-white/80 p-5 shadow-[0_24px_70px_rgba(47,35,26,0.05)] transition hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(47,35,26,0.08)]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(32,45,76,0.05)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1f2c55]">
                      <Icon className="h-3.5 w-3.5" />
                      {task.label}
                    </div>
                    <MoveRight className="h-4 w-4 text-muted-foreground transition group-hover:text-foreground" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-foreground">{preview?.title || task.description}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {preview?.summary || `Open ${task.label.toLowerCase()} through a quieter access path without changing the underlying route or behavior.`}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

export default async function HomePage() {
  if (HOME_PAGE_OVERRIDE_ENABLED) {
    return <HomePageOverride />
  }

  const allEnabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const { recipe } = getFactoryState()
  const emphasisKeys = recipe.enabledTasks.length ? recipe.enabledTasks : [recipe.primaryTask]
  const emphasizedTasks = allEnabledTasks.filter((task) => emphasisKeys.includes(task.key as any))
  const backgroundTasks = allEnabledTasks.filter((task) => !emphasisKeys.includes(task.key as any))

  const taskFeed: TaskFeedItem[] = await Promise.all(
    allEnabledTasks.map(async (task) => ({
      task,
      posts: await fetchTaskPosts(task.key, task.key === 'article' ? 8 : 3, { allowMockFallback: false, fresh: true }),
    }))
  )

  const articlePosts = taskFeed.find(({ task }) => task.key === 'article')?.posts || []
  const primaryTask = emphasizedTasks.find((task) => task.key === recipe.primaryTask) || emphasizedTasks[0] || allEnabledTasks[0]

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />
      <EditorialHome
        primaryTask={primaryTask}
        articlePosts={articlePosts}
        backgroundTasks={backgroundTasks}
        backgroundFeed={taskFeed.filter(({ task }) => backgroundTasks.some((item) => item.key === task.key))}
      />
      <Footer />
    </div>
  )
}
