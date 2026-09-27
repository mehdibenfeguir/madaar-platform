// ---------------------------------------------------------------------------
// MADAAR platform — static / mock data
// All numbers here are illustrative sample data for the frontend showcase.
// ---------------------------------------------------------------------------

export const BRAND = {
  name: 'MADAAR',
  nameAr: 'مدار',
  tagline: 'Smart Schools Operating System',
  taglineAr: 'المنصّة الذكية لإدارة أصول المدارس',
  vision: 'Aligned with Saudi Vision 2030',
  preparedBy: 'Aisha Ben Feguir',
  preparedByAr: 'عائشة بن فقير',
}

export type KPI = {
  id: string
  label: string
  value: string
  delta: number // percentage change, +/-
  spark: number[]
  tone: 'brand' | 'teal' | 'gold'
}

export const OVERVIEW_KPIS: KPI[] = [
  {
    id: 'utilization',
    label: 'Space Utilization',
    value: '87%',
    delta: 23,
    spark: [58, 61, 64, 63, 70, 76, 81, 87],
    tone: 'brand',
  },
  {
    id: 'savings',
    label: 'Annual Op. Savings',
    value: 'SAR 4.2M',
    delta: 18,
    spark: [1.1, 1.6, 2.0, 2.6, 3.1, 3.5, 3.9, 4.2],
    tone: 'teal',
  },
  {
    id: 'revenue',
    label: 'Evening Rental Revenue',
    value: 'SAR 1.8M',
    delta: 34,
    spark: [0.2, 0.4, 0.6, 0.9, 1.1, 1.4, 1.6, 1.8],
    tone: 'gold',
  },
  {
    id: 'paperless',
    label: 'Paperless Reports',
    value: '96%',
    delta: 41,
    spark: [40, 52, 60, 68, 77, 85, 92, 96],
    tone: 'brand',
  },
]

// --- Pillars (drive navigation + overview) ------------------------------------
export type Deliverable = { name: string; path: string; blurb: string }
export type Pillar = {
  id: string
  index: number
  title: string
  summary: string
  accent: 'brand' | 'teal' | 'gold' | 'rose'
  deliverables: Deliverable[]
}

export const PILLARS: Pillar[] = [
  {
    id: 'space',
    index: 1,
    title: 'Asset & Space Management',
    summary:
      'Map, monetize and optimize every square meter of the campus with AI spatial algorithms.',
    accent: 'brand',
    deliverables: [
      {
        name: 'Space Simulation Engine',
        path: '/space/simulation',
        blurb: 'Virtually map classrooms & labs and compute spatial efficiency.',
      },
      {
        name: 'Evening Monetization Portal',
        path: '/space/monetization',
        blurb: 'Rent facilities off-peak with live tracking & payments.',
      },
      {
        name: 'Utilization Dashboard',
        path: '/space/utilization',
        blurb: 'Staff & space efficiency before vs. after AI optimization.',
      },
    ],
  },
  {
    id: 'stem',
    index: 2,
    title: 'Interactive STEM Learning',
    summary:
      'Immersive, always-on science learning that removes the cost and risk of physical labs.',
    accent: 'teal',
    deliverables: [
      {
        name: 'Mobtakir VR Science Lab',
        path: '/stem/vr-lab',
        blurb: 'Run hazardous experiments safely in 3D virtual reality.',
      },
      {
        name: '24/7 AI Tutor Engine',
        path: '/stem/ai-tutor',
        blurb: 'Round-the-clock conversational STEM support.',
      },
      {
        name: 'STEM Content Hub',
        path: '/stem/content-hub',
        blurb: 'Interactive digital library of enhanced lessons.',
      },
    ],
  },
  {
    id: 'transformation',
    index: 3,
    title: 'Digital Transformation & Privatization',
    summary:
      'Open operational data for private investment and go paperless — the Vision 2030 way.',
    accent: 'gold',
    deliverables: [
      {
        name: 'PPP Bidding Portal',
        path: '/transformation/ppp',
        blurb: 'Showcase school data open for private investment.',
      },
      {
        name: 'ROI & Resource Calculator',
        path: '/transformation/roi',
        blurb: 'Project operational savings instantly by area & capacity.',
      },
      {
        name: 'Automated Reporting System',
        path: '/transformation/reporting',
        blurb: 'Generate operational reports — paperless management.',
      },
    ],
  },
  {
    id: 'strategy',
    index: 4,
    title: 'Operational Strategy',
    summary:
      'Turn live operational data into investor-ready decks, models and rollout roadmaps.',
    accent: 'rose',
    deliverables: [
      {
        name: 'Pitch Deck Generator',
        path: '/strategy/pitch-deck',
        blurb: 'Auto-build interactive investor decks from live data.',
      },
      {
        name: 'Business Plan Modeling',
        path: '/strategy/business-plan',
        blurb: 'Model costs, revenue streams & implementation.',
      },
      {
        name: 'Transformation Roadmap',
        path: '/strategy/roadmap',
        blurb: 'Interactive rollout roadmaps & deployment tracking.',
      },
    ],
  },
]

