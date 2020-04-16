import { APPEND_HISTORY } from '../actions/index';

import { getRequestsHistory, appendRequestHistory } from '../utils/electron.api';

const initialState = {
	history: getRequestsHistory(),
	savedRequests: []
};

const sidebar = (state = initialState, action) => {
	switch (action.type) {
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
