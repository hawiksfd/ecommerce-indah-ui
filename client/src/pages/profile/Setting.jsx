import React,{ useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editAddress, getUser } from './../../reducers/user';
import './setting.css'
import { getProvince, getCity,updateAddress } from './../../reducers/address';
import { api } from "../../services/setupInterceptor.js";
import { getProduct } from './../../reducers/productSlice';

const Setting = (prop) => {
  const user = prop.data;

  const { resCity, resProv } = useSelector((state) => state.user);
  const { uid } = useSelector((state) => state.auth);
  const { provinsi, kota } = useSelector((state) => state.address);

  const [tabActiveIndex, setTabActiveIndex] = useState(1);
  const [editActive, setEditActive] = useState(0);
  const handleTabClick = (index) => setTabActiveIndex(index);
  const checkTabActive = (index, className) => tabActiveIndex === index ? className : "";

  const [address, setAddress] = useState(user.address);
  const [kecamatan, setKecamatan] = useState(user.kecamatan);
  const [city, setCity] = useState(resCity);
  const [province, setProvince] = useState(resProv);
  const [pcode, setPcode] = useState(user.pcode);
  const [provId, setProvId] = useState("");
  const [newProv, setNewProv] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cityId, setCityId] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
    
  // useEffect(() => {
  //   dispatch(getUser(uid));
  // }, [dispatch, uid])
  
  useEffect(() => {
    
    if(uid){
      setAddress(user.address);
      setKecamatan(user.kecamatan);
      setCity(resCity);
      setProvince(resProv);
      setPcode(user.pcode);
    }
  }, [dispatch, uid, user])


  const UpdateAddress = async () => {
    const formDataAddress = new FormData();
    formDataAddress.append("address",address);
    formDataAddress.append("pcode",pcode);
    formDataAddress.append("kecamatan",kecamatan);
    formDataAddress.append("city",selectedCity);
    formDataAddress.append("province",newProv);
    formDataAddress.append("provId",provId);
    formDataAddress.append("cityId",cityId);
    console.log({newProv, provId ,selectedCity,cityId})
    try {
        await dispatch(updateAddress({uid, formDataAddress}));
        await navigate(`/user/${uid}`);
    } catch (error) {
        console.log(error)
    }
    await setEditActive(0);
    await dispatch(getUser(uid));

  }

  const editAddress = async (e) => {
    e.preventDefault();
    await dispatch(getProvince());
    await setEditActive(1);
  }

  const handleCancelUser = (e) => {
    e.preventDefault();
    setEditActive(0);
    setProvId("");
    setNewProv("");
    setSelectedCity("");
    setCityId("");
  }

  const handleSelectChangeProv = async (e) => {
    const provinceId = e.target.value;
    await setProvId(provinceId);
    await dispatch(getCity(provinceId));

    const selectedProvinceName = await provinsi.find(provinsi =>
      provinsi.province_id === provinceId)?.province;
    
    await setNewProv(selectedProvinceName);
    console.log(selectedProvinceName)
  }
  
  const handleSelectChangeCity = async (e) => {
    const city_id = e.target.value;
    setCityId(city_id);

    const newCity = await kota.find(kota =>
      kota.city_id === city_id)?.city_name;

    await setSelectedCity(newCity);
    console.log(selectedCity)
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
                      <span>{province}</span>
                        <select 
                          // value={selectedProv}
                          onChange={handleSelectChangeProv}
                        >
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
                      <span>{city}</span>
                      <select
                        // value={}
                        onChange={handleSelectChangeCity}
                      >
                        {/* <option value="" disabled>--- Pilih Kota ---</option> */}
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
                      <input 
                        type="text" 
                        className="Addressfield"
                        placeholder='Kecamatan' 
                        defaultValue={kecamatan}
                        onChange={(e)=> setKecamatan(e.target.value)}
                      />
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
                      <input 
                        type="text" 
                        placeholder='Kode Pos'
                        defaultValue={pcode}
                        onChange={(e)=> setPcode(e.target.value)}
                      />
                    </div>
                    <div className={`data${editActive === 1 ? "active" : ""}`}>
                      <div className="dataTitle">
                        Alamat
                      </div>
                      <span>{address}</span>
                      <input 
                        type="text" 
                        placeholder='address' 
                        className="Addressfield"
                        defaultValue={address}
                        onChange={(e)=> setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="buttonAddress">
                    {!editActive ?
                      <button className='editAddress' onClick={editAddress}>Edit</button>
                      :
                      <div className="buttonAddressUpdate">
                        <button className='cancelSave' onClick={handleCancelUser}>Cancel</button>
                        <button className='saveAddress' onClick={UpdateAddress}>Save</button>
                      </div>
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
