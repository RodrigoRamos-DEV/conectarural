import { useEffect, useRef, useState } from 'react';

export default function Carousel({ items }) {
  const [index, setIndex] = useState(0);
  const [allowAuto, setAllowAuto] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const timer = useRef(null);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setAllowAuto(!e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    start();
    return stop;
  }, [index, allowAuto]);

  function start() {
    if (!allowAuto) return;
    stop();
    timer.current = setInterval(() => setIndex((prev) => (prev + 1) % items.length), 4000);
  }

  function stop() {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }

  const goTo = (i) => setIndex((i + items.length) % items.length);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  return (
    <div
      className="carousel"
      aria-roledescription="carousel"
      aria-label="App screenshots"
      onMouseEnter={stop}
      onMouseLeave={start}
    >
      <button className="car-btn prev" aria-label="Anterior" onClick={prev}>
        &lsaquo;
      </button>
      <ul className="slides">
        {items.map((item, i) => (
          <li key={item.src} className={`slide ${i === index ? 'is-active' : ''}`}>
            <img src={item.src} alt={item.alt} />
            {item.caption ? <span className="slide-caption">{item.caption}</span> : null}
          </li>
        ))}
      </ul>
      <button className="car-btn next" aria-label="Próximo" onClick={next}>
        &rsaquo;
      </button>
      <div className="dots" role="tablist" aria-label="Seleção de telas">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Ir para slide ${i + 1}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
