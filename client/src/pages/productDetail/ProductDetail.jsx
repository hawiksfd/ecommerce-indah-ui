import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, discountPrice, formatRupiahId } from '../../reducers/productSlice.js';
import { addToCart, updateToChart, getCartbyUserUid } from '../../reducers/cart';
import "./productDetail.css";
import Navbar from './../../components/navbar/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import { privateApi } from './../../services/setupInterceptor';

const ProductDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { prdid } = useParams();
  const [qty, setQty] = useState(1)

  const { uid } = useSelector((state) => state.auth);
  const { prdbyid } = useSelector((state) => state.product);


  useEffect(() => {
    dispatch(getProduct(prdid));
  }, [dispatch, prdid])

  const handleAddCart = async (pid) => {
    if(!uid) {
      navigate("/login")
    }else{
      const qty = 1;
      const cart = await privateApi.get(`get-chart-by-product/${pid}`);
      let cartExist = cart[0];
      if(!cartExist){
        await dispatch(addToCart({pid, uid, qty}));
      }else{
        let crtid = cart[0].uuid;
        await dispatch(updateToChart({pid, crtid, qty}));
      }
      await dispatch(getCartbyUserUid(uid));
    }
  }

  const shoeShow = [
    {
      id: 1,
      img: "https://cf.shopee.co.id/file/e96ba809c59e4e1404f0a6839373d883"
    },
    {
      id: 2,
      img: "https://lzd-img-global.slatic.net/g/p/c4f5f00d87ff1597323308c22cfba420.jpg_720x720q80.jpg_.webp"
    },
    {
      id: 3,
      img: "https://cf.shopee.co.id/file/c55b22e9f06cf1d686f2a9fc505416c5"
    },
    {
      id: 4,
      img: "https://lzd-img-global.slatic.net/g/p/3e0c534211f68e9f146768f59d13746b.jpg_2200x2200q80.jpg_.webp"
    },
    {
      id: 5,
      img: "https://cf.shopee.co.id/file/f4cae4966cc6936d867f917fa32e4e8e"
    }
  ];


  const handleCek = async () => {
    dispatch(getProduct(prdid));
  }

  return (
    <div>
    <Navbar/>
      <div className="productDetail">
        {/* <button onClick={handleCek}>cek</button> */}
        <>
          <div className="containerPrdDetail" key={prdbyid.uuid}>
            <div className="imageProduct">
              <div className="imgShow">
                <img src={prdbyid.url_img_prd} alt={prdbyid.img_prd} />
              </div>
              <div className="imgList">
                {shoeShow.map((item) => (
                  <div className="imgListShow" key={item.id}>
                    <img src={item.img} alt={item.img} />
                  </div>
                ))}
              </div>
            </div>
            <div className="describeProduct">
              <div className="name">
                <span>{prdbyid.name}</span>
              </div>
              <div className="price">
                {!prdbyid.discount ? (
                  <div className="hargasli">
                    <h2>{formatRupiahId(prdbyid.price)}</h2>
                  </div>
                ) : (
                  <div className="hargaDiskonPd">
                    <div className="hargadiskPd">
                      <h3>{formatRupiahId(prdbyid.price)}</h3>
                    </div>
                    <div className="diskonPd">
                      <h2>
                        {discountPrice(
                          prdbyid.price,
                          prdbyid.discount.discount_percent
                        )}
                      </h2>
                      <span>─ {prdbyid.discount.discount_percent} %</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="desc">
                <span>{prdbyid.desc}</span>
              </div>
              <div className="qty">
                <input
                  type="number"
                  min="0"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                />
              </div>
              <button onClick={() => handleAddCart(prdbyid.uuid)}>Add To Cart</button>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default ProductDetail;
