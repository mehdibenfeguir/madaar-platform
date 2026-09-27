import { useMemo, useState } from 'react'
import { Library, Search, Clock, PlayCircle } from 'lucide-react'
import { PageHeader, Card, Badge, Progress, Stat } from '../components/ui'
import { LESSONS } from '../data/madaar'
import { cx } from '../lib/format'

const SUBJECTS = ['All', 'Physics', 'Chemistry', 'Biology', 'Math']
const TYPES = ['All', 'Interactive', 'Video', 'Simulation', 'Quiz']

const typeTone: Record<string, 'brand' | 'teal' | 'gold' | 'rose'> = {
  Interactive: 'brand',
  Video: 'rose',
  Simulation: 'teal',
  Quiz: 'gold',
}

export default function ContentHub() {
  const [subject, setSubject] = useState('All')
  const [type, setType] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return LESSONS.filter(
      (l) =>
        (subject === 'All' || l.subject === subject) &&
        (type === 'All' || l.type === type) &&
        l.title.toLowerCase().includes(query.toLowerCase()),
    )
  }, [subject, type, query])

  const avgProgress = Math.round(
    LESSONS.reduce((s, l) => s + l.progress, 0) / LESSONS.length,
  )

  return (
    <div>
      <PageHeader
        kicker="Pillar 2 · Interactive STEM Learning"
        title="STEM Content Hub"
        description="An interactive digital library of enhanced lessons, simulations and assessments — curated by subject and grade."
        icon={<Library size={22} />}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Stat label="Lessons in library" value={LESSONS.length} tone="brand" />
        <Stat label="Avg. completion" value={`${avgProgress}%`} tone="teal" />
        <Stat label="Interactive formats" value="4" tone="gold" hint="video · sim · quiz · interactive" />
      </div>

      {/* Filters */}
      <Card className="mb-6 p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search lessons…"
              className="w-full rounded-xl border border-slate-200 py-2 pl-9 pr-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SUBJECTS.map((s) => (
              <FilterChip key={s} active={subject === s} onClick={() => setSubject(s)}>
                {s}
              </FilterChip>
            ))}
          </div>
          <div className="hidden w-px self-stretch bg-slate-200 lg:block" />
          <div className="flex flex-wrap gap-1.5">
            {TYPES.map((t) => (
              <FilterChip key={t} active={type === t} onClick={() => setType(t)}>
                {t}
              </FilterChip>
            ))}
          </div>
        </div>
      </Card>

      {/* Grid */}
      {filtered.length === 0 ? (
        <Card className="p-12 text-center text-slate-500">
          No lessons match your filters.
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((l) => (
            <Card key={l.id} className="group overflow-hidden">
              <div className="relative flex h-32 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50 text-5xl">
                {l.emoji}
                <div className="absolute right-3 top-3">
                  <Badge tone={typeTone[l.type]}>{l.type}</Badge>
                </div>
                <button className="absolute inset-0 grid place-items-center bg-brand-900/0 text-white opacity-0 transition-all group-hover:bg-brand-900/30 group-hover:opacity-100">
                  <PlayCircle size={40} />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-brand-600">{l.subject}</span>
                  <span className="text-xs text-slate-400">{l.grade}</span>
                </div>
                <h3 className="mt-1 font-bold text-slate-900">{l.title}</h3>
                <div className="mt-1 inline-flex items-center gap-1 text-xs text-slate-400">
                  <Clock size={11} /> {l.minutes} min
                </div>
                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
                    <span>Progress</span>
                    <span className="font-semibold">{l.progress}%</span>
                  </div>
                  <Progress value={l.progress} tone={l.progress === 100 ? 'teal' : 'brand'} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function FilterChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        'rounded-full px-3 py-1 text-xs font-medium transition-colors',
        active
          ? 'bg-brand-600 text-white'
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
      )}
    >
      {children}
    </button>
  )
}
