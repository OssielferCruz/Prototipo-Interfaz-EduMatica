import {
  LayoutDashboard, Users, CalendarDays, Download,
  LogOut, ChevronRight, GraduationCap,
} from 'lucide-react';
import type { TeacherView, Teacher } from '../types';
import edumaticaLogo from '../imports/logo_edumaticaRecurso_1.svg';

interface NavItem { view: TeacherView; Icon: React.ElementType; label: string; }

const NAV: NavItem[] = [
  { view: 'inicio',        Icon: LayoutDashboard, label: 'Inicio'       },
  { view: 'alumnos',       Icon: Users,           label: 'Mis Alumnos'  },
  { view: 'planificacion', Icon: CalendarDays,    label: 'Planificación'},
  { view: 'mined',         Icon: Download,        label: 'Material MINED'},
];

interface Props {
  teacher: Teacher;
  view: TeacherView;
  navigate: (v: TeacherView) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export default function TeacherLayout({ teacher, view, navigate, onLogout, children }: Props) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* ────────── Sidebar ────────── */}
      <aside className="hidden md:flex flex-col w-60 shrink-0" style={{ background: 'var(--nav-bg)' }}>

        {/* Logo */}
        <div className="px-5 pt-5 pb-4 border-b" style={{ borderColor: '#ffffff12' }}>
          <img src={edumaticaLogo} alt="EduMATICA" style={{ height: 52, width: 'auto', display: 'block' }} />
          <p className="text-xs mt-1.5" style={{ color: '#4a6e88' }}>Portal Docente</p>
        </div>

        {/* Teacher card */}
        <div className="px-4 py-4 border-b" style={{ borderColor: '#ffffff12' }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: '#1e3347' }}>
              {teacher.avatar}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-white text-sm truncate leading-none">{teacher.name.replace('Prof. ', '')}</p>
              <p className="text-xs mt-0.5 truncate" style={{ color: '#6b8fa8' }}>{teacher.school.split(',')[0]}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg" style={{ background: '#1e3347' }}>
            <GraduationCap size={13} color="#24E5D2" />
            <span className="text-xs font-bold text-white">{teacher.grade}° grado</span>
            <span className="ml-auto text-xs" style={{ color: '#6b8fa8' }}>Docente</span>
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

        {/* Bottom */}
        <div className="px-4 pb-5 pt-4 border-t" style={{ borderColor: '#ffffff12' }}>
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
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b" style={{ background: 'var(--nav-bg)', borderColor: '#ffffff12' }}>
          <img src={edumaticaLogo} alt="EduMATICA" style={{ height: 28, width: 'auto' }} />
          <span className="text-xl">{teacher.avatar}</span>
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>

        {/* Mobile bottom nav */}
        <nav className="md:hidden flex justify-around items-center py-2 border-t" style={{ background: '#fff', borderColor: 'var(--border)' }}>
          {NAV.map(({ view: v, Icon, label }) => {
            const active = view === v;
            return (
              <button key={v} onClick={() => navigate(v)} className="flex flex-col items-center gap-0.5 py-1 px-2"
                style={{ color: active ? 'var(--cerulean)' : 'var(--text-3)' }}>
                <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
                <span className="text-[9px] font-bold">{label.split(' ')[0]}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
