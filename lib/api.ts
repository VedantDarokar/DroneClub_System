export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'

function authHeaders() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('dc_token') : null
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function login(username: string, password: string): Promise<string> {
  const params = new URLSearchParams()
  params.set('username', username)
  params.set('password', password)
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })
  if (!res.ok) throw new Error('Invalid credentials')
  const data = await res.json()
  return data.access_token as string
}

export async function getMe() {
  const res = await fetch(`${API_BASE}/users/me`, { headers: { ...authHeaders() } })
  if (!res.ok) throw new Error('Failed to fetch user')
  return res.json()
}

// Admin - users
export async function listUsers() {
  const res = await fetch(`${API_BASE}/users/`, { headers: { ...authHeaders() } })
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json()
}

export async function createUser(payload: { username: string; password: string; name?: string; email?: string; department?: string; class?: string }) {
  const res = await fetch(`${API_BASE}/users/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload), // backend uses alias "class" for class_name
  })
  if (!res.ok) throw new Error('Failed to create user')
  return res.json()
}

export async function deleteUser(userId: string) {
  const res = await fetch(`${API_BASE}/users/${userId}`, { method: 'DELETE', headers: { ...authHeaders() } })
  if (!res.ok) throw new Error('Failed to delete user')
  return res.json()
}

// Components
export async function listComponents() {
  const res = await fetch(`${API_BASE}/components/`, { headers: { ...authHeaders() } })
  if (!res.ok) throw new Error('Failed to fetch components')
  return res.json()
}

export async function createComponent(payload: { name: string; description?: string; quantity: number; image?: string }) {
  const res = await fetch(`${API_BASE}/components/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to create component')
  return res.json()
}

export async function useComponent(componentId: string, quantity: number) {
  const res = await fetch(`${API_BASE}/components/${componentId}/use`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ quantity }),
  })
  if (!res.ok) throw new Error('Failed to use component')
  return res.json()
}

export async function returnComponent(componentId: string) {
  const res = await fetch(`${API_BASE}/components/${componentId}/return`, {
    method: 'POST',
    headers: { ...authHeaders() },
  })
  if (!res.ok) throw new Error('Failed to return component')
  return res.json()
}

export async function listUsageLogs() {
  const res = await fetch(`${API_BASE}/components/usage`, {
    headers: { ...authHeaders() },
  })
  if (!res.ok) throw new Error('Failed to fetch usage logs')
  return res.json()
}

// Keys
export async function getKeyState() {
  const res = await fetch(`${API_BASE}/keys/state`, { headers: { ...authHeaders() } })
  if (!res.ok) throw new Error('Failed to fetch key state')
  return res.json()
}

export async function toggleKey() {
  const res = await fetch(`${API_BASE}/keys/toggle`, { method: 'POST', headers: { ...authHeaders() } })
  if (!res.ok) throw new Error('Failed to toggle key')
  return res.json()
}

// Presence
export async function getMyPresence() {
  const res = await fetch(`${API_BASE}/presence/me`, { headers: { ...authHeaders() } })
  if (!res.ok) throw new Error('Failed to fetch presence')
  return res.json()
}

export async function togglePresence() {
  const res = await fetch(`${API_BASE}/presence/toggle`, { method: 'POST', headers: { ...authHeaders() } })
  if (!res.ok) throw new Error('Failed to toggle presence')
  return res.json()
}

export async function listPresentMembers() {
  const res = await fetch(`${API_BASE}/presence/members`, { headers: { ...authHeaders() } })
  if (!res.ok) throw new Error('Failed to fetch members')
  return res.json()
}