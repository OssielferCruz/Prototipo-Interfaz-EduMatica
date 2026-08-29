import { useState } from 'react';
import { Check, Lock, Trophy } from 'lucide-react';
import type { User, Lesson, Subject } from '../types';
import { SUBJECTS } from '../data';
import LessonDetail from '../components/LessonDetail';

interface Props {
  user: User;
  setUser: (u: User) => void;
  activeSubject: string;
  setActiveSubject: (id: string) => void;
}

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

const GRADE_LABEL = ['','1er','2do','3er','4to','5to','6to'];

/* ─── Map constants ─── */
const MAP_W   = 300;
const PAD_L   = 130;
const PAD_R   = 130;
const TOTAL_W = MAP_W + PAD_L + PAD_R; // 560
const ROW_H   = 145;
const NR      = 46;

const WAVE = [0.50, 0.72, 0.86, 0.72, 0.50, 0.28, 0.14, 0.28];

function nodeX(i: number) { return WAVE[i % WAVE.length] * MAP_W + PAD_L; }
function nodeY(i: number) { return 90 + i * ROW_H; }

type NodeState = 'done' | 'current' | 'locked';

function getState(idx: number, lessons: { id: string }[], completedLessons: string[]): NodeState {
  if (completedLessons.includes(lessons[idx].id)) return 'done';
  const prevDone = idx === 0 || completedLessons.includes(lessons[idx - 1].id);
  return prevDone ? 'current' : 'locked';
}

