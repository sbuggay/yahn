import React, { Component } from 'react';
import queryString from "query-string";
import { HNAPI } from '../hn/api';
import { IItem } from '../hn/interfaces';
import Comment from "./Comment";
import Item from './Item';
import LoadingSpinner from './LoadingSpinner';

class ItemPage extends Component<any, IItem> {

	componentWillMount() {
		const query = queryString.parse(this.props.location.search)
		if (!query.id || !(typeof query.id == "string")) {
			return;
		}

		HNAPI.getItem(parseInt(query.id)).then(item => {

			this.setState({
				...item
			});

			const kids = item.kids.map(kid => HNAPI.getItem(kid));

			Promise.all(kids).then(comments => {
				this.setState({
					...item,
					comments
				});
			});
		});
	}

	renderComments() {
		const comments = this.state.comments;

		if (!comments) {
			return (
				<div style={{ width: "64px", height: "64px", margin: "64px auto" }}>
					<LoadingSpinner />
				</div>
			);
		}

		return comments.map((item, index) =>
			<div key={index} >
				<Comment item={item} />
				{index !== comments.length - 1 ? <hr /> : null}
			</div>
		);

	}

	render() {

		if (!this.state) {
			return (
				<div>loading...</div>
			)
		}

		return (
			<div>
				<Item item={this.state} linkComments={false} />
				{this.state.text ? <div dangerouslySetInnerHTML={{ __html: this.state.text }} /> : null}
				<div style={{ marginTop: "10px" }}>
					{this.renderComments()}
				</div>
			</div>
		);
	}
}

export default ItemPage;
