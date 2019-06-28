import React from 'react';
import {connect} from 'react-redux';


class OrgFeed extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<>
				<section className='org-feed-section'>
					{
						this.props.orgPosts && this.props.orgPosts.map(post => {
							return (
						<div className='org-feed-posts'>
							<div className='post-container'>
								<div className='post'>
									<div className='post-head'>
										<span>
											<i class="fas fa-user-circle"></i>
											<p className='post-username'>{post.user.name}</p>
										</span>
										<div className='post-time'>
											<p>{new Date(post.createdAt).toLocaleTimeString()}</p>
											<p>{new Date(post.createdAt).toLocaleDateString()}</p>
										</div>
									</div>
									<div className='post-text'>
										<p className='post-text-one'>{post.didToday}</p>
										<p className='post-text-two'>
											{post.learnedToday}
											<a className="tag" >#{post.tag}</a>
										</p>
									</div>
								</div>
							</div>
						</div>
							)
						})	
					}	
				</section>

			</>
		)
	}
}

function mapStateToProps(state) {
	return {
		orgId: state.orgId || '',
		orgPosts: state.orgFeed || [],
	}
}

export default connect(mapStateToProps)(OrgFeed);