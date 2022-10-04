import Directory from "../../components/directory/directory.component";
import Hero from "../../components/hero/hero.component";
import "../../App.css";
import "./home.styles.scss";
import { Fragment } from "react";
import { useEffect } from "react";
import NewsLetter from "../../components/newsletter/newsletter.component";

function Home() {
  const categories = [
    {
      id: 1,
      title: "hats",
      // imageUrl:
      //   "https://images.unsplash.com/photo-1647102164120-2a266070cc75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2718&q=80",
      imageUrl:
        "https://images.unsplash.com/photo-1548864867-76b7425247be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80",
      position: "top",
    },
    {
      id: 2,
      title: "jackets",
      // imageUrl:
      //   "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      imageUrl:
        "https://images.unsplash.com/photo-1610918018841-81a67e2e0b89?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      position: "top",
    },
    {
      id: 3,
      title: "sneakers",
      // imageUrl:
      //   "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1662&q=80",
      imageUrl:
        "https://images.unsplash.com/photo-1643662372875-261df96ce507?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      position: "bottom",
    },
  ];
  const genders = [
    {
      id: 4,
      title: "womens",
      imageUrl:
        "https://images.unsplash.com/photo-1615819823949-0bdef969e8fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=832&q=80",
      position: "top",
    },
    {
      id: 5,
      title: "mens",
      // imageUrl:
      //   "https://images.unsplash.com/photo-1611943574626-91c9be96abc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1434&q=80",
      imageUrl:
        "https://images.unsplash.com/photo-1615819823617-01028c94850a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=822&q=80",
      position: "center",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <Hero></Hero>
      <Directory categories={categories} className="category"></Directory>
      <Directory categories={genders} className="gender"></Directory>
      <NewsLetter/>
    </Fragment>
  );
}

export default Home;
