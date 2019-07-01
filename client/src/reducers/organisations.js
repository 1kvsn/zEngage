const initialState = {
  list: [],
  details: null
}

function organisations (state = initialState, action) {
  switch(action.type) {
    case 'GET_ORGANISATIONS_LIST_SUCCESS':
      return {
        list: action.data.organisations,
      }
    default:
      return state;
  }
}

export default organisations;
