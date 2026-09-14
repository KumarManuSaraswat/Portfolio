import { useEffect, useRef } from 'react';

const VIDEO_SRC = '/assets/portfolio-video.mp4';

export default function BackgroundVideo({ enabled = true, onReady, onError }: {
  enabled?: boolean;
  onReady?: () => void;
  onError?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const previousXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  useEffect(() => {
    if (!enabled) return;
    const scrubVideo = (currentX: number) => {
      const video = videoRef.current;

      if (!video || !video.duration || Number.isNaN(video.duration)) {
        previousXRef.current = currentX;
        return;
      }

      if (previousXRef.current !== null) {
        const delta = currentX - previousXRef.current;
        const sensitivity = 0.8;

        const timeOffset =
          (delta / window.innerWidth) * sensitivity * video.duration;

        const nextTime = targetTimeRef.current + timeOffset;

        targetTimeRef.current = Math.max(
          0,
          Math.min(video.duration, nextTime),
        );

        if (!isSeekingRef.current) {
          isSeekingRef.current = true;
          video.currentTime = targetTimeRef.current;
        }
      }

      previousXRef.current = currentX;
    };

    const handleMouseMove = (event: globalThis.MouseEvent) => {
      scrubVideo(event.clientX);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        scrubVideo(event.touches[0].clientX);
      }
    };

    const resetPointerPosition = () => {
      previousXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', resetPointerPosition);
    window.addEventListener('touchmove', handleTouchMove, {
      passive: true,
    });
    window.addEventListener('touchend', resetPointerPosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', resetPointerPosition);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', resetPointerPosition);
    };
  }, [enabled]);

  // Also handle a cached first frame that became available before effects ran.
  useEffect(() => {
    if (videoRef.current?.readyState >= 2) onReady?.();
  }, [onReady]);

  const handleSeeked = () => {
    const video = videoRef.current;

    if (!video) return;

    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.02) {
      video.currentTime = targetTimeRef.current;
    } else {
      isSeekingRef.current = false;
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;

    if (video) {
      targetTimeRef.current = video.currentTime || 0;
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        id="hero-background-video"
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        onSeeked={handleSeeked}
        onLoadedMetadata={handleLoadedMetadata}
        onLoadedData={onReady}
        onCanPlay={onReady}
        onError={onError}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,

          width: '100vw',
          height: '100vh',

          zIndex: 0,
          objectFit: 'cover',
          objectPosition: 'center center',

          backgroundColor: '#f10a0a',
          pointerEvents: 'none',
        }}
      />

      {/* Dark overlay for better text readability */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.48) 0%, rgba(0,0,0,0.24) 42%, rgba(0,0,0,0.04) 78%, rgba(0,0,0,0.12) 100%)',
        }}
      />
    </>
  );
}
