import { useState } from 'react';
import { Zap, Flame, BookOpen, Gamepad2, Award, Edit2, Calculator, Type, Sparkles, Flag, Microscope } from 'lucide-react';
import type { User } from '../types';
import { SUBJECTS, ACHIEVEMENTS, getSubjectProgress } from '../data';

interface Props { user: User; setUser: (u: User) => void; }

const AVATARS = ['🦋','🐯','🦁','🐸','🦊','🐼','🐨','🦄','🐶','🐱','🦅','🐬'];

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

export default function Profile({ user, setUser }: Props) {
  const [pickingAvatar, setPickingAvatar] = useState(false);

  const xpInLevel   = user.xp % 200;
  const xpPct       = Math.round((xpInLevel / 200) * 100);
  const earnedCount = ACHIEVEMENTS.filter((a) => a.check(user)).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

      {/* ═══ HERO ═══ */}
      <div style={{
        background: 'var(--nav-bg)',
        padding: '28px 32px 62px',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        {/* Background glows */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 50%, rgba(37,132,167,0.22) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 80, top: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(36,229,210,0.05)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: 40, bottom: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,203,119,0.07)', pointerEvents: 'none' }} />

        {/* Content: 3-col */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 32 }}>

          {/* LEFT: avatar ring + name + badges */}
          <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ position: 'relative' }}>
              <RingDark pct={xpPct} color="var(--progress)" size={108} stroke={7} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 48, lineHeight: 1 }}>{user.avatar}</span>
              </div>
              <button
                onClick={() => setPickingAvatar(!pickingAvatar)}
                style={{
                  position: 'absolute',
                  bottom: 2,
                  right: 2,
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  background: 'var(--cerulean)',
                  border: '2px solid var(--nav-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <Edit2 size={11} color="#fff" />
              </button>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: '"Fredoka One", cursive', fontSize: 20, color: '#fff', lineHeight: 1.2, marginBottom: 4 }}>{user.name}</p>
              <p style={{ fontSize: 12, color: 'var(--cerulean)', marginBottom: 8 }}>@{user.username}</p>
              <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                <span style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)', borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>
                  {user.grade}° Grado
                </span>
                <span style={{ background: 'rgba(255,203,119,0.2)', color: '#FFCB77', borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>
                  Niv. {user.level}
                </span>
              </div>
            </div>
          </div>

          {/* CENTER: XP level bar */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', fontWeight: 700 }}>Nivel {user.level}</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', fontWeight: 700 }}>Nivel {user.level + 1}</p>
            </div>
            {/* Progress bar */}
            <div style={{ height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.12)', overflow: 'hidden', marginBottom: 10 }}>
              <div style={{ width: `${xpPct}%`, height: '100%', background: 'var(--progress)', borderRadius: 5, transition: 'width 0.6s ease' }} />
            </div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 20 }}>{xpInLevel} / 200 XP para el siguiente nivel</p>

            {/* Stat pills */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(36,229,210,0.18)', color: '#24E5D2', borderRadius: 100, padding: '5px 13px', fontSize: 12, fontWeight: 800 }}>
                📚 {user.completedLessons.length} lecciones
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(254,109,115,0.2)', color: '#FE6D73', borderRadius: 100, padding: '5px 13px', fontSize: 12, fontWeight: 800 }}>
                🔥 {user.streak} días
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(110,203,122,0.18)', color: '#6ECB7A', borderRadius: 100, padding: '5px 13px', fontSize: 12, fontWeight: 800 }}>
                🎮 {user.gamesPlayed} juegos
              </div>
            </div>
          </div>

          {/* RIGHT: total XP */}
          <div style={{ flexShrink: 0, textAlign: 'center' }}>
            <p style={{ fontFamily: '"Fredoka One", cursive', fontSize: 52, color: '#FFCB77', lineHeight: 1 }}>{user.xp}</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4, fontWeight: 700 }}>XP total</p>
            <Zap size={20} color="#FFCB77" style={{ margin: '8px auto 0', display: 'block' }} />
          </div>
        </div>

        {/* Wave divider */}
        <svg viewBox="0 0 1200 44" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 44, display: 'block' }}>
          <path d="M0,22 C150,44 350,0 600,22 C850,44 1050,0 1200,22 L1200,44 L0,44 Z" fill="#f5f2ec" />
        </svg>
      </div>

      {/* ═══ BODY ═══ */}
      <div style={{ flex: 1, overflow: 'auto', padding: '20px 32px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Avatar picker (if open) */}
        {pickingAvatar && (
          <div className="anim-fade-up" style={{
            background: 'var(--surface)',
            borderRadius: 16,
            padding: '16px 20px',
            border: '1.5px solid var(--border)',
          }}>
            <p style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-2)', marginBottom: 12 }}>Elige tu avatar:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {AVATARS.map((av) => (
                <button
                  key={av}
                  onClick={() => { setUser({ ...user, avatar: av }); setPickingAvatar(false); }}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    fontSize: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: user.avatar === av ? '#e8f4f8' : 'var(--bg)',
                    border: `2px solid ${user.avatar === av ? 'var(--cerulean)' : 'var(--border)'}`,
                    cursor: 'pointer',
                  }}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ─── STATS ROW (4-col gradient tiles) ─── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {[
            { label: 'Lecciones',   value: user.completedLessons.length, Icon: BookOpen,  g1: '#2584A7', g2: '#1b6485' },
            { label: 'Racha',       value: `${user.streak}d`,             Icon: Flame,     g1: '#FE6D73', g2: '#c94d52' },
            { label: 'Juegos',      value: user.gamesPlayed,              Icon: Gamepad2,  g1: '#6ECB7A', g2: '#45a852' },
            { label: 'Logros',      value: earnedCount,                   Icon: Award,     g1: '#FFCB77', g2: '#c47d00' },
          ].map((stat) => {
            return (
              <div
                key={stat.label}
                style={{
                  background: `linear-gradient(140deg, ${stat.g1}, ${stat.g2})`,
                  borderRadius: 20,
                  height: 110,
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: `0 6px 24px ${stat.g1}40`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                }}
              >
                {/* Bubble decorations */}
                <div style={{ position: 'absolute', right: -14, top: -14, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', left: -6, bottom: 10, width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />

                <stat.Icon size={20} color="white" strokeWidth={2} style={{ position: 'relative', zIndex: 1 }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <p style={{ fontFamily: '"Fredoka One", cursive', fontSize: 32, color: 'white', lineHeight: 1 }}>{stat.value}</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── SUBJECTS + RIGHT COLUMN ─── */}
        <div style={{ display: 'flex', gap: 18 }}>

          {/* Left 2/3: Subject tiles */}
          <div style={{ flex: 2, minWidth: 0 }}>
            <h2 style={{ fontFamily: '"Fredoka One", cursive', fontSize: 22, color: 'var(--text)', marginBottom: 14 }}>
              Progreso por Materia
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {SUBJECTS.map((subject, idx) => {
                const progress = getSubjectProgress(subject.id, user.grade, user.completedLessons);
                const lessons  = subject.grades[user.grade] ?? [];
                const done     = lessons.filter((l) => user.completedLessons.includes(l.id)).length;
                const [g1, g2] = SUBJECT_GRADIENTS[subject.id] ?? ['#888', '#555'];
                const Icon     = SUBJECT_ICONS[subject.id] ?? BookOpen;
                return (
                  <div
                    key={subject.id}
                    className="anim-fade-up"
                    style={{
                      background: `linear-gradient(140deg, ${g1}, ${g2})`,
                      borderRadius: 20,
                      padding: '16px',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: `0 6px 24px ${g1}40`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      animationDelay: `${idx * 0.06}s`,
                    }}
                  >
                    {/* Bubble */}
                    <div style={{ position: 'absolute', right: -14, top: -14, width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', pointerEvents: 'none' }} />

                    {/* Ring with icon inside */}
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <RingDark pct={progress} color="rgba(255,255,255,0.9)" size={52} stroke={4} />
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={18} color="white" strokeWidth={2} />
                      </div>
                    </div>

                    {/* Text */}
                    <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
                      <p style={{ color: 'white', fontWeight: 800, fontSize: 13, lineHeight: 1.2, marginBottom: 4 }}>{subject.name}</p>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>{done}/{lessons.length} lecciones</p>
                      <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 11, fontWeight: 800, marginTop: 2 }}>{progress}%</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 1/3 */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Account info card */}
            <div style={{
              background: 'linear-gradient(145deg, #1e3347, #152636)',
              borderRadius: 20,
              padding: '18px',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <p style={{ fontSize: 10, fontWeight: 800, color: '#3a8aa8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
                Información de Cuenta
              </p>
              {[
                { label: 'Nombre', value: user.name },
                { label: 'Usuario', value: `@${user.username}` },
                { label: 'Correo', value: user.email },
                { label: 'Grado', value: `${user.grade}° de Primaria` },
              ].map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: i > 0 ? 10 : 0,
                    marginTop: i > 0 ? 10 : 0,
                    borderTop: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}
                >
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginBottom: 2 }}>{item.label}</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Avatar picker card (static "change" btn) */}
            <div style={{
              background: 'linear-gradient(145deg, #1e3347, #152636)',
              borderRadius: 20,
              padding: '18px',
              border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
            }}>
              <p style={{ fontSize: 10, fontWeight: 800, color: '#3a8aa8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Tu Avatar
              </p>
              <span style={{ fontSize: 52 }}>{user.avatar}</span>
              <button
                onClick={() => setPickingAvatar(!pickingAvatar)}
                style={{
                  background: 'rgba(37,132,167,0.3)',
                  border: '1px solid rgba(37,132,167,0.5)',
                  borderRadius: 100,
                  padding: '6px 18px',
                  fontSize: 12,
                  fontWeight: 800,
                  color: '#24E5D2',
                  cursor: 'pointer',
                }}
              >
                {pickingAvatar ? 'Cancelar' : 'Cambiar'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
