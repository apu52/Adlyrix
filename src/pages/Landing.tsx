import { motion } from "framer-motion";
import { ArrowRight, Play, Shield, CreditCard, Clock, BarChart3, Sparkles, Target, Palette, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const features = [
  { icon: Sparkles, title: "AI-Powered Creative", desc: "Generate stunning ad creatives in seconds with our advanced AI engine." },
  { icon: Target, title: "Smart Targeting", desc: "Reach the right audience with AI-optimized targeting across platforms." },
  { icon: Palette, title: "Brand Consistency", desc: "Maintain your brand identity across every ad with intelligent style matching." },
  { icon: TrendingUp, title: "Performance Analytics", desc: "Track conversions, ROI, and engagement with real-time dashboards." },
  { icon: BarChart3, title: "A/B Testing", desc: "Automatically generate and test multiple ad variations at scale." },
  { icon: Shield, title: "Enterprise Security", desc: "SOC 2 compliant with end-to-end encryption for all your data." },
];

const Landing = () => {
  return (
    <div className="min-h-screen gradient-mesh relative overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-neon-purple/10 blur-3xl animate-glow-pulse" />
        <div className="absolute top-1/3 -left-40 h-80 w-80 rounded-full bg-neon-blue/8 blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute bottom-20 right-1/4 h-64 w-64 rounded-full bg-neon-indigo/6 blur-3xl animate-glow-pulse" style={{ animationDelay: "3s" }} />
      </div>

      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              <Sparkles size={14} /> Now with GPT-5 powered creative engine
            </div>
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
              <span className="gradient-text">AI-Powered</span>{" "}
              <span className="text-foreground">Ad Creative Generator</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Automate your ad creation workflow. Generate high-converting creatives for every platform in seconds — not hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/dashboard" className="btn-gradient flex items-center gap-2 text-primary-foreground text-base">
              Start Creating <ArrowRight size={18} />
            </Link>
            <button className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-secondary">
              <Play size={16} /> Watch Demo
            </button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground"
          >
            {[
              { icon: CreditCard, text: "No credit card required" },
              { icon: Clock, text: "14-day free trial" },
              { icon: Shield, text: "SOC 2 Compliant" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5">
                <Icon size={14} /> {text}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Floating dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="container mx-auto mt-16 max-w-5xl"
        >
          <div className="glass soft-shadow rounded-2xl p-1 glow-neon">
            <div className="rounded-xl bg-card/80 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-warning/60" />
                <div className="h-3 w-3 rounded-full bg-success/60" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Total Revenue", value: "$52K", change: "+12%" },
                  { label: "Conversions", value: "3,247", change: "+15.7%" },
                  { label: "Active Campaigns", value: "24", change: "+4" },
                ].map((stat) => (
                  <div key={stat.label} className="glass-subtle p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    <span className="text-xs text-success">{stat.change}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 glass-subtle rounded-lg p-4 h-40 flex items-end gap-2">
                {[40, 65, 55, 80, 70, 90, 60, 75, 85, 50, 70, 95].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t bg-primary/40" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Everything you need to <span className="gradient-text">scale your ads</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              A complete platform for creating, managing, and optimizing ad campaigns across every channel.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass card-hover p-6 group"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary group-hover:glow-primary transition-all">
                  <f.icon size={20} />
                </div>
                <h3 className="text-base font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-12 glow-neon"
          >
            <h2 className="text-3xl font-bold text-foreground">Ready to transform your ad workflow?</h2>
            <p className="mt-4 text-muted-foreground">Join 10,000+ marketers already using Adlyrix to create better ads faster.</p>
            <Link to="/login" className="btn-gradient mt-8 inline-flex items-center gap-2 text-primary-foreground">
              Get Started Free <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <span>© 2026 Adlyrix. All rights reserved.</span>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
