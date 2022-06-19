import React, { useState, useEffect } from "react";
import "../styles/cart.css";
import NumberFormat from "react-number-format";

const Cart = ({ cart, setCart, handleChange }) => {
  const [price, setPrice] = useState(0);

  const handleRemove = (id) => {
    const arr = cart.filter((item) => item.id !== id);
    setCart(arr);
    handlePrice();
  };

  const handlePrice = () => {
    let ans = 0;
    cart.map((item) => (ans += item.amount * item.price));
    setPrice(ans);
  };

  useEffect(() => {
    handlePrice();
  });

  return (
    <article>
      {cart.map((item) => (
        <div className="cart_box" key={item.id}>
          <div className="cart_img">
            <img src={item.img} alt="" />
            <p>{item.title}</p>
          </div>
          <div>
            <button onClick={() => handleChange(item, 1)}>+</button>
            <button>{item.amount}</button>
            <button onClick={() => handleChange(item, -1)}>-</button>
          </div>
          <div>
            <span>{item.price}</span>
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="total" style={{display:"flex",justifyContent: "space-between",alignItems: "center"}}>
        <span>Tổng đơn hàng của bạn là:</span>
        <h1>
          <NumberFormat
            value={price}
            className="foo"
            displayType={"text"}
            thousandSeparator={true}
            renderText={(value, props) => <div {...props}>{value} VND</div>}
          />
          
        </h1>
        <button className="btn_thanhtoan ">Thanh toán</button>
      </div>
      
    </article>
  );
};

export default Cart;
