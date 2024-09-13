import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import AppRouter from "@/routes/AppRouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BrowserRouter as Router } from "react-router-dom"; // Importa Router aquí

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main>
            <AppRouter />
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
