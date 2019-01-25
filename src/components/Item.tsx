import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IItem } from '../hn/interfaces';

class Item extends Component<{ item: IItem }, any> {
	render() {
		const item = this.props.item;
		return (
			<div>
				<a href={item.url}>{item.title}</a>
				<div>
					<span>{item.score} points</span>
					<span> by <Link to={`/user?id=${item.by}`}>{item.by}</Link></span>
					<span> | <Link to={`/item?id=${item.id}`}>{item.kids ? item.kids.length : 0} comments</Link></span>
					
				</div>
			</div>
		);
	}
}

export default Item;
