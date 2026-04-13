import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ScamDetection from './pages/ScamDetection';
import ReportScam from './pages/ReportScam';
import ThreatDashboard from './pages/ThreatDashboard';
import LearnScams from './pages/LearnScams';
import AboutProject from './pages/AboutProject';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="scan" element={<ScamDetection />} />
        <Route path="report" element={<ReportScam />} />
        <Route path="dashboard" element={<ThreatDashboard />} />
        <Route path="learn" element={<LearnScams />} />
        <Route path="about" element={<AboutProject />} />
      </Route>
    </Routes>
  );
}

export default App;
