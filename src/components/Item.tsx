import React, { Component } from 'react';
import { Link } from 'react-router-dom';

enum ETypes {
	story = "story",
	comment = "comment",
	job = "job",
	poll = "poll",
	pollopt = "pollopt"
}

export interface IItem {
	by: string;
	descendants: number;
	id: number;
	kids: number[];
	score: number;
	time: number;
	title: string;
	type: ETypes;
	url: string;
	parts?: number[]; // poll only
	poll?: number; // pollopt only
	comments: IItem[];
	text? : string; // comment only
}

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
