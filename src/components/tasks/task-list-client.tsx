"use client";

import { useMemo } from "react";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { buildPostUrl } from "@/lib/task-data";
import { normalizeCategory, isValidCategory } from "@/lib/categories";
import type { TaskKey } from "@/lib/site-config";
import type { SitePost } from "@/lib/site-connector";
import { getLocalPostsForTask } from "@/lib/local-posts";

type Props = {
  task: TaskKey;
  initialPosts: SitePost[];
  category?: string;
};

export function TaskListClient({ task, initialPosts, category }: Props) {
  const localPosts = getLocalPostsForTask(task);

  const merged = useMemo(() => {
    const bySlug = new Set<string>();
    const combined: Array<SitePost & { localOnly?: boolean; task?: TaskKey }> = [];

    localPosts.forEach((post) => {
      if (post.slug) {
        bySlug.add(post.slug);
      }
      combined.push(post);
    });

    initialPosts.forEach((post) => {
      if (post.slug && bySlug.has(post.slug)) return;
      combined.push(post);
    });

    const normalizedCategory = category ? normalizeCategory(category) : "all";
    if (normalizedCategory === "all") {
      return combined.filter((post) => {
        const content = post.content && typeof post.content === "object" ? post.content : {};
        const value = typeof (content as any).category === "string" ? (content as any).category : "";
        return !value || isValidCategory(value);
      });
    }

    return combined.filter((post) => {
      const content = post.content && typeof post.content === "object" ? post.content : {};
      const value =
        typeof (content as any).category === "string"
          ? normalizeCategory((content as any).category)
          : "";
      return value === normalizedCategory;
    });
  }, [category, initialPosts, localPosts]);

  if (!merged.length) {
    return (
      <div className="rounded-[2rem] border border-dashed border-border bg-white/70 p-10 text-center text-muted-foreground">
        No posts yet for this section.
      </div>
    );
  }

  if (task === "article") {
    const lead = merged[0];
    const secondary = merged.slice(1, 3);
    const archive = merged.slice(3);
    const leadHref =
      lead && (lead as any).localOnly ? `/local/${task}/${lead.slug}` : lead ? buildPostUrl(task, lead.slug) : "";

    return (
      <div className="space-y-8">
        {lead ? (
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <TaskPostCard key={lead.id} post={lead} href={leadHref} taskKey={task} />
            <div className="grid gap-6">
              {secondary.map((post) => {
                const localOnly = (post as any).localOnly;
                const href = localOnly ? `/local/${task}/${post.slug}` : buildPostUrl(task, post.slug);
                return <TaskPostCard key={post.id} post={post} href={href} taskKey={task} compact />;
              })}
            </div>
          </div>
        ) : null}

        {archive.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {archive.map((post) => {
              const localOnly = (post as any).localOnly;
              const href = localOnly ? `/local/${task}/${post.slug}` : buildPostUrl(task, post.slug);
              return <TaskPostCard key={post.id} post={post} href={href} taskKey={task} compact />;
            })}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {merged.map((post) => {
        const localOnly = (post as any).localOnly;
        const href = localOnly
          ? `/local/${task}/${post.slug}`
          : buildPostUrl(task, post.slug);
        return <TaskPostCard key={post.id} post={post} href={href} taskKey={task} />;
      })}
    </div>
  );
}
