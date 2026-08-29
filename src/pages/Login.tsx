import { useState } from 'react';
import { Eye, EyeOff, CheckCircle, GraduationCap, BookOpen } from 'lucide-react';
import type { User, Teacher } from '../types';
import { DEMO_TEACHER } from '../data';
import edumaticaLogo from '../imports/logo_edumaticaRecurso_1.svg';

interface Props {
  onLogin: (u: User) => void;
  onTeacherLogin: (t: Teacher) => void;
  onGoSignup: () => void;
}

const DEMO_USER: User = {
  name: 'Sofía García', username: 'sofia123', email: 'sofia@correo.com',
  grade: 3, avatar: '🦋', xp: 1340, level: 7, streak: 7,
  completedLessons: ['mat-3-1', 'mat-3-2', 'mat-3-3', 'len-3-1', 'len-3-2', 'val-3-1', 'val-3-2', 'cie-3-1', 'cie-3-2', 'id-3-1'],
  earnedAchievements: ['first-lesson', 'five-lessons', 'streak-3', 'streak-7', 'first-game'],
  gamesPlayed: 8,
};

const STUDENT_FEATURES = [
  'Contenidos basados en el currículo del MINED',
  'Lecciones para 1° a 6° grado',
  'Juegos educativos interactivos',
  'Sistema de logros y progreso',
];

const TEACHER_FEATURES = [
  'Monitoreo de progreso por alumno',
  'Plan de clases organizado por unidades',
  'Material didáctico del MINED',
  'Seguimiento de actividad del aula',
];

