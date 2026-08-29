import { X, Clock, Zap, CheckCircle, ChevronLeft, ChevronRight, Lightbulb, BookOpen, Target, Star, PenLine } from 'lucide-react';
import type { Lesson, Subject } from '../types';

interface Props {
  lesson: Lesson;
  subject: Subject;
  grade: number;
  isCompleted: boolean;
  lessonIndex: number;
  totalLessons: number;
  onClose: () => void;
  onComplete: (id: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

interface ContentSection {
  type: 'intro' | 'concept' | 'tip' | 'example' | 'practice';
  title: string;
  body: string;
  icon: React.ElementType;
  exercises?: string[];
}

function getPracticeExercises(lesson: Lesson, subject: Subject, grade: number): string[] {
  const t = lesson.title;

  if (subject.id === 'matematica') {
    if (grade <= 2) return [
      `Cuenta y escribe: ¿Cuántos son 8 + 5? ___`,
      `Resta: 20 − 7 = ___`,
      `Escribe el número que sigue: 14, 16, 18, ___`,
    ];
    if (grade <= 4) return [
      `Multiplica: 7 × 8 = ___`,
      `Divide: 56 ÷ 7 = ___`,
      `Si hay 5 cajas con 12 lápices cada una, ¿cuántos lápices hay en total? ___`,
    ];
    return [
      `Calcula el área de un rectángulo de 6 cm × 9 cm. Resultado: ___`,
      `¿Cuánto es el 25% de 80? ___`,
      `Relacionado con "${t}": resuelve x + 15 = 42. Entonces x = ___`,
    ];
  }

  if (subject.id === 'lengua') return [
    `Escribe una oración completa usando una idea de "${t}".`,
    `Identifica el verbo: "Los estudiantes leen libros interesantes." Verbo: ___`,
    `Ordena alfabéticamente: manzana, pera, banana, uva → ___`,
  ];

  if (subject.id === 'valores') return [
    `Escribe dos ejemplos de cómo aplicar "${t}" en tu casa.`,
    `¿Cómo reaccionarías si ves a alguien siendo excluido? Describe tu respuesta.`,
    `Describe una situación de esta semana donde mostraste este valor.`,
  ];

  if (subject.id === 'identidad') return [
    `¿En qué año se independizó Nicaragua de España? ___`,
    `Nombra los colores de la bandera de Nicaragua: ___, ___, ___`,
    `¿Qué personaje histórico está relacionado con "${t}"? Escribe su nombre.`,
  ];

  if (subject.id === 'ciencias') return [
    `Nombra los tres estados del agua: ___, ___, ___`,
    `Menciona 2 animales y 2 plantas que encuentras en tu comunidad.`,
    `Relacionado con "${t}": describe una observación que puedas hacer en tu patio.`,
  ];

  return [
    `Responde con tus propias palabras: ¿qué aprendiste hoy sobre "${t}"?`,
    `Escribe 3 palabras clave de esta lección: ___, ___, ___`,
    `¿Cómo aplicarías este conocimiento en tu vida diaria?`,
  ];
}

function buildContent(lesson: Lesson, subject: Subject, grade: number): ContentSection[] {
  const isMath = subject.id === 'matematica';
  const isLang = subject.id === 'lengua';
  const isSci  = subject.id === 'ciencias';
  const isVal  = subject.id === 'valores';

  const intro = isMath
    ? `En Matemática de ${grade}° grado estudiaremos: "${lesson.title}". ${lesson.description}. Dominar este tema te ayudará a resolver problemas reales de la vida cotidiana — desde ir al mercado hasta construir cosas — y a prepararte para contenidos más avanzados.`
    : isLang
    ? `En Lengua y Literatura aprenderemos sobre "${lesson.title}". ${lesson.description}. Este conocimiento mejorará tu capacidad de leer, escribir y comunicarte mejor con tus amigos, familia y maestra cada día.`
    : isSci
    ? `En Ciencias Naturales exploraremos "${lesson.title}". ${lesson.description}. Comprender la naturaleza y el mundo que nos rodea nos permite cuidarlo y admirar la maravillosa biodiversidad de Nicaragua.`
    : isVal
    ? `En Creciendo en Valores reflexionaremos sobre "${lesson.title}". ${lesson.description}. Estos valores son la base para ser personas buenas, ciudadanos responsables y amigos leales en nuestra comunidad.`
    : `En Identidad Nacional conoceremos "${lesson.title}". ${lesson.description}. Conocer nuestra historia, héroes y cultura nos hace mejores y más orgullosos nicaragüenses.`;

  const conceptMap: Record<string, string> = {
    matematica: `Las matemáticas son herramientas que usamos para ordenar y entender el mundo. En "${lesson.title}" aprenderás paso a paso los fundamentos con ejemplos sencillos. La clave es practicar con paciencia: cada error es una oportunidad de aprender. Recuerda que todos los grandes científicos e ingenieros comenzaron aprendiendo exactamente lo que tú estás aprendiendo hoy.`,
    lengua:     `El lenguaje es el puente que conecta a las personas. En "${lesson.title}" descubriremos cómo la lengua española nos permite expresar ideas, sentimientos y sueños. Leer, escribir y hablar bien abre puertas en todos los ámbitos de la vida. Rubén Darío, el poeta más famoso de Nicaragua, también aprendió leyendo un libro a la vez.`,
    valores:    `Los valores son el cimiento de nuestra personalidad. "${lesson.title}" nos enseña cómo relacionarnos con los demás y con nosotros mismos de forma sana y positiva. Practica este valor en tu hogar, en la escuela y en tu barrio — verás cómo cambia la convivencia a tu alrededor.`,
    identidad:  `Conocer nuestra identidad nicaragüense es fundamental para valorar quiénes somos y de dónde venimos. "${lesson.title}" nos acerca a nuestra historia, geografía y cultura. El orgullo patrio nace del conocimiento y del amor a nuestra tierra, su gente y sus tradiciones.`,
    ciencias:   `Las ciencias nos invitan a observar, cuestionar y descubrir. En "${lesson.title}" aprenderemos conceptos clave con experimentos y ejemplos de la naturaleza de Nicaragua. La ciencia no solo ocurre en los laboratorios — ¡la encuentras en cada planta, animal y gota de agua a tu alrededor!`,
  };

  const tipMap: Record<string, string> = {
    matematica: `¿Sabías que las operaciones matemáticas que aprendemos en primaria son la base de todo? Desde construir casas, programar aplicaciones móviles, hasta calcular el precio de la comida — cada operación que dominas es un superpoder que usarás toda la vida. ¡Tú puedes!`,
    lengua:     `¿Sabías que Nicaragua tiene una tradición literaria riquísima? Rubén Darío nació en Metapa (hoy Ciudad Darío) y aprendió a leer desde muy pequeño. Fue el fundador del Modernismo, un movimiento que transformó la literatura en español en todo el mundo. ¡Tu país tiene una herencia literaria enorme!`,
    valores:    `Estudios en todo el mundo demuestran que los niños y niñas que practican valores como el respeto, la solidaridad y la honestidad desde pequeños crecen siendo adultos más felices, con mejores amistades y mayor éxito en su vida. Los valores no son solo palabras — ¡son acciones!`,
    identidad:  `¿Sabías que Nicaragua es el país más grande de Centroamérica? Tiene dos océanos — el Pacífico y el Atlántico — 19 volcanes, el Lago Cocibolca (el más grande de Centroamérica), y una historia llena de héroes que lucharon por la libertad. ¡Tenemos mucho de qué enorgullecernos!`,
    ciencias:   `¿Sabías que Nicaragua es uno de los países con mayor biodiversidad del mundo? Tenemos selvas tropicales, reservas de biosfera, costas en dos océanos y una enorme variedad de animales y plantas. Somos guardianes de un tesoro natural único que debemos conocer y proteger.`,
  };

  const exampleMap: Record<string, string> = {
    matematica: `Situación real: estás en el mercado con 50 córdobas para comprar frutas. Las naranjas cuestan 3 córdobas cada una y los mangos 5 córdobas. Aplica lo aprendido en "${lesson.title}" para calcular cuántas frutas puedes comprar y cuánto dinero te sobra.`,
    lengua:     `Texto de ejemplo relacionado con "${lesson.title}": "La abuela de Ana le enseñó a leer en voz alta cada noche." Identifica el sujeto, el verbo y el complemento. Luego escribe tu propio ejemplo usando personas de tu familia.`,
    valores:    `Escenario real: en el recreo, notas que un compañero nuevo está solo y triste porque no conoce a nadie. ¿Cómo aplicarías "${lesson.title}" en esta situación? Piensa en tres acciones concretas que podrías tomar para que se sienta bienvenido.`,
    identidad:  `En tu comunidad: observa los edificios, nombres de calles, plazas y monumentos a tu alrededor. ¿Puedes identificar algún elemento relacionado con "${lesson.title}"? Los símbolos patrios, comidas típicas y fiestas tradicionales cuentan la historia de quiénes somos.`,
    ciencias:   `Experimento casero: llena un vaso con agua y agrega una cucharada de sal. Revuelve bien. ¿Qué observas? Ahora déjalo al sol durante el día. ¿Qué pasó con el agua? Aplica lo que aprendiste en "${lesson.title}" para explicar el fenómeno. ¡La ciencia está en tu cocina!`,
  };

  return [
    { type: 'intro',   title: '¿Qué aprenderemos hoy?', body: intro,                          icon: BookOpen  },
    { type: 'concept', title: 'Concepto Principal',      body: conceptMap[subject.id] ?? '',   icon: Target    },
    { type: 'tip',     title: '¿Sabías que...?',          body: tipMap[subject.id] ?? '',        icon: Lightbulb },
    { type: 'example', title: 'Ejemplo de la Vida Real',  body: exampleMap[subject.id] ?? '',   icon: Star      },
    {
      type: 'practice',
      title: 'Practica lo Aprendido',
      body: 'Responde los siguientes ejercicios en tu cuaderno:',
      icon: PenLine,
      exercises: getPracticeExercises(lesson, subject, grade),
    },
  ];
}

function getSectionStyle(subjectColor: string): Record<ContentSection['type'], { bg: string; border: string; iconColor: string }> {
  return {
    intro:    { bg: `${subjectColor}12`, border: `${subjectColor}40`, iconColor: subjectColor },
    concept:  { bg: '#f0f9ff',           border: '#b3dff5',           iconColor: '#2584A7'    },
    tip:      { bg: '#fff8e0',           border: '#f0d060',           iconColor: '#d4960a'    },
    example:  { bg: '#edf9f8',           border: '#80e8d8',           iconColor: '#16b5a5'    },
    practice: { bg: '#fff2f8',           border: '#f5b0d8',           iconColor: '#e0509a'    },
  };
}

export default function LessonDetail({
  lesson, subject, grade, isCompleted, lessonIndex, totalLessons,
  onClose, onComplete, onPrev, onNext,
}: Props) {
  const sections = buildContent(lesson, subject, grade);
  const SECTION_STYLE = getSectionStyle(subject.color);
  const progress = Math.round(((lessonIndex + 1) / totalLessons) * 100);

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--surface)', maxHeight: '90vh' }}>

      {/* ── Colorful Gradient Header ── */}
      <div style={{
        background: `linear-gradient(135deg, ${subject.color}ee, ${subject.color}99)`,
        padding: '18px 20px 16px',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative background circles */}
        <div style={{
          position: 'absolute', right: -30, top: -30,
          width: 120, height: 120, borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
        }} />
        <div style={{
          position: 'absolute', right: 30, top: 10,
          width: 60, height: 60, borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
        }} />

        {/* Top row: subject badge + close */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, position: 'relative' }}>
          <span style={{
            background: 'rgba(255,255,255,0.25)',
            color: '#fff', fontWeight: 800, fontSize: 11,
            borderRadius: 100, padding: '3px 12px',
            letterSpacing: '0.07em',
          }}>
            {subject.emoji} {subject.name}
          </span>
          <button onClick={onClose} style={{
            color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.18)',
            borderRadius: 8, padding: 6, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <X size={16} />
          </button>
        </div>

        {/* Large emoji + title */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', position: 'relative' }}>
          <div style={{
            width: 58, height: 58, flexShrink: 0,
            background: 'rgba(255,255,255,0.22)',
            borderRadius: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}>
            {lesson.icon}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{
              fontFamily: '"Fredoka One", cursive',
              fontSize: 22, color: '#fff', lineHeight: 1.2, marginBottom: 5,
            }}>
              {lesson.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, lineHeight: 1.4 }}>{lesson.description}</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Clock size={12} /> {lesson.duration} min
              </span>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Zap size={12} /> +30 XP
              </span>
              {isCompleted && (
                <span style={{ color: '#fff', fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 4 }}>
                  ✓ Completada
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 14, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>
              Lección {lessonIndex + 1} de {totalLessons} · {grade}° Grado
            </span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', fontWeight: 700 }}>{progress}%</span>
          </div>
          <div style={{
            height: 6, background: 'rgba(255,255,255,0.25)', borderRadius: 10, overflow: 'hidden',
          }}>
            <div style={{
              width: `${progress}%`, height: '100%',
              background: 'rgba(255,255,255,0.8)', borderRadius: 10,
              transition: 'width 0.5s ease',
            }} />
          </div>
        </div>
      </div>

      {/* ── Scrollable Content ── */}
      <div
        className="flex-1 p-5 space-y-4"
        style={{
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollbarWidth: 'thin',
          scrollbarColor: `${subject.color}40 transparent`,
        }}
      >
        {sections.map((sec) => {
          const s = SECTION_STYLE[sec.type];
          return (
            <div
              key={sec.type}
              className="rounded-2xl p-5 anim-fade-up"
              style={{ background: s.bg, border: `1.5px solid ${s.border}` }}
            >
              {/* Section header */}
              <div className="flex items-center gap-2 mb-3">
                <div style={{
                  width: 30, height: 30, borderRadius: 8,
                  background: `${s.iconColor}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <sec.icon size={16} color={s.iconColor} strokeWidth={2} />
                </div>
                <p style={{ fontFamily: '"Fredoka One", cursive', fontSize: 16, color: 'var(--text)', fontWeight: 700 }}>
                  {sec.title}
                </p>
              </div>

              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)', marginBottom: sec.exercises ? 12 : 0 }}>
                {sec.body}
              </p>

              {/* Practice exercises */}
              {sec.exercises && (
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {sec.exercises.map((ex, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: 10, alignItems: 'flex-start',
                      background: 'rgba(255,255,255,0.65)', borderRadius: 12,
                      padding: '10px 12px',
                      border: '1.5px solid rgba(255,255,255,0.9)',
                    }}>
                      <div style={{
                        width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                        background: s.iconColor,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: '"Fredoka One", cursive',
                        fontSize: 13, color: '#fff', fontWeight: 700,
                      }}>
                        {i + 1}
                      </div>
                      <p style={{ fontSize: 13, lineHeight: 1.45, color: 'var(--text)', marginTop: 3 }}>
                        {ex}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Fun footer nudge */}
        <div style={{
          textAlign: 'center', padding: '12px 0 4px',
          color: 'var(--text-3)', fontSize: 12,
        }}>
          📖 ¡Practica en tu cuaderno y pregunta a tu maestra si tienes dudas!
        </div>
      </div>

      {/* ── Footer ── */}
      <div
        className="p-4 border-t shrink-0 space-y-3"
        style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
      >
        {!isCompleted ? (
          <button
            onClick={() => onComplete(lesson.id)}
            className="press"
            style={{
              background: `linear-gradient(135deg, ${subject.color}, ${subject.color}cc)`,
              color: 'white', borderRadius: 16, padding: '14px',
              fontFamily: '"Fredoka One", cursive',
              fontWeight: 900, fontSize: 16, width: '100%', border: 'none', cursor: 'pointer',
              boxShadow: `0 6px 20px ${subject.color}55`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <Zap size={18} /> ¡Marcar como completada! · +30 XP
          </button>
        ) : (
          <button style={{
            background: '#edf9f8', color: 'var(--progress)',
            borderRadius: 16, padding: '14px', fontWeight: 900, fontSize: 15,
            width: '100%', border: '1.5px solid #b0ede8', cursor: 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <CheckCircle size={17} /> ¡Lección completada! ⭐
          </button>
        )}

        <div className="flex gap-3">
          <button
            onClick={onPrev}
            disabled={lessonIndex === 0}
            className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-bold press"
            style={{
              background: 'var(--bg)', border: '1.5px solid var(--border)',
              color: lessonIndex === 0 ? 'var(--text-3)' : 'var(--text-2)',
              opacity: lessonIndex === 0 ? 0.5 : 1,
              cursor: lessonIndex === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            <ChevronLeft size={14} /> Anterior
          </button>
          <button
            onClick={onNext}
            disabled={lessonIndex >= totalLessons - 1}
            className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-bold press"
            style={{
              background: 'var(--bg)', border: '1.5px solid var(--border)',
              color: lessonIndex >= totalLessons - 1 ? 'var(--text-3)' : 'var(--text-2)',
              opacity: lessonIndex >= totalLessons - 1 ? 0.5 : 1,
              cursor: lessonIndex >= totalLessons - 1 ? 'not-allowed' : 'pointer',
            }}
          >
            Siguiente <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
