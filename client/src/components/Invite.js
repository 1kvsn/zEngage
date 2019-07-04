import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Invite extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			teammateEmail: '',
			//Add flag for invite sent?
			inviteConfirmMessage: '', 
		}
	}

	updateEmail = (e) => {
		this.setState({
			teammateEmail: e.target.value,
		});
	}

	onClickHandler = (e) => {
		e.preventDefault();
		const token = this.props.token;

		const data = {
			teammateEmail: this.state.teammateEmail,
			org: this.props.data._id,
			};

		axios.post("http://localhost:8000/api/v1/users/org/invite", data, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': "bearer " + token
			}
		}).then(data => {
			this.setState({inviteConfirmMessage: data.data.message})
		}
		);
		this.setState({teammateEmail: ''});
	}


	render() {
		return (
			<>
				<form onSubmit={this.onClickHandler} encType="multipart/form-data" className="">
					<div className="teammate-page-left">
						<div className='flex invite-input'>
							<input className='input ' value={this.state.teammateEmail} onChange={this.updateEmail} type='email' placeholder='Invite a member' />
							<input className='button bg-primary' type='submit' value='Invite' />
						</div>
					</div>
				</form>
				<div>
					{
						this.state.inviteConfirmMessage ? <p className='notification-text'>{this.state.inviteConfirmMessage}</p>: null
					}
				</div>
			</>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.token
	}
}

export default connect(mapStateToProps)(Invite);