import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, ChevronLeft, ChevronRight, Eye, Facebook, FileImage, FileText, Globe, Instagram, Link as LinkIcon, LoaderCircle, MessageCircle, RefreshCw, Send, Share2, X, ZoomIn, ZoomOut } from "lucide-react";
import { Link, Navigate, useLocation, useSearchParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { demoCreativeImages, demoLibraryCreatives, demoLibrarySessions } from "@/lib/demoCreativeLibrary";

type PlatformId = "instagram" | "facebook" | "whatsapp" | "website";
type CreativeConfig = { postDescription?: string; headline?: string; cta?: string; offer?: string; selectedPostType?: string; selectedPalette?: string; };
type UploadedAsset = { name: string };
type ChatMessage = { id: string; role: "assistant" | "user"; text: string; platformId?: PlatformId; kind?: "text" | "summary" | "creative"; creativeId?: string; };
type CreativeItem = { id: string; sessionId: string; platformId: PlatformId; title: string; type: string; caption: string; version: number; createdAtLabel: string; imageUrl: string; };
type ChatSession = { id: string; title: string; createdAtLabel: string; platformId: PlatformId; messages: ChatMessage[]; };

const platformMeta: Record<PlatformId, { label: string; icon: typeof Instagram; format: string; ratio: string; defaultType: string; shareUrl: (url: string, text: string) => string; }> = {
  instagram: { label: "Instagram", icon: Instagram, format: "1080 x 1080", ratio: "1:1", defaultType: "FEED", shareUrl: (url) => `https://www.instagram.com/` },
  facebook: { label: "Facebook", icon: Facebook, format: "1200 x 628", ratio: "1.91:1", defaultType: "FEED", shareUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  whatsapp: { label: "WhatsApp", icon: MessageCircle, format: "1080 x 1920", ratio: "9:16", defaultType: "STATUS", shareUrl: (url, text) => `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}` },
  website: { label: "Website", icon: Globe, format: "1200 x 628", ratio: "1.91:1", defaultType: "BANNER", shareUrl: (url) => url },
};
const platformAspectRatio: Record<PlatformId, string> = {
  instagram: "1 / 1",
  facebook: "1.91 / 1",
  whatsapp: "9 / 16",
  website: "1.91 / 1",
};
const platformPreviewWidth: Record<PlatformId, string> = {
  instagram: "max-w-[470px]",
  facebook: "max-w-[760px]",
  whatsapp: "max-w-[320px]",
  website: "max-w-[760px]",
};
const platformPreviewTheme: Record<PlatformId, string> = {
  instagram: "bg-[linear-gradient(180deg,#fff7fb_0%,#ffffff_46%,#57226c_46%,#57226c_100%)]",
  facebook: "bg-[linear-gradient(180deg,#eef5ff_0%,#ffffff_42%,#183a7a_42%,#183a7a_100%)]",
  whatsapp: "bg-[linear-gradient(180deg,#f2fff8_0%,#ffffff_38%,#0f4d3c_38%,#0f4d3c_100%)]",
  website: "bg-[linear-gradient(180deg,#faf7ff_0%,#ffffff_42%,#34235e_42%,#34235e_100%)]",
};
const creativeTheme: Record<PlatformId, { outer: string; inner: string; card: string; button: string; buttonText: string; border: string; title: string; body: string; }> = {
  instagram: { outer: "#5f2470", inner: "#5f2470", card: "#fffaf8", button: "#10294d", buttonText: "#f0cd72", border: "#c7a14a", title: "#c7a14a", body: "#14294c" },
  facebook: { outer: "#183a7a", inner: "#183a7a", card: "#f6f9ff", button: "#183a7a", buttonText: "#f5d56c", border: "#b9923f", title: "#c49a42", body: "#183a7a" },
  whatsapp: { outer: "#0f4d3c", inner: "#0f4d3c", card: "#f4fff8", button: "#0d3f33", buttonText: "#e7f7c2", border: "#8bc69b", title: "#3b8f65", body: "#194836" },
  website: { outer: "#34235e", inner: "#34235e", card: "#faf7ff", button: "#22194d", buttonText: "#f0cd72", border: "#b8923f", title: "#b8923f", body: "#271b56" },
};
const buildBaseCaption = (platformId: PlatformId, creativeConfig: CreativeConfig) => {
  const platform = platformMeta[platformId];
  const headline = creativeConfig.headline?.trim() || "Your next campaign is ready";
  const description = creativeConfig.postDescription?.trim() || "Custom ad copy will appear here once you finish the setup.";
  const cta = creativeConfig.cta?.trim() || "Learn More";
  const offer = creativeConfig.offer?.trim();
  const postType = creativeConfig.selectedPostType?.replace("-", " ") || "brand";
  const compactDescription = description.length > 110 ? `${description.slice(0, 107)}...` : description;
  return `${headline} for ${platform.label}. ${compactDescription} ${offer ? `${offer}. ` : ""}${cta} now. Designed for ${postType} promotion.`;
};
const buildGeneratedCaption = (platformId: PlatformId, creativeConfig: CreativeConfig, prompt: string, version: number) => `${buildBaseCaption(platformId, creativeConfig)} ${prompt.trim() ? `Refinement applied: ${prompt.trim().charAt(0).toUpperCase()}${prompt.trim().slice(1)}.` : "Initial generation created from your creative brief."} Version ${version}.`;
const loadImage = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });

