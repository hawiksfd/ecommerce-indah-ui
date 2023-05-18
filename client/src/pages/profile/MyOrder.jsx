import React, {useState} from 'react'
import './myOrder.css'

const MyOrder = () => {
  const [tabActiveIndex, setTabActiveIndex] = useState(1);
  const handleTabClick = (index) => setTabActiveIndex(index);
  const checkTabActive = (index, className) => tabActiveIndex === index ? className : "";

  return (
    <div className='containerMyOrder'>
       {/* tab pesanan */}
          <>
            <div className="tabs">
              <button
                className={`tab ${checkTabActive(1, "active")}`}
                onClick={() => handleTabClick(1)}
              >
                Belum Bayar
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
                <div className="itemOrder">
                  <div className="image">
                    <img src="https://designmodo.com/demo/shopping-cart/item-1.png" alt="" />
                  </div>
                  <div className="description">
                    <span>Common Projects</span>
                    <span>White</span>
                  </div>
                  <div className="quantity">
                    <span>1</span>         
                  </div>
                  <div className="productPrice">$549</div>
                </div>

                <div className="itemOrder">
                  <div className="image">
                    <img src="https://designmodo.com/demo/shopping-cart/item-1.png" alt="" />
                  </div>
                  <div className="description">
                    <span>Common Projects</span>
                    <span>White</span>
                  </div>
                  <div className="quantity">
                    <span>1</span>         
                  </div>
                  <div className="productPrice">$549</div>
                </div>

                <div className="itemOrder">
                  <div className="image">
                    <img src="https://designmodo.com/demo/shopping-cart/item-1.png" alt="" />
                  </div>
                  <div className="description">
                    <span>Common Projects</span>
                    <span>White</span>
                  </div>
                  <div className="quantity">
                    <span>1</span>         
                  </div>
                  <div className="productPrice">$549</div>
                </div>

                <div className="itemOrder">
                  <div className="image">
                    <img src="https://designmodo.com/demo/shopping-cart/item-1.png" alt="" />
                  </div>
                  <div className="description">
                    <span>Common Projects</span>
                    <span>White</span>
                  </div>
                  <div className="quantity">
                    <span>1</span>         
                  </div>
                  <div className="productPrice">$549</div>
                </div>

                <div className="itemOrder">
                  <div className="image">
                    <img src="https://designmodo.com/demo/shopping-cart/item-1.png" alt="" />
                  </div>
                  <div className="description">
                    <span>Common Projects</span>
                    <span>White</span>
                  </div>
                  <div className="quantity">
                    <span>1</span>         
                  </div>
                  <div className="productPrice">$549</div>
                </div>

                <div className="itemOrder">
                  <div className="image">
                    <img src="https://designmodo.com/demo/shopping-cart/item-1.png" alt="" />
                  </div>
                  <div className="description">
                    <span>Common Projects</span>
                    <span>White</span>
                  </div>
                  <div className="quantity">
                    <span>1</span>         
                  </div>
                  <div className="productPrice">$549</div>
                </div>

                <div className="itemOrder">
                  <div className="image">
                    <img src="https://designmodo.com/demo/shopping-cart/item-1.png" alt="" />
                  </div>
                  <div className="description">
                    <span>Common Projects</span>
                    <span>White</span>
                  </div>
                  <div className="quantity">
                    <span>1</span>         
                  </div>
                  <div className="productPrice">$549</div>
                </div>

                <div className="itemOrder">
                  <div className="image">
                    <img src="https://designmodo.com/demo/shopping-cart/item-1.png" alt="" />
                  </div>
                  <div className="description">
                    <span>Common Projects</span>
                    <span>White</span>
                  </div>
                  <div className="quantity">
                    <span>1</span>         
                  </div>
                  <div className="productPrice">$549</div>
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

export default MyOrder
