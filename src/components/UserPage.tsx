import React, { Component } from 'react';
import queryString from "query-string";
import { HNAPI } from '../hn/api';
import { IItem, IUser } from '../hn/interfaces';
import Comment from "./Comment";
import { number } from 'prop-types';

class UserPage extends Component<any, IUser> {

    componentWillMount() {
        const query = queryString.parse(this.props.location.search)
        if (!(query.id && (typeof query.id == "string"))) {
            return;
        }

        HNAPI.getUser(query.id).then(item => {
            this.setState(item);
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
            <div style={{ marginTop: "10px" }}>
                <div>id: {this.state.id}</div>
                <div>karma: {this.state.karma}</div>
                <div>created: {this.state.created}</div>
                <div>about: <div dangerouslySetInnerHTML={{ __html: this.state.about }} /></div>
            </div>

        );
    }
}

export default UserPage;
