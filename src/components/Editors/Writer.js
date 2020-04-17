import React, { useState } from 'react';

import AceEditor from 'react-ace';

// Ace-Editor configs
import 'ace-builds/src-noconflict/theme-github';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-xml';

import HelperService from '../../services/helper';

const EditorsWriter = (props) => {
	const { code, language, onChange } = props;

	const [content, setContent] = useState(HelperService.prettyPrint(code, language));

	const placeholder = language === 'form' ? 'name=value\nname2=value2' : 'Body';

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
