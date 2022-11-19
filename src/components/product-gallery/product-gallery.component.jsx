import "./product-gallery.styles.scss";
import { useState, useEffect, Fragment } from "react";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { RiShareLine } from "react-icons/ri";
import Spinner from "../spinner/spinner.component";

const SIDE_IMAGES = [
  "https://images.asos-media.com/products/dtt-slim-fit-denim-jacket-in-black/202261821-2?$n_640w$&wid=513&fit=constrain",
  "https://images.asos-media.com/products/dtt-slim-fit-denim-jacket-in-black/202261821-3?$n_640w$&wid=513&fit=constrain",
  "https://images.asos-media.com/products/dtt-slim-fit-denim-jacket-in-black/202261821-4?$n_640w$&wid=513&fit=constrain",
];

const ProductGallery = ({ product }) => {
  // console.log(product);
  const [currentImg, setCurrentImg] = useState([0, product.imageUrl]);
  // const [allImages, setAllImages] = useState([0, product.imageUrl]);
  const [isLoading, setIsLoading] = useState(true);
  const getNewImgUrl = (imgIndex, highQuality, firstImg = false) => {
    if (Object.keys(product).length === 0) return "";
    return product.imageUrl
      .split("/")
      .map((splitSlash, index) => {
        if (index === 5) {
          const lastPart = splitSlash.split("-").map((splitDash, index) => {
            if (index === 1) return imgIndex;
            if (index === 2 && !firstImg) return splitDash.split("?")[1];
            return splitDash;
          });
          return (
            lastPart[0] +
            "-" +
            lastPart[1] +
            (firstImg ? "-" + lastPart[2].split("?")[0] : "") +
            "?" +
            "$n_1280w$&wid=1026&fit=constrain" // Should make this smaller if screen smaller
            // (highQuality
            //   ? "$n_1280w$&wid=1026&fit=constrain" // High qualit for big picture
            //   : "$n_320w$&wid=257&fit=constrain") // Low quality for small side pictures
          );
        }
        return splitSlash;
      })
      .join("/");
  };

  // console.log(newImgUrl);
  // console.log(product.imageUrl.split("/")[5].split("-")[1]);

  const goForwards = () => {
    if (currentImg[0] === 3) {
      setCurrentImg([0, getNewImgUrl(1, true, true)]);
      return;
    }
    setCurrentImg([currentImg[0] + 1, getNewImgUrl(currentImg[0] + 2, true)]);
  };
  const goBackwards = () => {
    if (currentImg[0] === 1) {
      setCurrentImg([0, getNewImgUrl(1, true, true)]);
      return;
    }
    if (currentImg[0] === 0) {
      setCurrentImg([3, getNewImgUrl(4, true)]);
      return;
    }
    setCurrentImg([currentImg[0] - 1, getNewImgUrl(currentImg[0], true)]);
  };
  useEffect(() => {
    if (!product) return;
    /* Loading new images before preview */
    const img = new Image();
    img.src = getNewImgUrl(1, true, true);
    img.onload = function () {
      setIsLoading(true);
      // console.log("done 1");
      img.src = getNewImgUrl(2, true);
      img.onload = function () {
        setIsLoading(true);
        // console.log("done 2");
        img.src = getNewImgUrl(3, true);
        img.onload = function () {
          setIsLoading(true);
          // console.log("done 3");
          img.src = getNewImgUrl(4, true);
          img.onload = function () {
            setIsLoading(false);
            // console.log("done 4");
          };
        };
      };
    };
    setCurrentImg([0, getNewImgUrl(1, true, true)]);
  }, [product]);

  return (
    <div className="gallery-container">
      {Object.keys(product).length === 0 || isLoading === true ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="gallery-aside-wrapper">
            <ul className="gallery-aside-list">
              <li
                className="gallery-aside-item"
                onClick={() => {
                  setCurrentImg([0, getNewImgUrl(1, true, true)]);
                }}
              >
                <img
                  className="gallery-aside-img"
                  src={getNewImgUrl(1, false, true)}
                />
              </li>
              <li
                className="gallery-aside-item"
                onClick={() => {
                  setCurrentImg([1, getNewImgUrl(2, true)]);
                }}
              >
                <img
                  className="gallery-aside-img"
                  src={getNewImgUrl(2, false)}
                />
              </li>
              <li
                className="gallery-aside-item"
                onClick={() => {
                  setCurrentImg([2, getNewImgUrl(3, true)]);
                }}
              >
                <img
                  className="gallery-aside-img"
                  src={getNewImgUrl(3, false)}
                />
              </li>
              <li
                className="gallery-aside-item"
                onClick={() => {
                  setCurrentImg([3, getNewImgUrl(4, true)]);
                }}
              >
                <img
                  className="gallery-aside-img"
                  src={getNewImgUrl(4, false)}
                />
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
        </Fragment>
      )}
    </div>
  );
};

