import { Content } from "@/models/Content";
import React, { useMemo } from "react";

interface ContentSummaryProps {
  contents: Content[];
}
const ContentSummary: React.FC<ContentSummaryProps> = ({ contents }) => {
  const contentCountByType = useMemo(() => {
    const countMap: Record<string, number> = {};
    contents.forEach((content) => {
      const typeName = content.type.name;
      countMap[typeName] = (countMap[typeName] || 0) + 1;
    });
    return countMap;
  }, [contents]);

  return (
    <div className="container mx-auto px-4 py-3 flex items-center justify-between">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Content Summary</h2>
        <div className="flex space-x-4">
          {Object.entries(contentCountByType).map(([type, count]) => (
            <div
              key={type}
              className="flex flex-col items-center justify-center bg-gray-200 text-gray-800 p-2 rounded-md shadow-sm"
            >
              <span className="text-sm font-medium">{type}</span>
              <span className="text-sm font-bold">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentSummary;
