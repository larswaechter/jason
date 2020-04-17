import { SAVE_REQUEST, APPEND_HISTORY, UNSAVE_REQUEST } from '../constants/action-types';

import {
	getRequestsHistory,
	appendRequestHistory,
	getSavedRequests,
	addSavedRequest,
	removeSavedRequest
} from '../utils/electron.api';

const initialState = {
	savedRequests: getSavedRequests(),
	history: getRequestsHistory()
};

const sidebar = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_REQUEST:
			return {
				...state,
				savedRequests: [...addSavedRequest(action.request)]
			};

		case UNSAVE_REQUEST:
			return {
				...state,
				savedRequests: [...removeSavedRequest(action.uuid)]
			};

		case APPEND_HISTORY:
			return {
				...state,
				history: [...appendRequestHistory(action.request)]
			};
		default:
			return state;
	}
};

export default sidebar;
