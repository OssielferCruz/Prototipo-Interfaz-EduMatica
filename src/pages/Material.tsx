import { useState } from 'react';
import { Book, FileText, Video, Map, ClipboardList, ExternalLink, BookMarked } from 'lucide-react';
import type { User, MaterialType } from '../types';
import { MATERIALS, SUBJECTS } from '../data';

interface Props { user: User; }

const TYPE_META: Record<MaterialType, { label: string; Icon: React.ElementType; color: string; bg: string }> = {
  libro:      { label: 'Libro',       Icon: Book,          color: '#2584A7', bg: '#e8f4fa' },
  ficha:      { label: 'Ficha',       Icon: FileText,      color: '#6ECB7A', bg: '#edf9ef' },
  video:      { label: 'Video',       Icon: Video,         color: '#FE6D73', bg: '#fef0f0' },
  mapa:       { label: 'Mapa',        Icon: Map,           color: '#FFCB77', bg: '#fef8ec' },
  formulario: { label: 'Formulario',  Icon: ClipboardList, color: '#24E5D2', bg: '#e8faf8' },
};

const SUBJECT_GRADIENTS: Record<string, [string, string]> = {
  matematica: ['#FE6D73', '#c94d52'],
  lengua:     ['#2584A7', '#1b6485'],
  valores:    ['#24E5D2', '#16b5a5'],
  identidad:  ['#FFCB77', '#d49520'],
  ciencias:   ['#6ECB7A', '#45a852'],
};

const TYPE_ORDER: MaterialType[] = ['libro', 'ficha', 'video', 'mapa', 'formulario'];

