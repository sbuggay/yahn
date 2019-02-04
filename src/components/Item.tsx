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

	renderCommentInfo() {
		const item = this.props.item;
		if (!item.kids) {
			return <span> | no comments</span>;
		}

		return (
			<span> | <Link style={{ color: "#444" }} to={`/item?id=${item.id}`}>{item.kids.length} comment{item.kids.length === 1 ? "" : "s"}</Link></span>
		);
	}

	render() {
		function url_domain(data: string) {
			var a = document.createElement("a");
			a.href = data;
			return a.hostname;
		}

		const item = this.props.item;
		return (
			<div style={{ position: "relative" }}>
				<div style={{ position: "absolute", left: "-40px", textAlign: "right" }}>{item.index}</div>

				<div style={this.getStyle()}>
					<span><a href={item.url}>{item.title}</a> <a style={{ color: "#222" }} href="">({url_domain(item.url)})</a></span>
					<div style={this.getSubStyle()}>
						<span>{item.score} points</span>
						<span> by <Link style={{ color: "#222" }} to={`/user?id=${item.by}`}>{item.by}</Link></span>
						<span> {dayjs().diff(dayjs(item.time * 1000), "hour")} hours ago</span>
						{this.renderCommentInfo()}
					</div>
				</div>
			</div>
		);
	}
}

export default Item;
