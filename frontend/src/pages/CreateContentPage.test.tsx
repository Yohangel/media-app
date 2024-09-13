import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createContent } from "@/services/contentService";
import { useTopics } from "@/hooks/useTopics";
import { useAuth } from "@/hooks/useAuth";
import CreateContentPage from "@/pages/CreateContentPage";

// Mock de los hooks y servicios
jest.mock("@/services/contentService");
jest.mock("@/hooks/useTopics");
jest.mock("@/hooks/useAuth");

const mockTopics = [
  {
    _id: "1",
    name: "Topic 1",
    allowedContentTypes: [
      { _id: "image", name: "image" },
      { _id: "text", name: "text" },
    ],
  },
];

describe("CreateContentPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form and handles content creation successfully", async () => {
    (useTopics as jest.Mock).mockReturnValue({
      topics: mockTopics,
      loading: false,
      error: null,
    });
    (useAuth as jest.Mock).mockReturnValue({ user: { token: "user-token" } });
    (createContent as jest.Mock).mockResolvedValue(undefined);

    render(<CreateContentPage />);

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "New Content" },
    });
    fireEvent.change(screen.getByLabelText(/topic/i), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText(/content type/i), {
      target: { value: "image" },
    });
    fireEvent.change(screen.getByLabelText(/upload image/i), {
      target: { files: [new File([""], "image.jpg", { type: "image/jpeg" })] },
    });
    fireEvent.click(screen.getByText(/create content/i));

    await waitFor(() => {
      expect(createContent).toHaveBeenCalled();
      expect(screen.queryByText(/error creating content/i)).toBeNull();
    });
  });

  it("displays an error message if content creation fails", async () => {
    (useTopics as jest.Mock).mockReturnValue({
      topics: mockTopics,
      loading: false,
      error: null,
    });
    (useAuth as jest.Mock).mockReturnValue({ user: { token: "user-token" } });
    (createContent as jest.Mock).mockRejectedValue(
      new Error("Error creating content")
    );

    render(<CreateContentPage />);

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "New Content" },
    });
    fireEvent.change(screen.getByLabelText(/topic/i), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText(/content type/i), {
      target: { value: "image" },
    });
    fireEvent.change(screen.getByLabelText(/upload image/i), {
      target: { files: [new File([""], "image.jpg", { type: "image/jpeg" })] },
    });
    fireEvent.click(screen.getByText(/create content/i));

    await waitFor(() => {
      expect(
        screen.getByText(/error creating content, please try again./i)
      ).toBeInTheDocument();
    });
  });
});
