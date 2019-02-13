import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IItem } from '../hn/interfaces';
import dayjs from "dayjs";
import { colors } from '../themes/theme';

import { distanceInWordsToNow } from "date-fns";

function url_domain(data: string) {
	var a = document.createElement("a");
	a.href = data;
	return a.hostname;
}

class Item extends Component<{ item: IItem }, any> {

	getStyle(): React.CSSProperties {
		return {
			marginTop: "5px"
		}
	}

	getSubStyle(): React.CSSProperties {
		return {
			color: colors.light
		}
	}

	renderHeader() {
		const item = this.props.item;

		const link = item.url ? <a style={{ color: colors.light }} href="">({url_domain(item.url)})</a> : null;

		return (
			<span>
				<a href={item.url}>{item.title}</a> {link}
			</span>
		);
	}

	renderCommentInfo() {
		const item = this.props.item;
		if (!item.kids) {
			return <span> | no comments</span>;
		}

		return (
			<span> <Link style={{ color: colors.highlight }} to={`/item?id=${item.id}`}>{item.kids.length} comment{item.kids.length === 1 ? "" : "s"}</Link></span>
		);
	}

	render() {

		const item = this.props.item;
		return (
			<div style={{ position: "relative" }}>
				<div style={{ position: "absolute", left: "-40px", right: "0", color: colors.light }}>{item.index}</div>

				<div style={this.getStyle()}>
					{this.renderHeader()}
					<div style={this.getSubStyle()}>
						<span>{item.score} points</span>
						<span> by <Link style={{ color: colors.highlight }} to={`/user?id=${item.by}`}>{item.by}</Link></span>
						<span> {distanceInWordsToNow(item.time * 1000)} ago</span>
						{this.renderCommentInfo()}
					</div>
				</div>
			</div>
		);
	}
}

export default Item;
