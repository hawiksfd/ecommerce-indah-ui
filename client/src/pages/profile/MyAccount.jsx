import React, {useState, useEffect} from 'react';
import './myaccount.css'
import { useSelector, useDispatch } from 'react-redux';
import { getUser, editProfile, editAvaProfile } from './../../reducers/user';
import { useNavigate } from 'react-router-dom';


const MyAccount = (prop) => {
  const user = prop.data;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { user } = useSelector((state) => state.user);

  const { uid } = useSelector((state) => state.auth);

  const [editActive, setEditActive] = useState(0);
  // const user = prop.data;
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
  const [hp, setHp] = useState(user.hp);
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    // dispatch(getUser(uid));
    if(uid){
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setEmail(user.email);
      setHp(user.hp);
    }
  }, [dispatch, uid, user])

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    setEditActive(1)
  }

  const handleCancelUser = (e) => {
    e.preventDefault();
    setEditActive(0)
  }
  
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file",file);
    formData.append("firstname",firstname);
    formData.append("lastname",lastname);
    formData.append("email",email);
    formData.append("hp",hp);
    // console.log(formData)
     try {
        await dispatch(editProfile({uid, formData}));
        await dispatch(getUser(uid));
    } catch (error) {
        console.log(error)
    }
    setEditActive(0)
  }

  return (
    <div className='MyAccContainer'>
      <div className="titleProfil">
        Profil Saya
      </div>
      <form>
        <div className="profilContent">
          <div className="biodata">
            <div className="data">
              <div className="dataTitle">
                Username
              </div>
              <span>{user.username}</span>
            </div>
            <div className={`data${editActive === 1 ? "actived" : ""}`}>
              <div className="dataTitle">
                Nama Awal
              </div>
              {!editActive ?
                <span>{user.firstname}</span>
                :
                <input 
                type="text" 
                placeholder='firstname' 
                defaultValue={firstname}
                onChange={(e)=> setFirstname(e.target.value)}
              />
              }
            </div>
            <div className={`data${editActive === 1 ? "actived" : ""}`}>
              <div className="dataTitle">
                Nama Akhir
              </div>
              {!editActive ?
                <span>{user.lastname}</span>
                :
                <input
                  type="text"
                  placeholder='lastname' 
                  defaultValue={lastname} 
                  onChange={(e)=> setLastname(e.target.value)}
                />
              }
            </div>
            <div className={`data${editActive === 1 ? "actived" : ""}`}>
              <div className="dataTitle">
                Email
              </div>
              {!editActive ?
                <span>{user.email}</span>
                :
                <input
                  type="text" 
                  placeholder='email' 
                  defaultValue={email} 
                  onChange={(e)=> setEmail(e.target.value)}
                />
              }
            </div>
            <div className={`data${editActive === 1 ? "actived" : ""}`}>
              <div className="dataTitle">
                Nomor Telepon
              </div>
              {!editActive ?
                <span>{user.hp}</span>
                :
                <input
                  type="text" 
                  placeholder='nomor telepon' 
                  defaultValue={hp}
                  onChange={(e)=> setHp(e.target.value)}
                />
              }
            </div>
          </div>


          <div className="imgProfil">
            {preview ? (
              <img src={preview} alt="PreviewImage" />
            ) : (
              <img 
              src={user.url_img}
              alt="" />
            )}
            <label htmlFor="file">
              <input
                style={{display:"none"}}
                type="file"
                id="file"
                className="fileImg"
                onChange={loadImage}
                
                />
              {/* <img src={Add2} alt="" /> */}
              {!editActive ?
                <div></div>
                :
                <span>Change Avatar</span>
              }
            </label>
            <span>maks. 1 MB</span>
          </div>
        </div>
        <div className="buttonAddress">
          {!editActive ?
            <button className='editProfile' onClick={handleEditUser}>Edit</button>
            :
            <div className="buttonAddress">
              <button className='cancelSave' onClick={handleCancelUser}>Cancel</button>
              <button className='saveProfile' onClick={handleUpdateUser}>Save</button>
            </div>
          }
        </div>
      </form>
    </div>
  )
}

export default MyAccount
