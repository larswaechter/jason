import { Helper } from '../services/helper';

export const ADD_REQUEST = 'ADD_REQUEST';
export const REMOVE_REQUEST = 'REMOVE_REQUEST';
export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const SET_ACTIVE_REQUEST = 'SET_ACTIVE_REQUEST';

export const SAVE_REQUEST = 'SAVE_REQUEST';
export const UNSAVE_REQUEST = 'UNSAVE_REQUEST';

export const APPEND_HISTORY = 'APPEND_HISTORY';

// Request tabs

export const addRequest = (request = Helper.createRequest()) => ({
	type: ADD_REQUEST,
	request
});

export const removeRequest = (id) => ({
	type: REMOVE_REQUEST,
	id
});

export const updateRequest = (id, request) => ({
	type: UPDATE_REQUEST,
	id,
	request
});

export const setActiveRequest = (id) => ({
	type: SET_ACTIVE_REQUEST,
	id
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
