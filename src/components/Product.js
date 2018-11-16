import React from 'react';

const Product = props => (
	<div className="productDetail">
		<div className="image">
			<img src={props.img} alt={props.name} />
		</div>
		<div className="details">
			<h2>{props.name}</h2>
			<p>{props.description}</p>
			<h3>Price: $ <span>{props.formatPrices(props.price)}</span></h3>
			<div className="addToCart">
				<input type="number" placeholder="QTY" min="1" defaultValue="1" />
				<button onClick={props.addToCart(props.id)}>
					<span><i className="fas fa-shopping-basket"></i></span>
					Add To Cart
				</button>
			</div>
		</div>
	</div>
);

export default Product;
