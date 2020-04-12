import React, { useState } from 'react';

import AceEditor from 'react-ace';

// Ace-Editor configs
import 'ace-builds/src-noconflict/theme-github';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-xml';

import { Helper } from 'services/helper';

const EditorsWriter = (props) => {
	const { code, language, onChange } = props;

	const [content, setContent] = useState(Helper.prettyPrint(code, language));

	const placeholder = language === 'form' ? 'key=value' : 'Body';

	return (
		<div className="EditorsWriter">
			<AceEditor
				mode={language}
				theme="github"
				placeholder={placeholder}
				onChange={setContent}
				onBlur={() => {
					onChange(content);
				}}
				fontSize={14}
				highlightActiveLine={true}
				value={content}
				height="250px"
				width="100%"
				setOptions={{
					tabSize: 2
				}}
			/>
		</div>
	);
};

EditorsWriter.defaultProps = {
	language: ''
};

export default EditorsWriter;