export default ProductGallery;

/****** Old file for if there are bugs with this ******/
// import "./product-gallery.styles.scss";
// import { useState, useEffect } from "react";
// import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
// import { RiShareLine } from "react-icons/ri";

// const SIDE_IMAGES = [
//   "https://images.asos-media.com/products/dtt-slim-fit-denim-jacket-in-black/202261821-2?$n_640w$&wid=513&fit=constrain",
//   "https://images.asos-media.com/products/dtt-slim-fit-denim-jacket-in-black/202261821-3?$n_640w$&wid=513&fit=constrain",
//   "https://images.asos-media.com/products/dtt-slim-fit-denim-jacket-in-black/202261821-4?$n_640w$&wid=513&fit=constrain",
// ];

// const ProductGallery = ({ product }) => {
//   const [currentImg, setCurrentImg] = useState([0, product.imageUrl]);

//   const goForwards = () => {
//     if (currentImg[0] === 3) {
//       setCurrentImg([0, product.imageUrl]);
//       return;
//     }
//     setCurrentImg([currentImg[0] + 1, SIDE_IMAGES[currentImg[0]]]);
//   };
//   const goBackwards = () => {
//     if (currentImg[0] === 1) {
//       setCurrentImg([0, product.imageUrl]);
//       return;
//     }
//     if (currentImg[0] === 0) {
//       setCurrentImg([3, SIDE_IMAGES[2]]);
//       return;
//     }
//     setCurrentImg([currentImg[0] - 1, SIDE_IMAGES[currentImg[0] - 2]]);
//   };
//   useEffect(() => {
//     setCurrentImg([0, product.imageUrl]);
//   }, [product]);

//   return (
//     <div className="gallery-container">
//       <div className="gallery-aside-wrapper">
//         <ul className="gallery-aside-list">
//           <li
//             className="gallery-aside-item"
//             onClick={() => {
//               setCurrentImg([0, product.imageUrl]);
//             }}
//           >
//             <img className="gallery-aside-img" src={product.imageUrl} />
//           </li>
//           <li
//             className="gallery-aside-item"
//             onClick={() => {
//               setCurrentImg([1, SIDE_IMAGES[0]]);
//             }}
//           >
//             <img className="gallery-aside-img" src={SIDE_IMAGES[0]} />
//           </li>
//           <li
//             className="gallery-aside-item"
//             onClick={() => {
//               setCurrentImg([2, SIDE_IMAGES[1]]);
//             }}
//           >
//             <img className="gallery-aside-img" src={SIDE_IMAGES[1]} />
//           </li>
//           <li
//             className="gallery-aside-item"
//             onClick={() => {
//               setCurrentImg([3, SIDE_IMAGES[2]]);
//             }}
//           >
//             <img className="gallery-aside-img" src={SIDE_IMAGES[2]} />
//           </li>
//         </ul>
//         <div className="aside-share-container">
//           <RiShareLine className="share-icon" />
//         </div>
//       </div>
//       <div className="gallery-carousel">
//         <img src={currentImg[1]} className="carousel-img" />
//         <button onClick={goBackwards} className="arrow-btn arrow-btn--left">
//           <SlArrowLeft className="arrow-icon" />
//         </button>
//         <button onClick={goForwards} className="arrow-btn arrow-btn--right">
//           <SlArrowRight className="arrow-icon" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductGallery;
