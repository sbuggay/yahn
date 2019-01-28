import React, { Component } from 'react';
import List from './List';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ItemPage from './ItemPage';
import Header from './Header';
import UserPage from './UserPage';
import { HNAPI, EListTypes } from '../hn/api';

class App extends Component {
	getStyle(): React.CSSProperties {
		return {
			width: "800px",
			margin: "0 auto"
		}
	}

	render() {
		return (
			<Router>
				<div>
					<Header />
					<main style={this.getStyle()}>
						<Switch>
							<Route exact path="/" component={List} />
							<Route path="/item" component={ItemPage} />
							<Route path="/user" component={UserPage} />
							<Route path="/new" component={() => <List listFunction={() => HNAPI.getList(EListTypes.newstories)} />} />
							<Route path="/comments" component={() => <List listFunction={() => HNAPI.getList(EListTypes.newstories)} />} />
							<Route path="/ask" component={() => <List listFunction={() => HNAPI.getList(EListTypes.askstories)} />} />
							<Route path="/show" component={() => <List listFunction={() => HNAPI.getList(EListTypes.showstories)} />} />
							<Route path="/jobs" component={() => <List listFunction={() => HNAPI.getList(EListTypes.jobstories)} />} />
						</Switch>
					</main>
				</div>
			</Router>
		);
	}
}

export default App;
