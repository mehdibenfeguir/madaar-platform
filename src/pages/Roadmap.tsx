import { useState } from 'react'
import { GanttChartSquare, Flag, CheckCircle2, Circle } from 'lucide-react'
import { PageHeader, Card, Badge, Progress, Stat } from '../components/ui'
import {
  GANTT_TASKS,
  ROADMAP_MONTHS,
  ROADMAP_MILESTONES,
} from '../data/madaar'
import { cx } from '../lib/format'

const PHASES = ['Onboarding', 'Deployment', 'Adoption', 'Scale']
const phaseTone: Record<string, 'brand' | 'teal' | 'gold' | 'rose'> = {
  Onboarding: 'brand',
  Deployment: 'teal',
  Adoption: 'gold',
  Scale: 'rose',
}

export default function Roadmap() {
  const [activePhase, setActivePhase] = useState<string>('All')
  const months = ROADMAP_MONTHS.length

  const tasks = GANTT_TASKS.filter(
    (t) => activePhase === 'All' || t.phase === activePhase,
  )

  const overall = Math.round(
    GANTT_TASKS.reduce((s, t) => s + t.progress, 0) / GANTT_TASKS.length,
  )

  return (
    <div>
      <PageHeader
        kicker="Pillar 4 · Operational Strategy"
        title="Transformation Roadmap Builder"
        description="Construct interactive implementation roadmaps for onboarding schools and tracking deployment progress."
        icon={<GanttChartSquare size={22} />}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <Stat label="Overall progress" value={`${overall}%`} tone="brand" />
        <Stat label="Active tasks" value={GANTT_TASKS.filter((t) => t.progress > 0 && t.progress < 100).length} tone="teal" />
        <Stat label="Milestones" value={ROADMAP_MILESTONES.length} tone="gold" />
        <Stat label="Timeline" value={`${months} mo`} tone="brand" />
      </div>

      {/* Phase filter */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {['All', ...PHASES].map((p) => (
          <button
            key={p}
            onClick={() => setActivePhase(p)}
            className={cx(
              'rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
              activePhase === p ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
            )}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Gantt */}
      <Card className="overflow-hidden p-6">
        {/* Month header */}
        <div className="grid" style={{ gridTemplateColumns: `220px repeat(${months}, 1fr)` }}>
          <div className="pb-3 text-xs font-bold uppercase tracking-wide text-slate-400">
            Task
          </div>
          {ROADMAP_MONTHS.map((m) => (
            <div key={m} className="pb-3 text-center text-[11px] font-medium text-slate-400">
              {m}
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className="relative space-y-2">
          {/* milestone markers overlaid */}
          {tasks.map((t) => (
            <div
              key={t.id}
              className="grid items-center"
              style={{ gridTemplateColumns: `220px repeat(${months}, 1fr)` }}
            >
              <div className="pr-3">
                <div className="truncate text-sm font-semibold text-slate-800">{t.name}</div>
                <div className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full" style={{ backgroundColor: t.color }} />
                  <span className="text-[11px] text-slate-400">{t.phase}</span>
                </div>
              </div>

              {/* track */}
              <div className="relative col-start-2 h-9" style={{ gridColumn: `2 / span ${months}` }}>
                {/* faint grid */}
                <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${months}, 1fr)` }}>
                  {ROADMAP_MONTHS.map((_, i) => (
                    <div key={i} className="border-l border-slate-100 first:border-l-0" />
                  ))}
                </div>
                {/* bar */}
                <div
                  className="absolute top-1/2 flex h-7 -translate-y-1/2 items-center overflow-hidden rounded-lg px-2 text-[11px] font-semibold text-white shadow-sm"
                  style={{
                    left: `${(t.start / months) * 100}%`,
                    width: `${(t.duration / months) * 100}%`,
                    backgroundColor: t.color,
                  }}
                  title={`${t.name} · ${t.progress}%`}
                >
                  <div
                    className="absolute inset-y-0 left-0 bg-black/20"
                    style={{ width: `${t.progress}%` }}
                  />
                  <span className="relative z-10">{t.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Milestones + progress by phase */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-4 font-bold text-slate-900">Key milestones</h2>
          <div className="relative space-y-4 pl-6">
            <div className="absolute bottom-2 left-[7px] top-2 w-px bg-slate-200" />
            {ROADMAP_MILESTONES.map((m, idx) => {
              const done = idx < 2
              return (
                <div key={m.label} className="relative flex items-center gap-3">
                  <div className="absolute -left-6">
                    {done ? (
                      <CheckCircle2 size={16} className="text-teal-500" />
                    ) : (
                      <Circle size={16} className="text-slate-300" />
                    )}
                  </div>
                  <Badge tone="slate">M{m.month}</Badge>
                  <span className={cx('text-sm', done ? 'font-semibold text-slate-800' : 'text-slate-500')}>
                    {m.label}
                  </span>
                  <Flag size={13} className={cx('ml-auto', done ? 'text-teal-500' : 'text-slate-300')} />
                </div>
              )
            })}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 font-bold text-slate-900">Progress by phase</h2>
          <div className="space-y-4">
            {PHASES.map((p) => {
              const phaseTasks = GANTT_TASKS.filter((t) => t.phase === p)
              const avg = Math.round(
                phaseTasks.reduce((s, t) => s + t.progress, 0) / phaseTasks.length,
              )
              return (
                <div key={p}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{p}</span>
                    <span className="font-semibold text-slate-900">{avg}%</span>
                  </div>
                  <Progress value={avg} tone={phaseTone[p] === 'rose' ? 'brand' : phaseTone[p] === 'gold' ? 'gold' : phaseTone[p]} />
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
