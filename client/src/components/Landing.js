import React from 'react';
import { connect } from 'react-redux';

import Home from './Home';
import Dashboard from './Dashboard';

class Landing extends React.Component {
	render() {
		const { currentUser } = this.props;
		
		return (
			<>
				{
					!currentUser.isAuthInProgress ?
					(
						currentUser.user ? <Dashboard /> : <Home />
					)
					:	null 
				}
			</>
		)
	}
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Landing);