import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, discountPrice, formatRupiahId } from '../../reducers/productSlice';
import { addToCart, updateToChart, getCartbyUserUid, getCartbyProductUid } from '../../reducers/cart';
import {useNavigate, Link} from "react-router-dom";
import Navbar from './../../components/navbar/Navbar';
import './home.css';
import { privateApi } from './../../services/setupInterceptor';
import { logout } from './../../reducers/auth';


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { uid } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const {product} = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
    // if (!user) {
    //   dispatch(logout());
    // }
  }, [dispatch])

  const handleToCart = async (pid) => {
    const qty = 1;
    if(!uid){
      navigate('/login')
    }else{
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

  return (
    <div>
      <Navbar/>
      
      <div className="home"> 
        <>
          <div className="containerHome">
            {product.map((item) => (
              <div className="card" key={item.uuid}>
                <div className="imgBox">
                  <Link to={`/product-detail/${item.uuid}`} >
                    <img 
                      className="imgPrd"
                      src={item.url_img_prd}
                      alt={item.img_prd} />
                  </Link>
                </div>

                <div className="contentBox">
                  <h3>{item.name}</h3>
                  {!item.discount ?
                    <div className="harga">
                      <h2>{formatRupiahId(item.price)}</h2>
                    </div>
                  :
                    <div className="hargaDiskon">
                      <div className="hargadisk">
                        <h3>{formatRupiahId(item.price)}</h3>
                      </div>
                      <div className="diskon">
                        <h2>
                          {
                            discountPrice(item.price, item.discount.discount_percent)
                          }
                        </h2>
                        {/* <button onClick={()=> discountPrice(item.price, item.discount.discount_percent)}>Rp. </button> */}
                        <span>─ {item.discount.discount_percent} %</span>
                      </div>
                    </div>
                  }
                </div>
                <button className="toCart" onClick={()=> handleToCart(item.uuid)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </>
      </div>
    </div>
  )
}

export default Home
