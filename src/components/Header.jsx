import { useState } from 'react';
import { useMatch } from '../hooks/useMatch';

const Header = () => {
  const { config, matchData, availableMatches, switchMatch } = useMatch();
  const [showSelector, setShowSelector] = useState(false);

  return (
    <header className="header glass-panel animate-fade-in">
      <div className="match-meta">
        <button 
          className="selector-btn float" 
          onClick={() => setShowSelector(!showSelector)}
        >
          {config.competition} ▾
        </button>
        {showSelector && (
          <div className="match-dropdown glass-panel animate-slide-up">
            {availableMatches.map(m => (
              <div 
                key={m.id} 
                className={`match-option ${m.id === config.id ? 'active' : ''}`}
                onClick={() => {
                  switchMatch(m.id);
                  setShowSelector(false);
                }}
              >
                {m.sport === 'cricket' ? '🏏' : '⚽'} {m.homeTeam.short} vs {m.awayTeam.short}
              </div>
            ))}
          </div>
        )}
        <div className="venue-tag">📍 {matchData.venue}</div>
      </div>

      <div className="score-board">
        <div className="team home">
          <div className="team-logo float">{config.homeTeam.short[0]}</div>
          <div className="team-name">{config.homeTeam.short}</div>
        </div>

        <div className="score-container">
          <div className="score">
            {Array.isArray(matchData.score[0]) 
              ? `${matchData.score[0][0]}/${matchData.score[0][1]}` 
              : matchData.score[0]} 
            <span className="divider">:</span> 
            {Array.isArray(matchData.score[1]) 
              ? `${matchData.score[1][0]}/${matchData.score[1][1]}` 
              : matchData.score[1]}
          </div>
          <div className="match-info">
            <div className="timer animate-pulse">{matchData.time}'</div>
            {config.sport === 'cricket' && <div className="overs">OVERS {matchData.overs}</div>}
          </div>
        </div>

        <div className="team away">
          <div className="team-name">{config.awayTeam.short}</div>
          <div className="team-logo float" style={{ animationDelay: '0.5s' }}>{config.awayTeam.short[0]}</div>
        </div>
      </div>

      <div className="status-hud">
        <div className="live-indicator">
          <span className="dot animate-pulse"></span>
          LIVE 8K FEED
        </div>
        <div className="bitrate">144.2 MBPS</div>
      </div>
    </header>
  );
};

export default Header;
