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

const makeGarmentCreative = ({
  width,
  height,
  backgroundFrom,
  backgroundTo,
  accent,
  panel,
  title,
  subtitle,
  cta,
  badge,
  garment,
}: {
  width: number;
  height: number;
  backgroundFrom: string;
  backgroundTo: string;
  accent: string;
  panel: string;
  title: string;
  subtitle: string;
  cta: string;
  badge: string;
  garment: "blazer" | "streetwear" | "kurta" | "activewear" | "denim";
}) =>
  svgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${backgroundFrom}" />
        <stop offset="100%" stop-color="${backgroundTo}" />
      </linearGradient>
      <linearGradient id="card" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${panel}" />
        <stop offset="100%" stop-color="#fffaf4" />
      </linearGradient>
      <linearGradient id="photo" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#fff4e4" />
        <stop offset="100%" stop-color="#eadac2" />
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" rx="42" fill="url(#bg)" />
    <circle cx="${width * 0.84}" cy="${height * 0.16}" r="${Math.min(width, height) * 0.09}" fill="${accent}" fill-opacity="0.16" />
    <circle cx="${width * 0.12}" cy="${height * 0.85}" r="${Math.min(width, height) * 0.12}" fill="#ffffff" fill-opacity="0.08" />
    <rect x="${width * 0.045}" y="${height * 0.045}" width="${width * 0.91}" height="${height * 0.91}" rx="34" fill="url(#card)" stroke="${accent}" stroke-width="${Math.max(3, width * 0.0035)}" />
    <rect x="${width * 0.085}" y="${height * 0.10}" width="${width * 0.22}" height="${height * 0.055}" rx="${height * 0.027}" fill="${accent}" fill-opacity="0.16" />
    <text x="${width * 0.195}" y="${height * 0.136}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.round(width * 0.018)}" font-weight="700" fill="${accent}">${badge}</text>
    <text x="${width / 2}" y="${height * 0.23}" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.round(width * 0.066)}" font-weight="700" letter-spacing="1.5" fill="${accent}">${title}</text>
    <text x="${width / 2}" y="${height * 0.30}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.round(width * 0.027)}" fill="#4b5563">${subtitle}</text>
    <rect x="${width * 0.10}" y="${height * 0.36}" width="${width * 0.80}" height="${height * 0.38}" rx="28" fill="url(#photo)" stroke="${accent}" stroke-width="${Math.max(2, width * 0.0025)}" />
    <rect x="${width * 0.17}" y="${height * 0.39}" width="${width * 0.66}" height="${height * 0.015}" rx="${height * 0.0075}" fill="#d1b48c" />
    <circle cx="${width * 0.32}" cy="${height * 0.446}" r="${Math.min(width, height) * 0.017}" fill="#c49a6c" />
    <circle cx="${width * 0.50}" cy="${height * 0.446}" r="${Math.min(width, height) * 0.017}" fill="#c49a6c" />
    <circle cx="${width * 0.68}" cy="${height * 0.446}" r="${Math.min(width, height) * 0.017}" fill="#c49a6c" />
    ${
      garment === "blazer"
        ? `
          <path d="M ${width * 0.24} ${height * 0.68} L ${width * 0.30} ${height * 0.49} L ${width * 0.37} ${height * 0.48} L ${width * 0.43} ${height * 0.68} Z" fill="#d9b27d" />
          <path d="M ${width * 0.57} ${height * 0.68} L ${width * 0.63} ${height * 0.48} L ${width * 0.70} ${height * 0.49} L ${width * 0.76} ${height * 0.68} Z" fill="#d9b27d" />
          <path d="M ${width * 0.34} ${height * 0.48} L ${width * 0.50} ${height * 0.44} L ${width * 0.66} ${height * 0.48} L ${width * 0.61} ${height * 0.71} L ${width * 0.39} ${height * 0.71} Z" fill="#1f2937" />
          <path d="M ${width * 0.43} ${height * 0.49} L ${width * 0.50} ${height * 0.60} L ${width * 0.57} ${height * 0.49}" fill="none" stroke="#d8c3a1" stroke-width="${Math.max(4, width * 0.004)}" stroke-linecap="round" />
          <circle cx="${width * 0.50}" cy="${height * 0.57}" r="${Math.min(width, height) * 0.011}" fill="#d9b27d" />
          <circle cx="${width * 0.50}" cy="${height * 0.63}" r="${Math.min(width, height) * 0.011}" fill="#d9b27d" />
        `
        : ""
    }
    ${
      garment === "streetwear"
        ? `
          <path d="M ${width * 0.30} ${height * 0.70} L ${width * 0.34} ${height * 0.51} L ${width * 0.43} ${height * 0.47} L ${width * 0.57} ${height * 0.47} L ${width * 0.66} ${height * 0.51} L ${width * 0.70} ${height * 0.70} Z" fill="#111827" />
          <path d="M ${width * 0.40} ${height * 0.50} Q ${width * 0.50} ${height * 0.39} ${width * 0.60} ${height * 0.50}" fill="#374151" />
          <rect x="${width * 0.44}" y="${height * 0.58}" width="${width * 0.12}" height="${height * 0.07}" rx="${height * 0.012}" fill="#f59e0b" />
          <rect x="${width * 0.18}" y="${height * 0.53}" width="${width * 0.10}" height="${height * 0.18}" rx="${height * 0.022}" fill="#4b5563" />
          <rect x="${width * 0.72}" y="${height * 0.53}" width="${width * 0.10}" height="${height * 0.18}" rx="${height * 0.022}" fill="#4b5563" />
        `
        : ""
    }
    ${
      garment === "kurta"
        ? `
          <path d="M ${width * 0.36} ${height * 0.45} L ${width * 0.50} ${height * 0.40} L ${width * 0.64} ${height * 0.45} L ${width * 0.61} ${height * 0.73} L ${width * 0.39} ${height * 0.73} Z" fill="#0f766e" />
          <path d="M ${width * 0.28} ${height * 0.68} L ${width * 0.34} ${height * 0.47} L ${width * 0.39} ${height * 0.48} L ${width * 0.36} ${height * 0.71} Z" fill="#0f766e" />
          <path d="M ${width * 0.72} ${height * 0.68} L ${width * 0.66} ${height * 0.47} L ${width * 0.61} ${height * 0.48} L ${width * 0.64} ${height * 0.71} Z" fill="#0f766e" />
          <rect x="${width * 0.47}" y="${height * 0.48}" width="${width * 0.06}" height="${height * 0.15}" rx="${height * 0.012}" fill="#f8fafc" fill-opacity="0.30" />
          <circle cx="${width * 0.50}" cy="${height * 0.52}" r="${Math.min(width, height) * 0.010}" fill="#fcd34d" />
          <circle cx="${width * 0.50}" cy="${height * 0.56}" r="${Math.min(width, height) * 0.010}" fill="#fcd34d" />
          <circle cx="${width * 0.50}" cy="${height * 0.60}" r="${Math.min(width, height) * 0.010}" fill="#fcd34d" />
        `
        : ""
    }
    ${
      garment === "activewear"
        ? `
          <path d="M ${width * 0.34} ${height * 0.46} L ${width * 0.46} ${height * 0.44} L ${width * 0.54} ${height * 0.44} L ${width * 0.66} ${height * 0.46} L ${width * 0.61} ${height * 0.70} L ${width * 0.39} ${height * 0.70} Z" fill="#7c3aed" />
          <path d="M ${width * 0.30} ${height * 0.68} L ${width * 0.34} ${height * 0.47} L ${width * 0.39} ${height * 0.48} L ${width * 0.37} ${height * 0.70} Z" fill="#a78bfa" />
          <path d="M ${width * 0.70} ${height * 0.68} L ${width * 0.66} ${height * 0.47} L ${width * 0.61} ${height * 0.48} L ${width * 0.63} ${height * 0.70} Z" fill="#a78bfa" />
          <path d="M ${width * 0.46} ${height * 0.44} Q ${width * 0.50} ${height * 0.37} ${width * 0.54} ${height * 0.44}" fill="#c4b5fd" />
          <path d="M ${width * 0.40} ${height * 0.58} Q ${width * 0.50} ${height * 0.54} ${width * 0.60} ${height * 0.58}" fill="none" stroke="#ffffff" stroke-width="${Math.max(4, width * 0.0035)}" stroke-linecap="round" />
        `
        : ""
    }
    ${
      garment === "denim"
        ? `
          <path d="M ${width * 0.38} ${height * 0.44} L ${width * 0.50} ${height * 0.41} L ${width * 0.62} ${height * 0.44} L ${width * 0.57} ${height * 0.71} L ${width * 0.43} ${height * 0.71} Z" fill="#1d4ed8" />
          <path d="M ${width * 0.30} ${height * 0.68} L ${width * 0.35} ${height * 0.48} L ${width * 0.40} ${height * 0.49} L ${width * 0.37} ${height * 0.71} Z" fill="#2563eb" />
          <path d="M ${width * 0.70} ${height * 0.68} L ${width * 0.65} ${height * 0.48} L ${width * 0.60} ${height * 0.49} L ${width * 0.63} ${height * 0.71} Z" fill="#2563eb" />
          <line x1="${width * 0.50}" y1="${height * 0.45}" x2="${width * 0.50}" y2="${height * 0.70}" stroke="#93c5fd" stroke-width="${Math.max(3, width * 0.0025)}" />
          <line x1="${width * 0.43}" y1="${height * 0.49}" x2="${width * 0.57}" y2="${height * 0.49}" stroke="#93c5fd" stroke-width="${Math.max(3, width * 0.0025)}" />
          <circle cx="${width * 0.50}" cy="${height * 0.56}" r="${Math.min(width, height) * 0.010}" fill="#f8fafc" />
        `
        : ""
    }
    <rect x="${width * 0.22}" y="${height * 0.79}" width="${width * 0.56}" height="${height * 0.09}" rx="${height * 0.03}" fill="#111827" />
    <text x="${width / 2}" y="${height * 0.845}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.round(width * 0.026)}" font-weight="700" fill="#f5d38a">${cta}</text>
  </svg>
