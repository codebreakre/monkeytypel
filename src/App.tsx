import { Game } from "./pages/gamePage/Game";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/loginPage/Login";



export const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </>
  );
};
