import { useState } from "react";
import { Content } from "@/models/Content";

export const useSearch = (contents: Content[]) => {
  const [query, setQuery] = useState<string>("");
  const [filteredContents, setFilteredContents] = useState<Content[]>(contents);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    const filtered = contents.filter((content) =>
      content.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredContents(filtered);
  };

  return { query, filteredContents, handleSearch };
};
