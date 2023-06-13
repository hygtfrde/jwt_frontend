import React from 'react';
import './profile.scss';

const Profile = ({ user, userProfile, history, ...rest }) => {
  console.log('userProfile =====> ', userProfile)
  return (
    <div className='profile-container'>
      <h2>Profile Page</h2>
      <p className='profile-username'><strong>Username: </strong>{userProfile && userProfile.username}</p>
      <p className='profile-email'><strong>Email: </strong>{userProfile && userProfile.email}</p>
      <p className='profile-signup-date'><strong>Sign Up Date: </strong>{userProfile && userProfile.signup_date}</p>
      <p className='profile-token'><strong>JWT: </strong>{user}</p>
    </div>
  );
};

export default Profile;
