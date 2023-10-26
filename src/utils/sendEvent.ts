const sendEvent = <T>(eventType: string, payload: T) => {
  const EventData = { type: eventType, payload };
  fetch(`/api/sendEvent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(EventData)
  });
};

export default sendEvent;
