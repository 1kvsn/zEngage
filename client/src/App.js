import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';
import { connect } from 'react-redux';

import './App.scss';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import OrgDetails from './components/OrgDetails';
import Landing from './components/Landing';
import Posts from './components/Posts';
import Footer from './components/Footer';
import OrgFeed from './components/OrgFeed';
import PrivateRoute from './components/PrivateRoute';
import { identifyViaToken } from './actions/Action';
// import Organization from './components/Organization';
// import Teammate from './components/Teammate';

class App extends Component {
  
  componentDidMount() {
    const token = localStorage.token || '';
    
    if(token) {
      this.props.dispatch(identifyViaToken(token));
    } else {
      this.props.dispatch({ type: 'NO_TOKEN' });
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Landing}/> 
            <Route exact path="/users/register" component={Register} />
            <Route path="/users/login" component={Login} />
            {/* <Route exact path="/users/org/invite" component={Teammate}/> */}
            <PrivateRoute exact path="/users/org/:id" component={OrgDetails}/>
            <PrivateRoute exact path="/landing" component={Landing}/>
            <PrivateRoute exact path="/posts" component={Posts}/>
            <PrivateRoute path="/users/org/:id/posts" component={OrgFeed} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(App);
