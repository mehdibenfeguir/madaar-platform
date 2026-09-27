import {
  Network,
  Tags,
} from 'lucide-react'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts'
import { PageHeader, Card, Badge, Stat } from '../components/ui'
import {
  REVENUE_STREAMS,
  COST_STRUCTURE,
  PNL_PROJECTION,
  CANVAS_BLOCKS,
} from '../data/madaar'

// layout spans for the business model canvas (9 blocks)
const SPAN: Record<string, string> = {
  kp: 'lg:row-span-2',
  ka: '',
  kr: '',
  vp: 'lg:row-span-2',
  cr: '',
  ch: '',
  cs: 'lg:row-span-2',
  co: 'lg:col-span-2',
  re: 'lg:col-span-3',
}

const tone: Record<string, string> = {
  kp: 'border-brand-200 bg-brand-50/40',
  ka: 'border-teal-200 bg-teal-50/40',
  kr: 'border-teal-200 bg-teal-50/40',
  vp: 'border-gold-300 bg-gold-50/50',
  cr: 'border-rose-200 bg-rose-50/40',
  ch: 'border-rose-200 bg-rose-50/40',
  cs: 'border-brand-200 bg-brand-50/40',
  co: 'border-slate-200 bg-slate-50',
  re: 'border-emerald-200 bg-emerald-50/50',
}

export default function BusinessPlan() {
  return (
    <div>
      <PageHeader
        kicker="Pillar 4 · Operational Strategy"
        title="Business Plan Modeling Tool"
        description="An interactive canvas for modeling business structure, cost frameworks, revenue streams and implementation."
        icon={<Network size={22} />}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <Stat label="Y5 revenue" value="SAR 130M" tone="teal" />
        <Stat label="Gross margin" value="62%" tone="brand" />
        <Stat label="Break-even" value="Month 20" tone="gold" />
        <Stat label="Revenue streams" value={REVENUE_STREAMS.length} tone="brand" />
      </div>

      {/* Charts */}
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <Card className="p-6">
          <h2 className="mb-2 font-bold text-slate-900">Revenue streams</h2>
          <Donut data={REVENUE_STREAMS} />
        </Card>
        <Card className="p-6">
          <h2 className="mb-2 font-bold text-slate-900">Cost structure</h2>
          <Donut data={COST_STRUCTURE} />
        </Card>
        <Card className="p-6">
          <h2 className="mb-2 font-bold text-slate-900">P&amp;L projection (SAR M)</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={PNL_PROJECTION} margin={{ left: -18, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#14b8a6" strokeWidth={2.5} fill="url(#rev)" />
                <Line type="monotone" dataKey="cost" name="Cost" stroke="#f59e0b" strokeWidth={2.5} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Business Model Canvas */}
      <div className="mb-3 flex items-center gap-2">
        <Tags size={18} className="text-brand-600" />
        <h2 className="font-bold text-slate-900">Business Model Canvas</h2>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:grid-rows-[auto_auto_auto]">
        {CANVAS_BLOCKS.map((b) => (
          <div
            key={b.id}
            className={`rounded-2xl border p-4 ${tone[b.id]} ${SPAN[b.id]}`}
          >
            <div className="text-xs font-bold uppercase tracking-wide text-slate-600">
              {b.title}
            </div>
            <ul className="mt-2 space-y-1.5">
              {b.items.map((it) => (
                <li key={it} className="flex items-start gap-1.5 text-xs text-slate-600">
                  <span className="mt-1 size-1 shrink-0 rounded-full bg-slate-400" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="brand">Key infrastructure</Badge>
        <Badge tone="teal">Value delivery</Badge>
        <Badge tone="rose">Customer interface</Badge>
        <Badge tone="green">Revenue</Badge>
        <Badge tone="slate">Costs</Badge>
      </div>
    </div>
  )
}

function Donut({ data }: { data: { name: string; value: number; color: string }[] }) {
  return (
    <>
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={45} outerRadius={70} paddingAngle={2}>
              {data.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 space-y-1">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-2 text-xs">
            <span className="size-2.5 rounded-full" style={{ backgroundColor: d.color }} />
            <span className="text-slate-500">{d.name}</span>
            <span className="ml-auto font-semibold text-slate-800">{d.value}%</span>
          </div>
        ))}
      </div>
    </>
  )
}
