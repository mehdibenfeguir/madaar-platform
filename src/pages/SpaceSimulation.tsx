import { useMemo, useState } from 'react'
import { Grid3x3, Trash2, RotateCcw, Gauge, Ruler, Users } from 'lucide-react'
import { PageHeader, Card, Badge, Button, Progress, Stat } from '../components/ui'
import { ROOM_TYPES, INITIAL_FLOORPLAN, type PlacedRoom } from '../data/madaar'
import { cx } from '../lib/format'

const COLS = 10
const ROWS = 6
const CELL_AREA = 9 // m² per grid cell

const FOOTPRINTS: Record<string, { w: number; h: number }> = {
  classroom: { w: 2, h: 2 },
  science: { w: 3, h: 2 },
  computer: { w: 3, h: 2 },
  library: { w: 4, h: 3 },
  admin: { w: 2, h: 1 },
  hall: { w: 6, h: 3 },
}

function overlaps(a: PlacedRoom, x: number, y: number, w: number, h: number) {
  return a.x < x + w && a.x + a.w > x && a.y < y + h && a.y + a.h > y
}

export default function SpaceSimulation() {
  const [rooms, setRooms] = useState<PlacedRoom[]>(INITIAL_FLOORPLAN)
  const [selectedType, setSelectedType] = useState(ROOM_TYPES[0].id)
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [counter, setCounter] = useState(100)

  const typeById = useMemo(
    () => Object.fromEntries(ROOM_TYPES.map((t) => [t.id, t])),
    [],
  )

  function fits(x: number, y: number, w: number, h: number) {
    if (x + w > COLS || y + h > ROWS) return false
    return !rooms.some((r) => overlaps(r, x, y, w, h))
  }

  function handleCellClick(cx0: number, cy0: number) {
    // if a room is here, select it
    const hit = rooms.find((r) => overlaps(r, cx0, cy0, 1, 1))
    if (hit) {
      setSelectedRoom((s) => (s === hit.id ? null : hit.id))
      return
    }
    // otherwise place a new room of the selected type
    const fp = FOOTPRINTS[selectedType] ?? { w: 2, h: 2 }
    let w = fp.w
    let h = fp.h
    if (!fits(cx0, cy0, w, h)) {
      // try 1x1 fallback
      if (!fits(cx0, cy0, 1, 1)) return
      w = 1
      h = 1
    }
    const t = typeById[selectedType]
    const id = `r${counter}`
    setCounter((c) => c + 1)
    setRooms((prev) => [
      ...prev,
      { id, typeId: selectedType, name: t.label.slice(0, 3), x: cx0, y: cy0, w, h },
    ])
    setSelectedRoom(id)
  }

  function removeSelected() {
    if (!selectedRoom) return
    setRooms((prev) => prev.filter((r) => r.id !== selectedRoom))
    setSelectedRoom(null)
  }

  function reset() {
    setRooms(INITIAL_FLOORPLAN)
    setSelectedRoom(null)
  }

  // --- Derived metrics --------------------------------------------------------
  const metrics = useMemo(() => {
    const usedCells = rooms.reduce((s, r) => s + r.w * r.h, 0)
    const totalCells = COLS * ROWS
    const coverage = Math.round((usedCells / totalCells) * 100)
    const totalArea = usedCells * CELL_AREA
    const totalSeats = rooms.reduce(
      (s, r) => s + (typeById[r.typeId]?.seatsPerRoom ?? 0),
      0,
    )
    const weightedUtil =
      usedCells === 0
        ? 0
        : Math.round(
            rooms.reduce(
              (s, r) => s + (typeById[r.typeId]?.utilization ?? 0) * r.w * r.h,
              0,
            ) / usedCells,
          )
    // "efficiency" blends coverage and utilization
    const efficiency = Math.round(coverage * 0.45 + weightedUtil * 0.55)
    return { coverage, totalArea, totalSeats, weightedUtil, efficiency, roomCount: rooms.length }
  }, [rooms, typeById])

  const selected = rooms.find((r) => r.id === selectedRoom)

  return (
    <div>
      <PageHeader
        kicker="Pillar 1 · Asset & Space Management"
        title="Space Simulation Engine"
        description="Virtually map classrooms and labs on a digital twin of the campus. Click the grid to place rooms — spatial efficiency recalculates instantly."
        icon={<Grid3x3 size={22} />}
        actions={
          <>
            <Button variant="outline" size="sm" onClick={reset}>
              <RotateCcw size={14} /> Reset
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={removeSelected}
              className={cx(!selectedRoom && 'pointer-events-none opacity-40')}
            >
              <Trash2 size={14} /> Remove
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Floor plan */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Campus Floor Plan · Level 1</h2>
            <Badge tone="brand">
              {COLS}×{ROWS} grid · {CELL_AREA} m²/cell
            </Badge>
          </div>

          <div
            className="relative grid aspect-[10/6] w-full gap-1 rounded-2xl bg-slate-50 p-1 ring-1 ring-inset ring-slate-200"
            style={{
              gridTemplateColumns: `repeat(${COLS}, 1fr)`,
              gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            }}
          >
            {/* empty cells (click to add) */}
            {Array.from({ length: COLS * ROWS }).map((_, i) => {
              const x = i % COLS
              const y = Math.floor(i / COLS)
              return (
                <button
                  key={i}
                  onClick={() => handleCellClick(x, y)}
                  className="rounded-md ring-1 ring-inset ring-slate-200/60 transition-colors hover:bg-brand-100/50"
                  style={{ gridColumn: x + 1, gridRow: y + 1 }}
                  aria-label={`cell ${x},${y}`}
                />
              )
            })}

            {/* placed rooms */}
            {rooms.map((r) => {
              const t = typeById[r.typeId]
              const isSel = r.id === selectedRoom
              return (
                <button
                  key={r.id}
                  onClick={() => setSelectedRoom((s) => (s === r.id ? null : r.id))}
                  className={cx(
                    'group relative z-10 flex flex-col items-center justify-center rounded-lg p-1 text-center text-white transition-all',
                    isSel ? 'ring-2 ring-offset-2 ring-slate-900' : 'hover:brightness-105',
                  )}
                  style={{
                    gridColumn: `${r.x + 1} / span ${r.w}`,
                    gridRow: `${r.y + 1} / span ${r.h}`,
                    backgroundColor: t?.color,
                  }}
                >
                  <span className="text-[10px] font-bold uppercase leading-none opacity-90">
                    {t?.label}
                  </span>
                  <span className="mt-0.5 text-[9px] font-medium opacity-75">
                    {r.w * r.h * CELL_AREA} m²
                  </span>
                </button>
              )
            })}
          </div>

          {/* Palette */}
          <div className="mt-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Select a room type, then click the grid to place
            </div>
            <div className="flex flex-wrap gap-2">
              {ROOM_TYPES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedType(t.id)}
                  className={cx(
                    'flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm font-medium transition-all',
                    selectedType === t.id
                      ? 'border-transparent text-white shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300',
                  )}
                  style={
                    selectedType === t.id ? { backgroundColor: t.color } : undefined
                  }
                >
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: selectedType === t.id ? '#fff' : t.color }}
                  />
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Metrics */}
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Gauge size={16} className="text-brand-600" /> Spatial Efficiency
            </div>
            <div className="mt-4 flex items-end gap-2">
              <div className="text-5xl font-black text-slate-900">
                {metrics.efficiency}
                <span className="text-2xl text-slate-400">%</span>
              </div>
              <Badge tone={metrics.efficiency >= 70 ? 'green' : metrics.efficiency >= 50 ? 'amber' : 'rose'} className="mb-2">
                {metrics.efficiency >= 70 ? 'Optimized' : metrics.efficiency >= 50 ? 'Moderate' : 'Under-utilized'}
              </Badge>
            </div>
            <Progress value={metrics.efficiency} className="mt-3" />
            <p className="mt-3 text-xs text-slate-500">
              Blended score of floor coverage ({metrics.coverage}%) and
              type-weighted utilization ({metrics.weightedUtil}%).
            </p>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Stat label="Total Area" value={`${metrics.totalArea.toLocaleString()} m²`} tone="brand" hint={<span className="inline-flex items-center gap-1"><Ruler size={11} /> {metrics.roomCount} rooms</span>} />
            <Stat label="Seating" value={metrics.totalSeats} tone="teal" hint={<span className="inline-flex items-center gap-1"><Users size={11} /> capacity</span>} />
            <Stat label="Coverage" value={`${metrics.coverage}%`} tone="gold" />
            <Stat label="Avg Util." value={`${metrics.weightedUtil}%`} tone="brand" />
          </div>

          {selected && (
            <Card className="p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Selected room
              </div>
              <div className="mt-1 text-lg font-bold text-slate-900">
                {typeById[selected.typeId]?.label}
              </div>
              <dl className="mt-3 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-500">Footprint</dt>
                  <dd className="font-semibold text-slate-800">{selected.w}×{selected.h} cells</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Area</dt>
                  <dd className="font-semibold text-slate-800">{selected.w * selected.h * CELL_AREA} m²</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Typical utilization</dt>
                  <dd className="font-semibold text-slate-800">{typeById[selected.typeId]?.utilization}%</dd>
                </div>
              </dl>
              <Button variant="outline" size="sm" className="mt-4 w-full" onClick={removeSelected}>
                <Trash2 size={14} /> Remove room
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
