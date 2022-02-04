
import httpClient from "./httpClient";

export const onApiCall = async ({
  method,
  url,
  data,
  isFileUpload = false,
}) => {
  // const { resetClick } = useContext(Appcontext);

  const constructHeaders = () => {
    if (isFileUpload) {
      return {
        common: { "Content-Type": "multipart/form-data" },
      };
    } else {
      return {
        common: { "Content-Type": "application/json" },
      };
    }
  };

  try {
    const response = await httpClient.request({
      url,
      method,
      data,
      headers: constructHeaders(),
    });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("Err", error.response.data);
      // if (error.response.status == 401) {
      //   resetClick();
      // }
      return {
        data: error.response.data.error,
        status: error.response.status,
      };
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the
      // browser and an instance of
      // http.ClientRequest in node.js
      // console.log(error.request);
      return {
        data: "api error",
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
      return {
        data: "api error",
      };
    }
  }
};
