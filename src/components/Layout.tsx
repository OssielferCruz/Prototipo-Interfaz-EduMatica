import {
  LayoutDashboard, BookOpen, Gamepad2, Trophy, User,
  Flame, Zap, LogOut, ChevronRight, Library,
} from 'lucide-react';
import type { View, User as UserType } from '../types';
import edumaticaLogo from '../imports/logo_edumaticaRecurso_1.svg';

interface NavItem { view: View; Icon: React.ElementType; label: string; }

const NAV: NavItem[] = [
  { view: 'dashboard',    Icon: LayoutDashboard, label: 'Inicio'    },
  { view: 'lessons',      Icon: BookOpen,        label: 'Lecciones' },
  { view: 'games',        Icon: Gamepad2,        label: 'Juegos'    },
  { view: 'material',     Icon: Library,         label: 'Material'  },
  { view: 'achievements', Icon: Trophy,          label: 'Logros'    },
  { view: 'profile',      Icon: User,            label: 'Perfil'    },
];

const SUBJECT_ABBR: Record<string,string> = {
  matematica: 'MAT', lengua: 'LEN', valores: 'VAL', identidad: 'ID', ciencias: 'CIE',
};
const SUBJECT_COLOR: Record<string,string> = {
  matematica: '#FE6D73', lengua: '#2584A7', valores: '#24E5D2', identidad: '#e0a020', ciencias: '#5aad68',
};

interface Props {
  user: UserType;
  view: View;
  navigate: (v: View) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export default function Layout({ user, view, navigate, onLogout, children }: Props) {
  const xpInLevel   = user.xp % 200;
  const xpForNext   = 200;
  const pct         = Math.round((xpInLevel / xpForNext) * 100);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ────────── Sidebar ────────── */}
      <aside
        className="hidden md:flex flex-col w-60 shrink-0"
        style={{ background: 'var(--nav-bg)' }}
      >
        {/* Logo */}
        <div
          onClick={onLogout}
          className="px-5 pt-5 pb-4 border-b cursor-pointer transition-opacity hover:opacity-80"
          style={{ borderColor: '#ffffff12' }}
          title="Volver al inicio de sesión"
        >
          <img src={edumaticaLogo} alt="EduMATICA" style={{ height: 52, width: 'auto', display: 'block' }} />
          <p className="text-xs mt-1.5" style={{ color: '#4a6e88' }}>Educación Primaria Nicaragua</p>
        </div>

        {/* User card */}
        <div className="px-4 py-4 border-b" style={{ borderColor: '#ffffff12' }}>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
              style={{ background: '#1e3347' }}
            >
              {user.avatar}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-white text-sm truncate leading-none">{user.name.split(' ')[0]}</p>
              <p className="text-xs mt-0.5" style={{ color: '#6b8fa8' }}>@{user.username}</p>
            </div>
          </div>
          {/* XP bar */}
          <div className="flex justify-between text-xs mb-1" style={{ color: '#6b8fa8' }}>
            <span className="flex items-center gap-1">
              <Zap size={11} /> {user.xp} XP
            </span>
            <span>Niv. {user.level}</span>
          </div>
          <div className="progress-bar" style={{ background: '#1e3347' }}>
            <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {NAV.map(({ view: v, Icon, label }) => {
            const active = view === v;
            return (
              <button
                key={v}
                onClick={() => navigate(v)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all"
                style={{
                  background: active
                    ? 'linear-gradient(135deg, rgba(37,132,167,0.5) 0%, rgba(36,229,210,0.18) 100%)'
                    : 'transparent',
                  borderRadius: 12,
                  color: active ? '#ffffff' : '#7a9cb5',
                  borderLeft: active ? '3px solid #24E5D2' : '3px solid transparent',
                  transform: active ? 'translateX(2px)' : '',
                  transition: 'all 0.18s ease',
                }}
                onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#a8c5d8'; } }}
                onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#7a9cb5'; } }}
                onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)'; }}
                onMouseUp={(e) => { e.currentTarget.style.transform = active ? 'translateX(2px)' : ''; }}
              >
                <Icon size={17} strokeWidth={active ? 2.5 : 2} />
                <span className="text-sm font-semibold">{label}</span>
                {active && <ChevronRight size={12} className="ml-auto" style={{ opacity: 0.5 }} />}
              </button>
            );
          })}
        </nav>

        {/* Bottom: streak + grade + logout */}
        <div className="px-4 pb-5 space-y-2 border-t pt-4" style={{ borderColor: '#ffffff12' }}>
          <div
            className="flex items-center justify-between px-3 py-2 rounded-lg"
            style={{ background: '#1e3347' }}
          >
            <div className="flex items-center gap-2">
              <Flame size={15} color="#FE6D73" />
              <span className="text-xs font-bold text-white">{user.streak} días de racha</span>
            </div>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{ background: 'var(--cerulean)', color: '#fff' }}
            >
              {user.grade}°
            </span>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all"
            style={{ color: '#4a6070' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#7a9cb5'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#4a6070'; }}
          >
            <LogOut size={13} />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* ────────── Main ────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top bar */}
        <header
          className="md:hidden flex items-center justify-between px-4 py-3 border-b"
          style={{ background: 'var(--nav-bg)', borderColor: '#ffffff12' }}
        >
          <div
            onClick={onLogout}
            className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80"
            title="Volver al inicio de sesión"
          >
            <img src={edumaticaLogo} alt="EduMATICA" style={{ height: 28, width: 'auto' }} />
          </div>
          <span className="text-xl">{user.avatar}</span>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

        {/* Mobile bottom nav */}
        <nav
          className="md:hidden flex justify-around items-center py-2 border-t"
          style={{ background: '#fff', borderColor: 'var(--border)' }}
        >
          {NAV.map(({ view: v, Icon, label }) => {
            const active = view === v;
            return (
              <button
                key={v}
                onClick={() => navigate(v)}
                className="flex flex-col items-center gap-0.5 py-1 px-2"
                style={{ color: active ? 'var(--cerulean)' : 'var(--text-3)' }}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
                <span className="text-[9px] font-bold">{label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
