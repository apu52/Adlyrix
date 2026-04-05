export type DemoPlatformId = "instagram" | "facebook" | "whatsapp" | "website";

export type DemoChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
  platformId?: DemoPlatformId;
  kind?: "text" | "summary" | "creative";
  creativeId?: string;
};

export type DemoCreativeItem = {
  id: string;
  sessionId: string;
  platformId: DemoPlatformId;
  title: string;
  type: string;
  caption: string;
  version: number;
  createdAtLabel: string;
  imageUrl: string;
};

export type DemoChatSession = {
  id: string;
  title: string;
  createdAtLabel: string;
  platformId: DemoPlatformId;
  messages: DemoChatMessage[];
};

const svgDataUri = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const makeAdCreative = ({
  width,
  height,
  background,
  accent,
  title,
  subtitle,
  cta,
  badge,
  illustration,
}: {
  width: number;
  height: number;
  background: string;
  accent: string;
  title: string;
  subtitle: string;
  cta: string;
  badge: string;
  illustration: "perfume" | "snack" | "honey" | "website";
}) =>
  svgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${background}" />
        <stop offset="100%" stop-color="#0f172a" />
      </linearGradient>
      <linearGradient id="panel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#fff8ef" />
        <stop offset="100%" stop-color="#fff3dd" />
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" rx="36" fill="url(#bg)" />
    <circle cx="${width - 90}" cy="90" r="58" fill="${accent}" fill-opacity="0.16" />
    <circle cx="92" cy="${height - 84}" r="64" fill="${accent}" fill-opacity="0.10" />
    <rect x="38" y="34" width="${width - 76}" height="${height - 68}" rx="28" fill="url(#panel)" stroke="${accent}" stroke-width="4" />
    <rect x="64" y="62" width="132" height="34" rx="17" fill="${accent}" fill-opacity="0.14" />
    <text x="130" y="84" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="${accent}">${badge}</text>
    <text x="${width / 2}" y="${height * 0.23}" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.round(width * 0.065)}" font-weight="700" fill="${accent}">${title}</text>
    <text x="${width / 2}" y="${height * 0.30}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.round(width * 0.028)}" fill="#334155">${subtitle}</text>
    ${
      illustration === "perfume"
        ? `
          <rect x="${width * 0.37}" y="${height * 0.39}" width="${width * 0.26}" height="${height * 0.24}" rx="18" fill="#f8d99c" stroke="${accent}" stroke-width="4" />
          <rect x="${width * 0.435}" y="${height * 0.33}" width="${width * 0.13}" height="${height * 0.08}" rx="10" fill="${accent}" />
          <circle cx="${width * 0.50}" cy="${height * 0.50}" r="${Math.min(width, height) * 0.05}" fill="${accent}" fill-opacity="0.18" />
        `
        : ""
    }
    ${
      illustration === "snack"
        ? `
          <rect x="${width * 0.18}" y="${height * 0.42}" width="${width * 0.64}" height="${height * 0.18}" rx="24" fill="#f59e0b" />
          <circle cx="${width * 0.30}" cy="${height * 0.50}" r="${Math.min(width, height) * 0.055}" fill="#7c2d12" />
          <circle cx="${width * 0.50}" cy="${height * 0.50}" r="${Math.min(width, height) * 0.055}" fill="#b45309" />
          <circle cx="${width * 0.70}" cy="${height * 0.50}" r="${Math.min(width, height) * 0.055}" fill="#92400e" />
        `
        : ""
    }
    ${
      illustration === "honey"
        ? `
          <rect x="${width * 0.33}" y="${height * 0.33}" width="${width * 0.34}" height="${height * 0.30}" rx="26" fill="#facc15" stroke="${accent}" stroke-width="4" />
          <path d="M ${width * 0.50} ${height * 0.25} L ${width * 0.57} ${height * 0.34} L ${width * 0.43} ${height * 0.34} Z" fill="${accent}" />
          <circle cx="${width * 0.50}" cy="${height * 0.48}" r="${Math.min(width, height) * 0.06}" fill="${accent}" fill-opacity="0.18" />
        `
        : ""
    }
    ${
      illustration === "website"
        ? `
          <rect x="${width * 0.16}" y="${height * 0.34}" width="${width * 0.68}" height="${height * 0.26}" rx="22" fill="#dbeafe" stroke="${accent}" stroke-width="4" />
          <rect x="${width * 0.20}" y="${height * 0.39}" width="${width * 0.30}" height="${height * 0.05}" rx="10" fill="${accent}" fill-opacity="0.20" />
          <rect x="${width * 0.20}" y="${height * 0.47}" width="${width * 0.52}" height="${height * 0.04}" rx="8" fill="#94a3b8" fill-opacity="0.5" />
          <rect x="${width * 0.56}" y="${height * 0.39}" width="${width * 0.22}" height="${height * 0.12}" rx="16" fill="${accent}" />
        `
        : ""
    }
    <rect x="${width * 0.23}" y="${height * 0.74}" width="${width * 0.54}" height="${height * 0.09}" rx="18" fill="#0f172a" />
    <text x="${width / 2}" y="${height * 0.80}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.round(width * 0.026)}" font-weight="700" fill="#f8d99c">${cta}</text>
  </svg>
