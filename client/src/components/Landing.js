import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import Organization from './Organization';
import { connect } from 'react-redux';

import Home from './Home';

class Landing extends React.Component {
	render() {
		const currentUser = this.props.currentUser;
		return (
			<>
				{!currentUser.isAuthInProgress ?
					(currentUser.user ? <Dashboard /> : <Home />)
				:	null }
			</>
		)
	}
}

function Dashboard() {
	return (
		<React.Fragment>
			<Nav />
			<Organization />
			<Footer />
		</React.Fragment>
	)
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Landing);