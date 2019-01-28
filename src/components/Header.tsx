import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    getStyle(): React.CSSProperties {
        return {
            width: "100%",
            backgroundColor: "#ff6600",
            height: "40px"
        }
    }

    getInnerStyle(): React.CSSProperties {
        return {
            width: "800px",
            display: "flex",
            alignItems: "center",
            margin: "0 auto",
            height: "100%"
        }
    }

    render() {
        return (
            <header style={this.getStyle()}>
                <div style={this.getInnerStyle()}>
                    <Link to="/">YAHN</Link>
                    <Link to="/new">new</Link>
                    <Link to="/ask">ask</Link>
                    <Link to="/show">show</Link>
                    <Link to="/jobs">jobs</Link>
                </div>

            </header>
        );
    }
}

export default Header;
