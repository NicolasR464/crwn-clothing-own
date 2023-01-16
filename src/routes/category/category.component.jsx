import { CategoryCont, H2 } from "./category-styles.jsx";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState, Fragment } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";

import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";

const Category = () => {
  const { category } = useParams();

  const categoriesMap = useSelector(selectCategoriesMap);

  const [products, setProducts] = useState(categoriesMap[category]);

  //it won't update unless category or categoriesMap change
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <H2>{category.toUpperCase()}</H2>
      <CategoryCont>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryCont>
    </Fragment>
  );
};

export default Category;
