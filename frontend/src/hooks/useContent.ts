import { useState, useEffect } from "react";
import { getContent } from "@/services/contentService";
import { Content } from "@/models/Content";

export const useContent = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContents = async (query = "", searchBy = "") => {
    try {
      setLoading(true);
      const data = await getContent(query, searchBy);
      setContents(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial content without filters
    fetchContents();
  }, []);

  return { contents, loading, error, fetchContents };
};
