import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from './../../components/navbar/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import './cart.css';
import { getCartbyUserUid, deleteChartUid, updateChart } from './../../reducers/cart';
import { discountPrice, formatRupiahId } from '../../reducers/productSlice.js';
import swal from 'sweetalert';
import { getUser } from './../../reducers/user';
import { logout } from './../../reducers/auth';
import { getShipCost } from './../../reducers/address';
import { getOrderbyUser } from './../../reducers/order';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid } = useParams();
  const [expedisi, setExpedisi] = useState([]);
  const [service, setService] = useState([]);
  const [selectOngkir, setSelectOngkir] = useState("");

  const {cartuid} = useSelector((state) => state.cart);
  const { user, resCity, resProv, resCityId } = useSelector((state) => state.user);
  const { ongkir } = useSelector((state) => state.address);


  useEffect(() => {
    dispatch(getCartbyUserUid(uid));
    dispatch(getUser(uid));
    // handleGetShipCost(resCityId);
  
  }, [dispatch, uid])

  useEffect(() => {
    handleGetShipCost(resCityId);
  }, [])

  const deleteItem = async (cuid) => {
    await dispatch(deleteChartUid(cuid));
    dispatch(getCartbyUserUid(uid));
  }

  const handleMinusbtn = async (crtid ) => {
    let qty = -1;
    await dispatch(updateChart({crtid, qty}));
    dispatch(getCartbyUserUid(uid));
  }

  const handlePlusbtn = async (crtid) => {
    let qty = 1;
    await dispatch(updateChart({crtid, qty}));
    dispatch(getCartbyUserUid(uid));
  }

  const handleCheckout = async (price) => {
    let tQty = 0;
    for (let i = 0; i < cartuid.length; i++) {
      let quantity = cartuid[i].quantity;
      
      tQty += quantity;
    }

    swal({
      title: "Process to Payment?",
      text: `Your order for ${tQty} Product is ${formatRupiahId(price)}`,
      icon: "info",
      buttons: true,
      dangerMode: true,
      })
      .then(async (pay) => {
        if (pay) {
          navigate('/payment');
      } 
      });

  }

  const handleExpedisi = async (e) => {
    const kurir = e.target.value;
    const filteredKurir = await ongkir.filter(item => item.code === kurir);
    await setExpedisi(filteredKurir[0].costs);
  }

  const handleService = async (e) => {
    // console.log(expedisi);
    const layanan = e.target.value;
    // await setSelectOngkir(layanan);
    const filteredService = expedisi.filter(item => item.service === layanan);
    await setService(filteredService[0].service);
    await setSelectOngkir(filteredService[0].cost[0].value);
  }

  const handleGetShipCost = async (resCityId) => {
    let asal = 153;
    let tujuan = resCityId;
    let berat = 1000;
    let kurir = 'jne';
    await dispatch(getShipCost({asal, tujuan, berat, kurir}));
  }

  const shopCost = (cartuid) => {
    let total = 0;
    for (let i = 0; i < cartuid?.length; i++) {
      let discExist = cartuid[i]?.product.discount;
      let discPersen = cartuid[i]?.product.discount?.discount_percent;
      let quantity = cartuid[i]?.quantity;
      let price = cartuid[i]?.product.price;
      let lastPrice = discExist ? price - (price *discPersen/100): price;
      // console.log(discExist);
      total += quantity * lastPrice;
    }
    let formatPrice = total;
    return formatPrice;
  }

  const totalCost = () => { 
    let sCost = shopCost(cartuid)
    let gTotal = sCost + selectOngkir;
    return gTotal;
  }

  const handleGetOrderUSer = async() => {
    await dispatch(getOrderbyUser(uid));
  }

  return (
  <div className='Cartnavcon'>
    <Navbar/>
    <div className="cart">
      <div className="containerCart">
        <div className="shopping-cart">
          <div className="title">
            Shopping Bag
          </div>

            <div className="itemContent">
              {/* <button onClick={handlecekCart}>cek cart</button> */}
              {cartuid?.map((item) => (
                <div className="item" key={item.uuid}>
                  <div className="buttons">
                    <button
                      className="delete-btn"
                      onClick={()=> deleteItem(item.uuid)}

                      ></button>
                  </div>
                  <div className="image">
                    <img
                      src={item.product.url_img}
                      alt={item.product.img} />
                  </div>
                  <div className="description">
                    <span>{item.product.name}</span>
                    {/* <span>White</span> */}
                  </div>
                  <div className="quantity">
                    <button
                      disabled={item.quantity <= 1}
                      className="minus-btn"
                      type="button"
                      name="button"
                      onClick={()=> handleMinusbtn(item.uuid)}
                    >
                      <img src="https://designmodo.com/demo/shopping-cart/minus.svg" alt="" />
                    </button>
                    <input
                      // type="number"
                      value={item.quantity}
                    />
                    <button
                      className="plus-btn"
                      type="button"
                      name="button"
                      onClick={()=> handlePlusbtn(item.uuid)}
                    >
                      <img src="https://designmodo.com/demo/shopping-cart/plus.svg" alt="" />
                    </button>              
                  </div>
                  <div className="productPrice">
                    {!item.product.discount ?
                      <span>
                        {formatRupiahId(item.product.price)}
                      </span>
                    :
                    <div className="hargaDiskonCrt">
                      <div className="hargadiskCrt">
                        <h3>{formatRupiahId(item.product.price)}</h3>
                      </div>
                      <div className="diskonCrt">
                        <h2>
                          {
                            discountPrice(item?.product?.price, item?.product?.discount?.discount_percent)
                          }
                        </h2>
                      </div>
                    </div>
                    }
                  </div>
                </div>
              ))}
            </div>

        </div>

        <div className="shopping-cost">
          <div className="title">
            Shopping Cost
          </div>
          
          <div className="contentCost">
            <div className="totalCost">
              <span>Subtotal</span>
              <span>{formatRupiahId(shopCost(cartuid))}</span>
            </div>

            <div>
              <label className="shipLabel">Shipping</label>
              <select 
                className="shipOption"
                value={expedisi}
                onChange={handleExpedisi}
              >
                <option value="" className="" disabled>--- Select Expedition ---</option>
                {ongkir?.map((item, index) => (
                  <option
                    key={index}
                    value={item.code}
                  >
                    {item.code}
                  </option>
                ))}
              </select>
              <select 
                className="shipOption"
                value={service}
                onChange={handleService}
              >
                <option value="" disabled>--- Select Service ---</option>
                {expedisi?.map((item, i) => (
                  <option
                    key={i}
                    value={item.service}
                  >
                    {item?.service}
                  </option>  
                ))}
              </select>
              <div className="shipLabel Parent">
                <span>Shipping Cost :</span>
                <span>{formatRupiahId(selectOngkir)}</span>
              </div>
            </div>

            <div className='addressCost'>
              <label className="addressLabel">Address</label>
              <div className="addressName">{user.firstname} {user.lastname}</div>
              <div className="addressName">{user.hp}</div>
              <div className="addressInfo">
                <div>{user.address}, {user.kecamatan}, {resCity}, {resProv}, {user.pcode}</div>
              </div>
            </div>

            <div className="grandTotalCost">
                <span>Total</span>
                <span>{formatRupiahId(totalCost())}</span>
            </div>
            <button 
            // onClick={()=> handleCheckout(shopCost(cartuid))}
            onClick={handleGetOrderUSer}
            >Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Cart
