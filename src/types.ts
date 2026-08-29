export type View = 'login' | 'signup' | 'dashboard' | 'lessons' | 'games' | 'achievements' | 'profile' | 'material';

export interface User {
  name: string;
  username: string;
  email: string;
  grade: number;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  completedLessons: string[];
  earnedAchievements: string[];
  gamesPlayed: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  icon: string;
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  textLight: string;
  emoji: string;
  tagline: string;
  grades: { [grade: number]: Lesson[] };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  xpReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  check: (u: User) => boolean;
}

export interface GameQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  emoji: string;
  imageUrl?: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  emoji: string;
  color: string;
  difficulty: 1 | 2 | 3;
  questions: GameQuestion[];
  xpReward: number;
}

/* ── Interactive Games ── */

export interface FractionPizzaRound {
  numerator: number;
  denominator: number;
  question: string;
}

export interface NumberMatchPair {
  number: number;
  emojis: string;
  label: string;
}

export interface NumberLineRound {
  question: string;
  answer: number;
  min: number;
  max: number;
}

export interface WordScrambleRound {
  word: string;
  scrambled: string[];
  hint: string;
  emoji: string;
}

export interface ClassifyItem {
  text: string;
  emoji: string;
  category: 0 | 1;
}

export type InteractiveGameData =
  | { type: 'fraction-pizza'; rounds: FractionPizzaRound[] }
  | { type: 'number-match'; instruction: string; pairs: NumberMatchPair[] }
  | { type: 'number-line'; rounds: NumberLineRound[] }
  | { type: 'line-connect'; instruction: string; left: string[]; right: string[]; correctPairs: number[] }
  | { type: 'word-scramble'; rounds: WordScrambleRound[] }
  | { type: 'classify'; instruction: string; categories: [string, string]; items: ClassifyItem[] };

export interface InteractiveGame {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  emoji: string;
  color: string;
  difficulty: 1 | 2 | 3;
  xpReward: number;
  data: InteractiveGameData;
}

/* ── Material Didáctico ── */

export type MaterialType = 'libro' | 'ficha' | 'video' | 'mapa' | 'formulario';

export interface MaterialItem {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  grades: number[];
  type: MaterialType;
  emoji: string;
  pages?: number;
  duration?: string;
}

export interface AppProps {
  user: User;
  setUser: (u: User) => void;
  view: View;
  navigate: (v: View) => void;
  activeSubject: string;
  setActiveSubject: (id: string) => void;
}

/* ── Teacher Interface ── */

export type TeacherView = 'inicio' | 'alumnos' | 'planificacion' | 'mined';

export interface Teacher {
  name: string;
  username: string;
  email: string;
  avatar: string;
  grade: number;
  school: string;
}

export interface StudentRecord {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  gamesPlayed: number;
  lastActive: string;
  progress: Record<string, number>;
}

export interface LessonActivity {
  moment: 'inicio' | 'desarrollo' | 'cierre';
  description: string;
  duration: number;
}

export interface LessonPlan {
  id: string;
  title: string;
  date: string;
  totalDuration: number;
  objectives: string[];
  activities: LessonActivity[];
  resources: string[];
  evaluation: string;
}

export interface ClassUnit {
  id: string;
  title: string;
  subjectId: string;
  order: number;
  weeks: string;
  plans: LessonPlan[];
}

export type MinedMaterialType = 'programa' | 'guia' | 'evaluacion' | 'circular' | 'planificacion';

export interface MinedMaterial {
  id: string;
  title: string;
  description: string;
  type: MinedMaterialType;
  subjectId?: string;
  grades: number[];
  date: string;
  pages?: number;
  emoji: string;
  isNew: boolean;
}
