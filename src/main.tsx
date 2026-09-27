import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import Overview from './pages/Overview'
import SpaceSimulation from './pages/SpaceSimulation'
import Monetization from './pages/Monetization'
import Utilization from './pages/Utilization'
import VRLab from './pages/VRLab'
import AITutor from './pages/AITutor'
import ContentHub from './pages/ContentHub'
import PPPBidding from './pages/PPPBidding'
import ROICalculator from './pages/ROICalculator'
import Reporting from './pages/Reporting'
import PitchDeck from './pages/PitchDeck'
import BusinessPlan from './pages/BusinessPlan'
import Roadmap from './pages/Roadmap'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="space/simulation" element={<SpaceSimulation />} />
          <Route path="space/monetization" element={<Monetization />} />
          <Route path="space/utilization" element={<Utilization />} />
          <Route path="stem/vr-lab" element={<VRLab />} />
          <Route path="stem/ai-tutor" element={<AITutor />} />
          <Route path="stem/content-hub" element={<ContentHub />} />
          <Route path="transformation/ppp" element={<PPPBidding />} />
          <Route path="transformation/roi" element={<ROICalculator />} />
          <Route path="transformation/reporting" element={<Reporting />} />
          <Route path="strategy/pitch-deck" element={<PitchDeck />} />
          <Route path="strategy/business-plan" element={<BusinessPlan />} />
          <Route path="strategy/roadmap" element={<Roadmap />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
)
