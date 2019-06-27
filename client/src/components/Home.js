import React from 'react';
import { Link } from 'react-router-dom';

import Nav from '../components/Nav';
import Footer from './Footer';

function Home() {
  return(
    <>
      <div className='columns is-vcentered home-bg-split-right'>
        <div className="column parent home-bg-split-left">
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

        <div className="column parent ">
          <div className='is-half child '>
            <p className='has-text-weight-semibold home-text-right'>See what's happenning in your organization right now</p>
            <p className='has-text-weight-bold home-text-right join'>Join Altify today.</p>
            <Link to="/users/login" className="button">Login</Link>
            <Link to="/users/register" className="button bg-primary">Sign up</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home;