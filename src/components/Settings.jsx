import { useState } from 'react';
import { useMatch } from '../hooks/useMatch';

const Settings = () => {
  const { matchData, toggleReplay, toggleSpeech, toggleHighContrast } = useMatch();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="settings-container">
      <button className="settings-trigger" onClick={() => setIsOpen(!isOpen)}>⚙️</button>
      {isOpen && (
        <div className="settings-panel glass-panel animate-slide-up">
          <h3>DEMO SETTINGS</h3>
          <div className="setting-item">
            <label>REPLAY MODE (10X)</label>
            <button 
              className={matchData.isReplaying ? 'active' : ''} 
              onClick={toggleReplay}
            >{matchData.isReplaying ? 'ON' : 'OFF'}</button>
          </div>
          <div className="setting-item">
            <label>SPEECH CO-PILOT</label>
            <button 
              className={matchData.accessibility.speech ? 'active' : ''} 
              onClick={toggleSpeech}
            >{matchData.accessibility.speech ? 'ON' : 'OFF'}</button>
          </div>
          <div className="setting-item">
            <label>HIGH CONTRAST</label>
            <button 
              className={matchData.accessibility.highContrast ? 'active' : ''} 
              onClick={toggleHighContrast}
            >{matchData.accessibility.highContrast ? 'ON' : 'OFF'}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
