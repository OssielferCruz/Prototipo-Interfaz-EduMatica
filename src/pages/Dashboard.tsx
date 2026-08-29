import { Flame, Zap, Gamepad2, Trophy, ChevronRight, BookOpen } from 'lucide-react';
import type { User, View } from '../types';
import { SUBJECTS } from '../data';

interface Props {
  user: User;
  setUser: (u: User) => void;
  navigate: (v: View) => void;
  setActiveSubject: (id: string) => void;
}

const SUBJECT_GRADIENTS: Record<string, [string, string]> = {
  matematica: ['#FE6D73', '#c94d52'],
  lengua:     ['#2584A7', '#1b6485'],
  valores:    ['#24E5D2', '#16b5a5'],
  identidad:  ['#FFCB77', '#d49520'],
  ciencias:   ['#6ECB7A', '#45a852'],
};

const TIPS = [
  'El Lago Cocibolca es el lago más grande de Centroamérica.',
  'Rubén Darío fundó el modernismo literario en español.',
  'Nicaragua tiene costas en el Pacífico y el Atlántico.',
  'El Momotombo aparece en el Escudo Nacional de Nicaragua.',
  'Augusto C. Sandino es el héroe nacional de Nicaragua.',
  'El sacuanjoche es la flor nacional de Nicaragua.',
  'La Batalla de San Jacinto fue el 14 de septiembre de 1856.',
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Buenos días';
  if (h < 18) return 'Buenas tardes';
  return 'Buenas noches';
}

/* ── Ring on dark bg ── */
function RingDark({ pct, color, size, stroke }: { pct: number; color: string; size: number; stroke: number }) {
  const r = (size - stroke * 2) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - Math.min(pct, 100) / 100);
  return (
    <svg width={size} height={size} style={{ display: 'block' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} />
      <circle
        cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth={stroke}
        strokeDasharray={c} strokeDashoffset={off}
        strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
    </svg>
  );
}

