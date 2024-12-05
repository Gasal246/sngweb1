import axios from "../api/axios";
import { getToken } from "../utils/localstorage-helper";
import useErrorHanding from "./useErrorHanding";

const useApi = () => {
  const [handleError] = useErrorHanding();

  const get = async (endpoint) => {
    let data, error;
    try {
      const result = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      data = result.data;
    } catch (err) {
      error = handleError(err);
    }
    return { data, error };
  };

  const post = async (endpoint, postData) => {

    let data, error;
    try {
      const result = await axios.post(endpoint, postData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
     

      data = result.data;
    } catch (err) {
    
      error = handleError(err);
    }
    return { data, error };
  };


  const put = async (endpoint, putData) => {
    
    let data, error;
    try {
      const result = await axios.put(endpoint, putData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
     

      data = result.data;
    } catch (err) {
     
      error = handleError(err);
    }
    return { data, error };
  };

  const del = async (endpoint) => {
    let data, error;
    try {
      const result = await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });


     
      data = result.data;
    } catch (err) {

      error = handleError(err);
    }
    return { data, error };
  };

  return { get, post, put, del };
};

export default useApi;