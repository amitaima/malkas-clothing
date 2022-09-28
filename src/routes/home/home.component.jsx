import CategoriesMenu from "../../components/categories-menu/categories-menu.component";
import Hero from "../../components/hero/hero.component";
import "../../App.css";
import "./home.styles.scss";
import { Fragment } from "react";

function Home() {
  const categories = [
    {
      id: 1,
      title: "hats",
      imageUrl:
        "https://images.unsplash.com/photo-1647102164120-2a266070cc75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2718&q=80",
    },
    {
      id: 2,
      title: "jackets",
      imageUrl:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
      id: 3,
      title: "sneakers",
      imageUrl:
        "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1662&q=80",
    },
  ];
  const genders = [
    {
      id: 4,
      title: "womens",
      imageUrl:
        "https://images.unsplash.com/photo-1580599044019-af4ec9f14879?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80",
    },
    {
      id: 5,
      title: "mens",
      imageUrl:
        "https://images.unsplash.com/photo-1611943574626-91c9be96abc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1434&q=80",
    },
  ];

  return (
    <Fragment>
      <Hero></Hero>
      <CategoriesMenu
        categories={categories}
        className="category"
      ></CategoriesMenu>
      <CategoriesMenu categories={genders} className="gender"></CategoriesMenu>
    </Fragment>
  );
}

export default Home;
