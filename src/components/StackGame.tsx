import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Gamepad2, Pause, Play, RotateCcw, Trophy } from 'lucide-react';

type Block = { x: number; width: number };
type Phase = 'ready' | 'playing' | 'paused' | 'over' | 'won';
const BASE: Block = { x: 0, width: 130 };
const BEST_KEY = 'kumar-stack-best';

function readBest() {
  try {
    const value = Number(localStorage.getItem(BEST_KEY));
    return Number.isInteger(value) && value >= 0 && value <= 15 ? value : 0;
  } catch { return 0; }
}

function Slab({ block, level, camera, active = false }: { block: Block; level: number; camera: number; active?: boolean }) {
  const point = (x: number, y: number, z: number) => `${300 + x - y},${285 + (x + y - 130) * 0.35 - z + camera}`;
  const { x, width } = block;
  const z = level * 22;
  const a = point(x, 0, z), b = point(x + width, 0, z);
  const c = point(x + width, 130, z), d = point(x, 130, z);
  const hue = 12 + level * 7;
  return <g stroke="rgba(255,255,255,.16)" strokeWidth="1" strokeLinejoin="round">
    <polygon points={`${d} ${c} ${point(x + width, 130, z - 20)} ${point(x, 130, z - 20)}`} fill={`hsl(${hue} 70% 43%)`} />
    <polygon points={`${b} ${c} ${point(x + width, 130, z - 20)} ${point(x + width, 0, z - 20)}`} fill={`hsl(${hue} 65% 31%)`} />
    <polygon points={`${a} ${b} ${c} ${d}`} fill={active ? '#f7edcc' : `hsl(${hue} 85% 65%)`} />
  </g>;
}

