import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class OrganizationList extends Component {
  constructor() {
    super(); 
  }

  render() {
    const { organisations } = this.props;
    const orgList = organisations.list;

    return (  
      <>
        <div className='org-list-container'>
          <h3>Organizations</h3>
          {
            !orgList.length ? <p>There are no organizations to show.</p> : null
          }
          {
            orgList && orgList.map((elm, i) => {
              return (
                <div className='icard' key={i}>
                  <div className='icard-image flex'>
                    <i className="fas fa-users"></i>
                    <div className='icard-content'>
                      <Link to={`/users/org/${elm._id}`}>
                        <div>{elm.name}</div>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    organisations: state.organisations
  }
}

export default connect(mapStateToProps)(OrganizationList);