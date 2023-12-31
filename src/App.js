import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RouteConfig from './routeConfig/routeConfig';
import NavBar from './components/Layout/NavBar';
import UserApi from '@/utilities/api/userApi';
import UserContext from '@/context/UserContext';

import './App.css';

const App = ({...rest}) => {
  // deprecate withRouter, use navigate
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("uid") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if authentication token exists in localStorage
    const checkToken = localStorage.getItem('uid');
    if (checkToken) {
      setIsAuthenticated(true);
      if (!user) {
        alert('auth token is valid, but user data timed out or failed to fetch')
      }
    }

    if (isAuthenticated) UserApi.updateSignInDate();

    // console.log('========> user: ', user)
    // if user is null, but auth token is in storage,
    // then refetch user data for profile display.

  }, [user, isAuthenticated]);

  const setCurrentUser = (token) => {
    // set user token
    localStorage.setItem('uid', token);
    setUser(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // handle logout
    localStorage.removeItem('uid');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <>
      <NavBar user={user} logout={logout}/>
      <div className="container">
        <RouteConfig 
          user={user} 
          setCurrentUser={setCurrentUser} 
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          logout={logout}/>
      </div>
    </>
  );
};

export default App;
