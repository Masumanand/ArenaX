import { useMatch } from '../hooks/useMatch';

const WinProbabilityRiver = () => {
  const { matchData } = useMatch();
  
  return (
    <div className="win-prob-container glass-panel animate-slide-up" style={{ animationDelay: '0.3s' }}>
      <div className="river-header">
        <h3>WIN PROBABILITY RIVER</h3>
        <div className="prob-values">
          <span className="home-p">{Math.round(matchData.winProb)}%</span>
          <span className="away-p">{Math.round(100 - matchData.winProb)}%</span>
        </div>
      </div>
      <div className="river-bed">
        <div 
          className="river-water home" 
          style={{ width: `${matchData.winProb}%` }}
        ></div>
        <div 
          className="river-water away" 
          style={{ width: `${100 - matchData.winProb}%` }}
        ></div>
        <div className="river-current" style={{ left: `${matchData.winProb}%` }}></div>
      </div>
    </div>
  );
};

export default WinProbabilityRiver;
