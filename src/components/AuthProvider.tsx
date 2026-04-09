import React, { createContext, useContext, useEffect, useState } from 'react';
import { FirebaseUser, subscribeToAuth, subscribeToProfile, UserProfile } from '@/lib/firebase';

interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = subscribeToAuth((mockUser) => {
      setUser(mockUser);
      
      if (mockUser) {
        // Subscribe to user profile changes mapped fully to local mock
        const unsubscribeProfile = subscribeToProfile(mockUser.uid, (data) => {
            setProfile(data);
            setLoading(false);
        });

        // Ensure we handle unmounts properly with our new custom unsubscribe pattern
        return () => {
            unsubscribeAuth();
            unsubscribeProfile();
        };
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const value = {
    user,
    profile,
    loading,
    isAdmin: profile?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