// --- Pillar 1: Space Simulation ----------------------------------------------
export type RoomType = {
  id: string
  label: string
  color: string
  defaultArea: number // m2
  seatsPerRoom: number
  utilization: number // %
}

export const ROOM_TYPES: RoomType[] = [
  { id: 'classroom', label: 'Classroom', color: '#6366f1', defaultArea: 56, seatsPerRoom: 30, utilization: 82 },
  { id: 'science', label: 'Science Lab', color: '#14b8a6', defaultArea: 72, seatsPerRoom: 24, utilization: 61 },
  { id: 'computer', label: 'Computer Lab', color: '#f59e0b', defaultArea: 64, seatsPerRoom: 28, utilization: 74 },
  { id: 'library', label: 'Library', color: '#8b5cf6', defaultArea: 120, seatsPerRoom: 60, utilization: 48 },
  { id: 'admin', label: 'Admin Office', color: '#64748b', defaultArea: 24, seatsPerRoom: 4, utilization: 55 },
  { id: 'hall', label: 'Multi-purpose Hall', color: '#ec4899', defaultArea: 200, seatsPerRoom: 180, utilization: 38 },
]

// A simple pre-laid-out floor plan (grid coordinates, spans)
export type PlacedRoom = {
  id: string
  typeId: string
  name: string
  x: number
  y: number
  w: number
  h: number
}

export const INITIAL_FLOORPLAN: PlacedRoom[] = [
  { id: 'r1', typeId: 'classroom', name: '1A', x: 0, y: 0, w: 2, h: 2 },
  { id: 'r2', typeId: 'classroom', name: '1B', x: 2, y: 0, w: 2, h: 2 },
  { id: 'r3', typeId: 'science', name: 'Sci-1', x: 4, y: 0, w: 3, h: 2 },
  { id: 'r4', typeId: 'computer', name: 'IT-1', x: 7, y: 0, w: 3, h: 2 },
  { id: 'r5', typeId: 'library', name: 'Library', x: 0, y: 2, w: 4, h: 3 },
  { id: 'r6', typeId: 'hall', name: 'Hall', x: 4, y: 2, w: 6, h: 3 },
  { id: 'r7', typeId: 'admin', name: 'Admin', x: 0, y: 5, w: 2, h: 1 },
]

// --- Pillar 1: Utilization dashboard -----------------------------------------
export const UTILIZATION_MONTHLY = [
  { month: 'Jan', before: 54, after: 71 },
  { month: 'Feb', before: 57, after: 74 },
  { month: 'Mar', before: 55, after: 78 },
  { month: 'Apr', before: 60, after: 80 },
  { month: 'May', before: 62, after: 83 },
  { month: 'Jun', before: 59, after: 85 },
  { month: 'Sep', before: 63, after: 87 },
  { month: 'Oct', before: 65, after: 89 },
]

export const STAFF_DISTRIBUTION = [
  { role: 'Teaching', before: 62, after: 71 },
  { role: 'Administrative', before: 24, after: 15 },
  { role: 'Operations', before: 9, after: 8 },
  { role: 'Support', before: 5, after: 6 },
]

export const ROOM_UTIL_RADAR = ROOM_TYPES.map((r) => ({
  subject: r.label,
  before: Math.max(30, r.utilization - 22),
  after: r.utilization,
}))

// --- Pillar 1: Monetization portal -------------------------------------------
export type Facility = {
  id: string
  name: string
  category: 'Sports' | 'Hall' | 'Lab' | 'Classroom'
  capacity: number
  pricePerHour: number
  rating: number
  image: string // emoji stand-in
}

