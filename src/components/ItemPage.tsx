import React, { Component } from 'react';
import queryString from "query-string";
import { HNAPI } from '../hn/api';
import { IItem } from '../hn/interfaces';

class ItemPage extends Component<any, IItem> {

	componentWillMount() {
		const query = queryString.parse(this.props.location.search)
		if (!query.id || !(typeof query.id == "string")) {
			return;
		}

		HNAPI.getItem(parseInt(query.id)).then(item => {
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
		const renderComments = (comments: IItem[]) => comments.map((comment, index) => (
			<div key={index}>
				{comment.text}
			</div>
		));

		if (!this.state) {
			return (
				<div>loading...</div>
			)
		}

		return (
			<div>
				{this.state.title}
				{renderComments(this.state.comments)}
			</div>
		);
	}
}

export default ItemPage;
