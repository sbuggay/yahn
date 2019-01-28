import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IItem } from '../hn/interfaces';

import dayjs from "dayjs";
import { HNAPI } from '../hn/api';

interface IState {
    showChildren: boolean;
    children: IItem[];
}

class Comment extends Component<{ item: IItem }, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            showChildren: false,
            children: []
        }
    }

    renderChildren() {
        const item = this.props.item;
        const kids = item.kids;

        if (!kids) {
            return;
        }

        if (this.state.showChildren && this.state.children) {
            const comments = this.state.children.map((c, i) => <Comment key={i} item={c} />);
            return (
                <div style={{ marginLeft: "20px" }}>
                    {comments}
                </div>
            );
        }
        else {
            return <a style={{ color: "#444", textDecoration: "underline", cursor: "pointer" }} onClick={() => this.showChildren()}>{item.kids.length} comments</a>;
        }
    }

    showChildren() {
        const kids = this.props.item.kids;
        const comments = Promise.all(kids.map(kid => HNAPI.getItem(kid)));
        comments.then(res => {
            this.setState({
                ...this.state,
                showChildren: true,
                children: res
            });
        });

    }

    render() {
        const item = this.props.item;

        if (!item) {
            return null;
        }

        return (
            <div>
                <div style={{ color: "#444" }}>{item.by} {dayjs().diff(dayjs(item.time * 1000), "hour")} hours ago</div>
                <div dangerouslySetInnerHTML={{ __html: item.text }} />
                <div style={{ marginTop: "10px" }}>{this.renderChildren()}</div>
            </div>
        );
    }

}

export default Comment;
