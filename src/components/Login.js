import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Link를 import
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 10px 0 5px;
  color: #666;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
`;

const Button = styled.button`
  padding: 10px;
  color: #fff;
  background-color: #007BFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 10px;
  color: #007BFF;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Login = ({ onLogin }) => {
  const [user_id, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/login", {
        user_id: user_id,
        password: password
      });
      if (response.data["response"] === true){
        sessionStorage.setItem("user_id", user_id);
        console.log(response.data);
        onLogin();  // 로그인 상태 업데이트
        window.location.href = '/userPage';
      } else {
        alert("아이디나 비번 틀림.");
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="user_id">Username:</Label>
        <Input
          type="text"
          id="user_id"
          value={user_id}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Label htmlFor="password">Password:</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </Form>
      <StyledLink to="/member">회원가입</StyledLink>
    </Container>
  );
};

export default Login;