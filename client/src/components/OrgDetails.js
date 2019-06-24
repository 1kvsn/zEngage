import React from 'react';
import Teammate from './Teammate';
import {connect} from 'react-redux';
import Nav from './Nav';
import OrgFeed from './OrgFeed';
import {getOrgFeed} from '../store/actions/Action';
import Footer from './Footer';
import Posts from './Posts';

class OrgDetails extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			org: null,
			teammate: '',
		}
	}

	componentDidMount = () => {
		fetch(`http://localhost:8000/api/v1/users/org/${this.props.match.params.id}`)
		.then(res => res.json())
    .then(data => {
			// console.log(data.org._id, 'data.ordID in orgDetails Fetch');
			this.props.dispatch(getOrgFeed(data.org._id));
			this.setState({org: data.org, teammate: data.teammate});
			// this.props.dispatch({type: "GET_ORG_ID", payload: data.org})
    })
	}

	render() {
		return (
			<>
				<Nav />
				<section className='columns'>
					<div className='column is-half org-details'>
						<h3 className="is-4 is-spaced org-details-heading">Organization Details</h3>
						{
						this.state.org ? (
							<>
							<div className='org-details-sub-container'>
								<span className='org-details flex'>
									<p className='org-text-label'>Name: </p>
									<p className='org-text-data'> {this.state.org.name}</p>
								</span>
								<span className='org-details flex'>
									<p className='org-text-label'>Location: </p>
									<p className='org-text-data'> {this.state.org.location}</p>
								</span>
								<span className='org-details flex'>
									<p className='org-text-label'>Created by: </p>
									{/* <p className='org-text-data'> {this.state.org.creator.name}</p> */}
								</span>
							</div>
							</>
						) : null
						}

						<Teammate data={this.state.org}/>
					</div>
					{/* <div className='column is-half'>
						<p className='teammates-list-heading'>Teammates</p>
						{
							this.state.teammate.length === 0  ? <p>No teammates added yet!</p> : null
						}
						{
							this.state.teammate && this.state.teammate.map(teammate => 
										<p>{teammate.teammateEmail}</p>)	
						}
					</div> */}
					<div className='column is-half'>
						<Posts data={this.state.org}/>
					</div>
				</section>
				{/* SEND state.org as props to OrgFeed Component as well so that the OrgFeed can be fetched for respective ORgs. */}
					<OrgFeed />
				<Footer />
			</>
		)
	}
}

// export default OrgDetails;

// const mapStateToProps = (state) => {
// 	return {
// 		orgDetails: state
// 	}
// }

export default connect()(OrgDetails);