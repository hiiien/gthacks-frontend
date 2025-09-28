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
}

interface AuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  getUser: () => Promise<AsyncUser | null>
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
      const queryString = new URLSearchParams({
        email,
        password,
      }).toString()

      console.log(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}/user?${queryString}`,
      )

      const response = await fetch(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}/user?${queryString}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
      const data = await response.json()

      if (data.user) {
        await AsyncStorage.setItem('authToken', 'authenticated')
        await AsyncStorage.setItem('userId', String(data.user.id))
        await AsyncStorage.setItem('username', data.user.username)
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
      if (!token || !userId || !username) return null

      return {
        userId: parseInt(userId),
        username,
      }
    } catch (error) {
      console.error('Get user error:', error)
      return null
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken')
      await AsyncStorage.removeItem('userId')
      await AsyncStorage.removeItem('username')
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const value: AuthContextType = {
    isAuthenticated,
    login,
    getUser,
    logout,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