export const FACILITIES: Facility[] = [
  { id: 'f1', name: 'Football Field', category: 'Sports', capacity: 22, pricePerHour: 320, rating: 4.8, image: '⚽' },
  { id: 'f2', name: 'Indoor Basketball Court', category: 'Sports', capacity: 30, pricePerHour: 260, rating: 4.6, image: '🏀' },
  { id: 'f3', name: 'Main Auditorium', category: 'Hall', capacity: 400, pricePerHour: 850, rating: 4.9, image: '🎤' },
  { id: 'f4', name: 'Science Lab (Chem)', category: 'Lab', capacity: 24, pricePerHour: 180, rating: 4.4, image: '🧪' },
  { id: 'f5', name: 'Computer Lab', category: 'Lab', capacity: 28, pricePerHour: 210, rating: 4.5, image: '💻' },
  { id: 'f6', name: 'Multi-purpose Hall', category: 'Hall', capacity: 180, pricePerHour: 460, rating: 4.7, image: '🏟️' },
]

export const TIME_SLOTS = [
  '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00',
]

export const LIVE_BOOKINGS = [
  { id: 'b1', facility: 'Football Field', renter: 'Al-Nasr Academy', time: 'Today · 18:00–20:00', amount: 640, status: 'Confirmed' },
  { id: 'b2', facility: 'Main Auditorium', renter: 'TEDx Riyadh Youth', time: 'Today · 19:00–22:00', amount: 2550, status: 'Paid' },
  { id: 'b3', facility: 'Computer Lab', renter: 'CodeKids Bootcamp', time: 'Tomorrow · 16:00–18:00', amount: 420, status: 'Pending' },
  { id: 'b4', facility: 'Basketball Court', renter: 'Community League', time: 'Tomorrow · 20:00–21:00', amount: 260, status: 'Confirmed' },
]

// --- Pillar 2: VR Lab ---------------------------------------------------------
export type Experiment = {
  id: string
  title: string
  subject: 'Chemistry' | 'Physics' | 'Biology'
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  hazard: 'Low' | 'Medium' | 'High'
  durationMin: number
  savedCost: number
  emoji: string
  desc: string
}

export const EXPERIMENTS: Experiment[] = [
  { id: 'e1', title: 'Titration of a Strong Acid', subject: 'Chemistry', difficulty: 'Intermediate', hazard: 'High', durationMin: 25, savedCost: 340, emoji: '⚗️', desc: 'Neutralize HCl with NaOH and track the pH curve in real time.' },
  { id: 'e2', title: 'Ohm’s Law Circuit Lab', subject: 'Physics', difficulty: 'Beginner', hazard: 'Low', durationMin: 18, savedCost: 120, emoji: '🔌', desc: 'Build series & parallel circuits and measure V, I and R.' },
  { id: 'e3', title: 'Cell Mitosis Explorer', subject: 'Biology', difficulty: 'Beginner', hazard: 'Low', durationMin: 20, savedCost: 90, emoji: '🧬', desc: 'Step through the phases of mitosis on an interactive 3D cell.' },
  { id: 'e4', title: 'Flame Test of Metal Salts', subject: 'Chemistry', difficulty: 'Intermediate', hazard: 'High', durationMin: 15, savedCost: 260, emoji: '🔥', desc: 'Identify metal ions by flame color — safely, with no open flame.' },
  { id: 'e5', title: 'Projectile Motion Range', subject: 'Physics', difficulty: 'Advanced', hazard: 'Medium', durationMin: 30, savedCost: 150, emoji: '🎯', desc: 'Vary launch angle & velocity to model projectile trajectories.' },
  { id: 'e6', title: 'Electrolysis of Water', subject: 'Chemistry', difficulty: 'Advanced', hazard: 'Medium', durationMin: 28, savedCost: 300, emoji: '💧', desc: 'Split water into H₂ and O₂ and measure the 2:1 gas ratio.' },
]

// --- Pillar 2: AI Tutor -------------------------------------------------------
export const TUTOR_SUGGESTIONS = [
  'Explain Newton’s second law with an example',
  'Why is the sky blue?',
  'Balance: C₃H₈ + O₂ → CO₂ + H₂O',
  'What is the difference between mitosis and meiosis?',
]

