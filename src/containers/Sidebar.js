import { connect } from 'react-redux';

import Sidebar from '../components/Navigation/Sidebar';

import { addRequest } from '../constants/action-types';

const mapStateToProps = (state) => ({
	history: state.sidebar.history,
	savedRequests: state.sidebar.savedRequests
});

const mapDispatchToProps = (dispatch) => ({
	addRequest: (request) => dispatch(addRequest(request))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
