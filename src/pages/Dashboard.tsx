import { motion } from "framer-motion";
import { TrendingUp, DollarSign, MousePointer, Eye, PlusCircle, ArrowRight, MoreHorizontal, FolderOpen, MessagesSquare } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { demoLibraryCreatives } from "@/lib/demoCreativeLibrary";

const chartData = [
  { name: "Jan", revenue: 4200, clicks: 2400 },
  { name: "Feb", revenue: 5800, clicks: 3200 },
  { name: "Mar", revenue: 5100, clicks: 2800 },
  { name: "Apr", revenue: 7200, clicks: 4100 },
  { name: "May", revenue: 6500, clicks: 3600 },
  { name: "Jun", revenue: 8100, clicks: 4800 },
  { name: "Jul", revenue: 5500, clicks: 3100 },
];

const stats = [
  { icon: DollarSign, label: "Total Revenue", value: "$52K", change: "+12%", positive: true },
  { icon: MousePointer, label: "Total Clicks", value: "156K", change: "+8.3%", positive: true },
  { icon: Eye, label: "Impressions", value: "2.4M", change: "+15.7%", positive: true },
  { icon: TrendingUp, label: "Conversions", value: "3,247", change: "-2.3%", positive: false },
];

const campaigns = [
  { name: "Q4 Retargeting", platform: "Facebook Ads", status: "Active", spend: "$4,200", conversions: "342" },
  { name: "Brand Search", platform: "Google Search", status: "Paused", spend: "$1,850", conversions: "128" },
  { name: "Summer Collection", platform: "Instagram", status: "Active", spend: "$3,100", conversions: "256" },
];
const libraryItems = demoLibraryCreatives.slice(0, 3).map((creative) => ({
  id: creative.sessionId,
  title: creative.title,
  platform:
    creative.platformId === "instagram"
      ? "Instagram"
      : creative.platformId === "facebook"
        ? "Facebook"
        : creative.platformId === "whatsapp"
          ? "WhatsApp"
          : "Website",
  createdAt: creative.createdAtLabel,
  imageUrl: creative.imageUrl,
  aspectClass:
    creative.platformId === "instagram"
      ? "aspect-square"
      : creative.platformId === "whatsapp"
        ? "aspect-[9/16]"
        : "aspect-[1.91/1]",
}));

const Dashboard = () => (
  <DashboardLayout>
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Overview</h1>
          <p className="text-sm text-muted-foreground">Welcome back, Alex</p>
        </div>
        <Link to="/create-ad" className="btn-gradient inline-flex items-center gap-2 text-sm text-primary-foreground self-start">
          <PlusCircle size={16} /> Create New Ad
        </Link>
      </div>

      {/* Launch card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-xl font-bold text-foreground">Launch new campaign</h2>
          <p className="text-sm text-muted-foreground mt-1">Unify your ad performance with your CRM data to see true revenue impact.</p>
          <Link to="/create-ad" className="btn-gradient inline-flex items-center gap-2 text-sm text-primary-foreground mt-4">
            <PlusCircle size={16} /> Create New Ad
          </Link>
        </div>
        <div className="glass-subtle p-5 rounded-xl text-center min-w-[180px]">
          <p className="text-xs text-muted-foreground">Total Revenue</p>
          <p className="text-3xl font-bold text-foreground mt-1">$52K</p>
          <span className="text-xs text-success">+12%</span>
          <p className="text-[10px] text-muted-foreground mt-1">Comparing Nov 2025</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-[1.75rem] border border-[#5a412e] bg-[linear-gradient(135deg,#231811_0%,#17110d_55%,#120f0d_100%)] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
              <FolderOpen size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Ad Library</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                Open previous generated ads, view saved chat history, and continue refining any old creative from one place.
              </p>
            </div>
          </div>
          <Link
            to="/ad-library"
            className="inline-flex items-center gap-2 rounded-2xl border border-[#5a412e] bg-[#1b1512] px-5 py-3 text-sm text-foreground transition-all hover:bg-[#241a15]"
          >
            Open Ad Library
            <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="rounded-[1.75rem] border border-[#5a412e] bg-[linear-gradient(135deg,#211711_0%,#16100d_55%,#120f0d_100%)] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
              <MessagesSquare size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Previous Chats</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                View earlier ad conversations on a separate page and jump from one saved chat to another without opening the gallery first.
              </p>
            </div>
          </div>
          <Link
            to="/chat-history"
            className="inline-flex items-center gap-2 rounded-2xl border border-[#5a412e] bg-[#1b1512] px-5 py-3 text-sm text-foreground transition-all hover:bg-[#241a15]"
          >
            Open Previous Chats
            <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass card-hover p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center text-primary">
                <s.icon size={16} />
              </div>
              <span className={`text-xs font-medium ${s.positive ? "text-success" : "text-destructive"}`}>{s.change}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Campaign Insights</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(247,178,109,0.12)" />
              <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.48)", fontSize: 11 }} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.48)", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#18110d", border: "1px solid rgba(247,178,109,0.18)", borderRadius: 12, color: "#fff7ed" }} />
              <Bar dataKey="revenue" fill="#f7b26d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="glass p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Click Performance</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(247,178,109,0.12)" />
              <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.48)", fontSize: 11 }} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.48)", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#18110d", border: "1px solid rgba(247,178,109,0.18)", borderRadius: 12, color: "#fff7ed" }} />
              <Line type="monotone" dataKey="clicks" stroke="#fb923c" strokeWidth={2} dot={{ fill: "#fb923c" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-[#5a412e] bg-[linear-gradient(180deg,#18120e_0%,#120f0d_100%)] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Library Preview</h3>
            <p className="mt-1 text-xs text-muted-foreground">Click any generated image to jump into the exact chat where that ad was created.</p>
          </div>
          <Link to="/ad-library" className="text-xs text-primary hover:underline flex items-center gap-1">
            Open Library <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {libraryItems.map((item) => (
            <Link
              key={item.id}
              to={`/chat-history?session=${item.id}`}
              className="group overflow-hidden rounded-[1.5rem] border border-[#5a412e] bg-[#191310] transition-all hover:-translate-y-1 hover:border-[#7a583a] hover:shadow-[0_18px_45px_rgba(0,0,0,0.24)]"
            >
              <div className="p-4">
                <div className={`${item.aspectClass} overflow-hidden rounded-[1rem] border border-[#5a412e] bg-[#120d0b]`}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="border-t border-[#3b2b20] px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-white/68">
                    {item.platform}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{item.createdAt}</span>
                </div>
                <p className="mt-3 text-sm font-semibold text-foreground">{item.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">Open previous chat</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent campaigns */}
      <div className="glass p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Recent Generated Ads</h3>
          <Link to="/ad-library" className="text-xs text-primary hover:underline flex items-center gap-1">
            View All <ArrowRight size={12} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="text-left pb-3 font-medium">Campaign Name</th>
                <th className="text-left pb-3 font-medium">Status</th>
                <th className="text-left pb-3 font-medium">Spend</th>
                <th className="text-left pb-3 font-medium">Conversions</th>
                <th className="text-right pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.name} className="border-b border-border/50 last:border-0">
                  <td className="py-3">
                    <p className="font-medium text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.platform}</p>
                  </td>
                  <td className="py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                      c.status === "Active" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 text-foreground">{c.spend}</td>
                  <td className="py-3 text-foreground">{c.conversions}</td>
                  <td className="py-3 text-right">
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default Dashboard;
