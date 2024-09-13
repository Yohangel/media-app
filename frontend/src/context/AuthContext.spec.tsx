import { render, screen, waitFor } from "@testing-library/react";
import { AuthProvider, AuthContext } from "@/context/AuthContext";
import { login as loginService } from "@/services/authService";
import React from "react";

jest.mock("@/services/authService");
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

describe("AuthProvider", () => {
  it("provides user data after login", async () => {
    const mockUser = { _id: "123", username: "testuser", token: "abcd1234" };
    (loginService as jest.Mock).mockResolvedValue(mockUser);
    (global.localStorage.getItem as jest.Mock).mockReturnValue(null);

    const TestComponent = () => {
      const auth = React.useContext(AuthContext);
      return <div>{auth?.user?.username}</div>;
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Simular login
    const auth = React.useContext(AuthContext);
    await auth?.login("testuser", "password");

    await waitFor(() => {
      expect(screen.getByText("testuser")).toBeInTheDocument();
    });
  });

  it("removes user data on logout", async () => {
    const mockUser = { _id: "123", username: "testuser", token: "abcd1234" };
    (loginService as jest.Mock).mockResolvedValue(mockUser);
    (global.localStorage.getItem as jest.Mock).mockReturnValue(
      JSON.stringify(mockUser)
    );

    const TestComponent = () => {
      const auth = React.useContext(AuthContext);
      return (
        <div>
          <button onClick={() => auth?.logout()}>Logout</button>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const auth = React.useContext(AuthContext);
    await auth?.logout();

    await waitFor(() => {
      expect(global.localStorage.removeItem).toHaveBeenCalledWith("user");
    });
  });
});
