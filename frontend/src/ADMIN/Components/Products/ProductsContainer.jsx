import React from 'react'
import Product from './Product'
import "../../../Pages/Products/products.style.css";


export default function ProductsContainer({products}) {
  return (
    <div className="admin-products-container">
        {
            products.map(product =>{
                return (
                    <Product product={product}/>
                )
            })
        }

    
    </div>
  )
}
