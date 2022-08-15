import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

function ImageSlider({ data }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {data.map((image) => {
        return (
          <Carousel.Item>
            <img
              className="d-block w-100"
              height="315rem"
              src={image.imgUrl}
              alt="Product Images"
            />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default ImageSlider;
