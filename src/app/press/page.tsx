'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Download, Newspaper } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { mockPressAssets, mockPressCoverage } from '@/data/mock-data'

export default function PressPage() {
  const { toast } = useToast()
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null)
  const activeAsset = mockPressAssets.find((asset) => asset.id === activeAssetId)

  return (
    <PageShell
      title="Press"
      description="Press-ready assets, coverage references, and brand materials presented in the same editorial tone as the site."
      actions={
        <Button className="rounded-full bg-[#9ee1f3] text-[#111a2d] hover:bg-[#b1ebfa]">
          Download media kit
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-[rgba(45,56,87,0.12)] bg-white/72 p-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(25,41,74,0.06)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1f2c55]">
            <Download className="h-3.5 w-3.5" />
            Press assets
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-foreground">Media files prepared for editors, writers, and coverage teams.</h2>
          <div className="mt-5 grid gap-3">
            {mockPressAssets.map((asset) => (
              <div key={asset.id} className="rounded-[1.4rem] border border-[rgba(45,56,87,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(247,241,232,0.94))] px-4 py-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{asset.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{asset.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-[rgba(25,41,74,0.06)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1f2c55]">
                      {asset.fileType}
                    </div>
                    <Button size="sm" variant="outline" className="rounded-full" onClick={() => setActiveAssetId(asset.id)}>
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-full bg-[#19294a] text-white hover:bg-[#24375f]"
                      onClick={() =>
                        toast({
                          title: 'Download started',
                          description: `${asset.title} is downloading.`,
                        })
                      }
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[2rem] border border-[rgba(45,56,87,0.12)] bg-[#19294a] p-6 text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9ee1f3]">
              <Newspaper className="h-3.5 w-3.5" />
              Coverage
            </div>
            <h3 className="mt-4 text-2xl font-semibold">Recent mentions and publication references.</h3>
            <p className="mt-3 text-sm leading-8 text-slate-300">
              A lighter, cleaner overview of media coverage that aligns with the rest of the journal-like experience.
            </p>
          </div>

          {mockPressCoverage.map((item) => (
            <div key={item.id} className="rounded-[1.7rem] border border-[rgba(45,56,87,0.12)] bg-white/78 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">{item.outlet}</p>
              <p className="mt-3 text-base font-semibold text-foreground">{item.headline}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.date}</p>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={Boolean(activeAsset)} onOpenChange={() => setActiveAssetId(null)}>
        <DialogContent className="max-w-3xl rounded-[2rem] border-[rgba(45,56,87,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(247,241,232,0.98))]">
          <DialogHeader>
            <DialogTitle>{activeAsset?.title}</DialogTitle>
          </DialogHeader>
          {activeAsset?.previewUrl && (
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.4rem] border border-[rgba(45,56,87,0.12)] bg-muted">
              <Image src={activeAsset.previewUrl} alt={activeAsset.title} fill className="object-cover" />
            </div>
          )}
          <p className="text-sm leading-7 text-muted-foreground">{activeAsset?.description}</p>
          <DialogFooter>
            <Button variant="outline" className="rounded-full" onClick={() => setActiveAssetId(null)}>
              Close
            </Button>
            <Button
              className="rounded-full bg-[#19294a] text-white hover:bg-[#24375f]"
              onClick={() =>
                toast({
                  title: 'Download started',
                  description: `${activeAsset?.title} is downloading.`,
                })
              }
            >
              Download {activeAsset?.fileType}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  )
}
