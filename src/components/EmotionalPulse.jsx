import { useMatch } from '../hooks/useMatch';

const EmotionalPulse = () => {
  const { matchData } = useMatch();
  
  const maxIntensity = 100;
  const width = 1000;
  const height = 60;
  const step = width / 60;

  const points = matchData.timeline.length > 0 
    ? matchData.timeline.map((d, i) => 
        `${i * step},${height - (d.intensity / maxIntensity) * height}`
      ).join(' ')
    : `0,${height}`;

  return (
    <div className="emotional-pulse glass-panel animate-slide-up" style={{ animationDelay: '0.6s' }}>
      <div className="pulse-header">
        <h3 className="text-gradient">EMOTIONAL PULSE</h3>
        <span className="live-tag">REAL-TIME INTENSITY</span>
      </div>
      <div className="pulse-graph-container">
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="pulse-svg">
          <polyline
            fill="none"
            stroke="var(--primary-color)"
            strokeWidth="2"
            points={points}
            className="pulse-line"
          />
          {matchData.timeline.map((d, i) => d.event && (
            <g key={i}>
              <circle 
                cx={i * step} 
                cy={height - (d.intensity / maxIntensity) * height} 
                r="4" 
                fill="var(--accent-color)" 
                className="event-dot"
              />
              <text 
                x={i * step} 
                y={height - (d.intensity / maxIntensity) * height - 8} 
                className="event-label"
              >{d.event}</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default EmotionalPulse;
