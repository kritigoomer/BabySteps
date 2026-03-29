// Data types for database integration

export interface KickSession {
  id?: string;
  date: string;
  count: number;
  averageMinutes: number;
  durationSeconds: number;
  startTime: string;
  endTime: string;
}

export interface ContractionSession {
  id?: string;
  date: string;
  durationMinutes: number;
  trueContractions: number;
  totalContractions: number;
  totalTrueTimeMinutes: number;
  laborStatus: 'not_in_labor' | 'possibly_in_labor' | 'in_labor';
  startTime: string;
  endTime: string;
}

export interface UserStats {
  userId: string;
  // Kicks stats
  totalKickSessions: number;
  averageKicksPerSession: number;
  lastKickSessionDate: string;
  kickTrend: 'increasing' | 'decreasing' | 'stable';
  // Contractions stats
  totalContractionSessions: number;
  averageTrueContractionsPerSession: number;
  lastContractionSessionDate: string;
  currentLaborStatus: 'not_in_labor' | 'possibly_in_labor' | 'in_labor';
  // User info
  name: string;
  age: number;
  isPregnant: boolean;
  weeksPregnant: number;
  expectingTwins: boolean;
  activeTimeStart: string;
  activeTimeEnd: string;
  wantsReminders: boolean;
}

export interface AppData {
  userStats: UserStats;
  kickSessions: KickSession[];
  contractionSessions: ContractionSession[];
}

// Default data for development
export const defaultUserStats: UserStats = {
  userId: 'user1',
  totalKickSessions: 3,
  averageKicksPerSession: 10,
  lastKickSessionDate: '2024-03-28',
  kickTrend: 'stable',
  totalContractionSessions: 2,
  averageTrueContractionsPerSession: 4,
  lastContractionSessionDate: '2024-03-28',
  currentLaborStatus: 'not_in_labor',
  name: 'Serena Williams',
  age: 39,
  isPregnant: true,
  weeksPregnant: 28,
  expectingTwins: true,
  activeTimeStart: '11:00',
  activeTimeEnd: '13:00',
  wantsReminders: true,
};

export const defaultKickSessions: KickSession[] = [
  {
    id: 'kick1',
    date: '2024-03-28',
    count: 10,
    averageMinutes: 12,
    durationSeconds: 7200,
    startTime: '11:00:00',
    endTime: '13:00:00',
  },
  {
    id: 'kick2',
    date: '2024-03-27',
    count: 10,
    averageMinutes: 10,
    durationSeconds: 6000,
    startTime: '11:00:00',
    endTime: '12:00:00',
  },
  {
    id: 'kick3',
    date: '2024-03-26',
    count: 10,
    averageMinutes: 11,
    durationSeconds: 6600,
    startTime: '11:00:00',
    endTime: '12:10:00',
  },
];

export const defaultContractionSessions: ContractionSession[] = [
  {
    id: 'contraction1',
    date: '2024-03-28',
    durationMinutes: 75,
    trueContractions: 5,
    totalContractions: 8,
    totalTrueTimeMinutes: 45,
    laborStatus: 'possibly_in_labor',
    startTime: '14:00:00',
    endTime: '15:15:00',
  },
  {
    id: 'contraction2',
    date: '2024-03-27',
    durationMinutes: 60,
    trueContractions: 3,
    totalContractions: 6,
    totalTrueTimeMinutes: 30,
    laborStatus: 'not_in_labor',
    startTime: '14:00:00',
    endTime: '15:00:00',
  },
];