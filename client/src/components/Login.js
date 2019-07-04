import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { loginAction } from '../actions/Action';


class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.dispatch(loginAction(this.state, () => {
			localStorage.getItem('token') ? 
			this.props.history.push("/landing") : this.props.history.push('/users/login');
		})
		);
	}


	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	render() {

		return (
			<>
				<div className="columns is-desktop is-vcentered home-bg-split-right">
					<div className="column home-bg-split-left parent">
						<div className='child'>
							<div className='flex'>
								<i className="fas fa-search home-icons"></i>
								<p className='home-text-left'>Create your organization.</p>
							</div>
							<div className='flex'>
								<i className="fas fa-users home-icons"></i>
								<p className='home-text-left'>Add teams and invite teammates.</p>
							</div>
							<div className='flex'>
								<i className="fas fa-crosshairs home-icons"></i>
								<p className='home-text-left'>Keep track of your team's progress.</p>
							</div>
						</div>
					</div>
					<form className="form column" onSubmit={(e) => this.handleSubmit(e)}>
						<div className='column is-half is-vcentered'>

							<div className="field">
								<label className='label'>email</label>
								<p className="control has-icons-left has-icons-right">
									<input className='input' value={this.state.email} onChange={(e) => this.handleChange(e)} name='email' type='email' placeholder='e.g alexsmith@gmail.com' autoComplete='email'/>
									<span className="icon is-small is-left">
										<i className="fas fa-envelope"></i>
									</span>
									<span className="icon is-small is-left">
										<i className="fas fa-envelope"></i>
									</span>
								</p>
							</div>
								
							<div className="field">
								<label className='label' >password</label>
								<input className='input' value={this.state.password} onChange={(e) => this.handleChange(e)} name='password' type='password' autoComplete='current-password' />
							</div>
							<button className="button bg-primary" type='submit'>Log in</button>
							<div className='flex register-login-text'>Don't have account?
								<Link to="/users/register">
									<p>Sign up</p>
								</Link>
							</div>
						</div>
					</form>
				</div>
			</>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		token : state.token
	}
}


export default connect(mapStateToProps)(Login);


