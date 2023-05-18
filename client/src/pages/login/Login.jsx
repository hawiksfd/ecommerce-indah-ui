import React, {useState, useEffect} from 'react'
import './login.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from "../../reducers/auth.js";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { uid, isAuthenticated, isloading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (uid) {
        navigate('/');
    }
  }, []);


  const handleClick = async (e) => {
      e.preventDefault();
      await dispatch(login({username, password}))
      navigate('/');
  };
  
  return (
  <div className='login'>
      <div className="lContainer">
          {/* <form className= "box mt-5" > */}
              <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='username'
                  // id='username'
                  className="lInput"
              />
              <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='password'
                  // id='password'
                  className="lInput"
              />
              <button 
              disabled={isloading}
              onClick={handleClick}
              className="lButton">Login</button>
          {/* </form> */}

              <span>Don't have an account?</span>
              <button className="navButton">Sign up now!</button>

              {/* {message && <span>{message}</span>} */}
      </div>
  </div>
  )
}

export default Login