export interface LocalAuthUser {
  id: string
  name: string
  email: string
  password: string
}

const USERS_KEY = 'go-finance:mock-auth:users'
const SESSION_KEY = 'go-finance:mock-auth:session'
const DEMO_USER: LocalAuthUser = { id: 'demo-gustavo', name: 'Gustavo Oliveira', email: 'gustavo@email.com', password: 'go-finance' }

export function loadUsers(): LocalAuthUser[] {
  const saved = readJson<LocalAuthUser[]>(USERS_KEY)
  if (saved?.length) return saved
  writeUsers([DEMO_USER])
  return [DEMO_USER]
}

export function writeUsers(users: LocalAuthUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function loadSessionUserId() {
  return localStorage.getItem(SESSION_KEY) ?? sessionStorage.getItem(SESSION_KEY)
}

export function writeSessionUserId(userId: string, persistent: boolean) {
  clearSession()
  const storage = persistent ? localStorage : sessionStorage
  storage.setItem(SESSION_KEY, userId)
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
  sessionStorage.removeItem(SESSION_KEY)
}

function readJson<T>(key: string): T | null {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) as T : null
  } catch {
    localStorage.removeItem(key)
    return null
  }
}
