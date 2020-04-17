import { v4 as uuid } from 'uuid';

import { REQUESTS } from '../constants/requests';

import RequestService from '../services/request';

const remote = window.require('electron').remote.require('./remote');
const electronStore = window.require('electron').remote.getGlobal('electronStore');

/**
 * Reference to remote methods used for interactions between main and render process
 */
export const importRequest = remote.importRequest;
export const exportRequest = remote.exportRequest;

// Saved requests
export const getSavedRequests = () => {
	return electronStore.get(REQUESTS.SAVED, []);
};

export const setSavedRequests = (requests) => {
	electronStore.set(REQUESTS.SAVED, requests);
	return requests;
};

export const addSavedRequest = (request) => {
	const requests = getSavedRequests();
	const requestIdx = requests.findIndex(
		(_request) => _request.metadata.uuid === request.metadata.uuid
	);

	// Store empty response
	const newRequest = {
		...request,
		response: RequestService.createEmptyResponse()
	};

	// Update if already exists
	if (requestIdx >= 0) {
		requests[requestIdx] = newRequest;
		return setSavedRequests(requests);
	}

	requests.unshift(newRequest);

	return setSavedRequests(requests);
};

export const isSavedRequest = (uuid) => {
	return getSavedRequests().find((request) => request.metadata.uuid === uuid);
};

export const removeSavedRequest = (uuid) => {
	const savedRequests = getSavedRequests().filter((request) => request.metadata.uuid !== uuid);
	return setSavedRequests(savedRequests);
};

// Request history
export const getRequestsHistory = () => {
	return electronStore.get(REQUESTS.HISTORY, []);
};

export const setRequestHistory = (history) => {
	electronStore.set(REQUESTS.HISTORY, history);
	return history;
};

export const appendRequestHistory = (request) => {
	const history = getRequestsHistory();

	// Store with new uuid
	const newRequest = {
		...request,
		metadata: {
			...request.metadata,
			uuid: uuid()
		}
	};

	if (history.length >= 10) {
		history.pop();
		history.unshift(newRequest);
	} else {
		history.unshift(newRequest);
	}

	return setRequestHistory(history);
};
