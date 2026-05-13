import { useMatch } from '../hooks/useMatch';

const AICommentary = () => {
  const { matchData, setCommentaryStyle } = useMatch();

  return (
    <div className="ai-commentary glass-panel animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <div className="commentary-header">
        <h3 className="text-gradient">AI CO-PILOT</h3>
        <div className="style-selector">
          <button 
            className={matchData.commentaryStyle === 'tactical' ? 'active' : ''} 
            onClick={() => setCommentaryStyle('tactical')}
          >🧠 TACTICAL</button>
          <button 
            className={matchData.commentaryStyle === 'hype' ? 'active' : ''} 
            onClick={() => setCommentaryStyle('hype')}
          >🔥 HYPE</button>
          <button 
            className={matchData.commentaryStyle === 'nerd' ? 'active' : ''} 
            onClick={() => setCommentaryStyle('nerd')}
          >📊 NERD</button>
        </div>
      </div>
      <div className="commentary-feed">
        {matchData.commentary.length > 0 ? (
          matchData.commentary.map(c => (
            <div key={c.id} className="commentary-item animate-slide-up">
              <span className="persona-badge">{c.persona}</span>
              <p className="commentary-text">{c.text}</p>
            </div>
          ))
        ) : (
          <p className="empty-msg">Waiting for match action to analyze...</p>
        )}
      </div>
    </div>
  );
};

export default AICommentary;
