/**
 * Utility functions for the FlexChat embeddable script
 */

// Generate a persistent session ID or retrieve existing one
export function getSessionId(): string {
  const storageKey = 'flexchat-session-id';
  let sessionId = localStorage.getItem(storageKey);
  
  // If no session ID exists, create a new one
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem(storageKey, sessionId);
  }
  
  return sessionId;
}

// Generate a unique session ID
function generateSessionId(): string {
  return 'fc-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

// Get user data from localStorage if available
export function getUserData(): Record<string, string> {
  const storageKey = 'flexchat-user-data';
  const userData = localStorage.getItem(storageKey);
  
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch (e) {
      console.error('FlexChat: Error parsing user data from localStorage', e);
    }
  }
  
  return {};
}

// Save user data to localStorage
export function saveUserData(data: Record<string, string>): void {
  const storageKey = 'flexchat-user-data';
  localStorage.setItem(storageKey, JSON.stringify(data));
}

// Get the page context information
export function getPageContext(): Record<string, string> {
  return {
    url: window.location.href,
    title: document.title,
    referrer: document.referrer,
    userAgent: navigator.userAgent,
    language: navigator.language,
    timestamp: new Date().toISOString(),
  };
}
