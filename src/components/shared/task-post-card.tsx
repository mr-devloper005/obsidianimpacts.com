import Link from 'next/link'
import { ArrowUpRight, ExternalLink, FileText, Mail, MapPin, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import type { SitePost } from '@/lib/site-connector'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import type { TaskKey } from '@/lib/site-config'
import { TASK_POST_CARD_OVERRIDE_ENABLED, TaskPostCardOverride } from '@/overrides/task-post-card'

type ListingContent = {
  location?: string
  category?: string
  description?: string
  email?: string
  image?: string
  images?: string[]
  logo?: string
}

const stripHtml = (value?: string | null) =>
  (value || '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<\/?[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const getExcerpt = (value?: string | null, maxLength = 150) => {
  const text = stripHtml(value)
  if (!text) return ''
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trimEnd()}...`
}

const getContent = (post: SitePost): ListingContent => {
  const content = post.content && typeof post.content === 'object' ? post.content : {}
  return content as ListingContent
}

const getImageUrl = (post: SitePost, content: ListingContent) => {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  if (mediaUrl) return mediaUrl

  if (typeof content.image === 'string' && content.image) return content.image
  if (Array.isArray(content.images)) {
    const first = content.images.find((value) => typeof value === 'string' && value)
    if (first) return first
  }
  if (typeof content.logo === 'string' && content.logo) return content.logo

  return '/placeholder.svg?height=640&width=960'
}

const formatDate = (value?: string) => {
  if (!value) return 'New'
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return 'New'
  return parsed.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function TaskPostCard({
  post,
  href,
  taskKey,
  compact,
}: {
  post: SitePost
  href: string
  taskKey?: TaskKey
  compact?: boolean
}) {
  if (TASK_POST_CARD_OVERRIDE_ENABLED) {
    return <TaskPostCardOverride post={post} href={href} taskKey={taskKey} compact={compact} />
  }

  const content = getContent(post)
  const image = getImageUrl(post, content)
  const variant = taskKey || 'article'
  const rawCategory = content.category || post.tags?.[0] || 'Post'
  const normalizedCategory = normalizeCategory(rawCategory)
  const category = CATEGORY_OPTIONS.find((item) => item.slug === normalizedCategory)?.name || rawCategory
  const excerpt = getExcerpt(content.description || post.summary, compact ? 110 : variant === 'article' ? 180 : 140)

  if (variant === 'article') {
    return (
      <Link href={href} className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-[rgba(45,56,87,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(247,241,232,0.96))] shadow-[0_24px_70px_rgba(47,35,26,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_85px_rgba(47,35,26,0.11)]">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#e6ddd2]">
          <ContentImage
            src={image}
            alt={`${post.title} article image`}
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1200px) 46vw, 390px"
            quality={76}
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
            intrinsicWidth={960}
            intrinsicHeight={720}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,18,0.02)_0%,rgba(7,10,18,0.12)_42%,rgba(7,10,18,0.58)_100%)]" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/18 bg-[#0f1730]/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9ee1f3] backdrop-blur">
              <Tag className="h-3.5 w-3.5" />
              {category}
            </span>
            <span className="rounded-full bg-white/88 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#111a2d]">
              {formatDate(post.publishedAt)}
            </span>
          </div>
        </div>
        <div className={compact ? 'flex flex-1 flex-col p-5' : 'flex flex-1 flex-col p-6'}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#51617c]">Feature story</p>
          <h3 className="mt-3 line-clamp-3 text-[1.45rem] font-semibold leading-snug tracking-[-0.04em] text-[#1f273a]">
            {post.title}
          </h3>
          <p className="mt-4 text-sm leading-8 text-[#5c6574]">
            {excerpt || 'Explore the latest entry from the editorial archive.'}
          </p>
          <div className="mt-auto flex items-center justify-between gap-4 pt-6">
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#697488]">
              {content.location ? (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {content.location}
                </span>
              ) : null}
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#1f2c55] transition group-hover:text-[#314675]">
              Read story
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'sbm' || variant === 'social') {
    return (
      <Link href={href} className="group flex h-full gap-4 rounded-[1.8rem] border border-[rgba(45,56,87,0.12)] bg-[rgba(255,255,255,0.84)] p-5 shadow-[0_18px_44px_rgba(47,35,26,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(47,35,26,0.09)]">
        <div className="mt-1 rounded-full bg-[rgba(25,41,74,0.07)] p-2.5 text-[#1f2c55] transition group-hover:bg-[rgba(25,41,74,0.12)]">
          <ExternalLink className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(25,41,74,0.08)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1f2c55]">
              <Tag className="h-3.5 w-3.5" />
              {category}
            </span>
            {content.location ? (
              <span className="inline-flex items-center gap-1 text-xs text-[#697488]">
                <MapPin className="h-3.5 w-3.5" />
                {content.location}
              </span>
            ) : null}
          </div>
          <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug text-[#1f273a]">{post.title}</h3>
          <p className="mt-2 text-sm leading-7 text-[#5c6574]">{excerpt || 'Open this saved resource.'}</p>
          {content.email ? (
            <div className="mt-3 inline-flex items-center gap-1 text-xs text-[#697488]">
              <Mail className="h-3.5 w-3.5" />
              {content.email}
            </div>
          ) : null}
        </div>
      </Link>
    )
  }

  return (
    <Link href={href} className="group flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-[rgba(45,56,87,0.12)] bg-white/90 shadow-[0_20px_56px_rgba(47,35,26,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(47,35,26,0.09)]">
      <div className={`relative ${variant === 'image' ? 'aspect-[4/5]' : variant === 'pdf' ? 'aspect-[4/5]' : 'aspect-[4/3]'} overflow-hidden bg-[#ece4d9]`}>
        <ContentImage
          src={image}
          alt={`${post.title} ${variant} image`}
          fill
          sizes="(max-width: 640px) 88vw, (max-width: 1200px) 40vw, 320px"
          quality={75}
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
          intrinsicWidth={960}
          intrinsicHeight={720}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,18,0.04)_0%,rgba(7,10,18,0.32)_100%)]" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-[#10192e]/78 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9ee1f3]">
          <Tag className="h-3.5 w-3.5" />
          {category}
        </span>
        {variant === 'pdf' ? (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/88 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#111a2d]">
            <FileText className="h-3.5 w-3.5" />
            PDF
          </span>
        ) : null}
      </div>
      <div className={compact ? 'flex flex-1 flex-col p-4' : 'flex flex-1 flex-col p-5'}>
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-[#1f273a]">{post.title}</h3>
        <p className="mt-3 text-sm leading-7 text-[#5c6574]">{excerpt || 'Open this supporting format.'}</p>
        <div className="mt-auto pt-4 text-xs text-[#697488]">
          {content.location ? (
            <div className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {content.location}
            </div>
          ) : null}
          {content.email ? (
            <div className="mt-2 inline-flex items-center gap-1">
              <Mail className="h-3.5 w-3.5" />
              {content.email}
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  )
}
