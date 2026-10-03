import { useEffect, useRef, useState } from 'react';

const VIDEO_SRC = '/assets/portfolio-video.mp4';
const MOBILE_QUERY = '(max-width: 1023px)';

export default function BackgroundVideo({ enabled = true, onReady, onError }: {
  enabled?: boolean;
  onReady?: () => void;
  onError?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const targetTime = useRef(0);
  const [mobile, setMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [playing, setPlaying] = useState(false);
  const [manualPlayback, setManualPlayback] = useState<boolean | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const size = window.matchMedia(MOBILE_QUERY);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { setMobile(size.matches); setReducedMotion(motion.matches); };
    size.addEventListener('change', update);
    motion.addEventListener('change', update);
    return () => { size.removeEventListener('change', update); motion.removeEventListener('change', update); };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const syncPlayback = () => {
      if (enabled && mobile && !document.hidden && (manualPlayback ?? !reducedMotion)) {
        // Keep a manual control when battery/data policies block autoplay.
        void video.play().catch(() => setPlaying(false));
      } else if (!video.paused) video.pause();
    };
    syncPlayback();
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      document.removeEventListener('visibilitychange', syncPlayback);
      if (!video.paused) video.pause();
    };
  }, [enabled, mobile, manualPlayback, reducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!enabled || mobile || reducedMotion || !video) return;
    let previousX: number | null = null;
    targetTime.current = video.currentTime;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || !Number.isFinite(video.duration)) return;
      if (previousX !== null) {
        targetTime.current = Math.max(0, Math.min(video.duration,
          targetTime.current + ((event.clientX - previousX) / window.innerWidth) * 0.8 * video.duration));
        if (!video.seeking) video.currentTime = targetTime.current;
      }
      previousX = event.clientX;
    };
    const reset = () => { previousX = null; };
    window.addEventListener('pointermove', move);
    document.addEventListener('pointerleave', reset);
    return () => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', reset); };
  }, [enabled, mobile, reducedMotion]);

  useEffect(() => {
    if (videoRef.current?.readyState >= 2) onReady?.();
  }, [onReady]);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    const play = video.paused;
    setManualPlayback(play);
    // Call within the gesture for browsers that require user activation.
    if (play) void video.play().catch(() => setPlaying(false));
    else video.pause();
  }

  return (
    <>
      <div className="portfolio-backdrop" aria-hidden="true" />
      <div className="background-scene" inert={!enabled} aria-hidden={!enabled}>
        <video
          ref={videoRef}
          id="hero-background-video"
          src={VIDEO_SRC}
          muted
          playsInline
          loop={mobile}
          preload="auto"
          onLoadedData={onReady}
          onCanPlay={onReady}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => { setFailed(true); onError?.(); }}
          onSeeked={() => {
            const video = videoRef.current;
            if (video && enabled && !mobile && !reducedMotion && Math.abs(video.currentTime - targetTime.current) > 0.02) {
              video.currentTime = targetTime.current;
            }
          }}
          aria-hidden="true"
        />
        {mobile && !failed && <button type="button" className="background-video-toggle" onClick={togglePlayback} disabled={!enabled}>
          <span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span> {playing ? 'Pause animation' : 'Play animation'}
        </button>}
      </div>
      <div className="background-shade" aria-hidden="true" />
    </>
  );
}
