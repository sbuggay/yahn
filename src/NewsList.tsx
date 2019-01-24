import React, { Component } from 'react';
import { getTopStories } from './hn/api';
import Story from './Story';

interface IState {
    stories: number[];
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
            this.setState({
                stories: json.slice(0, 30)
            });
        });
    }

    render() {
        const renderStories = () => {
            return this.state.stories.map((id, index) => {
                return (
                    <Story key={index} id={id} />
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
