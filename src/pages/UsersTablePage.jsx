import { useState, useEffect } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import User from "../services/User";

const UsersTablePage = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [paginate, setPaginate] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      //   const response = await User.getUserList();
      const response = await fetch("https://api.razzakfashion.com");
      console.log(response);
      const result = await response.json();
      setData(result.data);
      setCurrentPage(result.current_page);
    };

    fetchData();
  }, [paginate, search]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handleRowsPerPageChange = (event) => {
    setPaginate(event.target.value);
    setCurrentPage(1); // Reset to first page when rows per page changes
  };

  return (
    <div className="mt-8">
      {/* Reference Image */}
      <img
        src="your-image-url-here"
        alt="Reference"
        className="w-full h-auto"
      />

      {/* Table Container */}
      <div className="overflow-x-auto mt-6">
        <div className="flex justify-between mb-4">
          {/* Search Bar */}
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-md"
          />

          {/* Rows per Page */}
          <div className="flex items-center">
            <span className="mr-2">Rows per page:</span>
            <select
              value={paginate}
              onChange={handleRowsPerPageChange}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 border-b">First Name</th>
              <th className="p-4 border-b">Last Name</th>
              <th className="p-4 border-b">Address</th>
              <th className="p-4 border-b">Status</th>
              <th className="p-4 border-b">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="odd:bg-white even:bg-gray-50">
                <td className="p-4 border-b">{item.first_name || "N/A"}</td>
                <td className="p-4 border-b">{item.last_name || "N/A"}</td>
                <td className="p-4 border-b">{item.address || "N/A"}</td>
                <td className="p-4 border-b">{item.status || "N/A"}</td>
                <td className="p-4 border-b">{item.phone_number || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between mt-4 items-center">
          <div className="flex items-center">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
            >
              <FaAngleDoubleLeft />
            </button>
            <button
              onClick={() =>
                setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
              }
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={() =>
                setCurrentPage(
                  currentPage < data.length / paginate
                    ? currentPage + 1
                    : currentPage
                )
              }
              disabled={currentPage === data.length / paginate}
              className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
            >
              <FaAngleRight />
            </button>
            <button
              onClick={() => setCurrentPage(Math.ceil(data.length / paginate))}
              disabled={currentPage === Math.ceil(data.length / paginate)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              <FaAngleDoubleRight />
            </button>
          </div>

          <div>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {Math.ceil(data.length / paginate)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTablePage;
