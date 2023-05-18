import React, {useState, useEffect} from 'react'
import Navbar from './../../components/navbar/Navbar';
import MyAccount from './MyAccount';
import MyOrder from './MyOrder';
import Setting from './Setting';
import { getUser } from './../../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import './profile.css'



const Profile = () => {
  const dispatch = useDispatch();

  const [sidebarActiveIndex, setSidebarActiveIndex] = useState(1);
  
  const handleSidebarClick = (i) =>
    setSidebarActiveIndex(i);

  const checkSidebarActive = (i, className) =>
    sidebarActiveIndex === i ? className : "";

  //redux
  const { uid } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    // console.log(uid)
    dispatch(getUser(uid));
  }, [uid, dispatch])

  // const handleUser = () => {
  //   console.log(userId.uid)
  //   console.log(userId.isAuthenticated)
  //   console.log(userId.isLoading)
  //   console.log(JSON.parse(userId.user))
  // }
  
  // const handleUserRedux = () => {
  //   console.log(uid);
  //   console.log(user);
  // }

  // const handlecekProduct = () => {
  //   const prd = product.find(obj => obj.uuid === id);
  //   console.log(prd);
  //   console.log(prd.url_img_prd)
  // }


  return (
    <div>
      <Navbar/>

      {/* sidebar */}
      <>
        <div className="profile">
          <div className="profileContainer">
              <div className="sidebarProfile">
                <button 
                  className={`side ${checkSidebarActive(1, "active")}`}
                  onClick={() => handleSidebarClick(1)}
                  >
                  Akun Saya
                </button>
                <button 
                  className={`side ${checkSidebarActive(2, "active")}`}
                  onClick={() => handleSidebarClick(2)}
                  >
                  Pesanan Saya
                </button>
                <button 
                  className={`side ${checkSidebarActive(3, "active")}`}
                  onClick={() => handleSidebarClick(3)}
                  >
                  Pengaturan
                </button>
              </div>
              <div className="panels">
                <div className={`panel ${checkSidebarActive(1, "active")}`}>
                  {/* <button onClick={handlecekProduct}>cek user</button> */}
                  {/* <button onClick={handleUserRedux}>cek user Redux</button> */}
                  <MyAccount data={user}/>
                </div>
                <div className={`panel ${checkSidebarActive(2, "active")}`}>
                  <MyOrder/>
                </div>
                <div className={`panel ${checkSidebarActive(3, "active")}`}>
                  <Setting data={user}/>
                </div>
              </div>
          </div>
        </div>
      </>
    </div>
  );
}


export default Profile
