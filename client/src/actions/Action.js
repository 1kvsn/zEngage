import axios from 'axios';

const API = "http://localhost:8000/api/v1";
const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId')

 
export function registerAction(data) {
  return (dispatch) => {
    fetch(`${API}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(data => {
			dispatch({
      type : "SIGNUP_SUCCESS",
      data
		})
	});
  }
}

export function inviteeRegisterAction(ref) {
	return (dispatch) => new Promise((resolve, reject) => {
		fetch(`${API}/users/register/verify/${ref}`)
		.then(res => res.json())
		.then(data => {
			dispatch({
				type: "VERIFY_INVITEE",
				data
			})
			resolve(data);
		})
	})
}

export function loginAction(data, check) {
  return (dispatch) => {
    fetch(`${API}/users/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(data => {
			localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('creatorId', data.userId);
			localStorage.setItem('name', data.name);
			
			dispatch({
				type: "LOGIN_SUCCESS",
				data
			})
			check();
		});
	}
}

export function getOrganisationsList() {
	// console.log("called in action getOrgList");
	return (dispatch) => {
		fetch(`${API}/users/organisations`, {
      method: "GET",
      headers: {
				'Authorization': "bearer " + token,
			}})
		.then(res => res.json())
		.then(data =>	{
			// console.log(data, 'THIS IS GET_ORGANISATIONS_LIST_SUCCESS');
			dispatch({
				type: "GET_ORGANISATIONS_LIST_SUCCESS",
				data
			});
		});
	}
}

export function savePostsAction(data) {
	return dispatch => {
		fetch(`${API}/users/posts`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': "bearer " + token,
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(data => {
			dispatch({
				type: "SAVE_POSTS",
				payload: data
			})
		})
	}
}

// export function getUserPosts() {
// 	return dispatch => {
// 		// console.log('this is before fetch user posts');
// 		fetch(`http://localhost:8000/api/v1/users/${userId}/posts`)
// 		.then(res => res.json())
// 		.then(data => {
// 			// console.log(data, 'thisdispatched in getUserPosts');
// 			dispatch({
// 				type: "GET_USER_POSTS",
// 				payload: data
// 			})
// 		})
// 	}
// }

//get all Posts from an Organization
export function getOrgFeed(orgId) {
	return (dispatch) => {
		fetch(`http://localhost:8000/api/v1/users/org/${orgId}/posts`, {
      method: "GET",
      headers: {
				token: token,
				userId: userId,
			}})
		.then(res => res.json())
		.then(data => {
			console.log('This is getOrgFEED from reducer', data);
			dispatch({
				type: "GET_ORGANISATION_FEED",
				payload: data
			})
		})
	}
}

export function identifyViaToken(token) {
	return (dispatch) => {
		fetch(`${API}/check/token`, {
      method: "GET",
      headers: {
				Authorization: `Bearer ${token}`
			}})
		.then(res => res.json())
		.then(data => {
			dispatch({
				type: "ADD_CURRENT_USER",
				data: data.user
			})
		})
	}
}

export function createOrganisation(data) {
	return (dispatch) => {
		axios.post("http://localhost:8000/api/v1/users/organisations", data, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': "bearer " + localStorage.token
			}
		}).then(data => {
			dispatch({
				type: 'GET_ORGANISATIONS_LIST_SUCCESS',
				data: data.data
			})
		});
	}
}