/* ─── Subject-themed map backgrounds ─── */
function MapBackground({ subject, totalH }: { subject: Subject; totalH: number }) {
  const color = subject.color;
  const W = TOTAL_W;
  const H = totalH;

  if (subject.id === 'matematica') {
    const symbols = ['÷', '×', '+', '−', '=', '√', 'π', '∑', '%', '∞', '²'];
    const pos: [number, number, number, number][] = [
      [0.07, 0.04, -12, 28], [0.91, 0.06,  8, 22], [0.16, 0.12,  5, 20],
      [0.80, 0.15, -8, 26], [0.05, 0.21,  3, 24], [0.93, 0.24,-15, 18],
      [0.19, 0.30, 12, 22], [0.78, 0.34, -5, 24], [0.09, 0.40,  7, 20],
      [0.88, 0.43, 10, 26], [0.22, 0.49,-10, 18], [0.75, 0.52,  8, 22],
      [0.06, 0.58, 15, 24], [0.92, 0.62,-12, 20], [0.17, 0.68, -3, 26],
      [0.82, 0.71,  6, 22], [0.11, 0.77,  8, 20], [0.87, 0.80,-10, 24],
      [0.24, 0.86, 11, 18], [0.73, 0.90, -7, 22], [0.08, 0.94,  4, 26],
      [0.90, 0.96, -9, 20], [0.50, 0.02, 13, 16], [0.40, 0.97, -5, 18],
    ];
    return (
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <defs>
          <pattern id="mathGrid" width={60} height={60} patternUnits="userSpaceOnUse">
            <path d="M60,0 L0,0 0,60" fill="none" stroke={color} strokeWidth={0.5} opacity={0.06} />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#mathGrid)" />
        {pos.map(([xf, yf, rot, sz], i) => (
          <text key={i} x={xf * W} y={yf * H} fill={color} opacity={0.11} fontSize={sz}
            fontFamily='"Fredoka One", cursive' textAnchor="middle" dominantBaseline="middle"
            transform={`rotate(${rot}, ${xf * W}, ${yf * H})`}>
            {symbols[i % symbols.length]}
          </text>
        ))}
        {([[ 0.35, 0.08 ], [0.65, 0.19], [0.28, 0.45], [0.70, 0.63], [0.38, 0.82]] as [number,number][]).map(([xf, yf], i) => (
          <circle key={`c${i}`} cx={xf * W} cy={yf * H} r={14 + i * 3}
            fill="none" stroke={color} strokeWidth={1.2} opacity={0.07} />
        ))}
        {([[ 0.62, 0.38 ], [0.15, 0.55], [0.80, 0.77]] as [number,number][]).map(([xf, yf], i) => (
          <rect key={`s${i}`} x={xf * W - 10} y={yf * H - 10} width={20} height={20}
            fill="none" stroke={color} strokeWidth={1} opacity={0.07}
            transform={`rotate(30, ${xf * W}, ${yf * H})`} />
        ))}
      </svg>
    );
  }

  if (subject.id === 'lengua') {
    const letters = ['A', 'B', 'Z', 'ñ', 'á', 'é', 'Abc', 'ó', 'Leer'];
    const pos: [number, number, number, number][] = [
      [0.08, 0.05,-10, 26], [0.88, 0.08,  6, 22], [0.18, 0.14,  4, 20],
      [0.78, 0.18, -7, 24], [0.06, 0.24,  2, 28], [0.91, 0.28,-12, 18],
      [0.20, 0.34, 10, 22], [0.76, 0.38, -4, 24], [0.10, 0.44,  6, 20],
      [0.86, 0.47,  9, 26], [0.23, 0.54,-11, 18], [0.72, 0.57,  7, 22],
      [0.07, 0.63, 13, 24], [0.89, 0.66,-10, 20], [0.19, 0.72, -2, 26],
      [0.79, 0.75,  5, 22], [0.12, 0.81,  8, 20], [0.84, 0.84, -9, 24],
      [0.26, 0.90, 11, 18], [0.70, 0.93, -6, 22], [0.50, 0.03, 14, 16],
    ];
    const numLines = Math.floor(H / 50);
    return (
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {Array.from({ length: numLines }).map((_, i) => (
          <line key={`l${i}`} x1={20} y1={(i + 1) * 50} x2={W - 20} y2={(i + 1) * 50}
            stroke={color} strokeWidth={0.8} opacity={0.055} />
        ))}
        {pos.map(([xf, yf, rot, sz], i) => (
          <text key={i} x={xf * W} y={yf * H} fill={color} opacity={0.10} fontSize={sz}
            fontFamily='"Fredoka One", cursive' textAnchor="middle" dominantBaseline="middle"
            transform={`rotate(${rot}, ${xf * W}, ${yf * H})`}>
            {letters[i % letters.length]}
          </text>
        ))}
        {([[ 0.42, 0.10 ], [0.58, 0.55], [0.38, 0.78]] as [number,number][]).map(([xf, yf], i) => {
          const cx = xf * W, cy = yf * H, r = 20 + i * 5;
          return (
            <g key={`b${i}`} opacity={0.07}>
              <circle cx={cx} cy={cy} r={r} fill={color} />
              <polygon points={`${cx - 5},${cy + r} ${cx - 12},${cy + r + 12} ${cx + 2},${cy + r}`} fill={color} />
            </g>
          );
        })}
      </svg>
    );
  }

  if (subject.id === 'valores') {
    const hPos: [number, number, number, number][] = [
      [0.08, 0.05,-10, 28], [0.88, 0.07,  5, 22], [0.18, 0.14, -5, 32],
      [0.78, 0.18,  8, 24], [0.06, 0.24,  3, 20], [0.91, 0.27,-10, 28],
      [0.22, 0.33, 12, 26], [0.75, 0.37, -6, 22], [0.10, 0.43,  7, 30],
      [0.85, 0.46, -8, 24], [0.25, 0.52,-12, 20], [0.70, 0.55,  5, 28],
      [0.07, 0.61, 14, 26], [0.88, 0.64,-11, 22], [0.20, 0.70, -3, 30],
      [0.78, 0.73,  6, 24], [0.13, 0.79,  9, 20], [0.83, 0.82,-10, 28],
      [0.28, 0.88, 11, 22], [0.68, 0.91, -7, 26],
    ];
    const sPos: [number, number, number, number][] = [
      [0.50, 0.10, 0, 20], [0.35, 0.25, 5, 16], [0.65, 0.42,-5, 22],
      [0.45, 0.60, 3, 18], [0.55, 0.75,-3, 20], [0.40, 0.88, 7, 16],
      [0.60, 0.30,-7, 18], [0.30, 0.68, 4, 22], [0.70, 0.82,-4, 16],
    ];
    return (
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {hPos.map(([xf, yf, rot, sz], i) => (
          <text key={`h${i}`} x={xf * W} y={yf * H} fill={color} opacity={0.10} fontSize={sz}
            fontFamily="serif" textAnchor="middle" dominantBaseline="middle"
            transform={`rotate(${rot}, ${xf * W}, ${yf * H})`}>
            ♥
          </text>
        ))}
        {sPos.map(([xf, yf, rot, sz], i) => (
          <text key={`st${i}`} x={xf * W} y={yf * H} fill={color} opacity={0.09} fontSize={sz}
            textAnchor="middle" dominantBaseline="middle"
            transform={`rotate(${rot}, ${xf * W}, ${yf * H})`}>
            ★
          </text>
        ))}
        {([[ 0.42, 0.16 ], [0.57, 0.48], [0.38, 0.74], [0.62, 0.88]] as [number,number][]).map(([xf, yf], i) => {
          const cx = xf * W, cy = yf * H, r = 16 + i * 2;
          return (
            <g key={`sm${i}`} opacity={0.08} fill={color}>
              <circle cx={cx} cy={cy} r={r} />
              <circle cx={cx - 5} cy={cy - 5} r={2.5} fill="#fff" />
              <circle cx={cx + 5} cy={cy - 5} r={2.5} fill="#fff" />
              <path d={`M${cx - 6},${cy + 4} Q${cx},${cy + 10} ${cx + 6},${cy + 4}`}
                stroke="#fff" strokeWidth={2} fill="none" strokeLinecap="round" />
            </g>
          );
        })}
      </svg>
    );
  }

  if (subject.id === 'identidad') {
    const starPts = [
      [0.08, 0.05], [0.88, 0.07], [0.20, 0.14], [0.78, 0.18], [0.06, 0.25],
      [0.91, 0.28], [0.22, 0.35], [0.75, 0.40], [0.10, 0.46], [0.85, 0.50],
      [0.25, 0.57], [0.70, 0.60], [0.07, 0.66], [0.88, 0.70], [0.19, 0.76],
      [0.78, 0.80], [0.14, 0.84], [0.83, 0.88], [0.30, 0.92], [0.65, 0.95],
      [0.50, 0.03], [0.40, 0.97],
    ] as [number, number][];
    return (
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <defs>
          <pattern id="flagStripes" width={90} height={90} patternUnits="userSpaceOnUse" patternTransform="rotate(-12)">
            <rect width={30} height={90} fill="#1565C0" opacity={0.04} />
            <rect x={30} width={30} height={90} fill="#ffffff" opacity={0.04} />
            <rect x={60} width={30} height={90} fill="#1565C0" opacity={0.04} />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#flagStripes)" />
        {starPts.map(([xf, yf], i) => (
          <text key={i} x={xf * W} y={yf * H} fill={color} opacity={0.12}
            fontSize={18 + (i % 3) * 4} fontFamily='"Fredoka One", cursive'
            textAnchor="middle" dominantBaseline="middle"
            transform={`rotate(${(i * 17) % 30 - 15}, ${xf * W}, ${yf * H})`}>
            ★
          </text>
        ))}
        {([[ 0.25, 0.95 ], [0.75, 0.92]] as [number, number][]).map(([xf, yf], i) => {
          const cx = xf * W, cy = yf * H;
          return (
            <polygon key={`v${i}`}
              points={`${cx - 35},${cy} ${cx},${cy - 50} ${cx + 35},${cy}`}
              fill={color} opacity={0.05} />
          );
        })}
        {([[ 0.50, 0.50 ], [0.50, 0.25], [0.50, 0.75]] as [number,number][]).map(([xf, yf], i) => (
          <text key={`ni${i}`} x={xf * W} y={yf * H} fill={color} opacity={0.04}
            fontSize={72} fontFamily='"Fredoka One", cursive'
            textAnchor="middle" dominantBaseline="middle" fontWeight="bold">
            NI
          </text>
        ))}
      </svg>
    );
  }

  if (subject.id === 'ciencias') {
    return (
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {([[ 0.15, 0.08 ], [0.80, 0.22], [0.20, 0.48], [0.78, 0.65], [0.18, 0.82], [0.75, 0.90]] as [number,number][]).map(([xf, yf], i) => {
          const cx = xf * W, cy = yf * H;
          const r = 22 + i * 3;
          return (
            <g key={`atom${i}`} opacity={0.09} stroke={color} fill="none" strokeWidth={1.2}>
              <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.4} />
              <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.4} transform={`rotate(60, ${cx}, ${cy})`} />
              <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.4} transform={`rotate(120, ${cx}, ${cy})`} />
              <circle cx={cx} cy={cy} r={4} fill={color} />
              <circle cx={cx + r} cy={cy} r={2.5} fill={color} />
              <circle cx={cx - r * 0.5} cy={cy - r * 0.35} r={2.5} fill={color} />
            </g>
          );
        })}
        {([[ 0.45, 0.05 ], [0.55, 0.16], [0.38, 0.30], [0.65, 0.38], [0.42, 0.55], [0.60, 0.72], [0.35, 0.87], [0.68, 0.94]] as [number,number][]).map(([xf, yf], i) => (
          <text key={`st${i}`} x={xf * W} y={yf * H} fill={color} opacity={0.10}
            fontSize={16 + (i % 3) * 4} textAnchor="middle" dominantBaseline="middle"
            transform={`rotate(${(i * 11) % 20 - 10}, ${xf * W}, ${yf * H})`}>
            {i % 3 === 0 ? '★' : i % 3 === 1 ? '●' : '◆'}
          </text>
        ))}
        {([[ 0.48, 0.36 ], [0.52, 0.68]] as [number,number][]).map(([xf, yf], i) => (
          <text key={`mol${i}`} x={xf * W} y={yf * H} fill={color} opacity={0.08}
            fontSize={20} fontFamily='"Fredoka One", cursive' textAnchor="middle" dominantBaseline="middle">
            {i === 0 ? 'H₂O' : 'CO₂'}
          </text>
        ))}
        {([[ 0.07, 0.35 ], [0.90, 0.55], [0.12, 0.72]] as [number,number][]).map(([xf, yf], i) => {
          const cx = xf * W, cy = yf * H;
          return (
            <path key={`lf${i}`}
              d={`M${cx},${cy} C${cx + 20},${cy - 25} ${cx + 30},${cy - 5} ${cx},${cy} C${cx + 15},${cy + 15} ${cx + 5},${cy + 20} ${cx},${cy}`}
              fill={color} opacity={0.07} transform={`rotate(${i * 45 - 20}, ${cx}, ${cy})`} />
          );
        })}
      </svg>
    );
  }

  return null;
}

