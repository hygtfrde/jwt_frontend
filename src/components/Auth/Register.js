import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../constants';
import LoadingModal from '../Layout/Loading';
import './register_styles.css'
import { connect } from 'react-redux';
import { setEmail, setPassword } from '../../redux/actions';

const Register = ({...rest}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [date, setDate] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    // console.log('event target ', event.target)

    const { name, value } = event.target;
    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'password2': 
        setPassword2(value);
        break;
      default:
        break;
    }
  };

  const registerInputRef = (name) => (ref) => {
    // Store the ref in the inputRefs object using the input name
    inputRefs.current[name] = ref;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // validate password inputs match
    if (password === password2) {
      // console.log('user input OK')
    } else if (password !== password2) {
      console.error('passwords do not match')
      return;
    }

    setDate(new Date());
    const newUser = {
      username: username,
      email: email,
      password: password,
      password2: password2,
      signup_date: date
    };
    setLoading(true);
    axios.post(`${API_URL}/auth/register`, newUser)
      .then(res => {
        // console.log('...processing register...')
        // TODO: autofill login form on next page
        navigate('/login');
        // console.log('Register complete')
      })
      .catch(err => {
        console.log('error in Register: ');
        setErrors({ post_err: err });
        console.error('---> ', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="row">
      {/* {errors && errors.map((e, i) => (
        <div className="alert alert-danger alert-dismissible fade show" style={{width: '100%'}} role="alert" key={i}>
          {e.message}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ))} */}
      <section id="register" className="col-md-6 offset-md-3">
        <h2 className="mb-4">Register</h2>
        {loading && <LoadingModal/>}
        <p style={{'borderBottom': '10px solid #343a40', 'width': '100%'}}>Sign up as a new user.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="username"
              id="username" 
              name="username" 
              onChange={handleChange} 
              className="form-control form-control-lg" 
              placeholder="user name"
              ref={registerInputRef('username')}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              onChange={handleChange} 
              className="form-control form-control-lg" 
              placeholder="example@example.com"
              ref={registerInputRef('email')}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password"
              id="password"
              name="password" 
              onChange={handleChange} 
              className="form-control form-control-lg"
              ref={registerInputRef('password')}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input 
              type="password"
              id="password2"
              name="password2"
              onChange={handleChange}
              className="form-control form-control-lg" 
              ref={registerInputRef('password2')}
            />
          </div>
          <button type="submit" className="btn btn-primary float-right">Register</button>
        </form>
      </section>
    </div>
  );
};

export default Register;
