import React from "react";
import ContentList from "@/components/ContentList";
import SearchBar from "@/components/SearchBar";
import { useContent } from "@/hooks/useContent";
import ContentSummary from "@/components/ContentSummary";

const HomePage: React.FC = () => {
  const { contents, loading, fetchContents } = useContent();

  const handleSearch = (query: string, searchBy: string) => {
    fetchContents(query, searchBy);
  };

  return (
    <div className="container mx-auto p-4">
      <SearchBar onSearch={handleSearch} />
      <ContentSummary contents={contents} />
      {loading ? <p>Loading...</p> : <ContentList contents={contents} />}
    </div>
  );
};

export default HomePage;
