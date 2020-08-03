import React, { useState } from 'react';

import { Radio } from 'antd';
import EditorsWriter from 'components/Editors/Writer';

const RequestTabsBody = (props) => {
	const { context, updateRequestContext } = props;

	const [type, setType] = useState('empty');

	const handleRadioChange = (e) => {
		setType(e.target.value);
		updateRequestContext('data', { ...context.data, type: e.target.value });
	};

	const handleEditorChange = (value) => {
		updateRequestContext('data', { ...context.data, value });
	};

	return (
		<div className="RequestTabsBody">
			<Radio.Group
				value={type}
				onChange={handleRadioChange}
				style={{ marginBottom: type !== 'empty' ? 12 : 0 }}
			>
				<Radio value="empty">Empty</Radio>
				<Radio value="form">Form</Radio>
				<Radio value="json">JSON</Radio>
				<Radio value="plain">Plain</Radio>
			</Radio.Group>
			{type !== 'empty' ? <EditorsWriter language={type} onChange={handleEditorChange} /> : null}
		</div>
	);
};

export default RequestTabsBody;
