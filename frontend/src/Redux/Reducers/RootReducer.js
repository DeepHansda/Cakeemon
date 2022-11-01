import {combineReducers} from 'redux'
import { deleteBannerReducer, fetchBannersReducer, newBannerReducer } from './BannerReducers'
import { deleteBrandReducer, fetchBrandsReducer, newBrandReducer } from './BrandReducers'
import { cartReducers } from './CartReducers'
import { deleteCategoryReducer, fetchCategoriesReducer, newCategoryReducer } from './CategoriesReducers'
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './OrderReducers'
import { paymentReducers } from './PaymentReducers'
import {newProductReducer, newReviewReducer, productReducer,productsReducer} from './ProductsReducers'
import { createReducer } from './RepairReducers'
import { allUsersReducer, profileReducer, userReducer } from './UserReducers'
import { wishListReducer } from './WishListReducers'
export const RootReducer = combineReducers({
    user: userReducer,
    allUsers: allUsersReducer,
    deleteUser:profileReducer,

    newProduct:newProductReducer,
    products: productsReducer,
    product: productReducer,

    wishList: wishListReducer,
    cart: cartReducers,
    payment:paymentReducers,

    order:newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    allOrders: allOrdersReducer,
    updateOrder: orderReducer,
    deleteOrder:orderReducer,

    
    newReview: newReviewReducer,
    newRepair:createReducer,

    newBanners: newBannerReducer,
    banners:fetchBannersReducer,
    deleteBanner:deleteBannerReducer,

    categories:fetchCategoriesReducer,
    newCategory:newCategoryReducer,
    deleteCategory:deleteCategoryReducer,

    brands:fetchBrandsReducer,
    newBrand:newBrandReducer,
    deleteBrand:deleteBrandReducer

})  

