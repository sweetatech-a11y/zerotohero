import { useState, useCallback } from "react";
import {
  LayoutDashboard, Users, Zap, MapPin, TrendingUp, Shield,
  BookOpen, ChevronRight, ExternalLink, X, ArrowUp, ArrowDown,
  Minus, Star, Activity, Bell, Calendar, DollarSign, Target,
  CheckCircle2, Clock, MessageSquare, Globe, Search
} from "lucide-react";
import AgencyZeroToHero from "./GuidesApp";

// ─── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const C = {
  bg: "#08101A",
  surface: "#0D1B2A",
  card: "#111E2D",
  cardHover: "#162639",
  border: "#1E3048",
  borderLight: "#253B56",
  teal: "#0ABFBC",
  tealGlow: "rgba(10,191,188,0.18)",
  tealSoft: "rgba(10,191,188,0.10)",
  orange: "#E8782A",
  orangeSoft: "rgba(232,120,42,0.12)",
  blue: "#3B82F6",
  blueSoft: "rgba(59,130,246,0.12)",
  purple: "#8B5CF6",
  purpleSoft: "rgba(139,92,246,0.12)",
  green: "#22C55E",
  greenSoft: "rgba(34,197,94,0.12)",
  red: "#EF4444",
  redSoft: "rgba(239,68,68,0.12)",
  yellow: "#EAB308",
  text: "#E2E8F0",
  textSec: "#8899AE",
  textDim: "#506278",
  ghlBlue: "#0066FF",
};
const FONT = `'Outfit','DM Sans',system-ui,sans-serif`;
const MONO = `'JetBrains Mono','Fira Code',monospace`;

// ─── MOCK DATA ─────────────────────────────────────────────────────────────────

const CLIENTS = [
  { id: 1, name: "Miami Plumbing Pro", tier: "Tier 3 · Full Growth", since: "Jan 2026", status: "Active", leads: 14, rank: 4.2, roas: 4.1, reviews: 47, rating: 4.8, reviewsMonth: 3, sentiment: "Positive" },
  { id: 2, name: "South Beach HVAC", tier: "Tier 2 · Growth + SEO", since: "Feb 2026", status: "Active", leads: 6, rank: 6.1, roas: 2.9, reviews: 23, rating: 4.6, reviewsMonth: 1, sentiment: "Neutral" },
  { id: 3, name: "Coral Gables Dental", tier: "Tier 2 · Growth + SEO", since: "Mar 2026", status: "Active", leads: 4, rank: 3.8, roas: 3.2, reviews: 89, rating: 4.9, reviewsMonth: 5, sentiment: "Very Positive" },
];

const PIPELINE = [
  { stage: "New Lead", count: 8, color: C.blue },
  { stage: "Contacted", count: 12, color: C.teal },
  { stage: "Qualified", count: 6, color: C.orange },
  { stage: "Proposal Sent", count: 3, color: C.purple },
  { stage: "Active Client", count: 3, color: C.green },
];

const SEO_KEYWORDS = [
  { keyword: "plumber miami", rank: 3, change: 2, dir: "up", mapPack: true },
  { keyword: "emergency plumber miami", rank: 1, change: 0, dir: "flat", mapPack: true },
  { keyword: "water heater repair miami", rank: 5, change: 1, dir: "up", mapPack: true },
  { keyword: "drain cleaning miami", rank: 7, change: -1, dir: "down", mapPack: false },
  { keyword: "plumbing services miami fl", rank: 4, change: 3, dir: "up", mapPack: true },
];

const CAMPAIGNS = [
  { name: "Brand Campaign", spend: 180, roas: 8.2, leads: 14 },
  { name: "High-Intent Search", spend: 1240, roas: 4.1, leads: 31 },
  { name: "Meta Retargeting", spend: 620, roas: 2.8, leads: 18 },
];

const ACTIVITY = [
  { type: "lead", time: "2m ago", text: 'New lead: "John Martinez" via Meta Ad', client: "Miami Plumbing Pro", color: C.green },
  { type: "sms", time: "15m ago", text: "Speed-to-Lead SMS sent to John Martinez", client: "", color: C.green },
  { type: "review", time: "1h ago", text: "New 5★ Google review", client: "Miami Plumbing Pro", color: C.yellow },
  { type: "post", time: "2h ago", text: 'GBP post published: "Same-day plumbing service"', client: "", color: C.blue },
  { type: "alert", time: "3h ago", text: "Awario alert: Negative mention detected on Yelp", client: "", color: C.red },
  { type: "booking", time: "5h ago", text: "Appointment booked: Sarah Chen, Tomorrow 2pm", client: "", color: C.green },
  { type: "review", time: "Yesterday", text: "New 5★ Google review", client: "South Beach HVAC", color: C.yellow },
  { type: "seo", time: "Yesterday", text: 'BrightLocal rank update: "plumber miami" moved to #3', client: "", color: C.blue },
];

