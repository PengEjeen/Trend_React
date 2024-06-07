import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPage = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = sessionStorage.getItem('user_id');
        const response = await axios.get(`http://127.0.0.1:8000/userPage/${user}`);
        setUserData(response.data.response);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const addBaseUrl = (link) => {
    return `http://localhost:8000/${link}`;
  };

  const renderTestResults = (testResult) => {
    return (
      <div style={{ marginTop: '20px' }}>
        <h4>Test Results:</h4>
        <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd' }}>
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Measure</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(testResult).map(([measure, value]) => (
              <tr key={measure} style={{ border: '1px solid #ddd' }}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{measure}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const handleCreate = async () => {
    try {
      const user = sessionStorage.getItem('user_id');
      alert("생성중...");
      await axios.get(`http://127.0.0.1:8000/createPage/${user}/?keyword=${keyword}`);
      alert('페이지가 성공적으로 생성되었습니다.');
      window.location.href = '/userPage';
    } catch (error) {
      console.error('Error creating page:', error);
      alert('페이지 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1, background: '#f2f2f2', padding: '20px' }}>
          <h3>Your List</h3>
          <button onClick={() => setShowModal(true)} style={{ marginBottom: '10px' }}>Create New</button>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {userData.map((data, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                <button onClick={() => handleUserClick(data)} style={{ width: '100%', padding: '10px' }}> 
                    {data.keyword}
                </button>{' '}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: 10 }}>
          <h3>User Details</h3>
          {selectedUser && (
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#333', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>{selectedUser.keyword}</h4>
              {selectedUser.df_plot && (
                <div style={{ margin: '10px 0', lineHeight: '1.6' }}>
                  <h4>DF Plot:</h4>
                  <img src={addBaseUrl(selectedUser.df_plot)} alt="DF Plot" style={{ maxWidth: '100%' }} />
                </div>
              )}
              {selectedUser.decompose_plot && (
                <div style={{ margin: '10px 0', lineHeight: '1.6' }}>
                  <h4>Decompose Plot:</h4>
                  <img src={addBaseUrl(selectedUser.decompose_plot)} alt="Decompose Plot" style={{ maxWidth: '100%' }} />
                </div>
              )}
              {selectedUser.predict_plot && (
                <div style={{ margin: '10px 0', lineHeight: '1.6' }}>
                  <h4>Predict Plot:</h4>
                  <img src={addBaseUrl(selectedUser.predict_plot)} alt="Predict Plot" style={{ maxWidth: '100%' }} />
                </div>
              )}
              {selectedUser.test_result && renderTestResults(selectedUser.test_result)}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h3>Create New</h3>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="키워드 입력"
              style={modalStyles.input}
            />
            <div style={modalStyles.buttonContainer}>
              <button onClick={handleCreate} style={modalStyles.button}>Create</button>
              <button onClick={() => setShowModal(false)} style={modalStyles.button}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '90%',
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default UserPage;