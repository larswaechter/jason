import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';

import { HeartFilled } from '@ant-design/icons';

const ModalsSave = (props) => {
	const { handleSave, title } = props;
	const [showModal, setShowModal] = useState(false);
	const [updatedTitle, setUpdatedTitle] = useState(title);

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	const onSave = () => {
		if (updatedTitle.length) {
			setShowModal(false);
			handleSave(updatedTitle);
		}
	};

	const handleChange = (e) => {
		setUpdatedTitle(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave();
	};

	return (
		<div className="ModalsSave">
			<Button type="default" icon={<HeartFilled />} onClick={toggleModal}>
				Save
			</Button>
			<Modal
				title="Save request"
				visible={showModal}
				onCancel={toggleModal}
				footer={[
					<Button key="back" onClick={toggleModal}>
						Cancel
					</Button>,
					<Button key="save" type="primary" onClick={onSave}>
						Save
					</Button>
				]}
			>
				<form onSubmit={handleSubmit}>
					<Input placeholder="Enter request title" value={updatedTitle} onChange={handleChange} />
				</form>
			</Modal>
		</div>
	);
};

export default ModalsSave;
