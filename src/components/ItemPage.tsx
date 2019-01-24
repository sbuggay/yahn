import React, { Component } from 'react';
import queryString from "query-string";
import { getItem } from '../hn/api';
import { IItem } from './Item';

class ItemPage extends Component<any, IItem> {

	componentWillMount() {
		const query = queryString.parse(this.props.location.search)
		if (!query.id || !(typeof query.id == "string")) {
			return;
		}

		getItem(parseInt(query.id)).then(item => {
			const kids = item.kids.map(kid => getItem(kid));

			Promise.all(kids).then(comments => {
				this.setState({
					...item,
					comments
				});
			});
		});
	}

	render() {
		const renderComments = (comments: IItem[]) => comments.map(comment => (
			<div>
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
