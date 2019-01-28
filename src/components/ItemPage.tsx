import React, { Component } from 'react';
import queryString from "query-string";
import { HNAPI } from '../hn/api';
import { IItem } from '../hn/interfaces';
import Comment from "./Comment";
import Item from './Item';

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

	render() {
		const renderComments = (comments: IItem[]) => comments.map((item, index) => (
			<div key={index} >
				<Comment item={item} />
				{index !== comments.length - 1 ? <hr /> : null}
			</div>
		));

		if (!this.state) {
			return (
				<div>loading...</div>
			)
		}

		return (
			<div>
				<Item item={this.state} />
				{this.state.text ? <div dangerouslySetInnerHTML={{ __html: this.state.text }} /> : null}
				<div style={{ marginTop: "10px" }}>
					{this.state.comments ? renderComments(this.state.comments) : null}
				</div>
			</div>
		);
	}
}

export default ItemPage;
