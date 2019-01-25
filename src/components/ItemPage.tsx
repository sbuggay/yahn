import React, { Component } from 'react';
import queryString from "query-string";
import { HNAPI } from '../hn/api';
import { IItem } from '../hn/interfaces';
import Comment from "./Comment";
import { Link } from 'react-router-dom';

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
		const renderComments = (comments: IItem[]) => comments.map((item, index) => (
			<Comment item={item} key={index} />
		));

		if (!this.state) {
			return (
				<div>loading...</div>
			)
		}

		return (
			<div>
				{this.state.title}
				<Link to={`/user?id=${this.state.by}`}>{this.state.by}</Link>
				{renderComments(this.state.comments)}
			</div>
		);
	}
}

export default ItemPage;
