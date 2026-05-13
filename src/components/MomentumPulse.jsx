import { useState } from 'react';
import { useMatch } from '../hooks/useMatch';

const MomentumPulse = () => {
  const { matchData, addCheer, switchFaction } = useMatch();
  const [pulseCount, setPulseCount] = useState(0);

  // Generate Waveform points
  const timelineSlice = matchData.timeline.slice(-20);
  const points = timelineSlice.map((d, i) => 
    `${i * 15},${30 - (d.intensity / 100) * 30}`
  ).join(' ');

  const handleCheer = () => {
    setPulseCount(p => p + 1);
    addCheer();
  };

  const lastPoint = timelineSlice.length > 0 ? {
    x: (timelineSlice.length - 1) * 15,
    y: 30 - (timelineSlice[timelineSlice.length - 1].intensity / 100) * 30
  } : null;

  return (
    <div className="momentum-container glass-panel animate-slide-up">
      <div className="faction-battle-container">
        <div className="faction-label home">HOME</div>
        <div className="battle-bar">
          <div className="battle-fill home" style={{ width: `${matchData.factionBattle.home}%` }}></div>
          <div className="battle-fill away" style={{ width: `${matchData.factionBattle.away}%` }}></div>
        </div>
        <div className="faction-label away">AWAY</div>
      </div>

      <div className="momentum-header">
        <h3 className="text-gradient">MOMENTUM WAVEFORM</h3>
        <span className="momentum-value">{Math.round(matchData.momentum)}%</span>
      </div>
      
      <div className="waveform-container">
        <svg viewBox="0 0 300 40" className="momentum-waveform">
          <path
            d={`M 0,20 ${points}`}
            fill="none"
            stroke="var(--primary-color)"
            strokeWidth="2"
            className="waveform-path"
          />
          {lastPoint && (
            <circle 
              cx={lastPoint.x} 
              cy={lastPoint.y} 
              r="3" 
              fill="var(--primary-color)"
              className="waveform-head"
            />
          )}
        </svg>
      </div>

      <div className="pulse-action">
        <div className="faction-toggle">
          <button className={matchData.faction === 'home' ? 'active' : ''} onClick={() => switchFaction('home')}>SUPPORT HOME</button>
          <button className={matchData.faction === 'away' ? 'active' : ''} onClick={() => switchFaction('away')}>SUPPORT AWAY</button>
        </div>
        <button className="pulse-button" onClick={handleCheer}>
          <div className="pulse-ring"></div>
          <span className="pulse-icon">🔥</span>
        </button>
        <div className="user-contribution">Your Energy Contribution: {pulseCount}</div>
      </div>
    </div>
  );
};

export default MomentumPulse;
