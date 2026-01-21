import type { User } from "../../../types";
import { useState } from "react";
import { useAuth } from "../../../auth-provider/authProvider";
import { notifications } from "@mantine/notifications";

export const SignUp = () => {
  const [registerName, setRegisterName] = useState("");
  const { register } = useAuth();

  const registerHandler = () => {
    let alreadyExists = false;
    const newUser: User = {
      nickName: registerName,
      averageWPM: 0,
      results: [],
    };
    alreadyExists = register(newUser);
    if (alreadyExists) {
      setRegisterName("");
      notifications.show({
        title: "За бүртгүүлсэн2",
        position: "top-center",
        message: "Одоо нэвтэрч орно доо! 🌟",
      });
      return;
    }
    notifications.show({
      title: "Ийм нэртэй хэрэглэгч байгаад байна",
      position: "top-center",
      message: "Арай өөр нэрээр бүртгүүлээд үзэх үү?",
    });
  };

  return (
    <section className="w-68">
      <p className="p-0, mb-1 flex flex-row flex-start text-[#646669]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
          />
        </svg>
        register
      </p>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="username"
          value={registerName}
          onChange={(e) => setRegisterName(e.target.value)}
          className="bg-[#2c2e31] text-[white] rounded-lg pl-2 h-9 w-full placeholder-[#646669]  focus:outline-none focus:ring-2 focus:ring-white caret-amber-300 "
        />
        <input
          type="email"
          placeholder="email"
          className="bg-[#2c2e31] text-[white]  rounded-lg pl-2 h-9 w-full placeholder-[#646669] focus:outline-none focus:ring-2 focus:ring-white caret-amber-300"
        />
        <input
          type="email"
          placeholder="verify email"
          className="bg-[#2c2e31] text-[white]  rounded-lg pl-2 h-9 w-full placeholder-[#646669] focus:outline-none focus:ring-2 focus:ring-white caret-amber-300"
        />
        <input
          type="password"
          placeholder="password"
          className="bg-[#2c2e31] text-[white]  rounded-lg pl-2 h-9 w-full placeholder-[#646669] focus:outline-none focus:ring-2 focus:ring-white caret-amber-300"
        />
        <input
          type="password"
          placeholder="verify password"
          className="bg-[#2c2e31] text-[white] rounded-lg pl-2 h-9 w-full placeholder-[#646669] focus:outline-none focus:ring-2 focus:ring-white caret-amber-300"
        />
        <button
          onClick={registerHandler}
          className="bg-[#303235] text-[#646669] rounded-lg h-9 flex flex-row justify-center items-center hover:bg-[#646669] hover:text-[#303235] transition-color ease-in-out duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
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
  );
};
