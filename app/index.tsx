import { router } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace('/(tabs)/live');
      } else {
        router.replace('/landing');
      }
    }
  }, [isAuthenticated, isLoading]);

  return null;
}
