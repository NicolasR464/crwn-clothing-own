export const CATEGORIES_ACTION_TYPES = {
  SET_CATEGORIES: "category/SET_CATEGORIES",
  FETCH_CATEGORIES_START: "category/FETCH_CATEGORIES_START",
  FETCH_CATEGORIES_SUCCESS: "category/FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_FAILED: "category/FETCH_CATEGORIES_FAILED",
};

//There are 2 possible cases that can occur during the fetch process. We can either succeed, so we say fetch catefory success or we can fail
// we determine whther or not we want to store that data or store an erro state.
