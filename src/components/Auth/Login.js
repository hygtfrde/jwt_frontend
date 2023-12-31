import React, { useState, useEffect, useRef, useContext } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL, RENDER_EXPRESS_API } from '../../constants';
import { updateSignInDate, handleSubmit200 } from '../../utilities/api/userApi';
import { pingServerDefault, waitPromise } from '../../utilities/api/pingServer';
import LoadingModal from '../Layout/Loading';
import './login_styles.css';

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
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [continueLogin, setContinueLogin] = useState(false);
  const [pingState, setPingState] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Log User Info
  useEffect(() => {
    // console.info('========== LOGIN ==========');
    // console.log('Login.js >>>>>>>>>>>>>> user: ', user);
    // console.info('===========================');
  }, [user, isAuthenticated]);

  // Store the ref in the inputRefs object using the input name
  const registerInputRef = (name) => (ref) => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!email || !password) {
      setError({ message: "No email or password input" });
      setLoadingLogin(false);
      return;
    }
  
    const userLogin = {
      email: email,
      password: password
    };
  
    try {
      setLoadingLogin(true);
      const pingResponse = await pingServerDefault(RENDER_EXPRESS_API);
      // console.log('pingResponse ---> ', pingResponse);
  
      if (!pingResponse.success) {
        setError({message: "ping timed out, try again ..."});
        setLoadingLogin(false);
        setPingState(false);
        return
      } 
      else if (pingResponse.success) {  
        setPingState(true); 
        
        try {
          const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(userLogin)
          });

          if (!response.ok) {
            setError({message: "Login incorrect, retry again."});
            setLoadingLogin(false);
            return;
          }
          else if (response.ok) {
            const data = await response.json();
            setCurrentUser(data.signedJwt);
            navigate('/profile');
            console.log('Sending user to profile!');
          } else {
            const error = await response.json();
            setError({ ...error });
            setLoadingLogin(false);
            console.error('auth/login error: ', error);
          }
        } catch (error) {
          console.error('An error occurred during the auth/login request: ', error);
          setLoadingLogin(false);
        }
        
      }
    } 
    catch (error) {
      setLoadingLogin(false);
      setError({ message: error.message });
      console.error('Other Error:', error);
    }
  };
  
  const closeErrorButton = () => {
    setError(!error);
  }

  return (
    <div>
      <div className="login-wrap">
        {loadingLogin && <LoadingModal/>}
      </div>
      <div className="row">

        {error && (
          <div className="alert alert-danger alert-dismissible fade show" style={{width: '100%'}} role="alert">
            {error.message}
            <button onClick={closeErrorButton} type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

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
    </div>
  );
};

export default Login;
