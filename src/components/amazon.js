import React, { useState } from "react";
import list from "../data";
import Cards from "./card";
import "../styles/amazon.css";

import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { Col, Divider, Row } from "antd";
import "antd/dist/antd.css";
const Amazon = ({ handleClick }) => {
   const [previousIndex, setPreviousIndex] = useState(null);
  const [nextIndex, setNextIndex] = useState(null);
  const images = [
    "https://cdn0.fahasa.com/media/magentothem/banner7/bigsale02_062022_840x320.png",
    "https://cdn0.fahasa.com/media/magentothem/banner7/Ehon_840x320.jpg",
    "https://cdn0.fahasa.com/media/magentothem/banner7/quoctethieunhi_1.2_840x320.jpg",
    "https://cdn0.fahasa.com/media/magentothem/banner7/840x320_1.2.jpg",
    "https://cdn0.fahasa.com/media/magentothem/banner7/disney-resize-t6.jpg",
    "https://cdn0.fahasa.com/media/magentothem/banner7/zalo-osc-t6-840.jpg",
    "https://cdn0.fahasa.com/media/magentothem/banner7/FAHASA840x320.png",
    "https://cdn0.fahasa.com/media/magentothem/banner7/KimDong65_mainbanner__840x320_1.1.jpg",
  ];
   const properties = {
     autoplay: true,
     indicators: true,
     scale: 0.4,
     indicators: (i) => <div className="indicator"></div>,
     onChange: (previous, next) => {
       setPreviousIndex(previous);
       setNextIndex(next);
     },
  };
  const style = {
   
    padding: "8px 0",
  };

  return (
    <>
      <main>
        <div className="main">
          <div className="main_top">
            <Fade {...properties} className="main_top_left">
              {images.map((each, index) => (
                <div className="slide_image">
                  <img
                    key={index}
                    style={{
                      width: "100%",
                      height: "317px",
                      objectFit: "cover",
                    }}
                    src={each}
                    alt="image"
                  />
                </div>
              ))}
            </Fade>
            <div className="main_top_right">
              <div style={{ cursor: "pointer" }}>
                <img
                  alt="img"
                  style={{ width: "100%", height: "156px" }}
                  src="https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2022/fl_bigsale02_392x156.png"
                />
              </div>
              <div style={{ cursor: "pointer", marginTop: "5px" }}>
                <img
                  alt="img"
                  style={{ width: "100%", height: "156px" }}
                  src="https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2022/zalo-osc-t6-392.jpg"
                />
              </div>
            </div>
          </div>
          <div className="banner" style={{ marginTop: "20px" }}>
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col className="gutter-row" span={6}>
                <div style={style}>
                  <img
                    alt="image"
                    style={{ width: "100%", objectFit: "cover" }}
                    src="https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2022/coupon_bigsale02_310x210.png"
                  />
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={style}>
                  <img
                    style={{ width: "100%", objectFit: "cover" }}
                    src="https://cdn0.fahasa.com/media/wysiwyg/Thang-05-2022/shopeepayD-DAY_310x210.png"
                  />
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={style}>
                  <img
                    style={{ width: "100%", objectFit: "cover" }}
                    src="https://cdn0.fahasa.com/media/wysiwyg/Duy-VHDT/Thieu_nhi/thang5/quoctethieunhi_1.1_310x210.jpg"
                  />
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div style={style}>
                  <img
                    style={{ width: "100%", objectFit: "cover" }}
                    src="https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2022/ship_bigsale02_310x210.png"
                  />
                </div>
              </Col>
            </Row>
          </div>

          <section className="list_cards">
            {list.map((item) => (
              <Cards key={item.id} item={item} handleClick={handleClick} />
            ))}
          </section>
         
        </div>
      
      </main>
    </>
  );
     
};

export default Amazon;
