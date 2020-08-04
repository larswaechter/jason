import { connect } from 'react-redux';

import {
	addRequest,
	setActiveRequest,
	removeRequest,
	updateRequest
} from '../constants/action-types';
import Requests from '../components/Requests';

const mapStateToProps = (state) => ({
	activeRequest: state.requests.activeRequest,
	requests: state.requests.requests
});

const mapDispatchToProps = (dispatch) => ({
	addRequest: (request) => dispatch(addRequest(request)),
	removeRequest: (uuid) => dispatch(removeRequest(uuid)),
	updateRequest: (uuid, request) => dispatch(updateRequest(uuid, request)),
	setActiveRequest: (uuid) => dispatch(setActiveRequest(uuid))
});

export default connect(mapStateToProps, mapDispatchToProps)(Requests);
