import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useAuth } from "@/hooks/useAuth";
import LoginForm from "@/components/LoginForm";

jest.mock("@/hooks/useAuth");

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form and handles successful login", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      login: jest.fn().mockResolvedValue(undefined),
    });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText(/login/i));

    await waitFor(() => {
      expect(screen.queryByText(/login failed/i)).toBeNull();
    });
  });

  it("displays an error message on login failure", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      login: jest.fn().mockRejectedValue(new Error("Login failed")),
    });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText(/login/i));

    await waitFor(() => {
      expect(
        screen.getByText(/login failed. please check your credentials./i)
      ).toBeInTheDocument();
    });
  });
});
