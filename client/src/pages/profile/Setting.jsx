import React,{ useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editAddress } from './../../reducers/user';
import './setting.css'
import { getProvince, getCity } from './../../reducers/address';
import { api } from "../../services/setupInterceptor.js";
import { getProduct } from './../../reducers/productSlice';

const Setting = (prop) => {
  const user = prop.data;
  const [tabActiveIndex, setTabActiveIndex] = useState(1);
  const [editActive, setEditActive] = useState(0);
  const handleTabClick = (index) => setTabActiveIndex(index);
  const checkTabActive = (index, className) => tabActiveIndex === index ? className : "";

  const [address, setAddress] = useState(user.address);
  const [kecamatan, setKecamatan] = useState(user.kecamatan);
  const [city, setCity] = useState(user.city);
  const [province, setProvince] = useState(user.province);
  const [pcode, setPcode] = useState(user.pcode);
  const [selectedProv, setSelectedProv] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { uid } = useSelector((state) => state.auth);
  const { provinsi, kota } = useSelector((state) => state.address);

  useEffect(() => {
    // dispatch(getUser(uid));
    if(uid){
      setAddress(user.address);
      setKecamatan(user.kecamatan);
      setCity(user.city);
      setProvince(user.province);
      setPcode(user.pcode);
    }
  }, [dispatch, uid, user])

// useEffect(() => {
//   if(error)
//       navigate(`/user/${uid}`);
// }, [navigate, uid])

  const UpdateAddress = async (e) => {
    e.preventDefault();
    try {
        await dispatch(getProvince());
        // navigate(`/user/${uid}`);
    } catch (error) {
        console.log(error)
    }
    setEditActive(0);
  }

  const editAddress = async (e) => {
    e.preventDefault();
    await dispatch(getProvince());
    await setEditActive(1);
  }

  const getKota = async (id) => {
    await dispatch(getCity(id));
  }

  const handleSelectChange = async (e) => {
    await setSelectedProv(e.target.value);    
    await getKota(e.target.value);
  }

  return (
    <div className='containerSetting'>
          <>
            <div className="tabs">
              <button
                className={`tab ${checkTabActive(1, "active")}`}
                onClick={() => handleTabClick(1)}
              >
                Address
              </button>
              <button
                className={`tab ${checkTabActive(2, "active")}`}
                onClick={() => handleTabClick(2)}
              >
                Sedang Dikirim
              </button>
              <button
                className={`tab ${checkTabActive(3, "active")}`}
                onClick={() => handleTabClick(3)}
              >
                Selesai
              </button>
            </div>

            <div className="contents">
              <div className={`content ${checkTabActive(1, "active")}`}>
                <div className="addressData">
                  <div className="biodata">
                    <div className={`data${editActive === 1 ? "active" : ""}`}>
                      <div className="dataTitle">
                        Provinsi
                      </div>
                      {/* <input
                        type="text" 
                        placeholder='Provinsi' 
                        defaultValue={province}
                        onChange={(e)=> setProvince(e.target.value)}
                      /> */}
                      <span>{province}</span>
                        <select value={selectedProv} onChange={handleSelectChange}>
                          {provinsi.map((item) => (
                            <option
                              key={item.province_id}
                              value={item.province_id}
                              defaultValue={province}
                            >
                              {item.province}
                            </option>
                          ))}
                        </select>

                    </div>
                    <div className={`data${editActive === 1 ? "active" : ""}`}>
                      <div className="dataTitle">
                        Kota / Kabupaten
                      </div>
                      {/* <input
                        type="text" 
                        placeholder='kota' 
                        defaultValue={city} 
                        onChange={(e)=> setCity(e.target.value)}
                      /> */}
                      <span>{city}</span>
                      <select>
                        {kota.map((item) => (
                          <option
                            key={item.city_id}
                            value={item.city_id}
                            defaultValue={city}
                          >
                            {item.city_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={`data${editActive === 1 ? "active" : ""}`}>
                      <div className="dataTitle">
                        Kecamatan
                      </div>
                      {/* <input
                        type="text"
                        placeholder='kecamatan' 
                        defaultValue={kecamatan} 
                        onChange={(e)=> setKecamatan(e.target.value)}
                      /> */}
                      <span>{kecamatan}</span>
                      <select>
                        <option>--- Pilih Kabupaten / Kecamatan ---</option>
                      </select>
                    </div>
                    <div className={`data${editActive === 1 ? "active" : ""}`}>
                      <div className="dataTitle">
                        Kode Pos
                      </div>
                      {/* <input
                        type="text" 
                        placeholder='Kode Pos' 
                        defaultValue={pcode}
                        onChange={(e)=> setPcode(e.target.value)}
                      /> */}
                      <span>{pcode}</span>
                      <select>
                        <option>--- Pilih Kode Pos ---</option>
                      </select>
                    </div>
                    <div className={`data${editActive === 1 ? "active" : ""}`}>
                      <div className="dataTitle">
                        Alamat
                      </div>
                      <span>{address}</span>
                      <input 
                        type="text" 
                        placeholder='address' 
                        defaultValue={address}
                        onChange={(e)=> setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="buttonAddress">
                    {!editActive ?
                      <button className='editAddress' onClick={editAddress}>Edit</button>
                      :
                      <button className='saveAddress' onClick={UpdateAddress}>Save</button>
                    }
                  </div>
                </div>

              </div>
              <div className={`content ${checkTabActive(2, "active")}`}>
                <p>Nulla lobortis quis massa quis lobortis. Nullam porta semper lorem, vel efficitur augue rutrum quis. Suspendisse potenti.</p>
              </div>
              <div className={`content ${checkTabActive(3, "active")}`}>
                <p>Cras porta consectetur dolor porttitor fringilla. Cras vitae urna ac erat fermentum egestas. Donec egestas cursus scelerisque.</p>
              </div>
            </div>
          </>
    </div>
  )
}

export default Setting
