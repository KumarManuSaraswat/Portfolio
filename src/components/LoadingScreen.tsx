import { useEffect, useState } from 'react';

export default function LoadingScreen({ revealed }: { revealed: boolean }) {
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (!revealed) return;
    const timer = window.setTimeout(() => setRemoved(true), 500);
    return () => window.clearTimeout(timer);
  }, [revealed]);

  if (removed) return null;

  return (
    <div className={`world-loader${revealed ? ' world-loader--leaving' : ''}`} aria-hidden={revealed}>
      <span className="world-loader-brand">KUMAR <span aria-hidden="true"></span></span>
      <div className="world-loader-center">
        <img className="world-loader-character" src="/assets/loading-run.webp" alt="" fetchPriority="high" />
        <p className="world-loader-label">A LITTLE ADVENTURE AWAITS</p>
        <h1 className="world-loader-title">Loading world<span aria-hidden="true">…</span></h1>
        <div className="world-loader-track" aria-hidden="true"><span /></div>
        <p className="world-loader-caption" role="status">Getting everything ready for you.</p>
      </div>
      <span className="world-loader-footer">CODE. CREATE. EXPLORE.</span>
    </div>
  );
}
