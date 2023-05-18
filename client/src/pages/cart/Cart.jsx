import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from './../../components/navbar/Navbar';
import { useParams } from 'react-router-dom';
import './cart.css';
import { getCartbyUserUid, deleteChartUid, updateChart } from './../../reducers/cart';
import { discountPrice, formatRupiahId } from '../../reducers/productSlice.js';

const Cart = () => {
  const dispatch = useDispatch();
  const { uid } = useParams();

  const {cartuid} = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartbyUserUid(uid));
  }, [dispatch, uid])


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

  const handleCheckout = async () => {
    // let total = 0;

  }

  const shopCost = (cartuid) => {
    let total = 0;
    for (let i = 0; i < cartuid.length; i++) {
      let discExist = cartuid[i].product.discount;
      let discPersen = cartuid[i].product.discount?.discount_percent;
      let quantity = cartuid[i].quantity;
      let price = cartuid[i].product.price;
      let lastPrice = discExist ? price - (price *discPersen/100): price;
      // console.log(discExist);
      total += quantity * lastPrice;
    }
    let formatPrice = formatRupiahId(total)
    return formatPrice;
  }

  // const discountPrice = (price, disc) => {
  //   let afterDisc = price - (price*disc/100);
  //   let priceFrmt = afterDisc.toLocaleString('id-ID', {
  //     style: 'currency',
  //     currency: 'IDR'
  //   });
  //   return priceFrmt;
  // }

  // const formatRupiah = (price) => {
  //   let priceRup = price.toLocaleString('id-ID', {
  //     style: 'currency',
  //     currency: 'IDR'
  //   });
  //   return priceRup;
  // }

  return (
  <div className='Cartnavcon'>
    <Navbar/>
    <div className="cart">
      <div className="containerCart">
        <>
        <div className="shopping-cart">
          <div className="title">
            Shopping Bag
          </div>

            <div className="itemContent">
              {/* <button onClick={handlecekCart}>cek cart</button> */}
              {cartuid.map((item) => (
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
                            discountPrice(item.product.price, item.product.discount.discount_percent)
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
        </>

        <div className="shopping-cost">
          <div className="title">
            Shopping Cost
          </div>
          
          <div className="contentCost">
            <div className="totalCost">
              <span>Subtotal</span>
              <span>{shopCost(cartuid)}</span>
            </div>

            <div>
              <label className="shipLabel">Shipping</label>
              <select className="shipOption">
                <option>Standard shipping - $10.00</option>
              </select>
            </div>

            {/* <label
              // for="promo"
              className="shipLabel"
            >
              Promo Code
            </label>

            <div className="titleCode">
              <input
                type="text"
                // id="promo"
                placeholder="Enter your code"
                className="textCode"
              /> */}
              {/* <button className="applyButton">Apply</button>
            </div> */}

            <div className="grandTotalCost">
                <span>Total</span>
                <span>{shopCost(cartuid)}</span>
            </div>
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Cart
