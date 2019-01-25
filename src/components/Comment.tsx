import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IItem } from '../hn/interfaces';

class Comment extends Component<{ item: IItem }, any> {

    renderChildren() {
        const item = this.props.item;
        const kids = item.kids;
        if (!kids) {
            return;
        }

        return (
            <div>
                {item.kids.length} comments
            </div>
        );
    }

    render() {
        const item = this.props.item;
        return (
            <div>
                <div dangerouslySetInnerHTML={{ __html: item.text }} />
                <div>{this.renderChildren()}</div>
            </div>

        );
    }

}

export default Comment;
