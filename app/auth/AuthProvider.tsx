// src/auth/AuthProvider.tsx
"use client"
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
 
// TypeScript types
type Claim = {
  type: string;
  value: string;
};
 
type User = {
  name: string | null;
  id: string | null;
  roles: string[];
};
 
type AuthContextValue = {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
};
 
const AuthContext = createContext<AuthContextValue | undefined>(undefined);
 
async function fetchCurrentUser(): Promise<User | null> {
  const res = await fetch("/api/me", { credentials: "include" });
  if (!res.ok) return null;
 
  const claims: Claim[] = await res.json();
 
  if (!Array.isArray(claims)) return null;
 
  // Extract useful values from claims
  const nameClaim = claims.find(
    (c) => c.type === "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
  )?.value;
  const idClaim = claims.find(
    (c) =>
      c.type ===
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
  )?.value;
  const roleClaims = claims
    .filter(
      (c) =>
        c.type ===
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    )
    .map((c) => c.value);
 
  return {
    name: nameClaim ?? null,
    id: idClaim ?? null,
    roles: roleClaims,
  };
}
 
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
 
  const loadUser = async () => {
    setLoading(true);
    try {
      const fetched = await fetchCurrentUser();
      setUser(fetched);
    } catch (err) {
      console.error("Error fetching user:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    loadUser();
  }, []);
 
  const value: AuthContextValue = {
    user,
    loading,
    refreshUser: loadUser,
  };
 
  return (
<AuthContext.Provider value={value}>
      {children}
</AuthContext.Provider>
  );
};
 
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}