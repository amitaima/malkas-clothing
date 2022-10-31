import "./product-gallery.styles.scss";
import { useState, useEffect } from "react";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { RiShareLine } from "react-icons/ri";

const SIDE_IMAGES = [
  "https://images.asos-media.com/products/dtt-slim-fit-denim-jacket-in-black/202261821-2?$n_640w$&wid=513&fit=constrain",
  "https://images.asos-media.com/products/dtt-slim-fit-denim-jacket-in-black/202261821-3?$n_640w$&wid=513&fit=constrain",
  "https://images.asos-media.com/products/dtt-slim-fit-denim-jacket-in-black/202261821-4?$n_640w$&wid=513&fit=constrain",
];

const ProductGallery = ({ product }) => {
  const [currentImg, setCurrentImg] = useState([0, product.imageUrl]);

  const goForwards = () => {
    if (currentImg[0] === 3) {
      setCurrentImg([0, product.imageUrl]);
      return;
    }
    setCurrentImg([currentImg[0] + 1, SIDE_IMAGES[currentImg[0]]]);
  };
  const goBackwards = () => {
    if (currentImg[0] === 1) {
      setCurrentImg([0, product.imageUrl]);
      return;
    }
    if (currentImg[0] === 0) {
      setCurrentImg([3, SIDE_IMAGES[2]]);
      return;
    }
    setCurrentImg([currentImg[0] - 1, SIDE_IMAGES[currentImg[0] - 2]]);
  };
  useEffect(() => {
    setCurrentImg([0, product.imageUrl]);
  }, [product]);

  return (
    <div className="gallery-container">
      <div className="gallery-aside-wrapper">
        <ul className="gallery-aside-list">
          <li
            className="gallery-aside-item"
            onClick={() => {
              setCurrentImg([0, product.imageUrl]);
            }}
          >
            <img className="gallery-aside-img" src={product.imageUrl} />
          </li>
          <li
            className="gallery-aside-item"
            onClick={() => {
              setCurrentImg([1, SIDE_IMAGES[0]]);
            }}
          >
            <img className="gallery-aside-img" src={SIDE_IMAGES[0]} />
          </li>
          <li
            className="gallery-aside-item"
            onClick={() => {
              setCurrentImg([2, SIDE_IMAGES[1]]);
            }}
          >
            <img className="gallery-aside-img" src={SIDE_IMAGES[1]} />
          </li>
          <li
            className="gallery-aside-item"
            onClick={() => {
              setCurrentImg([3, SIDE_IMAGES[2]]);
            }}
          >
            <img className="gallery-aside-img" src={SIDE_IMAGES[2]} />
          </li>
        </ul>
        <div className="aside-share-container">
          <RiShareLine className="share-icon" />
        </div>
      </div>
      <div className="gallery-carousel">
        <img src={currentImg[1]} className="carousel-img" />
        <button onClick={goBackwards} className="arrow-btn arrow-btn--left">
          <SlArrowLeft className="arrow-icon" />
        </button>
        <button onClick={goForwards} className="arrow-btn arrow-btn--right">
          <SlArrowRight className="arrow-icon" />
        </button>
      </div>
    </div>
  );
};

export default ProductGallery;
