import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, message } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

import { isSavedRequest, removeSavedRequest } from '../../../utils/electron.api';

import { saveRequest, unsaveRequest } from '../../../constants/action-types';

const RequestActionsSave = (props) => {
	const { dispatch, request } = props;
	const { metadata } = request;
	const { uuid } = metadata;

	const [isSaved, setIsSaved] = useState(isSavedRequest(uuid));

	const handleSave = () => {
		setIsSaved(true);
		dispatch(saveRequest(request));
		// ipcRenderer.send('save-request', { request });
	};

	const handleUnsave = () => {
		setIsSaved(false);
		dispatch(unsaveRequest(uuid));
	};

	if (isSaved) {
		return (
			<Button type="default" icon={<HeartOutlined />} onClick={handleUnsave}>
				Unsave
			</Button>
		);
	}

	return (
		<Button type="default" icon={<HeartFilled />} onClick={handleSave}>
			Save
		</Button>
	);
};

export default connect()(RequestActionsSave);
