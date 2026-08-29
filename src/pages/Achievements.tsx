import { Lock, CheckCircle } from 'lucide-react';
import type { User } from '../types';
import { ACHIEVEMENTS } from '../data';

interface Props { user: User; }

const RARITY_GRADIENTS: Record<string, [string, string]> = {
  common:    ['#6b7280', '#4b5563'],
  rare:      ['#2584A7', '#1b6485'],
  epic:      ['#9B59B6', '#7d3a99'],
  legendary: ['#FFCB77', '#c47d00'],
};

const RARITY_LABELS: Record<string, string> = {
  common: 'Común', rare: 'Raro', epic: 'Épico', legendary: 'Legendario',
};

function RingDark({ pct, color, size, stroke }: { pct: number; color: string; size: number; stroke: number }) {
  const r = (size - stroke * 2) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - Math.min(pct, 100) / 100);
  return (
    <svg width={size} height={size} style={{ display: 'block' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={stroke}
        strokeDasharray={c} strokeDashoffset={off}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
    </svg>
  );
}

export default function Achievements({ user }: Props) {
  const earned  = ACHIEVEMENTS.filter((a) => a.check(user));
  const locked  = ACHIEVEMENTS.filter((a) => !a.check(user));
  const pct     = Math.round((earned.length / ACHIEVEMENTS.length) * 100);
  const totalXp = earned.reduce((s, a) => s + a.xpReward, 0);

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
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(37,132,167,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 120, top: -80, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,203,119,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: -40, top: -10, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,203,119,0.08)', pointerEvents: 'none' }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>

          {/* Left */}
          <div style={{ minWidth: 0 }}>
            <p style={{ color: 'var(--cerulean)', fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
              SISTEMA DE LOGROS
            </p>
            <h1 style={{ fontFamily: '"Fredoka One", cursive', fontSize: 36, color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>
              Mis Trofeos 🏆
            </h1>
            {/* Stats row */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { label: `${earned.length}/${ACHIEVEMENTS.length} ganados`, bg: 'rgba(36,229,210,0.18)', color: '#24E5D2' },
                { label: `+${totalXp} XP`,                                   bg: 'rgba(255,203,119,0.2)', color: '#FFCB77' },
                { label: `${pct}% completo`,                                  bg: 'rgba(110,203,122,0.2)', color: '#6ECB7A' },
                { label: `${locked.length} bloqueados`,                       bg: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' },
              ].map((p) => (
                <div key={p.label} style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  background: p.bg, color: p.color,
                  borderRadius: 100, padding: '5px 13px',
                  fontSize: 12, fontWeight: 800,
                }}>
                  {p.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right: ring */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <RingDark pct={pct} color="var(--progress)" size={108} stroke={7} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: '"Fredoka One", cursive', fontSize: 26, color: 'var(--progress)', lineHeight: 1 }}>{pct}%</span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>trofeos</span>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <svg viewBox="0 0 1200 44" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 44, display: 'block' }}>
          <path d="M0,22 C150,44 350,0 600,22 C850,44 1050,0 1200,22 L1200,44 L0,44 Z" fill="#f5f2ec" />
        </svg>
      </div>

      {/* ═══ BODY ═══ */}
      <div style={{ flex: 1, overflow: 'auto', padding: '20px 32px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* ─── EARNED ─── */}
        {earned.length > 0 && (
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <h2 style={{ fontFamily: '"Fredoka One", cursive', fontSize: 22, color: 'var(--text)', margin: 0 }}>Desbloqueados</h2>
              <span style={{
                background: 'var(--progress)',
                color: 'white',
                borderRadius: 100,
                padding: '2px 10px',
                fontSize: 12,
                fontWeight: 800,
              }}>{earned.length}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              {earned.map((a, idx) => {
                const [g1, g2] = RARITY_GRADIENTS[a.rarity] ?? ['#888', '#555'];
                return (
                  <div
                    key={a.id}
                    className="anim-fade-up"
                    style={{
                      background: `linear-gradient(140deg, ${g1}, ${g2})`,
                      borderRadius: 20,
                      height: 160,
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: `0 6px 24px ${g1}40`,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '14px 14px',
                      animationDelay: `${idx * 0.05}s`,
                    }}
                  >
                    {/* Large blurred emoji bg */}
                    <span style={{ position: 'absolute', bottom: -6, right: -4, fontSize: 80, opacity: 0.12, filter: 'blur(2px)', pointerEvents: 'none', lineHeight: 1 }}>
                      {a.emoji}
                    </span>
                    {/* Bubble decorations */}
                    <div style={{ position: 'absolute', right: -16, top: -16, width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', left: -8, bottom: 18, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />

                    {/* Top: emoji + checkmark/rarity */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                      <span style={{ fontSize: 42, lineHeight: 1 }}>{a.emoji}</span>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                        <CheckCircle size={16} color="rgba(255,255,255,0.9)" strokeWidth={2} />
                        <span style={{
                          background: 'rgba(255,255,255,0.2)',
                          backdropFilter: 'blur(4px)',
                          borderRadius: 100,
                          padding: '2px 8px',
                          fontSize: 10,
                          fontWeight: 800,
                          color: 'white',
                        }}>{RARITY_LABELS[a.rarity]}</span>
                      </div>
                    </div>

                    {/* Bottom: title, desc, XP */}
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <p style={{ color: 'white', fontWeight: 700, fontSize: 13, lineHeight: 1.3, marginBottom: 3 }}>{a.title}</p>
                      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11, lineHeight: 1.4, marginBottom: 8, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const }}>{a.description}</p>
                      <span style={{
                        background: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(4px)',
                        borderRadius: 100,
                        padding: '3px 10px',
                        fontSize: 11,
                        fontWeight: 800,
                        color: 'white',
                      }}>+{a.xpReward} XP</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ─── LOCKED ─── */}
        {locked.length > 0 && (
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <h2 style={{ fontFamily: '"Fredoka One", cursive', fontSize: 22, color: 'var(--text)', margin: 0 }}>Por Desbloquear</h2>
              <span style={{
                background: 'var(--border)',
                color: 'var(--text-3)',
                borderRadius: 100,
                padding: '2px 10px',
                fontSize: 12,
                fontWeight: 800,
              }}>{locked.length}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              {locked.map((a, idx) => {
                const [g1] = RARITY_GRADIENTS[a.rarity] ?? ['#888', '#555'];
                return (
                  <div
                    key={a.id}
                    className="anim-fade-up"
                    style={{
                      background: 'linear-gradient(140deg, #2a3040, #1e2530)',
                      borderRadius: 20,
                      height: 160,
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '14px 14px',
                      filter: 'grayscale(0.8) opacity(0.65)',
                      animationDelay: `${idx * 0.05}s`,
                    }}
                  >
                    {/* Large blurred emoji bg */}
                    <span style={{ position: 'absolute', bottom: -6, right: -4, fontSize: 80, opacity: 0.08, filter: 'blur(2px)', pointerEvents: 'none', lineHeight: 1 }}>
                      {a.emoji}
                    </span>
                    {/* Bubble decorations */}
                    <div style={{ position: 'absolute', right: -16, top: -16, width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', left: -8, bottom: 18, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

                    {/* Top: emoji + lock icon */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                      <span style={{ fontSize: 42, lineHeight: 1 }}>{a.emoji}</span>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                        <Lock size={16} color="rgba(255,255,255,0.5)" strokeWidth={2} />
                        <span style={{
                          background: 'rgba(255,255,255,0.1)',
                          borderRadius: 100,
                          padding: '2px 8px',
                          fontSize: 10,
                          fontWeight: 800,
                          color: 'rgba(255,255,255,0.4)',
                        }}>{RARITY_LABELS[a.rarity]}</span>
                      </div>
                    </div>

                    {/* Bottom: title, desc, XP */}
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 700, fontSize: 13, lineHeight: 1.3, marginBottom: 3 }}>{a.title}</p>
                      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, lineHeight: 1.4, marginBottom: 8, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const }}>{a.description}</p>
                      <span style={{
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: 100,
                        padding: '3px 10px',
                        fontSize: 11,
                        fontWeight: 800,
                        color: `${g1}99`,
                      }}>+{a.xpReward} XP</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
