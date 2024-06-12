import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserDetail from './UserDetail';
import NaverSearch from './NaverSearch';
import './UserPage.css';

const UserPage = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('userDetail'); // 'userDetail' 또는 'naverSearch'

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleComponentSelection = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1, background: '#f2f2f2', padding: '20px' }}>
          <h3>List</h3>
          <button onClick={openModal} className="create-button">Create</button>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {userData.map((data, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                <button onClick={() => handleUserClick(data)} style={{ width: '100%', padding: '10px' }}>
                  {data.keyword}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: 10 }}>
          <h3>User Details</h3>
          <div>
            <button onClick={() => handleComponentSelection('userDetail')} className="selection-button">
              User Detail
            </button>
            <button onClick={() => handleComponentSelection('naverSearch')} className="selection-button">
              Info
            </button>
          </div>
          {selectedComponent === 'userDetail' && selectedUser && (
            <UserDetail user={selectedUser} addBaseUrl={addBaseUrl} />
          )}
          {selectedComponent === 'naverSearch' && (
            <NaverSearch keyword={selectedUser ? selectedUser.keyword : ''} />
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create Page</h2>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="키워드 입력"
              className="modal-input"
            />
            <button onClick={handleCreate} className="modal-button">Create</button>
            <button onClick={closeModal} className="modal-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;