export const TUTOR_SCRIPT: Record<string, string> = {
  default:
    'Great question! Let’s break it down step by step. In MADAAR, I tailor the explanation to the student’s grade level and learning pace, then follow up with a short check-for-understanding quiz.',
  'Explain Newton’s second law with an example':
    'Newton’s second law states that Force = mass × acceleration (F = ma). Example: pushing a 2 kg cart with 10 N of force gives it an acceleration of 5 m/s². Want me to turn this into a quick 3-question quiz?',
  'Why is the sky blue?':
    'Sunlight contains all colors. As it passes through the atmosphere, shorter (blue) wavelengths scatter far more than longer ones — this is Rayleigh scattering — so the sky looks blue. At sunset the light travels farther, blue scatters away, and we see red/orange.',
  'Balance: C₃H₈ + O₂ → CO₂ + H₂O':
    'Balanced equation: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O. Carbon: 3=3 ✓, Hydrogen: 8=8 ✓, Oxygen: 10=10 ✓. This is the complete combustion of propane.',
  'What is the difference between mitosis and meiosis?':
    'Mitosis produces 2 identical diploid cells for growth/repair. Meiosis produces 4 genetically-varied haploid cells (gametes) for reproduction. Key difference: meiosis has two divisions and introduces genetic variation via crossing over.',
}

// --- Pillar 2: Content Hub ----------------------------------------------------
export type Lesson = {
  id: string
  title: string
  subject: string
  grade: string
  type: 'Interactive' | 'Video' | 'Simulation' | 'Quiz'
  minutes: number
  progress: number
  emoji: string
}

export const LESSONS: Lesson[] = [
  { id: 'l1', title: 'Forces & Motion', subject: 'Physics', grade: 'G9', type: 'Interactive', minutes: 35, progress: 72, emoji: '🚀' },
  { id: 'l2', title: 'The Periodic Table', subject: 'Chemistry', grade: 'G10', type: 'Simulation', minutes: 40, progress: 45, emoji: '🧫' },
  { id: 'l3', title: 'Photosynthesis', subject: 'Biology', grade: 'G8', type: 'Video', minutes: 22, progress: 100, emoji: '🌱' },
  { id: 'l4', title: 'Algebraic Expressions', subject: 'Math', grade: 'G7', type: 'Interactive', minutes: 30, progress: 60, emoji: '➗' },
  { id: 'l5', title: 'Electric Circuits', subject: 'Physics', grade: 'G11', type: 'Simulation', minutes: 45, progress: 12, emoji: '⚡' },
  { id: 'l6', title: 'Cell Structure', subject: 'Biology', grade: 'G9', type: 'Quiz', minutes: 15, progress: 88, emoji: '🔬' },
  { id: 'l7', title: 'Trigonometry Basics', subject: 'Math', grade: 'G10', type: 'Video', minutes: 28, progress: 33, emoji: '📐' },
  { id: 'l8', title: 'Chemical Bonding', subject: 'Chemistry', grade: 'G11', type: 'Interactive', minutes: 38, progress: 55, emoji: '🔗' },
]

// --- Pillar 3: PPP Bidding ----------------------------------------------------
export type Opportunity = {
  id: string
  school: string
  city: string
  model: 'BOT' | 'O&M' | 'Lease' | 'Full Privatization'
  area: number
  students: number
  annualRevenue: number
  investment: number
  irr: number
  term: number
  status: 'Open' | 'Under Review' | 'Awarded'
}

export const OPPORTUNITIES: Opportunity[] = [
  { id: 'o1', school: 'Al-Faisal Model School', city: 'Riyadh', model: 'O&M', area: 12000, students: 1200, annualRevenue: 3800000, investment: 6500000, irr: 18.4, term: 10, status: 'Open' },
  { id: 'o2', school: 'Jeddah Science Academy', city: 'Jeddah', model: 'BOT', area: 9800, students: 900, annualRevenue: 2900000, investment: 5200000, irr: 16.1, term: 15, status: 'Open' },
  { id: 'o3', school: 'Dammam Tech High', city: 'Dammam', model: 'Lease', area: 7400, students: 700, annualRevenue: 1600000, investment: 2400000, irr: 21.7, term: 7, status: 'Under Review' },
  { id: 'o4', school: 'Madinah Girls College', city: 'Madinah', model: 'Full Privatization', area: 15200, students: 1500, annualRevenue: 5100000, investment: 9800000, irr: 15.3, term: 20, status: 'Open' },
  { id: 'o5', school: 'NEOM Pilot School', city: 'NEOM', model: 'BOT', area: 18000, students: 800, annualRevenue: 4200000, investment: 12000000, irr: 19.8, term: 18, status: 'Awarded' },
]

