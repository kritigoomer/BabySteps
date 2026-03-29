// Utility functions for data conversion and API calls

import { KickSession, ContractionSession, UserStats, AppData } from '../constants/dataTypes';

// Convert session data to JSON for API submission
export function kickSessionToJSON(session: KickSession): object {
  return {
    id: session.id,
    date: session.date,
    count: session.count,
    averageMinutes: session.averageMinutes,
    durationSeconds: session.durationSeconds,
    startTime: session.startTime,
    endTime: session.endTime,
    type: 'kick_session'
  };
}

export function contractionSessionToJSON(session: ContractionSession): object {
  return {
    id: session.id,
    date: session.date,
    durationMinutes: session.durationMinutes,
    trueContractions: session.trueContractions,
    totalContractions: session.totalContractions,
    totalTrueTimeMinutes: session.totalTrueTimeMinutes,
    laborStatus: session.laborStatus,
    startTime: session.startTime,
    endTime: session.endTime,
    type: 'contraction_session'
  };
}

export function userStatsToJSON(stats: UserStats): object {
  return {
    userId: stats.userId,
    totalKickSessions: stats.totalKickSessions,
    averageKicksPerSession: stats.averageKicksPerSession,
    lastKickSessionDate: stats.lastKickSessionDate,
    kickTrend: stats.kickTrend,
    totalContractionSessions: stats.totalContractionSessions,
    averageTrueContractionsPerSession: stats.averageTrueContractionsPerSession,
    lastContractionSessionDate: stats.lastContractionSessionDate,
    currentLaborStatus: stats.currentLaborStatus,
    name: stats.name,
    age: stats.age,
    isPregnant: stats.isPregnant,
    weeksPregnant: stats.weeksPregnant,
    expectingTwins: stats.expectingTwins,
    activeTimeStart: stats.activeTimeStart,
    activeTimeEnd: stats.activeTimeEnd,
    wantsReminders: stats.wantsReminders,
    type: 'user_stats'
  };
}

// Convert full app data to JSON
export function appDataToJSON(data: AppData): object {
  return {
    userStats: userStatsToJSON(data.userStats),
    kickSessions: data.kickSessions.map(kickSessionToJSON),
    contractionSessions: data.contractionSessions.map(contractionSessionToJSON),
    timestamp: new Date().toISOString(),
    version: '1.0'
  };
}

// API endpoints (would be configured based on environment)
export const API_ENDPOINTS = {
  saveSession: '/api/sessions',
  getUserData: '/api/user',
  updateStats: '/api/stats',
  exportData: '/api/export'
};

// Mock API functions for development
export async function saveKickSession(session: KickSession): Promise<boolean> {
  try {
    console.log('Saving kick session:', kickSessionToJSON(session));
    // In production: return fetch(API_ENDPOINTS.saveSession, { method: 'POST', body: JSON.stringify(kickSessionToJSON(session)) })
    return true;
  } catch (error) {
    console.error('Failed to save kick session:', error);
    return false;
  }
}

export async function saveContractionSession(session: ContractionSession): Promise<boolean> {
  try {
    console.log('Saving contraction session:', contractionSessionToJSON(session));
    // In production: return fetch(API_ENDPOINTS.saveSession, { method: 'POST', body: JSON.stringify(contractionSessionToJSON(session)) })
    return true;
  } catch (error) {
    console.error('Failed to save contraction session:', error);
    return false;
  }
}

export async function updateUserStats(stats: UserStats): Promise<boolean> {
  try {
    console.log('Updating user stats:', userStatsToJSON(stats));
    // In production: return fetch(API_ENDPOINTS.updateStats, { method: 'PUT', body: JSON.stringify(userStatsToJSON(stats)) })
    return true;
  } catch (error) {
    console.error('Failed to update user stats:', error);
    return false;
  }
}