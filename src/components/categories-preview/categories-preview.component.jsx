import {
  CategoryPreviewCont,
  CategoryLink,
  Preview,
} from "./categories-preview.styles.jsx";

import ProductCard from "../product-card/product-card.component";

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewCont>
      <h2>
        <CategoryLink to={`${title}`}>{title}</CategoryLink>
      </h2>
      <Preview>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewCont>
  );
};

export default CategoryPreview;