// --- Pillar 3: ROI calculator defaults ---------------------------------------
export const ROI_DEFAULTS = {
  area: 10000, // m2
  students: 1000,
  utilizationGain: 24, // percentage points
  energyCostPerM2: 145, // SAR / m2 / yr
  adminCostPerStudent: 900, // SAR / student / yr
  eveningRatePerM2: 38, // SAR / m2 / yr rental yield
  paperlessSavingPerStudent: 60,
}

// --- Pillar 3: Reporting ------------------------------------------------------
export const REPORT_TEMPLATES = [
  { id: 't1', name: 'Monthly Operations Summary', icon: '📊', fields: 12, auto: true },
  { id: 't2', name: 'Energy & Sustainability', icon: '🌿', fields: 9, auto: true },
  { id: 't3', name: 'Facility Utilization', icon: '🏫', fields: 15, auto: true },
  { id: 't4', name: 'Revenue & Rentals', icon: '💰', fields: 10, auto: true },
  { id: 't5', name: 'Staff Efficiency', icon: '👥', fields: 8, auto: false },
  { id: 't6', name: 'Investor Quarterly Pack', icon: '📈', fields: 22, auto: false },
]

export const GENERATED_REPORTS = [
  { id: 'g1', name: 'September Operations Summary', date: '2026-09-30', pages: 14, size: '2.4 MB', paperSaved: 340 },
  { id: 'g2', name: 'Q3 Investor Pack', date: '2026-09-28', pages: 32, size: '5.1 MB', paperSaved: 780 },
  { id: 'g3', name: 'Energy Report — August', date: '2026-08-31', pages: 9, size: '1.2 MB', paperSaved: 190 },
]

// --- Pillar 4: Pitch deck -----------------------------------------------------
export type Slide = {
  id: string
  kicker: string
  title: string
  bullets: string[]
  metric?: { label: string; value: string }
}

export const PITCH_SLIDES: Slide[] = [
  {
    id: 's1',
    kicker: 'The Problem',
    title: 'Public schools run at ~55% space efficiency',
    bullets: [
      'Facilities sit idle every evening & weekend',
      'Physical labs are costly, risky and under-utilized',
      'Operations are paper-heavy and hard to benchmark',
    ],
    metric: { label: 'Idle capacity', value: '45%' },
  },
  {
    id: 's2',
    kicker: 'The Solution',
    title: 'MADAAR — a smart operating system for schools',
    bullets: [
      'AI space optimization & digital twin simulation',
      'Evening monetization marketplace with payments',
      'VR labs + 24/7 AI tutor to cut lab costs',
    ],
    metric: { label: 'Utilization', value: '87%' },
  },
  {
    id: 's3',
    kicker: 'Market',
    title: '25,000+ public schools across the Kingdom',
    bullets: [
      'Vision 2030 privatization mandate',
      'SAR 200B+ annual education spend',
      'Growing PPP appetite from private operators',
    ],
    metric: { label: 'TAM', value: 'SAR 12B' },
  },
  {
    id: 's4',
    kicker: 'Business Model',
    title: 'SaaS + transaction + advisory',
    bullets: [
      'Per-school SaaS subscription',
      '8% take-rate on facility rentals',
      'PPP structuring & advisory fees',
    ],
    metric: { label: 'ARPU', value: 'SAR 96K' },
  },
  {
    id: 's5',
    kicker: 'Traction',
    title: 'Pilot results across 12 schools',
    bullets: [
      '+23 pts space utilization',
      'SAR 4.2M annual savings modeled',
      '96% of reports now paperless',
    ],
    metric: { label: 'Payback', value: '14 mo' },
  },
  {
    id: 's6',
    kicker: 'The Ask',
    title: 'Raising SAR 25M Series A',
    bullets: [
      'Scale to 500 schools in 24 months',
      'Build the VR content studio',
      'Expand PPP structuring team',
    ],
    metric: { label: 'Round', value: 'SAR 25M' },
  },
]

