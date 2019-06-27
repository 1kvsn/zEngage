import React from 'react'; 
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Nav extends React.Component {

  handleClick = (e) => {
    localStorage.clear();
    window.location = "/";
  }

  render () {
    const user = this.props.currentUser.user;

      return (
        <>
          { user ?
            <div>
              <ul className="navbar">
                <li className='navbar-start'>
                  <Link to="/" ><p className='logo-name'>altify</p></Link>
                </li>
                <li className='navbar-end'>
                  <p className='nav-username'>Hello! {user.name}</p>
                  <a className="log-out-button" onClick={this.handleClick}>
                    <i class="fas fa-sign-out-alt"></i>
                  </a>
                </li>
              </ul>
            </div>
          :
            <div>
              <ul className="navbar is-danger">
                <li className="navbar-item">
                  {/* <Link to="/users/login" className="button">Login</Link>
                  <Link to="/users/register" className="button bg-primary">Sign up</Link> */}
                </li>
              </ul>
            </div>
          }
        </>
      )
  }
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Nav);