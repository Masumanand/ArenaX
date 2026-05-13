export function generatePlayers(sport) {
  const count = sport === 'cricket' ? 13 : 8; 
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    team: i < count/2 ? 'home' : 'away',
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10,
  }));
}

export function generatePrediction(sport) {
  if (sport === 'cricket') {
    return {
      id: Date.now(),
      question: "Next ball outcome?",
      options: ["Dot", "1-3 Runs", "Boundary", "Wicket"],
    };
  }
  return {
    id: Date.now(),
    question: "Next event in 5m?",
    options: ["Goal", "Corner", "Yellow Card", "None"],
  };
}

export function generateCommentary(action, style, sport) {
  const templates = {
    tactical: {
      'SIX!': "Exceptional bat swing. The fielder at deep mid-wicket had no chance given the power-to-weight ratio of that stroke.",
      'FOUR!': "Found the gap perfectly. Analyzing the bowling length, that was a clear error in execution by the bowler.",
      'GOAL!': "Tactical breakdown in the defensive line allowed for a clinical finish. High-press efficiency at its finest.",
      'AMBIENT': sport === 'cricket' ? "Analyzing the field placements. The bowling side is tightening the off-side ring." : "Possession recycling in progress. The defensive block remains compact."
    },
    hype: {
      'SIX!': "OH MY GOODNESS! That's out of the stadium! Absolute carnage at the crease! 🔥",
      'FOUR!': "CRACKING SHOT! The ball screams to the boundary! The crowd is going wild!",
      'GOAL!': "GOOOOOOOOAL! Absolute magic! He’s silenced the stadium with that stunner! ⚽",
      'AMBIENT': "The atmosphere is electric! Fans are on the edge of their seats waiting for a spark!"
    },
    nerd: {
      'SIX!': "That traveled 98 meters with an exit velocity of 115mph. Statistically, that's his 4th maximum in the death overs.",
      'FOUR!': "Precision placement. That increases the run rate to 9.5 per over, shifting the win probability by 12%.",
      'GOAL!': "xG (Expected Goals) on that shot was only 0.12. An incredible outlier that defies the season average.",
      'AMBIENT': sport === 'cricket' ? "Projected score is trending towards 185. Humidity is increasing ball movement by 4%." : "Average pass completion is currently 88.4%. The game flow is highly predictable."
    }
  };

  return {
    id: `${Date.now()}-${Math.random()}`,
    text: templates[style][action] || "The match intensity continues to build.",
    persona: style === 'tactical' ? 'Analyst AI' : style === 'hype' ? 'HyperFan AI' : 'DataBot 9000'
  };
}
