import { Layers3, Play, Sparkles, Trophy, type LucideIcon } from "lucide-react";

type ProjectStat = {
  label: string;
  value: string;
};

type ProjectPillar = {
  title: string;
  description: string;
};

type ProjectPhase = {
  name: string;
  summary: string;
};

export type PreviousWorkProject = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  metric: string;
  detail: string;
  accent: string;
  icon: LucideIcon;
  client: string;
  duration: string;
  audience: string;
  channels: string[];
  headline: string;
  overview: string;
  challenge: string;
  solution: string;
  testimonial: string;
  deliverables: string[];
  stats: ProjectStat[];
  pillars: ProjectPillar[];
  phases: ProjectPhase[];
};

export const previousWorkProjects: PreviousWorkProject[] = [
  {
    slug: "luxury-watch-launch",
    title: "Luxury Watch Launch",
    category: "Meta Performance",
    summary: "Short-form creative system built for premium audiences with sharp hooks, social proof, and polished product framing.",
    metric: "4.8x ROAS",
    detail: "Retention improved 31%",
    accent: "from-[#f7b26d]/25 via-[#f08a3f]/10 to-transparent",
    icon: Trophy,
    client: "Atelier Chronos",
    duration: "8-week launch sprint",
    audience: "Affluent style-conscious buyers aged 28-44",
    channels: ["Instagram Reels", "Facebook Ads", "Landing Experience"],
    headline: "Premium storytelling repositioned the drop from product release to status statement.",
    overview: "The project centered on turning a highly crafted watch collection into a campaign system that felt luxurious at every touchpoint, from first impression to checkout.",
    challenge: "The brand had exceptional product quality but an undifferentiated paid presence. Ads were technically polished, yet they lacked a point of view strong enough to justify premium pricing.",
    solution: "We rebuilt the funnel around aspiration, craftsmanship, and scarcity. Visuals leaned cinematic, copy emphasized ownership psychology, and the landing experience mirrored the prestige cues introduced in the ads.",
    testimonial: "The campaign finally made our creative feel as elevated as the product itself, and revenue moved immediately.",
    deliverables: ["Launch strategy deck", "Six short-form ad variants", "Premium landing page direction", "Offer framing and retention messaging"],
    stats: [
      { label: "ROAS", value: "4.8x" },
      { label: "CTR Lift", value: "+24%" },
      { label: "Retention", value: "+31%" },
    ],
    pillars: [
      { title: "Status-Led Positioning", description: "Shifted product framing from feature-heavy to identity-driven luxury ownership." },
      { title: "Cinematic Creative System", description: "Designed motion, typography, and pacing that made each ad feel editorial rather than promotional." },
      { title: "High-Intent Funnel Alignment", description: "Matched ad promise and landing-page proof so premium interest converted without friction." },
    ],
    phases: [
      { name: "Discovery", summary: "Mapped buyer psychology, category clichés, and price-objection patterns." },
      { name: "Creative Direction", summary: "Built visual references, scripting structure, and modular premium hooks." },
      { name: "Launch and Learn", summary: "Released concept clusters, read early signal quality, and doubled down on high-intent variants." },
    ],
  },
  {
    slug: "d2c-skincare-rebrand",
    title: "D2C Skincare Rebrand",
    category: "Creative Refresh",
    summary: "A full visual refresh pairing testimonial-led storytelling with clean ingredient-first product compositions.",
    metric: "1.9M Views",
    detail: "CTR climbed 22%",
    accent: "from-[#f6d365]/20 via-[#fda085]/10 to-transparent",
    icon: Sparkles,
    client: "Luma Skin Co.",
    duration: "6-week rebrand rollout",
    audience: "Ingredient-aware skincare buyers seeking premium simplicity",
    channels: ["TikTok", "Instagram Stories", "Product Detail Pages"],
    headline: "The rebrand created a cleaner, more trusted visual system without sacrificing performance energy.",
    overview: "This work repositioned a fast-growing skincare brand with creative that felt calmer, smarter, and more premium while still converting in high-volume channels.",
    challenge: "The old visual language was loud and discount-coded, which undermined trust in a category where buyer confidence matters as much as product efficacy.",
    solution: "We introduced ingredient-forward compositions, lighter narrative pacing, and social-proof modules that made performance claims feel reassuring rather than aggressive.",
    testimonial: "People started describing the brand as elevated instead of trendy, and paid results improved with it.",
    deliverables: ["Rebrand creative kit", "UGC scripting framework", "Product claim hierarchy", "Story and feed ad set"],
    stats: [
      { label: "Views", value: "1.9M" },
      { label: "CTR", value: "+22%" },
      { label: "Add-to-Cart", value: "+17%" },
    ],
    pillars: [
      { title: "Trust Through Clarity", description: "Simplified visual communication so ingredient and benefit claims landed with confidence." },
      { title: "Testimonial Architecture", description: "Structured proof moments to appear naturally across every paid asset." },
      { title: "Premium Consistency", description: "Unified packaging, page design, and ad direction into one polished consumer-facing system." },
    ],
    phases: [
      { name: "Audit", summary: "Evaluated where the old brand language signaled low trust or low value." },
      { name: "Refresh", summary: "Rebuilt tone, color treatment, and story framing for a cleaner premium feel." },
      { name: "Performance Rollout", summary: "Scaled winning narratives across story placements and product-led retargeting." },
    ],
  },
  {
    slug: "saas-demo-funnel",
    title: "SaaS Demo Funnel",
    category: "Lead Gen",
    summary: "Benefit-driven ad set focused on demo requests, featuring UI-led motion, bold claims, and proof-backed copy.",
    metric: "38% CPL Drop",
    detail: "Demo bookings doubled",
    accent: "from-[#fdc830]/20 via-[#f37335]/10 to-transparent",
    icon: Layers3,
    client: "FlowPilot",
    duration: "10-week funnel build",
    audience: "Operations leaders and growth teams at mid-market SaaS companies",
    channels: ["LinkedIn", "Meta", "Demo Landing Pages"],
    headline: "A sharper narrative turned a generic software pitch into a credible growth system for serious buyers.",
    overview: "The work combined product education, commercial clarity, and proof-led creative to lower friction across the demo request journey.",
    challenge: "The brand had solid feature depth but weak differentiation. Prospects saw functionality, not urgency, and cost per lead kept rising.",
    solution: "We reframed the offer around time saved, team control, and measurable commercial outcomes, then supported those claims with UI moments and strong proof sequencing.",
    testimonial: "The funnel finally spoke in business outcomes instead of feature lists, and the quality of demo requests jumped.",
    deliverables: ["Lead-gen campaign narrative", "UI motion storyboard", "Landing page structure", "Sales-proof messaging modules"],
    stats: [
      { label: "CPL", value: "-38%" },
      { label: "Demo Rate", value: "2.1x" },
      { label: "SQL Quality", value: "+26%" },
    ],
    pillars: [
      { title: "Outcome-First Messaging", description: "Prioritized business impact over software mechanics to make the value obvious faster." },
      { title: "Proof-Backed Flow", description: "Used mini-case studies and quantified claims to reduce skepticism from higher-intent buyers." },
      { title: "Product in Motion", description: "Turned interface moments into persuasive visual evidence instead of static screenshots." },
    ],
    phases: [
      { name: "Positioning", summary: "Clarified commercial promise, ideal buyer pains, and objection handling." },
      { name: "Funnel Design", summary: "Paired ad narratives with role-specific landing page pathways." },
      { name: "Optimization", summary: "Reduced CPL by tightening proof modules and simplifying booking intent." },
    ],
  },
  {
    slug: "resort-summer-campaign",
    title: "Resort Summer Campaign",
    category: "Seasonal Launch",
    summary: "A cinematic destination campaign designed for high-intent travelers across stories, reels, and landing experiences.",
    metric: "92% Sell Through",
    detail: "Bookings peaked in 12 days",
    accent: "from-[#f7b26d]/20 via-[#ff9966]/10 to-transparent",
    icon: Play,
    client: "Casa Sol Marina",
    duration: "4-week seasonal push",
    audience: "Luxury leisure travelers and couples planning premium getaways",
    channels: ["Instagram", "Meta", "Booking Landing Pages"],
    headline: "The campaign sold atmosphere before inventory, turning the property into an emotional destination.",
    overview: "Rather than promoting room availability, the work sold a lifestyle experience with cinematic social assets and an immersive booking narrative.",
    challenge: "The resort depended too heavily on standard hospitality imagery, which made it blend into a crowded seasonal market.",
    solution: "We built a story around escape, pace, and exclusivity. The visuals prioritized mood and anticipation, while the booking page distilled urgency without feeling transactional.",
    testimonial: "It felt like we were marketing a world, not just a property, and that changed conversion quality instantly.",
    deliverables: ["Seasonal hero campaign", "Stories and reel package", "Booking page visual direction", "Offer urgency system"],
    stats: [
      { label: "Sell Through", value: "92%" },
      { label: "Booking Window", value: "12 days" },
      { label: "Average Stay", value: "+18%" },
    ],
    pillars: [
      { title: "Destination Storytelling", description: "Made each creative asset feel like an invitation into a high-end travel experience." },
      { title: "Urgency Without Discounting", description: "Created momentum around availability and timing while preserving premium brand value." },
      { title: "Immersive Continuity", description: "Connected ad mood directly to the booking journey for a seamless emotional arc." },
    ],
    phases: [
      { name: "Narrative Framing", summary: "Defined the emotional promise and premium travel cues that mattered most." },
      { name: "Asset Production", summary: "Developed story-first placements optimized for reels, stories, and conversion pages." },
      { name: "Launch Window", summary: "Timed urgency, demand shaping, and retargeting around the peak consideration period." },
    ],
  },
  {
    slug: "high-ticket-coaching-offer",
    title: "High-Ticket Coaching Offer",
    category: "Offer Positioning",
    summary: "A premium acquisition campaign that paired founder-led messaging with social authority cues and a precise call to action.",
    metric: "3.6x Pipeline",
    detail: "Lead quality improved 27%",
    accent: "from-[#ffd89b]/20 via-[#f7b26d]/10 to-transparent",
    icon: Trophy,
    client: "Northline Advisory",
    duration: "7-week client acquisition push",
    audience: "Founders and consultants ready to invest in premium transformation offers",
    channels: ["Meta", "YouTube", "Application Funnel"],
    headline: "Sharper authority framing turned attention into qualified pipeline instead of broad low-fit interest.",
    overview: "The project repositioned a coaching offer from inspirational to investable, with direct-response structure anchored in trust and specificity.",
    challenge: "Interest existed, but lead quality was inconsistent because the offer was being communicated too broadly and without enough authority signals.",
    solution: "We tightened founder-led hooks, proof layering, and application-page specificity so the right buyers self-selected earlier in the funnel.",
    testimonial: "The new creative made serious prospects feel understood before they even reached the application form.",
    deliverables: ["Founder-led ad narrative", "Application funnel messaging", "Offer proof stack", "Lead qualification angle set"],
    stats: [
      { label: "Pipeline", value: "3.6x" },
      { label: "Lead Quality", value: "+27%" },
      { label: "Apply Rate", value: "+21%" },
    ],
    pillars: [
      { title: "Authority Design", description: "Introduced credibility cues that made the premium price point feel earned and rational." },
      { title: "Selective Messaging", description: "Filtered out low-fit attention through more precise promise and pain articulation." },
      { title: "Application Readiness", description: "Aligned ad and funnel language so buyers arrived mentally prepared to commit." },
    ],
    phases: [
      { name: "Offer Tightening", summary: "Clarified promise, eligibility, and transformation language." },
      { name: "Creative Production", summary: "Built founder-led assets supported by proof and objection handling." },
      { name: "Qualification Tuning", summary: "Refined messaging to increase application fit and sales efficiency." },
    ],
  },
  {
    slug: "boutique-fashion-drop",
    title: "Boutique Fashion Drop",
    category: "Launch Creative",
    summary: "Visual storytelling designed for style-conscious audiences with editorial motion, rich texture, and high-contrast product focus.",
    metric: "64% Faster Sellout",
    detail: "Returning buyers rose 19%",
    accent: "from-[#f6c28b]/20 via-[#f08a3f]/10 to-transparent",
    icon: Sparkles,
    client: "Maison Vale",
    duration: "5-week capsule campaign",
    audience: "Trend-aware repeat shoppers who value exclusivity and editorial design",
    channels: ["Instagram Reels", "Email Launch", "Product Pages"],
    headline: "An editorial launch system made the drop feel collectible, not just seasonal.",
    overview: "The campaign blended fashion-story visuals with direct-response structure so the launch looked high-end without losing commercial sharpness.",
    challenge: "The collection had strong design language, but previous launch assets felt too flat to create urgency or repeat-buyer excitement.",
    solution: "We built a collectible-style story world around the drop, introduced tactile motion direction, and used tighter release sequencing to intensify demand.",
    testimonial: "It finally felt like a fashion event, and our returning customers responded exactly the way we hoped.",
    deliverables: ["Editorial concept system", "Launch email direction", "Social teaser suite", "Drop-day merchandising cues"],
    stats: [
      { label: "Sellout Speed", value: "+64%" },
      { label: "Repeat Buyers", value: "+19%" },
      { label: "Email CTR", value: "+28%" },
    ],
    pillars: [
      { title: "Editorial Identity", description: "Created a stronger visual point of view that matched the collection’s design credibility." },
      { title: "Demand Sequencing", description: "Built anticipation through layered teaser moments and timed reveal mechanics." },
      { title: "Commerce Meets Culture", description: "Balanced aesthetic polish with clear purchase triggers and launch momentum." },
    ],
    phases: [
      { name: "Concepting", summary: "Established the capsule’s visual world, tone, and release rhythm." },
      { name: "Launch Build", summary: "Developed cross-channel assets to support hype, reveal, and release-day conversion." },
      { name: "Release Execution", summary: "Coordinated inventory urgency, visual continuity, and repeat-buyer touchpoints." },
    ],
  },
];

export const previousWorkHighlights = [
  { label: "Premium Case Studies", value: "06" },
  { label: "Average Lift", value: "+29%" },
  { label: "Industries Covered", value: "11" },
];

export const getPreviousWorkBySlug = (slug?: string) =>
  previousWorkProjects.find((project) => project.slug === slug);
