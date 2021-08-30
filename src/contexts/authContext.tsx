import { toastController } from "components/Toast";
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

    try {
      const result = await auth.signInWithPopup(provider);

      if (result.user) {
        const { displayName, photoURL, uid } = result.user;

        if (!displayName || !photoURL) {
          toastController.error("Missing information from Google Account.");
          throw new Error("Missing information from Google Account.");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
        toastController.success("Login realizado com sucesso!");
      }
    } catch (error) {
      toastController.error("Erro inesperado!");
      console.log(error);
    }
  }

  useEffect(() => {
    //! Sempre que declarar um event listener limpar na saida.
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          toastController.error("Missing information from Google Account.");
          throw new Error("Missing information from Google Account.");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });
    //! "Sair ao final do useEffect"
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
