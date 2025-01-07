/* eslint-disable react/prop-types */
export default function UserTable({ data, currentPage, paginate }) {
  return (
    <table className="min-w-full border-collapse table-auto">
      <thead>
        <tr className="bg-gray-700 text-gray-300">
          <th className="p-4 text-left">S/N</th>
          <th className="p-4 text-left">Name</th>
          <th className="p-4 text-left">Email</th>
          <th className="p-4 text-left">Updated At</th>
          <th className="p-4 text-left">Created At</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr
              key={item.id}
              className="odd:bg-gray-900 even:bg-gray-800 hover:bg-gray-700"
            >
              <td className="p-4">
                {index + 1 + (currentPage - 1) * paginate}
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
            <td colSpan={5} className="p-4 text-center text-gray-400 italic">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
