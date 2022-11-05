import { API } from "./API";
export const CategoriesServices = {
  createCategory: (categoryData) => {
    return API.post("/addCategory", categoryData);
  },
  readAllCategories: () => {
    return API.get("/getCategories", {
      headers: {
        "Access-Control-Allow-Origin": "https://cakeemon.vercel.app/",
      },
    });
  },
  deleteCategory: (id) => {
    return API.post(`/deleteCategory/${id}`);
  },
};
