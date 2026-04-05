import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Facebook,
  Globe,
  Instagram,
  MessageCircle,
  Monitor,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

type PlatformCard = {
  id: "instagram" | "facebook" | "whatsapp" | "website";
  name: string;
  icon: typeof Instagram;
  format: string;
  ratio: string;
  bestFor: string;
  tags: string[];
  previewClass: string;
  iconWrapClass: string;
  cardClass: string;
  previewToneClass: string;
  accentClass: string;
};

const platforms: PlatformCard[] = [
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    format: "1080 x 1080",
    ratio: "1:1",
    bestFor: "Mobile",
    tags: ["Feed", "Reels"],
    previewClass: "aspect-square",
    iconWrapClass: "bg-[#f97316]/12 text-[#ffd4a0] border-[#f7b26d]/30",
    cardClass:
      "border-[#7f4b27] bg-[linear-gradient(180deg,rgba(88,46,22,0.96)_0%,rgba(28,18,14,0.98)_100%)]",
    previewToneClass:
      "bg-[linear-gradient(180deg,rgba(251,146,60,0.22)_0%,rgba(180,83,9,0.10)_100%)]",
    accentClass: "shadow-[0_0_0_1px_rgba(249,115,22,0.18),0_18px_45px_rgba(249,115,22,0.16)]",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    format: "1200 x 628",
    ratio: "1.91:1",
    bestFor: "All devices",
    tags: ["Feed", "Desktop"],
    previewClass: "aspect-[1.91/1]",
    iconWrapClass: "bg-[#fff0de]/10 text-[#ffe0ba] border-[#f7b26d]/25",
    cardClass:
      "border-[#6a4d33] bg-[linear-gradient(180deg,rgba(76,49,28,0.96)_0%,rgba(26,18,14,0.98)_100%)]",
    previewToneClass:
      "bg-[linear-gradient(180deg,rgba(255,210,160,0.18)_0%,rgba(194,120,48,0.10)_100%)]",
    accentClass: "shadow-[0_0_0_1px_rgba(255,214,170,0.14),0_18px_45px_rgba(194,120,48,0.16)]",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: MessageCircle,
    format: "1080 x 1920",
    ratio: "9:16",
    bestFor: "Mobile",
    tags: ["Status", "Vertical"],
    previewClass: "aspect-[9/16]",
    iconWrapClass: "bg-[#fb923c]/12 text-[#ffd6a1] border-[#fb923c]/28",
    cardClass:
      "border-[#7a4a2e] bg-[linear-gradient(180deg,rgba(84,50,28,0.96)_0%,rgba(20,16,14,0.98)_100%)]",
    previewToneClass:
      "bg-[linear-gradient(180deg,rgba(253,186,116,0.16)_0%,rgba(180,83,9,0.10)_100%)]",
    accentClass: "shadow-[0_0_0_1px_rgba(251,146,60,0.16),0_18px_45px_rgba(180,83,9,0.16)]",
  },
  {
    id: "website",
    name: "Website",
    icon: Globe,
    format: "1200 x 628",
    ratio: "1.91:1",
    bestFor: "Desktop",
    tags: ["Banner", "Display"],
    previewClass: "aspect-[1.91/1]",
    iconWrapClass: "bg-[#f7b26d]/12 text-[#fff0de] border-[#f7b26d]/28",
    cardClass:
      "border-[#865230] bg-[linear-gradient(180deg,rgba(97,58,28,0.96)_0%,rgba(26,18,14,0.98)_100%)]",
    previewToneClass:
      "bg-[linear-gradient(180deg,rgba(255,225,198,0.20)_0%,rgba(180,83,9,0.10)_100%)]",
    accentClass: "shadow-[0_0_0_1px_rgba(247,178,109,0.18),0_18px_45px_rgba(180,83,9,0.16)]",
  },
];

