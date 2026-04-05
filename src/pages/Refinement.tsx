import { motion } from "framer-motion";
import { ArrowLeft, Image as ImageIcon, Sparkles, Palette, Type, User, RotateCcw, Save } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

const improvementOptions = [
  { icon: User, title: "Face", desc: "Adjust facial features, expressions, or model appearance" },
  { icon: Palette, title: "Color", desc: "Enhance color harmony, saturation, or overall palette" },
  { icon: ImageIcon, title: "Fabric Realism", desc: "Improve texture details, material appearance, lighting" },
  { icon: Type, title: "Text", desc: "Adjust copy, placement, typography, or readability" },
];

const Refinement = () => (
  <DashboardLayout>
    <div className="mb-6 flex items-center gap-3">
      <Link to="/generated-ads" className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-secondary transition-all">
        <ArrowLeft size={16} />
      </Link>
      <div>
        <h1 className="text-xl font-bold text-foreground">Refine Creative</h1>
        <p className="text-sm text-muted-foreground">Improve your ad creative with targeted adjustments</p>
      </div>
    </div>

    <div className="grid lg:grid-cols-2 gap-6">
      {/* Left - Preview */}
      <div className="space-y-6">
        <div className="glass p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Current Creative</h3>
            <span className="text-xs text-muted-foreground">Generation #3</span>
          </div>
          <div className="rounded-xl bg-secondary aspect-[9/16] max-h-[400px] flex items-center justify-center relative overflow-hidden">
            <span className="absolute top-3 left-3 rounded bg-primary/80 px-2 py-0.5 text-[9px] font-bold text-primary-foreground">STORY</span>
            <ImageIcon size={48} className="text-muted-foreground/30" />
          </div>
          <div className="mt-4 glass-subtle p-3 rounded-lg">
            <p className="text-xs text-foreground">"Step into summer with our new ultra-lightweight collection. 30% off today only! 👟🏃"</p>
            <div className="flex items-center justify-between mt-2 text-[10px] text-muted-foreground">
              <span>Last updated: 2 minutes ago</span>
              <span>Quality: High</span>
            </div>
          </div>
        </div>

        <div className="glass p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">Refinement History</h3>
          <div className="space-y-2">
            {["Adjusted color palette — Made blues more vibrant", "Enhanced text contrast — Improved readability"].map((h, i) => (
              <div key={i} className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-primary/60" />
                <span>{h}</span>
                <span className="ml-auto text-[10px]">Gen #{3 - i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Controls */}
      <div className="space-y-6">
        <div className="glass p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-primary" />
            <h3 className="text-sm font-semibold text-foreground">What to improve?</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Select areas for refinement</p>
          <div className="grid grid-cols-2 gap-3">
            {improvementOptions.map((o) => (
              <button key={o.title} className="glass-subtle p-4 rounded-lg text-left card-hover group">
                <o.icon size={18} className="text-primary mb-2" />
                <p className="text-xs font-medium text-foreground">{o.title}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{o.desc}</p>
              </button>
            ))}
          </div>

          <div className="mt-5">
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Additional Instructions</label>
            <textarea
              rows={3}
              placeholder="Describe specific improvements you'd like to see..."
              className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary outline-none transition-all resize-none"
            />
          </div>

          <button className="btn-gradient w-full mt-4 flex items-center justify-center gap-2 text-sm text-primary-foreground">
            <Sparkles size={14} /> Regenerate with Improvements
          </button>

          <div className="flex gap-3 mt-3">
            <button className="flex-1 rounded-lg border border-border px-4 py-2 text-xs text-muted-foreground hover:bg-secondary transition-all flex items-center justify-center gap-1.5">
              <Save size={12} /> Save Current
            </button>
            <button className="flex-1 rounded-lg border border-border px-4 py-2 text-xs text-muted-foreground hover:bg-secondary transition-all flex items-center justify-center gap-1.5">
              <RotateCcw size={12} /> Reset All
            </button>
          </div>
        </div>

        <div className="glass p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-primary" />
            <h3 className="text-sm font-semibold text-foreground">AI Suggestions</h3>
          </div>
          <div className="space-y-2">
            {[
              { title: "Enhance product lighting", desc: "Add more dramatic shadows for depth" },
              { title: "Adjust text contrast", desc: "Increase readability on mobile devices" },
            ].map((s) => (
              <div key={s.title} className="glass-subtle p-3 rounded-lg">
                <p className="text-xs font-medium text-foreground">{s.title}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default Refinement;
