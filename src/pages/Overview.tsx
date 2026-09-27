import { Link } from 'react-router-dom'
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { ArrowUpRight, TrendingUp, ArrowRight, Building2, Sparkles } from 'lucide-react'
import { Card, Badge, Sparkline, Button } from '../components/ui'
import {
  BRAND,
  OVERVIEW_KPIS,
  PILLARS,
  UTILIZATION_MONTHLY,
} from '../data/madaar'
import { cx, pct } from '../lib/format'

const toneColor: Record<string, string> = {
  brand: '#6366f1',
  teal: '#14b8a6',
  gold: '#f59e0b',
}

const pillarAccent: Record<string, string> = {
  brand: 'from-brand-500 to-brand-700',
  teal: 'from-teal-500 to-teal-600',
  gold: 'from-gold-500 to-gold-600',
  rose: 'from-rose-500 to-rose-600',
}

export default function Overview() {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-900 to-brand-700" />
        <div className="absolute -right-16 -top-16 size-72 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 size-72 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="relative flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl text-white">
            <Badge tone="teal" className="mb-4 !bg-white/10 !text-teal-200 !ring-white/20">
              <Sparkles size={12} /> {BRAND.vision}
            </Badge>
            <h1 className="text-3xl font-black leading-tight tracking-tight lg:text-4xl">
              The smart operating system for schools
            </h1>
            <p className="mt-3 text-sm text-slate-300 lg:text-base">
              MADAAR ({BRAND.nameAr}) turns every campus into an optimized,
              revenue-generating, data-driven asset — mapping space, monetizing
              idle hours, and opening the door to private investment.
            </p>
            <p className="mt-3 text-xs font-medium text-white/70">
              Prepared by {BRAND.preparedBy} · {BRAND.preparedByAr}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/space/simulation">
                <Button variant="teal">
                  Launch Space Engine <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/strategy/pitch-deck">
                <Button variant="outline" className="!border-white/30 !bg-white/10 !text-white hover:!bg-white/20">
                  View Investor Deck
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { k: '25K+', v: 'Schools addressable' },
              { k: '87%', v: 'Space utilization' },
              { k: 'SAR 4.2M', v: 'Annual savings' },
              { k: '14 mo', v: 'Payback period' },
            ].map((s) => (
              <div
                key={s.v}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
              >
                <div className="text-2xl font-black text-white">{s.k}</div>
                <div className="text-xs text-slate-300">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {OVERVIEW_KPIS.map((kpi) => (
          <Card key={kpi.id} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {kpi.label}
                </div>
                <div className="mt-1 text-2xl font-black text-slate-900">
                  {kpi.value}
                </div>
              </div>
              <Badge tone={kpi.delta >= 0 ? 'green' : 'rose'}>
                <TrendingUp size={12} /> {pct(kpi.delta)}
              </Badge>
            </div>
            <div className="mt-3">
              <Sparkline data={kpi.spark} color={toneColor[kpi.tone]} width={220} height={40} />
            </div>
          </Card>
        ))}
      </div>

      {/* Chart + pillars */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Space utilization: before vs. after AI
              </h2>
              <p className="text-sm text-slate-500">
                Rolling campus-wide efficiency across the academic year
              </p>
            </div>
            <Badge tone="green">
              <ArrowUpRight size={12} /> +23 pts
            </Badge>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={UTILIZATION_MONTHLY} margin={{ left: -20, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="before" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#94a3b8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="after" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: '1px solid #e2e8f0',
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="before" stroke="#94a3b8" strokeWidth={2} fill="url(#before)" name="Before" />
                <Area type="monotone" dataKey="after" stroke="#6366f1" strokeWidth={2.5} fill="url(#after)" name="After" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-bold text-slate-900">Live activity</h2>
          <p className="text-sm text-slate-500">Across connected campuses</p>
          <div className="mt-4 space-y-3">
            {[
              { icon: '⚽', t: 'Football field booked', s: 'Al-Nasr Academy · SAR 640', c: 'green' },
              { icon: '🧪', t: 'VR titration completed', s: 'G10 · 24 students', c: 'teal' },
              { icon: '📊', t: 'Q3 report generated', s: 'Auto · 32 pages', c: 'brand' },
              { icon: '🤝', t: 'New PPP bid received', s: 'Jeddah Science Academy', c: 'gold' },
              { icon: '🤖', t: '1,204 AI tutor sessions', s: 'Today · +18%', c: 'brand' },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-lg">
                  {a.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-slate-800">
                    {a.t}
                  </div>
                  <div className="truncate text-xs text-slate-500">{a.s}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Pillars */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Building2 size={18} className="text-brand-600" />
          <h2 className="text-lg font-bold text-slate-900">Platform pillars</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {PILLARS.map((pillar) => (
            <Card key={pillar.id} className="overflow-hidden">
              <div className={cx('h-1.5 w-full bg-gradient-to-r', pillarAccent[pillar.accent])} />
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <div
                    className={cx(
                      'grid size-10 place-items-center rounded-xl bg-gradient-to-br text-sm font-black text-white',
                      pillarAccent[pillar.accent],
                    )}
                  >
                    {pillar.index}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {pillar.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-slate-500">{pillar.summary}</p>
                <div className="mt-4 space-y-1.5">
                  {pillar.deliverables.map((d) => (
                    <Link
                      key={d.path}
                      to={d.path}
                      className="group flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2 transition-colors hover:border-brand-200 hover:bg-brand-50/50"
                    >
                      <div>
                        <div className="text-sm font-semibold text-slate-700 group-hover:text-brand-700">
                          {d.name}
                        </div>
                        <div className="text-xs text-slate-400">{d.blurb}</div>
                      </div>
                      <ArrowRight
                        size={16}
                        className="shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-brand-500"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
