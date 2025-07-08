'use client';

interface EventData {
  [key: string]: unknown;
}

const EventLogger = {
  logEvent: (eventType: string, data: EventData) => {
    console.log('Event:', { type: eventType, timestamp: new Date().toISOString(), ...data });
    // In a real app, send to analytics (e.g., Google Analytics)
  },
};

export default EventLogger;