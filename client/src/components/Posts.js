import React from 'react';
import { connect } from 'react-redux';

import { savePostsAction, getOrgFeed } from '../actions/Action';

//For POST success notification message
var isPostSuccess = false;

const initialState = {
	didToday: '',
	learnedToday: '',
	orgId: '',
	tag: '',
}


class Posts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {initialState}
	}

	componentDidMount = () => {
		// this.props.dispatch(getUserPosts());
		isPostSuccess = false;
	}

	
	handleFirstInput = (e) => {
		var orgid = this.props.data ? this.props.data : '';
		this.setState({
			didToday: e.target.value,
			orgId: orgid._id,
		})
	}

	handleSecondInput = (e) => {
		this.setState({
			learnedToday: e.target.value,
		})
	}

	handleTag = (e) => {
		this.setState({
			tag: e.target.value,
		})
	}

	handleSubmit = () => {
		if(this.state.didToday && this.state.learnedToday && this.state.orgId && this.state.tag) {
			this.props.dispatch(savePostsAction(this.state));
			this.setState(initialState);
			isPostSuccess = !isPostSuccess;
			this.props.dispatch(getOrgFeed(this.props.orgId));
		}
	}

	render() {
		return(
			<>
				<div className='is'>
					<div className='post-inputs'>
							<p>What did you do today?</p>
						<div className='post-input-box'>
							<textarea rows={this.state.didToday ? "4" : "1"} autoFocus required maxLength="180" type="text" onChange={this.handleFirstInput} name="didToday" value={this.state.didToday} />
							{
								this.state.didToday ? <small>{this.state.didToday.length}/180</small> : null
							}
							
						</div>
					</div>
					<div className='post-inputs'>
						<p>What did you learn today?</p>
						<div className='post-input-box'>
							<textarea rows={this.state.learnedToday ? "4" : "1"} required maxLength="180" onChange={this.handleSecondInput} name="learnedToday" value={this.state.learnedToday} />
							{
								this.state.learnedToday ? <small>{this.state.learnedToday.length}/180</small> : null 
							}
							
						</div>
					</div>
					<div className="input-radio-buttons">
						<div>
							<span>
								<input required type='radio' value='create' checked={this.state.tag === "create"} onChange={this.handleTag} />
								<label>Create</label>
							</span>
							<span>
								<input required type='radio' value='iterate' checked={this.state.tag === "iterate"} onChange={this.handleTag} />
								<label>Iterate</label>
							</span>
							<span>
								<input required type='radio' value='review' checked={this.state.tag === "review"} onChange={this.handleTag} />
								<label>Review</label>
							</span>
						</div>
						<input onClick={this.handleSubmit} className='button is-rounded bg-primary' type='submit' value='Post' />
					</div>
					{
						isPostSuccess ? <p className="notification-text">Post successfull !</p> : null
					}
				</div>
			{/* User Posts Section */}
			{/* <section className='columns is-centered'>
				<div className='column is-4'>
					<div className='post-container'>
						{
							userPosts.map(post => {
								return (
									<div className='post'>
										<div class='post-time'>
											<p>{new Date(post.createdAt).toLocaleTimeString()}</p>
											<p>on {new Date(post.createdAt).toDateString()}</p>
										</div>
										
										<p></p>
										<p>{post.didToday}</p>
										<p>{post.learnedToday}</p>

									</div>
								)
							})	
						}	
					</div>
				</div>
			</section> */}
			</>
		)
	}
}

function mapStateToProps(state) {
	return {
		posts: state.userPosts,
		orgId: state.orgId
	}
}

export default connect(mapStateToProps)(Posts);