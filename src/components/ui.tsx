import type { ReactNode } from 'react'
import { cx } from '../lib/format'

// --- Card --------------------------------------------------------------------
export function Card({
  children,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article'
}) {
  return (
    <Tag
      className={cx(
        'rounded-[var(--radius-xl2)] border border-slate-200/70 bg-white card-shadow',
        className,
      )}
    >
      {children}
    </Tag>
  )
}

// --- Section header ----------------------------------------------------------
export function PageHeader({
  kicker,
  title,
  description,
  icon,
  actions,
}: {
  kicker?: string
  title: string
  description?: string
  icon?: ReactNode
  actions?: ReactNode
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-start gap-4">
        {icon && (
          <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-500/25">
            {icon}
          </div>
        )}
        <div>
          {kicker && (
            <div className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              {kicker}
            </div>
          )}
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>
          {description && (
            <p className="mt-1 max-w-2xl text-sm text-slate-500">{description}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}

// --- Badge --------------------------------------------------------------------
const toneMap: Record<string, string> = {
  brand: 'bg-brand-50 text-brand-700 ring-brand-600/20',
  teal: 'bg-teal-500/10 text-teal-600 ring-teal-600/20',
  gold: 'bg-gold-500/10 text-gold-600 ring-gold-600/20',
  green: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  amber: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  rose: 'bg-rose-50 text-rose-700 ring-rose-600/20',
  slate: 'bg-slate-100 text-slate-600 ring-slate-500/20',
}

export function Badge({
  children,
  tone = 'slate',
  className,
}: {
  children: ReactNode
  tone?: keyof typeof toneMap
  className?: string
}) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset',
        toneMap[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

// --- Button -------------------------------------------------------------------
export function Button({
  children,
  variant = 'primary',
  className,
  onClick,
  type = 'button',
  size = 'md',
}: {
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'outline' | 'teal' | 'gold'
  size?: 'sm' | 'md'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}) {
  const variants: Record<string, string> = {
    primary:
      'bg-brand-600 text-white hover:bg-brand-700 shadow-sm shadow-brand-600/30',
    teal: 'bg-teal-600 text-white hover:bg-teal-500 shadow-sm shadow-teal-600/30',
    gold: 'bg-gold-500 text-white hover:bg-gold-600 shadow-sm shadow-gold-500/30',
    outline:
      'border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50',
    ghost: 'text-slate-600 hover:bg-slate-100',
  }
  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </button>
  )
}

// --- Progress bar -------------------------------------------------------------
export function Progress({
  value,
  tone = 'brand',
  className,
}: {
  value: number
  tone?: 'brand' | 'teal' | 'gold'
  className?: string
}) {
  const bar: Record<string, string> = {
    brand: 'bg-brand-500',
    teal: 'bg-teal-500',
    gold: 'bg-gold-500',
  }
  return (
    <div className={cx('h-2 w-full overflow-hidden rounded-full bg-slate-100', className)}>
      <div
        className={cx('h-full rounded-full transition-all', bar[tone])}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}

// --- Stat / metric tile -------------------------------------------------------
export function Stat({
  label,
  value,
  hint,
  tone = 'brand',
}: {
  label: string
  value: ReactNode
  hint?: ReactNode
  tone?: 'brand' | 'teal' | 'gold'
}) {
  const ring: Record<string, string> = {
    brand: 'from-brand-500/10',
    teal: 'from-teal-500/10',
    gold: 'from-gold-500/10',
  }
  return (
    <div
      className={cx(
        'rounded-2xl border border-slate-200/70 bg-gradient-to-br to-transparent p-4',
        ring[tone],
      )}
    >
      <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-2xl font-bold text-slate-900">{value}</div>
      {hint && <div className="mt-1 text-xs text-slate-500">{hint}</div>}
    </div>
  )
}

// --- Sparkline (pure SVG) -----------------------------------------------------
export function Sparkline({
  data,
  color = '#6366f1',
  width = 120,
  height = 36,
}: {
  data: number[]
  color?: string
  width?: number
  height?: number
}) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const step = width / (data.length - 1)
  const points = data
    .map((d, i) => `${i * step},${height - ((d - min) / range) * (height - 4) - 2}`)
    .join(' ')
  const areaPoints = `0,${height} ${points} ${width},${height}`
  const id = `sp-${color.replace('#', '')}`
  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#${id})`} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
