import { useMemo, useState } from 'react'
import {
  CalendarClock,
  Star,
  Users,
  CreditCard,
  CheckCircle2,
  Clock,
  TrendingUp,
} from 'lucide-react'
import { PageHeader, Card, Badge, Button, Stat } from '../components/ui'
import {
  FACILITIES,
  TIME_SLOTS,
  LIVE_BOOKINGS,
  type Facility,
} from '../data/madaar'
import { cx, sar } from '../lib/format'

type Booking = {
  id: string
  facility: string
  renter: string
  time: string
  amount: number
  status: string
}

const statusTone: Record<string, 'green' | 'teal' | 'amber' | 'slate'> = {
  Confirmed: 'green',
  Paid: 'teal',
  Pending: 'amber',
}

export default function Monetization() {
  const [selected, setSelected] = useState<Facility>(FACILITIES[0])
  const [slots, setSlots] = useState<string[]>([])
  const [renter, setRenter] = useState('')
  const [bookings, setBookings] = useState<Booking[]>(LIVE_BOOKINGS)
  const [flash, setFlash] = useState<string | null>(null)

  function toggleSlot(s: string) {
    setSlots((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s].sort(),
    )
  }

  const total = slots.length * selected.pricePerHour

  function confirmBooking() {
    if (slots.length === 0) return
    const sorted = [...slots].sort()
    const time = `${sorted[0]}–${addHour(sorted[sorted.length - 1])}`
    const b: Booking = {
      id: `b${Date.now()}`,
      facility: selected.name,
      renter: renter.trim() || 'Community Member',
      time: `Today · ${time}`,
      amount: total,
      status: 'Paid',
    }
    setBookings((prev) => [b, ...prev])
    setFlash(`Booked ${selected.name} for ${sar(total)} — payment captured.`)
    setSlots([])
    setRenter('')
    setTimeout(() => setFlash(null), 4000)
  }

  const revenue = useMemo(
    () => bookings.reduce((s, b) => s + b.amount, 0),
    [bookings],
  )

  return (
    <div>
      <PageHeader
        kicker="Pillar 1 · Asset & Space Management"
        title="Evening Monetization Portal"
        description="Rent school facilities to community members and academies during off-peak hours — with live tracking and integrated payments."
        icon={<CalendarClock size={22} />}
      />

      {/* KPIs */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Stat label="Revenue (this period)" value={sar(revenue, { compact: true })} tone="gold" hint={<span className="inline-flex items-center gap-1"><TrendingUp size={11} /> +34% MoM</span>} />
        <Stat label="Active bookings" value={bookings.length} tone="teal" />
        <Stat label="Avg. occupancy (evening)" value="68%" tone="brand" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Facilities + booking */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 font-bold text-slate-900">Available facilities</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {FACILITIES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setSelected(f)
                    setSlots([])
                  }}
                  className={cx(
                    'flex items-center gap-3 rounded-2xl border p-3 text-left transition-all',
                    selected.id === f.id
                      ? 'border-brand-400 bg-brand-50/60 ring-1 ring-brand-400'
                      : 'border-slate-200 hover:border-slate-300',
                  )}
                >
                  <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-slate-100 text-2xl">
                    {f.image}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-bold text-slate-800">
                      {f.name}
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-0.5">
                        <Users size={11} /> {f.capacity}
                      </span>
                      <span className="inline-flex items-center gap-0.5 text-amber-500">
                        <Star size={11} className="fill-amber-400" /> {f.rating}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-slate-900">
                      {sar(f.pricePerHour)}
                    </div>
                    <div className="text-[10px] text-slate-400">/ hour</div>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-bold text-slate-900">
                Pick time slots · <span className="text-brand-600">{selected.name}</span>
              </h2>
              <Badge tone="slate">
                <Clock size={12} /> Off-peak 16:00–22:00
              </Badge>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
              {TIME_SLOTS.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSlot(s)}
                  className={cx(
                    'rounded-xl border py-2 text-sm font-semibold transition-all',
                    slots.includes(s)
                      ? 'border-transparent bg-teal-600 text-white shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:border-teal-300 hover:bg-teal-50',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Checkout + live bookings */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-bold text-slate-900">Booking summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <Row label="Facility" value={selected.name} />
              <Row label="Rate" value={`${sar(selected.pricePerHour)} / hr`} />
              <Row label="Hours selected" value={`${slots.length}`} />
              <div className="my-2 border-t border-dashed border-slate-200" />
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Total</span>
                <span className="text-xl font-black text-slate-900">
                  {sar(total)}
                </span>
              </div>
            </div>
            <input
              value={renter}
              onChange={(e) => setRenter(e.target.value)}
              placeholder="Renter name (e.g. Al-Nasr Academy)"
              className="mt-4 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
            <Button
              variant="gold"
              className={cx('mt-3 w-full', slots.length === 0 && 'pointer-events-none opacity-50')}
              onClick={confirmBooking}
            >
              <CreditCard size={16} /> Pay & confirm {slots.length > 0 && `· ${sar(total)}`}
            </Button>
            {flash && (
              <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 ring-1 ring-emerald-600/20">
                <CheckCircle2 size={14} /> {flash}
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="mb-3 font-bold text-slate-900">Live bookings</h2>
            <div className="space-y-2">
              {bookings.slice(0, 6).map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-slate-800">
                      {b.facility}
                    </div>
                    <div className="truncate text-xs text-slate-500">
                      {b.renter} · {b.time}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-bold text-slate-900">
                      {sar(b.amount)}
                    </span>
                    <Badge tone={statusTone[b.status] ?? 'slate'}>{b.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-800">{value}</span>
    </div>
  )
}

function addHour(t: string): string {
  const [h, m] = t.split(':').map(Number)
  return `${String(h + 1).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}
