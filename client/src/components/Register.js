import React, { Component } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";

import { registerAction } from '../actions/Action';

class Register extends Component {

	constructor() {
		super();

		this.state = {
			name: '',
			email: '',
			password: '',
			isInvited: false,
		}
	}

	componentDidMount = () => {
		const {ref} = queryString.parse(location.search);
		// TODO: convert this into an action.
		if(ref) {
			fetch(`http://localhost:8000/api/v1/users/register/verify/${ref}`)
			.then(res => res.json())
			.then(({foundTeammate: {teammateEmail}}) => {
				this.setState(state => ({
					...state,
					email: teammateEmail,
					isInvited: true,
				}))
			})
		}
	}

	handleSubmit = (e) => {
		// TODO: add validation for email etc.

		if (this.state.password.length < 6) {
			return alert('Password needs to be atleast 6 chars.')
		}

		if (!this.state.name || !this.state.email) {
			return alert('Please enter your name and email.')
		}

		e.preventDefault();
		this.props.dispatch(registerAction(this.state));
		this.props.history.push('/users/login')
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}



	render() {
		return(
			<>
				<div className="register columns is-desktop is-vcentered home-bg-split-right">
					<div className="column home-bg-split-left parent">
						<div className='child'>
							<div className='flex'>
								<i class="fas fa-search home-icons"></i>
								<p className='home-text-left'>Create your organization.</p>
							</div>
							<div className='flex'>
								<i class="fas fa-users home-icons"></i>
								<p className='home-text-left'>Add teams and invite teammates.</p>
							</div>
							<div className='flex'>
								<i class="fas fa-crosshairs home-icons"></i>
								<p className='home-text-left'>Keep track of your team's progress.</p>
							</div>
						</div>
					</div>
					<form className="form column" onSubmit={(e)=>this.handleSubmit(e)}>
						<div className="column is-half">

							<div className="field">
								<label className='label'>name:</label>
								<p class="control has-icons-left has-icons-right">
									<input className='input' value={this.state.name} onChange={(e) => this.handleChange(e)} type="text" name="name" placeholder="e.g Alex Smith"/>
									<span class="icon is-small is-left">
										<i class="fas fa-user"></i>
									</span>
									<span class="icon is-small is-right">
										<i class="fas fa-check"></i>
									</span>
								</p>
							</div>

							<div className="field">
								<label className='label'>email:</label>
								<p class="control has-icons-left has-icons-right">

									<input className='input' disabled={this.state.isInvited} value={this.state.email || ''} onChange={(e) => this.handleChange(e)} type="email" name="email" placeholder="e.g. alexsmith@gmail.com" />
									<span class="icon is-small is-left">
										<i class="fas fa-envelope"></i>
									</span>
									<span class="icon is-small is-left">
										<i class="fas fa-envelope"></i>
									</span>
								</p>
							</div>

							<div className="field">
								<label className='label'>password:</label>
								<input className='input' value={this.state.password} onChange={(e) => this.handleChange(e)} type="password" name="password" placeholder='minimum 6 digits'/>
							</div>
							{
								this.state.name && this.state.email && this.state.password ? 
								<button className="button bg-primary" type="submit">Signup</button> : null
							}
							<p className='flex register-login-text'>
								Already have an account?
								<Link to="/users/login">
									<p>Login</p>
								</Link>
							</p>
						</div>
					</form>
				</div>
			</>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		userData : state.data
	}
}

export default connect(mapStateToProps)(Register);