import { useState } from 'react';
import type { View, User, Teacher, TeacherView } from './types';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Layout from './components/Layout';
import TeacherLayout from './components/TeacherLayout';
import Dashboard from './pages/Dashboard';
import Lessons from './pages/Lessons';
import Games from './pages/Games';
import Achievements from './pages/Achievements';
import Profile from './pages/Profile';
import Material from './pages/Material';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherStudents from './pages/teacher/TeacherStudents';
import TeacherPlanning from './pages/teacher/TeacherPlanning';
import TeacherMined from './pages/teacher/TeacherMined';

export default function App() {
  const [view, setView]                   = useState<View>('login');
  const [user, setUser]                   = useState<User | null>(null);
  const [teacher, setTeacher]             = useState<Teacher | null>(null);
  const [teacherView, setTeacherView]     = useState<TeacherView>('inicio');
  const [activeSubject, setActiveSubject] = useState('matematica');

  function handleLogin(u: User) {
    setUser(u);
    setView('dashboard');
  }

  function handleTeacherLogin(t: Teacher) {
    setTeacher(t);
    setTeacherView('inicio');
  }

  function handleLogout() {
    setUser(null);
    setTeacher(null);
    setView('login');
  }

  /* ── TEACHER APP ── */
  if (teacher) {
    return (
      <TeacherLayout teacher={teacher} view={teacherView} navigate={setTeacherView} onLogout={handleLogout}>
        {teacherView === 'inicio'        && <TeacherDashboard teacher={teacher} navigate={setTeacherView} />}
        {teacherView === 'alumnos'       && <TeacherStudents  teacher={teacher} />}
        {teacherView === 'planificacion' && <TeacherPlanning  teacher={teacher} />}
        {teacherView === 'mined'         && <TeacherMined     teacher={teacher} />}
      </TeacherLayout>
    );
  }

  /* ── AUTH ── */
  if (!user) {
    if (view === 'signup') {
      return <Signup onSignup={handleLogin} onGoLogin={() => setView('login')} />;
    }
    return (
      <Login
        onLogin={handleLogin}
        onTeacherLogin={handleTeacherLogin}
        onGoSignup={() => setView('signup')}
      />
    );
  }

  /* ── STUDENT APP ── */
  return (
    <Layout user={user} view={view} navigate={setView} onLogout={handleLogout}>
      {view === 'dashboard' && (
        <Dashboard user={user} setUser={setUser} navigate={setView} setActiveSubject={setActiveSubject} />
      )}
      {view === 'lessons' && (
        <Lessons user={user} setUser={setUser} activeSubject={activeSubject} setActiveSubject={setActiveSubject} />
      )}
      {view === 'games'        && <Games        user={user} setUser={setUser} />}
      {view === 'material'     && <Material     user={user} />}
      {view === 'achievements' && <Achievements user={user} />}
      {view === 'profile'      && <Profile      user={user} setUser={setUser} />}
    </Layout>
  );
}
