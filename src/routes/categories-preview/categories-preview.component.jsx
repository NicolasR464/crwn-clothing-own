import { selectCategoriesMap } from "../../store/categories/category.selector";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/categories-preview/categories-preview.component";
import { Fragment } from "react";

const CategoriesPreview = () => {
  // console.log(Object.keys(categoriesMap));

  const categoriesMap = useSelector(selectCategoriesMap);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
