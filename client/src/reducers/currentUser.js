const initialState = {
  user: null,
  isAuthInProgress: true
}

function currentUser (state = initialState, action) {
  switch(action.type) {
    case 'ADD_CURRENT_USER':
      return {
        user: action.data,
        isAuthInProgress: false
      }
    case 'NO_TOKEN':
      return {
        user: null,
        isAuthInProgress: false
      }
    default:
      return state;
  }
}

export default currentUser;
