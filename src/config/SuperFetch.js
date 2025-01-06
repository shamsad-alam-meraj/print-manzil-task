import axios from "axios";

const SuperFetch = async (url, method = "GET", data = null, headers = {}) => {
  try {
    const response = await axios({
      url,
      method,
      data,
      headers,
    });

    return {
      status: response.status,
      data: response.data,
      error: false,
    };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      data: error.response?.data || "Something went wrong",
      error: true,
    };
  }
};

export default SuperFetch;
