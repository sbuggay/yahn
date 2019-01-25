import React, { Component } from 'react';
import NewsList from './NewsList';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ItemPage from './ItemPage';
import Header from './Header';
import UserPage from './UserPage';

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Header />
					<Switch>
						<Route exact path="/" component={NewsList} />
						<Route path="/item" component={ItemPage} />
						<Route path="/user" component={UserPage} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
