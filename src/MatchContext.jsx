import { useState, useEffect, useCallback, useMemo } from 'react';
import { MATCHES } from './config';
import { fetchAICommentary } from './services/gemini';
import { syncCheer, syncHeatmap } from './services/firebase';
import { generatePlayers, generatePrediction, generateCommentary } from './utils/matchUtils';
import { MatchContext } from './contexts/MatchContext';

export const MatchProvider = ({ children }) => {
  const [currentMatchId, setCurrentMatchId] = useState(MATCHES[0].id);
  const [matchData, setMatchData] = useState({
    score: [0, 0], 
    time: 0,
    venue: 'Anfield',
    competition: 'Champions League',
    historical: { team: 'LIV 2019', score: [2, 0], match: 'Final' },
    overs: '0.0',
    momentum: 50,
    events: [],
    players: [],
    predictions: [
      { 
        id: 'initial', 
        question: 'Who will win the next 5 mins?', 
        options: ['HOME', 'AWAY', 'DRAW'] 
      }
    ],
    lastAction: null,
    commentary: [],
    commentaryStyle: 'tactical',
    heatmap: [],
    userStats: { streak: 0, accuracy: 0, total: 0, correct: 0 },
    timeline: [],
    roomCode: null,
    faction: 'home', 
    factionBattle: { home: 60, away: 40 },
    matchEnded: false,
    xG: [0.0, 0.0],
    winProb: 50,
    isReplaying: false,
    replaySpeed: 1,
    accessibility: { speech: false, highContrast: false }
  });

  const config = useMemo(() => MATCHES.find(m => m.id === currentMatchId), [currentMatchId]);

  // Handle match change
  useEffect(() => {
    const isCricket = config.sport === 'cricket';
    
    requestAnimationFrame(() => {
      setMatchData(prev => ({
        ...prev,
        score: isCricket ? [[142, 3], [0, 0]] : [1, 1],
        time: 45,
        overs: isCricket ? '14.2' : '0.0',
        momentum: 50,
        events: [],
        players: generatePlayers(config.sport),
        predictions: [generatePrediction(config.sport)],
        lastAction: null
      }));
    });

    const interval = setInterval(() => {
      setMatchData(prev => {
        const isCricketSport = config.sport === 'cricket';
        let newScore = JSON.parse(JSON.stringify(prev.score));
        let newAction = null;
        let newOvers = prev.overs;

        if (Math.random() > 0.95) {
          if (isCricketSport) {
            const runs = [0, 1, 2, 4, 6][Math.floor(Math.random() * 5)];
            newScore[0][0] += runs;
            if (runs === 4 || runs === 6) newAction = runs === 6 ? 'SIX!' : 'FOUR!';
            
            let [o, b] = newOvers.split('.').map(Number);
            b++;
            if (b > 5) { o++; b = 0; }
            newOvers = `${o}.${b}`;
          } else {
            if (Math.random() > 0.98) {
              newScore[0]++;
              newAction = 'GOAL!';
            }
          }
        }

        const globalHomeCheer = Math.random() > 0.7 ? 0.5 : 0;
        const globalAwayCheer = Math.random() > 0.8 ? 0.5 : 0;
        const newTime = prev.time + 1/60;
        const newMomentum = Math.min(100, Math.max(0, prev.momentum + (Math.random() - 0.5) * 8));

        const updatedCommentary = (newAction || Math.random() > 0.9) ? [
          generateCommentary(newAction || 'AMBIENT', prev.commentaryStyle, config.sport),
          ...prev.commentary
        ].slice(0, 5) : prev.commentary;

        // Cycle predictions every 15 seconds
        let newPredictions = prev.predictions;
        if (Math.floor(newTime * 60) % 900 === 0) {
          newPredictions = [generatePrediction(config.sport)];
        }

        return {
          ...prev,
          score: newScore,
          lastAction: newAction,
          overs: newOvers,
          time: newTime,
          momentum: newMomentum,
          factionBattle: {
            home: Math.min(100, prev.factionBattle.home + globalHomeCheer),
            away: Math.min(100, prev.factionBattle.away + globalAwayCheer)
          },
          winProb: Math.min(100, Math.max(0, prev.winProb + (Math.random() - 0.5) * 4)),
          xG: !isCricketSport && Math.random() > 0.95 ? [prev.xG[0] + Math.random() * 0.5, prev.xG[1]] : prev.xG,
          players: prev.players.map(p => ({
            ...p,
            x: Math.min(95, Math.max(5, p.x + (Math.random() - 0.5) * 3)),
            y: Math.min(95, Math.max(5, p.y + (Math.random() - 0.5) * 3)),
          })),
          commentary: updatedCommentary,
          timeline: [...prev.timeline, { 
            time: Math.floor(newTime), 
            intensity: newMomentum,
            event: newAction 
          }].slice(-60)
        };
      });
    }, matchData.isReplaying ? 200 : 1500);

    return () => clearInterval(interval);
  }, [currentMatchId, config.sport, matchData.isReplaying]);

  // Use Gemini for Commentary when an action happens
  useEffect(() => {
    if (matchData.lastAction) {
      const getAICommentary = async () => {
        const aiText = await fetchAICommentary(matchData.lastAction, matchData.commentaryStyle, config.sport);
        if (aiText) {
          setMatchData(prev => ({
            ...prev,
            commentary: [{
              id: `ai-${Date.now()}`,
              text: aiText,
              persona: prev.commentaryStyle === 'tactical' ? 'Analyst AI' : prev.commentaryStyle === 'hype' ? 'HyperFan AI' : 'DataBot 9000'
            }, ...prev.commentary].slice(0, 5)
          }));
        }
      };
      getAICommentary();
    }
  }, [matchData.lastAction, matchData.commentaryStyle, config.sport]);

  useEffect(() => {
    if (matchData.lastAction && matchData.accessibility.speech) {
      const utterance = new SpeechSynthesisUtterance(matchData.lastAction);
      window.speechSynthesis.speak(utterance);
    }
  }, [matchData.lastAction, matchData.accessibility.speech]);

  const switchMatch = useCallback((id) => setCurrentMatchId(id), []);
  const toggleReplay = useCallback(() => setMatchData(prev => ({ ...prev, isReplaying: !prev.isReplaying })), []);
  const toggleSpeech = useCallback(() => setMatchData(prev => ({ 
    ...prev, 
    accessibility: { ...prev.accessibility, speech: !prev.accessibility.speech } 
  })), []);
  const toggleHighContrast = useCallback(() => setMatchData(prev => ({ 
    ...prev, 
    accessibility: { ...prev.accessibility, highContrast: !prev.accessibility.highContrast } 
  })), []);
  const setCommentaryStyle = useCallback((style) => setMatchData(prev => ({ ...prev, commentaryStyle: style })), []);
  
  const addHeatmapPoint = useCallback((x, y) => {
    const point = { id: Date.now(), x, y, intensity: 1 };
    syncHeatmap(currentMatchId, point);
    setMatchData(prev => ({
      ...prev,
      heatmap: [...prev.heatmap, point].slice(-50)
    }));
  }, [currentMatchId]);

  const joinRoom = useCallback((code) => setMatchData(prev => ({ ...prev, roomCode: code })), []);
  const switchFaction = useCallback((faction) => setMatchData(prev => ({ ...prev, faction })), []);
  
  const addCheer = useCallback(() => {
    if ("vibrate" in navigator) navigator.vibrate([30, 20, 30]);
    syncCheer(currentMatchId, matchData.faction);
    setMatchData(prev => {
      const faction = prev.faction;
      return {
        ...prev,
        factionBattle: {
          ...prev.factionBattle,
          [faction]: Math.min(100, prev.factionBattle[faction] + 1),
          [faction === 'home' ? 'away' : 'home']: Math.max(0, prev.factionBattle[faction === 'home' ? 'away' : 'home'] - 0.5)
        }
      };
    });
  }, [currentMatchId, matchData.faction]);

  const endMatch = useCallback(() => setMatchData(prev => ({ ...prev, matchEnded: true })), []);

  const recordPrediction = useCallback((isCorrect) => {
    if ("vibrate" in navigator) navigator.vibrate(20);
    setMatchData(prev => {
      const newCorrect = isCorrect ? prev.userStats.correct + 1 : prev.userStats.correct;
      const newTotal = prev.userStats.total + 1;
      return {
        ...prev,
        userStats: {
          streak: isCorrect ? prev.userStats.streak + 1 : 0,
          correct: newCorrect,
          total: newTotal,
          accuracy: Math.round((newCorrect / newTotal) * 100)
        }
      };
    });
  }, []);

  useEffect(() => {
    if (matchData.lastAction && "vibrate" in navigator) {
      const patterns = {
        'SIX!': [100, 50, 100, 50, 200],
        'GOAL!': [200, 100, 200, 100, 500],
        'WICKET!': [300, 100, 300]
      };
      navigator.vibrate(patterns[matchData.lastAction] || 100);
    }
  }, [matchData.lastAction]);

  const value = useMemo(() => ({ 
    matchData, 
    config, 
    switchMatch, 
    setCommentaryStyle,
    addHeatmapPoint,
    recordPrediction,
    joinRoom,
    switchFaction,
    addCheer,
    endMatch,
    toggleReplay,
    toggleSpeech,
    toggleHighContrast,
    availableMatches: MATCHES 
  }), [matchData, config, switchMatch, setCommentaryStyle, addHeatmapPoint, recordPrediction, joinRoom, switchFaction, addCheer, endMatch, toggleReplay, toggleSpeech, toggleHighContrast]);

  return (
    <MatchContext.Provider value={value}>
      {children}
    </MatchContext.Provider>
  );
};

