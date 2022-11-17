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
      title: "jackets",
      // imageUrl:
      //   "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      // imageUrl:
      //   "https://images.unsplash.com/photo-1610918018841-81a67e2e0b89?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      // imageUrl:
      //   "https://images.unsplash.com/photo-1620960306028-e0e9b17bce94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      // imageUrl:
      //   "https://images.pexels.com/photos/7772716/pexels-photo-7772716.jpeg?cs=srgb&dl=pexels-dmitriy-ganin-7772716.jpg&fm=jpg",
      imageUrl: "https://i.ibb.co/S7FkXPs/jacket-directory-img-1-small.jpg",
      position: "center",
    },
    {
      id: 2,
      title: "hats",
      // imageUrl:
      //   "https://images.pexels.com/photos/8986021/pexels-photo-8986021.jpeg?cs=srgb&dl=pexels-pavel-danilyuk-8986021.jpg&fm=jpg",
      // imageUrl:
      //   "https://images.pexels.com/photos/6072749/pexels-photo-6072749.jpeg?cs=srgb&dl=pexels-pavel-danilyuk-6072749.jpg&fm=jpg",
      imageUrl: "https://i.ibb.co/vx3Wk7Q/hat-directory-img-1-small.jpg",
      // imageUrl:
      //   "https://images.pexels.com/photos/6073113/pexels-photo-6073113.jpeg?cs=srgb&dl=pexels-pavel-danilyuk-6073113.jpg&fm=jpg",
      position: "bottom",
    },
    {
      id: 3,
      title: "sneakers",
      // imageUrl:
      //   "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1662&q=80",
      imageUrl: "https://i.ibb.co/TRL3XM6/shoes-directory-img-1-small.jpg",
      // imageUrl:
      //   "https://images.unsplash.com/photo-1643662372875-261df96ce507?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      position: "bottom",
    },
  ];
  const genders = [
    {
      id: 4,
      title: "womens",
      imageUrl: "https://i.ibb.co/vk4qTb9/womens-directory-img-1-medium.jpg",
      // imageUrl:
      //   "https://images.unsplash.com/photo-1615819823949-0bdef969e8fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=832&q=80",
      position: "top",
    },
    {
      id: 5,
      title: "mens",
      // imageUrl:
      //   "https://images.unsplash.com/photo-1611943574626-91c9be96abc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1434&q=80",
      imageUrl: "https://i.ibb.co/Xxpn5Xd/mens-directory-img-1-medium.jpg",
      // imageUrl:
      //   "https://images.unsplash.com/photo-1615819823617-01028c94850a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=822&q=80",
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
      <Directory categories={genders} className="gender full-width"></Directory>
      <NewsLetter />
    </Fragment>
  );
}

export default Home;
