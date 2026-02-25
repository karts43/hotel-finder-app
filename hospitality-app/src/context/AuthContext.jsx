import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Session error:", error.message);
        }

        if (isMounted) {
          setUser(data?.session?.user ?? null);
          setLoading(false);
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        if (isMounted) setLoading(false);
      }
    };

    initializeAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);