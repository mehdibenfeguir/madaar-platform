import { useState } from 'react'
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Grid3x3,
  CalendarClock,
  BarChart3,
  Boxes,
  MessageSquareText,
  Library,
  Handshake,
  Calculator,
  FileText,
  Presentation,
  Network,
  GanttChartSquare,
  Search,
  Bell,
  Menu,
  X,
  Sparkles,
} from 'lucide-react'
import { BRAND, PILLARS } from '../data/madaar'
import { cx } from '../lib/format'

const ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  '/space/simulation': Grid3x3,
  '/space/monetization': CalendarClock,
  '/space/utilization': BarChart3,
  '/stem/vr-lab': Boxes,
  '/stem/ai-tutor': MessageSquareText,
  '/stem/content-hub': Library,
  '/transformation/ppp': Handshake,
  '/transformation/roi': Calculator,
  '/transformation/reporting': FileText,
  '/strategy/pitch-deck': Presentation,
  '/strategy/business-plan': Network,
  '/strategy/roadmap': GanttChartSquare,
}

const accentDot: Record<string, string> = {
  brand: 'bg-brand-500',
  teal: 'bg-teal-500',
  gold: 'bg-gold-500',
  rose: 'bg-rose-500',
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <Link
        to="/"
        onClick={onNavigate}
        className="flex items-center gap-3 px-5 py-5"
      >
        <div className="relative grid size-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 via-brand-600 to-teal-500 text-white shadow-lg shadow-brand-600/30">
          <div className="absolute inset-0 animate-spin-slow rounded-xl border border-white/20" />
          <span className="text-lg font-black">م</span>
        </div>
        <div className="leading-tight">
          <div className="text-lg font-black tracking-tight text-white">
            {BRAND.name}
          </div>
          <div className="text-[10px] font-medium uppercase tracking-widest text-brand-300">
            {BRAND.tagline}
          </div>
        </div>
      </Link>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-6">
        <NavLink
          to="/"
          end
          onClick={onNavigate}
          className={({ isActive }) =>
            cx(
              'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
              isActive
                ? 'bg-white/10 text-white'
                : 'text-slate-300 hover:bg-white/5 hover:text-white',
            )
          }
        >
          <LayoutDashboard size={18} />
          Overview
        </NavLink>

        {PILLARS.map((pillar) => (
          <div key={pillar.id}>
            <div className="flex items-center gap-2 px-3 pb-1.5">
              <span className={cx('size-1.5 rounded-full', accentDot[pillar.accent])} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {pillar.index}. {pillar.title}
              </span>
            </div>
            <div className="space-y-0.5">
              {pillar.deliverables.map((d) => {
                const Icon = ICONS[d.path] ?? Grid3x3
                return (
                  <NavLink
                    key={d.path}
                    to={d.path}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      cx(
                        'flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors',
                        isActive
                          ? 'bg-white/10 font-semibold text-white'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white',
                      )
                    }
                  >
                    <Icon size={17} />
                    <span className="truncate">{d.name}</span>
                  </NavLink>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="mx-3 mb-4 rounded-2xl bg-gradient-to-br from-brand-600/80 to-teal-600/70 p-4 text-white">
        <div className="text-xs font-bold uppercase tracking-wide text-white/70">
          Prepared by
        </div>
        <div className="mt-1 text-sm font-bold">{BRAND.preparedBy}</div>
        <div className="text-xs text-white/75">{BRAND.preparedByAr}</div>
        <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-white/90">
          <Sparkles size={14} /> Vision 2030 Ready
        </div>
      </div>
    </div>
  )
}

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  // Derive a friendly page title from the current route
  const current =
    PILLARS.flatMap((p) => p.deliverables).find(
      (d) => d.path === location.pathname,
    )?.name ?? (location.pathname === '/' ? 'Overview' : 'MADAAR')

  return (
    <div className="min-h-full lg:grid lg:grid-cols-[280px_1fr]">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen bg-ink-950 lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-72 bg-ink-950">
            <button
              className="absolute right-3 top-4 text-slate-400 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              <X size={20} />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="flex min-h-screen flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200/70 glass px-4 py-3 lg:px-8">
          <button
            className="grid size-9 place-items-center rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </button>

          <div className="hidden items-center text-sm text-slate-400 sm:flex">
            <span className="font-medium text-slate-500">MADAAR</span>
            <span className="mx-2">/</span>
            <span className="font-semibold text-slate-700">{current}</span>
          </div>

          <div className="relative ml-auto hidden max-w-xs flex-1 md:block">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              placeholder="Search schools, facilities, reports…"
              className="w-full rounded-xl border border-slate-200 bg-white/80 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <button className="relative grid size-9 place-items-center rounded-lg text-slate-600 hover:bg-slate-100">
            <Bell size={18} />
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 py-1 pl-1 pr-3">
            <div className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-teal-500 text-xs font-bold text-white">
              AB
            </div>
            <div className="hidden text-left sm:block">
              <div className="text-xs font-semibold leading-none text-slate-700">
                A. Ben Feguir
              </div>
              <div className="text-[10px] text-slate-400">Prepared by</div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
