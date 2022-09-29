import "./hero.styles.scss";

// Sticky Navigation
const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-150px",
  }
);
obs.observe(sectionHeroEl);

const Hero = () => {
  return (
    <section className="section-hero">
      <div className="hero-img">
        <div className="hero">
          {/* <div class="hero-text">
            <h1>A healty meal delivered to your door, every single day</h1>
            <p>
              The smart 365-days-per-year food subscription that will make you
              eat healty algain. Tailored to your personal tastes and
              nutritional needs
            </p>
            <a href="#" class="btn">
              Start eating well
            </a>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
