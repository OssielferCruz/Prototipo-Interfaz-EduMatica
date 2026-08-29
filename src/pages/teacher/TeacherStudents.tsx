import { useState } from 'react';
import { Search, ArrowUp, ArrowDown, ChevronDown, ChevronUp, Flame, Zap } from 'lucide-react';
import type { Teacher } from '../../types';
import { STUDENTS, SUBJECTS } from '../../data';

interface Props { teacher: Teacher; }

const SUBJECT_COLORS: Record<string, string> = {
  matematica: '#FE6D73', lengua: '#2584A7', valores: '#24E5D2', identidad: '#FFCB77', ciencias: '#6ECB7A',
};

const AVATAR_PALETTE = ['#FE6D73','#2584A7','#24C4B5','#d49520','#6ECB7A','#a855f7','#f97316','#0891b2','#ec4899','#65a30d','#e11d48','#0e7490','#7c3aed','#b45309','#16a34a'];

function getInitials(name: string) {
  const parts = name.trim().split(' ');
  return parts.length === 1 ? parts[0][0].toUpperCase() : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getAvatarColor(name: string) {
  let h = 0;
  for (const c of name) h = (h << 5) - h + c.charCodeAt(0);
  return AVATAR_PALETTE[Math.abs(h) % AVATAR_PALETTE.length];
}

type SortKey = 'name' | 'xp' | 'avg';

export default function TeacherStudents({ teacher }: Props) {
  const [search, setSearch]     = useState('');
  const [sort, setSort]         = useState<SortKey>('xp');
  const [sortAsc, setSortAsc]   = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  function toggleSort(key: SortKey) {
    if (sort === key) setSortAsc((a) => !a);
    else { setSort(key); setSortAsc(false); }
  }

  function avgProgress(s: typeof STUDENTS[0]) {
    return Math.round(Object.values(s.progress).reduce((a, b) => a + b, 0) / 5);
  }

  const filtered = STUDENTS
    .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      let diff = 0;
      if (sort === 'name') diff = a.name.localeCompare(b.name);
      if (sort === 'xp')   diff = a.xp - b.xp;
      if (sort === 'avg')  diff = avgProgress(a) - avgProgress(b);
      return sortAsc ? diff : -diff;
    });

  const totalAvg    = Math.round(STUDENTS.reduce((s, st) => s + avgProgress(st), 0) / STUDENTS.length);
  const activeToday = STUDENTS.filter((s) => s.lastActive === 'Hoy').length;

  const SortBtn = ({ k, label }: { k: SortKey; label: string }) => (
    <button
      onClick={() => toggleSort(k)}
      style={{
        display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', borderRadius: 8,
        background: sort === k ? 'var(--cerulean)' : 'var(--surface)',
        color: sort === k ? '#fff' : 'var(--text-2)',
        border: `1.5px solid ${sort === k ? 'var(--cerulean)' : 'var(--border)'}`,
        fontSize: 12, fontWeight: 700, cursor: 'pointer',
      }}
    >
      {label}
      {sort === k && (sortAsc ? <ArrowUp size={11} /> : <ArrowDown size={11} />)}
    </button>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

      {/* Hero */}
      <div style={{ background: 'var(--nav-bg)', padding: '28px 32px 56px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(37,132,167,0.2) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
          <div>
            <p style={{ color: '#24E5D2', fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>MONITOREO DE ALUMNOS</p>
            <h1 style={{ fontFamily: '"Fredoka One",cursive', fontSize: 36, color: '#fff', lineHeight: 1.1, marginBottom: 8 }}>Mis Alumnos</h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{teacher.grade}° grado · {STUDENTS.length} estudiantes</p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
            {[
              { v: `${totalAvg}%`, l: 'Promedio', c: '#6ECB7A' },
              { v: activeToday,    l: 'Activos hoy', c: '#FFCB77' },
            ].map((s) => (
              <div key={s.l} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.1)', borderRadius: 16, padding: '12px 18px' }}>
                <div style={{ fontFamily: '"Fredoka One",cursive', fontSize: 28, color: s.c, lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <svg viewBox="0 0 1200 44" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 44 }}>
          <path d="M0,22 C150,44 350,0 600,22 C850,44 1050,0 1200,22 L1200,44 L0,44 Z" fill="#f5f2ec" />
        </svg>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 32px 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Controls */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1 1 220px' }}>
            <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} />
            <input
              value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar alumno..."
              style={{
                width: '100%', padding: '9px 12px 9px 34px', borderRadius: 10, fontSize: 13,
                background: 'var(--surface)', border: '1.5px solid var(--border)', color: 'var(--text)', outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--cerulean)')}
              onBlur={(e)  => (e.target.style.borderColor = 'var(--border)')}
            />
          </div>
          <div style={{ display: 'flex', gap: 6, flexShrink: 0, alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 700 }}>Ordenar:</span>
            <SortBtn k="name" label="Nombre" />
            <SortBtn k="xp"   label="XP" />
            <SortBtn k="avg"  label="Promedio" />
          </div>
          <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 'auto' }}>{filtered.length} alumnos</span>
        </div>

        {/* Student cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map((student) => {
            const avg      = avgProgress(student);
            const isOpen   = expanded === student.id;
            const isActive = student.lastActive === 'Hoy';
            const avatarBg = getAvatarColor(student.name);
            const initials = getInitials(student.name);

            return (
              <div
                key={student.id}
                style={{
                  background: 'var(--surface)', borderRadius: 18, overflow: 'hidden',
                  border: '1.5px solid var(--border)',
                  boxShadow: isOpen ? '0 4px 16px rgba(0,0,0,0.08)' : 'none',
                  transition: 'box-shadow 0.2s',
                }}
              >
                {/* Main row */}
                <button
                  onClick={() => setExpanded(isOpen ? null : student.id)}
                  style={{
                    width: '100%', padding: '14px 18px', display: 'flex', alignItems: 'center',
                    gap: 14, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  {/* Initials avatar */}
                  <div style={{
                    width: 44, height: 44, borderRadius: 14, flexShrink: 0, position: 'relative',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: avatarBg,
                    boxShadow: isActive ? `0 0 0 3px var(--surface), 0 0 0 5px #22c55e80` : 'none',
                    fontFamily: '"Fredoka One",cursive', fontSize: 16, color: '#fff',
                  }}>
                    {initials}
                    {isActive && (
                      <div style={{ position: 'absolute', width: 10, height: 10, background: '#22c55e', borderRadius: '50%', border: '2px solid var(--surface)', bottom: 0, right: 0, transform: 'translate(2px, 2px)' }} />
                    )}
                  </div>

                  {/* Name + meta */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                      <span style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)' }}>{student.name}</span>
                      {isActive && (
                        <span style={{ fontSize: 9, fontWeight: 900, background: '#22c55e', color: '#fff', borderRadius: 100, padding: '1px 7px' }}>EN LÍNEA</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <span style={{ fontSize: 11, color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Zap size={10} /> {student.xp} XP · Niv. {student.level}
                      </span>
                      {student.streak > 0 && (
                        <span style={{ fontSize: 11, color: '#FE6D73', display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Flame size={10} /> {student.streak} días
                        </span>
                      )}
                      <span style={{ fontSize: 11, color: 'var(--text-3)' }}>Último: {student.lastActive}</span>
                    </div>
                  </div>

                  {/* Avg progress */}
                  <div style={{ textAlign: 'center', flexShrink: 0 }}>
                    <div style={{ fontFamily: '"Fredoka One",cursive', fontSize: 22, color: avg >= 70 ? '#22c55e' : avg >= 50 ? '#FFCB77' : '#FE6D73', lineHeight: 1 }}>{avg}%</div>
                    <div style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 700 }}>promedio</div>
                  </div>

                  {/* XP mini bar */}
                  <div style={{ width: 80, flexShrink: 0 }}>
                    <div style={{ height: 6, background: 'var(--bg)', borderRadius: 6, overflow: 'hidden' }}>
                      <div style={{ width: `${Math.min(100, (student.xp % 200) / 2)}%`, height: '100%', background: avatarBg, borderRadius: 6 }} />
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 3, textAlign: 'center' }}>{student.gamesPlayed} juegos</div>
                  </div>

                  {isOpen ? <ChevronUp size={16} color="var(--text-3)" /> : <ChevronDown size={16} color="var(--text-3)" />}
                </button>

                {/* Expanded: subject progress */}
                {isOpen && (
                  <div style={{ padding: '0 18px 18px', borderTop: '1px solid var(--border)' }}>
                    <p style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '14px 0 12px' }}>
                      Progreso por asignatura
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
                      {SUBJECTS.map((subj) => {
                        const pct = student.progress[subj.id] ?? 0;
                        const col = SUBJECT_COLORS[subj.id];
                        return (
                          <div key={subj.id} style={{ background: 'var(--bg)', borderRadius: 12, padding: '12px 10px', textAlign: 'center', border: '1px solid var(--border)' }}>
                            <div style={{ height: 5, background: 'var(--border)', borderRadius: 6, overflow: 'hidden', marginBottom: 8 }}>
                              <div style={{ width: `${pct}%`, height: '100%', background: col, borderRadius: 6 }} />
                            </div>
                            <span style={{ fontSize: 18 }}>{subj.emoji}</span>
                            <div style={{ fontSize: 13, fontWeight: 800, color: col, marginTop: 4 }}>{pct}%</div>
                            <div style={{ fontSize: 9, color: 'var(--text-3)', lineHeight: 1.2, marginTop: 2 }}>{subj.name.split(' ')[0]}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
