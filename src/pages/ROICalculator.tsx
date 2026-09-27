import { useMemo, useState } from 'react'
import {
  Calculator,
  Zap,
  Users,
  CalendarClock,
  FileText,
  TrendingUp,
} from 'lucide-react'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import { PageHeader, Card, Stat } from '../components/ui'
import { ROI_DEFAULTS } from '../data/madaar'
import { sar } from '../lib/format'

export default function ROICalculator() {
  const [area, setArea] = useState(ROI_DEFAULTS.area)
  const [students, setStudents] = useState(ROI_DEFAULTS.students)
  const [utilGain, setUtilGain] = useState(ROI_DEFAULTS.utilizationGain)

  const calc = useMemo(() => {
    const energy = Math.round(area * ROI_DEFAULTS.energyCostPerM2 * (utilGain / 100))
    const admin = Math.round(students * ROI_DEFAULTS.adminCostPerStudent * 0.18)
    const rental = Math.round(area * ROI_DEFAULTS.eveningRatePerM2 * (utilGain / 100) * 4)
    const paperless = Math.round(students * ROI_DEFAULTS.paperlessSavingPerStudent)
    const total = energy + admin + rental + paperless
    const platformCost = Math.round(area * 55 + students * 120) // annual subscription model
    const netBenefit = total - platformCost
    const roi = Math.round((netBenefit / platformCost) * 100)
    const paybackMonths = Math.max(1, Math.round((platformCost / total) * 12))
    return { energy, admin, rental, paperless, total, platformCost, netBenefit, roi, paybackMonths }
  }, [area, students, utilGain])

  const breakdown = [
    { name: 'Energy', value: calc.energy, color: '#f59e0b' },
    { name: 'Admin', value: calc.admin, color: '#6366f1' },
    { name: 'Evening rentals', value: calc.rental, color: '#14b8a6' },
    { name: 'Paperless', value: calc.paperless, color: '#ec4899' },
  ]

  const projection = [1, 2, 3, 4, 5].map((y) => ({
    year: `Y${y}`,
    savings: Math.round((calc.total * y) / 1000),
    cost: Math.round((calc.platformCost * y) / 1000),
  }))

  return (
    <div>
      <PageHeader
        kicker="Pillar 3 · Digital Transformation & Privatization"
        title="ROI & Resource Calculator"
        description="Compute projected operational savings instantly based on school area and student capacity."
        icon={<Calculator size={22} />}
      />

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        {/* Inputs */}
        <Card className="p-6">
          <h2 className="mb-4 font-bold text-slate-900">School parameters</h2>

          <Slider
            label="Campus area"
            value={area}
            min={2000}
            max={30000}
            step={500}
            unit="m²"
            onChange={setArea}
          />
          <Slider
            label="Student capacity"
            value={students}
            min={200}
            max={3000}
            step={50}
            unit="students"
            onChange={setStudents}
          />
          <Slider
            label="Utilization gain (AI)"
            value={utilGain}
            min={5}
            max={45}
            step={1}
            unit="pts"
            onChange={setUtilGain}
          />

          <div className="mt-6 rounded-2xl bg-gradient-to-br from-teal-600 to-brand-700 p-5 text-white">
            <div className="text-xs font-medium uppercase tracking-wide text-white/80">
              Projected annual savings
            </div>
            <div className="mt-1 text-4xl font-black">{sar(calc.total, { compact: true })}</div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-white/80">Net of platform cost</span>
              <span className="font-bold">{sar(calc.netBenefit, { compact: true })}</span>
            </div>
          </div>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Stat label="ROI" value={`${calc.roi}%`} tone="teal" hint={<span className="inline-flex items-center gap-1"><TrendingUp size={11} /> year one</span>} />
            <Stat label="Payback period" value={`${calc.paybackMonths} mo`} tone="brand" />
            <Stat label="Platform cost / yr" value={sar(calc.platformCost, { compact: true })} tone="gold" />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-6">
              <h2 className="mb-2 font-bold text-slate-900">Savings breakdown</h2>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={breakdown}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={2}
                    >
                      {breakdown.map((b) => (
                        <Cell key={b.name} fill={b.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => sar(Number(value))}
                      contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {breakdown.map((b) => (
                  <div key={b.name} className="flex items-center gap-2 text-xs">
                    <span className="size-2.5 rounded-full" style={{ backgroundColor: b.color }} />
                    <span className="text-slate-500">{b.name}</span>
                    <span className="ml-auto font-semibold text-slate-800">{sar(b.value, { compact: true })}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="mb-2 font-bold text-slate-900">5-year cumulative (SAR ’000s)</h2>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={projection} margin={{ left: -18, right: 8, top: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                    <Bar dataKey="cost" name="Cost" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="savings" name="Savings" fill="#14b8a6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Driver icon={<Zap size={16} />} label="Energy" value={sar(calc.energy, { compact: true })} tone="text-gold-600" />
            <Driver icon={<Users size={16} />} label="Admin efficiency" value={sar(calc.admin, { compact: true })} tone="text-brand-600" />
            <Driver icon={<CalendarClock size={16} />} label="Evening rentals" value={sar(calc.rental, { compact: true })} tone="text-teal-600" />
            <Driver icon={<FileText size={16} />} label="Paperless" value={sar(calc.paperless, { compact: true })} tone="text-rose-600" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  unit: string
  onChange: (v: number) => void
}) {
  return (
    <div className="mb-5">
      <div className="mb-1.5 flex items-center justify-between">
        <label className="text-sm font-medium text-slate-600">{label}</label>
        <span className="text-sm font-bold text-slate-900">
          {value.toLocaleString()} <span className="text-xs font-normal text-slate-400">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand-600"
      />
    </div>
  )
}

function Driver({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: string }) {
  return (
    <Card className="flex items-center gap-3 p-4">
      <div className={`grid size-10 place-items-center rounded-xl bg-slate-100 ${tone}`}>{icon}</div>
      <div>
        <div className="text-xs text-slate-500">{label}</div>
        <div className="font-bold text-slate-900">{value}</div>
      </div>
    </Card>
  )
}
