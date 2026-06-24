import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Compass, Layers3, Sparkles } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { getPreviousWorkBySlug, previousWorkProjects } from "@/lib/previousWork";

const PreviousWorkDetail = () => {
  const { slug } = useParams();
  const project = getPreviousWorkBySlug(slug);

  if (!project) {
    return (
      <DashboardLayout>
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[2rem] border border-[#5a412e] bg-[linear-gradient(145deg,#18120f_0%,#120e0c_60%,#0f0c0b_100%)] p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#f7c28d]">Previous Work</p>
            <h1 className="mt-4 text-3xl font-bold text-foreground">Project not found</h1>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              This case study is no longer available or the link is incomplete. Head back to the showcase and pick another concept.
            </p>
            <Link
              to="/previous-work"
              className="mt-6 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#5a412e] bg-[#1b1512] text-foreground transition-all hover:bg-[#241a15]"
            >
              <ArrowLeft size={14} />
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const relatedProjects = previousWorkProjects.filter((item) => item.slug !== project.slug).slice(0, 3);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-[2rem] border border-[#5a412e] bg-[radial-gradient(circle_at_top_left,rgba(247,178,109,0.18),transparent_30%),linear-gradient(145deg,#18120f_0%,#120e0c_55%,#0f0c0b_100%)] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.28)]"
        >
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3">
                <Link
                  to="/previous-work"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-primary transition-all hover:bg-white/[0.08]"
                >
                  <ArrowLeft size={13} />
                </Link>
                <div className="inline-flex rounded-full border border-[#6b4b33] bg-[#241913] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f7c28d]">
                  {project.category}
                </div>
              </div>
              <h1 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">{project.title}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{project.headline}</p>
            </div>

            <div className="grid min-w-full grid-cols-2 gap-3 sm:min-w-[360px] sm:grid-cols-3">
              {project.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.25rem] border border-white/10 bg-white/[0.035] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-[1.9rem] border border-[#5a412e] bg-[linear-gradient(160deg,rgba(34,24,18,0.96)_0%,rgba(19,14,12,0.98)_100%)] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.22)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#f7c28d]">Overview</p>
                <h2 className="mt-3 text-2xl font-semibold text-foreground">Why this project shipped so strongly</h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary">
                <project.icon size={20} />
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-sm font-semibold text-foreground">Context</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{project.overview}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Challenge</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{project.challenge}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Solution</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{project.solution}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="rounded-[1.9rem] border border-[#5a412e] bg-[linear-gradient(180deg,#18120e_0%,#120f0d_100%)] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#f7c28d]">Project Frame</p>
            <div className="mt-5 space-y-4">
              <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Client</p>
                <p className="mt-2 text-sm font-semibold text-foreground">{project.client}</p>
              </div>
              <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Duration</p>
                <p className="mt-2 text-sm font-semibold text-foreground">{project.duration}</p>
              </div>
              <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Audience</p>
                <p className="mt-2 text-sm font-semibold text-foreground">{project.audience}</p>
              </div>
              <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Channels</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.channels.map((channel) => (
                    <span key={channel} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-[#f4c899]">
                      {channel}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.11 }}
            className="rounded-[1.9rem] border border-[#5a412e] bg-[linear-gradient(180deg,#18120e_0%,#120f0d_100%)] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
          >
            <div className="flex items-center gap-3">
              <Compass size={18} className="text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Strategic pillars</h2>
            </div>
            <div className="mt-5 space-y-3">
              {project.pillars.map((pillar) => (
                <div key={pillar.title} className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm font-semibold text-foreground">{pillar.title}</p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{pillar.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="rounded-[1.9rem] border border-[#5a412e] bg-[linear-gradient(160deg,rgba(34,24,18,0.96)_0%,rgba(19,14,12,0.98)_100%)] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.22)]"
          >
            <div className="flex items-center gap-3">
              <Layers3 size={18} className="text-primary" />
              <h2 className="text-xl font-semibold text-foreground">What shipped</h2>
            </div>
            <div className="mt-5 space-y-3">
              {project.deliverables.map((deliverable) => (
                <div key={deliverable} className="flex items-start gap-3 rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />
                  <p className="text-sm text-foreground">{deliverable}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.17 }}
            className="rounded-[1.9rem] border border-[#5a412e] bg-[linear-gradient(180deg,#18120e_0%,#120f0d_100%)] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
          >
            <div className="flex items-center gap-3">
              <Sparkles size={18} className="text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Execution timeline</h2>
            </div>
            <div className="mt-6 space-y-4">
              {project.phases.map((phase, index) => (
                <div key={phase.name} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-xs font-semibold text-primary">
                      0{index + 1}
                    </div>
                    {index < project.phases.length - 1 && <div className="mt-2 h-full w-px bg-white/10" />}
                  </div>
                  <div className="pb-5">
                    <p className="text-sm font-semibold text-foreground">{phase.name}</p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{phase.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-[1.9rem] border border-[#5a412e] bg-[radial-gradient(circle_at_top_left,rgba(247,178,109,0.16),transparent_35%),linear-gradient(145deg,#18120f_0%,#120e0c_60%,#0f0c0b_100%)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)]"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#f7c28d]">Client Perspective</p>
            <blockquote className="mt-4 text-lg leading-8 text-foreground">
              "{project.testimonial}"
            </blockquote>
            <div className="mt-8 rounded-[1.4rem] border border-white/10 bg-white/[0.035] p-5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Signature Outcome</p>
              <p className="mt-2 text-3xl font-bold text-foreground">{project.metric}</p>
              <p className="mt-2 text-sm text-muted-foreground">{project.detail}</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.23 }}
          className="rounded-[1.9rem] border border-[#5a412e] bg-[linear-gradient(160deg,rgba(34,24,18,0.96)_0%,rgba(19,14,12,0.98)_100%)] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.22)]"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#f7c28d]">Explore More</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">Related concepts from the archive</h2>
            </div>
            <Link
              to="/previous-work"
              className="inline-flex items-center gap-2 rounded-2xl border border-[#5a412e] bg-[#1b1512] px-5 py-3 text-sm text-foreground transition-all hover:bg-[#241a15]"
            >
              View all work
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-3">
            {relatedProjects.map((item) => (
              <Link
                key={item.slug}
                to={`/previous-work/${item.slug}`}
                className="group rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 transition-all hover:-translate-y-1 hover:border-[#7a583a] hover:bg-white/[0.045]"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-[#f4c899]">
                    {item.category}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary">
                    <item.icon size={16} />
                  </div>
                </div>
                <p className="mt-4 text-lg font-semibold text-foreground">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.summary}</p>
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-sm font-semibold text-foreground">{item.metric}</span>
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-primary">
                    View concept
                    <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default PreviousWorkDetail;
