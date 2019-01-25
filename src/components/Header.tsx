import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    getStyle(): React.CSSProperties {
        return {
            width: "100%",
            backgroundColor: "#ff6600"
        }
    }

    getLinkStyle(): React.CSSProperties {
        return {
            margin: "5px 10px",
            color: "black"
        }
    }

    render() {
        return (
            <div style={this.getStyle()}>
                <Link style={this.getLinkStyle()} to="/">YAHN</Link>
                <Link style={this.getLinkStyle()} to="/new">new</Link>
                <Link style={this.getLinkStyle()} to="/comments">comments</Link>
            </div>
        );
    }
}

export default Header;
