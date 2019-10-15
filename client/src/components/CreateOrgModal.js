import React from 'react';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createOrganisation } from '../actions/Action';

const initialState = {
	selectedFile: null,
	orgName: '',
	location: ''
}

class CreateOrgModal extends React.Component {
	state = initialState;

	onChangeHandler = (e) => {
		this.setState({
			selectedFile: event.target.files[0]
		});
	}

	changeValue = (e) => {
		const key = e.target.name;
		this.state[key] = e.target.value;
		this.setState(this.state);
	}

	onClickHandler = (e) => {
		const { selectedFile, orgName, location, creator } = this.state;
		const { handleCreateOrgModal } = this.props;
		e.preventDefault();

		// if(!this.state.selectedFile || !this.state.orgName || !this.state.location) {
		//   return alert('File, Name and Location are must.');
		// }

		// if(!this.state.selectedFile.name.endsWith('.png') || !this.state.selectedFile.name.endsWith('.jpeg') || !this.state.selectedFile.name.endsWith('.jpg')) {
		//   console.log(this.state.selectedFile, 'thisisselectedFile');
		//   return alert("Image format must be .jpg, .jpeg, or .png.");
		// }

		if (this.state.selectedFile.size >= 10000000 / 2) {
			return alert('Image file size must be below 5MB');
		}

		const data = new FormData();
		data.append('file', selectedFile);
		data.append('name', orgName);
		data.append('location', location);
		data.append('creator', creator);

		this.props.dispatch(createOrganisation(data));
		this.setState(initialState, () => handleCreateOrgModal());
	}

	handleCloseModal = () => {
		this.setState(initialState, () => handleCreateOrgModal());
	}


	render() {
		const { handleCreateOrgModal, isCreateOrgModalOpen } = this.props;

		return (
			<Dialog onClose={this.handleCloseModal} aria-labelledby="simple-dialog-title" open={isCreateOrgModalOpen}>
				<DialogTitle id="simple-dialog-title">Create Organisation</DialogTitle>
				<div className="landing-container">
					<form onSubmit={this.onClickHandler} encType="multipart/form-data" className="landing-form ">
						<div className='form-container'>
							<div className="fiv">
								<input className='input' type="text" value={this.state.orgName} onChange={this.changeValue} name="orgName" placeholder='org name' />
							</div>
							<div className="fiv">
								<input className='input' type="text" value={this.state.location} onChange={this.changeValue} name="location" placeholder='location' />
							</div>
							<div className="fiv">
								<label htmlFor="upload-image">
									<input
										accept="image/*"
										name="file"
										type="file"
										id="upload-image"
										style={{ display: 'none' }}
										onChange={this.onChangeHandler}
									/>
									<i className="fas fa-cloud-upload-alt"></i>
									Select Image
                </label>
							</div>
							<button type="submit" className="button bg-primary">Create</button>
						</div>
					</form>
				</div>
			</Dialog>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.token,
	}
}

export default connect(mapStateToProps)(CreateOrgModal);