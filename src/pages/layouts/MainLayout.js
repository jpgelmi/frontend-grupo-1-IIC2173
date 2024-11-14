// Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from '../../components/Navbar/Navbar.js';

const MainLayout = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated && <Navbar />}
      <div style={isAuthenticated ? styles.contentWithNavbar : styles.contentWithoutNavbar}>
        <Outlet />
      </div>
    </div>
  );
};

const styles = {
  contentWithNavbar: {
    height: '100%',
    marginTop: '90px',
  },
  contentWithoutNavbar: {
    marginTop: '10px',
  },
};

export default MainLayout;