import { useState, useEffect } from "react";
import { getTopicsWithContentTypes } from "@/services/topicService";
import { Topic } from "@/models/Topic";

export const useTopics = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      const data = await getTopicsWithContentTypes();
      setTopics(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch topics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return { topics, loading, error, fetchTopics };
};
