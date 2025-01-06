import { baseUrl } from "../config/apiUrlConfig";
import SuperFetch from "../config/superfetch";

const User = {
  getUserList: async () => {
    const url = `${baseUrl.user}/`;
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
