import { CategoriesContext } from "../../contexts/categories.context";
import { useContext } from "react";

import CategoryPreview from "../../components/categories-preview/categories-preview.component";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  console.log(Object.keys(categoriesMap));
  return (
    <>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </>
  );
};

export default CategoriesPreview;
