import React from 'react';

import AceEditor from 'react-ace';

import HelperService from '../../services/helper';

// Ace-Editor configs
import 'ace-builds/src-noconflict/theme-github';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-xml';

const EditorsReader = (props) => {
	const { code, extension } = props;

	return (
		<div className="EditorsReader">
			<AceEditor
				mode={extension}
				theme="github"
				placeholder="Body"
				readOnly={true}
				fontSize={14}
				highlightActiveLine={true}
				value={HelperService.prettyPrint(code, extension)}
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
