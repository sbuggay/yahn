import React, { Component } from 'react';
import { HNAPI, EListTypes } from '../hn/api';
import Item from './Item';
import { IItem } from '../hn/interfaces';
import queryString from "query-string";
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

interface IProps {
	listFunction: () => Promise<number[]>;
	location?: any;
}

interface IState {
	stories: IItem[];
	page: number;
}

class List extends Component<IProps, IState> {

	constructor(props: any) {

		super(props);

		this.state = {
			stories: [],
			page: 1
		}
	}

	componentDidMount() {
		const query = queryString.parse(window.location.search)
		const page = query.p ? (parseInt(query.p as string) - 1) * 30 : 0
		const data = this.props.listFunction ? this.props.listFunction : () => HNAPI.getList(EListTypes.topstories);



		data().then(json => {
			json = json.slice(page, page + 30);
			Promise.all(json.map(id => HNAPI.getItem(id))).then(res => {
				this.setState({
					stories: res
				});
			});
		});
	}


	render() {
		const renderStories = () => {
			if (this.state.stories.length === 0) {
				return (
					<div style={{ width: "64px", height: "64px", margin: "64px auto" }}>
						<LoadingSpinner />
					</div>
				);
			}

			return this.state.stories.map((item, index) => {
				return (
					<Item key={index} item={item} />
				);
			});
		}

		return (
			<div>
				{renderStories()}
				{/* <div>
					<Link to={{ pathname: window.location.pathname, search: `p=${this.state.page + 1}` }}>Next Page</Link>
				</div> */}
			</div>
		);
	}
}

export default List;
