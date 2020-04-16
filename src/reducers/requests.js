import { Helper } from '../services/helper';
import { ADD_REQUEST, REMOVE_REQUEST, UPDATE_REQUEST, SET_ACTIVE_REQUEST } from '../actions/index';

const initialState = {
	activeRequest: 0,
	requests: [
		Helper.createRequest({
			metadata: { title: 'Test 1' },
			context: {
				url: 'https://jsonplaceholder.typicode.com/users',
				method: 'get',
				headers: {
					'Content-Type': {
						value: 'application/json'
					}
				}
			}
		})
	]
};

const requests = (state = initialState, action) => {
	switch (action.type) {
		case ADD_REQUEST:
			return {
				...state,
				activeRequest: state.requests.length, // Set new request as active
				requests: [...state.requests, action.request]
			};
		case REMOVE_REQUEST:
			const requestID = parseInt(action.id, 10);
			return {
				...state,
				activeRequest:
					requestID < state.requests.length - 1 ? state.requests.length - 2 : requestID - 1,
				requests: state.requests.filter((request, id) => id !== requestID)
			};
		case UPDATE_REQUEST:
			const requests = [...state.requests];
			requests[action.id] = action.request;
			return {
				...state,
				requests
			};
		case SET_ACTIVE_REQUEST:
			return {
				...state,
				activeRequest: action.id
			};
		default:
			return state;
	}
};

export default requests;
