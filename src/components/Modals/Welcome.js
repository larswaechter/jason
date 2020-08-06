import React, { useState } from 'react';
import { Modal, Button } from 'antd';

import { setFirstVisit, isFirstVisit } from '../../utils/electron.api';

const ModalsWelcome = () => {
	const [showModal, setShowModal] = useState(isFirstVisit());

	const closeModal = () => {
		setShowModal(false);
		// setFirstVisit();
	};

	return (
		<div className="ModalsWelcome">
			<Modal
				title="Welcome to Jason!"
				visible={showModal}
				onCancel={closeModal}
				footer={
					<Button type="primary" onClick={closeModal}>
						Close
					</Button>
				}
			>
				<p>WIP</p>
			</Modal>
		</div>
	);
};

export default ModalsWelcome;
