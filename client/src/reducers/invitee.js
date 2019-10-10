const initialState = {
	teammateEmail: '',
	isInvited: false,
}

function invitee (state = initialState, action) {
	switch(action.type) {
		case 'VERIFY_INVITEE':
		 return {
			 teammateEmail: action.data.invitee.teammateEmail,
			 isInvited: true,
		 }
		default:
			return state;
	}
}

export default invitee;