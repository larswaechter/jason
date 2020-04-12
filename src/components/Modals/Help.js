import React, { useState } from 'react';
import { Modal, Button } from 'antd';

import { QuestionCircleOutlined } from '@ant-design/icons';

const ModalsHelp = () => {
	const [showModal, setShowModal] = useState(false);

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	return (
		<div className="ModalsHelp">
			<QuestionCircleOutlined onClick={toggleModal} />
			<Modal
				title="Help"
				visible={showModal}
				onCancel={toggleModal}
				footer={
					<Button type="primary" onClick={toggleModal}>
						Close
					</Button>
				}
			>
				<p>Shortcuts ...</p>
			</Modal>
		</div>
	);
};

export default ModalsHelp;
