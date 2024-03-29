import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategoriesAsync } from "../../store/categories/category.action";

const Shop = () => {
  //CATEGORIES
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategoriesMap = () => {
      dispatch(fetchCategoriesAsync());
    };
    getCategoriesMap();
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
