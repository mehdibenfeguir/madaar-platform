import { useEffect, useRef, useState } from 'react'
import {
  Boxes,
  Play,
  RotateCw,
  ShieldCheck,
  Clock,
  Wallet,
  Headset,
} from 'lucide-react'
import { PageHeader, Card, Badge, Button, Progress, Stat } from '../components/ui'
import { EXPERIMENTS, type Experiment } from '../data/madaar'
import { cx, sar } from '../lib/format'

const hazardTone: Record<string, 'green' | 'amber' | 'rose'> = {
  Low: 'green',
  Medium: 'amber',
  High: 'rose',
}
const subjectTone: Record<string, 'brand' | 'teal' | 'gold'> = {
  Chemistry: 'teal',
  Physics: 'brand',
  Biology: 'gold',
}

export default function VRLab() {
  const [selected, setSelected] = useState<Experiment>(EXPERIMENTS[0])
  const [running, setRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timer.current) window.clearInterval(timer.current)
    }
  }, [])

  function launch() {
    if (timer.current) window.clearInterval(timer.current)
    setRunning(true)
    setProgress(0)
    timer.current = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          if (timer.current) window.clearInterval(timer.current)
          setRunning(false)
          return 100
        }
        return p + 2
      })
    }, 60)
  }

  function selectExp(e: Experiment) {
    if (timer.current) window.clearInterval(timer.current)
    setSelected(e)
    setRunning(false)
    setProgress(0)
  }

  const totalSaved = EXPERIMENTS.reduce((s, e) => s + e.savedCost, 0)

  return (
    <div>
      <PageHeader
        kicker="Pillar 2 · Interactive STEM Learning"
        title="Mobtakir VR Science Lab"
        description="A 3D virtual reality environment where students run complex or hazardous experiments safely — eliminating the cost of physical labs."
        icon={<Boxes size={22} />}
        actions={<Badge tone="teal"><Headset size={12} /> WebXR ready</Badge>}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Stat label="Experiments available" value={EXPERIMENTS.length} tone="brand" />
        <Stat label="Lab cost avoided / cohort" value={sar(totalSaved, { compact: true })} tone="teal" hint="vs. physical consumables" />
        <Stat label="Safety incidents" value="0" tone="gold" hint="hazardous experiments made safe" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Viewer */}
        <Card className="overflow-hidden">
          <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-ink-950 via-ink-900 to-brand-700">
            {/* grid floor */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/2 opacity-40"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(45,212,191,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.35) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                transform: 'perspective(400px) rotateX(60deg)',
                transformOrigin: 'bottom',
              }}
            />
            {/* glow */}
            <div className="absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/20 blur-3xl" />

            {/* the specimen */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative">
                <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-teal-400/20" />
                <div
                  className={cx(
                    'grid size-32 place-items-center rounded-3xl bg-white/10 text-7xl ring-1 ring-white/20 backdrop-blur',
                    running ? 'animate-spin-slow' : 'animate-floaty',
                  )}
                >
                  {selected.emoji}
                </div>
              </div>
            </div>

            {/* HUD */}
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <span className="rounded-lg bg-black/40 px-2 py-1 text-xs font-medium text-white backdrop-blur">
                {selected.subject}
              </span>
              <span className="rounded-lg bg-black/40 px-2 py-1 text-xs font-medium text-white backdrop-blur">
                {selected.difficulty}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              {running || progress > 0 ? (
                <div className="rounded-xl bg-black/40 p-3 backdrop-blur">
                  <div className="mb-1 flex items-center justify-between text-xs font-medium text-white">
                    <span>{running ? 'Experiment running…' : progress >= 100 ? 'Completed ✓' : 'Paused'}</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} tone="teal" />
                </div>
              ) : (
                <div className="rounded-xl bg-black/40 p-3 text-xs text-white/80 backdrop-blur">
                  Press <b>Launch</b> to enter the simulation.
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">{selected.title}</h2>
              <p className="text-sm text-slate-500">{selected.desc}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => { setProgress(0); setRunning(false) }}>
                <RotateCw size={14} /> Reset
              </Button>
              <Button variant="teal" onClick={launch}>
                <Play size={16} /> {running ? 'Running…' : 'Launch'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Experiment library */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-slate-900">Experiment library</h3>
            <Badge tone="slate">{EXPERIMENTS.length}</Badge>
          </div>
          <div className="space-y-2">
            {EXPERIMENTS.map((e) => (
              <button
                key={e.id}
                onClick={() => selectExp(e)}
                className={cx(
                  'flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all',
                  selected.id === e.id
                    ? 'border-teal-400 bg-teal-50/60 ring-1 ring-teal-400'
                    : 'border-slate-200 bg-white hover:border-slate-300',
                )}
              >
                <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-slate-100 text-2xl">
                  {e.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-slate-800">
                    {e.title}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    <Badge tone={subjectTone[e.subject]}>{e.subject}</Badge>
                    <Badge tone={hazardTone[e.hazard]}>
                      <ShieldCheck size={10} /> {e.hazard}
                    </Badge>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="inline-flex items-center gap-1 text-xs text-slate-500">
                    <Clock size={11} /> {e.durationMin}m
                  </div>
                  <div className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-teal-600">
                    <Wallet size={11} /> {sar(e.savedCost)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
