import React, { useState, useEffect, useRef, useContext } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../constants';

const Login = ({ 
  user, 
  setCurrentUser, 
  isAuthenticated,
  setIsAuthenticated,
  history, 
  ...rest 
}) => {
  const inputRefs = useRef({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Log User Info
  useEffect(() => {
    if (isAuthenticated) {
      console.log("LOGIN AUTH OK ...")
    }

    console.info('========== LOGIN ==========');
    console.log('Login.js >>>>>>>>>>>>>> user: ', user);
    console.log('Login.js >>>>>>>>>>>>>> isAuthenticated: ', isAuthenticated);
    console.info('===========================');
  }, [user, isAuthenticated]);

  const registerInputRef = (name) => (ref) => {
    // Store the ref in the inputRefs object using the input name
    inputRefs.current[name] = ref;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch(name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value)
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userLogin = {
      email: email,
      password: password
    };

    console.log('userLogin ......... ', userLogin);

    fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userLogin)
    })
    .then(res => {
      return res.json(); // Return the parsed JSON
    })
    .then(data => {
      setCurrentUser(data.signedJwt);
      navigate('/profile'); 
      console.log('Sending user to profile!');
    })
    .catch(err => {
      setError({ ...err });
      console.error('error ===> ', error);
    });
  };

  return (
    <div className="row">

      {/* {this.state.error && (
        <div className="alert alert-danger alert-dismissible fade show" style={{width: '100%'}} role="alert">
          {this.state.error}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )} */}

      <section id="login" className="col-md-6 offset-md-3">
        <h2 className="mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email} 
              onChange={handleChange} 
              className="form-control form-control-lg" 
              placeholder="example@example.com"
              ref={registerInputRef('email')}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={password}
              onChange={handleChange} 
              className="form-control form-control-lg"
              ref={registerInputRef('password')}
            />
          </div>
          <button type="submit" className="btn btn-primary float-right">Login</button>
        </form>
      </section>

    </div>
  );
};

export default Login;
