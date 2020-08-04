import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, message } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

import { isSavedRequest } from '../../../utils/electron.api';
import { saveRequest, unsaveRequest } from '../../../constants/action-types';

import ModalsSave from '../../Modals/Save';

const RequestActionsSave = (props) => {
	const { dispatch, request, updateMetadata } = props;
	const { metadata } = request;
	const { uuid, title } = metadata;

	const [isSaved, setIsSaved] = useState(isSavedRequest(uuid));

	const handleSave = (title) => {
		setIsSaved(true);
		dispatch(
			saveRequest({
				...request,
				metadata: {
					...request.metadata,
					saved: true,
					title
				}
			})
		);

		// TODO: Merge to 1 function call
		updateMetadata('title', title, false);
		updateMetadata('saved', true, false);

		message.info('Request saved!');
	};

	const handleSaveChanges = () => {
		setIsSaved(true);
		dispatch(saveRequest(request));
		updateMetadata('unsavedChanges', false, false);
		message.info('Saved changes!');
	};

	const handleUnsave = () => {
		setIsSaved(false);
		dispatch(unsaveRequest(uuid));
		updateMetadata('unsavedChanges', false, false);
		message.info('Request unsaved!');
	};

	if (isSaved) {
		return (
			<div>
				<Button type="default" icon={<HeartOutlined />} onClick={handleUnsave}>
					Unsave
				</Button>
				{metadata.saved && metadata.unsavedChanges ? (
					<Button type="link" onClick={handleSaveChanges}>
						Save changes
					</Button>
				) : null}
			</div>
		);
	}

	return <ModalsSave handleSave={handleSave} title={title} />;
};

export default connect()(RequestActionsSave);
