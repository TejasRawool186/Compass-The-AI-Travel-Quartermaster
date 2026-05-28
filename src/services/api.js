const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === 'object' && payload?.error
        ? payload.error
        : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload;
}

export function getHealth() {
  return request('/api/health');
}

export async function getPresets() {
  const payload = await request('/api/presets');
  return payload.items || [];
}

export async function getPorts() {
  const payload = await request('/api/ports');
  return payload.items || [];
}

export async function getWeatherSnapshot() {
  const payload = await request('/api/weather');
  return payload.items || [];
}

export async function getCalendarSnapshot() {
  const payload = await request('/api/calendar');
  return payload.items || [];
}

export function getBudget() {
  return request('/api/budget');
}

export function updateBudget(totalLimit) {
  return request('/api/budget', {
    method: 'PUT',
    body: JSON.stringify({ totalLimit })
  });
}

export function planTrip(query, budgetLimit) {
  return request('/api/query', {
    method: 'POST',
    body: JSON.stringify({ query, budgetLimit })
  });
}

export function reserveTrip(reservation) {
  return request('/api/budget/reserve', {
    method: 'POST',
    body: JSON.stringify({ reservation })
  });
}
