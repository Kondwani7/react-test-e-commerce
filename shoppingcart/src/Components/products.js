 import React, { Component } from 'react'
import formatCurrency from './uti'
 
 export default class products extends Component {
     render() {
         return (
             <div>
                 <ul className='products'>
                     {this.props.products.map((products) =>(
                         <li key={products._id}>
                             <div className='product'>
                                 <a href={"#" + products._id}>
                                     <img src={products.image} alt={products.title}></img>
                                 </a>
                                 <p>{products.title}</p>
                                 <div className="product-price">{ formatCurrency(products.price)}</div>
                                 <button className="button primary">Add to Cart</button>
                             </div>
                         </li>
                     ))}
                 </ul>
            </div>
         )
     }
 }
 