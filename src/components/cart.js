import React, { useState, useEffect } from "react";
import "../styles/cart.css";
import NumberFormat from "react-number-format";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios"


const Cart = ({ cart, setCart, handleChange }) => {
  const [price, setPrice] = useState(0);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState(0);
  const [thanhtoan , setThanhtoan] = useState("chuyển Khoản")


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
  const submitHandler = async (e) => {
   
    let date1 = new Date().toLocaleDateString("en-US");
    let html = ""
   cart.map((item) => {
      html +=  item.title + "\n"
   })
    console.log(name, address, mobile, thanhtoan,date1);
    let soluong = ""
    cart.map((item) => {
      soluong += item.amount + " " + item.title + "\n";
    });
    
    
  
    let obj = {
      Date: date1,
      TenKH: name,
      SDT: mobile,
      Address: address,
      Product: html,
      SL: soluong,
      PTTT: thanhtoan,
      Gia: price,
      ThanhToan:false
    };
    
    await axios
      .post(
        "https://sheet.best/api/sheets/fec4bd47-bf6b-4904-89a9-a703686fc79f",

        obj
      )
      .then((data) => console.log(data));
       
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
      <div
        className="total"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
        <>
          <Button variant="primary" onClick={handleShow}>
            Thanh toán
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Thanh toán </Modal.Title>
            </Modal.Header>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLScgvkK8XTZupsF7_oBuBn7W49XWYhtvUGS8en0tGPmDByJeuA/viewform?embedded=true"
              width="500"
              height="900"
              frameborder="0"
              marginheight="0"
              marginwidth="0"
            >
            </iframe>
          </Modal>
        </>
      </div>
    </article>
  );
};

export default Cart;
