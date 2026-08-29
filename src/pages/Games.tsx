import { useState, useEffect, useCallback } from 'react';
import { Timer, X, Check, Calculator, Type, Sparkles, Flag, Microscope } from 'lucide-react';
import type { User, Game, InteractiveGame } from '../types';
import { GAMES, INTERACTIVE_GAMES, SUBJECTS } from '../data';
import InteractiveGamePlayer from '../components/InteractiveGamePlayer';

interface Props { user: User; setUser: (u: User) => void; }

type Phase = 'select' | 'playing' | 'results';
const Q_TIME = 20;

const SUBJECT_ICONS: Record<string, React.ElementType> = {
  matematica: Calculator, lengua: Type, valores: Sparkles, identidad: Flag, ciencias: Microscope,
};

const SUBJECT_GRADIENTS: Record<string, [string, string]> = {
  matematica: ['#FE6D73', '#c94d52'],
  lengua:     ['#2584A7', '#1b6485'],
  valores:    ['#24E5D2', '#16b5a5'],
  identidad:  ['#FFCB77', '#d49520'],
  ciencias:   ['#6ECB7A', '#45a852'],
};

const SHORT_LABELS: Record<string, string> = {
  matematica: 'Mate',
  lengua:     'Lengua',
  valores:    'Valores',
  identidad:  'Patria',
  ciencias:   'Ciencias',
};

