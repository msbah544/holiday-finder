import { useState } from "react";

const useFetchData = async (url) => {
  const [data, setData] = useState(null);
  const [formInfo, setFormInfo] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  if (formInfo.countryCode && formInfo.year) {
    setIsPending(true);
    fetch(
      url /*+
          formInfo.year +
          "/" +
          formInfo.countryCode*/
    )
      .then((response) => {
        if (response.ok != true) {
          setIsPending(false);
          throw Error("Resource not found!");
        } else console.log(response);
        return response.json();
      })
      .then((results) => {
        setData(results);
        setIsPending(false);
        setError(false);
        console.log(results);
      })
      .catch((err) => {
        setData(false);
        setIsPending(false);
        setError(err.message);
      });
  }
  return { data, formInfo, isPending, error };
};

export default useFetchData;