`);

export const demoCreativeImages: Record<DemoPlatformId, string> = {
  instagram: makeAdCreative({
    width: 1080,
    height: 1080,
    background: "#4c1d95",
    accent: "#c084fc",
    title: "AURA",
    subtitle: "The Scent Of Eternal Summer",
    cta: "DISCOVER THE COLLECTION",
    badge: "INSTAGRAM FEED",
    illustration: "perfume",
  }),
  facebook: makeAdCreative({
    width: 1200,
    height: 628,
    background: "#1d4ed8",
    accent: "#60a5fa",
    title: "Yummzi",
    subtitle: "Smart and mindful snacking for busy days",
    cta: "SHOP THE SNACK DROP",
    badge: "FACEBOOK BANNER",
    illustration: "snack",
  }),
  whatsapp: makeAdCreative({
    width: 1080,
    height: 1920,
    background: "#047857",
    accent: "#34d399",
    title: "Beezo",
    subtitle: "Pure honey stories for everyday wellness",
    cta: "SWIPE FOR TODAY'S OFFER",
    badge: "WHATSAPP STATUS",
    illustration: "honey",
  }),
  website: makeAdCreative({
    width: 1200,
    height: 628,
    background: "#0f766e",
    accent: "#2dd4bf",
    title: "Launch Sprint",
    subtitle: "High-converting landing assets for your next campaign",
    cta: "VIEW WEBSITE PACK",
    badge: "WEBSITE HERO",
    illustration: "website",
  }),
};

export const demoLibrarySessions: DemoChatSession[] = [
  {
    id: "library-instagram",
    title: "Aura Summer Launch",
    createdAtLabel: "2 hours ago",
    platformId: "instagram",
    messages: [
      { id: "library-instagram-welcome", role: "assistant", text: "I kept your summer launch conversation here so you can continue refining it anytime.", platformId: "instagram" },
      { id: "library-instagram-user", role: "user", text: "Refine the fragrance post for Instagram and keep it premium.", platformId: "instagram" },
      { id: "library-instagram-assistant", role: "assistant", text: "I refreshed the Instagram version with a luxury tone and stronger product focus.", platformId: "instagram" },
      { id: "library-instagram-creative", role: "assistant", text: "Luxury Instagram creative ready.", platformId: "instagram", kind: "creative", creativeId: "creative-library-instagram" },
    ],
  },
  {
    id: "library-facebook",
    title: "Yummzi Product Banner",
    createdAtLabel: "5 hours ago",
    platformId: "facebook",
    messages: [
      { id: "library-facebook-welcome", role: "assistant", text: "This saved Facebook campaign can be reopened from the library anytime.", platformId: "facebook" },
      { id: "library-facebook-user", role: "user", text: "Create a wide Facebook banner for the snack launch.", platformId: "facebook" },
      { id: "library-facebook-assistant", role: "assistant", text: "I generated a bold Facebook banner optimized for wider placements.", platformId: "facebook" },
      { id: "library-facebook-creative", role: "assistant", text: "Wide Facebook banner ready.", platformId: "facebook", kind: "creative", creativeId: "creative-library-facebook" },
    ],
  },
  {
    id: "library-whatsapp",
    title: "Beezo Status Story",
    createdAtLabel: "1 day ago",
    platformId: "whatsapp",
    messages: [
      { id: "library-whatsapp-welcome", role: "assistant", text: "Your WhatsApp status ad is saved with the full chat thread.", platformId: "whatsapp" },
      { id: "library-whatsapp-user", role: "user", text: "Make this one vertical for WhatsApp status and keep it fresh.", platformId: "whatsapp" },
      { id: "library-whatsapp-assistant", role: "assistant", text: "I converted the layout into a vertical story-style WhatsApp ad.", platformId: "whatsapp" },
      { id: "library-whatsapp-creative", role: "assistant", text: "Vertical WhatsApp status creative ready.", platformId: "whatsapp", kind: "creative", creativeId: "creative-library-whatsapp" },
    ],
  },
];

export const demoLibraryCreatives: DemoCreativeItem[] = [
  {
    id: "creative-library-instagram",
    sessionId: "library-instagram",
    platformId: "instagram",
    title: "Aura Summer Launch",
    type: "FEED",
    caption: "Luxury Instagram launch creative for the summer fragrance campaign.",
    version: 3,
    createdAtLabel: "2 hours ago",
    imageUrl: demoCreativeImages.instagram,
  },
  {
    id: "creative-library-facebook",
    sessionId: "library-facebook",
    platformId: "facebook",
    title: "Yummzi Product Banner",
    type: "FEED",
    caption: "Facebook banner creative for the Yummzi snack campaign.",
    version: 2,
    createdAtLabel: "5 hours ago",
    imageUrl: demoCreativeImages.facebook,
  },
  {
    id: "creative-library-whatsapp",
    sessionId: "library-whatsapp",
    platformId: "whatsapp",
    title: "Beezo Status Story",
    type: "STATUS",
    caption: "Vertical WhatsApp status creative for the Beezo campaign.",
    version: 4,
    createdAtLabel: "1 day ago",
    imageUrl: demoCreativeImages.whatsapp,
  },
];
