import { Compass, Search } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchSiteFeed } from "@/lib/site-connector";
import { buildPostUrl, getPostTaskKey } from "@/lib/task-data";
import { getMockPostsForTask } from "@/lib/mock-posts";
import { SITE_CONFIG } from "@/lib/site-config";
import { TaskPostCard } from "@/components/shared/task-post-card";

export const revalidate = 3;

const matchText = (value: string, query: string) => value.toLowerCase().includes(query);
const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ");

const compactText = (value: unknown) => {
  if (typeof value !== "string") return "";
  return stripHtml(value).replace(/\s+/g, " ").trim().toLowerCase();
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>;
}) {
  const resolved = (await searchParams) || {};
  const query = (resolved.q || "").trim();
  const normalized = query.toLowerCase();
  const category = (resolved.category || "").trim().toLowerCase();
  const task = (resolved.task || "").trim().toLowerCase();
  const useMaster = resolved.master !== "0";
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster
      ? { fresh: true, category: category || undefined, task: task || undefined }
      : undefined
  );
  const posts =
    feed?.posts?.length
      ? feed.posts
      : useMaster
        ? []
        : SITE_CONFIG.tasks.flatMap((task) => getMockPostsForTask(task.key));

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === "object" ? post.content : {};
    const typeText = compactText((content as any).type);
    if (typeText === "comment") return false;
    const description = compactText((content as any).description);
    const body = compactText((content as any).body);
    const excerpt = compactText((content as any).excerpt);
    const categoryText = compactText((content as any).category);
    const tags = Array.isArray(post.tags) ? post.tags.join(" ") : "";
    const tagsText = compactText(tags);
    const derivedCategory = categoryText || tagsText;
    if (category && !derivedCategory.includes(category)) return false;
    if (task && typeText && typeText !== task) return false;
    if (!normalized.length) return true;
    return (
      matchText(compactText(post.title || ""), normalized) ||
      matchText(compactText(post.summary || ""), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    );
  });

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24);

  return (
    <PageShell
      title="Search the Archive"
      description={
        query
          ? `Results for "${query}" across the publication and its supporting formats.`
          : "Browse essays, supporting resources, profiles, and related surfaces from one editorial search layer."
      }
      actions={
        <form action="/search" className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <input type="hidden" name="master" value="1" />
          {category ? <input type="hidden" name="category" value={category} /> : null}
          {task ? <input type="hidden" name="task" value={task} /> : null}
          <div className="relative w-full sm:w-[24rem]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              name="q"
              defaultValue={query}
              placeholder="Search essays, topics, tags, and related formats..."
              className="h-12 rounded-full border-white/14 bg-white/10 pl-10 text-white placeholder:text-slate-300"
            />
          </div>
          <Button type="submit" className="h-12 rounded-full bg-[#9ee1f3] text-[#111a2d] hover:bg-[#b1ebfa]">
            Search
          </Button>
        </form>
      }
    >
      <div className="grid gap-8">
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[1.8rem] border border-[rgba(45,56,87,0.12)] bg-white/70 p-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(25,41,74,0.06)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1f2c55]">
              <Compass className="h-3.5 w-3.5" />
              Discovery notes
            </div>
            <p className="mt-4 text-sm leading-8 text-muted-foreground">
              Search prioritizes the publication archive first, while still keeping every other supported route
              discoverable through the same logic and data.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Query", query || "Archive overview"],
              ["Matching results", String(results.length)],
              ["Search scope", useMaster ? "Master feed" : "Local feed"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[1.6rem] border border-[rgba(45,56,87,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(247,241,232,0.94))] p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">{label}</p>
                <p className="mt-3 text-xl font-semibold tracking-[-0.03em] text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {results.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((post) => {
              const task = getPostTaskKey(post);
              const href = task ? buildPostUrl(task, post.slug) : `/posts/${post.slug}`;
              return <TaskPostCard key={post.id} post={post} href={href} taskKey={task || undefined} />;
            })}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-[rgba(45,56,87,0.18)] bg-white/65 p-12 text-center text-muted-foreground">
            No matching posts yet.
          </div>
        )}
      </div>
    </PageShell>
  );
}