const TOOLS = [
  { key: "ghl", name: "GoHighLevel", color: C.ghlBlue, icon: Zap },
  { key: "brightlocal", name: "BrightLocal", color: "#0F766E", icon: MapPin },
  { key: "madgicx", name: "Madgicx", color: C.blue, icon: TrendingUp },
  { key: "awario", name: "Awario", color: C.purple, icon: Shield },
];

// ─── NAV CONFIG ─────────────────────────────────────────────────────────────────
const NAV = [
  { section: "COMMAND CENTER" },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "clients", label: "Clients", icon: Users },
  { section: "TOOLS" },
  { id: "ghl", label: "GHL · Leads", icon: Zap, color: C.ghlBlue },
  { id: "brightlocal", label: "BrightLocal · SEO", icon: MapPin, color: "#0F766E" },
  { id: "madgicx", label: "Madgicx · Ads", icon: TrendingUp, color: C.blue },
  { id: "awario", label: "Awario · Reputation", icon: Shield, color: C.purple },
  { section: "GUIDES" },
  { id: "guides", label: "Platform Guides", icon: BookOpen },
];

// ─── SPARKLINE COMPONENT ───────────────────────────────────────────────────────
function Sparkline({ data, color, width = 80, height = 24 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) =>
    `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * (height - 4) - 2}`
  ).join(" ");
  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── CARD WRAPPER ──────────────────────────────────────────────────────────────
function Card({ children, style, ...rest }) {
  return (
    <div style={{
      background: C.card, border: `1px solid ${C.border}`, borderRadius: 14,
      padding: 20, ...style
    }} {...rest}>
      {children}
    </div>
  );
}

// ─── BADGE ─────────────────────────────────────────────────────────────────────
function Badge({ children, color, soft }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      fontSize: 10, fontFamily: MONO, fontWeight: 600, letterSpacing: "0.04em",
      padding: "3px 8px", borderRadius: 6,
      color: color, background: soft,
    }}>
      {children}
    </span>
  );
}

// ─── CONNECT MODAL ─────────────────────────────────────────────────────────────
function ConnectModal({ tool, onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex",
      alignItems: "center", justifyContent: "center", zIndex: 9999,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16,
        padding: 32, maxWidth: 400, width: "90%", textAlign: "center",
      }}>
        <div style={{ fontSize: 36, marginBottom: 16 }}>🔌</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 8 }}>
          Connect {tool}
        </div>
        <div style={{ fontSize: 13, color: C.textSec, lineHeight: 1.6, marginBottom: 20 }}>
          API integration coming soon. This will pull real-time data from {tool}.
        </div>
        <button onClick={onClose} style={{
          padding: "10px 28px", borderRadius: 10, border: `1px solid ${C.border}`,
          background: C.card, color: C.text, fontSize: 13, fontWeight: 600,
          cursor: "pointer", fontFamily: FONT,
        }}>Close</button>
      </div>
    </div>
  );
}

