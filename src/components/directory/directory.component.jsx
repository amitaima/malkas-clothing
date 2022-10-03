import "./directory.styles.scss";
import DirectoryItem from "../directory-item/directory-item.component";

const Directory = ({ categories, className = "" }) => {
  return (
    <section className={`section-categories ${className}`}>
      <div className="categories-container">
        {categories.map((category) => {
          return (
            <DirectoryItem
              className={className}
              key={category.id}
              category={category}
            ></DirectoryItem>
          );
        })}
      </div>
    </section>
  );
};

export default Directory;
