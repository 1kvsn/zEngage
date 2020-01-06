import React from 'react';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import { addComments } from '../actions/Action';

class ComposeComment extends React.Component {

	state = {
		comment: "",
	}

	handleCommentContent = ({ target: { value } }) => {
		this.setState({ comment: value });
	}

	handleSubmit = () => {
		const { selectedPost, addComments, handleCommentModal } = this.props;

		const payload = {};
		payload.orgId = selectedPost.org;
		payload.postId = selectedPost._id;
		payload.comment = this.state.comment;

		if (payload.comment) {
			addComments(payload);
			handleCommentModal();
		}
	}

	render() {
		const post = this.props.selectedPost;
		return (
			<>
				<Dialog onClose={this.props.handleCommentModal} aria-labelledby="simple-dialog-title" open={this.props.isComposeCommentModalOpen} >
					<section className='org-feed-section comment-section'>
						<div className='org-feed-posts' key={post._id}>
							<div className='post-container'>
								<div className='post comment'>
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
										<span className="comment-bar" />
										<p className='post-text-one'>{post.didToday}{post.learnedToday}</p>
										<a className="tag" >#{post.tag}</a>
										<div>
											<p>Replying to &nbsp;{post.user.name}</p>
										</div>
									</div>

									<div className='post-reply'>
										<i className="fas fa-user-circle"></i>
										<textarea autoFocus onChange={this.handleCommentContent} rows={6} required maxLength="180" placeholder="Post your reply"></textarea>
									</div>
								</div>

								<div className="reply-submit">
									<input onClick={this.handleSubmit} className='button is-rounded bg-primary reply-btn' type='submit' value='Reply' />
								</div>
							</div>
						</div>
					</section>
				</Dialog>
			</>
		)
	}
}

export default connect(null, { addComments })(ComposeComment);