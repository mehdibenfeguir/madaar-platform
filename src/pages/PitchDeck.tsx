import { useState } from 'react'
import {
  Presentation,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Download,
} from 'lucide-react'
import { PageHeader, Card, Badge, Button } from '../components/ui'
import { PITCH_SLIDES } from '../data/madaar'
import { cx } from '../lib/format'

export default function PitchDeck() {
  const [i, setI] = useState(0)
  const slide = PITCH_SLIDES[i]
  const go = (d: number) =>
    setI((v) => (v + d + PITCH_SLIDES.length) % PITCH_SLIDES.length)

  return (
    <div>
      <PageHeader
        kicker="Pillar 4 · Operational Strategy"
        title="Interactive Pitch Deck Generator"
        description="Automatically builds customized, interactive investor presentations using live operational and financial data."
        icon={<Presentation size={22} />}
        actions={
          <>
            <Badge tone="teal"><Sparkles size={12} /> Auto-built from live data</Badge>
            <Button variant="outline" size="sm"><Download size={14} /> Export PDF</Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_240px]">
        {/* Slide stage */}
        <div>
          <Card className="relative aspect-video overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-900 to-brand-700" />
            <div className="absolute -right-20 -top-20 size-80 rounded-full bg-teal-500/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-10 size-80 rounded-full bg-brand-500/20 blur-3xl" />

            <div className="relative flex h-full flex-col justify-between p-8 lg:p-12">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-teal-300">
                  MADAAR · {slide.kicker}
                </span>
                <span className="text-xs font-medium text-white/50">
                  {i + 1} / {PITCH_SLIDES.length}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-center gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                  <h2 className="text-2xl font-black leading-tight text-white lg:text-4xl">
                    {slide.title}
                  </h2>
                  <ul className="mt-5 space-y-2.5">
                    {slide.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-slate-200 lg:text-base">
                        <span className="mt-1.5 size-2 shrink-0 rounded-full bg-teal-400" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {slide.metric && (
                  <div className="shrink-0 rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur">
                    <div className="text-5xl font-black text-white lg:text-6xl">
                      {slide.metric.value}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-widest text-teal-300">
                      {slide.metric.label}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  {PITCH_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setI(idx)}
                      className={cx(
                        'h-1.5 rounded-full transition-all',
                        idx === i ? 'w-8 bg-teal-400' : 'w-2.5 bg-white/25 hover:bg-white/40',
                      )}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => go(-1)} className="grid size-10 place-items-center rounded-xl bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => go(1)} className="grid size-10 place-items-center rounded-xl bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Thumbnails */}
        <div className="space-y-2">
          <h3 className="px-1 text-sm font-bold text-slate-900">Slides</h3>
          {PITCH_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setI(idx)}
              className={cx(
                'flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition-all',
                idx === i ? 'border-brand-400 bg-brand-50/60 ring-1 ring-brand-400' : 'border-slate-200 bg-white hover:border-slate-300',
              )}
            >
              <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-ink-950 text-xs font-bold text-white">
                {idx + 1}
              </div>
              <div className="min-w-0">
                <div className="truncate text-xs font-bold text-slate-800">{s.kicker}</div>
                <div className="truncate text-[11px] text-slate-400">{s.title}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
