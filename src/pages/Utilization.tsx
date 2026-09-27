import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Cpu,
} from 'lucide-react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts'
import { PageHeader, Card, Badge, Stat } from '../components/ui'
import {
  UTILIZATION_MONTHLY,
  STAFF_DISTRIBUTION,
  ROOM_UTIL_RADAR,
} from '../data/madaar'

const chartTooltip = {
  borderRadius: 12,
  border: '1px solid #e2e8f0',
  fontSize: 12,
}

export default function Utilization() {
  return (
    <div>
      <PageHeader
        kicker="Pillar 1 · Asset & Space Management"
        title="Utilization Dashboard"
        description="Compare teaching and administrative staff distribution and space efficiency — before and after applying MADAAR's AI spatial algorithms."
        icon={<BarChart3 size={22} />}
        actions={
          <Badge tone="brand">
            <Cpu size={12} /> AI optimization: ON
          </Badge>
        }
      />

      {/* KPIs */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Space efficiency" value="87%" tone="brand" hint={<Delta up value="+23 pts" />} />
        <Stat label="Teaching staff ratio" value="71%" tone="teal" hint={<Delta up value="+9 pts" />} />
        <Stat label="Admin overhead" value="15%" tone="gold" hint={<Delta down value="−9 pts" />} />
        <Stat label="Cost per m²" value="SAR 118" tone="brand" hint={<Delta down value="−19%" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Utilization trend */}
        <Card className="p-6">
          <h2 className="font-bold text-slate-900">Monthly space utilization</h2>
          <p className="mb-4 text-sm text-slate-500">Before vs. after AI optimization</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={UTILIZATION_MONTHLY} margin={{ left: -20, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip contentStyle={chartTooltip} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="before" name="Before" stroke="#94a3b8" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="after" name="After" stroke="#6366f1" strokeWidth={3} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Staff distribution */}
        <Card className="p-6">
          <h2 className="font-bold text-slate-900">Staff distribution efficiency</h2>
          <p className="mb-4 text-sm text-slate-500">Share of workforce by function (%)</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={STAFF_DISTRIBUTION} margin={{ left: -20, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="role" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip contentStyle={chartTooltip} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="before" name="Before" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
                <Bar dataKey="after" name="After" fill="#14b8a6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Radar by room type */}
        <Card className="p-6">
          <h2 className="font-bold text-slate-900">Utilization by room type</h2>
          <p className="mb-4 text-sm text-slate-500">Coverage across facility categories (%)</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={ROOM_UTIL_RADAR} outerRadius="70%">
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} />
                <PolarRadiusAxis tick={{ fontSize: 10, fill: '#94a3b8' }} angle={30} domain={[0, 100]} />
                <Radar name="Before" dataKey="before" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.25} />
                <Radar name="After" dataKey="after" stroke="#6366f1" fill="#6366f1" fillOpacity={0.35} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Tooltip contentStyle={chartTooltip} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Insights */}
        <Card className="p-6">
          <h2 className="mb-4 font-bold text-slate-900">AI insights & recommendations</h2>
          <div className="space-y-3">
            {[
              { tone: 'green', title: 'Consolidate under-used libraries', body: 'Library utilization at 48% — merging two reading zones frees 240 m² for evening rentals.' },
              { tone: 'amber', title: 'Re-balance admin footprint', body: 'Admin space exceeds benchmark by 9 pts. Hot-desking can reclaim 3 offices.' },
              { tone: 'brand', title: 'Shift labs to shared scheduling', body: 'Science labs at 61% — AI scheduling lifts this to 82% without new build.' },
              { tone: 'teal', title: 'Monetize the multi-purpose hall', body: 'Hall idle 62% of the week — projected SAR 460/hr in community demand.' },
            ].map((i, idx) => (
              <div key={idx} className="flex gap-3 rounded-xl border border-slate-100 p-3">
                <div className="mt-0.5">
                  <Badge tone={i.tone as 'green'}>●</Badge>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">{i.title}</div>
                  <div className="text-xs text-slate-500">{i.body}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

function Delta({ value, up, down }: { value: string; up?: boolean; down?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 font-medium ${up ? 'text-emerald-600' : down ? 'text-emerald-600' : 'text-slate-500'}`}>
      {up ? <TrendingUp size={11} /> : down ? <TrendingDown size={11} /> : null}
      {value} vs. baseline
    </span>
  )
}
