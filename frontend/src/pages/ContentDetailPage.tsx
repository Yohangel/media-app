import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getContentById } from "@/services/contentService";
import { Content } from "@/models/Content";
import { useAuth } from "@/hooks/useAuth";

const ContentDetailPage: React.FC = () => {
  const { id } = useParams();
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await getContentById(id!, user?.token as string);
        setContent(data);
      } catch (error) {
        console.error("Failed to load content", error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [id, user?.token]);

  const renderContent = () => {
    if (!content) return null;

    switch (content.type.name.toLowerCase()) {
      case "image":
        return (
          <img
            src={content.url}
            alt={content.title}
            className="w-full max-w-lg mx-auto rounded-lg shadow-md"
          />
        );
      case "text":
        return (
          <iframe
            src={content.url}
            className="w-full h-96 border rounded-lg"
            title="Text Content"
          />
        );
      case "video": {
        const youtubeEmbedUrl = content.url.replace("watch?v=", "embed/");
        return (
          <iframe
            src={youtubeEmbedUrl}
            className="w-full h-96 rounded-lg shadow-md"
            title="Video Content"
            allowFullScreen
          />
        );
      }
      default:
        return <p className="text-red-500">Unknown content type</p>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : content ? (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">{content.title}</h1>
          <p className="text-sm text-gray-500 mb-2">
            Author: {content.author.username}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Topic: {content.topic.name}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Type: {content.type.name}
          </p>

          <div className="mb-6">{renderContent()}</div>

          <div className="text-right">
            <a
              href={content.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Source
            </a>
          </div>
        </div>
      ) : (
        <p className="text-center text-red-500">Content not found</p>
      )}
    </div>
  );
};

export default ContentDetailPage;
