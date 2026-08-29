import { useState } from 'react';
import type { ReactNode } from 'react';
import { Clock, Target, BookOpen, Wrench, CheckSquare, ChevronDown, ChevronUp, CalendarDays } from 'lucide-react';
import type { Teacher, LessonPlan } from '../../types';
import { CLASS_UNITS, SUBJECTS } from '../../data';

interface Props { teacher: Teacher; }

const SUBJECT_GRADIENTS: Record<string, [string, string]> = {
  matematica: ['#FE6D73','#c94d52'], lengua: ['#2584A7','#1b6485'],
  valores: ['#24E5D2','#16b5a5'], identidad: ['#FFCB77','#d49520'], ciencias: ['#6ECB7A','#45a852'],
};

const MOMENT_META = {
  inicio:     { label: 'Inicio',     color: '#2584A7', bg: '#e8f4fa', icon: '🔔' },
  desarrollo: { label: 'Desarrollo', color: '#6ECB7A', bg: '#edf9ef', icon: '⚙️' },
  cierre:     { label: 'Cierre',     color: '#FE6D73', bg: '#fef0f0', icon: '✅' },
};

function SectionHeader({ icon, bg, title }: { icon: ReactNode; bg: string; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
      <div style={{ width: 30, height: 30, borderRadius: 9, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
      </div>
      <h3 style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{title}</h3>
    </div>
  );
}

export default function TeacherPlanning({ teacher }: Props) {
  const [activeSubject, setActiveSubject] = useState('matematica');
  const [openUnits, setOpenUnits]         = useState<Set<string>>(new Set(['u-mat-1']));
  const [selectedPlan, setSelectedPlan]   = useState<string | null>(null);

  const subjectUnits   = CLASS_UNITS.filter((u) => u.subjectId === activeSubject);
  const activeSubjData = SUBJECTS.find((s) => s.id === activeSubject)!;
  const [g1, g2]       = SUBJECT_GRADIENTS[activeSubject];

  // Resolve selected plan + its unit
  let selectedPlanObj: LessonPlan | null = null;
  let selectedUnitOrder = 0;
  if (selectedPlan) {
    outer: for (const unit of CLASS_UNITS) {
      for (const plan of unit.plans) {
        if (plan.id === selectedPlan) { selectedPlanObj = plan; selectedUnitOrder = unit.order; break outer; }
      }
    }
  }

  function toggleUnit(id: string) {
    setOpenUnits((prev) => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  }

  function switchSubject(id: string) {
    setActiveSubject(id);
    setSelectedPlan(null);
    const first = CLASS_UNITS.find((u) => u.subjectId === id);
    if (first) setOpenUnits(new Set([first.id]));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

      {/* Compact hero */}
      <div style={{ background: 'var(--nav-bg)', padding: '20px 28px 44px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(36,229,210,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 46, height: 46, borderRadius: 14, background: 'rgba(36,229,210,0.15)', border: '1px solid rgba(36,229,210,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
            📋
          </div>
          <div>
            <p style={{ color: '#24E5D2', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 3 }}>PLANIFICACIÓN DIDÁCTICA</p>
            <h1 style={{ fontFamily: '"Fredoka One",cursive', fontSize: 26, color: '#fff', lineHeight: 1 }}>Plan de Clases</h1>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 20 }}>
            {[
              { v: CLASS_UNITS.length, l: 'unidades' },
              { v: CLASS_UNITS.reduce((s, u) => s + u.plans.length, 0), l: 'planes' },
            ].map((s) => (
              <div key={s.l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: '"Fredoka One",cursive', fontSize: 24, color: '#fff', lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', fontWeight: 700, marginTop: 3 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <svg viewBox="0 0 1200 44" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 44 }}>
          <path d="M0,22 C150,44 350,0 600,22 C850,44 1050,0 1200,22 L1200,44 L0,44 Z" fill="#f5f2ec" />
        </svg>
      </div>

      {/* Split body */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>

        {/* LEFT NAV — 290px */}
        <div style={{ width: 290, flexShrink: 0, display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border)', background: 'var(--surface)', overflow: 'hidden' }}>

          {/* Subject list */}
          <div style={{ padding: '10px', flexShrink: 0, borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 3 }}>
            {SUBJECTS.map((s) => {
              const active = activeSubject === s.id;
              const [sg1, sg2] = SUBJECT_GRADIENTS[s.id];
              const count = CLASS_UNITS.filter((u) => u.subjectId === s.id).length;
              return (
                <button
                  key={s.id}
                  onClick={() => switchSubject(s.id)}
                  style={{
                    width: '100%', padding: '9px 12px', borderRadius: 10,
                    border: active ? 'none' : 'none', cursor: 'pointer', textAlign: 'left',
                    background: active ? `linear-gradient(135deg, ${sg1}, ${sg2})` : 'transparent',
                    color: active ? '#fff' : 'var(--text-2)',
                    display: 'flex', alignItems: 'center', gap: 10,
                    fontSize: 13, fontWeight: active ? 800 : 600,
                    transition: 'all 0.18s',
                  }}
                  onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg)'; }}
                  onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                >
                  <span style={{ fontSize: 18, lineHeight: 1 }}>{s.emoji}</span>
                  <span style={{ flex: 1 }}>{s.name}</span>
                  <span style={{
                    fontSize: 10, fontWeight: 900, borderRadius: 100, padding: '2px 8px',
                    background: active ? 'rgba(255,255,255,0.22)' : 'var(--bg)',
                    color: active ? '#fff' : 'var(--text-3)',
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Unit + plan tree */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
            {subjectUnits.map((unit) => {
              const isUnitOpen = openUnits.has(unit.id);
              return (
                <div key={unit.id} style={{ marginBottom: 3 }}>
                  <button
                    onClick={() => toggleUnit(unit.id)}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: 10, border: 'none', cursor: 'pointer', textAlign: 'left',
                      background: isUnitOpen ? `${g1}12` : 'transparent',
                      display: 'flex', alignItems: 'center', gap: 10,
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => { if (!isUnitOpen) (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg)'; }}
                    onMouseLeave={(e) => { if (!isUnitOpen) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                  >
                    <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: `linear-gradient(135deg, ${g1}, ${g2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color: '#fff' }}>
                      {unit.order}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: isUnitOpen ? 'var(--text)' : 'var(--text-2)', lineHeight: 1.2, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                        Unidad {unit.order}
                      </p>
                      <p style={{ fontSize: 10, color: 'var(--text-3)', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{unit.title}</p>
                    </div>
                    {isUnitOpen ? <ChevronUp size={12} color="var(--text-3)" /> : <ChevronDown size={12} color="var(--text-3)" />}
                  </button>

                  {isUnitOpen && (
                    <div style={{ paddingLeft: 10, paddingTop: 2, paddingBottom: 4 }}>
                      {unit.plans.map((plan, pi) => {
                        const isSel = selectedPlan === plan.id;
                        return (
                          <button
                            key={plan.id}
                            onClick={() => setSelectedPlan(isSel ? null : plan.id)}
                            style={{
                              width: '100%', marginBottom: 2, padding: '8px 10px',
                              borderRadius: 8, cursor: 'pointer', textAlign: 'left',
                              background: isSel ? `${g1}18` : 'transparent',
                              borderLeft: `3px solid ${isSel ? g1 : 'transparent'}`,
                              border: 'none',
                              display: 'flex', alignItems: 'flex-start', gap: 8,
                              transition: 'all 0.15s',
                            }}
                            onMouseEnter={(e) => { if (!isSel) (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg)'; }}
                            onMouseLeave={(e) => { if (!isSel) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                          >
                            <span style={{ fontSize: 10, fontWeight: 900, color: isSel ? g1 : 'var(--text-3)', width: 14, flexShrink: 0, paddingTop: 2, textAlign: 'center' }}>{pi + 1}</span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ fontSize: 12, fontWeight: isSel ? 700 : 500, color: isSel ? 'var(--text)' : 'var(--text-2)', lineHeight: 1.3, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                {plan.title}
                              </p>
                              <p style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{plan.totalDuration} min · {plan.date}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — plan detail */}
        <div style={{ flex: 1, overflowY: 'auto', background: 'var(--bg)' }}>

          {!selectedPlanObj ? (
            /* Empty state */
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 16, padding: 48, textAlign: 'center' }}>
              <div style={{ width: 88, height: 88, borderRadius: 28, background: `${g1}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>
                {activeSubjData.emoji}
              </div>
              <div>
                <h2 style={{ fontFamily: '"Fredoka One",cursive', fontSize: 22, color: 'var(--text)', marginBottom: 8 }}>Selecciona un plan</h2>
                <p style={{ fontSize: 13, color: 'var(--text-3)', maxWidth: 280, lineHeight: 1.65 }}>
                  Despliega una unidad de <strong style={{ color: g1 }}>{activeSubjData.name}</strong> y elige un plan de clase para ver todos los detalles.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                {subjectUnits.map((u) => (
                  <span key={u.id} style={{ background: `${g1}12`, color: g1, borderRadius: 8, padding: '5px 13px', fontSize: 11, fontWeight: 700, border: `1px solid ${g1}25` }}>
                    Unidad {u.order} · {u.plans.length} planes
                  </span>
                ))}
              </div>
            </div>
          ) : (
            /* Plan detail */
            <div style={{ paddingBottom: 56 }}>

              {/* Plan hero */}
              <div style={{ padding: '28px 32px 24px', background: `linear-gradient(135deg, ${g1}15, ${g2}08)`, borderBottom: '1px solid var(--border)', marginBottom: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 14 }}>{activeSubjData.emoji}</span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: g1, textTransform: 'uppercase', letterSpacing: '0.09em' }}>
                    {activeSubjData.name} · Unidad {selectedUnitOrder}
                  </span>
                </div>
                <h2 style={{ fontFamily: '"Fredoka One",cursive', fontSize: 26, color: 'var(--text)', lineHeight: 1.15, marginBottom: 16 }}>
                  {selectedPlanObj.title}
                </h2>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {[
                    { icon: <Clock size={12} />,       text: `${selectedPlanObj.totalDuration} min` },
                    { icon: <CalendarDays size={12} />, text: selectedPlanObj.date },
                    { icon: <Target size={12} />,       text: `${selectedPlanObj.objectives.length} indicadores` },
                    { icon: <Wrench size={12} />,       text: `${selectedPlanObj.activities.length} momentos` },
                  ].map((b, i) => (
                    <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'var(--surface)', borderRadius: 9, padding: '5px 12px', fontSize: 11, fontWeight: 700, color: 'var(--text-2)', border: '1px solid var(--border)' }}>
                      <span style={{ color: g1 }}>{b.icon}</span> {b.text}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ padding: '0 32px', display: 'flex', flexDirection: 'column', gap: 28 }}>

                {/* Indicadores de logro */}
                <section>
                  <SectionHeader icon={<Target size={14} color={g1} />} bg={`${g1}18`} title="Indicadores de logro" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {selectedPlanObj.objectives.map((o, i) => (
                      <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 16px', background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)', alignItems: 'flex-start' }}>
                        <span style={{ width: 22, height: 22, borderRadius: 7, background: `${g1}18`, color: g1, fontSize: 11, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6 }}>{o}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Tres momentos */}
                <section>
                  <SectionHeader icon={<Wrench size={14} color="#24E5D2" />} bg="#24E5D218" title="Tres momentos de la clase" />
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
                    {selectedPlanObj.activities.map((act, i) => {
                      const meta = MOMENT_META[act.moment];
                      return (
                        <div key={i} style={{ borderRadius: 18, overflow: 'hidden', border: `1.5px solid ${meta.color}28`, boxShadow: `0 4px 18px ${meta.color}12` }}>
                          <div style={{ padding: '14px 16px', background: meta.bg, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ fontSize: 20 }}>{meta.icon}</span>
                            <div style={{ flex: 1 }}>
                              <p style={{ fontSize: 13, fontWeight: 800, color: meta.color }}>{meta.label}</p>
                              <p style={{ fontSize: 11, color: meta.color, opacity: 0.7, fontWeight: 700 }}>{act.duration} min</p>
                            </div>
                            <div style={{ background: `${meta.color}20`, borderRadius: 9, padding: '4px 9px', fontSize: 11, fontWeight: 900, color: meta.color }}>
                              {act.duration}′
                            </div>
                          </div>
                          <div style={{ padding: '14px 16px', background: 'var(--surface)' }}>
                            <p style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.7 }}>{act.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Recursos didácticos */}
                <section>
                  <SectionHeader icon={<BookOpen size={14} color="#d49520" />} bg="#FFCB7718" title="Recursos didácticos" />
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {selectedPlanObj.resources.map((r, i) => (
                      <span key={i} style={{ background: `${g1}12`, color: g1, borderRadius: 10, padding: '7px 14px', fontSize: 12, fontWeight: 700, border: `1px solid ${g1}22` }}>
                        📌 {r}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Evaluación */}
                <section>
                  <SectionHeader icon={<CheckSquare size={14} color="#45a852" />} bg="#6ECB7A18" title="Evaluación" />
                  <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '18px 20px', borderLeftWidth: 4, borderLeftStyle: 'solid', borderLeftColor: g1, boxShadow: `inset 0 0 0 1px var(--border)` }}>
                    <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{selectedPlanObj.evaluation}</p>
                  </div>
                </section>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
