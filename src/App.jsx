import { MatchProvider } from './MatchContext';
import { useMatch } from './hooks/useMatch';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import TacticalView from './components/TacticalView';
import WinProbabilityRiver from './components/WinProbabilityRiver';
import MomentumPulse from './components/MomentumPulse';
import FlashPredictions from './components/FlashPredictions';
import WatchParty from './components/WatchParty';
import Settings from './components/Settings';
import ReportCard from './components/ReportCard';
import ActivityFeed from './components/ActivityFeed';
import AICommentary from './components/AICommentary';
import SocialTicker from './components/SocialTicker';
import EmotionalPulse from './components/EmotionalPulse';
import './App.css';

function Dashboard() {
  const { matchData, config, endMatch } = useMatch();
  return (
    <ErrorBoundary>
      <div className={`app-container ${matchData.momentum > 80 ? 'high-momentum' : ''}`}>
        <Header />
        
        <main className="main-col">
          <TacticalView />
          <div className="stats-row">
            <WinProbabilityRiver />
            <MomentumPulse />
          </div>
          <ActivityFeed />
        </main>

        <aside className="side-col">
          <FlashPredictions />
          <EmotionalPulse />
          <WatchParty />
          <div className="aura-card glass-panel float">
            <div className="badge">ARENA RANK</div>
            <div className="rank-value">PLATINUM III</div>
            <div className="stats-mini">Global Percentile: Top 2.4%</div>
          </div>
        </aside>
        <SocialTicker />
        <Settings />
        <ReportCard />
      </div>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <MatchProvider>
        <Dashboard />
      </MatchProvider>
    </ErrorBoundary>
  );
}

export default App;
