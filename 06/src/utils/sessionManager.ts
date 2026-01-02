/**
 * Session manager using BroadcastChannel to detect other tabs/windows
 */

let broadcastChannel: BroadcastChannel | null = null;
let sessionHeartbeatInterval: ReturnType<typeof setInterval> | null = null;

const CHANNEL_NAME = 'emperors-call-session';
const HEARTBEAT_INTERVAL = 2000; // 2 seconds
const HEARTBEAT_TIMEOUT = 5000; // 5 seconds - if no heartbeat received, consider session dead

let lastHeartbeat: number = 0;
let isOtherSessionActive: boolean = false;

/**
 * Initialize session manager
 */
export function initSessionManager(sessionId: string, onOtherSessionDetected: () => void): void {
  if (typeof window === 'undefined' || !window.BroadcastChannel) {
    // Fallback to localStorage-only if BroadcastChannel not available
    return;
  }

  try {
    broadcastChannel = new BroadcastChannel(CHANNEL_NAME);
    
    // Listen for heartbeats from other tabs
    broadcastChannel.onmessage = (event) => {
      if (event.data.type === 'heartbeat' && event.data.sessionId !== sessionId) {
        // Another tab is sending heartbeats
        lastHeartbeat = Date.now();
        isOtherSessionActive = true;
      } else if (event.data.type === 'session-end' && event.data.sessionId !== sessionId) {
        // Another tab ended its session
        isOtherSessionActive = false;
      }
    };

    // Send periodic heartbeats
    sessionHeartbeatInterval = setInterval(() => {
      if (broadcastChannel) {
        broadcastChannel.postMessage({
          type: 'heartbeat',
          sessionId,
          timestamp: Date.now(),
        });
      }
    }, HEARTBEAT_INTERVAL);

    // Check if other session is still active
    const checkInterval = setInterval(() => {
      const timeSinceLastHeartbeat = Date.now() - lastHeartbeat;
      if (isOtherSessionActive && timeSinceLastHeartbeat > HEARTBEAT_TIMEOUT) {
        // No heartbeat received, other session might be dead
        isOtherSessionActive = false;
      }
      
      // If we detect another active session, notify
      if (isOtherSessionActive) {
        onOtherSessionDetected();
      }
    }, 1000);

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      cleanupSessionManager(sessionId);
    });
  } catch (error) {
    console.error('Failed to initialize session manager:', error);
  }
}

/**
 * Check if another session is active (using BroadcastChannel)
 */
export function hasOtherActiveSession(): boolean {
  return isOtherSessionActive;
}

/**
 * Cleanup session manager
 */
export function cleanupSessionManager(sessionId: string): void {
  if (sessionHeartbeatInterval) {
    clearInterval(sessionHeartbeatInterval);
    sessionHeartbeatInterval = null;
  }

  if (broadcastChannel) {
    // Notify other tabs that this session is ending
    broadcastChannel.postMessage({
      type: 'session-end',
      sessionId,
      timestamp: Date.now(),
    });
    broadcastChannel.close();
    broadcastChannel = null;
  }
  
  isOtherSessionActive = false;
  lastHeartbeat = 0;
}

