import { useEffect, useState } from "react";
import axios from "axios";

// Custom hook for fetching data from an API
const useFetch = (url) => {
  const [data, setData] = useState([]); // State to store the fetched data
  const [loading, setLoading] = useState(false); // State to track the loading status
  const [error, setError] = useState(false); // State to track any errors during fetching

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true while fetching
      try {
        const res = await axios.get(url); // Send GET request to the specified URL
        setData(res.data); // Update the data state with the fetched data
      } catch (err) {
        setError(err); // Set error state if an error occurs during fetching
      }
      setLoading(false); // Set loading to false after fetching is complete
    };
    fetchData(); // Call the fetchData function when the component mounts or the URL changes
  }, [url]);

  // Function to manually trigger a refetch of the data
  const reFetch = async () => {
    setLoading(true); // Set loading to true while fetching
    try {
      const res = await axios.get(url); // Send GET request to the specified URL
      setData(res.data); // Update the data state with the fetched data
    } catch (err) {
      setError(err); // Set error state if an error occurs during fetching
    }
    setLoading(false); // Set loading to false after fetching is complete
  };

  return { data, loading, error, reFetch }; // Return the data, loading status, error, and reFetch function
};

export default useFetch;
