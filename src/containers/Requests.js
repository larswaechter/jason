import { connect } from 'react-redux';

import { addRequest, setActiveRequest, removeRequest, updateRequest } from '../actions/';
import Requests from '../components/Requests';

const mapStateToProps = (state) => ({
	activeRequest: state.requests.activeRequest,
	requests: state.requests.requests
});

const mapDispatchToProps = (dispatch) => ({
	addRequest: (request) => dispatch(addRequest(request)),
	removeRequest: (id) => dispatch(removeRequest(id)),
	updateRequest: (id, request) => dispatch(updateRequest(id, request)),
	setActiveRequest: (id) => dispatch(setActiveRequest(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Requests);
