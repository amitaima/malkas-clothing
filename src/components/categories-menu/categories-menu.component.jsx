import "./categories-menu.styles.scss";
import CategoryItem from "../category-item/category-item.component";

const CategoriesMenu = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.map((category) => {
        return (
          <CategoryItem key={category.id} category={category}></CategoryItem>
        );
      })}
    </div>
  );
};

export default CategoriesMenu;
