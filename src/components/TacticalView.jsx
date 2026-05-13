import { useState } from 'react';
import { useMatch } from '../hooks/useMatch';

const TacticalView = () => {
  const { matchData, config, addHeatmapPoint } = useMatch();
  const [viewMode, setViewMode] = useState('tactical');

  const handlePitchClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    addHeatmapPoint(x, y);
  };

  const isCricket = config.sport === 'cricket';

  return (
    <div className="tactical-view glass-panel">
      <div className="tactical-header">
        <h3 className="text-gradient">LIVE TACTICAL HUD</h3>
        <div className="pov-selector">
          <button className={viewMode === 'tactical' ? 'active' : ''} onClick={() => setViewMode('tactical')}>TOP-DOWN</button>
          <button className={viewMode === '3d' ? 'active' : ''} onClick={() => setViewMode('3d')}>ISO-HUD</button>
        </div>
      </div>

      <div 
        className={`pitch ${isCricket ? 'cricket-ground' : 'football-pitch'}`} 
        onClick={handlePitchClick}
        style={{ transform: viewMode === '3d' ? 'rotateX(45deg) rotateZ(-5deg) scale(0.9)' : 'none' }}
      >
        <div className="scan-line"></div>
        <div className="pitch-overlay"></div>
        
        {/* Pitch Markings */}
        {!isCricket ? (
          <>
            <div className="pitch-center"></div>
            <div className="penalty-area home"></div>
            <div className="penalty-area away"></div>
            <div className="goal-area home"></div>
            <div className="goal-area away"></div>
          </>
        ) : (
          <>
            <div className="pitch-strip"></div>
            <div className="crease-line north"></div>
            <div className="crease-line south"></div>
            <div className="boundary-circle"></div>
          </>
        )}

        {/* Players */}
        {matchData.players.map(p => (
          <div 
            key={p.id}
            className={`player ${p.team === 'away' ? 'away-player' : ''} animate-pulse`}
            style={{ 
              left: `${p.x}%`, 
              top: `${p.y}%`,
              transition: 'all 1.5s linear'
            }}
          >
            <div className="player-id">{p.id}</div>
          </div>
        ))}

        {/* Heatmap */}
        <svg className="heatmap-layer">
          {matchData.heatmap.map(pt => (
            <circle 
              key={pt.id} 
              cx={`${pt.x}%`} 
              cy={`${pt.y}%`} 
              r="15" 
              className="heatmap-point" 
            />
          ))}
        </svg>

        {matchData.lastAction && (
          <div className="special-action-overlay animate-pulse">
            {matchData.lastAction}
          </div>
        )}
      </div>
      <div className="tactical-footer">
        <div className="data-readout">
          <span className="label">INTEL:</span>
          <span className="val">POSSESSION RECYCLING {Math.round(matchData.momentum)}%</span>
        </div>
      </div>
    </div>
  );
};

export default TacticalView;
