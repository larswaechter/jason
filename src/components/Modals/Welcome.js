import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const ModalsWelcome = () => {
	// TODO: Set true
	const [showModal, setShowModal] = useState(false);

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<div className="ModalsWelcome">
			<Modal title="Welcome to Jason!" visible={showModal} onCancel={closeModal} footer={null}>
				<p>Shortcuts ...</p>
			</Modal>
		</div>
	);
};

export default ModalsWelcome;
