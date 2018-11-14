import React, { Component } from 'react';
import products from './data/products.json';
import Product from './components/Product.js';
import Cart from './components/Cart.js';
import EmptyCartButton from './components/EmptyCartButton.js';
import CartPlaceHolder from './components/CartPlaceHolder.js';
import ViewCartAmount from './components/ViewCartAmount.js';

const createProductsInCart = products => 
	products.map(product => ({ id: product.id, amount: 0, price: product.price }));

class App extends Component {

	//meter todo en un json, comentar el codigo

	state = {
		productsInCart: createProductsInCart(products),
		totalAmount: 0,
		totalItems: 0,
		currentProductDisplayed: products[0].id, //Id from first product on Data file
	};

	addToCart = id => e => {
		this.setState(prevState => ({
			productsInCart: prevState.productsInCart.map(product =>
				product.id === id ? { ...product, amount: product.amount + 1 } : product
			),
		}));
		this.calculateCartTotal();
		this.calculateItemsInCart();
	};

	removeFromCart = id => e => {
		this.setState(prevState => ({
			productsInCart: prevState.productsInCart.map(product =>
				product.id === id ? { ...product, amount: product.amount - 1 } : product
			),
		}));
		this.calculateCartTotal();
		this.calculateItemsInCart();
	};

	emptyCartAction = e => {
		this.setState(prevState => ({
			productsInCart: prevState.productsInCart.map(product =>
				product.amount > 0 ? { ...product, amount: 0 } : 0
			),
		}));
		this.calculateCartTotal();
		this.calculateItemsInCart();
	};

	calculateCartTotal = e => {
		this.setState((prevState, currentProps) => {
			let totalAmount = 0;

			prevState.productsInCart.map( function(product) {
				if(product.amount > 0) {
					totalAmount += product.price * product.amount;
				} 
			});
			
			return {totalAmount: this.formatPrices(totalAmount)};
		});
	}

	calculateItemsInCart = e => {
		this.setState((prevState, currentProps) => {
			let totalItems = 0;

			prevState.productsInCart.map(function(product) {
				if(product.amount > 0) {
					totalItems += product.amount;
				}
			});

			return {totalItems: totalItems};
		});
	}

	showProduct = e => {
		let productToShow = e.target.value;

		this.setState((prevState, currentProps) => {
			return {currentProductDisplayed: productToShow};
		});
	}

	formatPrices = (unformated) => {
		let toFormat = unformated.toString();
		return toFormat.replace(/(?:(^\d{1,3})(?=(?:\d{3})*$)|(\d{3}))(?!$)/mg, '$1$2.')+',00';
	}

	render() {
		return (
			<div className="App">
				<div className="layout">
					<div className="products">
						<div className="filter">
							<form>
								<select onChange={this.showProduct}>
									<option disabled selected>Select Your Menu for the day</option>
									{products.map(product => (
										<option value={product.id} key={product.id}>{product.name}</option>
									))}
								</select>
							</form>
						</div>
						{products.map(product => {
							if(this.state.currentProductDisplayed == product.id) {
								return <Product key={product.id} formatPrices={this.formatPrices} {...product} addToCart={this.addToCart} />
							}
						})}
					</div>
					<div className="cart">
						<button className="viewCart">
							<span><i className="fas fa-shopping-basket"></i></span>
							View Cart 
							{this.state.totalItems > 0 ? <ViewCartAmount totalItems={this.state.totalItems} /> : null}
						</button>
						<div className="receipt">
							<h3>Your Order:</h3>
							{this.state.totalItems === 0 ? <CartPlaceHolder /> : null}
							<ul>
								{this.state.productsInCart
									.filter(selectedItem => selectedItem.amount > 0)
									.map(selectedItem => (
									<Cart selectedItem={selectedItem} removeFromCart={this.removeFromCart} formatPrices={this.formatPrices} key={selectedItem.id} />
								))}
							</ul>
							<div className="total">
								<h4>
									Total: 
									<strong>
										$&nbsp; 
										{this.state.totalAmount}
									</strong>
								</h4>
							</div>
						</div>
						{this.state.totalItems > 0 ? <EmptyCartButton emptyCartAction={this.emptyCartAction} /> : null}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
