import { useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';
import edumaticaLogo from '../imports/logo_edumaticaRecurso_1.svg';
import type { User } from '../types';

interface Props {
  onSignup: (u: User) => void;
  onGoLogin: () => void;
}

const AVATARS = ['🦋','🐯','🦁','🐸','🦊','🐼','🐨','🦄','🐶','🐱','🦅','🐬'];
const GRADE_LABELS = ['', '1er','2do','3er','4to','5to','6to'];

export default function Signup({ onSignup, onGoLogin }: Props) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', username: '', birthdate: '', grade: '',
    email: '', password: '', confirmPassword: '',
    avatar: '🦋', terms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  function v1() {
    const e: Record<string,string> = {};
    if (!form.name.trim()) e.name = 'Escribe tu nombre';
    if (!form.username.trim() || form.username.length < 3) e.username = 'Mínimo 3 caracteres';
    if (!form.birthdate) e.birthdate = 'Selecciona tu fecha de nacimiento';
    if (!form.grade) e.grade = 'Selecciona tu grado';
    setErrors(e); return Object.keys(e).length === 0;
  }
  function v2() {
    const e: Record<string,string> = {};
    if (!form.email || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) e.email = 'Correo inválido';
    if (!form.password || form.password.length < 6) e.password = 'Mínimo 6 caracteres';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Las contraseñas no coinciden';
    if (!form.terms) e.terms = 'Debes aceptar los términos';
    setErrors(e); return Object.keys(e).length === 0;
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (step === 1) { if (v1()) setStep(2); return; }
    if (step === 2) { if (v2()) setStep(3); return; }
    setLoading(true);
    setTimeout(() => {
      onSignup({
        name: form.name, username: form.username, email: form.email,
        grade: parseInt(form.grade), avatar: form.avatar,
        xp: 0, level: 1, streak: 0,
        completedLessons: [], earnedAchievements: [], gamesPlayed: 0,
      });
    }, 700);
  }

  const field = (name: string) => ({
    className: 'w-full rounded-lg px-4 py-3 text-sm outline-none transition-all',
    style: {
      background: 'var(--surface)',
      border: `1.5px solid ${errors[name] ? 'var(--action)' : 'var(--border)'}`,
      color: 'var(--text)',
    } as React.CSSProperties,
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) =>
      (e.target.style.borderColor = errors[name] ? 'var(--action)' : 'var(--cerulean)'),
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) =>
      (e.target.style.borderColor = errors[name] ? 'var(--action)' : 'var(--border)'),
  });

  const STEPS = ['Tus datos','Tu cuenta','Tu avatar'];

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-md anim-fade-up">
        {/* Logo */}
        <div className="mb-8">
          <img src={edumaticaLogo} alt="EduMATICA" style={{ height: 34, width: 'auto' }} />
        </div>

        <div
          className="bg-white rounded-xl overflow-hidden"
          style={{ border: '1.5px solid var(--border)', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}
        >
          {/* Step bar */}
          <div
            className="flex border-b"
            style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}
          >
            {STEPS.map((label, i) => {
              const n = i + 1;
              const done = step > n;
              const active = step === n;
              return (
                <div
                  key={label}
                  className="flex-1 flex flex-col items-center py-3 gap-1"
                  style={{ borderBottom: active ? '2px solid var(--cerulean)' : '2px solid transparent' }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: done ? 'var(--progress)' : active ? 'var(--cerulean)' : 'var(--border)',
                      color: done || active ? '#fff' : 'var(--text-3)',
                    }}
                  >
                    {done ? <Check size={12} strokeWidth={3} /> : n}
                  </div>
                  <span className="text-xs font-semibold hidden sm:block" style={{ color: active ? 'var(--cerulean)' : 'var(--text-3)' }}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          <form onSubmit={submit} className="p-6 space-y-4">
            <h2 className="font-fredoka text-2xl" style={{ color: 'var(--text)' }}>
              {step === 1 && 'Cuéntanos sobre ti'}
              {step === 2 && 'Crea tu cuenta'}
              {step === 3 && 'Elige tu avatar'}
            </h2>

            {/* ── Step 1 ── */}
            {step === 1 && (
              <div className="space-y-4 anim-fade-up">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-2)' }}>Nombre completo</label>
                  <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Ej: María López" {...field('name')} />
                  {errors.name && <p className="text-xs mt-1" style={{ color: 'var(--action)' }}>{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-2)' }}>Nombre de usuario</label>
                  <input type="text" value={form.username} onChange={(e) => set('username', e.target.value.toLowerCase().replace(/\s/g,''))} placeholder="Ej: maria2024" {...field('username')} />
                  {errors.username && <p className="text-xs mt-1" style={{ color: 'var(--action)' }}>{errors.username}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-2)' }}>Fecha de nacimiento</label>
                    <input type="date" value={form.birthdate} onChange={(e) => set('birthdate', e.target.value)} {...field('birthdate')} />
                    {errors.birthdate && <p className="text-xs mt-1" style={{ color: 'var(--action)' }}>{errors.birthdate}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-2)' }}>Grado escolar</label>
                    <select value={form.grade} onChange={(e) => set('grade', e.target.value)} {...field('grade') as React.SelectHTMLAttributes<HTMLSelectElement>}>
                      <option value="">Selecciona...</option>
                      {[1,2,3,4,5,6].map((g) => <option key={g} value={g}>{GRADE_LABELS[g]} Grado</option>)}
                    </select>
                    {errors.grade && <p className="text-xs mt-1" style={{ color: 'var(--action)' }}>{errors.grade}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 2 ── */}
            {step === 2 && (
              <div className="space-y-4 anim-fade-up">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-2)' }}>Correo del padre / tutor</label>
                  <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="correo@ejemplo.com" {...field('email')} />
                  {errors.email && <p className="text-xs mt-1" style={{ color: 'var(--action)' }}>{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-2)' }}>Contraseña</label>
                  <input type="password" value={form.password} onChange={(e) => set('password', e.target.value)} placeholder="Mínimo 6 caracteres" {...field('password')} />
                  {errors.password && <p className="text-xs mt-1" style={{ color: 'var(--action)' }}>{errors.password}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-2)' }}>Confirmar contraseña</label>
                  <input type="password" value={form.confirmPassword} onChange={(e) => set('confirmPassword', e.target.value)} placeholder="Repite tu contraseña" {...field('confirmPassword')} />
                  {errors.confirmPassword && <p className="text-xs mt-1" style={{ color: 'var(--action)' }}>{errors.confirmPassword}</p>}
                </div>
                <label className="flex items-start gap-3 cursor-pointer pt-1">
                  <input type="checkbox" checked={form.terms} onChange={(e) => set('terms', e.target.checked)} className="mt-0.5 w-3.5 h-3.5" />
                  <span className="text-xs" style={{ color: 'var(--text-2)' }}>
                    Acepto los{' '}
                    <span className="font-bold" style={{ color: 'var(--cerulean)' }}>Términos y Condiciones</span>
                    {' '}y la{' '}
                    <span className="font-bold" style={{ color: 'var(--cerulean)' }}>Política de Privacidad</span>
                  </span>
                </label>
                {errors.terms && <p className="text-xs" style={{ color: 'var(--action)' }}>{errors.terms}</p>}
              </div>
            )}

            {/* ── Step 3 ── */}
            {step === 3 && (
              <div className="anim-fade-up">
                <p className="text-sm mb-4" style={{ color: 'var(--text-2)' }}>Elige el avatar que te represente:</p>
                <div className="grid grid-cols-6 gap-2 mb-5">
                  {AVATARS.map((av) => (
                    <button
                      key={av} type="button" onClick={() => set('avatar', av)}
                      className="text-2xl rounded-lg p-2 transition-all press"
                      style={{
                        background: form.avatar === av ? '#e8f4f8' : 'var(--bg)',
                        border: `2px solid ${form.avatar === av ? 'var(--cerulean)' : 'var(--border)'}`,
                      }}
                    >
                      {av}
                    </button>
                  ))}
                </div>
                {/* Preview */}
                <div
                  className="rounded-xl p-4 flex items-center gap-4"
                  style={{ background: 'var(--bg)', border: '1.5px solid var(--border)' }}
                >
                  <span className="text-4xl">{form.avatar}</span>
                  <div>
                    <p className="font-bold" style={{ color: 'var(--text)' }}>{form.name || 'Tu Nombre'}</p>
                    <p className="text-xs" style={{ color: 'var(--text-2)' }}>@{form.username || 'usuario'}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>{form.grade ? `${GRADE_LABELS[parseInt(form.grade)]} Grado` : 'Grado'} · Nivel 1</p>
                  </div>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              {step > 1 && (
                <button
                  type="button" onClick={() => setStep(step - 1)}
                  className="flex-1 py-3 rounded-lg text-sm font-bold press"
                  style={{ background: 'var(--bg)', border: '1.5px solid var(--border)', color: 'var(--text-2)' }}
                >
                  Atrás
                </button>
              )}
              <button
                type="submit" disabled={loading}
                className="flex-[2] flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold text-white press"
                style={{ background: loading ? '#ccc' : step === 3 ? 'var(--action)' : 'var(--cerulean)' }}
              >
                {loading ? 'Creando cuenta...' : step === 3 ? '¡Empezar a aprender!' : (
                  <><span>Siguiente</span><ChevronRight size={15} /></>
                )}
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-sm mt-5" style={{ color: 'var(--text-2)' }}>
          ¿Ya tienes cuenta?{' '}
          <button onClick={onGoLogin} className="font-bold" style={{ color: 'var(--cerulean)' }}>
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  );
}
