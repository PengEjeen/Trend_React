import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiComponent = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://172.23.238.238/api/tests');
        setTests(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {tests.map(test => (
            <div key={test.id} style={{ display:'flex', felxDirection:'row', border: '10px solid #ccc', padding: '10px' }}>
              <h3><strong>{test.name}</strong></h3>
              <p style={{ borderRight: '1px solid #ccc', borderLeft: '1px solid #ccc', paddingRight: '10px', paddingLeft: '10px', marginRight: '10px', marginLeft: '10px' }} >{test.description}</p>
              <p>{test.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApiComponent;