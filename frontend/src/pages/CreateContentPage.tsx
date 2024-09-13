import React, { useState } from "react";
import { createContent } from "@/services/contentService";
import { useNavigate } from "react-router-dom";
import { useTopics } from "@/hooks/useTopics";
import { useAuth } from "@/hooks/useAuth";

const CreateContentPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [topicId, setTopicId] = useState("");
  const [typeId, setTypeId] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const { topics, loading: topicsLoading, error: topicsError } = useTopics();
  const { user } = useAuth();
  const navigate = useNavigate();

  const returnContentTypeNameById = (id: string) => {
    // first get allowedContent types for the current selected topic, then find
    // the type with the matching id
    const topic = topics.find((topic) => topic._id === topicId);
    if (!topic) {
      return;
    }
    const contentType = topic.allowedContentTypes.find(
      (type) => type._id === id
    );
    if (!contentType) {
      return;
    }
    return contentType.name.toLowerCase();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (
        returnContentTypeNameById(typeId) === "image" &&
        !selectedFile.type.startsWith("image/")
      ) {
        setError("Please select a valid image file.");
        return;
      }
      if (
        returnContentTypeNameById(typeId) === "text" &&
        selectedFile.type !== "text/plain"
      ) {
        setError("Please select a valid .txt file.");
        return;
      }
      setFile(selectedFile);
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.token) {
      setError("Authentication required");
      return;
    }

    const newContent = new FormData();
    newContent.append("title", title);
    newContent.append("topic", topicId);
    newContent.append("type", typeId);

    if (returnContentTypeNameById(typeId) === "video") {
      if (!url) {
        setError("Please provide a URL for the video.");
        return;
      }
      newContent.append("url", url);
    } else {
      if (!file) {
        setError(`Please upload a file for the ${typeId} content.`);
        return;
      }
      newContent.append("file", file);
    }

    try {
      await createContent(newContent, user.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Error creating content, please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Create New Content</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {topicsError && <p className="text-red-500 mb-4">{topicsError}</p>}

      {topicsLoading ? (
        <p>Loading topics...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-bold">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-bold">Topic</label>
            <select
              value={topicId}
              onChange={(e) => setTopicId(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select a topic</option>
              {topics.map((topic) => (
                <option key={topic._id} value={topic._id}>
                  {topic.name}
                </option>
              ))}
            </select>
          </div>

          {topicId && (
            <div>
              <label className="block mb-2 text-sm font-bold">
                Content Type
              </label>
              <select
                value={typeId}
                onChange={(e) => setTypeId(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select a content type</option>
                {topics
                  .find((topic) => topic._id === topicId)
                  ?.allowedContentTypes.map((contentType) => (
                    <option key={contentType._id} value={contentType._id}>
                      {contentType.name}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {returnContentTypeNameById(typeId) === "video" && (
            <div>
              <label className="block mb-2 text-sm font-bold">Video URL</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          )}
          {(returnContentTypeNameById(typeId) === "image" ||
            returnContentTypeNameById(typeId) === "text") && (
            <div>
              <label className="block mb-2 text-sm font-bold">
                {returnContentTypeNameById(typeId) === "image"
                  ? "Upload Image"
                  : "Upload Text File"}
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                accept={
                  returnContentTypeNameById(typeId) === "image"
                    ? "image/*"
                    : ".txt"
                } // Aceptar solo imágenes o .txt
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Create Content
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateContentPage;
