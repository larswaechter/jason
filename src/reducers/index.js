import { combineReducers } from 'redux';

import requests from './requests';
import sidebar from './sidebar';

export default combineReducers({
	requests,
	sidebar
});
