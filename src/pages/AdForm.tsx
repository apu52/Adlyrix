import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Facebook,
  Globe,
  MessageCircle,
  Instagram,
  Palette,
  PartyPopper,
  Sparkles,
  SunMedium,
  Tag,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

const postTypes = [
  { id: "sale", label: "Sale", icon: Tag },
  { id: "new-arrival", label: "New Arrival", icon: Sparkles },
  { id: "event", label: "Event", icon: PartyPopper },
  { id: "seasonal", label: "Seasonal", icon: SunMedium },
  { id: "product", label: "Product", icon: Box },
  { id: "brand", label: "Brand", icon: Palette },
];

const colorPalettes = [
  { id: "vibrant", label: "Vibrant", colors: ["#ff4d4d", "#ff7a18", "#ffc61a", "#28d26d"] },
  { id: "cool", label: "Cool", colors: ["#25b5d8", "#4185f4", "#8c5cff", "#5a67ff"] },
  { id: "warm", label: "Warm", colors: ["#ff7a18", "#f94144", "#ec4899", "#ffb000"] },
  { id: "nature", label: "Nature", colors: ["#2ecc71", "#84cc16", "#14b8a6", "#10b981"] },
  { id: "elegant", label: "Elegant", colors: ["#1e293b", "#475569", "#94a3b8", "#d4af37"] },
];

const ctaOptions = [
  "Shop Now",
  "Book Now",
  "Learn More",
  "Get Offer",
  "Order Today",
  "Sign Up",
];

type UploadedAssetSummary = {
  id: string;
  name: string;
  previewType: "image" | "pdf" | "unsupported";
};

const platformMeta = {
  instagram: { label: "Instagram", icon: Instagram },
  facebook: { label: "Facebook", icon: Facebook },
  whatsapp: { label: "WhatsApp", icon: MessageCircle },
  website: { label: "Website", icon: Globe },
} as const;

const AdForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = (location.state as {
    uploadedAssets?: UploadedAssetSummary[];
    selectedPlatforms?: string[];
  } | null) ?? { uploadedAssets: [], selectedPlatforms: [] };
  const uploadedAssets = locationState.uploadedAssets ?? [];
  const selectedPlatforms = locationState.selectedPlatforms ?? [];

  const [postDescription, setPostDescription] = useState("");
  const [headline, setHeadline] = useState("");
  const [cta, setCta] = useState("");
  const [offer, setOffer] = useState("");
  const [selectedPostType, setSelectedPostType] = useState("sale");
  const [selectedPalette, setSelectedPalette] = useState("vibrant");

  const selectedPaletteConfig = useMemo(
    () => colorPalettes.find((palette) => palette.id === selectedPalette) ?? colorPalettes[0],
    [selectedPalette],
  );
  const canGenerate =
    postDescription.trim().length > 0 &&
    headline.trim().length > 0 &&
    cta.trim().length > 0;

  const handleGenerate = () => {
    if (!canGenerate) {
      return;
    }

    navigate("/generated-ads", {
      state: {
        autoStart: true,
        selectedPlatforms,
        uploadedAssets,
        creativeConfig: {
          postDescription,
          headline,
          cta,
          offer,
          selectedPostType,
          selectedPalette,
        },
      },
    });
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-base font-bold text-emerald-400">
                3
              </div>
              <h1 className="text-3xl font-bold text-foreground">Configure Your Creative</h1>
            </div>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Add the copy details and choose the visual style for the ad we will generate next.
            </p>
          </div>

          {uploadedAssets.length > 0 && (
            <div className="rounded-2xl border border-border bg-secondary/25 px-4 py-3 text-sm text-muted-foreground">
              <div>{uploadedAssets.length} asset{uploadedAssets.length > 1 ? "s" : ""} ready from the upload step</div>
              {selectedPlatforms.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedPlatforms.map((platformId) => {
                    const platform = platformMeta[platformId as keyof typeof platformMeta];

                    if (!platform) {
                      return null;
                    }

                    const Icon = platform.icon;
                    return (
                      <span
                        key={platformId}
                        className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-xs text-foreground"
                      >
                        <Icon size={12} />
                        {platform.label}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="glass p-4 sm:p-6">
          <div className="grid gap-8 xl:grid-cols-[1fr_1fr]">
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">Tell us about your post *</label>
                <textarea
                  value={postDescription}
                  onChange={(event) => setPostDescription(event.target.value)}
                  rows={5}
                  placeholder="Describe what you want to promote... e.g., 'Summer sale with 50% off on all electronics. Highlight the discount and create urgency.'"
                  className="min-h-[150px] w-full rounded-2xl border border-border bg-input px-5 py-4 text-base text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">Headline Text</label>
                <input
                  value={headline}
                  onChange={(event) => setHeadline(event.target.value)}
                  placeholder="e.g., MEGA SUMMER SALE!"
                  className="w-full rounded-2xl border border-border bg-input px-5 py-3.5 text-base text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">Call to Action</label>
                <select
                  value={cta}
                  onChange={(event) => setCta(event.target.value)}
                  className="w-full rounded-2xl border border-border bg-input px-5 py-3.5 text-base text-foreground outline-none transition-all focus:border-primary"
                >
                  <option value="">Select CTA...</option>
                  {ctaOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">Offer/Discount (Optional)</label>
                <input
                  value={offer}
                  onChange={(event) => setOffer(event.target.value)}
                  placeholder="e.g., 50% OFF, Buy 1 Get 1 Free, Rs 500 Off"
                  className="w-full rounded-2xl border border-border bg-input px-5 py-3.5 text-base text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <h2 className="mb-3 text-sm font-semibold text-foreground">Post Type</h2>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {postTypes.map((type, index) => {
                    const Icon = type.icon;
                    const isSelected = selectedPostType === type.id;

                    return (
                      <motion.button
                        key={type.id}
                        type="button"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        onClick={() => setSelectedPostType(type.id)}
                        className={`rounded-2xl border p-5 text-center transition-all ${
                          isSelected
                            ? "border-primary bg-primary/10 shadow-[0_0_0_1px_hsl(var(--primary)/0.22)]"
                            : "border-border bg-card hover:border-primary/40 hover:bg-secondary/20"
                        }`}
                      >
                        <div className="mb-3 flex justify-center">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${
                              isSelected ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            <Icon size={18} />
                          </div>
                        </div>
                        <p className="text-lg font-medium text-foreground">{type.label}</p>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h2 className="mb-3 text-sm font-semibold text-foreground">Color Palette</h2>
                <div className="space-y-3">
                  {colorPalettes.map((palette) => {
                    const isSelected = selectedPalette === palette.id;

                    return (
                      <button
                        key={palette.id}
                        type="button"
                        onClick={() => setSelectedPalette(palette.id)}
                        className={`flex w-full items-center justify-between gap-4 rounded-2xl border px-4 py-3.5 text-left transition-all ${
                          isSelected
                            ? "border-primary bg-primary/10 shadow-[0_0_0_1px_hsl(var(--primary)/0.2)]"
                            : "border-border bg-card hover:border-primary/40 hover:bg-secondary/20"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex">
                            {palette.colors.map((color, index) => (
                              <span
                                key={`${palette.id}-${index}`}
                                className="-ml-1 h-8 w-8 rounded-full border border-background first:ml-0"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                          <span className="text-lg font-medium text-foreground">{palette.label}</span>
                        </div>
                        {isSelected && <span className="text-sm font-medium text-primary">Selected</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-secondary/20 p-4">
                <p className="text-sm font-semibold text-foreground">Quick Preview Summary</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {headline || "Your headline will appear here"} with a {selectedPostType.replace("-", " ")} tone and{" "}
                  {selectedPaletteConfig.label.toLowerCase()} palette.
                </p>
                <div className="mt-4 flex gap-2">
                  {selectedPaletteConfig.colors.map((color, index) => (
                    <span
                      key={`${selectedPaletteConfig.id}-${index}`}
                      className="h-10 w-10 rounded-full border border-background/70"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <Link
            to="/image-upload"
            className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-all hover:bg-secondary"
          >
            <ArrowLeft size={14} /> Back
          </Link>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={!canGenerate}
            className={`flex items-center gap-1.5 rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
              canGenerate
                ? "btn-gradient text-primary-foreground"
                : "cursor-not-allowed bg-secondary text-muted-foreground"
            }`}
          >
            Generate Post <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdForm;
