/**
 * store = {
 *  currentUser: {
 *    user: { _id, name, email, photo }
 *  },
 *  organisations: {
 *    list: []
 *  }
 * }
 * 
 */



/* 

const initState = {
  userId : localStorage.getItem('userId') || '',
  token: localStorage.getItem('token') || '',
  creatorId: localStorage.getItem('userId') || '',
  orgList: [],
  name: localStorage.getItem('name') || '',
};

export default function rootReducer(state = initState,action) {
  switch(action.type) {
    case "SIGNUP_SUCCESS": {
      return state;
    }
    case "LOGIN_SUCCESS": {
      // console.log(state, 'this is state', action, 'login success action');
      return {
        ...state,
        userId : action.data.userId,
        creatorId: action.data.userId,
        token: action.data.token,
        name: action.data.name,
      }
    }
    case "ORGANIZATIONS": {
      // console.log(state, action,'request coming in Reducer Organizations');
      return {
        ...state,
        orgList : action.payload.data.foundOrgs
      }
    }
    case "GET_ORGANIZATIONS": {
      // console.log(state, action,'request coming in Reducer Organizations');
      return {
        ...state,
        orgList : action.payload
      }
    }
    case "SAVE_POSTS": {
      return {
        ...state,
        posts: action.payload,
      }
    }
    // case "GET_USER_POSTS": {
    //   // console.log(state, action,'request coming in Reducer GET USER POSTS');
    //   return {
    //     ...state,
    //     userPosts: action.payload.userPosts,
    //   }
    // }
    // case "GET_ORG_ID": {
    //   return {
    //     ...state,
    //     orgId: action.payload._id
    //   }
    // }
    case "GET_ORG_FEED": {
      // console.log(state, 'this is state', action, 'this is action');
      return {
        ...state,
        orgFeed: action.payload.orgPosts,
        orgId: action.payload.orgId,
      }
    }
  default:
    return state;
  }
}

*/


import { combineReducers } from 'redux';

import currentUser from './currentUser';
import organisations from './organisations';
import invitee from './invitee';

const rootReducer = combineReducers({ currentUser, organisations, invitee })

export default rootReducer;