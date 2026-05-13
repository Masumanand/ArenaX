import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ArenaX Crash:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback glass-panel">
          <h2 className="text-gradient">SYSTEM REBOOTING...</h2>
          <p>The intensity was too high. Please refresh the stadium.</p>
          <button className="btn-primary" onClick={() => window.location.reload()}>RE-ENTER ARENA</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
