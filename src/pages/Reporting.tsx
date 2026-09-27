import { useState } from 'react'
import {
  FileText,
  Sparkles,
  Download,
  Leaf,
  FileCheck2,
  Loader2,
} from 'lucide-react'
import { PageHeader, Card, Badge, Button, Stat, Progress } from '../components/ui'
import { REPORT_TEMPLATES, GENERATED_REPORTS } from '../data/madaar'
import { cx } from '../lib/format'

type Report = {
  id: string
  name: string
  date: string
  pages: number
  size: string
  paperSaved: number
}

export default function Reporting() {
  const [reports, setReports] = useState<Report[]>(GENERATED_REPORTS)
  const [generatingId, setGeneratingId] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  function generate(templateId: string, name: string) {
    if (generatingId) return
    setGeneratingId(templateId)
    setProgress(0)
    const iv = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          window.clearInterval(iv)
          const pages = 8 + Math.floor(Math.random() * 26)
          setReports((prev) => [
            {
              id: `g${Date.now()}`,
              name: `${name} — ${new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}`,
              date: new Date().toISOString().slice(0, 10),
              pages,
              size: `${(1 + Math.random() * 4).toFixed(1)} MB`,
              paperSaved: pages * 24,
            },
            ...prev,
          ])
          setGeneratingId(null)
          return 0
        }
        return p + 5
      })
    }, 80)
  }

  const totalPaper = reports.reduce((s, r) => s + r.paperSaved, 0)

  return (
    <div>
      <PageHeader
        kicker="Pillar 3 · Digital Transformation & Privatization"
        title="Automated Reporting System"
        description="Generate operational reports on demand — transitioning the institution to fully paperless management."
        icon={<FileText size={22} />}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Stat label="Reports generated" value={reports.length} tone="brand" />
        <Stat label="Paperless rate" value="96%" tone="teal" />
        <Stat label="Sheets of paper saved" value={totalPaper.toLocaleString()} tone="gold" hint={<span className="inline-flex items-center gap-1"><Leaf size={11} /> ≈ {Math.round(totalPaper / 8333)} trees</span>} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Templates */}
        <div>
          <h2 className="mb-3 font-bold text-slate-900">Report templates</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {REPORT_TEMPLATES.map((t) => {
              const isGen = generatingId === t.id
              return (
                <Card key={t.id} className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="grid size-11 place-items-center rounded-xl bg-slate-100 text-2xl">
                      {t.icon}
                    </div>
                    {t.auto && (
                      <Badge tone="teal">
                        <Sparkles size={10} /> Auto
                      </Badge>
                    )}
                  </div>
                  <h3 className="mt-3 font-bold text-slate-900">{t.name}</h3>
                  <div className="mt-0.5 text-xs text-slate-400">{t.fields} data fields</div>

                  {isGen ? (
                    <div className="mt-4">
                      <div className="mb-1 flex items-center gap-2 text-xs font-medium text-brand-600">
                        <Loader2 size={12} className="animate-spin" /> Generating… {progress}%
                      </div>
                      <Progress value={progress} />
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className={cx('mt-4 w-full', generatingId && 'pointer-events-none opacity-40')}
                      onClick={() => generate(t.id, t.name)}
                    >
                      <Sparkles size={14} /> Generate
                    </Button>
                  )}
                </Card>
              )
            })}
          </div>
        </div>

        {/* Generated */}
        <div>
          <h2 className="mb-3 font-bold text-slate-900">Recently generated</h2>
          <Card className="divide-y divide-slate-100">
            {reports.map((r) => (
              <div key={r.id} className="flex items-center gap-3 p-4">
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <FileCheck2 size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-slate-800">
                    {r.name}
                  </div>
                  <div className="text-xs text-slate-400">
                    {r.date} · {r.pages} pages · {r.size}
                  </div>
                </div>
                <button className="grid size-9 shrink-0 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-brand-600">
                  <Download size={16} />
                </button>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  )
}
