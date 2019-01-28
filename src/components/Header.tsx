import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class Header extends Component {
    getStyle(): React.CSSProperties {
        return {
            width: "100%",
            backgroundColor: "#ff6600",
            height: "30px"
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

    getLinkStyle(): React.CSSProperties {
        return {
            color: "black",
            marginRight: "10px"
        }
    }

    renderLink(to: string, label: any) {
        return <NavLink activeStyle={{ color: "white" }} exact={true} to={to} style={this.getLinkStyle()}>{label}</NavLink>;
    }

    render() {
        return (
            <header style={this.getStyle()}>
                <div style={this.getInnerStyle()}>
                    <img style={{ border: "1px white solid", marginRight: "10px" }} src="https://news.ycombinator.com/y18.gif"></img>
                    {this.renderLink("/", "YAHN")}
                    {this.renderLink("/new", "new")}
                    {this.renderLink("/ask", "ask")}
                    {this.renderLink("/show", "show")}
                    {this.renderLink("/jobs", "jobs")}
                </div>
            </header>
        );
    }
}

export default Header;
