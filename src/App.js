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

	state = {
		productsInCart: createProductsInCart(products),
		totalAmount: 0,
		totalItems: 0,
		currentProductDisplayed: products[0].id, // Id from first product on Data file
	};

	addToCart = id => e => {
		let qtyElement = document.querySelector('.addToCart input');
		let qty = Math.floor(Number(qtyElement.value));
		let thisObj = this;

		qty = qty === 0 ? 1 : qty;
		qtyElement.value = qty;

		this.setState(prevState => ({
			productsInCart: prevState.productsInCart.map(product =>
				product.id === id ? { ...product, amount: product.amount + qty } : product
			),
		}), () => {
			thisObj.calculateCartTotal();
			thisObj.calculateItemsInCart();
		});
	};

	removeFromCart = id => e => {
		let thisObj = this;

		this.setState(prevState => ({
			productsInCart: prevState.productsInCart.map(product =>
				product.id === id ? { ...product, amount: 0 } : product // Replace '0' for 'product.amount - 1' to deduct products one by one
			),
		}), () => {
			this.calculateCartTotal();
			this.calculateItemsInCart();
		});
	};

	emptyCartAction = e => {
		let thisObj = this;

		this.setState(prevState => ({
			productsInCart: prevState.productsInCart.map(product =>
				{ 
					return { ...product, amount: 0 } 
				}
			),
		}), () => {
			this.calculateCartTotal();
			this.calculateItemsInCart();
		});
	};

	calculateCartTotal = e => {
		this.setState((prevState, currentProps) => {
			let totalAmount = 0;

			prevState.productsInCart.map( function(product) {
				if(product.amount > 0) {
					totalAmount += product.price * product.amount;
				} 
				return totalAmount;
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
				return totalItems;
			});

			return {totalItems: totalItems};
		});
	}

	showProduct = e => {
		let productToShow = e.target.value;

		this.setState((prevState, currentProps) => {
			return {currentProductDisplayed: Number(productToShow)};
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
								<select onChange={this.showProduct} defaultValue="">
									<option disabled value="">Select Your Menu for the day</option>
									{products.map(product => (
										<option value={product.id} key={product.id}>{product.name}</option>
									))}
								</select>
							</form>
						</div>
						{products.map(product => {
							if(this.state.currentProductDisplayed === product.id) {
								return <Product key={product.id} formatPrices={this.formatPrices} {...product} addToCart={this.addToCart} />
							}
							return false;
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
