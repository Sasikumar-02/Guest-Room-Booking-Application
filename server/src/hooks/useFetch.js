import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  // State variables to store data, loading status, and error
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch data from the specified URL using Axios
        const res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    // Call the fetchData function when the component mounts or when the URL changes
    fetchData();
  }, [url]);

  // Function to refetch data
  const reFetch = async () => {
    setLoading(true);
    try {
      // Fetch data from the URL again
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  // Return the data, loading status, error, and reFetch function
  return { data, loading, error, reFetch };
};

export default useFetch;
