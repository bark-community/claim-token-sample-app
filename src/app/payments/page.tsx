import React, { useState, useEffect } from 'react';
import DataTable from './data-table'; // Import DataTable component

const Page: React.FC = () => {
  const [data, setData] = useState([]);

  // Fetch data from server
  useEffect(() => {
    // Your data fetching logic goes here
    // Example:
    // fetch('api/payments')
    //   .then((response) => response.json())
    //   .then((data) => setData(data));
  }, []);

  return (
    <div>
      <h1>Payments</h1>
      <DataTable data={data} /> {/* Render DataTable component with data */}
    </div>
  );
};

export default Page;
