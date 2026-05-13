import { useMatch } from '../hooks/useMatch';

const ActivityFeed = () => {
  const { matchData } = useMatch();

  const getEventIcon = (type) => {
    switch(type?.toUpperCase()) {
      case 'GOAL':
      case 'FOUR':
      case 'SIX': return '🔥';
      case 'WICKET':
      case 'RED':
      case 'YELLOW': return '⚠️';
      case 'SAVE':
      case 'CORNER': return '🎯';
      default: return '🛰️';
    }
  };

  return (
    <div className="activity-feed glass-panel">
      <div className="feed-header">
        <h4 className="text-gradient">GLOBAL EVENT STREAM</h4>
        <div className="ping-tag animate-pulse">PING: 24MS</div>
      </div>
      <div className="feed-container">
        {matchData.commentary.map((event, i) => (
          <div 
            key={event.id} 
            className="feed-item animate-slide-up" 
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="event-icon">{getEventIcon(event.text.split(' ')[0])}</div>
            <div className="event-content">
              <div className="event-meta">
                <span className="event-time">[{Math.floor(Math.random() * 90)}']</span>
                <span className="event-persona">{event.persona}</span>
              </div>
              <div className="event-text">{event.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
