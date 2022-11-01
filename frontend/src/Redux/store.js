import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {applyMiddleware} from 'redux'
import { legacy_createStore as createStore } from 'redux'
import { RootReducer } from './Reducers/RootReducer'
const middleware = [thunk]
const initialState = {
   wishList:{
      wishItems:localStorage.getItem('wishItems')?
      JSON.parse(localStorage.getItem('wishItems')):[]
   },

   cart: {
      cartItems:localStorage.getItem('cartItems')?
      JSON.parse(localStorage.getItem('cartItems')):[],

      shippingInfo:localStorage.getItem('shippingInfo')?
      JSON.parse(localStorage.getItem('shippingInfo')):{}
   }

   
}
const store = createStore(
   RootReducer,
   initialState,
   composeWithDevTools(applyMiddleware(...middleware))
)

export default store