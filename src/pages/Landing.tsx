import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Layers3, Sparkles, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const landingImages = [
  new URL("../../Images/photo-1583433306546-ded68847fd0d.avif", import.meta.url).href,
  new URL("../../Images/photo-1621444551610-91ee643265bf.avif", import.meta.url).href,
  new URL("../../Images/photo-1639214814964-02dff5911e4b.avif", import.meta.url).href,
  new URL("../../Images/photo-1653152707179-125e4e184a0b.avif", import.meta.url).href,
  new URL("../../Images/photo-1653994455748-4b186b6b4e6e.avif", import.meta.url).href,
  new URL("../../Images/photo-1675469674130-7097cc55f049.avif", import.meta.url).href,
  new URL("../../Images/photo-1718251190985-75ba78b97325.avif", import.meta.url).href,
  new URL("../../Images/photo-1768089499977-b0cf36a14f78.avif", import.meta.url).href,
  new URL("../../Images/premium_photo-1715876232760-919ab08cee63.avif", import.meta.url).href,
  new URL("../../Images/premium_photo-1715876268300-1b7d9ef7d96b.avif", import.meta.url).href,
];

const heroCards = [
  {
    title: "Studio Editorial",
    image: landingImages[0],
    tag: "Editorial",
  },
  {
    title: "Soft Couture",
    image: landingImages[1],
    tag: "Luxury",
  },
  {
    title: "Runway Portrait",
    image: landingImages[2],
    tag: "Runway",
  },
  {
    title: "Street Look",
    image: landingImages[3],
    tag: "Streetwear",
  },
  {
    title: "Menswear Drop",
    image: landingImages[4],
    tag: "Menswear",
  },
  {
    title: "Campaign Energy",
    image: landingImages[5],
    tag: "Live Visual",
  },
  {
    title: "Studio Motion",
    image: landingImages[6],
    tag: "Studio",
  },
  {
    title: "Style Focus",
    image: landingImages[7],
    tag: "Lookbook",
  },
  {
    title: "Premium Portrait",
    image: landingImages[8],
    tag: "Premium",
  },
  {
    title: "Drop Preview",
    image: landingImages[9],
    tag: "Collection",
  },
];

const sections = [
  {
    icon: Wand2,
    title: "Generate Premium Fashion Ads",
    description: "Turn one creative brief into polished model ads, garment launch visuals, and platform-ready campaign concepts.",
    color: "text-[#ffd7a6]",
  },
  {
    icon: Layers3,
    title: "Rotate Formats Automatically",
    description: "Create square posts, wide banners, vertical stories, and website heroes with one design language across all placements.",
    color: "text-[#ffb56b]",
  },
  {
    icon: Sparkles,
    title: "Keep The Brand Feel Consistent",
    description: "Match garment moodboards, styling direction, and premium ad tone without rebuilding the creative every time.",
    color: "text-[#ffe3ca]",
  },
];

const proofItems = [
  "Garment campaign visuals",
  "Model-led ad generation",
  "Instagram, Meta, WhatsApp, website",
  "Luxury, streetwear, festive, editorial",
];

const landingStats = [
  { label: "Campaign-ready looks", value: "40+" },
  { label: "Supported ad outputs", value: "12" },
  { label: "Avg. concept time", value: "< 2 min" },
];

