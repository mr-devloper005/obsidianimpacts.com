import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Independent journal of essays and signals',
  },
  footer: {
    tagline: 'Long-form reading with quieter supporting formats',
  },
  hero: {
    badge: 'Issue-driven editorial design',
    title: ['Read essays, dispatches, and careful analysis in a calmer, premium publication shell.'],
    description:
      'A reading-first editorial site built around immersive article discovery, stronger narrative hierarchy, and supporting formats that stay out of the way.',
    primaryCta: {
      label: 'Open the journal',
      href: '/articles',
    },
    secondaryCta: {
      label: 'Search the archive',
      href: '/search',
    },
    searchPlaceholder: 'Search essays, field notes, interviews, and reported analysis',
    focusLabel: 'Editorial focus',
    featureCardBadge: 'cover story',
    featureCardTitle: 'The homepage behaves like a journal front page instead of a generic content feed.',
    featureCardDescription:
      'Lead stories, editorial notes, and restrained supporting links keep article discovery prominent without removing any platform capabilities.',
  },
  home: {
    metadata: {
      title: 'Essays, dispatches, and deeply readable stories',
      description:
        'Obsidian Impacts is a publication-style platform for essays, analysis, and reported perspectives, with supporting formats kept accessible but visually quieter.',
      openGraphTitle: 'Essays, dispatches, and deeply readable stories',
      openGraphDescription:
        'Browse a sharper article-first editorial experience with premium reading surfaces, issue-style layout, and calmer secondary navigation.',
      keywords: ['editorial journal', 'article publication', 'long-form essays', 'analysis archive'],
    },
    introBadge: 'Editorial approach',
    introTitle: 'Built to feel like a distinct publication, not a repainted multipurpose template.',
    introParagraphs: [
      'The site now leads with cover stories, archive depth, and reading comfort instead of treating every content type as equally loud.',
      'Articles are the public front door, while images, references, documents, and other task formats stay available through quieter pathways and direct URLs.',
      'The result is a sharper editorial product with better pacing, clearer hierarchy, and less clone-like carryover from the shared base.',
    ],
    sideBadge: 'In this edition',
    sidePoints: [
      'Article-first navigation and homepage emphasis.',
      'Magazine-like composition with stronger cover-story framing.',
      'Supporting task formats remain functional without crowding the main editorial lane.',
      'Lighter motion and paper-like surfaces for premium reading comfort.',
    ],
    primaryLink: {
      label: 'Browse latest essays',
      href: '/articles',
    },
    secondaryLink: {
      label: 'Search the archive',
      href: '/search',
    },
  },
  cta: {
    badge: 'Start reading',
    title: 'Step into the latest issue, then keep exploring the wider platform on your terms.',
    description:
      'The public experience now centers essays and analysis, while every other task route remains available through search, related links, quieter footer navigation, and direct access.',
    primaryCta: {
      label: 'Read the archive',
      href: '/articles',
    },
    secondaryCta: {
      label: 'Search the site',
      href: '/search',
    },
  },
  taskSectionHeading: 'Recent {label}',
  taskSectionDescriptionSuffix: 'Freshly published pieces and related surfaces in this format.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Essays, dispatches, and long-form stories',
    description: 'Read thoughtful articles, reported pieces, essays, and analysis in a more premium editorial archive.',
  },
  listing: {
    title: 'Supporting listings and referenced pages',
    description: 'Explore directory-style posts and structured references that support the site’s broader editorial ecosystem.',
  },
  classified: {
    title: 'Short-form notices and fast-moving posts',
    description: 'Browse time-sensitive posts, notices, and quick updates in a lighter-scanning board format.',
  },
  image: {
    title: 'Visual stories and image-led posts',
    description: 'Open visual posts, galleries, and image-led surfaces that sit beside the editorial archive.',
  },
  profile: {
    title: 'Profiles and public identities',
    description: 'Discover public profiles, creators, brands, and identity-led pages connected to the publication.',
  },
  sbm: {
    title: 'Curated links and saved references',
    description: 'Browse bookmarked resources, useful links, and curated references arranged for quieter discovery.',
  },
  pdf: {
    title: 'Documents and downloadable resources',
    description: 'Open reports, documents, and downloadable materials that complement the site’s publishing surfaces.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Structured pages that support the wider publication',
    paragraphs: [
      'Listings remain available for discovery, but they are intentionally presented as supporting material rather than the main public identity of the site.',
      'Use this section to open referenced businesses, services, and structured pages that connect back to articles, profiles, and resource content.',
      'The visual treatment is more utility-driven here so it does not borrow the same pacing or hierarchy as the editorial archive.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Search the site', href: '/search' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  article: {
    title: 'The journal archive for essays, analysis, and narrative reporting',
    paragraphs: [
      'This archive is designed for slower reading, stronger typography, and more deliberate editorial pacing across essays, explainers, and reported stories.',
      'Instead of flattening every post into one feed, the archive gives lead pieces more presence, groups supporting coverage with restraint, and keeps the reading path clear.',
      'Supporting formats still connect into the experience, but the archive stays unmistakably article-first from the moment a visitor lands here.',
    ],
    links: [
      { label: 'Search the archive', href: '/search' },
    ],
  },
  classified: {
    title: 'Short notices, quick posts, and compact signals',
    paragraphs: [
      'This section handles fast-moving posts in a tighter, more board-like structure that contrasts with the slower editorial archive.',
      'It remains fully functional and URL-accessible, but it is intentionally quieter in the main product hierarchy.',
      'Browse here when you need immediacy, then return to the journal for longer reading and fuller context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Open listings', href: '/listings' },
      { label: 'Search the site', href: '/search' },
    ],
  },
  image: {
    title: 'Visual posts that complement the reading experience',
    paragraphs: [
      'Images and gallery-led posts stay accessible as supporting visual surfaces tied to stories, profiles, and broader site exploration.',
      'The layout gives imagery more space without turning the whole product into a gallery-first experience.',
      'Use this area to browse visual context, then step back into related essays or supporting pages when you want deeper reading.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Search the archive', href: '/search' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  profile: {
    title: 'Identity pages for people, brands, and contributors',
    paragraphs: [
      'Profiles act as quieter trust surfaces behind the publication, giving readers context about people, organizations, and public-facing contributors.',
      'They remain part of the system without overtaking the article-first public presentation.',
      'Browse profiles to understand authorship, identity, and related publishing context across the site.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Browse images', href: '/images' },
      { label: 'Search the site', href: '/search' },
    ],
  },
  sbm: {
    title: 'Curated links, source trails, and saved references',
    paragraphs: [
      'Bookmarks and saved references are arranged like a quieter research shelf rather than a loud primary feed.',
      'This keeps curation available for readers who want to dig deeper while preserving the site’s editorial identity up front.',
      'Use it as a supporting layer for source material, reading trails, and collected references.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Open documents', href: '/pdf' },
      { label: 'Search the site', href: '/search' },
    ],
  },
  pdf: {
    title: 'Documents, reports, and downloadable context',
    paragraphs: [
      'Documents stay available as a supporting knowledge layer for readers who need more depth, proof points, or downloadable material.',
      'The interface here is calmer and more archival so it feels separate from the article stream without disconnecting from it.',
      'Open this section when you want reports, guides, or document-style resources tied to the wider site.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Browse references', href: '/sbm' },
      { label: 'Search the site', href: '/search' },
    ],
  },
  social: {
    title: 'Short updates and lightweight activity signals',
    paragraphs: [
      'Short-form updates remain in the system as lightweight activity rather than a dominant front-page experience.',
      'They can still support stories, references, and discovery when readers arrive through direct links or search.',
      'Use them as quick context points beside the deeper archive.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Search the site', href: '/search' },
      { label: 'Open references', href: '/sbm' },
    ],
  },
  comment: {
    title: 'Comments and responses beneath the journalism',
    paragraphs: [
      'Comments stay close to the articles they belong to so discussion feels contextual instead of detached.',
      'This helps preserve the reading experience while still allowing response and conversation within the same system.',
      'Use comments as an extension of the article, not as a separate primary content lane.',
    ],
    links: [
      { label: 'Explore articles', href: '/articles' },
      { label: 'Search the archive', href: '/search' },
      { label: 'Browse profiles', href: '/profile' },
    ],
  },
  org: {
    title: 'Organizations and structured entity pages',
    paragraphs: [
      'Organization pages remain available as structured support surfaces for teams, brands, and communities connected to the publication.',
      'They are visually quieter than the article archive so the overall site still feels like a distinct journal product.',
      'Open this section for entity context, then continue into related stories or references as needed.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'View listings', href: '/listings' },
      { label: 'Search the site', href: '/search' },
    ],
  },
}
