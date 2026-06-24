import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { previousWorkHighlights, previousWorkProjects } from "@/lib/previousWork";

const PreviousWork = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-[2rem] border border-[#5a412e] bg-[radial-gradient(circle_at_top_left,rgba(247,178,109,0.18),transparent_30%),linear-gradient(145deg,#18120f_0%,#120e0c_55%,#0f0c0b_100%)] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.28)]"
      >
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between xl:gap-10">
          <div className="max-w-[48rem] flex-1">
            <div className="mb-3 inline-flex items-center rounded-full border border-[#6b4b33] bg-[#241913] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f7c28d]">
              Previous Work
            </div>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">A curated archive of premium campaigns, creative systems, and launch work</h1>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Explore earlier executions across performance marketing, offer positioning, and luxury-style brand storytelling, all presented with the same refined visual standard as the rest of Adlyrix.
            </p>
          </div>

          <div className="grid shrink-0 grid-cols-3 gap-3 xl:self-center">
            {previousWorkHighlights.map((item) => (
              <div
                key={item.label}
                className="min-w-[150px] rounded-[1.25rem] border border-white/10 bg-white/[0.035] px-5 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                <p className="text-xl font-bold text-foreground">{item.value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid gap-5 xl:grid-cols-2">
        {previousWorkProjects.map((work, index) => (
          <motion.div
            key={work.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative overflow-hidden rounded-[1.85rem] border border-[#5a412e] bg-[linear-gradient(160deg,rgba(34,24,18,0.96)_0%,rgba(19,14,12,0.98)_100%)] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-3 hover:scale-[1.015] hover:border-[#8a6240] hover:shadow-[0_30px_70px_rgba(0,0,0,0.34)]"
          >
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${work.accent} opacity-100 transition-opacity duration-300 group-hover:opacity-80`} />
            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#f4c899]">
                    {work.category}
                  </span>
                  <h2 className="mt-4 text-xl font-semibold text-foreground">{work.title}</h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary">
                  <work.icon size={18} />
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">{work.summary}</p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-4">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Headline Result</p>
                  <p className="mt-2 text-2xl font-bold text-foreground">{work.metric}</p>
                </div>
                <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Impact Note</p>
                  <p className="mt-2 text-sm font-medium text-foreground">{work.detail}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <p className="text-xs text-muted-foreground">Premium delivery across strategy, copy, and creative direction</p>
                <Link
                  to={`/previous-work/${work.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-medium text-primary transition-opacity hover:opacity-80"
                >
                  View concept
                  <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </DashboardLayout>
);

export default PreviousWork;
