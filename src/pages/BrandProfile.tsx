import { motion } from "framer-motion";
import { Upload, Eye, Save, Globe, Users, Building2 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const primaryColors = [
  { name: "Primary", hex: "#1B62F5", color: "hsl(220,90%,53%)" },
  { name: "Primary Dark", hex: "#133AA6", color: "hsl(225,75%,36%)" },
  { name: "Primary Light", hex: "#5C8DF5", color: "hsl(220,85%,66%)" },
  { name: "Primary Subtle", hex: "#D0E2FF", color: "hsl(215,100%,91%)" },
];

const BrandProfile = () => (
  <DashboardLayout>
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Brand Profile</h1>
        <p className="text-sm text-muted-foreground">Customize your brand identity and default styles</p>
      </div>
      <div className="flex gap-2 self-start">
        <button className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:bg-secondary transition-all flex items-center gap-1.5">
          <Eye size={14} /> Preview
        </button>
        <button className="btn-gradient text-sm text-primary-foreground flex items-center gap-1.5">
          <Save size={14} /> Save Changes
        </button>
      </div>
    </div>

    <div className="space-y-6 max-w-4xl">
      <div className="glass p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Brand Overview</h3>
            <p className="text-[11px] text-muted-foreground">Set up your brand's core identity and visual elements</p>
          </div>
          <span className="text-[10px] text-success bg-success/15 px-2 py-0.5 rounded-full">Active Profile</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Brand Name</label>
              <input defaultValue="TechFlow Solutions" className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground focus:border-primary outline-none transition-all" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Brand Description</label>
              <textarea defaultValue="Innovative technology solutions that empower businesses to achieve digital transformation and sustainable growth through cutting-edge software development and strategic consulting services." rows={3} className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground focus:border-primary outline-none transition-all resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block flex items-center gap-1"><Building2 size={12} /> Industry</label>
                <select className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm text-foreground appearance-none focus:border-primary outline-none">
                  <option>Technology</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block flex items-center gap-1"><Users size={12} /> Target Audience</label>
                <select className="w-full rounded-lg border border-border bg-input px-3 py-2.5 text-sm text-foreground appearance-none focus:border-primary outline-none">
                  <option>B2B Enterprises</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Brand Logo</label>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload size={24} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-xs text-foreground font-medium">Upload Logo</p>
                <p className="text-[10px] text-muted-foreground">PNG, JPG up to 5MB</p>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block flex items-center gap-1"><Globe size={12} /> Website URL</label>
              <input defaultValue="https://techflowsolutions.com" className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground focus:border-primary outline-none transition-all" />
            </div>
          </div>
        </div>
      </div>

      <div className="glass p-6">
        <h3 className="text-sm font-semibold text-foreground mb-1">Brand Colors</h3>
        <p className="text-[11px] text-muted-foreground mb-4">Define your brand's color palette for consistent visual identity</p>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-muted-foreground mb-3">Primary Colors</p>
            <div className="flex gap-4">
              {primaryColors.map((c) => (
                <div key={c.name} className="text-center">
                  <div className="h-12 w-12 rounded-lg mx-auto mb-1.5" style={{ background: c.color }} />
                  <p className="text-[10px] text-foreground">{c.name}</p>
                  <p className="text-[9px] text-muted-foreground">{c.hex}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-3">Neutral Colors</p>
            <div className="flex gap-4">
              {[
                { name: "Text Primary", hex: "#111827", color: "hsl(220,15%,11%)" },
                { name: "Text Secondary", hex: "#6B7280", color: "hsl(220,10%,46%)" },
              ].map((c) => (
                <div key={c.name} className="text-center">
                  <div className="h-12 w-12 rounded-lg mx-auto mb-1.5" style={{ background: c.color }} />
                  <p className="text-[10px] text-foreground">{c.name}</p>
                  <p className="text-[9px] text-muted-foreground">{c.hex}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default BrandProfile;