export default function Login({ onLogin, onTeacherLogin, onGoSignup }: Props) {
  const [userType, setUserType] = useState<'estudiante' | 'docente'>('estudiante');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isTeacher = userType === 'docente';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) { setError('Completa todos los campos.'); return; }
    setLoading(true); setError('');
    setTimeout(() => {
      setLoading(false);
      if (isTeacher) onTeacherLogin(DEMO_TEACHER);
      else onLogin(DEMO_USER);
    }, 700);
  }

  const accentColor = isTeacher ? '#2584A7' : 'var(--action)';
  const features = isTeacher ? TEACHER_FEATURES : STUDENT_FEATURES;

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col justify-between flex-1 p-12"
        style={{ background: 'var(--nav-bg)', transition: 'background 0.3s' }}
      >
        <div>
          <img src={edumaticaLogo} alt="EduMATICA" style={{ height: 78, width: 'auto' }} />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: isTeacher ? '#24E5D2' : '#2584A7' }}>
            {isTeacher ? 'Plataforma Docente' : 'Mi aula virtual'}
          </p>
          <h1 className="font-fredoka text-5xl text-white leading-tight mb-6">
            {isTeacher ? <>Enseñar<br />con propósito<br />y pasión</> : <>Aprender<br />es la mejor<br />aventura</>}
          </h1>
          <p className="text-base mb-8" style={{ color: '#6b8fa8' }}>
            {isTeacher
              ? 'Gestiona tu aula, planifica tus clases y accede al material del MINED desde un solo lugar.'
              : 'Transformando la educación en Nicaragua: aprende, juega y crece con EduMATICA.'}
          </p>
          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <CheckCircle size={16} color={isTeacher ? '#24E5D2' : 'var(--progress)'} strokeWidth={2.5} className="shrink-0" />
                <span className="text-sm" style={{ color: '#a0bdd0' }}>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2 flex-wrap">
          {isTeacher
            ? ['1° Grado', '2° Grado', '3° Grado', '4° Grado', '5° Grado', '6° Grado'].map((g) => (
              <span key={g} className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: '#1e3347', color: '#6b8fa8' }}>{g}</span>
            ))
            : ['Matemática', 'Lengua', 'Ciencias', 'Identidad', 'Valores'].map((s) => (
              <span key={s} className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: '#1e3347', color: '#6b8fa8' }}>{s}</span>
            ))
          }
        </div>
      </div>

      {/* Right panel: form */}
      <div className="flex-1 flex items-center justify-center p-8" style={{ background: 'var(--bg)' }}>
        <div className="w-full max-w-sm anim-fade-up">
          <div className="lg:hidden mb-8">
            <img src={edumaticaLogo} alt="EduMATICA" style={{ height: 36, width: 'auto' }} />
          </div>

          {/* User type toggle */}
          <div
            className="flex rounded-xl p-1 mb-7"
            style={{ background: 'var(--surface)', border: '1.5px solid var(--border)' }}
          >
            {([
              { type: 'estudiante', icon: BookOpen, label: 'Estudiante', color: 'var(--action)' },
              { type: 'docente', icon: GraduationCap, label: 'Docente', color: '#2584A7' },
            ] as const).map(({ type, icon: Icon, label, color }) => {
              const active = userType === type;
              return (
                <button
                  key={type}
                  onClick={() => { setUserType(type); setError(''); }}
                  style={{
                    flex: 1, padding: '10px 12px', borderRadius: 10,
                    background: active ? color : 'transparent',
                    color: active ? '#fff' : 'var(--text-3)',
                    border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Icon size={15} strokeWidth={active ? 2.5 : 2} />
                  {label}
                </button>
              );
            })}
          </div>

          <h2 className="font-fredoka text-3xl mb-1" style={{ color: 'var(--text)' }}>
            {isTeacher ? 'Bienvenido, profe' : 'Bienvenido de nuevo'}
          </h2>
          <p className="text-sm mb-7" style={{ color: 'var(--text-2)' }}>
            {isTeacher ? 'Inicia sesión para gestionar tu aula' : 'Inicia sesión para continuar aprendiendo'}
          </p>

          {error && (
            <div className="mb-5 p-3 rounded-lg text-sm font-semibold anim-shake" style={{ background: '#fff0f0', color: 'var(--action)', border: '1px solid #fcc' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-2)' }}>
                {isTeacher ? 'Correo institucional' : 'Usuario o correo'}
              </label>
              <input
                type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                placeholder={isTeacher ? 'Tu correo MINED...' : 'Tu usuario...'}
                className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all"
                style={{ background: 'var(--surface)', border: '1.5px solid var(--border)', color: 'var(--text)' }}
                onFocus={(e) => (e.target.style.borderColor = accentColor)}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-2)' }}>
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tu contraseña..."
                  className="w-full rounded-lg px-4 py-3 pr-11 text-sm outline-none transition-all"
                  style={{ background: 'var(--surface)', border: '1.5px solid var(--border)', color: 'var(--text)' }}
                  onFocus={(e) => (e.target.style.borderColor = accentColor)}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-3)' }}>
                  {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm pt-1">
              <label className="flex items-center gap-2 cursor-pointer" style={{ color: 'var(--text-2)' }}>
                <input type="checkbox" className="w-3.5 h-3.5 rounded" />
                <span className="text-xs">Recuérdame</span>
              </label>
              <button type="button" className="text-xs font-semibold" style={{ color: accentColor }}>
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full py-3 rounded-lg font-bold text-sm text-white transition-opacity press"
              style={{ background: loading ? '#ccc' : accentColor, marginTop: '4px' }}
            >
              {loading ? 'Entrando...' : isTeacher ? 'Ingresar como docente' : 'Iniciar sesión'}
            </button>
          </form>

          {!isTeacher && (
            <p className="text-center text-sm mt-6" style={{ color: 'var(--text-2)' }}>
              ¿No tienes cuenta?{' '}
              <button onClick={onGoSignup} className="font-bold" style={{ color: accentColor }}>
                Regístrate
              </button>
            </p>
          )}

          <div className="mt-6 p-3 rounded-lg text-xs" style={{ background: '#fff', border: '1px solid var(--border)', color: 'var(--text-2)' }}>
            <strong>Demo:</strong> {isTeacher ? 'correo' : 'usuario'}``.
          </div>
        </div>
      </div>
    </div>
  );
}
