import React, { Component } from 'react';
import { getItem } from './hn/api';

interface IProps {
    id: number;
}

interface IStory {
    by: string;
    descendants: number;
    id: number;
    kids: number[];
    score: number;
    time: number;
    title: string;
    type: string;
    url: string;
}

interface IState {
    loaded: boolean;
    story?: IStory;
}

class Story extends Component<IProps, IState> {

    constructor(props: any) {

        super(props);

        this.state = {
            loaded: false,
            story: undefined
        }
    }

    componentDidMount() {
        getItem(this.props.id).then(json => {
            this.setState({
                loaded: true,
                story: json
            });
        });
    }

    render() {
        if (this.state.loaded && this.state.story) {
            const story = this.state.story;
            return (
                <div>
                    <div>
                        <a href={story.url}>{story.title}</a>
                    </div>
                    <div className="details">
                        <span>{story.score} points</span>
                        <span>by <a href="">{story.by}</a></span>
                        <span>{new Date(story.time).toDateString()}</span>
                        <span><a href="">{story.descendants} comments</a></span>
                    </div>
                </div >
            );
        }
        else {
            return (
                <div>
                </div>
            );
        }

    }
}

export default Story;
