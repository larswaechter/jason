import { v4 as uuid } from 'uuid';

import { REQUESTS } from '../constants/requests';
import { SETTINGS } from '../constants/settings';

import RequestService from '../services/request';

const remote = window.require('electron').remote.require('./remote');
const electronStore = window.require('electron').remote.getGlobal('electronStore');

// Reference to remote methods used for interactions between main and render process
export const { sendRequest, importRequest, exportRequest, exportResponseBody } = remote;

/**
 * Check for first visit
 * Used to show welcome-modal
 *
 * @returns {boolean} is first visit
 */
export const isFirstVisit = () => electronStore.get(SETTINGS.FIST_VISIT, true);

/**
 * Set first visit to false
 */
export const setFirstVisit = () => {
	electronStore.set(SETTINGS.FIST_VISIT, false);
};

/**
 * Get saved requests from electron store
 *
 * @returns {array} Saved requests
 */
export const getSavedRequests = () => {
	return electronStore.get(REQUESTS.SAVED, []);
};

/**
 * Set saved requests to electron store
 *
 * @param {array} requests - requests to save
 * @returns {array} Saved requests
 */
export const setSavedRequests = (requests) => {
	electronStore.set(REQUESTS.SAVED, requests);
	return requests;
};

/**
 * Add saved request to electron store
 *
 * @param {Object} request - request to save
 * @returns {array} Saved requests
 */
export const addSavedRequest = (request) => {
	const requests = getSavedRequests();
	const requestIdx = requests.findIndex(
		(_request) => _request.metadata.uuid === request.metadata.uuid
	);

	// Use empty response
	const newRequest = {
		...request,
		response: RequestService.createEmptyResponse()
	};

	// Update if already exists
	if (requestIdx >= 0) {
		requests[requestIdx] = newRequest;
		return setSavedRequests(requests);
	}

	// Prepend request
	requests.unshift(newRequest);

	return setSavedRequests(requests);
};

/**
 * Check if request is saved
 *
 * @param {string} uuid - UUID of the request
 * @returns {boolean} If request is saved
 */
export const isSavedRequest = (uuid) => {
	return getSavedRequests().find((request) => request.metadata.uuid === uuid);
};

/**
 * Remove saved request from electron store
 *
 * @param {string} uuid - UUID of the request
 * @returns {array} Saved requests
 */
export const removeSavedRequest = (uuid) => {
	const savedRequests = getSavedRequests().filter((request) => request.metadata.uuid !== uuid);
	return setSavedRequests(savedRequests);
};

/**
 * Get requests history from electron store
 *
 * @returns {array} Request history
 */
export const getRequestsHistory = () => {
	return electronStore.get(REQUESTS.HISTORY, []);
};

/**
 * Save requests history to electron store
 *
 * @param {array} history history to save
 * @returns {array} Requests history
 */
export const setRequestHistory = (history) => {
	electronStore.set(REQUESTS.HISTORY, history);
	return history;
};

/**
 * Append request to requests history in electron store
 *
 * @param {Object} request - request to append
 * @returns {array} Requests history
 */
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
