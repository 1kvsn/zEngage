import { combineReducers } from 'redux';

import currentUser from './currentUser';
import organisations from './organisations';
import invitee from './invitee';

const rootReducer = combineReducers({ currentUser, organisations, invitee })

export default rootReducer;