/* ─── Milestone marker (every 3 lessons) ─── */
function Milestone({ idx, subject, totalDone }: { idx: number; subject: Subject; totalDone: number }) {
  const lessonsBefore = idx * 3;
  const cleared = totalDone >= lessonsBefore;
  return (
    <div
      className="flex items-center gap-3 px-5 py-3 rounded-2xl mx-auto anim-fade-up"
      style={{
        background: cleared ? `${subject.color}18` : 'var(--bg)',
        border: `2px solid ${cleared ? subject.color : 'var(--border)'}`,
        width: 'fit-content',
      }}
    >
      <span style={{ fontSize: 20 }}>🏆</span>
      <span className="text-sm font-bold" style={{ color: cleared ? subject.color : 'var(--text-3)' }}>
        Sección completada
      </span>
      {cleared && <span className="text-yellow-400 text-base">⭐</span>}
    </div>
  );
}

/* ─── Lesson Map ─── */
function LessonMap({
  lessons, subject, completedLessons, selectedId, onSelect,
}: {
  lessons: Lesson[];
  subject: Subject;
  completedLessons: string[];
  selectedId: string | null;
  onSelect: (l: Lesson) => void;
}) {
  const totalH = 130 + lessons.length * ROW_H;
  const doneCnt = completedLessons.filter((id) => lessons.some((l) => l.id === id)).length;
  const [g1, g2] = SUBJECT_GRADIENTS[subject.id] ?? [subject.color, subject.color];

  return (
    <div
      className="relative mx-auto anim-fade-up"
      style={{ width: TOTAL_W, height: totalH, maxWidth: '100%' }}
    >
      {/* ── Subject-themed background ── */}
      <MapBackground subject={subject} totalH={totalH} />

      {/* Start banner */}
      <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 2 }}>
        <div style={{
          background: `linear-gradient(135deg, ${g1}, ${g2})`,
          borderRadius: 100, padding: '8px 22px',
          display: 'inline-flex', alignItems: 'center', gap: 7,
          boxShadow: `0 6px 18px ${g1}55`,
        }}>
          <span style={{ fontSize: 17 }}>🚀</span>
          <span style={{ fontFamily: '"Fredoka One",cursive', fontSize: 15, color: '#fff' }}>¡Comenzar!</span>
        </div>
      </div>

      {/* ── SVG path ── */}
      <svg
        width={TOTAL_W} height={totalH}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible', zIndex: 1 }}
      >
        <defs>
          <filter id="glowLine" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glowNode" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {lessons.slice(1).map((_, i) => {
          const x1 = nodeX(i),   y1 = nodeY(i);
          const x2 = nodeX(i+1), y2 = nodeY(i+1);
          const midY = (y1 + y2) / 2;
          const d = `M${x1},${y1} C${x1},${midY} ${x2},${midY} ${x2},${y2}`;
          const segDone = completedLessons.includes(lessons[i].id);

          return (
            <g key={i}>
              {segDone && (
                <path d={d} fill="none"
                  stroke={subject.color} strokeWidth={14} strokeLinecap="round"
                  opacity={0.15} filter="url(#glowLine)"
                />
              )}
              <path
                d={d} fill="none"
                stroke={segDone ? subject.color : '#ccc8c0'}
                strokeWidth={segDone ? 8 : 4}
                strokeLinecap="round"
                strokeDasharray={segDone ? undefined : '10 9'}
                opacity={segDone ? 0.92 : 0.50}
              />
              {segDone && (
                <path d={d} fill="none"
                  stroke="rgba(255,255,255,0.32)" strokeWidth={2.5}
                  strokeLinecap="round"
                />
              )}
              {segDone && [0.33, 0.67].map((t, pi) => {
                const mt = 1 - t;
                const cx = mt * mt * x1 + 2 * mt * t * ((x1 + x2) / 2) + t * t * x2;
                const cy = mt * mt * y1 + 2 * mt * t * midY + t * t * y2;
                return (
                  <circle key={pi} cx={cx} cy={cy} r={4.5}
                    fill="#fff" stroke={subject.color} strokeWidth={2} opacity={0.88} />
                );
              })}
            </g>
          );
        })}
      </svg>

      {/* ── Nodes ── */}
      {lessons.map((lesson, idx) => {
        const cx     = nodeX(idx);
        const cy     = nodeY(idx);
        const state  = getState(idx, lessons, completedLessons);
        const isSelected = selectedId === lesson.id;
        const isLeft  = cx < PAD_L + MAP_W / 2;

        const nodeBg =
          state === 'done'    ? `linear-gradient(145deg, ${g1}ee, ${g2}cc)` :
          state === 'current' ? `linear-gradient(135deg, ${g1}, ${g2})` :
                                'linear-gradient(145deg, #e8e4de, #d4d0ca)';

        const nodeShadow =
          state === 'done'    ? `0 6px 20px ${g1}55, 0 2px 6px rgba(0,0,0,0.15), inset 0 -3px 0 rgba(0,0,0,0.12)` :
          state === 'current' ? `0 10px 30px ${g1}65, 0 3px 10px rgba(0,0,0,0.2)` :
                                '0 2px 6px rgba(0,0,0,0.08), inset 0 -2px 0 rgba(0,0,0,0.06)';

        return (
          <div
            key={lesson.id}
            style={{ position: 'absolute', left: cx - NR, top: cy - NR, animationDelay: `${idx * 0.06}s`, zIndex: 2 }}
            className="anim-fade-up"
          >
            {/* Floating icon above node */}
            {state !== 'locked' && (
              <div style={{
                position: 'absolute', top: -36, left: '50%', transform: 'translateX(-50%)',
                fontSize: 22, lineHeight: 1,
                animation: state === 'current' ? 'nodeFloat 2.2s ease-in-out infinite' : undefined,
              }}>
                {lesson.icon}
              </div>
            )}

            {/* Pulse ring for current node */}
            {state === 'current' && (
              <div className="absolute rounded-full" style={{
                inset: -10,
                border: `4px solid ${subject.color}`,
                animation: 'nodePulseRing 1.8s ease-out infinite',
                borderRadius: '50%',
              }} />
            )}

            {/* Selection ring */}
            {isSelected && (
              <div className="absolute rounded-full" style={{
                inset: -8,
                background: `${subject.color}22`,
                borderRadius: '50%',
                border: `3px solid ${subject.color}`,
                boxShadow: `0 0 16px ${subject.color}55`,
              }} />
            )}

            {/* Node button */}
            <button
              onClick={() => onSelect(lesson)}
              className={`flex items-center justify-center rounded-full transition-all press ${state === 'current' ? 'node-float' : ''}`}
              style={{
                width: NR * 2, height: NR * 2,
                background: nodeBg,
                boxShadow: nodeShadow,
                border: state === 'done'    ? '3px solid rgba(255,255,255,0.42)' :
                        state === 'current' ? '3px solid rgba(255,255,255,0.30)' :
                                              '2px solid rgba(255,255,255,0.15)',
                position: 'relative', overflow: 'visible',
              }}
            >
              {/* Inner ring */}
              {state !== 'locked' && (
                <div style={{
                  position: 'absolute', inset: 6,
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.28)',
                }} />
              )}
              {state === 'done'    && <Check  size={25} color="#fff" strokeWidth={3} style={{ position: 'relative', zIndex: 1 }} />}
              {state === 'locked'  && <Lock   size={20} color="#b0a898" strokeWidth={2} />}
              {state === 'current' && (
                <span style={{ fontFamily: '"Fredoka One", cursive', color: 'white', fontSize: 25, position: 'relative', zIndex: 1 }}>{idx + 1}</span>
              )}
            </button>

            {/* Done node sparkles */}
            {state === 'done' && (
              <>
                {([[-NR - 2, -12], [-NR + 6, -NR - 4], [NR - 2, -NR - 2], [NR + 6, -10]] as [number,number][]).map(([ox, oy], si) => (
                  <div key={si} style={{
                    position: 'absolute',
                    left: NR + ox, top: NR + oy,
                    fontSize: 11, opacity: 0.72,
                    animationDelay: `${si * 0.3}s`,
                  }} className="node-float">
                    ⭐
                  </div>
                ))}
              </>
            )}

            {/* Floating label card */}
            <div
              className="absolute anim-fade-in"
              style={{
                top: NR - 25,
                left:  isLeft  ? NR * 2 + 12 : undefined,
                right: !isLeft ? NR * 2 + 12 : undefined,
                width: 126,
                animationDelay: `${idx * 0.06 + 0.15}s`,
              }}
            >
              <div
                className="px-3 py-2 shadow-md"
                style={{
                  background: isSelected ? `${subject.color}14` : 'var(--surface)',
                  border: `1.5px solid ${isSelected ? subject.color + '80' : 'var(--border)'}`,
                  borderRadius: 14,
                  boxShadow: isSelected ? `0 4px 14px ${subject.color}25` : '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                <p style={{
                  fontSize: 13, fontWeight: 800, lineHeight: 1.3,
                  color: state === 'locked' ? 'var(--text-3)' : 'var(--text)',
                  fontFamily: '"Fredoka One", cursive',
                }}>
                  {lesson.title}
                </p>
                <p style={{
                  fontSize: 11, marginTop: 3,
                  color: state === 'done' ? subject.color : state === 'current' ? 'var(--text-2)' : 'var(--text-3)',
                  fontWeight: state === 'done' ? 700 : 500,
                }}>
                  {state === 'done' ? '✓ Completada' : state === 'current' ? '▶ Disponible' : '🔒 Bloqueada'}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      {/* ── Milestone markers every 3 lessons ── */}
      {[3, 6].map((n) => {
        if (n >= lessons.length) return null;
        const y = nodeY(n - 1) + NR + 18;
        return (
          <div key={n} style={{ position: 'absolute', top: y, left: 0, right: 0, zIndex: 2 }}>
            <Milestone idx={Math.floor(n / 3)} subject={subject} totalDone={doneCnt} />
          </div>
        );
      })}
    </div>
  );
}

/* ─── Main component ─── */
export default function Lessons({ user, setUser, activeSubject, setActiveSubject }: Props) {
  const [activeGrade, setActiveGrade] = useState(user.grade);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const subject = SUBJECTS.find((s) => s.id === activeSubject) ?? SUBJECTS[0];
  const lessons  = subject.grades[activeGrade] ?? [];
  const openLesson = selectedLessonId ? lessons.find((l) => l.id === selectedLessonId) ?? null : null;
  const openIdx  = openLesson ? lessons.indexOf(openLesson) : -1;

  function completeLesson(id: string) {
    if (!user.completedLessons.includes(id)) {
      setUser({ ...user, completedLessons: [...user.completedLessons, id], xp: user.xp + 30 });
    }
  }

  const doneCount = lessons.filter((l) => user.completedLessons.includes(l.id)).length;
  const [g1] = SUBJECT_GRADIENTS[subject.id] ?? [subject.color, subject.color];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

      {/* ═══ COMPACT NAV BAR ═══ */}
      <div style={{
        flexShrink: 0, height: 56, padding: '0 20px',
        background: 'var(--surface)', borderBottom: '1.5px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 6, overflowX: 'auto',
      }}>
        {SUBJECTS.map((s) => {
          const isActive = s.id === activeSubject;
          const [sc1, sc2] = SUBJECT_GRADIENTS[s.id] ?? [s.color, s.color];
          return (
            <button key={s.id}
              onClick={() => { setActiveSubject(s.id); setSelectedLessonId(null); }}
              style={{
                background: isActive ? `linear-gradient(135deg, ${sc1}, ${sc2})` : 'var(--bg)',
                color: isActive ? 'white' : 'var(--text-2)',
                borderRadius: 100, padding: '7px 14px', fontSize: 13, fontWeight: 800,
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 5,
                boxShadow: isActive ? `0 2px 10px ${sc1}50` : 'none',
                flexShrink: 0, transition: 'all 0.15s ease',
              }}>
              <span style={{ fontSize: 14 }}>{s.emoji}</span>
              {SHORT_LABELS[s.id] ?? s.name}
            </button>
          );
        })}

        <div style={{ width: 1, height: 24, background: 'var(--border)', margin: '0 6px', flexShrink: 0 }} />

        {[1,2,3,4,5,6].map((g) => (
          <button key={g}
            onClick={() => { setActiveGrade(g); setSelectedLessonId(null); }}
            style={{
              background: activeGrade === g ? subject.color : 'transparent',
              color: activeGrade === g ? 'white' : 'var(--text-3)',
              borderRadius: 100, padding: '5px 10px', fontSize: 12, fontWeight: 800,
              border: `1.5px solid ${activeGrade === g ? subject.color : 'var(--border)'}`,
              cursor: 'pointer', flexShrink: 0, transition: 'all 0.15s ease',
            }}>
            {GRADE_LABEL[g]} {g === user.grade ? '⭐' : ''}
          </button>
        ))}

        <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
          <div style={{
            background: `${g1}18`, border: `1.5px solid ${g1}40`,
            borderRadius: 100, padding: '5px 14px',
            fontSize: 12, fontWeight: 800, color: subject.color,
            display: 'flex', alignItems: 'center', gap: 5,
          }}>
            <Trophy size={13} strokeWidth={2.5} />
            {doneCount}/{lessons.length} lecciones
          </div>
        </div>
      </div>

      {/* ═══ MAP AREA ═══ */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', position: 'relative' }}>
        <div style={{
          flex: 1, overflowY: 'auto', overflowX: 'hidden',
          background: `radial-gradient(ellipse at 50% 20%, ${subject.color}16 0%, transparent 60%), var(--bg)`,
          padding: '12px 0 48px',
        }}>
          {lessons.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-3)' }}>
              <span style={{ fontSize: 48 }}>📚</span>
              <p style={{ fontFamily: '"Fredoka One",cursive', fontSize: 18, marginTop: 12 }}>Sin lecciones para este grado</p>
            </div>
          ) : (
            <LessonMap
              lessons={lessons}
              subject={subject}
              completedLessons={user.completedLessons}
              selectedId={selectedLessonId}
              onSelect={(l) => setSelectedLessonId(selectedLessonId === l.id ? null : l.id)}
            />
          )}
        </div>
      </div>

      {/* ═══ LESSON DETAIL MODAL ═══ */}
      {openLesson && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedLessonId(null); }}
          style={{
            position: 'fixed', inset: 0, zIndex: 50,
            background: 'rgba(10,20,30,0.78)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div style={{
            width: '100%', maxWidth: 700, maxHeight: '90vh',
            background: 'var(--surface)', borderRadius: 28,
            overflow: 'hidden', display: 'flex', flexDirection: 'column',
            boxShadow: '0 28px 90px rgba(0,0,0,0.45)',
            animation: 'scaleIn 0.2s ease',
          }}>
            <LessonDetail
              lesson={openLesson}
              subject={subject}
              grade={activeGrade}
              isCompleted={user.completedLessons.includes(openLesson.id)}
              lessonIndex={openIdx}
              totalLessons={lessons.length}
              onClose={() => setSelectedLessonId(null)}
              onComplete={completeLesson}
              onPrev={() => openIdx > 0 && setSelectedLessonId(lessons[openIdx - 1].id)}
              onNext={() => openIdx < lessons.length - 1 && setSelectedLessonId(lessons[openIdx + 1].id)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
