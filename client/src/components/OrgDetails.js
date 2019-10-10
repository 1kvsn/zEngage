import React from 'react';
import { connect } from 'react-redux';

import Nav from './Nav';
import Posts from './Posts';
import Footer from './Footer';
import OrgFeed from './OrgFeed';
import Invite from './Invite';
import { getOrgFeed } from '../actions/Action';


class OrgDetails extends React.Component {
	constructor(props){
		super(props);

		// TODO: Save it in store.
		this.state = {
			org: null,
			teammate: '',
		}
	}

	// TODO: Convert this into actioncreator
	componentDidMount = () => {
		fetch(`http://localhost:8000/api/v1/users/org/${this.props.match.params.id}`)
		.then(res => res.json())
    .then(data => {
			this.props.dispatch(getOrgFeed(data.org._id));
			this.setState({org: data.org, teammate: data.teammate});
    })
	}

	render() {
		return (
			<>
				<Nav />
				<section className='org-details-wrapper'>
					<div className="org-details-section">
						<div className='org-details'>
							{
								this.state.org ? (
								<>
									<div className='org-details-sub-container'>
										<span className=' flex'>
											<p className='org-name'> {this.state.org.name}</p>
										</span>
										<span className=' flex'>
											<p className='org-text-label'>Location: </p>
											<p className='org-text-data'>{this.state.org.location}</p>
										</span>
										<span className=' flex'>
											<p className='org-text-label'>Created by: </p>
											<p className='org-text-data'> {this.state.org.creator.name}</p>
										</span>
										<p>Members: {this.state.teammate.length}</p>
									</div>
								</>
							) : null
							}
						

							<div className='teammate-list-container'>
								<p className='teammates-list-heading'>Members</p>
								{
									this.state.teammate.length === 0  ? <p>No teammates added yet!</p> : null
								}
								{
									this.state.teammate && this.state.teammate.map(teammate => 
										<p>{teammate.teammateEmail}</p>)	
									}
							</div>
							<Invite data={this.state.org}/>
						</div>
						<div className='feed-container'>
							<Posts data={this.state.org}/>
							<OrgFeed />
						</div>
					</div>
				</section>
				<Footer />
			</>
		)
	}
}

export default connect()(OrgDetails);