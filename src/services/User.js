import { baseUrl } from "../config/apiUrlConfig";
import SuperFetch from "../config/superfetch";

const User = {
  getUserList: async (paginate, query, page) => {
    let url = `${baseUrl.user}?page=${page || 1}`;
    if (paginate) url += `&paginate=${paginate}`;
    if (query) url += `&search=${query}`;
    return await SuperFetch(url, "GET");
  },
  getUserListWithRowsPerPage: async (rowCount) => {
    const url = `${baseUrl.user}/?paginate=${rowCount}`;
    return await SuperFetch(url, "GET");
  },
  getUserBySearch: async (query) => {
    const url = `${baseUrl.user}/?search=${query}`;
    return await SuperFetch(url, "GET");
  },
};

export default User;
