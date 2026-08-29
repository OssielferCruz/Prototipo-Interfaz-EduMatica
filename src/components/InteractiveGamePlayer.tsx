import { useState, useRef, useCallback } from 'react';
import { X, Check, RotateCcw, ChevronRight } from 'lucide-react';
import type {
  InteractiveGame, FractionPizzaRound, NumberMatchPair,
  NumberLineRound, WordScrambleRound, ClassifyItem,
} from '../types';

interface GameComponentProps {
  game: InteractiveGame;
  onComplete: (score: number, total: number) => void;
  onClose: () => void;
}

const PAIR_COLORS = ['#FE6D73','#2584A7','#24E5D2','#d4960a','#6ECB7A'];

/* ── Shared header ── */
function GameHeader({
  game, onClose, roundIdx, totalRounds, score,
}: {
  game: InteractiveGame; onClose: () => void;
  roundIdx: number; totalRounds: number; score: number;
}) {
  const pct = totalRounds > 0 ? Math.round((roundIdx / totalRounds) * 100) : 0;
  return (
    <div style={{ background: `linear-gradient(135deg, ${game.color}ee, ${game.color}99)`, padding: '14px 18px', flexShrink: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontFamily: '"Fredoka One",cursive', fontSize: 16, color: '#fff' }}>
          {game.emoji} {game.title}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ background: 'rgba(255,255,255,0.25)', color: '#fff', fontWeight: 800, fontSize: 12, borderRadius: 100, padding: '3px 10px' }}>
            ⭐ {score} pts
          </span>
          <button onClick={onClose} style={{ color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.18)', border: 'none', borderRadius: 8, padding: 6, cursor: 'pointer', display: 'flex' }}>
            <X size={15} />
          </button>
        </div>
      </div>
      {totalRounds > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Ronda {roundIdx + 1} de {totalRounds}</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', fontWeight: 700 }}>{pct}%</span>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.25)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ width: `${pct}%`, height: '100%', background: 'rgba(255,255,255,0.85)', borderRadius: 10, transition: 'width 0.4s ease' }} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Results screen ── */
function GameResults({
  game, score, total, onRetry, onClose,
}: { game: InteractiveGame; score: number; total: number; onRetry: () => void; onClose: () => void }) {
  const pct   = total > 0 ? Math.round((score / total) * 100) : 0;
  const stars = pct >= 80 ? 3 : pct >= 50 ? 2 : 1;
  const xpEarned = Math.round((score / total) * game.xpReward);
  return (
    <div style={{ padding: '28px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 10 }}>{pct >= 80 ? '🏆' : pct >= 50 ? '🎉' : '💪'}</div>
      <h2 style={{ fontFamily: '"Fredoka One",cursive', fontSize: 26, color: 'var(--text)', marginBottom: 4 }}>
        {pct >= 80 ? '¡Excelente!' : pct >= 50 ? '¡Muy bien!' : '¡Sigue practicando!'}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 16 }}>{game.title}</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
        {[1,2,3].map((s) => <span key={s} style={{ fontSize: 32, opacity: s <= stars ? 1 : 0.2 }}>⭐</span>)}
      </div>
      <div style={{ borderRadius: 16, overflow: 'hidden', border: '1.5px solid var(--border)', marginBottom: 20 }}>
        {[
          { l: 'Correctas', v: `${score}/${total}`, c: 'var(--progress)' },
          { l: 'Porcentaje', v: `${pct}%`, c: 'var(--action)' },
          { l: 'XP ganados', v: `+${xpEarned}`, c: 'var(--award)' },
        ].map((s, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', fontSize: 13, borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
            <span style={{ color: 'var(--text-2)' }}>{s.l}</span>
            <span style={{ fontWeight: 800, color: s.c }}>{s.v}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={onRetry} className="press" style={{ flex: 1, padding: '12px', borderRadius: 14, fontFamily: '"Fredoka One",cursive', fontSize: 14, color: '#fff', background: game.color, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <RotateCcw size={14} /> Reintentar
        </button>
        <button onClick={onClose} className="press" style={{ flex: 1, padding: '12px', borderRadius: 14, fontSize: 14, fontWeight: 700, color: 'var(--text-2)', background: 'var(--bg)', border: '1.5px solid var(--border)', cursor: 'pointer' }}>
          Otros juegos
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   1. FRACTION PIZZA GAME
═══════════════════════════════════════════ */
const N_SLICES = 8;
const CX = 110, CY = 110, R = 90;

function pizzaPath(i: number): string {
  const start = (i / N_SLICES) * 2 * Math.PI - Math.PI / 2;
  const end   = ((i + 1) / N_SLICES) * 2 * Math.PI - Math.PI / 2;
  const x1 = CX + R * Math.cos(start), y1 = CY + R * Math.sin(start);
  const x2 = CX + R * Math.cos(end),   y2 = CY + R * Math.sin(end);
  return `M ${CX} ${CY} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${R} ${R} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`;
}

function FractionPizzaGame({ game, onComplete, onClose }: GameComponentProps) {
  const data   = game.data as { type: 'fraction-pizza'; rounds: FractionPizzaRound[] };
  const rounds = data.rounds;
  const [roundIdx, setRoundIdx] = useState(0);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [score, setScore] = useState(0);

  const round  = rounds[roundIdx];
  const target = Math.round((round.numerator / round.denominator) * N_SLICES);

  function toggleSlice(i: number) {
    if (feedback !== 'idle') return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  function submit() {
    if (feedback !== 'idle') return;
    const correct = selected.size === target;
    const newScore = score + (correct ? 1 : 0);
    setFeedback(correct ? 'correct' : 'wrong');
    setTimeout(() => {
      if (roundIdx >= rounds.length - 1) {
        onComplete(newScore, rounds.length);
      } else {
        setRoundIdx((r) => r + 1);
        setSelected(new Set());
        setFeedback('idle');
        if (correct) setScore(newScore);
      }
    }, 1100);
    if (correct) setScore(newScore);
  }

  const bgSlice  = feedback === 'idle' ? '#fdf0d0' : '#fdf0d0';
  const selColor = feedback === 'correct' ? '#22c55e' : feedback === 'wrong' ? '#ef4444' : game.color;

  return (
    <>
      <GameHeader game={game} onClose={onClose} roundIdx={roundIdx} totalRounds={rounds.length} score={score} />
      <div style={{ padding: '20px 20px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <p style={{ fontFamily: '"Fredoka One",cursive', fontSize: 20, color: 'var(--text)', textAlign: 'center' }}>
          {round.question}
        </p>
        <p style={{ fontSize: 13, color: 'var(--text-2)' }}>
          Partes coloreadas: <strong style={{ color: selected.size === target ? '#22c55e' : 'var(--text)' }}>{selected.size}</strong> de {target}
        </p>

        {/* Pizza */}
        <svg viewBox="0 0 220 220" width={220} height={220} style={{ filter: feedback === 'correct' ? 'drop-shadow(0 0 12px #22c55e88)' : feedback === 'wrong' ? 'drop-shadow(0 0 12px #ef444488)' : 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }}>
          {/* Outer crust */}
          <circle cx={CX} cy={CY} r={R + 6} fill="#c9873e" />
          {/* Slices */}
          {Array.from({ length: N_SLICES }).map((_, i) => (
            <path
              key={i}
              d={pizzaPath(i)}
              fill={selected.has(i) ? selColor : bgSlice}
              stroke="#c9873e"
              strokeWidth={1.5}
              onClick={() => toggleSlice(i)}
              style={{ cursor: feedback === 'idle' ? 'pointer' : 'default', transition: 'fill 0.15s' }}
            />
          ))}
          {/* Dividing lines */}
          {Array.from({ length: N_SLICES }).map((_, i) => {
            const angle = (i / N_SLICES) * 2 * Math.PI - Math.PI / 2;
            return <line key={i} x1={CX} y1={CY} x2={CX + R * Math.cos(angle)} y2={CY + R * Math.sin(angle)} stroke="#c9873e" strokeWidth={1.5} />;
          })}
          {/* Center dot */}
          <circle cx={CX} cy={CY} r={8} fill="#c9873e" />
          {/* Feedback overlay */}
          {feedback !== 'idle' && (
            <text x={CX} y={CY - R - 16} textAnchor="middle" fontSize={32}>{feedback === 'correct' ? '✅' : '❌'}</text>
          )}
        </svg>

        {/* Fraction display */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--bg)', borderRadius: 16, padding: '10px 20px', border: '2px solid var(--border)' }}>
          <span style={{ fontFamily: '"Fredoka One",cursive', fontSize: 18, color: 'var(--text)' }}>Fracción:</span>
          <div style={{ textAlign: 'center', lineHeight: 1.1 }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: game.color }}>{round.numerator}</div>
            <div style={{ height: 2, background: game.color, margin: '2px 0' }} />
            <div style={{ fontSize: 22, fontWeight: 900, color: game.color }}>{round.denominator}</div>
          </div>
        </div>

        <button
          onClick={submit}
          disabled={feedback !== 'idle'}
          className="press"
          style={{
            padding: '14px 40px', borderRadius: 100, border: 'none', cursor: 'pointer',
            fontFamily: '"Fredoka One",cursive', fontSize: 16, color: '#fff',
            background: feedback === 'correct' ? '#22c55e' : feedback === 'wrong' ? '#ef4444' : game.color,
            boxShadow: `0 6px 18px ${game.color}55`,
            opacity: feedback !== 'idle' ? 0.8 : 1,
          }}
        >
          {feedback === 'correct' ? '¡Correcto! 🎉' : feedback === 'wrong' ? 'Inténtalo de nuevo ❌' : '¡Verificar! ✓'}
        </button>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   2. NUMBER MATCH GAME
═══════════════════════════════════════════ */
function NumberMatchGame({ game, onComplete, onClose }: GameComponentProps) {
  const data  = game.data as { type: 'number-match'; instruction: string; pairs: NumberMatchPair[] };
  const pairs = data.pairs;
  const n     = pairs.length;

  const [shuffledLeft]  = useState<number[]>(() => shuffle(Array.from({ length: n }, (_, i) => i)));
  const [shuffledRight] = useState<number[]>(() => shuffle(Array.from({ length: n }, (_, i) => i)));
  const [selectedLeft, setSelectedLeft]  = useState<number | null>(null);
  const [connections, setConnections]    = useState<Map<number, number>>(new Map()); // leftOrigIdx → rightOrigIdx
  const [correctness, setCorrectness]    = useState<Map<number, boolean>>(new Map()); // leftOrigIdx → correct
  const [submitted, setSubmitted]        = useState(false);

  const connectedLeftOrig  = new Set(connections.keys());
  const connectedRightOrig = new Set(connections.values());

  function getLeftColor(leftOrigIdx: number) {
    if (!connections.has(leftOrigIdx)) return undefined;
    const idx = Array.from(connections.keys()).indexOf(leftOrigIdx);
    return PAIR_COLORS[idx % PAIR_COLORS.length];
  }

  function handleLeftClick(leftPos: number) {
    const leftOrig = shuffledLeft[leftPos];
    if (connectedLeftOrig.has(leftOrig)) return;
    setSelectedLeft(leftOrig);
  }

  function handleRightClick(rightPos: number) {
    const rightOrig = shuffledRight[rightPos];
    if (selectedLeft === null) return;
    if (connectedRightOrig.has(rightOrig)) return;
    const newConns = new Map(connections);
    newConns.set(selectedLeft, rightOrig);
    setConnections(newConns);
    setSelectedLeft(null);
    if (newConns.size === n) {
      // Auto-submit
      const newCorr = new Map<number, boolean>();
      let score = 0;
      newConns.forEach((rightOrig2, leftOrig2) => {
        const correct = leftOrig2 === rightOrig2;
        newCorr.set(leftOrig2, correct);
        if (correct) score++;
      });
      setCorrectness(newCorr);
      setSubmitted(true);
      setTimeout(() => onComplete(score, n), 2000);
    }
  }

  return (
    <>
      <GameHeader game={game} onClose={onClose} roundIdx={connections.size} totalRounds={n} score={Array.from(correctness.values()).filter(Boolean).length} />
      <div style={{ padding: '16px 20px 24px' }}>
        <p style={{ fontFamily: '"Fredoka One",cursive', fontSize: 17, color: 'var(--text)', textAlign: 'center', marginBottom: 16 }}>
          {data.instruction}
        </p>
        <p style={{ fontSize: 12, color: 'var(--text-3)', textAlign: 'center', marginBottom: 14 }}>
          Toca un número y luego toca el grupo que corresponde
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {/* Left column: numbers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {shuffledLeft.map((origIdx, pos) => {
              const pair = pairs[origIdx];
              const isSelected   = selectedLeft === origIdx;
              const isConnected  = connectedLeftOrig.has(origIdx);
              const color        = getLeftColor(origIdx) ?? game.color;
              const isCorrect    = correctness.get(origIdx);
              return (
                <button
                  key={origIdx}
                  onClick={() => !isConnected && !submitted && handleLeftClick(pos)}
                  style={{
                    padding: '12px 14px', borderRadius: 14, border: `2.5px solid ${isConnected ? color : isSelected ? game.color : 'var(--border)'}`,
                    background: isConnected
                      ? (submitted ? (isCorrect ? '#dcfce7' : '#fee2e2') : `${color}18`)
                      : isSelected ? `${game.color}15` : 'var(--surface)',
                    cursor: isConnected || submitted ? 'default' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
                    fontFamily: '"Fredoka One",cursive', fontSize: 22, color: 'var(--text)',
                    boxShadow: isSelected ? `0 0 0 3px ${game.color}44` : 'none',
                    transition: 'all 0.15s',
                  }}
                >
                  {pair.number}
                  {isConnected && (
                    <span style={{ fontSize: 13, fontWeight: 800, color: submitted ? (isCorrect ? '#16a34a' : '#dc2626') : color }}>
                      {submitted ? (isCorrect ? '✓' : '✗') : '●'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right column: emoji groups */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {shuffledRight.map((origIdx, pos) => {
              const pair = pairs[origIdx];
              const isConnected = connectedRightOrig.has(origIdx);
              const connectedLeftOrig2 = Array.from(connections.entries()).find(([, v]) => v === origIdx)?.[0];
              const color = connectedLeftOrig2 !== undefined ? getLeftColor(connectedLeftOrig2) ?? game.color : game.color;
              const isCorrect = connectedLeftOrig2 !== undefined ? correctness.get(connectedLeftOrig2) : undefined;
              return (
                <button
                  key={origIdx}
                  onClick={() => !isConnected && !submitted && handleRightClick(pos)}
                  style={{
                    padding: '10px 12px', borderRadius: 14, border: `2.5px solid ${isConnected ? color : selectedLeft !== null ? `${game.color}60` : 'var(--border)'}`,
                    background: isConnected
                      ? (submitted ? (isCorrect ? '#dcfce7' : '#fee2e2') : `${color}18`)
                      : selectedLeft !== null ? `${game.color}08` : 'var(--surface)',
                    cursor: isConnected || submitted ? 'default' : 'pointer',
                    fontSize: 18, lineHeight: 1.3, wordBreak: 'break-all',
                    transition: 'all 0.15s',
                  }}
                >
                  {pair.emojis}
                </button>
              );
            })}
          </div>
        </div>

        {submitted && (
          <p style={{ textAlign: 'center', marginTop: 14, fontFamily: '"Fredoka One",cursive', fontSize: 16, color: 'var(--text-2)' }}>
            ¡Revisando resultados...
          </p>
        )}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   3. NUMBER LINE GAME
═══════════════════════════════════════════ */
const LINE_W = 280, LINE_Y = 70, TICK_H = 10;

function NumberLineGame({ game, onComplete, onClose }: GameComponentProps) {
  const data   = game.data as { type: 'number-line'; rounds: NumberLineRound[] };
  const rounds = data.rounds;
  const lineRef = useRef<SVGSVGElement>(null);

  const [roundIdx, setRoundIdx]   = useState(0);
  const [placed, setPlaced]       = useState<number | null>(null);
  const [feedback, setFeedback]   = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [score, setScore]         = useState(0);

  const round = rounds[roundIdx];
  const { min, max } = round;
  const range = max - min;

  function toX(val: number): number { return ((val - min) / range) * LINE_W; }
  function toVal(x: number): number { return Math.round((x / LINE_W) * range + min); }

  function handleLineClick(e: React.MouseEvent<SVGSVGElement>) {
    if (feedback !== 'idle') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const rawX = e.clientX - rect.left - 20; // 20px padding
    const clampedX = Math.max(0, Math.min(LINE_W, rawX));
    const val = Math.max(min, Math.min(max, toVal(clampedX)));
    setPlaced(val);
  }

  function submit() {
    if (placed === null || feedback !== 'idle') return;
    const correct = Math.abs(placed - round.answer) <= 1;
    const newScore = score + (correct ? 1 : 0);
    setFeedback(correct ? 'correct' : 'wrong');
    setTimeout(() => {
      if (roundIdx >= rounds.length - 1) {
        onComplete(newScore, rounds.length);
      } else {
        setRoundIdx((r) => r + 1);
        setPlaced(null);
        setFeedback('idle');
        if (correct) setScore(newScore);
      }
    }, 1200);
    if (correct) setScore(newScore);
  }

  const labels = Array.from({ length: Math.floor(range / 5) + 1 }, (_, i) => min + i * 5);
  const ticks  = Array.from({ length: range + 1 }, (_, i) => min + i);

  return (
    <>
      <GameHeader game={game} onClose={onClose} roundIdx={roundIdx} totalRounds={rounds.length} score={score} />
      <div style={{ padding: '20px 20px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <p style={{ fontSize: 13, color: 'var(--text-2)', textAlign: 'center' }}>
          Toca en la recta para colocar el número
        </p>

        {/* Big number display */}
        <div style={{
          width: 100, height: 100, borderRadius: '50%',
          background: `linear-gradient(135deg, ${game.color}, ${game.color}cc)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 8px 24px ${game.color}55`,
        }}>
          <span style={{ fontFamily: '"Fredoka One",cursive', fontSize: 40, color: '#fff' }}>{round.answer}</span>
        </div>

        <p style={{ fontFamily: '"Fredoka One",cursive', fontSize: 18, color: 'var(--text)', textAlign: 'center' }}>
          {round.question}
        </p>

        {/* Number line SVG */}
        <svg
          ref={lineRef}
          width={LINE_W + 40} height={130}
          onClick={handleLineClick}
          style={{ cursor: feedback === 'idle' ? 'crosshair' : 'default', overflow: 'visible' }}
        >
          <g transform="translate(20,0)">
            {/* Main line */}
            <line x1={0} y1={LINE_Y} x2={LINE_W} y2={LINE_Y} stroke="var(--border)" strokeWidth={3} strokeLinecap="round" />
            {/* Colored progress up to placed */}
            {placed !== null && (
              <line x1={0} y1={LINE_Y} x2={toX(placed)} y2={LINE_Y} stroke={feedback === 'correct' ? '#22c55e' : feedback === 'wrong' ? '#ef4444' : game.color} strokeWidth={4} strokeLinecap="round" />
            )}
            {/* Ticks */}
            {ticks.map((v) => (
              <line key={v} x1={toX(v)} y1={LINE_Y - (v % 5 === 0 ? TICK_H : TICK_H * 0.5)} x2={toX(v)} y2={LINE_Y + (v % 5 === 0 ? TICK_H : TICK_H * 0.5)}
                stroke="var(--text-3)" strokeWidth={v % 5 === 0 ? 2 : 1} />
            ))}
            {/* Labels */}
            {labels.map((v) => (
              <text key={v} x={toX(v)} y={LINE_Y + TICK_H + 16} textAnchor="middle" fontSize={12} fill="var(--text-2)" fontFamily='"Fredoka One",cursive'>
                {v}
              </text>
            ))}
            {/* Placed marker */}
            {placed !== null && (
              <g>
                <circle cx={toX(placed)} cy={LINE_Y} r={10}
                  fill={feedback === 'correct' ? '#22c55e' : feedback === 'wrong' ? '#ef4444' : game.color}
                  stroke="#fff" strokeWidth={2.5}
                />
                <text x={toX(placed)} y={LINE_Y - 18} textAnchor="middle" fontSize={13} fontWeight="bold"
                  fill={feedback === 'correct' ? '#22c55e' : feedback === 'wrong' ? '#ef4444' : game.color}
                  fontFamily='"Fredoka One",cursive'>
                  {placed}
                </text>
              </g>
            )}
            {/* Correct position shown on wrong */}
            {feedback === 'wrong' && (
              <g>
                <circle cx={toX(round.answer)} cy={LINE_Y} r={8} fill="#22c55e" stroke="#fff" strokeWidth={2} opacity={0.85} />
                <text x={toX(round.answer)} y={LINE_Y + TICK_H + 32} textAnchor="middle" fontSize={11} fill="#22c55e" fontWeight="bold">
                  ✓{round.answer}
                </text>
              </g>
            )}
          </g>
        </svg>

        <button
          onClick={submit}
          disabled={placed === null || feedback !== 'idle'}
          className="press"
          style={{
            padding: '14px 40px', borderRadius: 100, border: 'none', cursor: placed === null ? 'not-allowed' : 'pointer',
            fontFamily: '"Fredoka One",cursive', fontSize: 16, color: '#fff',
            background: feedback === 'correct' ? '#22c55e' : feedback === 'wrong' ? '#ef4444' : game.color,
            opacity: placed === null ? 0.5 : 1,
            boxShadow: `0 6px 18px ${game.color}44`,
          }}
        >
          {feedback === 'idle' ? '¡Verificar!' : feedback === 'correct' ? '¡Correcto! 🎉' : '¡Sigue intentando!'}
        </button>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   4. LINE CONNECT GAME
═══════════════════════════════════════════ */
function LineConnectGame({ game, onComplete, onClose }: GameComponentProps) {
  const data = game.data as { type: 'line-connect'; instruction: string; left: string[]; right: string[]; correctPairs: number[] };
  const n    = data.left.length;

  const [shuffledRight] = useState<number[]>(() => shuffle(Array.from({ length: n }, (_, i) => i)));
  const [selectedLeft, setSelectedLeft]  = useState<number | null>(null);
  const [connections, setConnections]    = useState<Map<number, number>>(new Map()); // leftIdx → rightOrigIdx
  const [submitted, setSubmitted]        = useState(false);
  const [correctness, setCorrectness]    = useState<Map<number, boolean>>(new Map());

  const connectedLeft   = new Set(connections.keys());
  const connectedRight  = new Set(connections.values());

  function getConnColor(leftIdx: number) {
    return PAIR_COLORS[leftIdx % PAIR_COLORS.length];
  }

  function handleSubmit() {
    const corr = new Map<number, boolean>();
    let score = 0;
    connections.forEach((rightOrig, leftIdx) => {
      const correct = rightOrig === data.correctPairs[leftIdx];
      corr.set(leftIdx, correct);
      if (correct) score++;
    });
    setCorrectness(corr);
    setSubmitted(true);
    setTimeout(() => onComplete(score, n), 2000);
  }

  return (
    <>
      <GameHeader game={game} onClose={onClose} roundIdx={connections.size} totalRounds={n} score={Array.from(correctness.values()).filter(Boolean).length} />
      <div style={{ padding: '16px 20px 20px' }}>
        <p style={{ fontFamily: '"Fredoka One",cursive', fontSize: 16, color: 'var(--text)', textAlign: 'center', marginBottom: 6 }}>
          {data.instruction}
        </p>
        <p style={{ fontSize: 12, color: 'var(--text-3)', textAlign: 'center', marginBottom: 16 }}>
          Toca un nombre (izquierda) y luego su logro (derecha)
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-3)', textAlign: 'center', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Figura</p>
            {data.left.map((item, i) => {
              const isSelected  = selectedLeft === i;
              const isConnected = connectedLeft.has(i);
              const color       = getConnColor(i);
              const isCorrect   = correctness.get(i);
              return (
                <button key={i}
                  onClick={() => !isConnected && !submitted && setSelectedLeft(i)}
                  style={{
                    padding: '10px 12px', borderRadius: 12, fontSize: 13, fontWeight: 700,
                    textAlign: 'left', cursor: isConnected || submitted ? 'default' : 'pointer',
                    border: `2.5px solid ${isConnected ? color : isSelected ? game.color : 'var(--border)'}`,
                    background: isConnected
                      ? (submitted ? (isCorrect ? '#dcfce7' : '#fee2e2') : `${color}15`)
                      : isSelected ? `${game.color}12` : 'var(--surface)',
                    color: 'var(--text)', lineHeight: 1.3,
                    boxShadow: isSelected ? `0 0 0 3px ${game.color}33` : 'none',
                    transition: 'all 0.15s',
                  }}
                >
                  {isConnected && <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: submitted ? (isCorrect ? '#16a34a' : '#dc2626') : color, marginRight: 6 }} />}
                  {item}
                </button>
              );
            })}
          </div>

          {/* Right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-3)', textAlign: 'center', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Logro</p>
            {shuffledRight.map((origIdx, pos) => {
              const isConnected  = connectedRight.has(origIdx);
              const connLeftIdx  = Array.from(connections.entries()).find(([, v]) => v === origIdx)?.[0];
              const color        = connLeftIdx !== undefined ? getConnColor(connLeftIdx) : game.color;
              const isCorrect    = connLeftIdx !== undefined ? correctness.get(connLeftIdx) : undefined;
              return (
                <button key={origIdx}
                  onClick={() => {
                    if (isConnected || submitted || selectedLeft === null) return;
                    const newConns = new Map(connections);
                    newConns.set(selectedLeft, origIdx);
                    setConnections(newConns);
                    setSelectedLeft(null);
                  }}
                  style={{
                    padding: '10px 12px', borderRadius: 12, fontSize: 12, fontWeight: 600,
                    textAlign: 'left', cursor: isConnected || submitted ? 'default' : (selectedLeft !== null ? 'pointer' : 'default'),
                    border: `2.5px solid ${isConnected ? color : selectedLeft !== null ? `${game.color}60` : 'var(--border)'}`,
                    background: isConnected
                      ? (submitted ? (isCorrect ? '#dcfce7' : '#fee2e2') : `${color}15`)
                      : selectedLeft !== null ? `${game.color}06` : 'var(--surface)',
                    color: 'var(--text-2)', lineHeight: 1.3,
                    transition: 'all 0.15s',
                  }}
                >
                  {isConnected && <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: submitted ? (isCorrect ? '#16a34a' : '#dc2626') : color, marginRight: 6 }} />}
                  {data.right[origIdx]}
                </button>
              );
            })}
          </div>
        </div>

        {connections.size === n && !submitted && (
          <button onClick={handleSubmit} className="press" style={{ marginTop: 16, width: '100%', padding: '13px', borderRadius: 14, border: 'none', cursor: 'pointer', background: game.color, color: '#fff', fontFamily: '"Fredoka One",cursive', fontSize: 16 }}>
            ¡Verificar conexiones! ✓
          </button>
        )}
        {submitted && (
          <p style={{ textAlign: 'center', marginTop: 14, fontFamily: '"Fredoka One",cursive', fontSize: 15, color: 'var(--text-2)' }}>
            Revisando... {Array.from(correctness.values()).filter(Boolean).length} de {n} correctas
          </p>
        )}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   5. WORD SCRAMBLE GAME
═══════════════════════════════════════════ */
function WordScrambleGame({ game, onComplete, onClose }: GameComponentProps) {
  const data   = game.data as { type: 'word-scramble'; rounds: WordScrambleRound[] };
  const rounds = data.rounds;

  const [roundIdx, setRoundIdx]       = useState(0);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);
  const [feedback, setFeedback]       = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [score, setScore]             = useState(0);

  const round   = rounds[roundIdx];
  const letters = round.scrambled;
  const guess   = usedIndices.map((i) => letters[i]).join('');

  function pickLetter(i: number) {
    if (feedback !== 'idle' || usedIndices.includes(i)) return;
    const next = [...usedIndices, i];
    setUsedIndices(next);

    if (next.length === letters.length) {
      const formed = next.map((j) => letters[j]).join('');
      const correct = formed === round.word;
      const newScore = score + (correct ? 1 : 0);
      setFeedback(correct ? 'correct' : 'wrong');
      setTimeout(() => {
        if (roundIdx >= rounds.length - 1) {
          onComplete(newScore, rounds.length);
        } else {
          setRoundIdx((r) => r + 1);
          setUsedIndices([]);
          setFeedback('idle');
          if (correct) setScore(newScore);
        }
      }, 1400);
      if (correct) setScore(newScore);
    }
  }

  function eraseLast() {
    if (feedback !== 'idle') return;
    setUsedIndices((prev) => prev.slice(0, -1));
  }

  return (
    <>
      <GameHeader game={game} onClose={onClose} roundIdx={roundIdx} totalRounds={rounds.length} score={score} />
      <div style={{ padding: '20px 20px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        {/* Hint */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 6 }}>{round.emoji}</div>
          <p style={{ fontSize: 14, color: 'var(--text-2)', fontStyle: 'italic' }}>Pista: {round.hint}</p>
        </div>

        {/* Current guess display */}
        <div style={{
          display: 'flex', gap: 5, flexWrap: 'wrap', justifyContent: 'center',
          minHeight: 50, padding: '10px 14px',
          background: 'var(--bg)', borderRadius: 16,
          border: `2.5px solid ${feedback === 'correct' ? '#22c55e' : feedback === 'wrong' ? '#ef4444' : 'var(--border)'}`,
          width: '100%',
        }}>
          {guess.split('').map((l, i) => (
            <span key={i} style={{
              width: 36, height: 36, borderRadius: 8,
              background: feedback === 'correct' ? '#22c55e' : feedback === 'wrong' ? '#ef4444' : game.color,
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"Fredoka One",cursive', fontSize: 18, fontWeight: 700,
            }}>{l}</span>
          ))}
          {guess.length === 0 && (
            <span style={{ color: 'var(--text-3)', fontSize: 13, display: 'flex', alignItems: 'center' }}>
              Toca las letras para formar la palabra...
            </span>
          )}
        </div>

        {/* Letter tiles */}
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 320 }}>
          {letters.map((letter, i) => {
            const used = usedIndices.includes(i);
            return (
              <button
                key={i}
                onClick={() => pickLetter(i)}
                disabled={used || feedback !== 'idle'}
                style={{
                  width: 44, height: 44, borderRadius: 10, border: `2.5px solid ${used ? 'var(--border)' : game.color}`,
                  background: used ? 'var(--bg)' : `${game.color}12`,
                  color: used ? 'var(--text-3)' : game.color,
                  fontFamily: '"Fredoka One",cursive', fontSize: 20, fontWeight: 700,
                  cursor: used || feedback !== 'idle' ? 'not-allowed' : 'pointer',
                  opacity: used ? 0.35 : 1,
                  transition: 'all 0.12s',
                }}
              >
                {letter}
              </button>
            );
          })}
        </div>

        {/* Erase + feedback */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            onClick={eraseLast}
            disabled={usedIndices.length === 0 || feedback !== 'idle'}
            style={{
              padding: '8px 18px', borderRadius: 10, border: '1.5px solid var(--border)',
              background: 'var(--surface)', color: 'var(--text-2)', fontSize: 13, fontWeight: 700,
              cursor: usedIndices.length === 0 ? 'not-allowed' : 'pointer',
              opacity: usedIndices.length === 0 ? 0.5 : 1,
            }}
          >
            ← Borrar
          </button>
          {feedback !== 'idle' && (
            <span style={{ fontFamily: '"Fredoka One",cursive', fontSize: 16, color: feedback === 'correct' ? '#22c55e' : '#ef4444' }}>
              {feedback === 'correct' ? '¡Correcto! 🎉' : `Era: ${round.word}`}
            </span>
          )}
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   6. CLASSIFY GAME
═══════════════════════════════════════════ */
function ClassifyGame({ game, onComplete, onClose }: GameComponentProps) {
  const data  = game.data as { type: 'classify'; instruction: string; categories: [string, string]; items: ClassifyItem[] };
  const items = data.items;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [feedback, setFeedback]     = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [score, setScore]           = useState(0);

  const current = items[currentIdx];

  function pick(category: 0 | 1) {
    if (feedback !== 'idle') return;
    const correct = category === current.category;
    const newScore = score + (correct ? 1 : 0);
    setFeedback(correct ? 'correct' : 'wrong');
    setTimeout(() => {
      if (currentIdx >= items.length - 1) {
        onComplete(newScore, items.length);
      } else {
        setCurrentIdx((i) => i + 1);
        setFeedback('idle');
        if (correct) setScore(newScore);
      }
    }, 900);
    if (correct) setScore(newScore);
  }

  const catColors: [string, string] = ['#2584A7', '#6ECB7A'];

  return (
    <>
      <GameHeader game={game} onClose={onClose} roundIdx={currentIdx} totalRounds={items.length} score={score} />
      <div style={{ padding: '24px 20px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
        <p style={{ fontFamily: '"Fredoka One",cursive', fontSize: 18, color: 'var(--text)' }}>{data.instruction}</p>

        {/* Item card */}
        <div style={{
          width: 180, height: 180, borderRadius: 28,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
          background: feedback === 'correct' ? '#dcfce7' : feedback === 'wrong' ? '#fee2e2' : 'var(--bg)',
          border: `3px solid ${feedback === 'correct' ? '#22c55e' : feedback === 'wrong' ? '#ef4444' : 'var(--border)'}`,
          boxShadow: feedback === 'correct' ? '0 0 24px #22c55e44' : feedback === 'wrong' ? '0 0 24px #ef444444' : '0 4px 16px rgba(0,0,0,0.08)',
          transition: 'all 0.2s',
        }}>
          <span style={{ fontSize: 72 }}>{current.emoji}</span>
          <span style={{ fontFamily: '"Fredoka One",cursive', fontSize: 20, color: 'var(--text)' }}>{current.text}</span>
          {feedback !== 'idle' && (
            <span style={{ fontSize: 28 }}>{feedback === 'correct' ? '✅' : '❌'}</span>
          )}
        </div>

        {/* Category buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: '100%' }}>
          {data.categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => pick(i as 0 | 1)}
              disabled={feedback !== 'idle'}
              className="press"
              style={{
                padding: '18px 12px', borderRadius: 18, border: 'none', cursor: 'pointer',
                background: catColors[i],
                color: '#fff', fontFamily: '"Fredoka One",cursive', fontSize: 17,
                boxShadow: `0 6px 16px ${catColors[i]}55`,
                opacity: feedback !== 'idle' ? 0.6 : 1,
                transition: 'all 0.15s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-3)' }}>
          {currentIdx + 1} de {items.length} elementos
        </p>
      </div>
    </>
  );
}

/* ── Utility ── */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ═══════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════ */
export default function InteractiveGamePlayer({
  game,
  onClose,
  onComplete,
}: {
  game: InteractiveGame;
  onClose: () => void;
  onComplete: (xpGained: number) => void;
}) {
  const [phase, setPhase]     = useState<'playing' | 'results'>('playing');
  const [score, setScore]     = useState(0);
  const [total, setTotal]     = useState(1);
  const [retryKey, setRetryKey] = useState(0);

  function handleComplete(s: number, t: number) {
    setScore(s);
    setTotal(t);
    const xp = Math.round((s / t) * game.xpReward);
    onComplete(xp);
    setPhase('results');
  }

  function handleRetry() {
    setPhase('playing');
    setRetryKey((k) => k + 1);
  }

  const gameProps: GameComponentProps = {
    game,
    onComplete: handleComplete,
    onClose,
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(10,20,30,0.80)', backdropFilter: 'blur(6px)' }}
    >
      <div
        style={{
          width: '100%', maxWidth: 480,
          background: 'var(--surface)',
          borderRadius: 24,
          overflow: 'hidden',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 28px 80px rgba(0,0,0,0.45)',
          animation: 'scaleIn 0.2s ease',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {phase === 'results' ? (
          <GameResults game={game} score={score} total={total} onRetry={handleRetry} onClose={onClose} />
        ) : (
          <div key={retryKey}>
            {game.data.type === 'fraction-pizza'  && <FractionPizzaGame  {...gameProps} />}
            {game.data.type === 'number-match'    && <NumberMatchGame    {...gameProps} />}
            {game.data.type === 'number-line'     && <NumberLineGame     {...gameProps} />}
            {game.data.type === 'line-connect'    && <LineConnectGame    {...gameProps} />}
            {game.data.type === 'word-scramble'   && <WordScrambleGame   {...gameProps} />}
            {game.data.type === 'classify'        && <ClassifyGame       {...gameProps} />}
          </div>
        )}
      </div>
    </div>
  );
}
