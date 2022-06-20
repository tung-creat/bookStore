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
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nguyễn Văn A"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>SĐt</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="012321323"
                    autoFocus
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="234 Nguyễn Trãi , Thanh Xuân , Hà NỘi "
                    autoFocus
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>
                <Form.Select
                  aria-label="Default select example"
                  value={thanhtoan}
                  onChange = {(e) => setThanhtoan(e.target.value)}
                >
                  <option value="chuyển khoản">Chuyển Khoản </option>
                  <option value="Tiền mặt">Tiền mặt</option>
                </Form.Select>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Đóng
              </Button>
              <Button variant="primary" onClick={(e) => submitHandler(e)}>
                Gửi
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
    </article>
  );
};

export default Cart;
