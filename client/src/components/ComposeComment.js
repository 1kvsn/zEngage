import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import classes from './CommonStyles.module.scss';

class ComposeComment extends React.Component {

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
										<span className="comment-bar"/>
										<p className='post-text-one'>{post.didToday}{post.learnedToday}</p>
										<a className="tag" >#{post.tag}</a>
										<div>
											<p>Replying to &nbsp;{post.user.name}</p>
										</div>
									</div>

									<div className='post-reply'>
										<i className="fas fa-user-circle"></i>
										<textarea rows={6} required maxLength="180" placeholder="Post your reply"></textarea>
									</div>
								</div>

								<div className="reply-submit">
									<input onClick={''} className='button is-rounded bg-primary reply-btn' type='submit' value='Reply' />
								</div>
							</div>
						</div>
					</section>
				</Dialog>
			</>
		)
	}
}

export default ComposeComment;