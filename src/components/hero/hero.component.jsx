import "./hero.styles.scss";
import Button from "../button/button.component";
import { RiArrowRightLine } from "react-icons/ri";

const Hero = () => {
  return (
    <section className="section-hero">
      <div className="hero-img">
        <div className="hero">
          <div className="hero-text">
            <h1>Winter Is Coming</h1>
            <Button className="no-border">
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
