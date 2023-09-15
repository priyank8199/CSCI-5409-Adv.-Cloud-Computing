import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer } = Layout;

const Navbar = ({title}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set initial state to false, assuming the user is not logged in

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Function to handle logout action
  const handleLogout = () => {
    // Perform any logout logic here
    setIsLoggedIn(false);
  };

  return (
    <Layout className="layout">
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <h1 style={{ color: 'white', fontFamily: 'sans-serif', fontSize: '22px', marginRight: '20px' }}>
          CineTime
        </h1>
        {title === 'loggedIn' ? (
          <Button onClick={handleLogout} style={{ marginLeft: 'auto' }}>
            Logout
          </Button>
        ) : (
          <Button style={{ marginLeft: 'auto' }}>
            <Link to="/login">Login</Link>
          </Button>
        )}
        <div className="demo-logo" />
      </Header>
    </Layout>
  );
};

export default Navbar;