const PlatformSelection = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<PlatformCard["id"] | null>(null);

  const selectedPlatform = platforms.find((platform) => platform.id === selected) ?? null;

  const handleContinue = () => {
    if (!selected) {
      return;
    }

    navigate("/image-upload", {
      state: {
        selectedPlatforms: [selected],
      },
    });
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] border border-[#6a4a30] bg-[linear-gradient(180deg,rgba(33,22,16,0.96)_0%,rgba(16,12,10,0.98)_100%)] shadow-[0_24px_80px_rgba(0,0,0,0.38)]">
          <div className="border-b border-[#4f3827] px-6 py-6 md:px-8">
            <p className="text-xs uppercase tracking-[0.28em] text-[#ffd9b0]/70">Step 1 of 4</p>
            <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Choose Your Platform</h1>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-white/66">
                  Pick one platform at a time. The creative preview and generated ad will follow this platform&apos;s
                  exact format, tone, and aspect ratio.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-[#f7b26d]/20 bg-[#f97316]/10 px-4 py-2 text-sm text-[#ffe2bf]">
                <Sparkles size={14} className="text-[#f7b26d]" />
                One platform per generation
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid gap-5 lg:grid-cols-4">
              {platforms.map((platform, index) => {
                const isSelected = selected === platform.id;
                const Icon = platform.icon;

                return (
                  <motion.button
                    key={platform.id}
                    type="button"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelected(platform.id)}
                    className={`relative overflow-hidden rounded-[1.6rem] border p-4 text-left transition-all duration-200 ${
                      isSelected
                        ? `${platform.cardClass} ${platform.accentClass} -translate-y-1`
                        : "border-[#4b3729] bg-[linear-gradient(180deg,#271b14_0%,#181210_100%)] hover:border-[#7a5637] hover:-translate-y-1"
                    }`}
                  >
                    <div className="absolute right-4 top-4">
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all ${
                          isSelected
                            ? "border-white/20 bg-white text-slate-900"
                            : "border-white/10 bg-white/5 text-transparent"
                        }`}
                      >
                        <Check size={14} />
                      </div>
                    </div>

                    <div
                      className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border ${platform.iconWrapClass}`}
                    >
                      <Icon size={20} />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-white">{platform.name}</h3>
                      <p className="text-xs uppercase tracking-[0.18em] text-white/52">{platform.bestFor}</p>
                    </div>

                    <div className="mt-5 rounded-[1.3rem] border border-white/10 bg-black/10 p-3">
                      <div
                        className={`mx-auto overflow-hidden rounded-[1rem] border border-white/10 ${platform.previewClass} ${platform.previewToneClass} ${
                          platform.id === "whatsapp" ? "w-[54%]" : "w-full"
                        }`}
                      >
                        <div className="flex h-full w-full items-center justify-center">
                          <Icon size={platform.id === "whatsapp" ? 30 : 26} className="text-white/55" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 space-y-2 text-xs text-white/78">
                      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/10 px-3 py-2">
                        <span>Format</span>
                        <span className="font-medium text-white">{platform.format}</span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/10 px-3 py-2">
                        <span>Ratio</span>
                        <span className="font-medium text-white">{platform.ratio}</span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/10 px-3 py-2">
                        <span>Best For</span>
                        <span className="font-medium text-white">{platform.bestFor}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {platform.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-slate-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-8 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[1.75rem] border border-[#4b3729] bg-[linear-gradient(180deg,#241811_0%,#16100d_100%)] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#f7b26d]/20 bg-[#f97316]/10 text-[#f7b26d]">
                    <Monitor size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Selected Platform</p>
                    <p className="text-xs text-white/48">
                      Only one platform can be selected, so the ad keeps the correct layout from the start.
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-[1.4rem] border border-dashed border-[#6a4b33] bg-[#130f0d] p-5">
                  {selectedPlatform ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${selectedPlatform.iconWrapClass}`}
                        >
                          <selectedPlatform.icon size={20} />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-white">{selectedPlatform.name}</p>
                          <p className="text-sm text-white/68">
                            The ad will generate in <span className="font-medium text-white">{selectedPlatform.ratio}</span>
                            {" "}ratio with <span className="font-medium text-white">{selectedPlatform.format}</span> sizing.
                          </p>
                        </div>
                      </div>
                      <div className="grid gap-3 md:grid-cols-3">
                        <div className="rounded-2xl border border-[#4b3729] bg-[#1a1411] px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.16em] text-white/44">Format</p>
                          <p className="mt-2 text-sm font-medium text-white">{selectedPlatform.format}</p>
                        </div>
                        <div className="rounded-2xl border border-[#4b3729] bg-[#1a1411] px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.16em] text-white/44">Ratio</p>
                          <p className="mt-2 text-sm font-medium text-white">{selectedPlatform.ratio}</p>
                        </div>
                        <div className="rounded-2xl border border-[#4b3729] bg-[#1a1411] px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.16em] text-white/44">Best For</p>
                          <p className="mt-2 text-sm font-medium text-white">{selectedPlatform.bestFor}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-white/68">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#4b3729] bg-[#1a1411]">
                        <Smartphone size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">No platform selected yet</p>
                        <p className="text-xs text-white/42">Choose one card above to continue.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-[#4b3729] bg-[linear-gradient(180deg,#241811_0%,#16100d_100%)] p-5">
                <p className="text-sm font-semibold text-white">How this works</p>
                <div className="mt-4 space-y-3">
                  {[
                    "Pick one platform now so the creative starts in the right visual ratio.",
                    "When you switch platforms later in chat refinement, the generated ad updates to that platform format.",
                    "Platform icons and colors now follow each brand more clearly for easier selection.",
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-[#4b3729] bg-[#1a1411] px-4 py-3 text-sm leading-7 text-white/66">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 rounded-[1.75rem] border border-[#4b3729] bg-[linear-gradient(180deg,#211711_0%,#16100d_100%)] p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-white">
                  {selectedPlatform ? `${selectedPlatform.name} selected` : "Choose one platform to continue"}
                </p>
                <p className="mt-1 text-sm text-white/44">
                  The next steps will use this platform as the base generation format.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 rounded-2xl border border-[#5a412e] bg-[#1a1411] px-5 py-3 text-sm text-white/84 transition-all hover:bg-[#221915]"
                >
                  <ArrowLeft size={14} />
                  Back
                </Link>
                <button
                  type="button"
                  disabled={!selectedPlatform}
                  onClick={handleContinue}
                  className={`flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold transition-all ${
                    selectedPlatform
                      ? "bg-[linear-gradient(90deg,#fff0de_0%,#f7b26d_40%,#f97316_100%)] text-black shadow-[0_16px_35px_rgba(249,115,22,0.26)] hover:brightness-110"
                      : "cursor-not-allowed bg-[#2a201a] text-white/30"
                  }`}
                >
                  Continue
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PlatformSelection;
