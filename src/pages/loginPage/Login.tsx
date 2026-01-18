import type { User } from "../../types";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  let enteringName = "";

  const enterHandler = () => {
    const typingUsers = localStorage.typingUsers;
    // comment baigaa bol parse hiij ugnu baihgui bol hooson array ugnu
    const users: User[] = typingUsers ? JSON.parse(typingUsers) : [];

    // hereglegch baigaa esehiig shalgana
    let existingUser = users.find((u) => u.nickName === enteringName);
    if (existingUser) {
      const currentUser = JSON.parse(localStorage.currentUser);
      let prevCurrentUser = users.findIndex(
        (u) => u.nickName === currentUser.nickName,
      );
      users[prevCurrentUser] = currentUser;
      localStorage.typingUsers = JSON.stringify(users);
      localStorage.currentUser = JSON.stringify(existingUser);
      navigate("/");
      return;
    }

    const newUser: User = {
      nickName: enteringName,
      averageWPM: 0,
      results: [],
    };
    users.push(newUser);
    // odoo baigaa hereglegciig husnegt ruu hadagalna
    const currentUser = localStorage.currentUser
      ? JSON.parse(localStorage.currentUser)
      : [];
    let prevCurrentUser = users.findIndex(
      (u) => u.nickName === currentUser.nickName,
    );
    users[prevCurrentUser] = currentUser;
    localStorage.setItem("typingUsers", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    navigate("/");
  };

  return (
    <>
      <button onClick={()=> navigate('/')}>back</button>
      <div className="h-screen flex items-center justify-center gap-2 bg-gray-500 ">
        <input
          type="text"
          onChange={(e) => (enteringName = e.target.value)}
          placeholder=" nickname"
          className="bg-amber-50 w-3/20 border-1 rounded-sm font-bold text-gray-800"
        />
        <button onClick={enterHandler}>enter</button>
      </div>
    </>
  );
};
