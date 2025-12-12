import { useEffect, useRef, useState } from 'react';

export default function TiltCarousel({ items }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 4200);
    return () => clearInterval(t);
  }, [items.length, paused]);

  const go = (i) => setIndex((i + items.length) % items.length);

  return (
    <div className="tilt-carousel" aria-label="Galeria do projeto" aria-roledescription="carousel">
      <div className="tilt-stage">
        {items.map((item, i) => {
          const pos = getPos(i, index, items.length);
          const isVideo = item.type === 'video' || (item.src && item.src.toLowerCase().endsWith('.mp4'));
          return (
            <figure key={item.src} className={`tilt-card ${pos}`}>
              {isVideo ? (
                <VideoSlide item={item} isActive={pos === 'is-active'} />
              ) : (
                <img src={item.src} alt={item.alt} loading="lazy" />
              )}
              <figcaption>
                <strong>{item.title}</strong>
                <span>{item.caption}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <div className="tilt-controls">
        <button type="button" onClick={() => go(index - 1)} aria-label="Slide anterior">
          ‹
        </button>
        <button type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Retomar' : 'Pausar'}>
          {paused ? '▶' : '❚❚'}
        </button>
        <button type="button" onClick={() => go(index + 1)} aria-label="Próximo slide">
          ›
        </button>
      </div>

      <div className="tilt-dots" role="tablist">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir para slide ${i + 1}`}
            aria-selected={i === index}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </div>
  );
}

function getPos(i, current, total) {
  if (i === current) return 'is-active';
  if (i === (current + 1) % total) return 'is-next';
  if (i === (current - 1 + total) % total) return 'is-prev';
  return 'is-hidden';
}

function VideoSlide({ item, isActive }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
  }, [muted]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) {
      v.play().catch(() => {});
      setPlaying(!v.paused);
    } else {
      v.pause();
      v.currentTime = 0;
      setPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => setMuted((m) => !m);

  return (
    <div className="tilt-video-wrap">
      <video
        ref={videoRef}
        src={item.src}
        aria-label={item.alt || item.title || 'Vídeo'}
        playsInline
        loop
        muted={muted}
      />
      <div className="tilt-video-controls">
        <button type="button" onClick={togglePlay} aria-label={playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}>
          {playing ? '❚❚' : '▶'}
        </button>
        <button type="button" onClick={toggleMute} aria-label={muted ? 'Ativar som' : 'Desativar som'}>
          {muted ? '🔇' : '🔊'}
        </button>
      </div>
    </div>
  );
}