const getCanvasSize = (platformId: PlatformId) => {
  if (platformId === "instagram") return { width: 1080, height: 1080 };
  if (platformId === "facebook" || platformId === "website") return { width: 1200, height: 628 };
  return { width: 1080, height: 1920 };
};

const drawRoundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
};

const drawContainedImage = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) => {
  const scale = Math.max(width / image.width, height / image.height);
  const drawnWidth = image.width * scale;
  const drawnHeight = image.height * scale;
  const offsetX = x + (width - drawnWidth) / 2;
  const offsetY = y + (height - drawnHeight) / 2;

  ctx.save();
  drawRoundedRect(ctx, x, y, width, height, radius);
  ctx.clip();
  ctx.drawImage(image, offsetX, offsetY, drawnWidth, drawnHeight);
  ctx.restore();
};

const renderCreativeCanvas = async (creative: CreativeItem) => {
  const { width, height } = getCanvasSize(creative.platformId);
  const theme = creativeTheme[creative.platformId];
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas not supported");
  }

  const image = await loadImage(creative.imageUrl);
  ctx.fillStyle = theme.outer;
  ctx.fillRect(0, 0, width, height);

  const outerPad = Math.round(width * 0.035);
  const outerRadius = Math.round(width * 0.05);
  drawRoundedRect(ctx, outerPad, outerPad, width - outerPad * 2, height - outerPad * 2, outerRadius);
  ctx.fillStyle = theme.inner;
  ctx.fill();

  const cardX = outerPad + Math.round(width * 0.04);
  const cardY = outerPad + Math.round(height * 0.045);
  const cardW = width - cardX * 2;
  const cardH = height - cardY - (outerPad + Math.round(height * 0.045));
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, Math.round(width * 0.03));
  ctx.fillStyle = theme.card;
  ctx.fill();
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = Math.max(2, Math.round(width * 0.002));
  ctx.stroke();

  const topAreaHeight = Math.round(cardH * (creative.platformId === "whatsapp" ? 0.18 : 0.2));
  const imageAreaHeight = Math.round(cardH * (creative.platformId === "whatsapp" ? 0.46 : creative.platformId === "instagram" ? 0.49 : 0.43));
  const buttonHeight = Math.round(cardH * 0.11);
  const imageX = cardX + Math.round(cardW * 0.05);
  const imageY = cardY + topAreaHeight + Math.round(cardH * 0.03);
  const imageW = cardW - Math.round(cardW * 0.1);
  const imageH = imageAreaHeight;

  ctx.textAlign = "center";
  ctx.fillStyle = theme.title;
  ctx.font = `${Math.round(width * 0.065)}px Georgia`;
  ctx.fillText("AURA", width / 2, cardY + Math.round(topAreaHeight * 0.42));

  ctx.fillStyle = theme.body;
  ctx.font = `${Math.round(width * 0.034)}px Arial`;
  ctx.fillText("THE SCENT OF ETERNAL SUMMER", width / 2, cardY + Math.round(topAreaHeight * 0.78));

  drawContainedImage(ctx, image, imageX, imageY, imageW, imageH, Math.round(width * 0.03));
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = Math.max(2, Math.round(width * 0.002));
  drawRoundedRect(ctx, imageX, imageY, imageW, imageH, Math.round(width * 0.03));
  ctx.stroke();

  const buttonX = imageX;
  const buttonY = imageY + imageH + Math.round(cardH * 0.05);
  const buttonW = imageW;
  drawRoundedRect(ctx, buttonX, buttonY, buttonW, buttonHeight, Math.round(width * 0.025));
  ctx.fillStyle = theme.button;
  ctx.fill();
  ctx.strokeStyle = theme.border;
  ctx.stroke();

  ctx.fillStyle = theme.buttonText;
  ctx.font = `${Math.round(width * 0.03)}px Arial`;
  ctx.fillText("DISCOVER THE COLLECTION", width / 2, buttonY + buttonHeight / 2 + Math.round(width * 0.01));

  return canvas;
};

const downloadCreativeImage = async (creative: CreativeItem) => {
  const canvas = await renderCreativeCanvas(creative);
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = `${creative.title}.png`;
  document.body.appendChild(link);
  link.click();
  link.remove();
};

const openCreativePdfPreview = async (creative: CreativeItem) => {
  const canvas = await renderCreativeCanvas(creative);
  const popup = window.open("", "_blank", "width=1100,height=900");
  if (!popup) return;
  const imageUrl = canvas.toDataURL("image/png");
  popup.document.write(`<html><head><title>${creative.title}</title></head><body style="margin:0;display:flex;align-items:center;justify-content:center;background:#111;"><img src="${imageUrl}" style="max-width:92%;max-height:92vh;border-radius:18px;" /><script>window.onload=()=>window.print();</script></body></html>`);
  popup.document.close();
};