// ─── KPI CARD ──────────────────────────────────────────────────────────────────
function KPICard({ label, value, sub, change, positive, icon: Icon, color }) {
  return (
    <Card style={{ flex: 1, minWidth: 200 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
          background: `${color}18`,
        }}>
          <Icon size={18} color={color} />
        </div>
        {change && (
          <Badge color={positive ? C.green : C.red} soft={positive ? C.greenSoft : C.redSoft}>
            {positive ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
            {change}
          </Badge>
        )}
      </div>
      <div style={{ fontSize: 24, fontWeight: 700, color: C.text, letterSpacing: "-0.02em", marginBottom: 2 }}>{value}</div>
      <div style={{ fontSize: 12, color: C.textSec }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: C.textDim, marginTop: 2 }}>{sub}</div>}
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  DASHBOARD VIEW
// ═══════════════════════════════════════════════════════════════════════════════
function DashboardView({ onConnect }) {
  const totalSpend = CAMPAIGNS.reduce((s, c) => s + c.spend, 0);
  const maxPipeline = Math.max(...PIPELINE.map(p => p.count));
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, letterSpacing: "-0.01em", margin: 0, fontFamily: FONT }}>
            Command Center
          </h1>
          <div style={{ fontSize: 12, color: C.textSec, marginTop: 2 }}>{today}</div>
        </div>
        <Badge color={C.green} soft={C.greenSoft}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, boxShadow: `0 0 8px ${C.green}`, animation: "pulse 2s infinite" }} />
          Live · Updated just now
        </Badge>
      </div>

      {/* ROW 1 — KPIs */}
      <div style={{ display: "flex", gap: 14, marginBottom: 16, flexWrap: "wrap" }}>
        <KPICard label="New Leads This Week" value="24" sub="via GoHighLevel" change="12%" positive icon={Zap} color={C.ghlBlue} />
        <KPICard label="Avg Google Rank" value="#4.2" sub="via BrightLocal" change="0.8 positions" positive icon={MapPin} color="#0F766E" />
        <KPICard label="Ad Spend / ROAS" value="$2,840" sub="3.4x ROAS · via Madgicx" change="18%" positive icon={DollarSign} color={C.blue} />
        <KPICard label="Reputation Score" value="4.7★" sub="3 new reviews this week" change="2 reviews" positive icon={Star} color={C.orange} />
      </div>

      {/* ROW 2 — Pipeline */}
      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Lead Pipeline</span>
            <Badge color={C.ghlBlue} soft={`${C.ghlBlue}18`}>GoHighLevel</Badge>
          </div>
          <span style={{ fontSize: 12, fontFamily: MONO, color: C.textDim }}>32 total leads</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {PIPELINE.map(p => (
            <div key={p.stage} style={{
              flex: 1, background: C.surface, borderRadius: 10, padding: "14px 12px",
              border: `1px solid ${C.border}`, textAlign: "center",
            }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: p.color, marginBottom: 4 }}>{p.count}</div>
              <div style={{ fontSize: 10, color: C.textSec, marginBottom: 8, fontWeight: 500 }}>{p.stage}</div>
              <div style={{ height: 4, background: `${p.color}20`, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(p.count / maxPipeline) * 100}%`, background: p.color, borderRadius: 2, transition: "width 0.5s ease" }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ROW 3 — SEO + Ads */}
      <div style={{ display: "flex", gap: 14, marginBottom: 16 }}>
        {/* LEFT — SEO Rankings */}
        <Card style={{ flex: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Local SEO Rankings</span>
            <Badge color="#0F766E" soft="rgba(15,118,110,0.15)">BrightLocal</Badge>
            <span style={{ fontSize: 11, color: C.textDim, marginLeft: "auto" }}>Miami Plumbing Pro</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Keyword", "Rank", "Change", "Map Pack"].map(h => (
                  <th key={h} style={{
                    textAlign: "left", padding: "8px 10px", fontSize: 10, fontFamily: MONO,
                    color: C.textDim, letterSpacing: "0.06em", borderBottom: `1px solid ${C.border}`,
                    fontWeight: 600,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SEO_KEYWORDS.map((kw, i) => (
                <tr key={i} style={{ borderBottom: i < SEO_KEYWORDS.length - 1 ? `1px solid ${C.border}44` : "none" }}>
                  <td style={{ padding: "10px 10px", fontSize: 13, color: C.text, fontWeight: 500 }}>{kw.keyword}</td>
                  <td style={{ padding: "10px 10px", fontSize: 14, fontWeight: 700, color: C.text, fontFamily: MONO }}>#{kw.rank}</td>
                  <td style={{ padding: "10px 10px" }}>
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 3,
                      fontSize: 12, fontWeight: 600, fontFamily: MONO,
                      color: kw.dir === "up" ? C.green : kw.dir === "down" ? C.red : C.textDim,
                    }}>
                      {kw.dir === "up" && <ArrowUp size={12} />}
                      {kw.dir === "down" && <ArrowDown size={12} />}
                      {kw.dir === "flat" && <Minus size={12} />}
                      {kw.dir === "up" ? `↑${kw.change}` : kw.dir === "down" ? `↓${Math.abs(kw.change)}` : "—"}
                    </span>
                  </td>
                  <td style={{ padding: "10px 10px" }}>
                    <span style={{
                      fontSize: 11, fontWeight: 600,
                      color: kw.mapPack ? C.green : C.red,
                    }}>
                      {kw.mapPack ? "✓ Yes" : "✗ No"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* RIGHT — Ad Performance */}
        <Card style={{ flex: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Ad Performance</span>
            <Badge color={C.blue} soft={C.blueSoft}>Madgicx</Badge>
          </div>
          {CAMPAIGNS.map((camp, i) => (
            <div key={i} style={{
              padding: "14px 14px", marginBottom: i < CAMPAIGNS.length - 1 ? 10 : 0,
              background: C.surface, borderRadius: 10, border: `1px solid ${C.border}`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{camp.name}</span>
                <span style={{ fontSize: 12, fontFamily: MONO, color: C.green, fontWeight: 600 }}>{camp.roas}x ROAS</span>
              </div>
              <div style={{ display: "flex", gap: 16, fontSize: 11, color: C.textSec, marginBottom: 8 }}>
                <span>${camp.spend.toLocaleString()} spend</span>
                <span>{camp.leads} leads</span>
              </div>
              <div style={{ height: 4, background: `${C.blue}20`, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(camp.spend / totalSpend) * 100}%`, background: C.blue, borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* ROW 4 — Activity + Reputation */}
      <div style={{ display: "flex", gap: 14, marginBottom: 16 }}>
        {/* LEFT — Activity Feed */}
        <Card style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Recent Activity Feed</span>
            <Badge color={C.teal} soft={C.tealSoft}>Live</Badge>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {ACTIVITY.map((a, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 12px",
                borderRadius: 8, borderLeft: `3px solid ${a.color}`,
                background: i === 0 ? `${a.color}08` : "transparent",
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: "50%", background: a.color,
                  flexShrink: 0, marginTop: 5, boxShadow: i === 0 ? `0 0 8px ${a.color}` : "none",
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.5 }}>
                    {a.text}
                    {a.client && <span style={{ color: C.textDim }}> ({a.client})</span>}
                  </div>
                </div>
                <span style={{ fontSize: 10, fontFamily: MONO, color: C.textDim, flexShrink: 0, marginTop: 2 }}>{a.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* RIGHT — Reputation */}
        <Card style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Reputation Overview</span>
            <Badge color={C.purple} soft={C.purpleSoft}>Awario + GHL</Badge>
          </div>
          {CLIENTS.map((cl, i) => (
            <div key={cl.id} style={{
              padding: "14px", marginBottom: i < CLIENTS.length - 1 ? 10 : 0,
              background: C.surface, borderRadius: 10, border: `1px solid ${C.border}`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{cl.name}</span>
                <Badge
                  color={cl.sentiment === "Very Positive" ? C.green : cl.sentiment === "Positive" ? C.teal : C.yellow}
                  soft={cl.sentiment === "Very Positive" ? C.greenSoft : cl.sentiment === "Positive" ? C.tealSoft : `${C.yellow}18`}
                >
                  {cl.sentiment}
                </Badge>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Star size={14} fill={C.yellow} color={C.yellow} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.text, fontFamily: MONO }}>{cl.rating}</span>
                </div>
                <span style={{ fontSize: 11, color: C.textSec }}>{cl.reviews} reviews</span>
                <span style={{ fontSize: 11, color: C.green }}>+{cl.reviewsMonth} this month</span>
                <div style={{ marginLeft: "auto" }}>
                  <Sparkline data={[2,3,1,4,2,5,cl.reviewsMonth]} color={C.teal} width={60} height={20} />
                </div>
              </div>
              {/* Star bar */}
              <div style={{ height: 3, background: `${C.yellow}20`, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(cl.rating / 5) * 100}%`, background: C.yellow, borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* BOTTOM BANNER — Connect */}
      <Card style={{ background: `linear-gradient(135deg, ${C.card}, ${C.surface})`, borderColor: C.borderLight }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <span style={{ fontSize: 18 }}>🔌</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Connect your tools to go live</span>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
          {TOOLS.map(t => (
            <button key={t.key} onClick={() => onConnect(t.name)} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 16px", borderRadius: 8,
              background: `${t.color}14`, border: `1px solid ${t.color}44`,
              color: t.color, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: FONT,
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = `${t.color}28`; }}
              onMouseLeave={e => { e.currentTarget.style.background = `${t.color}14`; }}
            >
              <t.icon size={14} />
              {t.name}
              <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: `${t.color}22`, fontFamily: MONO }}>Connect</span>
            </button>
          ))}
        </div>
        <div style={{ fontSize: 11, color: C.textDim }}>
          Currently showing demo data. Connect your accounts to see real-time data.
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  CLIENTS VIEW
// ═══════════════════════════════════════════════════════════════════════════════
function ClientsView() {
  const [selected, setSelected] = useState(null);
  const client = CLIENTS.find(c => c.id === selected);

  return (
    <div style={{ position: "relative" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 6px", fontFamily: FONT }}>Clients</h1>
      <div style={{ fontSize: 12, color: C.textSec, marginBottom: 24 }}>{CLIENTS.length} active clients</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {CLIENTS.map(cl => (
          <Card key={cl.id} style={{ cursor: "pointer", transition: "all 0.2s", borderColor: selected === cl.id ? C.teal : C.border }}
            onClick={() => setSelected(selected === cl.id ? null : cl.id)}
            onMouseEnter={e => { if (selected !== cl.id) e.currentTarget.style.borderColor = C.borderLight; }}
            onMouseLeave={e => { if (selected !== cl.id) e.currentTarget.style.borderColor = C.border; }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>{cl.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Badge color={C.green} soft={C.greenSoft}>{cl.status}</Badge>
                  <Badge color={C.teal} soft={C.tealSoft}>{cl.tier}</Badge>
                  <span style={{ fontSize: 11, color: C.textDim }}>Since {cl.since}</span>
                </div>
              </div>
              <ChevronRight size={18} color={C.textDim} style={{ transform: selected === cl.id ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} />
            </div>
            {/* Mini KPIs */}
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { label: "Leads", value: cl.leads, icon: Zap, color: C.ghlBlue },
                { label: "Rank", value: `#${cl.rank}`, icon: MapPin, color: "#0F766E" },
                { label: "ROAS", value: `${cl.roas}x`, icon: TrendingUp, color: C.blue },
                { label: "Reviews", value: cl.reviews, icon: Star, color: C.orange },
              ].map(kpi => (
                <div key={kpi.label} style={{
                  flex: 1, display: "flex", alignItems: "center", gap: 8,
                  padding: "8px 12px", borderRadius: 8, background: C.surface, border: `1px solid ${C.border}`,
                }}>
                  <kpi.icon size={14} color={kpi.color} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.text, fontFamily: MONO }}>{kpi.value}</div>
                    <div style={{ fontSize: 9, color: C.textDim, fontFamily: MONO, letterSpacing: "0.04em" }}>{kpi.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Slide-in Detail Panel */}
      {client && (
        <div style={{
          position: "fixed", top: 0, right: 0, width: 420, height: "100vh",
          background: C.surface, borderLeft: `1px solid ${C.border}`,
          zIndex: 100, padding: 28, overflowY: "auto",
          boxShadow: "-8px 0 32px rgba(0,0,0,0.4)",
          animation: "slideIn 0.25s ease",
        }}>
          <button onClick={() => setSelected(null)} style={{
            position: "absolute", top: 16, right: 16, background: "none", border: "none",
            color: C.textDim, cursor: "pointer", padding: 4,
          }}>
            <X size={20} />
          </button>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 4 }}>{client.name}</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            <Badge color={C.green} soft={C.greenSoft}>{client.status}</Badge>
            <Badge color={C.teal} soft={C.tealSoft}>{client.tier}</Badge>
          </div>

          <div style={{ fontSize: 10, fontFamily: MONO, color: C.textDim, letterSpacing: "0.1em", marginBottom: 10 }}>KEY METRICS</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
            {[
              { label: "Leads This Week", value: client.leads, color: C.ghlBlue },
              { label: "Avg Rank", value: `#${client.rank}`, color: "#0F766E" },
              { label: "ROAS", value: `${client.roas}x`, color: C.blue },
              { label: "Reviews", value: client.reviews, color: C.orange },
              { label: "Rating", value: `${client.rating}★`, color: C.yellow },
              { label: "New Reviews/Mo", value: `+${client.reviewsMonth}`, color: C.green },
            ].map(m => (
              <div key={m.label} style={{
                padding: "14px", borderRadius: 10, background: C.card, border: `1px solid ${C.border}`,
              }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: m.color, fontFamily: MONO, marginBottom: 2 }}>{m.value}</div>
                <div style={{ fontSize: 10, color: C.textDim }}>{m.label}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 10, fontFamily: MONO, color: C.textDim, letterSpacing: "0.1em", marginBottom: 10 }}>SENTIMENT</div>
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Star size={16} fill={C.yellow} color={C.yellow} />
              <span style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{client.rating}</span>
              <span style={{ fontSize: 12, color: C.textSec }}>/ 5.0</span>
              <Badge
                color={client.sentiment === "Very Positive" ? C.green : client.sentiment === "Positive" ? C.teal : C.yellow}
                soft={client.sentiment === "Very Positive" ? C.greenSoft : client.sentiment === "Positive" ? C.tealSoft : `${C.yellow}18`}
              >
                {client.sentiment}
              </Badge>
            </div>
            <Sparkline data={[3,5,2,7,4,6,client.reviewsMonth]} color={C.teal} width={320} height={40} />
          </Card>

          <div style={{ fontSize: 10, fontFamily: MONO, color: C.textDim, letterSpacing: "0.1em", marginTop: 24, marginBottom: 10 }}>CLIENT INFO</div>
          <Card>
            <div style={{ fontSize: 12, color: C.textSec, lineHeight: 2 }}>
              <div><strong style={{ color: C.text }}>Started:</strong> {client.since}</div>
              <div><strong style={{ color: C.text }}>Tier:</strong> {client.tier}</div>
              <div><strong style={{ color: C.text }}>Status:</strong> {client.status}</div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  TOOL-SPECIFIC VIEWS
// ═══════════════════════════════════════════════════════════════════════════════

function GHLView({ onConnect }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: 0, fontFamily: FONT }}>GoHighLevel · Leads</h1>
          <div style={{ fontSize: 12, color: C.textSec, marginTop: 2 }}>Lead management and pipeline tracking</div>
        </div>
        <button onClick={() => onConnect("GoHighLevel")} style={{
          padding: "8px 16px", borderRadius: 8, background: `${C.ghlBlue}18`,
          border: `1px solid ${C.ghlBlue}44`, color: C.ghlBlue, fontSize: 12, fontWeight: 600,
          cursor: "pointer", fontFamily: FONT, display: "flex", alignItems: "center", gap: 6,
        }}>
          <Zap size={14} /> Connect GHL API
        </button>
      </div>

      <div style={{ display: "flex", gap: 14, marginBottom: 16 }}>
        <KPICard label="New Leads This Week" value="24" change="12%" positive icon={Zap} color={C.ghlBlue} />
        <KPICard label="Pipeline Value" value="$48,200" change="8%" positive icon={DollarSign} color={C.green} />
        <KPICard label="Conversion Rate" value="18.2%" change="2.4%" positive icon={Target} color={C.teal} />
      </div>

      <Card style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 16 }}>Lead Pipeline</div>
        <div style={{ display: "flex", gap: 10 }}>
          {PIPELINE.map(p => (
            <div key={p.stage} style={{
              flex: 1, background: C.surface, borderRadius: 10, padding: "16px 12px",
              border: `1px solid ${C.border}`, textAlign: "center",
            }}>
              <div style={{ fontSize: 26, fontWeight: 700, color: p.color }}>{p.count}</div>
              <div style={{ fontSize: 11, color: C.textSec, marginTop: 4 }}>{p.stage}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 16 }}>Recent Leads</div>
        {[
          { name: "John Martinez", source: "Meta Ad", time: "2m ago", status: "New" },
          { name: "Sarah Chen", source: "Google Search", time: "5h ago", status: "Contacted" },
          { name: "Mike Thompson", source: "GBP", time: "Yesterday", status: "Qualified" },
          { name: "Lisa Rodriguez", source: "Referral", time: "Yesterday", status: "Proposal Sent" },
        ].map((lead, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "12px 14px", borderRadius: 8, marginBottom: 6,
            background: C.surface, border: `1px solid ${C.border}`,
          }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{lead.name}</div>
              <div style={{ fontSize: 11, color: C.textDim }}>via {lead.source}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Badge color={C.teal} soft={C.tealSoft}>{lead.status}</Badge>
              <span style={{ fontSize: 10, fontFamily: MONO, color: C.textDim }}>{lead.time}</span>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function BrightLocalView({ onConnect }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: 0, fontFamily: FONT }}>BrightLocal · SEO</h1>
          <div style={{ fontSize: 12, color: C.textSec, marginTop: 2 }}>Local search rankings and citation management</div>
        </div>
        <button onClick={() => onConnect("BrightLocal")} style={{
          padding: "8px 16px", borderRadius: 8, background: "rgba(15,118,110,0.18)",
          border: "1px solid rgba(15,118,110,0.44)", color: "#0F766E", fontSize: 12, fontWeight: 600,
          cursor: "pointer", fontFamily: FONT, display: "flex", alignItems: "center", gap: 6,
        }}>
          <MapPin size={14} /> Connect BrightLocal API
        </button>
      </div>

      <div style={{ display: "flex", gap: 14, marginBottom: 16 }}>
        <KPICard label="Avg Google Rank" value="#4.2" change="0.8" positive icon={MapPin} color="#0F766E" />
        <KPICard label="Map Pack Keywords" value="4 / 5" sub="80% in 3-pack" icon={Globe} color={C.teal} />
        <KPICard label="Citation Accuracy" value="94%" change="3%" positive icon={CheckCircle2} color={C.green} />
      </div>

      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Keyword Rankings</span>
          <span style={{ fontSize: 11, color: C.textDim, marginLeft: "auto" }}>Miami Plumbing Pro</span>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Keyword", "Rank", "Change", "Map Pack"].map(h => (
                <th key={h} style={{
                  textAlign: "left", padding: "8px 10px", fontSize: 10, fontFamily: MONO,
                  color: C.textDim, letterSpacing: "0.06em", borderBottom: `1px solid ${C.border}`, fontWeight: 600,
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SEO_KEYWORDS.map((kw, i) => (
              <tr key={i}>
                <td style={{ padding: "10px", fontSize: 13, color: C.text, fontWeight: 500 }}>{kw.keyword}</td>
                <td style={{ padding: "10px", fontSize: 14, fontWeight: 700, color: C.text, fontFamily: MONO }}>#{kw.rank}</td>
                <td style={{ padding: "10px" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, fontFamily: MONO, color: kw.dir === "up" ? C.green : kw.dir === "down" ? C.red : C.textDim }}>
                    {kw.dir === "up" ? `↑${kw.change}` : kw.dir === "down" ? `↓${Math.abs(kw.change)}` : "—"}
                  </span>
                </td>
                <td style={{ padding: "10px", fontSize: 11, fontWeight: 600, color: kw.mapPack ? C.green : C.red }}>
                  {kw.mapPack ? "✓ Yes" : "✗ No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 16 }}>Rank Trend (Last 12 Weeks)</div>
        <Sparkline data={[12, 10, 8, 7, 6, 6, 5, 5, 4, 4, 4, 4]} color="#0F766E" width={500} height={60} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <span style={{ fontSize: 10, fontFamily: MONO, color: C.textDim }}>12 weeks ago</span>
          <span style={{ fontSize: 10, fontFamily: MONO, color: C.textDim }}>Now</span>
        </div>
      </Card>
    </div>
  );
}

function MadgicxView({ onConnect }) {
  const totalSpend = CAMPAIGNS.reduce((s, c) => s + c.spend, 0);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: 0, fontFamily: FONT }}>Madgicx · Ads</h1>
          <div style={{ fontSize: 12, color: C.textSec, marginTop: 2 }}>Ad campaign performance and optimization</div>
        </div>
        <button onClick={() => onConnect("Madgicx")} style={{
          padding: "8px 16px", borderRadius: 8, background: C.blueSoft,
          border: `1px solid ${C.blue}44`, color: C.blue, fontSize: 12, fontWeight: 600,
          cursor: "pointer", fontFamily: FONT, display: "flex", alignItems: "center", gap: 6,
        }}>
          <TrendingUp size={14} /> Connect Madgicx API
        </button>
      </div>

      <div style={{ display: "flex", gap: 14, marginBottom: 16 }}>
        <KPICard label="Total Ad Spend" value={`$${totalSpend.toLocaleString()}`} change="18%" positive icon={DollarSign} color={C.blue} />
        <KPICard label="Blended ROAS" value="3.4x" change="0.3x" positive icon={TrendingUp} color={C.green} />
        <KPICard label="Total Leads" value="63" change="22%" positive icon={Target} color={C.teal} />
      </div>

      <Card>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 16 }}>Campaign Breakdown</div>
        {CAMPAIGNS.map((camp, i) => (
          <div key={i} style={{
            padding: "16px", marginBottom: i < CAMPAIGNS.length - 1 ? 12 : 0,
            background: C.surface, borderRadius: 10, border: `1px solid ${C.border}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{camp.name}</span>
              <Badge color={C.green} soft={C.greenSoft}>{camp.roas}x ROAS</Badge>
            </div>
            <div style={{ display: "flex", gap: 20, marginBottom: 10 }}>
              {[
                { label: "Spend", value: `$${camp.spend.toLocaleString()}` },
                { label: "Leads", value: camp.leads },
                { label: "CPL", value: `$${(camp.spend / camp.leads).toFixed(0)}` },
              ].map(m => (
                <div key={m.label}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: C.text, fontFamily: MONO }}>{m.value}</div>
                  <div style={{ fontSize: 10, color: C.textDim }}>{m.label}</div>
                </div>
              ))}
            </div>
            <div style={{ height: 4, background: `${C.blue}20`, borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(camp.spend / totalSpend) * 100}%`, background: C.blue, borderRadius: 2 }} />
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function AwarioView({ onConnect }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: 0, fontFamily: FONT }}>Awario · Reputation</h1>
          <div style={{ fontSize: 12, color: C.textSec, marginTop: 2 }}>Brand monitoring and reputation management</div>
        </div>
        <button onClick={() => onConnect("Awario")} style={{
          padding: "8px 16px", borderRadius: 8, background: C.purpleSoft,
          border: `1px solid ${C.purple}44`, color: C.purple, fontSize: 12, fontWeight: 600,
          cursor: "pointer", fontFamily: FONT, display: "flex", alignItems: "center", gap: 6,
        }}>
          <Shield size={14} /> Connect Awario API
        </button>
      </div>

      <div style={{ display: "flex", gap: 14, marginBottom: 16 }}>
        <KPICard label="Avg Rating" value="4.7★" change="0.1" positive icon={Star} color={C.yellow} />
        <KPICard label="Total Reviews" value="159" change="9 this month" positive icon={MessageSquare} color={C.purple} />
        <KPICard label="Sentiment Score" value="92%" sub="Positive" icon={Shield} color={C.green} />
      </div>

      <Card>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 16 }}>Client Reputation</div>
        {CLIENTS.map((cl, i) => (
          <div key={cl.id} style={{
            padding: "16px", marginBottom: i < CLIENTS.length - 1 ? 12 : 0,
            background: C.surface, borderRadius: 10, border: `1px solid ${C.border}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{cl.name}</span>
              <Badge
                color={cl.sentiment === "Very Positive" ? C.green : cl.sentiment === "Positive" ? C.teal : C.yellow}
                soft={cl.sentiment === "Very Positive" ? C.greenSoft : cl.sentiment === "Positive" ? C.tealSoft : `${C.yellow}18`}
              >
                {cl.sentiment}
              </Badge>
            </div>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Star size={16} fill={C.yellow} color={C.yellow} />
                <span style={{ fontSize: 18, fontWeight: 700, color: C.text, fontFamily: MONO }}>{cl.rating}</span>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{cl.reviews} reviews</div>
                <div style={{ fontSize: 11, color: C.green }}>+{cl.reviewsMonth} this month</div>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <Sparkline data={[1,3,2,4,3,5,cl.reviewsMonth]} color={C.purple} width={100} height={30} />
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  SVG LOGO
// ═══════════════════════════════════════════════════════════════════════════════
function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 6px" }}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-label="Zero to Hero logo">
        {/* Rocket / arrow mark */}
        <rect x="2" y="2" width="28" height="28" rx="8" fill={C.teal} opacity="0.12" />
        <path d="M16 6L22 14H18V22H14V14H10L16 6Z" fill={C.teal} />
        <circle cx="16" cy="25" r="1.5" fill={C.orange} />
      </svg>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.text, letterSpacing: "-0.01em", lineHeight: 1.2 }}>ZERO TO HERO</div>
        <div style={{ fontSize: 9, fontFamily: MONO, color: C.textDim, letterSpacing: "0.06em" }}>Agency OS</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MAIN APP SHELL
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [view, setView] = useState("dashboard");
  const [connectModal, setConnectModal] = useState(null);

  const handleConnect = useCallback((toolName) => {
    setConnectModal(toolName);
  }, []);

  const renderView = () => {
    switch (view) {
      case "dashboard": return <DashboardView onConnect={handleConnect} />;
      case "clients": return <ClientsView />;
      case "ghl": return <GHLView onConnect={handleConnect} />;
      case "brightlocal": return <BrightLocalView onConnect={handleConnect} />;
      case "madgicx": return <MadgicxView onConnect={handleConnect} />;
      case "awario": return <AwarioView onConnect={handleConnect} />;
      case "guides": return <AgencyZeroToHero />;
      default: return <DashboardView onConnect={handleConnect} />;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, fontFamily: FONT, color: C.text, WebkitFontSmoothing: "antialiased" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; background: ${C.bg}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
        ::selection { background: ${C.teal}44; }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>

      {connectModal && <ConnectModal tool={connectModal} onClose={() => setConnectModal(null)} />}

      {/* ── SIDEBAR ── */}
      <div style={{
        width: 220, flexShrink: 0, background: C.surface,
        borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column",
        height: "100vh", position: "sticky", top: 0,
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 16px 16px" }}>
          <Logo />
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "0 10px", overflowY: "auto" }}>
          {NAV.map((item, i) => {
            if (item.section) {
              return (
                <div key={i} style={{
                  fontSize: 9, fontFamily: MONO, color: C.textDim, letterSpacing: "0.1em",
                  padding: "16px 10px 6px", fontWeight: 600,
                }}>
                  {item.section}
                </div>
              );
            }
            const active = view === item.id;
            const Icon = item.icon;
            const accentColor = item.color || C.teal;
            return (
              <button key={item.id} onClick={() => setView(item.id)} style={{
                display: "flex", alignItems: "center", gap: 10, width: "100%",
                padding: "9px 10px", marginBottom: 2, borderRadius: 8,
                background: active ? `${accentColor}12` : "transparent",
                border: "none", borderLeft: active ? `3px solid ${accentColor}` : "3px solid transparent",
                cursor: "pointer", textAlign: "left", transition: "all 0.15s",
                fontFamily: FONT,
              }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = `${C.text}06`; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                <Icon size={16} color={active ? accentColor : C.textDim} />
                <span style={{
                  fontSize: 12.5, fontWeight: active ? 600 : 400,
                  color: active ? C.text : C.textSec,
                }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{
          padding: "14px 20px", borderTop: `1px solid ${C.border}`,
          fontSize: 10, fontFamily: MONO, color: C.textDim, letterSpacing: "0.04em",
        }}>
          v2.0 · Agency OS
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, overflowY: "auto", maxHeight: "100vh" }}>
        <div style={{ padding: view === "guides" ? 0 : "28px 32px", maxWidth: view === "guides" ? "none" : 1100 }}>
          {renderView()}
        </div>
      </div>
    </div>
  );
}