`);

export const demoCreativeImages: Record<DemoPlatformId, string> = {
  instagram: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&fm=jpg&q=80&w=1600",
  facebook: "https://images.unsplash.com/photo-1740991314265-0e9866183cce?auto=format&fit=crop&fm=jpg&q=80&w=1800",
  whatsapp: "https://images.unsplash.com/photo-1578854955076-970394ef2512?auto=format&fit=crop&fm=jpg&q=80&w=1600",
  website: "https://images.unsplash.com/photo-1586396847415-2c76ae7e79fc?auto=format&fit=crop&fm=jpg&q=80&w=1800",
};

const bonusDenimCreative = "https://images.unsplash.com/photo-1611955874253-78c6c3959c41?auto=format&fit=crop&fm=jpg&q=80&w=1600";

export const demoLibrarySessions: DemoChatSession[] = [
  {
    id: "library-instagram",
    title: "Thread & Tone Launch",
    createdAtLabel: "2 hours ago",
    platformId: "instagram",
    messages: [
      { id: "library-instagram-welcome", role: "assistant", text: "I kept your garment launch thread here so you can continue refining it anytime.", platformId: "instagram" },
      { id: "library-instagram-user", role: "user", text: "Make the Instagram ad feel premium and tailored for jackets.", platformId: "instagram" },
      { id: "library-instagram-assistant", role: "assistant", text: "I refreshed the Instagram version with a premium wardrobe look and sharper apparel positioning.", platformId: "instagram" },
      { id: "library-instagram-creative", role: "assistant", text: "Premium garment Instagram creative ready.", platformId: "instagram", kind: "creative", creativeId: "creative-library-instagram" },
    ],
  },
  {
    id: "library-facebook",
    title: "City Layers Banner",
    createdAtLabel: "5 hours ago",
    platformId: "facebook",
    messages: [
      { id: "library-facebook-welcome", role: "assistant", text: "This saved Facebook apparel campaign can be reopened from the library anytime.", platformId: "facebook" },
      { id: "library-facebook-user", role: "user", text: "Create a wide Facebook banner for the new streetwear drop.", platformId: "facebook" },
      { id: "library-facebook-assistant", role: "assistant", text: "I generated a wider Facebook garment banner built around the new streetwear collection.", platformId: "facebook" },
      { id: "library-facebook-creative", role: "assistant", text: "Wide Facebook garment banner ready.", platformId: "facebook", kind: "creative", creativeId: "creative-library-facebook" },
    ],
  },
  {
    id: "library-whatsapp",
    title: "Silk Route Story",
    createdAtLabel: "1 day ago",
    platformId: "whatsapp",
    messages: [
      { id: "library-whatsapp-welcome", role: "assistant", text: "Your vertical festive-wear ad is saved with the full chat thread.", platformId: "whatsapp" },
      { id: "library-whatsapp-user", role: "user", text: "Make this one vertical for WhatsApp status and keep it elegant.", platformId: "whatsapp" },
      { id: "library-whatsapp-assistant", role: "assistant", text: "I converted the garment layout into a vertical story-style festive wear ad.", platformId: "whatsapp" },
      { id: "library-whatsapp-creative", role: "assistant", text: "Vertical WhatsApp garment story ready.", platformId: "whatsapp", kind: "creative", creativeId: "creative-library-whatsapp" },
    ],
  },
  {
    id: "library-website",
    title: "Move Mode Hero",
    createdAtLabel: "1 day ago",
    platformId: "website",
    messages: [
      { id: "library-website-welcome", role: "assistant", text: "Your homepage apparel hero is saved here with the campaign notes.", platformId: "website" },
      { id: "library-website-user", role: "user", text: "Create a website hero banner for the activewear collection.", platformId: "website" },
      { id: "library-website-assistant", role: "assistant", text: "I prepared a website garment hero with a cleaner activewear presentation.", platformId: "website" },
      { id: "library-website-creative", role: "assistant", text: "Website hero apparel creative ready.", platformId: "website", kind: "creative", creativeId: "creative-library-website" },
    ],
  },
  {
    id: "library-denim",
    title: "Denim Reset Story",
    createdAtLabel: "2 days ago",
    platformId: "instagram",
    messages: [
      { id: "library-denim-welcome", role: "assistant", text: "This denim refresh concept stays here so you can iterate on it later.", platformId: "instagram" },
      { id: "library-denim-user", role: "user", text: "Give me one more casual garment ad focused on denim layering.", platformId: "instagram" },
      { id: "library-denim-assistant", role: "assistant", text: "I created an extra denim-focused concept so the library has another custom apparel direction.", platformId: "instagram" },
      { id: "library-denim-creative", role: "assistant", text: "Denim-focused Instagram concept ready.", platformId: "instagram", kind: "creative", creativeId: "creative-library-denim" },
    ],
  },
];

export const demoLibraryCreatives: DemoCreativeItem[] = [
  {
    id: "creative-library-instagram",
    sessionId: "library-instagram",
    platformId: "instagram",
    title: "Thread & Tone Launch",
    type: "FEED",
    caption: "Premium Instagram garment ad for the tailored outerwear campaign.",
    version: 3,
    createdAtLabel: "2 hours ago",
    imageUrl: demoCreativeImages.instagram,
  },
  {
    id: "creative-library-facebook",
    sessionId: "library-facebook",
    platformId: "facebook",
    title: "City Layers Banner",
    type: "FEED",
    caption: "Facebook garment banner for the streetwear collection drop.",
    version: 2,
    createdAtLabel: "5 hours ago",
    imageUrl: demoCreativeImages.facebook,
  },
  {
    id: "creative-library-whatsapp",
    sessionId: "library-whatsapp",
    platformId: "whatsapp",
    title: "Silk Route Story",
    type: "STATUS",
    caption: "Vertical WhatsApp garment story for festive wear promotion.",
    version: 4,
    createdAtLabel: "1 day ago",
    imageUrl: demoCreativeImages.whatsapp,
  },
  {
    id: "creative-library-website",
    sessionId: "library-website",
    platformId: "website",
    title: "Move Mode Hero",
    type: "BANNER",
    caption: "Website hero garment creative for the activewear collection.",
    version: 2,
    createdAtLabel: "1 day ago",
    imageUrl: demoCreativeImages.website,
  },
  {
    id: "creative-library-denim",
    sessionId: "library-denim",
    platformId: "instagram",
    title: "Denim Reset Story",
    type: "STORY",
    caption: "Additional Instagram garment concept focused on casual denim layering.",
    version: 1,
    createdAtLabel: "2 days ago",
    imageUrl: bonusDenimCreative,
  },
];