const Landing = () => {
  const [flowOffset, setFlowOffset] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const marqueeCards = useMemo(() => [...heroCards, ...heroCards, ...heroCards], []);
  const activeCard = Math.floor(flowOffset / 18) % heroCards.length;
  const heroCenterX = 50;
  const heroCenterY = 31;
  const heroRadius = 39;

  useEffect(() => {
    const flowTimer = window.setInterval(() => {
      setFlowOffset((current) => (current + 1.15) % 360);
    }, 40);

    const mobileTimer = window.setInterval(() => {
      setMobileIndex((current) => (current + 1) % heroCards.length);
    }, 2200);

    return () => {
      window.clearInterval(flowTimer);
      window.clearInterval(mobileTimer);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#20120d_0%,#120d0b_30%,#090807_100%)] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.50),transparent_16%),radial-gradient(circle_at_left_center,rgba(180,83,9,0.26),transparent_24%),radial-gradient(circle_at_top_right,rgba(120,53,15,0.22),transparent_20%),radial-gradient(circle_at_bottom_left,rgba(251,146,60,0.20),transparent_24%),linear-gradient(180deg,#26150e_0%,#17100c_26%,#0d0a09_54%,#090807_100%)]" />
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,188,120,0.65)_1.05px,transparent_1.05px)] [background-size:12px_12px]" />
        <div className="absolute inset-y-0 left-0 w-[32%] bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.20),transparent_48%)]" />
        <div className="absolute inset-y-0 right-0 w-[18%] bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.12),transparent_40%)]" />
      </div>

      <main className="relative px-4 pb-12 pt-8 sm:px-6">
        <Navbar />

        <section id="hero" className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.2rem] border border-[#f7b26d]/60 bg-[linear-gradient(180deg,rgba(14,14,14,0.72)_0%,rgba(8,8,8,0.84)_100%)] shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-[2px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.16),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(0,0,0,0)_18%,rgba(0,0,0,0)_100%)]" />
            <div className="pointer-events-none absolute inset-0 rounded-[2.2rem] border border-white/10" />

            <div className="relative px-5 pb-10 pt-24 sm:px-8 sm:pb-12 sm:pt-28">
              <div className="relative z-20 mx-auto mt-10 max-w-5xl text-center sm:mt-12">
                <div className="pointer-events-none absolute left-1/2 top-[9.5rem] h-[18rem] w-[44rem] max-w-full -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.16)_0%,rgba(249,115,22,0.07)_28%,transparent_68%)] blur-3xl" />
                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                  <motion.h1
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative mx-auto mt-20 max-w-5xl text-5xl font-extrabold leading-[0.88] sm:mt-20 sm:text-[6.8rem]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <span className="absolute inset-x-0 top-0 -z-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.18),rgba(247,178,109,0.28),rgba(255,255,255,0.12))] bg-clip-text text-transparent blur-[10px]">
                      Fashion's
                      <br />
                      Ad Creative Studio
                    </span>
                    <span className="text-white [text-shadow:0_4px_28px_rgba(255,255,255,0.12)]">Fashion's</span>
                    <br />
                    <span className="bg-[linear-gradient(90deg,#ffffff_0%,#fff1de_36%,#f7b26d_76%,#ffb257_100%)] bg-clip-text text-transparent [text-shadow:0_8px_32px_rgba(247,178,109,0.16)]">
                      Ad Creative Studio
                    </span>
                  </motion.h1>
                  <motion.p
                    animate={{ opacity: [0.84, 1, 0.84] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/68 sm:text-lg"
                  >
                    Create garment launch ads, model campaign visuals, and premium fashion creatives for Instagram, Meta, WhatsApp, and web in one place.
                  </motion.p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.1 }}
                  className="mt-8 flex justify-center"
                >
                  <Link to="/dashboard" className="inline-flex min-w-[220px] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/[0.08]">
                    Join the Waitlist
                  </Link>
                </motion.div>
              </div>

              <div className="pointer-events-none absolute inset-x-0 top-[8.4rem] z-0 hidden h-[21rem] sm:block">
                {heroCards.map((card, index) => {
                  const baseAngle = -186 + index * 36;
                  const angle = ((baseAngle + flowOffset) * Math.PI) / 180;
                  const x = heroCenterX + heroRadius * Math.cos(angle);
                  const y = heroCenterY + 28 * Math.sin(angle);
                  const depth = Math.max(0, 1 - Math.abs(Math.cos(angle)) * 0.88);
                  const size = 96 + depth * 46;
                  const zIndex = Math.round(depth * 12);
                  const lift = (1 - depth) * 56;
                  const rotateX = 22 - depth * 18;
                  const shadow = 26 + depth * 24;

                  return (
                    <div
                      key={card.title}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        width: `${size}px`,
                        height: `${size}px`,
                        rotate: `${-Math.cos(angle) * 19}deg`,
                        zIndex,
                        transform: `translate(-50%, -50%) perspective(1100px) rotateX(${rotateX}deg) scale(${0.76 + depth * 0.24}) translateY(${lift}px)`,
                        boxShadow: `0 ${shadow}px ${shadow * 1.8}px rgba(0,0,0,0.34), 0 0 0 1px rgba(255,255,255,0.04)`,
                      }}
                      className="absolute rounded-[2rem] border border-[#4d6fb4]/35 bg-[#0d1017] p-2 transition-all duration-75"
                    >
                      <div className="h-full w-full overflow-hidden rounded-[1.55rem] ring-1 ring-[#7aa1ff]/15">
                        <img src={card.image} alt={card.title} className="h-full w-full object-cover" />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 sm:mt-[3.75rem]">
                <div className="mx-auto max-w-[290px] rounded-[2rem] border border-white/10 bg-white/[0.05] p-2 shadow-[0_24px_70px_rgba(0,0,0,0.35)] sm:hidden">
                  <img src={heroCards[mobileIndex].image} alt={heroCards[mobileIndex].title} className="h-[280px] w-full rounded-[1.5rem] object-cover" />
                </div>

                <div className="mt-5 flex items-center justify-center gap-2">
                  {heroCards.map((card, index) => (
                    <div
                      key={card.title}
                      className={`h-2.5 rounded-full transition-all ${activeCard === index ? "w-10 bg-[#f7b26d]" : "w-2.5 bg-white/25"}`}
                    />
                  ))}
                </div>

                <div className="mx-auto mt-4 hidden max-w-6xl overflow-hidden sm:block">
                  <motion.div
                    animate={{ x: ["0%", "-33.333%"] }}
                    transition={{ duration: 24, ease: "linear", repeat: Infinity }}
                    className="flex w-[300%] gap-5"
                  >
                    {marqueeCards.map((card, index) => (
                      <div key={`${card.title}-${index}`} className="flex w-[16.666%] items-center gap-4 rounded-[1.8rem] border border-white/10 bg-white/[0.05] px-5 py-5">
                        <div className="h-24 w-24 overflow-hidden rounded-[1.2rem] border border-white/10">
                          <img src={card.image} alt={card.title} className="h-full w-full object-cover" />
                        </div>
                        <div className="min-w-0 text-left">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-[#f7b26d]">{card.tag}</p>
                          <p className="truncate text-lg font-medium text-white">{card.title}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>

                <div className="mx-auto mt-4 max-w-5xl">
                  <div className="grid gap-3 sm:grid-cols-3">
                    {landingStats.map((item) => (
                      <div key={item.label} className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] px-5 py-4 text-left backdrop-blur-md">
                        <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.value}</p>
                        <p className="mt-1 text-sm text-white/58">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-center">
                {proofItems.map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/58">
                    <CheckCircle2 size={13} className="text-[#f7b26d]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="platform" className="relative mx-auto mt-8 max-w-6xl">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_34%)]" />
          <div className="grid gap-5 md:grid-cols-3">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(34,24,18,0.72)_0%,rgba(15,15,15,0.92)_100%)] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f97316]/12 text-[#fb923c]">
                  <section.icon size={22} />
                </div>
                <h2 className={`mt-5 text-2xl font-bold ${section.color}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {section.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-white/60">{section.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="gallery" className="relative mx-auto mt-8 max-w-6xl">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.08),transparent_35%)]" />
          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(42,28,19,0.58)_0%,rgba(12,11,10,0.95)_100%)] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.22em] text-[#f7b26d]">Campaign Preview</p>
              <h3 className="mt-3 text-4xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <span className="text-white">A landing page theme built for</span>{" "}
                <span className="text-[#f7b26d]">fashion-first creative work.</span>
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">
                Keep the frontend tight and visual: strong art direction, compact sections, moving campaign cards, and premium fashion imagery instead of generic SaaS blocks.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {heroCards.slice(0, 3).map((item) => (
                  <div key={item.title} className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/5 p-2">
                    <img src={item.image} alt={item.title} className="h-40 w-full rounded-[1rem] object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div id="workflow" className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(35,24,18,0.54)_0%,rgba(12,11,10,0.95)_100%)] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.22em] text-[#f7b26d]">Workflow</p>
              <div className="mt-5 space-y-4">
                {[
                  "Upload garment or model assets",
                  "Choose ad platforms and campaign style",
                  "Generate rotating fashion creatives instantly",
                ].map((step, index) => (
                  <div key={step} className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] px-4 py-4">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Step 0{index + 1}</p>
                    <p className="mt-2 text-base font-medium text-white">{step}</p>
                  </div>
                ))}
              </div>
              <Link to="/create-ad" className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-white/80 transition-all hover:border-white/20 hover:bg-white/5 hover:text-white">
                Build Your First Fashion Ad
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section id="contact" className="relative mx-auto mt-8 max-w-5xl">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_bottom_left,rgba(251,146,60,0.08),transparent_35%)]" />
          <div className="rounded-[2rem] border border-[#f7b26d]/25 bg-[linear-gradient(180deg,rgba(46,29,19,0.52)_0%,rgba(11,10,9,0.96)_100%)] px-6 py-10 text-center shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.22em] text-[#f7b26d]">Ready To Launch</p>
            <h3 className="mt-4 text-4xl font-bold sm:text-5xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <span className="text-white">Make your fashion ad platform feel like</span>{" "}
              <span className="text-[#f7b26d]">a real campaign brand.</span>
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/60">
              Start with this premium frontend now, then we can replace the demo visuals with your own garment or model photography whenever you send them.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02]">
                Open Dashboard
                <ArrowRight size={16} />
              </Link>
              <Link to="/create-ad" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm text-white/78 transition-all hover:border-white/20 hover:bg-white/5 hover:text-white">
                Create First Ad
              </Link>
            </div>
          </div>
        </section>

        <footer className="mx-auto mt-8 max-w-6xl px-2 pb-4 pt-2 text-center text-sm text-white/40">
          © 2026 Adlyrix. Built for garment and model advertisement generation.
        </footer>
      </main>
    </div>
  );
};

export default Landing;
