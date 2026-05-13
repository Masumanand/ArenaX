import { useMatch } from '../hooks/useMatch';

const ReportCard = () => {
  const { matchData, config } = useMatch();
  if (!matchData.matchEnded) return null;

  return (
    <div className="report-card-overlay">
      <div className="report-card glass-panel animate-slide-up">
        <div className="card-header">
          <h2 className="text-gradient">FAN REPORT CARD</h2>
          <p>{config.competition} SEASON 2026</p>
        </div>
        <div className="card-grid">
          <div className="stat-box">
            <label>PREDICTION ACCURACY</label>
            <div className="val">{matchData.userStats.accuracy}%</div>
          </div>
          <div className="stat-box">
            <label>PEAK ENERGY</label>
            <div className="val">LEGENDARY</div>
          </div>
          <div className="stat-box">
            <label>GLOBAL RANK</label>
            <div className="val">TOP 0.5%</div>
          </div>
          <div className="stat-box">
            <label>AURA EARNED</label>
            <div className="val">+2,450</div>
          </div>
        </div>
        <p className="ai-summary">
          "Your tactical foresight was unmatched today. Predicting the 88' goal put you in the elite tier of fans. A true {config.homeTeam.short} visionary."
        </p>
        <button className="btn-primary" onClick={() => window.location.reload()}>SHARE TO SOCIAL</button>
      </div>
    </div>
  );
};

export default ReportCard;
