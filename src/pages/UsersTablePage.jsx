import { useState, useEffect } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import User from "../services/User";
import UserTable from "../components/pages-component/Users/UserTable";
import Loader from "../components/shared-component/Loader";

const UsersTablePage = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [paginate, setPaginate] = useState(10); // Default rows per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const fetchData = async () => {
    setLoading(true); // Start loading when fetching data
    const response = await User.getUserList(paginate, search, currentPage);
    if (response?.status === 200) {
      setData(response?.data?.data || []);
      setCurrentPage(response?.data?.current_page || 1);
      setTotalPages(response?.data?.last_page || 1);
      setNextPageUrl(response?.data?.next_page_url || null);
      setPrevPageUrl(response?.data?.prev_page_url || null);
    }
    setLoading(false); // Stop loading after data is fetched
  };

  useEffect(() => {
    fetchData();
  }, [paginate, search, currentPage]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1); // Reset to the first page when search changes
  };

  const handleRowsPerPageChange = (event) => {
    setPaginate(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to the first page when rows per page changes
  };

  return (
    <div className="p-4 pt-24" id="users-table">
      {/* Loader */}
      {loading && <Loader />}

      {/* Search and Rows Per Page */}
      <div className="flex justify-between mb-4">
        {/* Search Bar */}
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search area"
          className="p-2 border border-gray-300 rounded-md w-1/3"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-gray-800 text-white rounded-md shadow-md">
        {/* Table */}
        <UserTable data={data} currentPage={currentPage} paginate={paginate} />

        {/* Pagination */}
        <div className="flex justify-between items-center p-4">
          {/* Current Page */}
          <div>
            <span className="text-gray-400">
              Page {currentPage} of {totalPages || 1}
            </span>
          </div>
          {/* Pagination Buttons */}
          <div className="flex items-center">
            {/* Rows per Page */}
            <div className="flex items-center mr-3">
              <span className="mr-1">Rows per page:</span>
              <select
                value={paginate}
                onChange={handleRowsPerPageChange}
                className="p-2 border bg-gray-800 border-gray-800 rounded-md"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 ${
                currentPage === 1
                  ? "bg-gray-500"
                  : "bg-blue-600 hover:bg-blue-500"
              } text-white rounded-md mr-2`}
            >
              <FaAngleDoubleLeft />
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={!prevPageUrl}
              className={`px-3 py-1 ${
                !prevPageUrl ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-500"
              } text-white rounded-md mr-2`}
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={!nextPageUrl}
              className={`px-3 py-1 ${
                !nextPageUrl ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-500"
              } text-white rounded-md mr-2`}
            >
              <FaAngleRight />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 ${
                currentPage === totalPages
                  ? "bg-gray-500"
                  : "bg-blue-600 hover:bg-blue-500"
              } text-white rounded-md`}
            >
              <FaAngleDoubleRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTablePage;