const CreativePoster = ({ creative }: { creative: CreativeItem }) => (
  <div className={`w-full ${platformPreviewWidth[creative.platformId]}`}>
    <div
      style={{ aspectRatio: platformAspectRatio[creative.platformId] }}
      className={`overflow-hidden rounded-[1.4rem] border border-[#b8923f] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.35)] ${platformPreviewTheme[creative.platformId]}`}
    >
      <div className="flex h-full flex-col rounded-[1rem] border border-[#b8923f] bg-white/92 p-5 text-center">
        <div>
          <p className="text-[2.4rem] tracking-wide text-[#c8a44b]">AURA</p>
          <p className="mt-3 text-lg uppercase tracking-wide text-[#14294c]">The Scent Of Eternal Summer</p>
        </div>
        <div className="mt-5 flex-1 overflow-hidden rounded-[0.9rem] border border-[#d4bd7d]">
          <img src={creative.imageUrl} alt={`${platformMeta[creative.platformId].label} fashion creative`} className="h-full w-full object-cover" />
        </div>
        <button className="mt-5 rounded-md border border-[#b8923f] bg-[#10294d] px-6 py-3 text-sm tracking-wide text-[#f0cd72]">
          DISCOVER THE COLLECTION
        </button>
      </div>
    </div>
    <div className="mt-4 flex items-center justify-between rounded-[1.2rem] border border-[#33415a] bg-[#1b2434] px-4 py-3 text-xs uppercase tracking-[0.16em] text-slate-300">
      <span>{platformMeta[creative.platformId].label}</span>
      <span>{platformMeta[creative.platformId].format}</span>
      <span>{platformMeta[creative.platformId].ratio}</span>
    </div>
  </div>
);

const CreativeLibraryCard = ({
  creative,
  isActive,
  onOpen,
  onPreview,
  onShare,
  onDownload,
}: {
  creative: CreativeItem;
  isActive: boolean;
  onOpen: () => void;
  onPreview: () => void;
  onShare: () => void;
  onDownload: () => void;
}) => (
  <div
    className={`overflow-hidden rounded-[1.35rem] border transition-all ${
      isActive
        ? "border-primary bg-[linear-gradient(180deg,rgba(86,74,255,0.16)_0%,rgba(16,21,33,0.92)_100%)] shadow-[0_0_0_1px_hsl(var(--primary)/0.18)]"
        : "border-[#33415a] bg-[#1a2231] hover:border-[#4a5f80] hover:bg-[#202a3d]"
    }`}
  >
    <button type="button" onClick={onOpen} className="block w-full text-left">
      <div className="p-3">
        <div
          style={{ aspectRatio: platformAspectRatio[creative.platformId] }}
          className="overflow-hidden rounded-[1rem] border border-[#3a4a68] bg-[#101620]"
        >
          <img src={creative.imageUrl} alt={creative.title} className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]" />
        </div>
      </div>
      <div className="border-t border-[#2f3b52] px-3 pb-3 pt-2">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-300">
            {platformMeta[creative.platformId].label}
          </span>
          <span className="text-[11px] text-muted-foreground">{creative.createdAtLabel}</span>
        </div>
        <p className="mt-2 line-clamp-1 text-sm font-semibold text-foreground">{creative.title}</p>
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">{creative.caption}</p>
      </div>
    </button>
    <div className="grid grid-cols-3 gap-2 border-t border-[#2f3b52] px-3 py-3">
      <button type="button" onClick={onPreview} className="rounded-xl border border-[#3a4a68] bg-[#1b2434] px-2 py-2 text-[11px] text-muted-foreground transition-all hover:bg-[#253149] hover:text-foreground">
        <Eye size={12} className="mr-1 inline-flex" />
        Preview
      </button>
      <button type="button" onClick={onShare} className="rounded-xl border border-[#3a4a68] bg-[#1b2434] px-2 py-2 text-[11px] text-muted-foreground transition-all hover:bg-[#253149] hover:text-foreground">
        <Share2 size={12} className="mr-1 inline-flex" />
        Share
      </button>
      <button type="button" onClick={onDownload} className="rounded-xl border border-[#3a4a68] bg-[#1b2434] px-2 py-2 text-[11px] text-muted-foreground transition-all hover:bg-[#253149] hover:text-foreground">
        <FileImage size={12} className="mr-1 inline-flex" />
        Download
      </button>
    </div>
  </div>
);

