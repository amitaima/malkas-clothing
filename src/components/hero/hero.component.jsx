import "./hero.styles.scss";
import Button from "../button/button.component";
import { RiArrowRightLine } from "react-icons/ri";
import NEW_CATEGORY from "../../new-category-db";
import OUTLET_CATEGORY from "../../outlet-category-db";
import { addNewCategory } from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  // const handleClick = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const response = await addNewCategory(OUTLET_CATEGORY);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const goToPage = () => {
    navigate("/shop/new");
  };

  return (
    <section className="section-hero full-width">
      <div className="hero-img">
        <div className="hero">
          <div className="hero-text">
            <h1>
              Winter Is
              <br />
              Coming
            </h1>
            <Button className="no-border" onClick={goToPage}>
              <span>Winter Collection</span>
              <RiArrowRightLine className="arrow-icon" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
