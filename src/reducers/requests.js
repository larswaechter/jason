import { v4 as uuid } from 'uuid';

import RequestService from '../services/request';
import {
	ADD_REQUEST,
	REMOVE_REQUEST,
	UPDATE_REQUEST,
	SET_ACTIVE_REQUEST
} from '../constants/action-types';

const initialID = uuid();

const initialState = {
	activeRequest: initialID,
	requests: [
		RequestService.createRequest({
			metadata: { uuid: initialID, title: 'Test 1' },
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
			const requestIdx = state.requests.findIndex(
				(request) => request.metadata.uuid === action.request.metadata.uuid
			);

			// If request is already existing, set as active
			if (requestIdx >= 0) {
				return {
					...state,
					activeRequest: state.requests[requestIdx].metadata.uuid
				};
			}

			return {
				...state,
				activeRequest: action.request.metadata.uuid, // Set new request as active
				requests: [...state.requests, action.request]
			};

		case REMOVE_REQUEST:
			const requestID = action.id;

			const requestIdxActive = state.requests.findIndex(
				(request) => request.metadata.uuid === state.activeRequest
			);

			const requestIdxToRemove = state.requests.findIndex(
				(request) => request.metadata.uuid === requestID
			);

			// Requests without removed element
			const requestsFiltered = state.requests.filter(
				(request) => request.metadata.uuid !== requestID
			);

			if (requestIdxActive === requestIdxToRemove) {
				if (requestIdxToRemove < requestsFiltered.length) {
					return {
						...state,
						activeRequest:
							requestsFiltered.length > 0
								? state.requests[requestIdxToRemove + 1].metadata.uuid
								: 0,
						requests: requestsFiltered
					};
				}

				return {
					...state,
					activeRequest:
						requestsFiltered.length > 0 ? state.requests[requestIdxToRemove - 1].metadata.uuid : 0,
					requests: requestsFiltered
				};
			}

			return {
				...state,
				requests: requestsFiltered
			};

		case UPDATE_REQUEST:
			const requests = [...state.requests];

			const requestIdxToUpdate = state.requests.findIndex(
				(request) => request.metadata.uuid === action.id
			);

			requests[requestIdxToUpdate] = action.request;

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
