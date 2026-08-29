import { useState } from 'react';
import { BookOpen, FileText, CheckSquare, Bell, Calendar, Download, ExternalLink } from 'lucide-react';
import type { Teacher, MinedMaterialType } from '../../types';
import { MINED_MATERIALS, SUBJECTS } from '../../data';

interface Props { teacher: Teacher; }

const TYPE_META: Record<MinedMaterialType, { label: string; Icon: React.ElementType; color: string; bg: string }> = {
  programa:       { label: 'Programa',      Icon: BookOpen,    color: '#2584A7', bg: '#e8f4fa' },
  guia:           { label: 'Guía',          Icon: FileText,    color: '#6ECB7A', bg: '#edf9ef' },
  evaluacion:     { label: 'Evaluación',    Icon: CheckSquare, color: '#FE6D73', bg: '#fef0f0' },
  circular:       { label: 'Circular',      Icon: Bell,        color: '#FFCB77', bg: '#fef8ec' },
  planificacion:  { label: 'Planificación', Icon: Calendar,    color: '#24E5D2', bg: '#e8faf8' },
};

const TYPE_ORDER: MinedMaterialType[] = ['programa', 'guia', 'evaluacion', 'circular', 'planificacion'];

export default function TeacherMined({ teacher }: Props) {
  const [typeFilter, setTypeFilter]       = useState<MinedMaterialType | 'all'>('all');
  const [subjectFilter, setSubjectFilter] = useState('all');

  const filtered = MINED_MATERIALS.filter((m) => {
    const okType    = typeFilter    === 'all' || m.type      === typeFilter;
    const okSubject = subjectFilter === 'all' || m.subjectId === subjectFilter || !m.subjectId;
    const okGrade   = m.grades.includes(teacher.grade) || m.grades.length === 0;
    return okType && okSubject && okGrade;
  });

  const newCount = MINED_MATERIALS.filter((m) => m.isNew && m.grades.includes(teacher.grade)).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

      {/* Hero — MINED themed */}
      <div style={{
        background: 'linear-gradient(135deg, #0a2744 0%, #152636 60%, #0e3b5c 100%)',
        padding: '28px 32px 60px', position: 'relative', overflow: 'hidden', flexShrink: 0,
      }}>
        {/* Flag-inspired stripe */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 4, background: 'linear-gradient(90deg, #003F87 33%, #FFF 33% 67%, #003F87 67%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 60%, rgba(0,63,135,0.3) 0%, transparent 50%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 22 }}>🇳🇮</span>
              <p style={{ color: '#93c5fd', fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                MINISTERIO DE EDUCACIÓN — MINED
              </p>
            </div>
            <h1 style={{ fontFamily: '"Fredoka One",cursive', fontSize: 34, color: '#fff', lineHeight: 1.1, marginBottom: 8 }}>
              Material Oficial MINED
            </h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
              Documentos para {teacher.grade}° grado · Escuela: {teacher.school.split(',')[0]}
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 100, padding: '5px 14px', fontSize: 12, fontWeight: 800, color: '#93c5fd' }}>
                📥 {MINED_MATERIALS.length} documentos
              </div>
              {newCount > 0 && (
                <div style={{ background: '#ef4444', borderRadius: 100, padding: '5px 14px', fontSize: 12, fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Bell size={11} /> {newCount} nuevos
                </div>
              )}
            </div>
          </div>
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontSize: 72, lineHeight: 1 }}>📚</div>
          </div>
        </div>
        <svg viewBox="0 0 1200 44" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 44 }}>
          <path d="M0,22 C150,44 350,0 600,22 C850,44 1050,0 1200,22 L1200,44 L0,44 Z" fill="#f5f2ec" />
        </svg>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 32px 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* New items banner */}
        {newCount > 0 && (
          <div style={{
            borderRadius: 16, padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 12,
            background: 'linear-gradient(135deg, #fef3c7, #fffbeb)',
            border: '1.5px solid #fcd34d',
          }}>
            <Bell size={18} color="#d97706" />
            <div>
              <p style={{ fontWeight: 800, fontSize: 13, color: '#92400e' }}>Tienes {newCount} documentos nuevos del MINED</p>
              <p style={{ fontSize: 11, color: '#b45309', marginTop: 2 }}>Programas de estudio, evaluaciones y circulares actualizados</p>
            </div>
          </div>
        )}

        {/* Type filter */}
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          <button
            onClick={() => setTypeFilter('all')}
            style={{
              flexShrink: 0, background: typeFilter === 'all' ? '#152636' : 'var(--surface)',
              color: typeFilter === 'all' ? '#fff' : 'var(--text-2)',
              border: `1.5px solid ${typeFilter === 'all' ? '#152636' : 'var(--border)'}`,
              borderRadius: 9, padding: '6px 14px', fontWeight: 700, fontSize: 12, cursor: 'pointer',
            }}
          >
            Todos
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
                  borderRadius: 9, padding: '6px 14px', fontWeight: 700, fontSize: 12, cursor: 'pointer',
                }}
              >
                <m.Icon size={12} />
                {m.label}
              </button>
            );
          })}
        </div>

        {/* Subject filter */}
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          <button
            onClick={() => setSubjectFilter('all')}
            style={{
              flexShrink: 0, background: subjectFilter === 'all' ? 'var(--cerulean)' : 'var(--surface)',
              color: subjectFilter === 'all' ? '#fff' : 'var(--text-2)',
              border: `1.5px solid ${subjectFilter === 'all' ? 'var(--cerulean)' : 'var(--border)'}`,
              borderRadius: 100, padding: '5px 14px', fontWeight: 800, fontSize: 11, cursor: 'pointer',
            }}
          >
            Todas las materias
          </button>
          {SUBJECTS.map((s) => {
            const active = subjectFilter === s.id;
            return (
              <button key={s.id} onClick={() => setSubjectFilter(s.id)} style={{
                flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4,
                background: active ? `${s.color}22` : 'var(--surface)',
                color: active ? s.color : 'var(--text-2)',
                border: `1.5px solid ${active ? s.color : 'var(--border)'}`,
                borderRadius: 100, padding: '5px 14px', fontWeight: 800, fontSize: 11, cursor: 'pointer',
              }}>
                {s.emoji} {s.name.split(' ')[0]}
              </button>
            );
          })}
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 700 }}>
          {filtered.length} {filtered.length === 1 ? 'documento' : 'documentos'}
        </p>

        {/* Materials grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {filtered.map((item) => {
            const typeMeta = TYPE_META[item.type];
            const subj = item.subjectId ? SUBJECTS.find((s) => s.id === item.subjectId) : null;
            return (
              <div
                key={item.id}
                style={{
                  background: 'var(--surface)', borderRadius: 20, overflow: 'hidden',
                  border: item.isNew ? '2px solid #fbbf24' : '1.5px solid var(--border)',
                  boxShadow: item.isNew ? '0 0 0 4px #fbbf2420' : '0 2px 10px rgba(0,0,0,0.05)',
                  display: 'flex', flexDirection: 'column',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = item.isNew ? '0 8px 28px #fbbf2430' : '0 8px 24px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = '';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = item.isNew ? '0 0 0 4px #fbbf2420' : '0 2px 10px rgba(0,0,0,0.05)';
                }}
              >
                {/* Header */}
                <div style={{ padding: '14px 16px', background: typeMeta.bg, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{ fontSize: 36, lineHeight: 1, flexShrink: 0 }}>{item.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        background: typeMeta.color, color: '#fff',
                        borderRadius: 100, padding: '2px 9px', fontSize: 10, fontWeight: 800,
                      }}>
                        <typeMeta.Icon size={9} /> {typeMeta.label}
                      </span>
                      {item.isNew && (
                        <span style={{ background: '#ef4444', color: '#fff', borderRadius: 100, padding: '2px 8px', fontSize: 9, fontWeight: 900 }}>
                          NUEVO
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', lineHeight: 1.3 }}>{item.title}</p>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: '12px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.55 }}>{item.description}</p>

                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ background: 'var(--bg)', borderRadius: 8, padding: '3px 9px', fontSize: 10, fontWeight: 700, color: 'var(--text-2)', border: '1px solid var(--border)' }}>
                      📅 {item.date}
                    </span>
                    {item.pages && (
                      <span style={{ background: 'var(--bg)', borderRadius: 8, padding: '3px 9px', fontSize: 10, fontWeight: 700, color: 'var(--text-2)', border: '1px solid var(--border)' }}>
                        📄 {item.pages} págs.
                      </span>
                    )}
                    {subj && (
                      <span style={{ background: `${subj.color}15`, borderRadius: 8, padding: '3px 9px', fontSize: 10, fontWeight: 700, color: subj.color }}>
                        {subj.emoji} {subj.name.split(' ')[0]}
                      </span>
                    )}
                    <span style={{ background: 'var(--bg)', borderRadius: 8, padding: '3px 9px', fontSize: 10, fontWeight: 700, color: 'var(--text-3)', border: '1px solid var(--border)' }}>
                      {item.grades.length === 6 ? 'Todos los grados' : item.grades.join('°, ') + '° grado'}
                    </span>
                  </div>

                  <button style={{
                    marginTop: 'auto', width: '100%', padding: '10px', borderRadius: 12,
                    border: 'none', cursor: 'pointer', fontFamily: '"Fredoka One",cursive', fontSize: 13,
                    background: item.isNew ? '#003F87' : `${typeMeta.color}18`,
                    color: item.isNew ? '#fff' : typeMeta.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                    transition: 'opacity 0.15s',
                  }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
                  >
                    <Download size={13} />
                    {item.isNew ? 'Descargar nuevo' : 'Descargar documento'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
