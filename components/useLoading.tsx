import React, { useState, useEffect } from "react";
import Spinner from "react-native-loading-spinner-overlay";

const useLoading = () => {
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setInterval(() => {
      setLoading(!isLoading);
    }, 3000);
  }, []);
  return isLoading;
};

export default useLoading;

{
  /* <Spinner
visible={isLoading}
textContent={"Loading..."}
textStyle={{ color: "#fff" }}
/> */
}
