import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Connection = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9000");
        setData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <p>Data: {JSON.stringify(data)}</p>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Connection;