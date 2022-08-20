import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeSharpIcon from "@mui/icons-material/NavigateBeforeSharp";
import "./Carousel.css";

function ImageSlider({ data }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      prevIcon={
        <div
          style={{
            display: "flex",
            backgroundColor: "black",
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <NavigateBeforeSharpIcon fontSize="large" />
        </div>
      }
      nextIcon={
        <div
          style={{
            display: "flex",
            backgroundColor: "black",
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <NavigateNextIcon fontSize="large" />
        </div>
      }
    >
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
