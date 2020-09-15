import React, { Component } from 'react'
import formatCurrency from './uti'
 
 export default class products extends Component {
    
     render() {
         return (
             <div>
                 <ul className='products'>
                     {this.props.products.map((product) =>(
                         <li key={product._id}>
                             <div className='product'>
                                 <a href={"#" + products._id}>
                                     <img src={product.image} alt={product.title}></img>
                                 </a>
                                 <p>{products.title}</p>
                                 <div className="product-price">{ formatCurrency(product.price)}</div>
                                 <button
                                  onClick={()=> this.props.addToCart(product)}
                                   className="button primary">Add to Cart</button>
                             </div>
                         </li>
                     ))}
                 </ul>
            </div>
         )
     }
 }
 