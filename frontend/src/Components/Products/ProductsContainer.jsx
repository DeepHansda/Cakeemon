import React from 'react'
import Product from './Product'
import './Products.css'

export default function ProductsContainer({products}) {
  return (
    <div className="products-container">
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
