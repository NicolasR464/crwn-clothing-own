import { createSelector } from "reselect";

//initial selector that gives us back just that slice of the reducer that we need, which is the category reducer ->
//state return the entire Redux state
const selectCategoryReducer = (state) => {
  console.log("category selector 1 fired");
  console.log({ state });
  return state.categories;
};

//then we use the function below inside of a memoize selector. We create it is createSelector.
// It takes 2 arguments, the first is the input selector the second is the output selector
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => {
    console.log("category selector 2 fired");
    return categoriesSlice.categories;
  }
);

// if the cached valued for categories is going to be the same then it is enough - so in order to memoize the function above we use the createSelector hook once again as below

//As long as selectCategories does not change - the reduce function below won't run

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    console.log("category selector 3 fired");
    console.log({ categories });
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);
