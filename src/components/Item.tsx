import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IItem } from '../hn/interfaces';

class Item extends Component<{ item: IItem }, any> {
	render() {
		const item = this.props.item;
		return (
			<div>
				<Link to={`/item?id=${item.id}`}>{item.title}</Link>
			</div>
		);
	}
}

export default Item;
