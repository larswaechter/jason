import React from 'react';

import AceEditor from 'react-ace';

import { Helper } from 'services/helper';

// Ace-Editor configs
import 'ace-builds/src-noconflict/theme-github';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-xml';

const EditorsReader = (props) => {
	const { code, language } = props;

	return (
		<div className="EditorsReader">
			<AceEditor
				mode={language}
				theme="github"
				placeholder="Body"
				readOnly={true}
				fontSize={14}
				highlightActiveLine={true}
				value={Helper.prettyPrint(code, language)}
				height="600px"
				width="100%"
				setOptions={{
					tabSize: 2
				}}
			/>
		</div>
	);
};

EditorsReader.defaultProps = {
	code: '',
	language: ''
};

export default EditorsReader;
