import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { User } from "../types";

type AuthContextValue = {
  currentUser: User | null;
  register: (userObj: User) => boolean;
  login: (userObj: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("currentUser");
    setCurrentUser(raw ? JSON.parse(raw) : null);
  }, []);

 const  register =  (userObj: User) => {
     const typingUsers = localStorage.typingUsers;
    const users: User[] = typingUsers ? JSON.parse(typingUsers) : [];
    const index = users.findIndex((user) => user.nickName === userObj.nickName);
    if(index === -1){
    users.push(userObj); 
    localStorage.typingUsers = JSON.stringify(users);
    console.log("registerworked");
    return true;
    } 
    console.log("user already existst");
    return false;
  }

  const login = (userObj: User) => {
    localStorage.setItem("currentUser", JSON.stringify(userObj));
    setCurrentUser(userObj);
     console.log("loginWorked")
  };
  const logout = () => {
    const typingUsers = localStorage.typingUsers;
    // comment baigaa bol parse hiij ugnu baihgui bol hooson array ugnu
    const users: User[] = typingUsers ? JSON.parse(typingUsers) : [];
    const currentUser = JSON.parse(localStorage.currentUser);
    let prevCurrentUser = users.findIndex(
      (u) => u.nickName === currentUser.nickName,
    );
    users[prevCurrentUser] = currentUser;
    localStorage.typingUsers = JSON.stringify(users);
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
     console.log("logoutWorked")
  };
  return (
    <AuthContext.Provider value={{ register, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
