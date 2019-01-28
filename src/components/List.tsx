import React, { Component } from 'react';
import { HNAPI, EListTypes } from '../hn/api';
import Item from './Item';
import { IItem } from '../hn/interfaces';

interface IProps {
	listFunction: () => Promise<number[]>;
}

interface IState {
	stories: IItem[];
}

class List extends Component<IProps, IState> {

	constructor(props: any) {

		super(props);

		this.state = {
			stories: []
		}
	}

	componentDidMount() {
		if (this.props.listFunction) {
			this.props.listFunction().then(json => {
				json = json.slice(0, 30);
				Promise.all(json.map(id => HNAPI.getItem(id))).then(res => {
					this.setState({
						stories: res
					});
				});
			});
		}
		else {
			HNAPI.getList(EListTypes.topstories).then(json => {
				json = json.slice(0, 30);
				Promise.all(json.map(id => HNAPI.getItem(id))).then(res => {
					this.setState({
						stories: res
					});
				});
			});
		}
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

export default List;
