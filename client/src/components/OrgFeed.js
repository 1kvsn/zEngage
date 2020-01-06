import React from 'react';
import { connect } from 'react-redux';

import ComposeComment from './ComposeComment';
import { addLike } from '../actions/Action';


class OrgFeed extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isComposeCommentModalOpen: false,
			selectedPost: null,
		}
	}

	handleCommentModal = (post) => {
		this.setState({
			isComposeCommentModalOpen: !this.state.isComposeCommentModalOpen,
			selectedPost: post,
		})
	}

	handleLike = (post) => {
		console.log(post);

		const payload = {};
		payload.orgId = this.props.orgId;
		payload.postId = post._id;

		this.props.addLike(payload);
	}

	render() {
		return (
			<>
				<section className='org-feed-section'>
					{
						this.props.orgPosts && this.props.orgPosts.map(post => {
							return (
								<div className='org-feed-posts' key={post._id}>
									<div className='post-container'>
										<div className='post'>
											<div className='post-head'>
												<span>
													<i className="fas fa-user-circle"></i>
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
											<div className="post-base">
												<div className="base-icon-wrap">
													<span onClick={() => this.handleCommentModal(post)}>
														<i className="far fa-comment-alt"></i>
													</span>
													<p>{post.comments.length ? post.comments.length : null}</p>
												</div>
												<div className="base-icon-wrap">
													<span onClick={() => this.handleLike(post)}>
														<i className="far fa-heart"></i>
													</span>
													<p>{post.likes}</p>
												</div>
												<span>
													<i className="fas fa-sign-out-alt"></i>
												</span>
											</div>
										</div>
									</div>
								</div>
							)
						})
					}
				</section>
				{
					this.state.isComposeCommentModalOpen && (
						<ComposeComment
							handleCommentModal={this.handleCommentModal}
							isComposeCommentModalOpen={this.state.isComposeCommentModalOpen}
							selectedPost={this.state.selectedPost}
						/>
					)
				}
			</>
		)
	}
}

function mapStateToProps(state) {
	return {
		orgId: state.organisations.orgId || '',
		orgPosts: state.organisations.orgFeed || [],
	}
}

export default connect(mapStateToProps, { addLike })(OrgFeed);