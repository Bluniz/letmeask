import { createContext, useState, ReactNode, useEffect } from "react";
import { auth, firebase } from "services/firebase";

type userProps = {
  name: string;
  id: string;
  avatar: string;
};

type AuthContextType = {
  user: userProps | undefined;
  signInWithGoogle: () => Promise<void>;
};

const defaultValues = {
  user: undefined,
  signInWithGoogle: () => new Promise<void>((resolve) => resolve()),
};

export const AuthContext = createContext<AuthContextType>(defaultValues);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<userProps>();

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account.");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  useEffect(() => {
    //! Sempre que declarar um event listener limpar na saida.
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account.");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });
    //! "Descastrar ao final do useEffect"
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}
