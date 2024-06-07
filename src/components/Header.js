import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: #333;
  padding: 10px 0;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-right: 50px;
  font-size: 1.2em;
  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.2em;
  &:hover {
    text-decoration: underline;
  }
`;

const Header = ({ isLoggedIn, onLogout }) => {
  return (
    <HeaderContainer>
      <Nav>
        <NavLink to="/">Home</NavLink>
        {isLoggedIn ? (
          <>
            <NavLink to="/userPage">User Page</NavLink>
            <LogoutButton onClick={onLogout}>Logout</LogoutButton>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;