/* ── Ring on light bg ── */
function RingLight({ pct, color, size, stroke }: { pct: number; color: string; size: number; stroke: number }) {
  const r = (size - stroke * 2) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - Math.min(pct, 100) / 100);
  return (
    <svg width={size} height={size} style={{ display: 'block' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
      <circle
        cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth={stroke}
        strokeDasharray={c} strokeDashoffset={off}
        strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
    </svg>
  );
}

/* ── Subject tile (full-color gradient card) — playful redesign ── */
function SubjectTile({
  subject, grade, completedLessons, onClick, delay,
}: {
  subject: typeof SUBJECTS[number];
  grade: number;
  completedLessons: string[];
  onClick: () => void;
  delay: number;
}) {
  const lessons = subject.grades[grade] ?? [];
  const done    = lessons.filter((l) => completedLessons.includes(l.id)).length;
  const pct     = lessons.length > 0 ? Math.round((done / lessons.length) * 100) : 0;
  const [g1, g2] = SUBJECT_GRADIENTS[subject.id] ?? ['#888', '#555'];

  const IllustrationSVG = () => {
    if (subject.id === 'matematica') {
      return (
        <svg viewBox="0 0 175 110" width="175" height="110" style={{position:'absolute',right:-10,top:-10,opacity:0.28,pointerEvents:'none'}}>
          <text x="5" y="54" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="54" fill="white">2+2</text>
          <text x="8" y="90" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="26" fill="white">× ÷ =</text>
          <circle cx="162" cy="22" r="10" fill="white" opacity="0.7"/>
          <circle cx="170" cy="72" r="7" fill="white" opacity="0.45"/>
          <circle cx="145" cy="100" r="5" fill="white" opacity="0.35"/>
        </svg>
      );
    }
    if (subject.id === 'lengua') {
      return (
        <svg viewBox="0 0 175 110" width="175" height="110" style={{position:'absolute',right:-10,top:-10,opacity:0.28,pointerEvents:'none'}}>
          <text x="3" y="58" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="58" fill="white">ABC</text>
          <text x="12" y="95" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="24" fill="white">&#9998; Leer</text>
          <circle cx="166" cy="20" r="9" fill="white" opacity="0.6"/>
          <circle cx="170" cy="80" r="6" fill="white" opacity="0.4"/>
        </svg>
      );
    }
    if (subject.id === 'valores') {
      return (
        <svg viewBox="0 0 175 110" width="175" height="110" style={{position:'absolute',right:-10,top:-10,opacity:0.28,pointerEvents:'none'}}>
          <text x="10" y="65" fontSize="65" fill="white">&#9829;</text>
          <text x="80" y="52" fontSize="38" fill="white">&#9829;</text>
          <text x="130" y="38" fontSize="24" fill="white">&#9733;</text>
          <text x="140" y="75" fontSize="20" fill="white">&#9733;</text>
          <text x="65" y="95" fontSize="18" fill="white">&#9733;</text>
          <circle cx="105" cy="90" r="7" fill="white" opacity="0.35"/>
        </svg>
      );
    }
    if (subject.id === 'identidad') {
      return (
        <svg viewBox="0 0 175 110" width="175" height="110" style={{position:'absolute',right:-10,top:-10,opacity:0.28,pointerEvents:'none'}}>
          <rect x="8" y="20" width="76" height="70" rx="7" fill="none" stroke="white" strokeWidth="3"/>
          <rect x="8" y="20" width="76" height="23" fill="white" opacity="0.4"/>
          <rect x="8" y="67" width="76" height="23" fill="white" opacity="0.4"/>
          <text x="98" y="56" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="42" fill="white">NI</text>
          <text x="106" y="95" fontSize="26" fill="white">&#11088;</text>
        </svg>
      );
    }
    if (subject.id === 'ciencias') {
      return (
        <svg viewBox="0 0 175 110" width="175" height="110" style={{position:'absolute',right:-10,top:-10,opacity:0.28,pointerEvents:'none'}}>
          <ellipse cx="120" cy="55" rx="48" ry="16" fill="none" stroke="white" strokeWidth="3"/>
          <ellipse cx="120" cy="55" rx="48" ry="16" fill="none" stroke="white" strokeWidth="3" transform="rotate(60 120 55)"/>
          <ellipse cx="120" cy="55" rx="48" ry="16" fill="none" stroke="white" strokeWidth="3" transform="rotate(120 120 55)"/>
          <circle cx="120" cy="55" r="9" fill="white"/>
          <text x="4" y="56" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="40" fill="white">H2O</text>
          <text x="8" y="90" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="22" fill="white">&#9733; ADN</text>
        </svg>
      );
    }
    return null;
  };

  return (
    <button
      onClick={onClick}
      className="anim-fade-up"
      style={{
        background: `linear-gradient(140deg, ${g1} 0%, ${g2} 100%)`,
        borderRadius: 28,
        height: 184,
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 6px 24px ${g1}40`,
        transition: 'transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease',
        animationDelay: `${delay}s`,
        padding: 0,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-6px) scale(1.03)';
        (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 18px 40px ${g1}60`;
        (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1.06)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = '';
        (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 6px 24px ${g1}40`;
        (e.currentTarget as HTMLButtonElement).style.filter = '';
      }}
      onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)'; }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-6px) scale(1.03)';
      }}
    >
      {/* Decorative circles */}
      <div style={{ position: 'absolute', right: -18, top: -18, width: 88, height: 88, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 28, bottom: -24, width: 62, height: 62, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: -10, bottom: 30, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />

      {/* % badge: top right frosted pill */}
      <div style={{ position: 'absolute', top: 14, right: 14, zIndex: 2 }}>
        <span style={{
          background: 'rgba(255,255,255,0.22)',
          backdropFilter: 'blur(6px)',
          borderRadius: 100,
          padding: '4px 12px',
          fontSize: 12, fontWeight: 800, color: 'white',
          letterSpacing: '0.02em',
          display: 'inline-block',
        }}>
          {pct}%
        </span>
      </div>

      {/* Illustration SVG */}
      <IllustrationSVG />

      {/* Text block: pinned to bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 18px 18px' }}>
        <p style={{
          color: 'white',
          fontFamily: '"Fredoka One", cursive',
          fontSize: 17,
          lineHeight: 1.25,
          marginBottom: 8,
        }}>
          {subject.name}
        </p>
        <div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.22)', overflow: 'hidden', marginBottom: 5 }}>
          <div style={{ width: `${pct}%`, height: '100%', background: 'rgba(255,255,255,0.9)', borderRadius: 3, transition: 'width 0.6s ease' }} />
        </div>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600 }}>
          {done} de {lessons.length} lecciones
        </p>
      </div>
    </button>
  );
}

/* ── Gradient action button ── */
function ActionBtn({ label, Icon, g1, g2, shadow, onClick }: {
  label: string; Icon: React.ElementType;
  g1: string; g2: string; shadow: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: `linear-gradient(135deg, ${g1}, ${g2})`,
        borderRadius: 16,
        padding: '14px 18px',
        display: 'flex', alignItems: 'center', gap: 12,
        border: 'none', cursor: 'pointer', width: '100%',
        boxShadow: `0 4px 18px ${shadow}`,
        transition: 'transform 0.18s ease, box-shadow 0.18s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 26px ${shadow}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = '';
        (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 18px ${shadow}`;
      }}
      onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)'; }}
      onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; }}
    >
      <Icon size={20} color="white" strokeWidth={2} />
      <span style={{ fontWeight: 800, fontSize: 14, color: 'white' }}>{label}</span>
    </button>
  );
}

