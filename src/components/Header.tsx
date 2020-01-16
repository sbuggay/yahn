import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { colors } from '../themes/theme';

class Header extends Component {
    getStyle(): React.CSSProperties {
        return {
            width: "100%",
            backgroundColor: colors.subtle,
            height: "30px",
            display: "flex",
            justifyContent: "space-between",
            fontSize: "1.2em",
            padding: "8px 0"
        }
    }

    getInnerStyle(): React.CSSProperties {
        return {
            width: "800px",
            display: "flex",
            alignItems: "center",
            margin: "0 auto",
            height: "100%",
            padding: "0 8px"
        }
    }

    getLinkStyle(): React.CSSProperties {
        return {
            color: "#ccc",
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
                    {/* <img style={{ border: "1px white solid", marginRight: "10px" }} src="https://news.ycombinator.com/y18.gif"></img> */}
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