export default function Games({ user, setUser }: Props) {
  const [filter, setFilter]               = useState('all');
  const [game, setGame]                   = useState<Game | null>(null);
  const [phase, setPhase]                 = useState<Phase>('select');
  const [qIdx, setQIdx]                   = useState(0);
  const [selected, setSelected]           = useState<number | null>(null);
  const [score, setScore]                 = useState(0);
  const [timeLeft, setTimeLeft]           = useState(Q_TIME);
  const [activeIGame, setActiveIGame]     = useState<InteractiveGame | null>(null);

  const filtered  = filter === 'all' ? GAMES : GAMES.filter((g) => g.subjectId === filter);
  const filteredI = filter === 'all' ? INTERACTIVE_GAMES : INTERACTIVE_GAMES.filter((g) => g.subjectId === filter);

  const advance = useCallback(() => {
    if (!game) return;
    const correct = selected === game.questions[qIdx].correctIndex;
    const newScore = score + (correct ? 1 : 0);
    if (qIdx >= game.questions.length - 1) {
      setScore(newScore);
      const xpGain = Math.round((newScore / game.questions.length) * game.xpReward);
      setUser({ ...user, xp: user.xp + xpGain, gamesPlayed: user.gamesPlayed + 1 });
      setPhase('results');
    } else {
      setScore(newScore);
      setQIdx((i) => i + 1);
      setSelected(null);
      setTimeLeft(Q_TIME);
    }
  }, [game, qIdx, selected, score, user, setUser]);

  useEffect(() => {
    if (phase !== 'playing') return;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { advance(); return Q_TIME; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [phase, qIdx, advance]);

  function startGame(g: Game) {
    setGame(g); setPhase('playing');
    setQIdx(0); setSelected(null); setScore(0); setTimeLeft(Q_TIME);
  }

  function pick(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    setTimeout(advance, 900);
  }

  function reset() { setPhase('select'); setGame(null); }

  function handleIGameComplete(xpGained: number) {
    setUser({ ...user, xp: user.xp + xpGained, gamesPlayed: user.gamesPlayed + 1 });
  }

  const subject = game ? SUBJECTS.find((s) => s.id === game.subjectId) : null;

  /* ── PLAYING ── */
  if (phase === 'playing' && game) {
    const q    = game.questions[qIdx];
    const pct  = (timeLeft / Q_TIME) * 100;
    const timerColor = pct > 50 ? 'var(--progress)' : pct > 25 ? 'var(--award)' : 'var(--action)';

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(10,20,30,0.80)', backdropFilter: 'blur(6px)' }}
      >
        <div
          className="w-full max-w-lg rounded-xl overflow-hidden anim-scale-in"
          style={{ background: 'var(--surface)', border: '1.5px solid var(--border)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--border)', borderLeft: `4px solid ${game.color}` }}>
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${game.color}15` }}
              >
                <Timer size={16} color={game.color} />
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>{game.title}</p>
                <p className="text-xs" style={{ color: 'var(--text-3)' }}>Pregunta {qIdx + 1} de {game.questions.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="stat-num text-lg" style={{ color: timerColor }}>{timeLeft}s</span>
              <button onClick={reset} className="p-1" style={{ color: 'var(--text-3)' }}>
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Timer strip */}
          <div className="h-1.5 w-full" style={{ background: 'var(--bg)' }}>
            <div
              className="h-full transition-all"
              style={{ width: `${pct}%`, background: timerColor, transition: 'width 1s linear, background 0.3s' }}
            />
          </div>

          {/* Question */}
          <div className="p-6">
            {q.imageUrl ? (
              <div style={{ borderRadius: 14, overflow: 'hidden', height: 170, marginBottom: 16 }}>
                <img src={q.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ) : (
              <div style={{ textAlign: 'center', fontSize: 72, marginBottom: 16 }}>{q.emoji}</div>
            )}
            <p className="font-fredoka text-2xl text-center mb-6" style={{ color: 'var(--text)' }}>
              {q.question}
            </p>

            <div className="space-y-2.5">
              {q.options.map((opt, idx) => {
                const isCorrect  = idx === q.correctIndex;
                const isSelected = idx === selected;
                let bg = 'var(--bg)'; let border = 'var(--border)'; let color = 'var(--text)';
                if (selected !== null) {
                  if (isCorrect)        { bg = '#edf9f8'; border = 'var(--progress)'; color = '#0a7a6a'; }
                  else if (isSelected)  { bg = '#fff0f0'; border = 'var(--action)';   color = '#a00010'; }
                }
                return (
                  <button
                    key={idx}
                    onClick={() => pick(idx)}
                    disabled={selected !== null}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-lg text-left text-base font-semibold transition-all press"
                    style={{ background: bg, border: `1.5px solid ${border}`, color }}
                  >
                    <span
                      className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: border, color: '#fff' }}
                    >
                      {selected !== null && isCorrect
                        ? <Check size={12} strokeWidth={3} />
                        : String.fromCharCode(65 + idx)
                      }
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center mt-5 text-xs" style={{ color: 'var(--text-3)' }}>
              <span>Puntaje: {score}/{qIdx}</span>
              <span>{game.xpReward} XP disponibles</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── RESULTS ── */
  if (phase === 'results' && game) {
    const pct    = Math.round((score / game.questions.length) * 100);
    const stars  = pct >= 80 ? 3 : pct >= 50 ? 2 : 1;
    const xpEarn = Math.round((score / game.questions.length) * game.xpReward);

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(10,20,30,0.80)', backdropFilter: 'blur(6px)' }}
      >
        <div
          className="w-full max-w-sm rounded-xl overflow-hidden anim-scale-in"
          style={{ background: 'var(--surface)', border: '1.5px solid var(--border)' }}
        >
          <div className="px-6 pt-6 pb-4 text-center">
            <p className="text-5xl mb-3">{pct >= 80 ? '🏆' : pct >= 50 ? '🎉' : '💪'}</p>
            <h2 className="font-fredoka text-2xl mb-1" style={{ color: 'var(--text)' }}>
              {pct >= 80 ? '¡Excelente!' : pct >= 50 ? '¡Muy bien!' : '¡Sigue practicando!'}
            </h2>
            <p className="text-sm mb-4" style={{ color: 'var(--text-2)' }}>{game.title}</p>

            {/* Stars */}
            <div className="flex justify-center gap-2 mb-5">
              {[1,2,3].map((s) => (
                <span key={s} className="text-3xl" style={{ opacity: s <= stars ? 1 : 0.2 }}>⭐</span>
              ))}
            </div>

            {/* Stats */}
            <div
              className="rounded-xl overflow-hidden mb-4"
              style={{ border: '1.5px solid var(--border)' }}
            >
              {[
                { l: 'Respuestas correctas', v: `${score}/${game.questions.length}`, c: 'var(--progress)' },
                { l: 'Porcentaje',           v: `${pct}%`,                           c: 'var(--action)'   },
                { l: 'XP ganados',           v: `+${xpEarn}`,                        c: 'var(--award)'    },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 py-3 text-sm"
                  style={{ borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}
                >
                  <span style={{ color: 'var(--text-2)' }}>{s.l}</span>
                  <span className="font-bold stat-num" style={{ color: s.c }}>{s.v}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => startGame(game)}
                className="flex-1 py-2.5 rounded-lg font-bold text-sm text-white press"
                style={{ background: game.color }}
              >
                Reintentar
              </button>
              <button
                onClick={reset}
                className="flex-1 py-2.5 rounded-lg font-bold text-sm press"
                style={{ background: 'var(--bg)', border: '1.5px solid var(--border)', color: 'var(--text-2)' }}
              >
                Otros juegos
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── SELECT ── */
  const totalXp = GAMES.reduce((sum, g) => sum + g.xpReward, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

      {/* ═══ HERO ═══ */}
      <div style={{
        background: 'var(--nav-bg)',
        padding: '28px 32px 56px',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        {/* Background glows */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(37,132,167,0.22) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 120, top: -80, width: 280, height: 280, borderRadius: '50%', background: 'rgba(36,229,210,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: -50, top: -20, width: 160, height: 160, borderRadius: '50%', background: 'rgba(37,132,167,0.1)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: 50, bottom: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(254,109,115,0.07)', pointerEvents: 'none' }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>

          {/* Left */}
          <div style={{ minWidth: 0 }}>
            <p style={{ color: 'var(--cerulean)', fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
              JUEGOS EDUCATIVOS
            </p>
            <h1 style={{ fontFamily: '"Fredoka One", cursive', fontSize: 36, color: '#fff', lineHeight: 1.1, marginBottom: 8 }}>
              ¡A Jugar!
            </h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginBottom: 16 }}>
              Aprende jugando — {user.gamesPlayed} juegos completados
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(254,109,115,0.2)', color: '#FE6D73', borderRadius: 100, padding: '5px 13px', fontSize: 12, fontWeight: 800 }}>
                🎮 {user.gamesPlayed} jugados
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,203,119,0.2)', color: '#FFCB77', borderRadius: 100, padding: '5px 13px', fontSize: 12, fontWeight: 800 }}>
                ⚡ hasta {totalXp} XP
              </div>
            </div>
          </div>

          {/* Right: 🎮 with glow */}
          <div style={{ position: 'relative', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', width: 100, height: 100, borderRadius: '50%', background: 'rgba(36,229,210,0.15)', filter: 'blur(12px)' }} />
            <span style={{ fontSize: 80, lineHeight: 1, position: 'relative' }}>🎮</span>
          </div>
        </div>

        {/* Wave divider */}
        <svg viewBox="0 0 1200 44" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 44, display: 'block' }}>
          <path d="M0,22 C150,44 350,0 600,22 C850,44 1050,0 1200,22 L1200,44 L0,44 Z" fill="#f5f2ec" />
        </svg>
      </div>

      {/* ═══ BODY ═══ */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '20px 32px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingBottom: 4 }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              flexShrink: 0,
              background: filter === 'all' ? 'var(--cerulean)' : 'var(--surface)',
              color: filter === 'all' ? '#fff' : 'var(--text-2)',
              border: `1.5px solid ${filter === 'all' ? 'var(--cerulean)' : 'var(--border)'}`,
              borderRadius: 100,
              padding: '6px 16px',
              fontWeight: 800,
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            Todos
          </button>
          {SUBJECTS.map((s) => {
            const active = filter === s.id;
            const [g1] = SUBJECT_GRADIENTS[s.id] ?? ['#888', '#555'];
            const shortLabel = SHORT_LABELS[s.id] ?? s.name;
            return (
              <button
                key={s.id}
                onClick={() => setFilter(s.id)}
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: active ? `${g1}22` : 'var(--surface)',
                  color: active ? g1 : 'var(--text-2)',
                  border: `1.5px solid ${active ? g1 : 'var(--border)'}`,
                  borderRadius: 100,
                  padding: '6px 16px',
                  fontWeight: 800,
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                {s.emoji} {shortLabel}
              </button>
            );
          })}
        </div>

        {/* ── Section label: Q&A games ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: '"Fredoka One",cursive', fontSize: 15, color: 'var(--text-2)' }}>❓ Preguntas y Respuestas</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 700 }}>{filtered.length} juegos</span>
        </div>

        {/* Game tiles grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {filtered.map((g) => {
            const [g1] = SUBJECT_GRADIENTS[g.subjectId] ?? ['#888', '#555'];
            const g2 = SUBJECT_GRADIENTS[g.subjectId]?.[1] ?? '#444';
            return (
              <div
                key={g.id}
                style={{
                  background: `linear-gradient(140deg, ${g1}, ${g2})`,
                  borderRadius: 24,
                  height: 195,
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: `0 6px 24px ${g1}40`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px) scale(1.01)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 14px 36px ${g1}60`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = '';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 6px 24px ${g1}40`;
                }}
              >
                {/* Decorative large emoji (bottom-right bg) */}
                <span style={{ position: 'absolute', bottom: -8, right: -4, fontSize: 90, opacity: 0.12, filter: 'blur(2px)', pointerEvents: 'none', lineHeight: 1 }}>
                  {g.emoji}
                </span>

                {/* Bubble decorations */}
                <div style={{ position: 'absolute', right: -18, top: -18, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', left: -10, bottom: 20, width: 50, height: 50, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />

                {/* Top row: stars + XP badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {[1, 2, 3].map((s) => (
                      <span key={s} style={{ fontSize: 16, color: 'white', opacity: s <= g.difficulty ? 1 : 0.3 }}>★</span>
                    ))}
                  </div>
                  <span style={{
                    background: 'rgba(255,255,255,0.22)',
                    backdropFilter: 'blur(4px)',
                    borderRadius: 100,
                    padding: '3px 10px',
                    fontSize: 12,
                    fontWeight: 800,
                    color: 'white',
                  }}>
                    +{g.xpReward} XP
                  </span>
                </div>

                {/* Bottom: title, description, button */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <p style={{ fontFamily: '"Fredoka One", cursive', fontSize: 21, color: 'white', lineHeight: 1.2, marginBottom: 4 }}>
                    {g.title}
                  </p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.4, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', marginBottom: 10 }}>
                    {g.description}
                  </p>
                  <button
                    onClick={() => startGame(g)}
                    style={{
                      background: 'rgba(255,255,255,0.22)',
                      backdropFilter: 'blur(4px)',
                      border: 'none',
                      borderRadius: 100,
                      padding: '8px 20px',
                      fontSize: 13,
                      fontWeight: 900,
                      color: 'white',
                      cursor: 'pointer',
                    }}
                  >
                    ¡Jugar! →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Section label: interactive games ── */}
        {filteredI.length > 0 && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
              <span style={{ fontFamily: '"Fredoka One",cursive', fontSize: 15, color: 'var(--text-2)' }}>🎮 Juegos Dinámicos</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              <span style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 700 }}>{filteredI.length} juegos</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {filteredI.map((g) => {
                const [g1] = SUBJECT_GRADIENTS[g.subjectId] ?? ['#888', '#555'];
                const g2   = SUBJECT_GRADIENTS[g.subjectId]?.[1] ?? '#444';
                const gameTypeLabel: Record<string, string> = {
                  'fraction-pizza': '🍕 Fracciones',
                  'number-match':   '🔢 Asociación',
                  'number-line':    '📏 Recta',
                  'line-connect':   '🔗 Unir',
                  'word-scramble':  '🔤 Descifra',
                  'classify':       '📦 Clasificar',
                };
                const tag = gameTypeLabel[g.data.type] ?? '🎮 Interactivo';
                return (
                  <div
                    key={g.id}
                    style={{
                      background: `linear-gradient(140deg, ${g1}, ${g2})`,
                      borderRadius: 24, height: 195,
                      position: 'relative', overflow: 'hidden',
                      boxShadow: `0 6px 24px ${g1}40`,
                      display: 'flex', flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px) scale(1.01)';
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 14px 36px ${g1}60`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = '';
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 6px 24px ${g1}40`;
                    }}
                  >
                    <span style={{ position: 'absolute', bottom: -8, right: -4, fontSize: 90, opacity: 0.12, filter: 'blur(2px)', pointerEvents: 'none', lineHeight: 1 }}>
                      {g.emoji}
                    </span>
                    <div style={{ position: 'absolute', right: -18, top: -18, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', pointerEvents: 'none' }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                      <div style={{ display: 'flex', gap: 2 }}>
                        {[1, 2, 3].map((s) => (
                          <span key={s} style={{ fontSize: 16, color: 'white', opacity: s <= g.difficulty ? 1 : 0.3 }}>★</span>
                        ))}
                      </div>
                      <span style={{ background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(4px)', borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 800, color: 'white' }}>
                        +{g.xpReward} XP
                      </span>
                    </div>

                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.18)', borderRadius: 100, padding: '2px 9px', fontSize: 10, fontWeight: 800, color: 'white', marginBottom: 5 }}>
                        {tag}
                      </span>
                      <p style={{ fontFamily: '"Fredoka One", cursive', fontSize: 18, color: 'white', lineHeight: 1.2, marginBottom: 4 }}>
                        {g.title}
                      </p>
                      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', lineHeight: 1.4, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', marginBottom: 10 }}>
                        {g.description}
                      </p>
                      <button
                        onClick={() => setActiveIGame(g)}
                        style={{
                          background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(4px)',
                          border: 'none', borderRadius: 100,
                          padding: '8px 20px', fontSize: 13, fontWeight: 900,
                          color: 'white', cursor: 'pointer',
                        }}
                      >
                        ¡Jugar! →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Interactive game overlay */}
      {activeIGame && (
        <InteractiveGamePlayer
          game={activeIGame}
          onClose={() => setActiveIGame(null)}
          onComplete={handleIGameComplete}
        />
      )}
    </div>
  );
}