// --- Pillar 4: Business plan --------------------------------------------------
export const REVENUE_STREAMS = [
  { name: 'SaaS Subscriptions', value: 42, color: '#6366f1' },
  { name: 'Rental Take-rate', value: 28, color: '#14b8a6' },
  { name: 'PPP Advisory', value: 18, color: '#f59e0b' },
  { name: 'VR Content', value: 12, color: '#ec4899' },
]

export const COST_STRUCTURE = [
  { name: 'R&D / Engineering', value: 38, color: '#6366f1' },
  { name: 'Sales & Marketing', value: 24, color: '#f59e0b' },
  { name: 'Operations', value: 20, color: '#14b8a6' },
  { name: 'G&A', value: 18, color: '#64748b' },
]

export const PNL_PROJECTION = [
  { year: 'Y1', revenue: 6, cost: 8 },
  { year: 'Y2', revenue: 18, cost: 15 },
  { year: 'Y3', revenue: 42, cost: 28 },
  { year: 'Y4', revenue: 78, cost: 46 },
  { year: 'Y5', revenue: 130, cost: 72 },
]

export const CANVAS_BLOCKS = [
  { id: 'kp', title: 'Key Partners', items: ['Ministry of Education', 'Private operators', 'VR content studios', 'Payment gateways'] },
  { id: 'ka', title: 'Key Activities', items: ['AI optimization', 'Marketplace ops', 'VR production', 'PPP structuring'] },
  { id: 'kr', title: 'Key Resources', items: ['Spatial AI engine', 'School data', 'VR library', 'Advisory team'] },
  { id: 'vp', title: 'Value Propositions', items: ['+30% space efficiency', 'New revenue streams', 'Zero-risk labs', 'Paperless ops'] },
  { id: 'cr', title: 'Customer Relationships', items: ['Dedicated success mgr', 'Self-serve dashboards', 'Quarterly reviews'] },
  { id: 'ch', title: 'Channels', items: ['Direct to MoE', 'Regional education depts', 'PPP tenders'] },
  { id: 'cs', title: 'Customer Segments', items: ['Public schools', 'Private operators', 'Investors', 'Community renters'] },
  { id: 'co', title: 'Cost Structure', items: ['Engineering', 'Sales', 'VR content', 'Operations'] },
  { id: 're', title: 'Revenue Streams', items: ['SaaS', 'Rental take-rate', 'Advisory', 'VR licensing'] },
]

// --- Pillar 4: Roadmap (Gantt) -----------------------------------------------
export type GanttTask = {
  id: string
  name: string
  phase: string
  start: number // month index (0-based)
  duration: number // months
  progress: number // %
  color: string
}

export const ROADMAP_MONTHS = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12']

export const GANTT_TASKS: GanttTask[] = [
  { id: 'g1', name: 'Discovery & Data Audit', phase: 'Onboarding', start: 0, duration: 2, progress: 100, color: '#6366f1' },
  { id: 'g2', name: 'Digital Twin Setup', phase: 'Onboarding', start: 1, duration: 2, progress: 90, color: '#6366f1' },
  { id: 'g3', name: 'Space Optimization Rollout', phase: 'Deployment', start: 3, duration: 3, progress: 55, color: '#14b8a6' },
  { id: 'g4', name: 'Monetization Portal Launch', phase: 'Deployment', start: 4, duration: 2, progress: 40, color: '#14b8a6' },
  { id: 'g5', name: 'VR Lab Integration', phase: 'Deployment', start: 5, duration: 3, progress: 20, color: '#14b8a6' },
  { id: 'g6', name: 'Staff Training', phase: 'Adoption', start: 6, duration: 2, progress: 10, color: '#f59e0b' },
  { id: 'g7', name: 'PPP Data Room', phase: 'Scale', start: 8, duration: 2, progress: 0, color: '#ec4899' },
  { id: 'g8', name: 'Multi-school Scale-up', phase: 'Scale', start: 9, duration: 3, progress: 0, color: '#ec4899' },
]

export const ROADMAP_MILESTONES = [
  { month: 2, label: 'Digital twin live' },
  { month: 5, label: 'First rental revenue' },
  { month: 8, label: 'VR labs operational' },
  { month: 11, label: 'PPP data room open' },
]
