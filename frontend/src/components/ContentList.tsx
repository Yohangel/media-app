import { Content } from "@/models/Content";
import React from "react";
import { Link } from "react-router-dom";

interface ContentListProps {
  contents: Content[];
}

const ContentList: React.FC<ContentListProps> = ({ contents }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Content List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border-b">Title</th>
              <th className="px-4 py-2 border-b">Type</th>
              <th className="px-4 py-2 border-b">Author</th>
              <th className="px-4 py-2 border-b">Topic</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contents.map((content) => (
              <tr key={content._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">
                  <Link
                    to={`/content/${content._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {content.title}
                  </Link>
                </td>
                <td className="px-4 py-2 border-b">{content.type.name}</td>
                <td className="px-4 py-2 border-b">
                  {content.author?.username}
                </td>
                <td className="px-4 py-2 border-b">{content.topic.name}</td>
                <td className="px-4 py-2 border-b">
                  <Link
                    to={`/content/${content._id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentList;
