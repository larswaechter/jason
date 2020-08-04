import RequestService from '../services/request';

export const ADD_REQUEST = 'ADD_REQUEST';
export const REMOVE_REQUEST = 'REMOVE_REQUEST';
export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const SET_ACTIVE_REQUEST = 'SET_ACTIVE_REQUEST';

export const SAVE_REQUEST = 'SAVE_REQUEST';
export const UNSAVE_REQUEST = 'UNSAVE_REQUEST';

export const APPEND_HISTORY = 'APPEND_HISTORY';

// Request tabs

export const addRequest = (request = RequestService.createRequest()) => ({
	type: ADD_REQUEST,
	request
});

export const removeRequest = (uuid) => ({
	type: REMOVE_REQUEST,
	uuid
});

export const updateRequest = (uuid, request) => ({
	type: UPDATE_REQUEST,
	uuid,
	request
});

export const setActiveRequest = (uuid) => ({
	type: SET_ACTIVE_REQUEST,
	uuid
});

// Saved requests and history

export const saveRequest = (request) => ({
	type: SAVE_REQUEST,
	request
});

export const unsaveRequest = (uuid) => ({
	type: UNSAVE_REQUEST,
	uuid
});

export const appendHistory = (request) => ({
	type: APPEND_HISTORY,
	request
});
