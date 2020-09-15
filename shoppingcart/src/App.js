import React from 'react';
import data from './data.json'
import Products from './Components/products';
import Filter from './Components/Filter';
import products from './Components/products';
import Cart from './Components/Cart';

class  App extends React.Component{
  constructor(){
    super();
    this.state= {
      products: data.products,
      cartItems:JSON.parse(localStorage.getItem("cartItems"))
      ?JSON.parse(localStorage.getItem("cartItems"))
      :[],
      size:"",
      sort:""     
    }
    this.filterProducts = this.filterProducts.bind(this);
    this.sortProducts = this.sortProducts.bind(this);
  }

  createOrder = (order) => {
    alert("Save your order " + order.name)
  }

  removeFromCart = (product)=> {
    const cartItems= this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x)=>x._id != product._id)
    });
    localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems.filter((x)=>x._id != product._id)));
  }
  

  addToCart= (product) => {
    const cartItems= this.state.cartItems.slice();
    let alreadyInCart= false;
    cartItems.forEach(item => {
      if(item._id ===product._id){
        item.count++;
        alreadyInCart= true;
      }
    });
    if(!alreadyInCart){
      cartItems.push({...product, count:1})
    };
    this.setState({cartItems});
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } 

  filterProducts(event){
    console.log(event.target.value);
    if(event.target.value===""){
      this.setState({size:event.target.value, products:data.products })
    } else{
      this.setState({
        size:event.target.value, products: data.products.filter(product =>
           product.availableSizes.indexOf(event.target.value)>=0),
      })
    }
  }
  sortProducts(event){
    console.log(event.target.value) 
    const sort = event.target.value
    this.setState((state) => ({
      sort: sort, 
      products: this.state.products.slice().sort((a,b) => (
        sort=== "Lowest"?
          a.price > b.price
          ? 1
          :-1
        :sort=== "Highest"?
          a.price < b.price
          ? 1
          :-1
        :a._id < b._id
        ? 1
        :-1
      ))
    }))
  }
  render(){
    return (
      <div className='grid-container'>
        <header>
          <a href=''>React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length}
              size={this.state.size}
              sort={this.state.sort}
              filterProducts={this.filterProducts}
              sortProducts={this.sortProducts}
              ></Filter>
              <Products 
                products={this.state.products}
                addToCart={this.addToCart}
              ></Products>
            </div>
            <div className="sidebar">
              <Cart 
              cartItems={this.state.cartItems}
              removeFromCart={this.removeFromCart}
              createOrder= {this.createOrder}/>
            </div>
          </div>
        </main>
        <footer>All rights reserved</footer>
      </div>
    );
  }
  
}

export default App;
