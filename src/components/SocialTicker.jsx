const SocialTicker = () => {
  const messages = [
    "DHONI FINISHING IN STYLE! 🏏",
    "VAR checking for potential offside...",
    "CSK yellow army everywhere in the stands!",
    "LIVERPOOL NEEEEDS A GOAL NOW",
    "IPL vibes are just different man #IPL2026",
  ];

  return (
    <div className="social-ticker glass-panel">
      <div className="ticker-content">
        {[...messages, ...messages].map((m, i) => (
          <span key={i} className="ticker-item">FAN: {m}</span>
        ))}
      </div>
    </div>
  );
};

export default SocialTicker;
