import React from 'react';
import { Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import Home from '../components/Pages/Home/Home';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import ProfileContainer from '../components/PagesContainers/ProfileContainer';
import ContactsContainer from '../components/PagesContainers/ContactsContainer';
import NotFound from './NotFound';

const RouteConfig = ({ 
  user,
  setCurrentUser, 
  isAuthenticated, 
  setIsAuthenticated, 
  history, 
  ...rest
}) => {
  const location = useLocation();

  const PrivateRoute = ({ component: Component, ...rest }) => {
    if (!isAuthenticated || !user) {
      console.error('No authentication found. Redirecting...');
      return <Navigate to="/login" routeState={{ from: location }} />;
    } else {
      return (
        <>
          <div>PrivateRoute</div>
          <Route
            {...rest}
            render={(props) =>
              isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
            }
          />
        </>
      );
    }
  };
  

  return (
    <Routes>
        <Route exact='true' path='/' element={<Home/>} />
        <Route
          path="/login"
          element={
            <Login 
              user={user} 
              setCurrentUser={setCurrentUser} 
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
              history={history} 
            />
          }
        />
        <Route 
          path='/register' 
          element={<Register/>} 
        />
        <Route component={<PrivateRoute/>}>
          <Route 
            path='/contacts'
            element={<ContactsContainer user={user} history={history} />} 
          />
        </Route>

        <Route component={<PrivateRoute/>}>
          <Route 
            path='/profile' 
            element={<ProfileContainer user={user} history={history} />} 
          />
          <Route/>
        </Route>

        <Route path="*" element={<NotFound/>} />

    </Routes>
  );
};

export default RouteConfig;