export default function Material({ user }: Props) {
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [typeFilter, setTypeFilter]       = useState<MaterialType | 'all'>('all');

  const filtered = MATERIALS.filter((m) => {
    const okSubject = subjectFilter === 'all' || m.subjectId === subjectFilter;
    const okType    = typeFilter    === 'all' || m.type      === typeFilter;
    const okGrade   = m.grades.includes(user.grade) || m.grades.length === 0;
    return okSubject && okType && okGrade;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

      {/* ═══ HERO ═══ */}
      <div style={{
        background: 'var(--nav-bg)', padding: '28px 32px 56px',
        position: 'relative', overflow: 'hidden', flexShrink: 0,
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(36,229,210,0.18) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: -40, top: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(37,132,167,0.1)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
          <div>
            <p style={{ color: 'var(--cerulean)', fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
              BIBLIOTECA DIGITAL
            </p>
            <h1 style={{ fontFamily: '"Fredoka One", cursive', fontSize: 36, color: '#fff', lineHeight: 1.1, marginBottom: 8 }}>
              Material Didáctico
            </h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginBottom: 16 }}>
              Recursos educativos complementarios para {user.grade}° grado
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(36,229,210,0.2)', color: '#24E5D2', borderRadius: 100, padding: '5px 13px', fontSize: 12, fontWeight: 800 }}>
                📚 {MATERIALS.length} recursos
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,203,119,0.2)', color: '#FFCB77', borderRadius: 100, padding: '5px 13px', fontSize: 12, fontWeight: 800 }}>
                🎓 5 asignaturas
              </div>
            </div>
          </div>

          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ position: 'absolute', width: 100, height: 100, borderRadius: '50%', background: 'rgba(36,229,210,0.15)', filter: 'blur(12px)' }} />
            <span style={{ fontSize: 80, lineHeight: 1, position: 'relative' }}>📖</span>
          </div>
        </div>

        <svg viewBox="0 0 1200 44" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 44, display: 'block' }}>
          <path d="M0,22 C150,44 350,0 600,22 C850,44 1050,0 1200,22 L1200,44 L0,44 Z" fill="#f5f2ec" />
        </svg>
      </div>

      {/* ═══ BODY ═══ */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '20px 32px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Subject filter */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            onClick={() => setSubjectFilter('all')}
            style={{
              flexShrink: 0, background: subjectFilter === 'all' ? 'var(--cerulean)' : 'var(--surface)',
              color: subjectFilter === 'all' ? '#fff' : 'var(--text-2)',
              border: `1.5px solid ${subjectFilter === 'all' ? 'var(--cerulean)' : 'var(--border)'}`,
              borderRadius: 100, padding: '6px 16px', fontWeight: 800, fontSize: 12, cursor: 'pointer',
            }}
          >
            Todas
          </button>
          {SUBJECTS.map((s) => {
            const active = subjectFilter === s.id;
            const [g1]   = SUBJECT_GRADIENTS[s.id] ?? ['#888'];
            return (
              <button
                key={s.id}
                onClick={() => setSubjectFilter(s.id)}
                style={{
                  flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6,
                  background: active ? `${g1}22` : 'var(--surface)',
                  color: active ? g1 : 'var(--text-2)',
                  border: `1.5px solid ${active ? g1 : 'var(--border)'}`,
                  borderRadius: 100, padding: '6px 16px', fontWeight: 800, fontSize: 12, cursor: 'pointer',
                }}
              >
                {s.emoji} {s.name}
              </button>
            );
          })}
        </div>

        {/* Type filter */}
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          <button
            onClick={() => setTypeFilter('all')}
            style={{
              flexShrink: 0, background: typeFilter === 'all' ? '#152636' : 'var(--surface)',
              color: typeFilter === 'all' ? '#fff' : 'var(--text-2)',
              border: `1.5px solid ${typeFilter === 'all' ? '#152636' : 'var(--border)'}`,
              borderRadius: 8, padding: '5px 14px', fontWeight: 700, fontSize: 11, cursor: 'pointer',
            }}
          >
            Todos los tipos
          </button>
          {TYPE_ORDER.map((t) => {
            const m = TYPE_META[t];
            const active = typeFilter === t;
            return (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                style={{
                  flexShrink: 0, display: 'flex', alignItems: 'center', gap: 5,
                  background: active ? m.bg : 'var(--surface)',
                  color: active ? m.color : 'var(--text-2)',
                  border: `1.5px solid ${active ? m.color : 'var(--border)'}`,
                  borderRadius: 8, padding: '5px 14px', fontWeight: 700, fontSize: 11, cursor: 'pointer',
                }}
              >
                <m.Icon size={12} />
                {m.label}
              </button>
            );
          })}
        </div>

        {/* Count */}
        <p style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 700 }}>
          {filtered.length} {filtered.length === 1 ? 'recurso encontrado' : 'recursos encontrados'}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, paddingTop: 40 }}>
            <span style={{ fontSize: 64 }}>📭</span>
            <p style={{ fontFamily: '"Fredoka One",cursive', fontSize: 20, color: 'var(--text-2)' }}>
              Sin resultados
            </p>
            <p style={{ fontSize: 13, color: 'var(--text-3)' }}>
              Prueba cambiando los filtros
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {filtered.map((item) => {
              const typeMeta = TYPE_META[item.type];
              const subj     = SUBJECTS.find((s) => s.id === item.subjectId);
              const [g1, g2] = SUBJECT_GRADIENTS[item.subjectId] ?? ['#888', '#555'];
              return (
                <div
                  key={item.id}
                  style={{
                    background: 'var(--surface)', borderRadius: 20,
                    border: '1.5px solid var(--border)',
                    overflow: 'hidden',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    display: 'flex', flexDirection: 'column',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 28px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = '';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
                  }}
                >
                  {/* Card header strip */}
                  <div style={{
                    background: `linear-gradient(135deg, ${g1}, ${g2})`,
                    padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, position: 'relative', overflow: 'hidden',
                  }}>
                    <div style={{ position: 'absolute', right: -20, top: -20, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', pointerEvents: 'none' }} />
                    <span style={{ fontSize: 40, lineHeight: 1, position: 'relative', zIndex: 1 }}>{item.emoji}</span>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        background: 'rgba(255,255,255,0.22)', borderRadius: 100,
                        padding: '2px 9px', fontSize: 10, fontWeight: 800, color: '#fff', marginBottom: 4,
                      }}>
                        <typeMeta.Icon size={9} />
                        {typeMeta.label}
                      </span>
                      <p style={{ fontFamily: '"Fredoka One",cursive', fontSize: 15, color: '#fff', lineHeight: 1.2 }}>
                        {item.title}
                      </p>
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ padding: '14px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.55, flex: 1 }}>
                      {item.description}
                    </p>

                    {/* Meta chips */}
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {subj && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: `${g1}15`, color: g1, borderRadius: 100, padding: '3px 10px', fontSize: 10, fontWeight: 800 }}>
                          {subj.emoji} {subj.name}
                        </span>
                      )}
                      {item.pages && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: 'var(--bg)', color: 'var(--text-2)', borderRadius: 100, padding: '3px 10px', fontSize: 10, fontWeight: 700 }}>
                          <BookMarked size={9} /> {item.pages} páginas
                        </span>
                      )}
                      {item.duration && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: 'var(--bg)', color: 'var(--text-2)', borderRadius: 100, padding: '3px 10px', fontSize: 10, fontWeight: 700 }}>
                          ▶ {item.duration}
                        </span>
                      )}
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: 'var(--bg)', color: 'var(--text-3)', borderRadius: 100, padding: '3px 10px', fontSize: 10, fontWeight: 700 }}>
                        {item.grades.join('°, ')}° grado
                      </span>
                    </div>

                    {/* Open button */}
                    <button
                      style={{
                        width: '100%', padding: '10px', borderRadius: 12, border: 'none',
                        background: `${g1}18`,
                        color: g1, fontFamily: '"Fredoka One",cursive', fontSize: 14,
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = `${g1}28`; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = `${g1}18`; }}
                    >
                      <ExternalLink size={13} />
                      Abrir recurso
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
