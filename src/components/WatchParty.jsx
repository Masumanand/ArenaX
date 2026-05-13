import { useState } from 'react';
import { useMatch } from '../hooks/useMatch';

const WatchParty = () => {
  const { matchData, joinRoom } = useMatch();
  const [inputCode, setInputCode] = useState('');

  return (
    <div className="watch-party glass-panel animate-slide-up" style={{ animationDelay: '0.8s' }}>
      <h3 className="text-gradient">WATCH PARTY</h3>
      {!matchData.roomCode ? (
        <div className="join-room">
          <input 
            type="text" 
            placeholder="6-CHAR CODE" 
            maxLength="6"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value.toUpperCase())}
          />
          <button onClick={() => joinRoom(inputCode || 'AX792B')}>JOIN PARTY</button>
        </div>
      ) : (
        <div className="room-info">
          <div className="room-badge">ROOM: {matchData.roomCode}</div>
          <div className="active-friends">
            <div className="friend-dot"></div>
            <div className="friend-dot"></div>
            <div className="friend-dot"></div>
            <span>+4 others reacting</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchParty;
