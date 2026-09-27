import { useMemo, useState } from 'react'
import {
  Handshake,
  MapPin,
  TrendingUp,
  Building,
  Users,
  Ruler,
  CheckCircle2,
} from 'lucide-react'
import { PageHeader, Card, Badge, Button, Stat } from '../components/ui'
import { OPPORTUNITIES, type Opportunity } from '../data/madaar'
import { cx, sar } from '../lib/format'

const STATUSES = ['All', 'Open', 'Under Review', 'Awarded']
const statusTone: Record<string, 'green' | 'amber' | 'slate'> = {
  Open: 'green',
  'Under Review': 'amber',
  Awarded: 'slate',
}

export default function PPPBidding() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState<Opportunity>(OPPORTUNITIES[0])
  const [bid, setBid] = useState('')
  const [submitted, setSubmitted] = useState<string | null>(null)

  const list = useMemo(
    () =>
      OPPORTUNITIES.filter((o) => filter === 'All' || o.status === filter),
    [filter],
  )

  const totalValue = OPPORTUNITIES.reduce((s, o) => s + o.investment, 0)
  const avgIrr = (
    OPPORTUNITIES.reduce((s, o) => s + o.irr, 0) / OPPORTUNITIES.length
  ).toFixed(1)

  function submitBid() {
    setSubmitted(`Bid of ${bid ? sar(Number(bid)) : sar(selected.investment)} submitted for ${selected.school}.`)
    setBid('')
    setTimeout(() => setSubmitted(null), 4000)
  }

  return (
    <div>
      <PageHeader
        kicker="Pillar 3 · Digital Transformation & Privatization"
        title="PPP Bidding Portal"
        description="An interactive showcase of school operational data open for private investment and privatization — aligned with Saudi Vision 2030."
        icon={<Handshake size={22} />}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Stat label="Total pipeline value" value={sar(totalValue, { compact: true })} tone="gold" />
        <Stat label="Live opportunities" value={OPPORTUNITIES.filter((o) => o.status === 'Open').length} tone="teal" />
        <Stat label="Avg. projected IRR" value={`${avgIrr}%`} tone="brand" hint={<span className="inline-flex items-center gap-1"><TrendingUp size={11} /> across pipeline</span>} />
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cx(
              'rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
              filter === s ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Opportunity list */}
        <div className="space-y-3">
          {list.map((o) => (
            <Card
              key={o.id}
              className={cx(
                'cursor-pointer p-5 transition-all',
                selected.id === o.id ? 'ring-2 ring-brand-400' : 'hover:border-slate-300',
              )}
            >
              <button className="w-full text-left" onClick={() => setSelected(o)}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900">{o.school}</h3>
                      <Badge tone={statusTone[o.status]}>{o.status}</Badge>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1"><MapPin size={11} /> {o.city}</span>
                      <span className="inline-flex items-center gap-1"><Building size={11} /> {o.model}</span>
                      <span className="inline-flex items-center gap-1"><Ruler size={11} /> {o.area.toLocaleString()} m²</span>
                      <span className="inline-flex items-center gap-1"><Users size={11} /> {o.students.toLocaleString()} students</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-slate-900">{o.irr}%</div>
                    <div className="text-[10px] uppercase tracking-wide text-slate-400">IRR · {o.term}y</div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <Mini label="Investment" value={sar(o.investment, { compact: true })} />
                  <Mini label="Annual revenue" value={sar(o.annualRevenue, { compact: true })} />
                  <Mini label="Revenue / student" value={sar(Math.round(o.annualRevenue / o.students))} />
                </div>
              </button>
            </Card>
          ))}
        </div>

        {/* Detail / bid */}
        <div className="space-y-4">
          <Card className="p-6">
            <div className="text-xs font-semibold uppercase tracking-wide text-brand-600">
              Selected opportunity
            </div>
            <h2 className="mt-1 text-lg font-bold text-slate-900">{selected.school}</h2>
            <div className="mt-1 text-sm text-slate-500">{selected.city} · {selected.model}</div>

            <dl className="mt-4 space-y-2 text-sm">
              <DetailRow label="Investment required" value={sar(selected.investment)} />
              <DetailRow label="Projected annual revenue" value={sar(selected.annualRevenue)} />
              <DetailRow label="Concession term" value={`${selected.term} years`} />
              <DetailRow label="Projected IRR" value={`${selected.irr}%`} highlight />
              <DetailRow label="Total contract value" value={sar(selected.annualRevenue * selected.term, { compact: true })} />
            </dl>

            <div className="mt-5">
              <label className="text-xs font-semibold text-slate-600">Your bid amount (SAR)</label>
              <input
                type="number"
                value={bid}
                onChange={(e) => setBid(e.target.value)}
                placeholder={String(selected.investment)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
              <Button
                variant="gold"
                className={cx('mt-3 w-full', selected.status !== 'Open' && 'pointer-events-none opacity-50')}
                onClick={submitBid}
              >
                {selected.status === 'Open' ? 'Submit investment bid' : 'Bidding closed'}
              </Button>
              {submitted && (
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 ring-1 ring-emerald-600/20">
                  <CheckCircle2 size={14} /> {submitted}
                </div>
              )}
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-ink-950 to-brand-700 p-5 text-white">
            <div className="text-sm font-bold">Vision 2030 alignment</div>
            <p className="mt-1 text-xs text-white/80">
              Private sector participation in education operations supports the
              National Transformation Program's privatization targets.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wide text-slate-400">{label}</div>
      <div className="text-sm font-bold text-slate-800">{value}</div>
    </div>
  )
}

function DetailRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-slate-500">{label}</dt>
      <dd className={cx('font-bold', highlight ? 'text-teal-600' : 'text-slate-800')}>{value}</dd>
    </div>
  )
}
