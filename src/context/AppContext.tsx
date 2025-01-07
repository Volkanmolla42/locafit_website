'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'

// Types
interface User {
  id: string
  name: string
  phone: string
}

interface AppState {
  user: User | null
  isAuthenticated: boolean
  theme: 'light' | 'dark'
  loading: boolean
  notifications: Array<{
    id: string
    message: string
    type: 'success' | 'error' | 'info'
  }>
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'ADD_NOTIFICATION'; payload: { message: string; type: 'success' | 'error' | 'info' } }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }

// Initial state
const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  theme: 'light',
  loading: false,
  notifications: []
}

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload
      }
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            id: Date.now().toString(),
            ...action.payload
          }
        ]
      }
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      }
    default:
      return state
  }
}

// Context
interface AppContextType {
  state: AppState
  dispatch: React.Dispatch<AppAction>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// Provider Component
interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

// Custom Hook
export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

// Action Creators
export const appActions = {
  setUser: (user: User | null) => ({
    type: 'SET_USER' as const,
    payload: user
  }),
  setLoading: (loading: boolean) => ({
    type: 'SET_LOADING' as const,
    payload: loading
  }),
  setTheme: (theme: 'light' | 'dark') => ({
    type: 'SET_THEME' as const,
    payload: theme
  }),
  addNotification: (notification: { message: string; type: 'success' | 'error' | 'info' }) => ({
    type: 'ADD_NOTIFICATION' as const,
    payload: notification
  }),
  removeNotification: (id: string) => ({
    type: 'REMOVE_NOTIFICATION' as const,
    payload: id
  })
}