export default function StackGame() {
  const [phase, setPhase] = useState<Phase>('ready');
  const [blocks, setBlocks] = useState<Block[]>([BASE]);
  const [position, setPosition] = useState(-160);
  const [best, setBest] = useState(readBest);
  const [message, setMessage] = useState('A little play between projects.');
  const motion = useRef({ x: -160, direction: 1 });
  const phaseRef = useRef<Phase>('ready');
  const sectionRef = useRef<HTMLElement>(null);
  const score = blocks.length - 1;
  const top = blocks[blocks.length - 1];
  const camera = Math.max(0, (blocks.length - 5) * 22);

  function changePhase(next: Phase) {
    phaseRef.current = next;
    setPhase(next);
  }

  useEffect(() => {
    if (phase !== 'playing') return;
    let frame: number;
    let previous = 0;
    const animate = (now: number) => {
      if (previous) {
        const delta = Math.min((now - previous) / 1000, 0.05);
        const mover = motion.current;
        mover.x += mover.direction * (110 + score * 13) * delta;
        if (mover.x >= 160 || mover.x <= -160) {
          mover.x = Math.max(-160, Math.min(160, mover.x));
          mover.direction *= -1;
        }
        setPosition(mover.x);
      }
      previous = now;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [phase, score]);

  useEffect(() => {
    const pause = () => {
      if (phaseRef.current === 'playing') {
        phaseRef.current = 'paused';
        setPhase('paused');
        setMessage('Take your time. Your tower is waiting.');
      }
    };
    const onVisibility = () => { if (document.hidden) pause(); };
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) pause(); });
    if (sectionRef.current) observer.observe(sectionRef.current);
    document.addEventListener('visibilitychange', onVisibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility); };
  }, []);

  function start() {
    setBlocks([BASE]);
    motion.current = { x: -160, direction: 1 };
    setPosition(-160);
    setMessage('Line up the edges. Make your first drop.');
    changePhase('playing');
  }

  function drop() {
    if (phaseRef.current !== 'playing') return;
    const x = top.x + motion.current.x;
    const perfect = Math.abs(x - top.x) <= 8;
    const left = Math.max(x, top.x);
    const width = Math.min(x + top.width, top.x + top.width) - left;
    if (width <= 3) {
      changePhase('over');
      setMessage(score === 0 ? 'Just missed! Wait until the edges line up.' : 'One block too far. Fancy another round?');
      return;
    }
    const nextScore = score + 1;
    setBlocks([...blocks, perfect ? { ...top } : { x: left, width }]);
    if (nextScore > best) {
      setBest(nextScore);
      try { localStorage.setItem(BEST_KEY, String(nextScore)); } catch { /* Play still works without storage. */ }
    }
    motion.current = { x: nextScore % 2 ? 160 : -160, direction: nextScore % 2 ? -1 : 1 };
    setPosition(motion.current.x);
    setMessage(perfect ? 'Perfect alignment! Full width kept.' : 'Nice catch. The overhang is trimmed!');
    if (nextScore === 15) {
      changePhase('won');
      setMessage('15 floors. A little architectural masterpiece.');
    }
  }

  const active = phase === 'playing' || phase === 'paused';
  return (
    <section ref={sectionRef} id="play" aria-labelledby="stack-title" className="relative z-10 mx-auto max-w-6xl scroll-mt-28 px-6 pb-20 sm:px-8 md:px-12">
      <div className="stack-shell">
        <div className="stack-intro">
          <span className="stack-eyebrow"><span /> THE PLAYGROUND / 01</span>
          <h2 id="stack-title">Less scrolling.<br /><span>More stacking.</span></h2>
          <p>A tiny challenge for your inner builder. Drop the moving blocks, line up the edges, and see how high you can go.</p>
          <div className="stack-rules"><Gamepad2 size={19} /><span>One button. Fifteen floors.<br />Just one more try.</span></div>
          <a href="#work" className="stack-work-link">Back to the real builds <ArrowUpRight size={16} /></a>
        </div>
        <div className="stack-console">
          <div className="stack-toolbar">
            <span className="stack-game-name">STACK BREAK <span>MINI GAME</span></span>
            <span className="stack-best"><Trophy size={14} /> BEST {String(best).padStart(2, '0')}</span>
          </div>
          <div className="stack-arena">
            <div className="stack-score"><strong>{String(score).padStart(2, '0')}</strong><span>/ 15 FLOORS</span></div>
            <button type="button" className="stack-board" onClick={drop} disabled={phase !== 'playing'} aria-label="Drop the moving block" aria-describedby="stack-controls">
              <svg viewBox="0 0 600 400" aria-hidden="true">
                <defs><radialGradient id="stack-glow"><stop stopColor="#ff7447" stopOpacity=".2" /><stop offset="1" stopColor="#ff7447" stopOpacity="0" /></radialGradient></defs>
                <ellipse cx="300" cy="295" rx="240" ry="100" fill="url(#stack-glow)" />
                <path d="M60 270L300 354L540 270 M60 300L300 384L540 300 M160 225L400 309 M200 211L440 295 M200 309L440 225 M160 295L400 211" fill="none" stroke="#ffffff" strokeOpacity=".06" />
                {blocks.map((block, index) => <g key={index}><Slab block={block} level={index} camera={camera} /></g>)}
                {(active || phase === 'over') && <Slab block={{ x: top.x + position, width: top.width }} level={blocks.length} camera={camera} active />}
                {phase === 'ready' && [1, 2, 3, 4].map(level => <g key={level}><Slab block={{ x: level * 6, width: 130 - level * 12 }} level={level} camera={0} active={level === 4} /></g>)}
              </svg>
            </button>
            {(phase === 'over' || phase === 'won' || phase === 'paused') && <div className="stack-overlay"><span>{phase === 'won' ? 'Tower complete.' : phase === 'paused' ? 'On a little break.' : 'Good things take practice.'}</span></div>}
          </div>
          <div className="stack-bottom">
            <p role="status" aria-live="polite">{message}</p>
            <div className="stack-actions">
              <button type="button" className="stack-primary" onClick={() => {
                if (phase === 'playing') drop();
                else if (phase === 'paused') { changePhase('playing'); setMessage('You’re back. Make it count.'); }
                else start();
              }}>
                {phase === 'over' || phase === 'won' ? <RotateCcw size={16} /> : <Play size={16} />}
                {phase === 'playing' ? 'Drop block' : phase === 'paused' ? 'Resume game' : phase === 'ready' ? 'Let’s play' : 'Play again'}
              </button>
              {active && <button type="button" className="stack-pause" onClick={() => { changePhase(phase === 'paused' ? 'playing' : 'paused'); }} aria-label={phase === 'paused' ? 'Resume game' : 'Pause game'}>{phase === 'paused' ? <Play size={18} /> : <Pause size={18} />}</button>}
            </div>
            <span id="stack-controls" className="stack-controls">Tap the board or focus a button + press Space / Enter</span>
          </div>
        </div>
      </div>
    </section>
  );
}
