import { useState } from "react";
import type {User} from '../../types'
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate=useNavigate();
  const [nickName, setNickName] = useState("");

  const handler = () => {
      const usersJSON = localStorage.getItem('typingUsers');
      const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];

      // 2. Check if user already exists
      let existingUser = users.find((u) => u.nickName === nickName);
      if (existingUser) {
        localStorage.setItem('currentUser', JSON.stringify(existingUser));
          navigate('/');
        return;
      }

      const newUser: User = {
        nickName,
        averageWPM: 0,
        results: [],
      };

      users.push(newUser);
      localStorage.setItem('typingUsers', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
        navigate('/');

      
  };

  return (
    <>
      <input
        type="text"
        value={nickName}
        onChange={(e) => setNickName(e.target.value)}
        placeholder="textt"
      />
      <button onClick={handler} >enter</button>
    </>
  );
};
