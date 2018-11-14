import React from 'react';

const EmptyCartButton = props => (
	<button className="clear" onClick={props.emptyCartAction}>
		<span><i className="fas fa-undo-alt"></i></span>
		Clear Cart
	</button>
);

export default EmptyCartButton;