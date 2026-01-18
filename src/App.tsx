import { Game } from "./pages/gamePage/Game";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/loginPage/Login";
import { Status } from "./pages/statusPage/Status";



export const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/status" element={<Status/>}/>
      </Routes>
    </>
  );
};
