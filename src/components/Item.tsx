import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IItem } from '../hn/interfaces';
import dayjs from "dayjs";

class Item extends Component<{ item: IItem }, any> {

	getStyle(): React.CSSProperties {
		return {
			marginTop: "5px"
		}
	}

	getSubStyle(): React.CSSProperties {
		return {
			color: "#444"
		}
	}

	render() {
		const item = this.props.item;
		return (
			<div style={this.getStyle()}>
				<a href={item.url}>{item.title}</a>
				<div style={this.getSubStyle()}>
					<span>{item.score} points</span>
					<span> by <Link style={{color: "#444"}} to={`/user?id=${item.by}`}>{item.by}</Link></span>
					<span> {dayjs().diff(dayjs(item.time * 1000), "hour")} hours ago</span>
					<span> | <Link style={{color: "#444"}} to={`/item?id=${item.id}`}>{item.kids ? item.kids.length : 0} comments</Link></span>
				</div>
			</div>
		);
	}
}

export default Item;