const GeneratedAds = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const locationState = (location.state as { autoStart?: boolean; selectedPlatforms?: string[]; uploadedAssets?: UploadedAsset[]; creativeConfig?: CreativeConfig; } | null) ?? { autoStart: false, selectedPlatforms: [], uploadedAssets: [], creativeConfig: {} };
  const autoStart = locationState.autoStart ?? false;
  const uploadedAssets = locationState.uploadedAssets ?? [];
  const selectedPlatforms = (locationState.selectedPlatforms ?? []).filter((platformId): platformId is PlatformId => platformId in platformMeta);
  const creativeConfig = locationState.creativeConfig ?? {};
  const hasCreationState = Boolean(location.state);
  const shouldShowDemoLibrary = !hasCreationState && !autoStart;
  const orderedPlatforms = useMemo<PlatformId[]>(() => (selectedPlatforms.length > 0 ? selectedPlatforms : ["instagram", "facebook", "whatsapp", "website"]), [selectedPlatforms]);
  const [activePlatform, setActivePlatform] = useState<PlatformId>(orderedPlatforms[0]);
  const [chatPlatform, setChatPlatform] = useState<PlatformId>(orderedPlatforms[0]);
  const [chatInput, setChatInput] = useState("");
  const [chatReady, setChatReady] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [historyCollapsed, setHistoryCollapsed] = useState(false);
  const [generationContext, setGenerationContext] = useState<{ platformId: PlatformId; prompt: string } | null>(null);
  const [sessions, setSessions] = useState<ChatSession[]>(shouldShowDemoLibrary ? demoLibrarySessions : []);
  const [creatives, setCreatives] = useState<CreativeItem[]>(shouldShowDemoLibrary ? demoLibraryCreatives : []);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(shouldShowDemoLibrary ? searchParams.get("session") ?? demoLibrarySessions[0]?.id ?? null : null);
  const [shareCreative, setShareCreative] = useState<CreativeItem | null>(null);
  const [previewCreative, setPreviewCreative] = useState<CreativeItem | null>(null);
  const [previewZoom, setPreviewZoom] = useState(1);
  const timeoutRef = useRef<number | null>(null);
  const autoStartedRef = useRef(false);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => { if (timeoutRef.current) window.clearTimeout(timeoutRef.current); }, []);
  const activeSession = sessions.find((session) => session.id === activeSessionId) ?? sessions[0] ?? null;
  useEffect(() => {
    const requestedSessionId = searchParams.get("session");
    if (!requestedSessionId) {
      if (!activeSessionId && sessions.length > 0) {
        setActiveSessionId(sessions[0].id);
        setActivePlatform(sessions[0].platformId);
        setChatPlatform(sessions[0].platformId);
        setChatReady(true);
      }
      return;
    }

    const matchingSession = sessions.find((session) => session.id === requestedSessionId);
    if (!matchingSession) {
      return;
    }

    setActiveSessionId(matchingSession.id);
    setActivePlatform(matchingSession.platformId);
    setChatPlatform(matchingSession.platformId);
    setChatReady(true);
  }, [searchParams, sessions, activeSessionId]);
  useEffect(() => { if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight; }, [activeSession?.messages, isGenerating]);
  const activeCreatives = useMemo(() => creatives.filter((creative) => creative.sessionId === activeSession?.id), [creatives, activeSession?.id]);
  const sessionLatestCreativeMap = useMemo(
    () =>
      creatives.reduce<Record<string, CreativeItem>>((accumulator, creative) => {
        const current = accumulator[creative.sessionId];
        if (!current || creative.version >= current.version) {
          accumulator[creative.sessionId] = creative;
        }
        return accumulator;
      }, {}),
    [creatives],
  );
  const appendMessages = (sessionId: string, newMessages: ChatMessage[]) => setSessions((current) => current.map((session) => session.id === sessionId ? { ...session, messages: [...session.messages, ...newMessages] } : session));
  const createSession = (platformId: PlatformId) => {
    const sessionId = `session-${Date.now()}`;
    const session: ChatSession = { id: sessionId, title: `New Generation ${sessions.length + 1}`, createdAtLabel: "Just now", platformId, messages: [{ id: `welcome-${sessionId}`, role: "assistant", text: "I am ready to generate and refine your creative. Share what you want changed and I will keep everything in this conversation.", platformId }] };
    setSessions((current) => [session, ...current]); setActiveSessionId(sessionId); setActivePlatform(platformId); setChatPlatform(platformId); return sessionId;
  };
  const startGeneration = (platformId: PlatformId, prompt: string, source: "manual" | "chat", sessionId?: string) => {
    if (isGenerating) return;
    const targetSessionId = sessionId ?? activeSessionId ?? createSession(platformId);
    const trimmedPrompt = prompt.trim();
    if (source === "chat") appendMessages(targetSessionId, [{ id: `user-${Date.now()}`, role: "user", text: trimmedPrompt, platformId }]);
    else appendMessages(targetSessionId, [{ id: `brief-${Date.now()}`, role: "user", text: `Create a post for ${platformMeta[platformId].label}.`, platformId }, { id: `summary-${Date.now() + 1}`, role: "user", text: "", platformId, kind: "summary" }]);
    setIsGenerating(true); setChatReady(false); setGenerationContext({ platformId, prompt: trimmedPrompt }); setActiveSessionId(targetSessionId); setActivePlatform(platformId); setChatPlatform(platformId);
    timeoutRef.current = window.setTimeout(() => {
      setCreatives((current) => {
        const version = current.filter((item) => item.sessionId === targetSessionId && item.platformId === platformId).length + 1;
        const creative: CreativeItem = { id: `${platformId}-${Date.now()}`, sessionId: targetSessionId, platformId, title: `${platformMeta[platformId].label} Ad V${version}`, type: platformMeta[platformId].defaultType, caption: buildGeneratedCaption(platformId, creativeConfig, trimmedPrompt, version), version, createdAtLabel: "Just now", imageUrl: demoCreativeImages[platformId] };
        appendMessages(targetSessionId, [{ id: `assistant-copy-${Date.now()}`, role: "assistant", text: source === "manual" ? `Thanks for sharing the details. I analyzed your request for ${platformMeta[platformId].label} and generated the first creative.` : `I processed your refinement request and created a new ${platformMeta[platformId].label} version.`, platformId }, { id: `assistant-creative-${Date.now() + 1}`, role: "assistant", text: creative.caption, platformId, kind: "creative", creativeId: creative.id }]);
        setSessions((currentSessions) => currentSessions.map((session) => session.id === targetSessionId ? { ...session, title: creative.title, createdAtLabel: "Just now" } : session));
        return [creative, ...current];
      });
      setIsGenerating(false); setChatReady(true); setGenerationContext(null); setChatInput(""); timeoutRef.current = null;
    }, 1800);
  };
  useEffect(() => { if (!autoStart || autoStartedRef.current) return; autoStartedRef.current = true; const newSessionId = createSession(orderedPlatforms[0]); startGeneration(orderedPlatforms[0], "", "manual", newSessionId); }, [autoStart, orderedPlatforms]);
  const handleChatSubmit = () => { if (!chatInput.trim()) return; const sessionId = activeSessionId ?? createSession(chatPlatform); startGeneration(chatPlatform, chatInput, "chat", sessionId); };
  const showInitialLoader = !chatReady && isGenerating && sessions.length <= 1 && creatives.length === 0;

  if (!hasCreationState && !searchParams.get("session") && !autoStart) {
    return <Navigate to="/ad-library" replace />;
  }

  if (showInitialLoader) return (
    <DashboardLayout>
      <div className="flex min-h-[calc(100vh-9rem)] items-center justify-center rounded-[2rem] border border-[#2a3446] bg-[linear-gradient(135deg,#091018_0%,#0d1220_45%,#121021_100%)] px-6">
        <div className="w-full max-w-4xl rounded-[2rem] border border-[#31405b] bg-[#151b24] px-8 py-20 text-center shadow-[0_18px_60px_rgba(0,0,0,0.3)]">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/5"><LoaderCircle size={52} className="animate-spin text-emerald-400" /></div>
          <h2 className="text-4xl font-bold text-foreground">Generating your ad...</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">We're processing your final inputs and preparing the chat workspace. This screen will stay here until the response is ready.</p>
        </div>
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div
        className="grid min-h-[calc(100vh-9rem)] gap-0 overflow-hidden rounded-[2rem] border border-[#2a3446] bg-[linear-gradient(135deg,#091018_0%,#0d1220_45%,#121021_100%)] shadow-[0_24px_80px_hsl(230_30%_4%_/_0.45)] transition-all duration-300 ease-in-out"
        style={{ gridTemplateColumns: historyCollapsed ? "56px minmax(0,1fr)" : "360px minmax(0,1fr)" }}
      >
        <aside className="flex min-h-0 flex-col border-r border-[#31405b] bg-[linear-gradient(180deg,#121722_0%,#171b28_100%)] transition-all duration-300 ease-in-out">
          <div className={`flex items-center justify-between border-b border-[#31405b] bg-[#151b28] transition-all duration-300 ease-in-out ${historyCollapsed ? "px-2 py-3" : "px-5 py-5"}`}>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${historyCollapsed ? "max-w-0 opacity-0" : "max-w-xs opacity-100"}`}><p className="text-lg font-semibold text-foreground">Refinement History</p><p className="mt-1 text-xs text-muted-foreground">Open a saved creative or session and continue editing it in chat.</p></div>
            <button type="button" onClick={() => setHistoryCollapsed((current) => !current)} className={`shrink-0 rounded-full border border-[#3a4a68] bg-[#1c2433] text-muted-foreground transition-all hover:bg-[#273247] hover:text-foreground ${historyCollapsed ? "mx-auto h-9 w-9" : "h-9 w-9"}`}>{historyCollapsed ? <ChevronRight size={14} className="mx-auto" /> : <ChevronLeft size={14} className="mx-auto" />}</button>
          </div>
          <div className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${historyCollapsed ? "px-2 py-3" : "px-4 py-4"}`}>
            {historyCollapsed ? (
              <div className="space-y-2">
                {creatives.slice(0, 4).map((creative) => (
                  <button
                    key={creative.id}
                    type="button"
                    onClick={() => {
                      setActiveSessionId(creative.sessionId);
                      setActivePlatform(creative.platformId);
                      setChatPlatform(creative.platformId);
                      setChatReady(true);
                    }}
                    className={`overflow-hidden rounded-2xl border transition-all ${
                      activeSession?.id === creative.sessionId ? "border-primary bg-primary/10" : "border-[#33415a] bg-[#1a2231] hover:border-[#4a5f80]"
                    }`}
                    title={creative.title}
                  >
                    <div className="h-11 w-11 overflow-hidden">
                      <img src={creative.imageUrl} alt={creative.title} className="h-full w-full object-cover" />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <div className="mb-3 flex items-center gap-2 rounded-xl border border-[#2d3950] bg-[#1a2231] px-3 py-2">
                    <FileImage size={14} className="text-primary" />
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Session Creatives</p>
                  </div>
                  {creatives.length === 0 ? (
                    <div className="rounded-2xl border border-[#33415a] bg-[#1a2231] px-4 py-5 text-sm text-muted-foreground">
                      No generated ads yet. Create a new ad and it will be stored here as a gallery card.
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      {creatives.map((creative) => (
                        <CreativeLibraryCard
                          key={creative.id}
                          creative={creative}
                          isActive={activeSession?.id === creative.sessionId}
                          onOpen={() => {
                            setActiveSessionId(creative.sessionId);
                            setActivePlatform(creative.platformId);
                            setChatPlatform(creative.platformId);
                            setChatReady(true);
                          }}
                          onPreview={() => {
                            setPreviewCreative(creative);
                            setPreviewZoom(1);
                          }}
                          onShare={() => setShareCreative(creative)}
                          onDownload={() => void downloadCreativeImage(creative)}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <div className="mb-3 flex items-center gap-2 rounded-xl border border-[#2d3950] bg-[#1a2231] px-3 py-2">
                    <MessageCircle size={14} className="text-primary" />
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Refinement Chats</p>
                  </div>
                  <div className="space-y-2">
                    {sessions.length === 0 ? <div className="rounded-2xl border border-[#33415a] bg-[#1a2231] px-4 py-5 text-sm text-muted-foreground">No ad chats yet. Create a new ad first, then its conversation will appear here.</div> : null}
                    {sessions.map((session) => <button key={session.id} type="button" onClick={() => { setActiveSessionId(session.id); setActivePlatform(session.platformId); setChatPlatform(session.platformId); setChatReady(true); }} className={`w-full rounded-[1.45rem] border text-left transition-all ${activeSession?.id === session.id ? "border-primary bg-[linear-gradient(180deg,rgba(86,74,255,0.18)_0%,rgba(86,74,255,0.08)_100%)] shadow-[0_0_0_1px_hsl(var(--primary)/0.18)]" : "border-[#33415a] bg-[#1a2231] hover:border-[#4a5f80] hover:bg-[#202a3d]"}`}><div className="space-y-3 px-4 py-4"><div className="flex items-center justify-between"><span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-300">{platformMeta[session.platformId].label}</span><span className="text-[11px] text-muted-foreground">{session.createdAtLabel}</span></div><div><p className="line-clamp-1 text-sm font-semibold text-foreground">{session.title}</p><p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">{sessionLatestCreativeMap[session.id]?.caption || session.messages.filter((message) => message.role === "assistant").slice(-1)[0]?.text || "Open this card to continue refining the generated ad."}</p></div></div></button>)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>
        <section className="flex min-h-0 flex-col bg-[radial-gradient(circle_at_top,#1b1932_0%,#0d1321_38%,#0a0e16_100%)]">
          <div className="border-b border-[#31405b] bg-[linear-gradient(180deg,#111827_0%,#101521_100%)] px-6 py-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div><h1 className="text-2xl font-semibold text-foreground">Creative Workspace</h1><p className="mt-1 text-sm text-muted-foreground">This page is only for generating and refining a selected ad in chat.</p></div>
              <div className="flex items-center gap-3"><Link to="/ad-library" className="rounded-2xl border border-[#3a4a68] bg-[#1b2434] px-4 py-3 text-sm text-foreground transition-all hover:bg-[#243149]">Open Ad Library</Link><Link to="/create-ad" className="rounded-2xl border border-[#3a4a68] bg-[#1b2434] px-4 py-3 text-sm text-foreground transition-all hover:bg-[#243149]">Create New Ad</Link></div>
            </div>
          </div>
          <div className="flex flex-1 min-h-0 flex-col">
            <div className="flex min-h-0 flex-col">
              <div ref={threadRef} className="flex-1 overflow-y-auto px-6 py-8">
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
                  {!activeSession && !isGenerating ? <div className="rounded-[2rem] border border-[#31405b] bg-[linear-gradient(180deg,#171e2a_0%,#121926_100%)] px-8 py-12 text-center shadow-[0_18px_60px_rgba(0,0,0,0.28)]"><p className="text-2xl font-semibold text-foreground">No generated ad open yet</p><p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">This workspace opens after you create an ad. Once an ad is generated, its full chat and creative history will stay available here as cards in the left library.</p><Link to="/create-ad" className="mt-6 inline-flex rounded-2xl border border-[#3a4a68] bg-[#1b2434] px-5 py-3 text-sm text-foreground transition-all hover:bg-[#243149]">Create Your First Ad</Link></div> : null}
                  {(activeSession?.messages ?? []).map((message) => {
                    const creative = message.creativeId ? creatives.find((item) => item.id === message.creativeId) : null;
                    return <div key={message.id} className={`${message.role === "user" ? "ml-auto max-w-2xl" : "max-w-4xl"}`}>
                      <div className="mb-3 flex items-center gap-3 text-sm text-muted-foreground"><span className={`flex h-11 w-11 items-center justify-center rounded-full ${message.role === "assistant" ? "bg-amber-400 text-black" : "bg-primary/20 text-primary"}`}>{message.role === "assistant" ? <Bot size={18} /> : <Send size={18} />}</span><span className="font-medium text-foreground">{message.role === "assistant" ? "VC Assistant" : "You"}</span></div>
                      {message.kind === "summary" ? <div className="overflow-hidden rounded-[1.75rem] border border-[#1e8f42] bg-[linear-gradient(180deg,#0fc54a_0%,#0ca33f_100%)] text-white shadow-[0_18px_45px_rgba(13,182,63,0.18)]"><div className="border-b border-white/20 bg-white/5 px-5 py-4"><p className="text-sm font-semibold">Creative Brief Summary</p></div><div className="grid gap-0 sm:grid-cols-2">{[["Post Description", creativeConfig.postDescription || "Not specified"], ["Headline", creativeConfig.headline || "Not specified"], ["Call To Action", creativeConfig.cta || "Not specified"], ["Post Type", creativeConfig.selectedPostType || "Not specified"], ["Color Palette", creativeConfig.selectedPalette || "Not specified"], ["Uploaded Files", uploadedAssets.map((file) => file.name).join(", ") || "None"]].map(([label, value], index) => <div key={label} className={`px-5 py-4 ${index < 4 ? "border-b border-white/15" : ""} ${index % 2 === 0 ? "sm:border-r sm:border-white/15" : ""}`}><p className="text-xs uppercase tracking-[0.16em] text-white/70">{label}</p><p className="mt-2 text-base font-medium text-white">{value}</p></div>)}</div></div> : message.kind === "creative" && creative ? <div className="overflow-hidden rounded-[2rem] border border-[#31405b] bg-[linear-gradient(180deg,#171e2a_0%,#121926_100%)] shadow-[0_18px_60px_rgba(0,0,0,0.28)]"><button type="button" onClick={() => { setPreviewCreative(creative); setPreviewZoom(1); }} className="relative flex w-full items-center justify-center bg-[linear-gradient(180deg,#1a2334_0%,#131b29_100%)] px-6 py-8"><CreativePoster creative={creative} /></button><div className="border-t border-[#31405b] bg-[#192131] px-5 py-4"><p className="text-sm text-muted-foreground">Your creative is ready. Use the chat below to make adjustments.</p></div><div className="flex flex-wrap gap-2 px-5 py-4"><button type="button" onClick={() => setShareCreative(creative)} className="rounded-2xl border border-[#3a4a68] bg-[#1c2433] px-3 py-2 text-xs text-muted-foreground hover:bg-[#253149]"><Share2 size={12} className="mr-1 inline-flex" />Share</button><button type="button" onClick={() => void downloadCreativeImage(creative)} className="rounded-2xl border border-[#3a4a68] bg-[#1c2433] px-3 py-2 text-xs text-muted-foreground hover:bg-[#253149]"><FileImage size={12} className="mr-1 inline-flex" />Download Image</button><button type="button" onClick={() => void openCreativePdfPreview(creative)} className="rounded-2xl border border-[#3a4a68] bg-[#1c2433] px-3 py-2 text-xs text-muted-foreground hover:bg-[#253149]"><FileText size={12} className="mr-1 inline-flex" />Download PDF</button></div></div> : <div className={`rounded-[1.75rem] px-5 py-4 ${message.role === "assistant" ? "border border-[#31405b] bg-[linear-gradient(180deg,#1a2232_0%,#161d2a_100%)] text-foreground shadow-[0_10px_30px_rgba(0,0,0,0.18)]" : "bg-[linear-gradient(180deg,#11c84b_0%,#089d39_100%)] text-white shadow-[0_14px_30px_rgba(8,177,60,0.18)]"}`}><p className="whitespace-pre-line text-sm leading-8">{message.text}</p></div>}
                    </div>;
                  })}
                  {isGenerating && generationContext && <div className="max-w-3xl"><div className="mb-3 flex items-center gap-3 text-sm text-muted-foreground"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-400 text-black"><LoaderCircle size={18} className="animate-spin" /></span><span className="font-medium text-foreground">VC Assistant</span></div><div className="rounded-[1.75rem] border border-[#31405b] bg-[linear-gradient(180deg,#1a2232_0%,#161d2a_100%)] px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.18)]"><p className="text-sm leading-8 text-foreground">I've processed your request for {platformMeta[generationContext.platformId].label}. I'm now generating creative visuals and preparing the response.</p></div></div>}
                </div>
              </div>
              <div className="border-t border-[#31405b] bg-[linear-gradient(180deg,#101620_0%,#0d131d_100%)] px-6 py-5">
                <div className="mx-auto w-full max-w-5xl">
                  <div className="mb-3 flex items-center gap-2 rounded-xl border border-[#31405b] bg-[#161e2c] px-3 py-2 text-xs text-muted-foreground"><span>Platform:</span><select value={chatPlatform} onChange={(event) => setChatPlatform(event.target.value as PlatformId)} disabled={!chatReady || isGenerating} className="rounded-xl border border-[#3a4a68] bg-[#1b2434] px-3 py-2 text-xs text-foreground outline-none">{(Object.keys(platformMeta) as PlatformId[]).map((platformId) => <option key={platformId} value={platformId}>{platformMeta[platformId].label}</option>)}</select></div>
                  <div className="relative">
                    <div className="rounded-[1.75rem] border border-[#3a4a68] bg-[linear-gradient(180deg,#182131_0%,#141b28_100%)] p-3 pr-28 shadow-[0_14px_40px_rgba(0,0,0,0.22)]">
                      <textarea value={chatInput} onChange={(event) => setChatInput(event.target.value)} disabled={!chatReady || isGenerating} rows={3} placeholder="Type a message to refine the ad, change the style, or generate the same thing for another platform." className="w-full resize-none bg-transparent px-2 py-2 text-sm leading-7 text-foreground outline-none placeholder:text-muted-foreground/65" />
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                      <button type="button" onClick={() => startGeneration(chatPlatform, "", "manual", activeSessionId ?? undefined)} disabled={isGenerating} className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all ${isGenerating ? "cursor-not-allowed border-[#2f3748] bg-[#242b38] text-muted-foreground" : "border-[#3a4a68] bg-[#1b2434] text-foreground hover:bg-[#253149]"}`} title="Regenerate">
                        <RefreshCw size={16} className={isGenerating ? "animate-spin" : ""} />
                      </button>
                      <button type="button" onClick={handleChatSubmit} disabled={!chatReady || isGenerating || !chatInput.trim()} className={`flex h-11 w-11 items-center justify-center rounded-full transition-all ${!chatReady || isGenerating || !chatInput.trim() ? "cursor-not-allowed bg-secondary text-muted-foreground" : "bg-[linear-gradient(180deg,#11c84b_0%,#089d39_100%)] text-white shadow-[0_14px_30px_rgba(8,177,60,0.18)] hover:brightness-110"}`} title="Send">
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {shareCreative && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"><div className="w-full max-w-xl rounded-[1.75rem] border border-[#33415a] bg-[#151b24] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.35)]"><div className="mb-5 flex items-center justify-between"><div><h3 className="text-xl font-semibold text-foreground">Share Creative</h3><p className="mt-1 text-sm text-muted-foreground">Choose a platform or open a custom link.</p></div><button type="button" onClick={() => setShareCreative(null)} className="rounded-xl border border-[#3a4a68] bg-[#1b2434] p-2 text-muted-foreground hover:bg-[#253149]"><X size={16} /></button></div><div className="grid gap-3 sm:grid-cols-2">{(Object.keys(platformMeta) as PlatformId[]).map((platformId) => { const platform = platformMeta[platformId]; const Icon = platform.icon; const previewUrl = shareCreative.imageUrl; const text = `${shareCreative.title} - ${shareCreative.caption}`; const generatedShareUrl = platform.shareUrl(previewUrl, text); return <button key={platformId} type="button" onClick={() => window.open(generatedShareUrl, "_blank", "width=900,height=700")} className="rounded-2xl border border-[#33415a] bg-[#1a2231] px-4 py-4 text-left transition-all hover:border-[#4a5f80] hover:bg-[#202a3d]"><div className="mb-2 flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary"><Icon size={18} /></div><span className="text-sm font-semibold text-foreground">{platform.label}</span></div><p className="text-xs text-muted-foreground">Open sharing popup for {platform.label}</p></button>; })}</div><div className="mt-5 rounded-2xl border border-[#33415a] bg-[#1a2231] p-4"><div className="mb-3 flex items-center gap-2"><LinkIcon size={14} className="text-primary" /><p className="text-sm font-semibold text-foreground">Custom Open Link</p></div><input value={shareCreative.imageUrl} readOnly className="w-full rounded-xl border border-[#3a4a68] bg-[#101620] px-4 py-3 text-sm text-foreground outline-none" /></div></div></div>}
      {previewCreative && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"><div className="w-full max-w-5xl rounded-[1.75rem] border border-[#33415a] bg-[#151b24] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.35)]"><div className="mb-4 flex items-center justify-between"><div><h3 className="text-xl font-semibold text-foreground">{previewCreative.title}</h3><p className="mt-1 text-sm text-muted-foreground">{platformMeta[previewCreative.platformId].label} preview</p></div><div className="flex items-center gap-2"><button type="button" onClick={() => setPreviewZoom((current) => Math.max(0.8, current - 0.1))} className="rounded-xl border border-[#3a4a68] bg-[#1b2434] p-2 text-muted-foreground hover:bg-[#253149]"><ZoomOut size={16} /></button><button type="button" onClick={() => setPreviewZoom((current) => Math.min(2, current + 0.1))} className="rounded-xl border border-[#3a4a68] bg-[#1b2434] p-2 text-muted-foreground hover:bg-[#253149]"><ZoomIn size={16} /></button><button type="button" onClick={() => setPreviewCreative(null)} className="rounded-xl border border-[#3a4a68] bg-[#1b2434] p-2 text-muted-foreground hover:bg-[#253149]"><X size={16} /></button></div></div><div className="themed-scrollbar max-h-[78vh] overflow-auto rounded-[1.5rem] border border-[#33415a] bg-[#0d131d] px-6 py-8"><div className="flex justify-center"><div style={{ transform: `scale(${previewZoom})` }} className="origin-top transition-transform duration-200"><CreativePoster creative={previewCreative} /></div></div></div></div></div>}
    </DashboardLayout>
  );
};

export default GeneratedAds;
