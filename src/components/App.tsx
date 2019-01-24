import React, { Component } from 'react';
import NewsList from './NewsList';

import { BrowserRouter as Router, Route } from "react-router-dom";
import ItemPage from './ItemPage';

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Route exact path="/" component={NewsList} />
					<Route path="/item" component={ItemPage} />
				</div>

			</Router>
		);
	}
}

export default App;
