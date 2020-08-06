import React, { useState } from 'react';
import { Modal, Button, Typography, Collapse } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Panel } = Collapse;

const ModalsHelp = () => {
	const [showModal, setShowModal] = useState(false);

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	const faqs = [
		{
			question: 'Where are the exported files saved to?',
			answer: "Exported files are saved to your system's 'Downloads' directory"
		}
	];

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
				<Title level={4}>Shortcuts</Title>

				<Title level={4}>FAQ</Title>
				<Collapse accordion>
					{faqs.map((faq, i) => (
						<Panel header={faq.question} key={i}>
							<p style={{ margin: 0 }}>{faq.answer}</p>
						</Panel>
					))}
				</Collapse>
			</Modal>
		</div>
	);
};

export default ModalsHelp;
