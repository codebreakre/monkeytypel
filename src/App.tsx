import { Game } from "./pages/gamePage/Game";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/loginPage/Login";
import { Status } from "./pages/statusPage/Status";
import { Layout } from "./components/Layout";

export const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/login" element={<Login />} />
          <Route path="/status" element={<Status />} />
        </Routes>
      </Layout>
    </>
  );
};
