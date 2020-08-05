import React, { useState } from 'react';
import { Modal } from 'antd';

import { setFirstVisit, isFirstVisit } from '../../utils/electron.api';

const ModalsWelcome = () => {
	const [showModal, setShowModal] = useState(isFirstVisit());

	const closeModal = () => {
		setShowModal(false);
		// setFirstVisit();
	};

	return (
		<div className="ModalsWelcome">
			<Modal title="Welcome to Jason!" visible={showModal} onCancel={closeModal} footer={null}>
				<p>WIP</p>
			</Modal>
		</div>
	);
};

export default ModalsWelcome;
