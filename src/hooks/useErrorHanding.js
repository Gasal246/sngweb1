// import { removeToken } from "../utils/localstorage-helper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useErrorHanding = (err) => {

  const navigate = useNavigate()

  const handleError = (err) => {
    debugger
    let error;
    if (err.response) {
      // this is an api error
      if (err.response.status === 401) {
        navigate("/dashboard");
      }
      error = err.response.data;
    } else {
      error = err.response; // normal error
    }
    if (!(typeof err.response.data.message === 'string') && !(typeof err.response.data.messages === 'string')) {
      if (!err.response.data.messages)
        for (let index = 0; index < Object.values(err.response.data.message).length; index++) {
          toast.error((Object.values(err.response.data.message)[index]), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      else {
        toast.error(error.messages, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
    else {
      toast.error(err.response.data.message ? err.response.data.message : err.response.data.messages, {
        position: toast.POSITION.TOP_RIGHT,
      }
      );
    }
    // toast.error(error, {
    //   position: toast.POSITION.TOP_RIGHT,
    // });
    return error;
  };

  return [handleError];
};

export default useErrorHanding; 