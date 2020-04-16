import { connect } from 'react-redux';

import Sidebar from '../components/Navigation/Sidebar';

import { addRequest } from '../actions/';

const mapStateToProps = (state) => ({
	history: state.sidebar.history
});

const mapDispatchToProps = (dispatch) => ({
	addRequest: (request) => dispatch(addRequest(request))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
