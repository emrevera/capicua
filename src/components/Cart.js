import React from 'react';
import products from '../data/products.json';

const Cart = props => {
	const cartItem = products.find(
		product => product.id === props.selectedItem.id
	);
	return (
		<li>
			<span>{props.selectedItem.amount}</span>
			{cartItem.name}
			<strong>$ {props.formatPrices(cartItem.price * props.selectedItem.amount)}</strong>
			<button className="remove" title="Remove" onClick={props.removeFromCart(props.selectedItem.id)}>
				<i className="far fa-trash-alt"></i>
			</button>
		</li>
	);
};

export default Cart;