export default function Dashboard({ user, navigate, setActiveSubject }: Props) {
  const tip         = TIPS[new Date().getDay() % TIPS.length];
  const xpInLevel   = user.xp % 200;
  const xpPct       = Math.round((xpInLevel / 200) * 100);
  const totalLessons = SUBJECTS.reduce((a, s) => a + (s.grades[user.grade]?.length ?? 0), 0);
  const overallPct  = Math.round((user.completedLessons.length / totalLessons) * 100);

  function goSubject(id: string) { setActiveSubject(id); navigate('lessons'); }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', background: 'var(--bg)' }}>

      {/* ═══ HERO ═══ */}
      <div style={{
        background: 'var(--nav-bg)',
        padding: '30px 32px 58px',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        {/* Background glows */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(37,132,167,0.22) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 120, top: -80, width: 280, height: 280, borderRadius: '50%', background: 'rgba(36,229,210,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: -50, top: -20, width: 160, height: 160, borderRadius: '50%', background: 'rgba(37,132,167,0.1)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: 50, bottom: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(254,109,115,0.07)', pointerEvents: 'none' }} />

        {/* Floating star decorations */}
        <div style={{ position: 'absolute', top: 14, left: 200, fontSize: 24, opacity: 0.1, pointerEvents: 'none', color: 'white' }}>★</div>
        <div style={{ position: 'absolute', top: 36, left: 340, fontSize: 18, opacity: 0.1, pointerEvents: 'none', color: 'white' }}>★</div>
        <div style={{ position: 'absolute', top: 10, right: 220, fontSize: 32, opacity: 0.1, pointerEvents: 'none', color: 'white' }}>★</div>
        <div style={{ position: 'absolute', top: 48, right: 350, fontSize: 20, opacity: 0.1, pointerEvents: 'none', color: 'white' }}>★</div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>

          {/* Left: greeting + headline + pills */}
          <div style={{ minWidth: 0 }}>
            <p style={{ color: '#24E5D2', fontSize: 15, fontWeight: 700, marginBottom: 6 }}>
              {getGreeting()}, <span style={{ color: 'rgba(255,255,255,0.85)' }}>{user.name.split(' ')[0]}</span> 👋
            </p>
            <h1 style={{ fontFamily: '"Fredoka One", cursive', fontSize: 38, color: '#fff', lineHeight: 1.15, marginBottom: 18 }}>
              ¡Listo para aprender hoy?
            </h1>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { icon: '🔥', label: `${user.streak} días`,  bg: 'rgba(254,109,115,0.2)', color: '#FE6D73'  },
                { icon: '⚡', label: `${user.xp} XP`,        bg: 'rgba(255,203,119,0.2)', color: '#FFCB77'  },
                { icon: '🏅', label: `Nivel ${user.level}`,  bg: 'rgba(36,229,210,0.18)', color: '#24E5D2'  },
                { icon: '📚', label: `${user.grade}° Grado`, bg: 'rgba(142,180,207,0.18)',color: '#8eb4cf'  },
              ].map((p) => (
                <div key={p.label} style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  background: p.bg, color: p.color,
                  borderRadius: 100, padding: '5px 13px',
                  fontSize: 12, fontWeight: 800,
                }}>
                  <span style={{ fontSize: 12 }}>{p.icon}</span> {p.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right: avatar ring */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <RingDark pct={xpPct} color="#24E5D2" size={100} stroke={6} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
              <span style={{ fontSize: 42, lineHeight: 1 }}>{user.avatar}</span>
            </div>
          </div>
        </div>

        {/* Organic wave divider */}
        <svg
          viewBox="0 0 1200 44"
          preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 44, display: 'block' }}
        >
          <path d="M0,22 C150,44 350,0 600,22 C850,44 1050,0 1200,22 L1200,44 L0,44 Z" fill="#f5f2ec" />
        </svg>
      </div>

      {/* ═══ BODY ═══ */}
      <div style={{ flex: 1, overflow: 'auto', padding: '16px 32px 32px', display: 'flex', gap: 18 }}>

        {/* ─── LEFT: subjects ─── */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontFamily: '"Fredoka One", cursive', fontSize: 21, color: 'var(--text)' }}>
              Mis Materias — {user.grade}° Grado
            </h2>
            <button
              onClick={() => navigate('lessons')}
              style={{ color: 'var(--cerulean)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Ver mapa <ChevronRight size={12} />
            </button>
          </div>

          {/* 3-col tile grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {SUBJECTS.map((subject, i) => (
              <SubjectTile
                key={subject.id}
                subject={subject}
                grade={user.grade}
                completedLessons={user.completedLessons}
                onClick={() => goSubject(subject.id)}
                delay={i * 0.06}
              />
            ))}
          </div>
        </div>

        {/* ─── RIGHT: stats ─── */}
        <div style={{ width: 272, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Overall progress — dark card */}
          <div
            className="anim-fade-up"
            style={{
              background: 'linear-gradient(145deg, #1e3347, #152636)',
              borderRadius: 20,
              padding: '20px',
              border: '1px solid rgba(255,255,255,0.06)',
              animationDelay: '0.08s',
            }}
          >
            <p style={{ fontSize: 10, fontWeight: 800, color: '#3a8aa8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
              Progreso General
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
              <div style={{ position: 'relative' }}>
                <RingDark pct={overallPct} color="#24E5D2" size={108} stroke={7} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: '"Fredoka One", cursive', fontSize: 28, color: '#24E5D2', lineHeight: 1 }}>{overallPct}%</span>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>completado</span>
                </div>
              </div>
            </div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
              {user.completedLessons.length} de {totalLessons} lecciones
            </p>
          </div>

          {/* Level XP */}
          <div
            className="anim-fade-up"
            style={{
              background: 'var(--surface)',
              borderRadius: 16,
              padding: '16px',
              border: '1px solid var(--border)',
              boxShadow: '0 2px 14px rgba(0,0,0,0.06)',
              animationDelay: '0.13s',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div>
                <p style={{ fontFamily: '"Fredoka One", cursive', fontSize: 20, color: 'var(--text)', lineHeight: 1 }}>
                  Nivel {user.level}
                </p>
                <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3 }}>{xpInLevel}/200 XP</p>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #fff8e0, #fff0c0)',
                borderRadius: 100, padding: '4px 12px',
                fontSize: 12, fontWeight: 800, color: 'var(--award)',
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                ⚡ {user.xp}
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${xpPct}%` }} />
            </div>
          </div>

          {/* Streak card */}
          <div
            className="anim-fade-up"
            style={{
              background: 'linear-gradient(135deg, #FE6D73, #c94d52)',
              borderRadius: 16,
              padding: '14px 18px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              boxShadow: '0 4px 18px rgba(254,109,115,0.35)',
              animationDelay: '0.17s',
            }}
          >
            <div>
              <p style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Racha actual</p>
              <p style={{ fontFamily: '"Fredoka One", cursive', fontSize: 26, color: 'white', lineHeight: 1.1 }}>{user.streak} días 🔥</p>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {Array.from({ length: Math.min(user.streak, 7) }).map((_, i) => (
                <div key={i} style={{ width: 8, height: 28, borderRadius: 4, background: i < user.streak ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.2)' }} />
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="anim-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 10, animationDelay: '0.21s' }}>
            <ActionBtn label="Jugar ahora"  Icon={Gamepad2} g1="#2584A7" g2="#1a6080" shadow="rgba(37,132,167,0.4)"  onClick={() => navigate('games')} />
            <ActionBtn label="Mis logros"   Icon={Trophy}   g1="#FFCB77" g2="#c47d00" shadow="rgba(255,203,119,0.4)" onClick={() => navigate('achievements')} />
          </div>

          {/* Daily tip */}
          <div
            className="anim-fade-up"
            style={{
              background: 'linear-gradient(145deg, #1e3347, #152636)',
              borderRadius: 16, padding: '16px',
              border: '1px solid rgba(255,255,255,0.05)',
              animationDelay: '0.25s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 16 }}>🇳🇮</span>
              <p style={{ fontSize: 10, fontWeight: 800, color: '#3a8aa8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Dato del día
              </p>
            </div>
            <p style={{ fontSize: 12, color: '#7aa5be', lineHeight: 1.6 }}>{tip}</p>
          </div>

        </div>
      </div>
    </div>
  );
}
