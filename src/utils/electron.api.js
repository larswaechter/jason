import { REQUESTS } from '../constants/requests';

const remote = window.require('electron').remote.require('./remote');
const electronStore = window.require('electron').remote.getGlobal('electronStore');

/**
 * Reference to remote methods used for interactions between main and render process
 */
export const importRequest = remote.importRequest;
export const exportRequest = remote.exportRequest;

export const getRequestsHistory = () => {
	return electronStore.get(REQUESTS.HISTORY, []);
};

export const setRequestHistory = (history) => {
	electronStore.set(REQUESTS.HISTORY, history);
	return history;
};

export const appendRequestHistory = (request) => {
	const history = getRequestsHistory();
	if (history.length >= 10) {
		history.pop();
		history.unshift(request);
	} else {
		history.push(request);
	}

	return setRequestHistory(history);
};
