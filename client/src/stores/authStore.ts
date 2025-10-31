import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

// Configure axios base URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
axios.defaults.baseURL = API_URL

console.log('API Base URL configured:', API_URL)

export interface User {
  _id: string
  email: string
  name: string
  role: 'student' | 'mentor' | 'admin' | 'institution'
  avatar?: string
  xp: number
  level: number
  badges: string[]
  institution?: string
  isVerified: boolean
  createdAt: string
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

interface RegisterData {
  name: string
  email: string
  password: string
  role: 'student' | 'mentor' | 'admin' | 'institution'
  institution?: string
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
          // Hardcoded admin credentials
          if (email === 'admin@innosthan.com' && password === 'admin123') {
            const hardcodedAdmin: User = {
              _id: 'admin-001',
              email: 'admin@innosthan.com',
              name: 'Admin User',
              role: 'admin',
              avatar: '',
              xp: 1000,
              level: 10,
              badges: ['admin', 'super-user'],
              isVerified: true,
              createdAt: new Date().toISOString()
            }
            
            const token = 'hardcoded-admin-token-' + Date.now()
            
            console.log('login - using hardcoded admin credentials')
            
            // Set authentication state
            set({
              user: hardcodedAdmin,
              token,
              isAuthenticated: true,
              isLoading: false,
            })
            
            // Set axios default header for future requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            
            console.log('login - hardcoded admin authentication successful')
            return
          }
          
          // For other users, still try API call (if backend is available)
          console.log('login - making API call to /api/auth/login')
          const response = await axios.post('/api/auth/login', {
            email,
            password,
          })
          
          console.log('login - API response:', response.data)
          const { user, token } = response.data
          
          console.log('login - setting user and token:', { user, token })
          
          // Set authentication state
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          })
          
          // Set axios default header for future requests
          if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          }
          
          console.log('login - authentication state set successfully')
        } catch (error: any) {
          console.error('login - API error:', error)
          set({ 
            isLoading: false,
            isAuthenticated: false,
            user: null,
            token: null
          })
          throw new Error(error.response?.data?.message || 'Login failed')
        }
      },

      register: async (userData: RegisterData) => {
        set({ isLoading: true })
        try {
          const response = await axios.post('/api/auth/register', userData)
          
          const { user, token } = response.data
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error: any) {
          set({ isLoading: false })
          throw new Error(error.response?.data?.message || 'Registration failed')
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
        // Clear axios header
        delete axios.defaults.headers.common['Authorization']
      },

      checkAuth: async () => {
        const { token } = get()
        console.log('checkAuth - token:', token)
        if (!token) {
          console.log('checkAuth - no token, setting loading false')
          set({ isLoading: false })
          return
        }

        // Check if it's a hardcoded admin token
        if (token.startsWith('hardcoded-admin-token-')) {
          console.log('checkAuth - using hardcoded admin token')
          const hardcodedAdmin: User = {
            _id: 'admin-001',
            email: 'admin@innosthan.com',
            name: 'Admin User',
            role: 'admin',
            avatar: '',
            xp: 1000,
            level: 10,
            badges: ['admin', 'super-user'],
            isVerified: true,
            createdAt: new Date().toISOString()
          }
          
          set({
            user: hardcodedAdmin,
            isAuthenticated: true,
            isLoading: false,
          })
          return
        }

        set({ isLoading: true })
        try {
          console.log('checkAuth - making API call to /api/auth/me')
          
          // Set axios default header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          const response = await axios.get('/api/auth/me')
          
          console.log('checkAuth - API response:', response.data)
          set({
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          console.error('checkAuth - API error:', error)
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          })
          // Clear axios header on auth failure
          delete axios.defaults.headers.common['Authorization']
        }
      },

      updateProfile: async (data: Partial<User>) => {
        const { token } = get()
        if (!token) return

        try {
          const response = await axios.put('/api/auth/profile', data, {
            headers: { Authorization: `Bearer ${token}` },
          })
          
          set({ user: response.data.user })
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Profile update failed')
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
