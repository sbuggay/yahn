import React, { Component } from 'react';
import { getTopStories, getItem } from '../hn/api';
import Item, { IItem } from './Item';

interface IState {
	stories: IItem[];
}

class NewsList extends Component<any, IState> {

	constructor(props: any) {

		super(props);

		this.state = {
			stories: []
		}
	}

	componentDidMount() {
		getTopStories().then(json => {
			json = json.slice(0, 30);
			Promise.all(json.map(id => getItem(id))).then(res => {
				this.setState({
					stories: res
				});
			});
		});
	}

	render() {
		const renderStories = () => {
			return this.state.stories.map((item, index) => {
				return (
					<Item key={index} item={item} />
				);
			});
		}

		return (
			<div>
				{renderStories()}
			</div>
		);
	}
}

export default NewsList;
