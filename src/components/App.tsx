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
			margin: "0 auto 200px"
		}
	}

	render() {
		return (
			<Router>
				<div>
					<Header />
					<main style={this.getStyle()}>
						<Switch>
							<Route exact path="/yahn" component={List} />
							<Route path="/yahn/item" component={ItemPage} />
							<Route path="/yahn/user" component={UserPage} />
							<Route path="/yahn/new" component={() => <List listFunction={() => HNAPI.getList(EListTypes.newstories)} />} />
							<Route path="/yahn/ask" component={() => <List listFunction={() => HNAPI.getList(EListTypes.askstories)} />} />
							<Route path="/yahn/show" component={() => <List listFunction={() => HNAPI.getList(EListTypes.showstories)} />} />
							<Route path="/yahn/jobs" component={() => <List listFunction={() => HNAPI.getList(EListTypes.jobstories)} />} />
						</Switch>
					</main>
				</div>
			</Router>
		);
	}
}

export default App;
