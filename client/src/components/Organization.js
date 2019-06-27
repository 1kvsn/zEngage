import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import OrganizationList from './OrganizationList';
import { getOrganisationsList, createOrganisation } from '../actions/Action';

const initialState = {
  selectedFile: null,
  orgName: '',
  location: ''
}

 class Organization extends Component {

  constructor(props) {
    super(props);
    this.state = initialState
  }
  
  componentDidMount = () => {
    this.props.dispatch(getOrganisationsList());
  }

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
    e.preventDefault();
    
    if(!this.state.selectedFile || !this.state.orgName || !this.state.location) {
      return alert('File, Name and Location are must.');
    }

    const data = new FormData();
    data.append('file', this.state.selectedFile);
    data.append('name', this.state.orgName);
    data.append('location',this.state.location);
    data.append('creator',this.state.creator);

    this.props.dispatch(createOrganisation(data));

    this.setState({
      selectedFile: null,
      orgName: '',
      location: ''
    });
  }

  render() {
    return (
    <>
      <div className="landing-container">
        <form onSubmit={this.onClickHandler} encType="multipart/form-data" className="landing-form ">
          <div className='form-container'>
            <div className="fiv">
              <label className='label'>Create Organization</label>
                <input className='input' type="text" value={this.state.orgName} onChange={this.changeValue} name="orgName" placeholder='org name'/>
            </div>
            <div className="fiv">
              {/* <label className='label'>location</label> */}
                <input className='input' type="text" value={this.state.location} onChange={this.changeValue} name="location" placeholder='location' />
            </div>
            <div className="fiv">
              <label className='label'>upload image</label>
              <input className='input' name="file" onChange={this.onChangeHandler}  type="file"/>
            </div>
            {
              this.state.orgName && this.state.location && this.state.selectedFile ? 
                <button type="submit" className="button bg-primary">Create</button>
                : 
                null
            }
          </div>
        </form>
        <div className='organization-list'>
          <OrganizationList/>
        </div>
      </div>
    </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
  }
}

export default connect(mapStateToProps)(Organization);