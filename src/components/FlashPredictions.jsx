import { useState, useEffect } from 'react';
import { useMatch } from '../hooks/useMatch';

const FlashPredictions = () => {
  const { matchData, recordPrediction } = useMatch();
  const [voted, setVoted] = useState(false);

  const question = matchData.predictions?.[0]?.question;
  useEffect(() => {
    // Wrap in RAF to avoid synchronous setState warning
    requestAnimationFrame(() => setVoted(false));
  }, [question]);

  const handleVote = (opt) => {
    setVoted(opt);
    const isCorrect = Math.random() > 0.4; // eslint-disable-line react-hooks/purity
    setTimeout(() => recordPrediction(isCorrect), 1000);
  };

  return (
    <div className={`flash-prediction glass-panel ${!voted ? 'animate-pulse-subtle' : ''}`}>
      <div className="prediction-header">
        <div className="badge">FAST POLL</div>
        <div className="streak-tag">🔥 {matchData.userStats.streak} STREAK</div>
      </div>
      <h4>{matchData.predictions[0]?.question || 'Scanning for next prediction...'}</h4>
      <div className="prediction-options">
        {(matchData.predictions[0]?.options || ['YES', 'NO']).map(opt => (
          <button 
            key={opt} 
            className={`opt-btn ${voted === opt ? 'selected' : ''}`}
            onClick={() => handleVote(opt)}
            disabled={voted || !matchData.predictions[0]}
          >
            {opt}
          </button>
        ))}
      </div>
      {!voted && matchData.predictions[0] && <div className="expiry-bar animate-shrink"></div>}
      {voted && (
        <div className="voted-msg">
          Prediction Locked! 🎯
          <div className="stats-mini">Accuracy: {matchData.userStats.accuracy}%</div>
        </div>
      )}
    </div>
  );
};

export default FlashPredictions;
