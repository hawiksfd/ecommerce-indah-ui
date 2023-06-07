import { faMagnifyingGlass, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { logout } from './../../reducers/auth';
import { useDispatch, useSelector } from 'react-redux';
import './navbar.css';
import { getCartbyUserUid } from './../../reducers/cart';


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const userId = JSON.parse(localStorage.getItem("user"));
  const { uid } = useSelector((state) => state.auth);
  const { cartuid } = useSelector((state) => state.cart);
  
  const handleLogin = async () => {
      navigate("/login")
  };

  useEffect(() => {
    if(uid){
      dispatch(getCartbyUserUid(uid));
    }
    // else{
    //   navigate("/login")
    // }
  }, [dispatch, uid, navigate])
  
  const handleLogout = async () => {
    await dispatch(logout());
      navigate("/")
  };

  return (
    <div className="navbar">
        <div className="navContainer">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <h1>Indah.shop</h1>
          </Link>
        
          <div className="search">
            <input className="searchItem" type="text" placeholder="Cari barang yang diinginkan" />
            <div className="searchIcon">
              <FontAwesomeIcon className="searchIcons" icon={faMagnifyingGlass}/>
            </div>
          </div>

          {uid ? 
            ( 
              <div className="rightIcon">
                <div className="shopIcons">
                  <Link to={`/cart/${uid}`}>
                    <FontAwesomeIcon className="shopIcons2" icon={faCartShopping}/>
                    <span className="badge">{cartuid ? cartuid.length : 0}</span>
                  </Link>
                </div>
                <div className="navItems">      
                  <Link to={`/user/${uid}`}>
                    <FontAwesomeIcon className="shopIcons2" icon={faUser}/>
                  </Link>
                  <button onClick={handleLogout} className="navButton">Logout</button>

                </div>
              </div>
            )
          : (
            <div className="navItems">
                <button onClick={handleLogin} className="navButton">Login</button>
            </div>
          )}
        </div>
        .
    </div>
  );
}

export default Navbar;