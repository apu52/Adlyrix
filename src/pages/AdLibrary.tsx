import { useState } from "react";
import { Eye, Facebook, FileImage, Globe, Instagram, Link as LinkIcon, MessageCircle, Share2, Sparkles, X, ZoomIn, ZoomOut } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { demoLibraryCreatives } from "@/lib/demoCreativeLibrary";

type PlatformId = "instagram" | "facebook" | "whatsapp" | "website";
type CreativeItem = { id: string; sessionId: string; platformId: PlatformId; title: string; type: string; caption: string; version: number; createdAtLabel: string; imageUrl: string; };

const platformMeta: Record<PlatformId, { label: string; icon: typeof Instagram; format: string; ratio: string; shareUrl: (url: string, text: string) => string; }> = {
  instagram: { label: "Instagram", icon: Instagram, format: "1080 x 1080", ratio: "1:1", shareUrl: () => "https://www.instagram.com/" },
  facebook: { label: "Facebook", icon: Facebook, format: "1200 x 628", ratio: "1.91:1", shareUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  whatsapp: { label: "WhatsApp", icon: MessageCircle, format: "1080 x 1920", ratio: "9:16", shareUrl: (url, text) => `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}` },
  website: { label: "Website", icon: Globe, format: "1200 x 628", ratio: "1.91:1", shareUrl: (url) => url },
};

const platformAspectRatio: Record<PlatformId, string> = {
  instagram: "1 / 1",
  facebook: "1.91 / 1",
  whatsapp: "9 / 16",
  website: "1.91 / 1",
};

const AdLibrary = () => {
  const [shareCreative, setShareCreative] = useState<CreativeItem | null>(null);
  const [previewCreative, setPreviewCreative] = useState<CreativeItem | null>(null);
  const [previewZoom, setPreviewZoom] = useState(1);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="rounded-[2rem] border border-[#31405b] bg-[linear-gradient(135deg,#101826_0%,#121a2a_50%,#17132a_100%)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                <Sparkles size={22} />
              </div>
              <div>
                <h1 className="text-3xl font-semibold text-foreground">Ad Library</h1>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                  A dedicated page for stored image ads only. Browse creatives, preview them, share them, and download them from one clean gallery view.
                </p>
              </div>
            </div>
            <Link to="/create-ad" className="inline-flex items-center justify-center rounded-2xl border border-[#3a4a68] bg-[#1b2434] px-5 py-3 text-sm text-foreground transition-all hover:bg-[#243149]">
              Create New Ad
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#31405b] bg-[linear-gradient(180deg,#141a27_0%,#101621_100%)] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-[#2d3950] bg-[#1a2231] px-3 py-2">
            <FileImage size={14} className="text-primary" />
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Saved Ads Gallery</p>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            {demoLibraryCreatives.map((creative) => (
              <div key={creative.id} className="overflow-hidden rounded-[1.5rem] border border-[#33415a] bg-[#1a2231] transition-all hover:border-[#4a5f80] hover:shadow-[0_18px_45px_rgba(0,0,0,0.24)]">
                <button type="button" onClick={() => { setPreviewCreative(creative); setPreviewZoom(1); }} className="block w-full text-left">
                  <div className="p-4">
                    <div style={{ aspectRatio: platformAspectRatio[creative.platformId] }} className="overflow-hidden rounded-[1.1rem] border border-[#3a4a68] bg-[#101620]">
                      <img src={creative.imageUrl} alt={creative.title} className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]" />
                    </div>
                  </div>
                </button>

                <div className="border-t border-[#2f3b52] px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-300">
                      {platformMeta[creative.platformId].label}
                    </span>
                    <span className="text-[11px] text-muted-foreground">{creative.createdAtLabel}</span>
                  </div>
                  <p className="mt-3 text-xl font-semibold text-foreground">{creative.title}</p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{creative.caption}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button type="button" onClick={() => { setPreviewCreative(creative); setPreviewZoom(1); }} className="rounded-xl border border-[#3a4a68] bg-[#1b2434] px-3 py-2 text-xs text-muted-foreground transition-all hover:bg-[#253149] hover:text-foreground">
                      <Eye size={12} className="mr-1 inline-flex" />
                      Preview
                    </button>
                    <button type="button" onClick={() => setShareCreative(creative)} className="rounded-xl border border-[#3a4a68] bg-[#1b2434] px-3 py-2 text-xs text-muted-foreground transition-all hover:bg-[#253149] hover:text-foreground">
                      <Share2 size={12} className="mr-1 inline-flex" />
                      Share
                    </button>
                    <a href={creative.imageUrl} download={`${creative.title}.jpg`} className="rounded-xl border border-[#3a4a68] bg-[#1b2434] px-3 py-2 text-xs text-muted-foreground transition-all hover:bg-[#253149] hover:text-foreground">
                      <FileImage size={12} className="mr-1 inline-flex" />
                      Download
                    </a>
                  </div>
                  <div className="mt-4 flex items-center justify-between rounded-[1rem] border border-[#33415a] bg-[#141b28] px-3 py-3 text-[11px] uppercase tracking-[0.16em] text-slate-300">
                    <span>{creative.type}</span>
                    <span>{platformMeta[creative.platformId].format}</span>
                    <span>{platformMeta[creative.platformId].ratio}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {shareCreative && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-xl rounded-[1.75rem] border border-[#33415a] bg-[#151b24] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-foreground">Share Creative</h3>
                <p className="mt-1 text-sm text-muted-foreground">Choose a platform or copy the direct image link.</p>
              </div>
              <button type="button" onClick={() => setShareCreative(null)} className="rounded-xl border border-[#3a4a68] bg-[#1b2434] p-2 text-muted-foreground hover:bg-[#253149]">
                <X size={16} />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {(Object.keys(platformMeta) as PlatformId[]).map((platformId) => {
                const platform = platformMeta[platformId];
                const Icon = platform.icon;
                const text = `${shareCreative.title} - ${shareCreative.caption}`;
                const generatedShareUrl = platform.shareUrl(shareCreative.imageUrl, text);

                return (
                  <button key={platformId} type="button" onClick={() => window.open(generatedShareUrl, "_blank", "width=900,height=700")} className="rounded-2xl border border-[#33415a] bg-[#1a2231] px-4 py-4 text-left transition-all hover:border-[#4a5f80] hover:bg-[#202a3d]">
                    <div className="mb-2 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                        <Icon size={18} />
                      </div>
                      <span className="text-sm font-semibold text-foreground">{platform.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Open sharing popup for {platform.label}</p>
                  </button>
                );
              })}
            </div>
            <div className="mt-5 rounded-2xl border border-[#33415a] bg-[#1a2231] p-4">
              <div className="mb-3 flex items-center gap-2">
                <LinkIcon size={14} className="text-primary" />
                <p className="text-sm font-semibold text-foreground">Direct Image Link</p>
              </div>
              <input value={shareCreative.imageUrl} readOnly className="w-full rounded-xl border border-[#3a4a68] bg-[#101620] px-4 py-3 text-sm text-foreground outline-none" />
            </div>
          </div>
        </div>
      )}

      {previewCreative && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <div className="w-full max-w-6xl rounded-[1.75rem] border border-[#33415a] bg-[#151b24] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-foreground">{previewCreative.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{platformMeta[previewCreative.platformId].label} preview</p>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setPreviewZoom((current) => Math.max(0.8, current - 0.1))} className="rounded-xl border border-[#3a4a68] bg-[#1b2434] p-2 text-muted-foreground hover:bg-[#253149]">
                  <ZoomOut size={16} />
                </button>
                <button type="button" onClick={() => setPreviewZoom((current) => Math.min(2, current + 0.1))} className="rounded-xl border border-[#3a4a68] bg-[#1b2434] p-2 text-muted-foreground hover:bg-[#253149]">
                  <ZoomIn size={16} />
                </button>
                <button type="button" onClick={() => setPreviewCreative(null)} className="rounded-xl border border-[#3a4a68] bg-[#1b2434] p-2 text-muted-foreground hover:bg-[#253149]">
                  <X size={16} />
                </button>
              </div>
            </div>
            <div className="max-h-[78vh] overflow-auto rounded-[1.5rem] border border-[#33415a] bg-[#0d131d] px-6 py-8">
              <div className="flex justify-center">
                <div style={{ transform: `scale(${previewZoom})` }} className="origin-top transition-transform duration-200">
                  <div className="w-full max-w-[780px]">
                    <div style={{ aspectRatio: platformAspectRatio[previewCreative.platformId] }} className="overflow-hidden rounded-[1.4rem] border border-[#3a4a68] bg-[#101620]">
                      <img src={previewCreative.imageUrl} alt={previewCreative.title} className="h-full w-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdLibrary;
