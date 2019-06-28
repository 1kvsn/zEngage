import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';
import { connect } from 'react-redux';

import './App.scss';
import Login from './components/Login';
import Posts from './components/Posts';
import OrgFeed from './components/OrgFeed';
import Landing from './components/Landing';
import Register from './components/Register';
import OrgDetails from './components/OrgDetails';
import PrivateRoute from './components/PrivateRoute';
import { identifyViaToken } from './actions/Action';

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
            <Route path="/users/login" component={Login}/>
            <Route exact path="/users/register" component={Register}/>
            <PrivateRoute exact path="/posts" component={Posts}/>
            <PrivateRoute exact path="/landing" component={Landing}/>
            <PrivateRoute path="/users/org/:id/posts" component={OrgFeed}/>
            <PrivateRoute exact path="/users/org/:id" component={OrgDetails}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(App);
