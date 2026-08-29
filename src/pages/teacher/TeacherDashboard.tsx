import { ChevronRight } from 'lucide-react';
import type { Teacher, TeacherView } from '../../types';
import { STUDENTS, MINED_MATERIALS, SUBJECTS } from '../../data';

const AVATAR_PALETTE = ['#FE6D73','#2584A7','#24C4B5','#d49520','#6ECB7A','#a855f7','#f97316','#0891b2','#ec4899','#65a30d','#e11d48','#0e7490','#7c3aed','#b45309','#16a34a'];
function getInitials(name: string) { const p = name.trim().split(' '); return p.length === 1 ? p[0][0].toUpperCase() : (p[0][0] + p[p.length - 1][0]).toUpperCase(); }
function getAvatarColor(name: string) { let h = 0; for (const c of name) h = (h << 5) - h + c.charCodeAt(0); return AVATAR_PALETTE[Math.abs(h) % AVATAR_PALETTE.length]; }

interface Props { teacher: Teacher; navigate: (v: TeacherView) => void; }

const SUBJECT_COLORS: Record<string, string> = {
  matematica: '#FE6D73', lengua: '#2584A7', valores: '#24E5D2', identidad: '#FFCB77', ciencias: '#6ECB7A',
};

export default function TeacherDashboard({ teacher, navigate }: Props) {
  const totalStudents  = STUDENTS.length;
  const activeToday    = STUDENTS.filter((s) => s.lastActive === 'Hoy').length;
  const avgProgress    = Math.round(
    STUDENTS.reduce((sum, s) => sum + Object.values(s.progress).reduce((a, b) => a + b, 0) / 5, 0) / totalStudents
  );
  const newMined = MINED_MATERIALS.filter((m) => m.isNew).length;

  const topStudents = [...STUDENTS].sort((a, b) => b.xp - a.xp).slice(0, 5);

  const subjectAvgs = SUBJECTS.map((s) => ({
    id: s.id, name: s.name, emoji: s.emoji,
    avg: Math.round(STUDENTS.reduce((sum, st) => sum + (st.progress[s.id] ?? 0), 0) / totalStudents),
  }));

  const recentMined = MINED_MATERIALS.filter((m) => m.isNew).slice(0, 3);

  const STAT_CARDS = [
    { label: 'Total alumnos',   value: totalStudents,  emoji: '👥', color: '#2584A7', sub: '3er grado' },
    { label: 'Promedio general',value: `${avgProgress}%`, emoji: '📊', color: '#6ECB7A', sub: 'todas las materias' },
    { label: 'Activos hoy',     value: activeToday,    emoji: '⚡', color: '#FFCB77', sub: `de ${totalStudents} estudiantes` },
    { label: 'MINED nuevos',    value: newMined,        emoji: '📥', color: '#FE6D73', sub: 'documentos sin leer' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

      {/* Hero */}
      <div style={{ background: 'var(--nav-bg)', padding: '28px 32px 56px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 75% 50%, rgba(36,229,210,0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ color: '#24E5D2', fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
              PORTAL DOCENTE
            </p>
            <h1 style={{ fontFamily: '"Fredoka One",cursive', fontSize: 32, color: '#fff', lineHeight: 1.1, marginBottom: 6 }}>
              Buenos días, {teacher.name.split(' ')[2] ?? teacher.name.split(' ')[0]} 👋
            </h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{teacher.school}</p>
          </div>
          <span style={{ fontSize: 72, lineHeight: 1 }}>{teacher.avatar}</span>
        </div>
        <svg viewBox="0 0 1200 44" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 44 }}>
          <path d="M0,22 C150,44 350,0 600,22 C850,44 1050,0 1200,22 L1200,44 L0,44 Z" fill="#f5f2ec" />
        </svg>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {STAT_CARDS.map((s) => (
            <div key={s.label} style={{
              background: 'var(--surface)', borderRadius: 20, padding: '18px 20px',
              border: '1.5px solid var(--border)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <span style={{ fontSize: 30 }}>{s.emoji}</span>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, marginTop: 4 }} />
              </div>
              <div style={{ fontFamily: '"Fredoka One",cursive', fontSize: 28, color: 'var(--text)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-2)', marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Two-column lower area */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

          {/* Promedio por asignatura */}
          <div style={{ background: 'var(--surface)', borderRadius: 20, padding: '20px 22px', border: '1.5px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontFamily: '"Fredoka One",cursive', fontSize: 16, color: 'var(--text)' }}>
                📊 Promedio por Asignatura
              </h3>
              <button onClick={() => navigate('alumnos')} style={{ fontSize: 11, color: 'var(--cerulean)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>
                Ver alumnos →
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {subjectAvgs.map((s) => (
                <div key={s.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-2)' }}>{s.emoji} {s.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: SUBJECT_COLORS[s.id] }}>{s.avg}%</span>
                  </div>
                  <div style={{ height: 7, background: 'var(--bg)', borderRadius: 10, overflow: 'hidden' }}>
                    <div style={{ width: `${s.avg}%`, height: '100%', background: SUBJECT_COLORS[s.id], borderRadius: 10, transition: 'width 0.5s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top performers */}
          <div style={{ background: 'var(--surface)', borderRadius: 20, padding: '20px 22px', border: '1.5px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontFamily: '"Fredoka One",cursive', fontSize: 16, color: 'var(--text)' }}>
                🏆 Mejores Estudiantes
              </h3>
              <button onClick={() => navigate('alumnos')} style={{ fontSize: 11, color: 'var(--cerulean)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>
                Ver todos →
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {topStudents.map((s, i) => (
                <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 12, background: i === 0 ? '#fffbeb' : 'transparent' }}>
                  <span style={{ fontSize: 15, fontWeight: 900, color: i === 0 ? '#d4a020' : i === 1 ? '#9ca3af' : i === 2 ? '#b87333' : 'var(--text-3)', width: 20, textAlign: 'center' }}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`}
                  </span>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: getAvatarColor(s.name), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Fredoka One",cursive', fontSize: 13, color: '#fff', flexShrink: 0 }}>{getInitials(s.name)}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{s.name.split(' ')[0]} {s.name.split(' ')[1]}</p>
                    <p style={{ fontSize: 11, color: 'var(--text-3)' }}>Niv. {s.level} · {s.xp} XP</p>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--cerulean)', background: 'var(--bg)', borderRadius: 8, padding: '2px 7px' }}>
                    🔥{s.streak}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MINED notifications */}
        {recentMined.length > 0 && (
          <div style={{ background: 'var(--surface)', borderRadius: 20, padding: '20px 22px', border: '1.5px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={{ fontFamily: '"Fredoka One",cursive', fontSize: 16, color: 'var(--text)' }}>
                📥 Novedades del MINED
              </h3>
              <button onClick={() => navigate('mined')} style={{ fontSize: 11, color: 'var(--cerulean)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>
                Ver todo →
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {recentMined.map((m) => (
                <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 14, background: '#f0f9ff', border: '1.5px solid #bae6fd', cursor: 'pointer' }}
                  onClick={() => navigate('mined')}>
                  <span style={{ fontSize: 28 }}>{m.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>{m.title}</p>
                    <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{m.date} · {m.pages ? `${m.pages} páginas` : ''}</p>
                  </div>
                  <span style={{ background: '#2584A7', color: '#fff', fontSize: 9, fontWeight: 900, padding: '2px 7px', borderRadius: 100, flexShrink: 0 }}>NUEVO</span>
                  <ChevronRight size={14} color="var(--text-3)" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
