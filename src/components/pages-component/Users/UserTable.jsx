/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaSortUp, FaSortDown } from "react-icons/fa";

export default function UserTable({ data }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key] || "";
    const bValue = b[sortConfig.key] || "";
    if (sortConfig.direction === "ascending") {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const renderSortIcons = (key) => (
    <div className="flex flex-col items-center -space-y-1 ml-1">
      <FaSortUp
        className={`${
          sortConfig.key === key && sortConfig.direction === "ascending"
            ? "text-white"
            : "text-gray-500"
        }`}
      />
      <FaSortDown
        className={`${
          sortConfig.key === key && sortConfig.direction === "descending"
            ? "text-white"
            : "text-gray-500"
        }`}
      />
    </div>
  );
  

  return (
    <table className="min-w-full border-collapse table-auto">
      <thead>
        <tr className="bg-gray-700 text-gray-300">
          <th className="p-4 text-left">
            <input type="checkbox" />
          </th>
          <th className="p-4 text-left">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Name
              {renderSortIcons("name")}
            </div>
          </th>
          <th className="p-4 text-left">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleSort("email")}
            >
              Email
              {renderSortIcons("email")}
            </div>
          </th>
          <th className="p-4 text-left">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleSort("updated_at")}
            >
              Updated At
              {renderSortIcons("updated_at")}
            </div>
          </th>
          <th className="p-4 text-left">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleSort("created_at")}
            >
              Created At
              {renderSortIcons("created_at")}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.length > 0 ? (
          sortedData.map((item) => (
            <tr
              key={item.id}
              className="odd:bg-gray-900 even:bg-gray-800 hover:bg-gray-700"
            >
              <td className="p-4">
                <input type="checkbox" />
              </td>
              <td className="p-4">{item.name || "N/A"}</td>
              <td className="p-4">{item.email || "N/A"}</td>
              <td className="p-4">
                {new Date(item.updated_at).toLocaleString() || "N/A"}
              </td>
              <td className="p-4">
                {new Date(item.created_at).toLocaleString() || "N/A"}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} className="p-4 text-center text-gray-400 italic">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
