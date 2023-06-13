import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profile from '../Pages/Profile/Profile';
import { API_URL } from '../../constants';

const ProfileContainer = ({user, history, ...rest}) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect( () => {
    fetch(`${API_URL}/users`, {
      headers: {
        authorization: `Bearer ${localStorage.uid}`
      }
    })
    .then(res => res.json())
    .then(parsedData => setUserProfile(parsedData.data))
    .catch(err => console.log('profile container error: ', err))
  }, [])

  return (
    <>
      <h1>Welcome Back</h1>
      <Profile user={user} userProfile={userProfile}/>
    </>
  );
};

export default ProfileContainer;
