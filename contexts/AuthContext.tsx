import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

type AsyncUser = {
  userId: number
  username: string
  repPoints: number | null
}

interface AuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  getUser: () => Promise<AsyncUser | null>
  refreshUser: () => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken')
      setIsAuthenticated(!!token)
    } catch (error) {
      console.error('Error checking auth status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const queryString = new URLSearchParams({ email, password }).toString()
      const url = `${process.env.EXPO_PUBLIC_SERVER_IP}/user?${queryString}`
      console.log(url)

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      // If your server can sometimes send text, guard this parse:
      const contentType = response.headers.get('content-type') || ''
      const data = contentType.includes('application/json')
        ? await response.json()
        : { user: null }

      if (data.user) {
        await AsyncStorage.setItem('authToken', 'authenticated')
        await AsyncStorage.setItem('userId', String(data.user.id))
        await AsyncStorage.setItem('username', data.user.username)

        // repPoints from login if provided
        if (typeof data.user.repPoints === 'number') {
          await AsyncStorage.setItem('repPoints', String(data.user.repPoints))
        } else {
          // Hydrate repPoints once if login didn’t return it
          try {
            const res2 = await fetch(
              `${process.env.EXPO_PUBLIC_SERVER_IP}/user/${data.user.id}`,
              {
                headers: { Accept: 'application/json' },
              },
            )
            const ct2 = res2.headers.get('content-type') || ''
            const data2 = ct2.includes('application/json')
              ? await res2.json()
              : {}
            const rp = data2?.user?.repPoints
            if (typeof rp === 'number') {
              await AsyncStorage.setItem('repPoints', String(rp))
            }
          } catch {}
        }

        setIsAuthenticated(true)
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const getUser = async (): Promise<AsyncUser | null> => {
    try {
      const token = await AsyncStorage.getItem('authToken')
      const userId = await AsyncStorage.getItem('userId')
      const username = await AsyncStorage.getItem('username')
      const repPointsStr = await AsyncStorage.getItem('repPoints')
      if (!token || !userId || !username) return null

      return {
        userId: parseInt(userId, 10),
        username,
        repPoints: repPointsStr != null ? Number(repPointsStr) : null,
      }
    } catch (error) {
      console.error('Get user error:', error)
      return null
    }
  }

  const refreshUser = async () => {
    try {
      const user = await getUser()
      if (!user) return
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_SERVER_IP}/user/${user.userId}`,
        {
          headers: { Accept: 'application/json' },
        },
      )
      const ct = res.headers.get('content-type') || ''
      const data = ct.includes('application/json') ? await res.json() : {}
      const rp = data?.user?.repPoints
      if (typeof rp === 'number') {
        await AsyncStorage.setItem('repPoints', String(rp))
      }
    } catch (e) {}
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken')
      await AsyncStorage.removeItem('userId')
      await AsyncStorage.removeItem('username')
      await AsyncStorage.removeItem('repPoints')
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const value: AuthContextType = {
    isAuthenticated,
    login,
    getUser,
    refreshUser,
    logout,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
