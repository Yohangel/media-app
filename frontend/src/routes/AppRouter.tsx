import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ContentDetailPage from "@/pages/ContentDetailPage";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import CreateContentPage from "@/pages/CreateContentPage";
import PrivateRoute from "@/routes/PrivateRoute";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/content/:id"
        element={
          <PrivateRoute
            roles={["admin", "editor", "viewer"]}
            element={<ContentDetailPage />}
          />
        }
      />
      <Route
        path="/create-content"
        element={
          <PrivateRoute
            roles={["admin", "editor"]}
            element={<CreateContentPage />}
          />
        }
      />
    </Routes>
  );
};

export default AppRouter;
