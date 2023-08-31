import { Authentication } from "pages/Authentication";
import { Routes, Route } from "react-router-dom";

function AuthenticationRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Authentication />}></Route>
      <Route path="/login" element={<Authentication />}></Route>
    </Routes>
  );
}

export default AuthenticationRoutes;
