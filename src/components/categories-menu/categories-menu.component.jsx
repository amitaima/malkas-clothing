import "./categories-menu.styles.scss";
import CategoryItem from "../category-item/category-item.component";

const CategoriesMenu = ({ categories, className = "" }) => {
  return (
    <section className={`section-categories ${className}`}>
      <div className="categories-container">
        {categories.map((category) => {
          return (
            <CategoryItem
              className={className}
              key={category.id}
              category={category}
            ></CategoryItem>
          );
        })}
      </div>
    </section>
  );
};

export default CategoriesMenu;
