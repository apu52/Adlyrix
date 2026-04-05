import { motion } from "framer-motion";
import { Eye, MousePointer, ShoppingCart, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from "recharts";

const engagementData = [
  { name: "Jan 1", likes: 5200 }, { name: "Jan 8", likes: 8100 }, { name: "Jan 15", likes: 11200 },
  { name: "Jan 22", likes: 13500 }, { name: "Jan 20", likes: 12800 }, { name: "Feb 5", likes: 15200 },
  { name: "Feb 12", likes: 17800 }, { name: "Feb 19", likes: 19500 }, { name: "Feb 26", likes: 23000 },
];

const funnelData = [
  { stage: "Impressions", value: 100000 },
  { stage: "Clicks", value: 15600 },
  { stage: "Leads", value: 3247 },
  { stage: "Conversions", value: 890 },
];

const roiData = [
  { name: "W1", predicted: 2.1, actual: 1.8 }, { name: "W2", predicted: 2.8, actual: 3.1 },
  { name: "W3", predicted: 3.5, actual: 3.2 }, { name: "W4", predicted: 4.2, actual: 4.5 },
  { name: "W5", predicted: 5.0, actual: 4.8 }, { name: "W6", predicted: 5.8, actual: 6.2 },
];

const kpis = [
  { icon: Eye, label: "Total Impressions", value: "2.4M", change: "+12.5%", positive: true },
  { icon: MousePointer, label: "Total Clicks", value: "156K", change: "+8.3%", positive: true },
  { icon: ShoppingCart, label: "Conversions", value: "3,247", change: "+15.7%", positive: true },
  { icon: DollarSign, label: "Cost per Conversion", value: "$24.50", change: "-2.3%", positive: false },
];

const Analytics = () => (
  <DashboardLayout>
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-sm text-muted-foreground">Campaign performance insights and predictions</p>
      </div>
      <select className="rounded-lg border border-border bg-input px-3 py-2 text-xs text-foreground appearance-none focus:border-primary outline-none">
        <option>Last 30 days</option>
        <option>Last 7 days</option>
        <option>Last 90 days</option>
      </select>
    </div>

    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass card-hover p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center text-primary">
                <k.icon size={16} />
              </div>
              <span className={`text-xs font-medium flex items-center gap-0.5 ${k.positive ? "text-success" : "text-destructive"}`}>
                {k.positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {k.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{k.value}</p>
            <p className="text-xs text-muted-foreground">{k.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Engagement chart */}
      <div className="glass p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Engagement Analytics</h3>
            <p className="text-[11px] text-muted-foreground">User interaction trends over time</p>
          </div>
          <div className="flex gap-2">
            {["Likes", "Comments", "Shares"].map((t, i) => (
              <button key={t} className={`text-[10px] px-2.5 py-1 rounded-full ${i === 0 ? "bg-primary/15 text-primary" : "text-muted-foreground"}`}>{t}</button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={engagementData}>
            <defs>
              <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(200,95%,60%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(200,95%,60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(230,20%,18%)" />
            <XAxis dataKey="name" tick={{ fill: "hsl(220,15%,55%)", fontSize: 10 }} />
            <YAxis tick={{ fill: "hsl(220,15%,55%)", fontSize: 10 }} />
            <Tooltip contentStyle={{ background: "hsl(230,25%,12%)", border: "1px solid hsl(230,20%,22%)", borderRadius: 8, color: "hsl(220,20%,95%)" }} />
            <Area type="monotone" dataKey="likes" stroke="hsl(200,95%,60%)" fill="url(#engGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass p-5">
          <h3 className="text-sm font-semibold text-foreground mb-1">Conversion Funnel</h3>
          <p className="text-[11px] text-muted-foreground mb-4">User journey through conversion stages</p>
          <div className="space-y-3">
            {funnelData.map((f, i) => (
              <div key={f.stage}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{f.stage}</span>
                  <span className="text-foreground font-medium">{f.value.toLocaleString()}</span>
                </div>
                <div className="h-3 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${(f.value / funnelData[0].value) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-5">
          <h3 className="text-sm font-semibold text-foreground mb-1">Return Prediction</h3>
          <p className="text-[11px] text-muted-foreground mb-4">AI-powered ROI forecasting</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={roiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(230,20%,18%)" />
              <XAxis dataKey="name" tick={{ fill: "hsl(220,15%,55%)", fontSize: 10 }} />
              <YAxis tick={{ fill: "hsl(220,15%,55%)", fontSize: 10 }} />
              <Tooltip contentStyle={{ background: "hsl(230,25%,12%)", border: "1px solid hsl(230,20%,22%)", borderRadius: 8, color: "hsl(220,20%,95%)" }} />
              <Line type="monotone" dataKey="predicted" stroke="hsl(250,85%,65%)" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: "hsl(250,85%,65%)" }} />
              <Line type="monotone" dataKey="actual" stroke="hsl(200,95%,60%)" strokeWidth={2} dot={{ fill: "hsl(200,95%,60%)" }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 justify-center">
            <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><span className="h-2 w-2 rounded-full bg-primary" />Predicted</span>
            <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><span className="h-2 w-2 rounded-full bg-accent" />Actual</span>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default Analytics;
