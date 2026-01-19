import type { User } from "../../types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
  const navigate = useNavigate();
  let enteringName = "";
  const [checked, setChecked] = useState(false);

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
      <div className="bg-[#3b3b3b] h-screen w-screen flex justify-around items-center">
        <section className="w-70">
          <p className="p-0, m-0 flex flex-row flex-start text-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>
            Register
          </p>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="username"
              className="bg-black text-gray-50 rounded-md pl-2 h-7 w-full"
            />
            <input
              type="email"
              placeholder="email"
              className="bg-black text-gray-50 rounded-md pl-2 h-7 w-full"
            />
            <input
              type="email"
              placeholder="verify email"
              className="bg-black text-gray-50 rounded-md pl-2 h-7 w-full"
            />
            <input
              type="password"
              placeholder="password"
              className="bg-black text-gray-50 rounded-md pl-2 h-7 w-full"
            />
            <input
              type="password"
              placeholder="verify password"
              className="bg-black text-gray-50 rounded-md pl-2 h-7 w-full"
            />
            <button className="bg-black text-gray-50 rounded-md h-7 flex flex-row justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />
              </svg>
              sign up
            </button>
          </div>
        </section>

        <section className="flex flex-col w-70 ">
          <p className="p-0, m-0 flex flex-row flex-start text-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
            login
          </p>
          <div className="text-white flex flex-row justify-between ">
            <button className="w-47/100 h-10 bg-black flex justify-center items-center rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
              </svg>
            </button>
            <button className="w-47/100  h-10 bg-black flex justify-center items-center rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
              </svg>
            </button>
          </div>
          <div className="flex flex-row justify-between items-center text-white ">
            <p className="w-42/100 h-1 bg-black rounded-md"></p>
            <p>or</p>
            <p className="w-42/100 h-1 bg-black rounded-md"></p>
          </div>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="username"
              className="bg-black text-gray-50 rounded-md pl-2 h-7 w-full"
              onChange={(e) => enteringName = e.target.value}
            />
            <input
              type="email"
              placeholder="email"
              className="bg-black text-gray-50 rounded-md pl-2 h-7 w-full"
            />
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 text-black"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <label className="flex items-center gap-2 cursor-pointer select-none text-gray-200">
              <input type="checkbox" className="peer sr-only" />

              <span
                className="h-5 w-5 rounded border border-gray-500 grid place-items-center
                   peer-checked:bg-yellow-400 peer-checked:border-yellow-400"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 text-black
                 opacity-0 scale-75 transition-all duration-150
                 peer-checked:opacity-100 peer-checked:scale-100"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>

              <span>Remember me</span>
            </label>

            <button 
            onClick={enterHandler}
            className="bg-black text-gray-50 rounded-md h-7 flex flex-row justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
              sign in
            </button>
          </div>
        </section>
      </div>
    </>
  );
};
