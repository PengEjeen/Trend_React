import React, { useState } from 'react';
import { Link, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Header from "./components/Header";
import UserPage from "./components/UserPage";
import Member from "./components/Member";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('user_id'));

  const handleLogin = () => {
    // 로그인 성공 시 실행되는 코드
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // 로그아웃 시 실행되는 코드
    setIsLoggedIn(false);
    sessionStorage.removeItem('user_id');
    window.location.href = '/'; // 로그아웃 후 홈으로 리다이렉트
  };
  return (
    <div className="App">
      <nav>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/userPage" element={<UserPage />}></Route>
        <Route path="/member" element={<Member />}></Route>
      </Routes>
    </div>
  );
}

export default App;