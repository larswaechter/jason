import React from 'react';

import EditorsReader from '../../Editors/Reader';

class ResponseTabsBody extends React.Component {
	constructor(props) {
		super(props);

		const { result } = props;
		const { data, headers } = result;

		const [mime, encoding] = headers['content-type'].split(';');

		let contentType = '';

		switch (mime) {
			case 'application/json':
				contentType = 'json';
				break;

			case 'text/html':
				contentType = 'html';
				break;

			default:
				break;
		}

		this.state = {
			contentType: contentType,
			content: data
		};
	}

	render() {
		const { contentType, content } = this.state;
		let output = null;

		switch (contentType) {
			case 'json':
				output = <EditorsReader code={content} language="json" />;
				break;

			case 'html':
				output = <EditorsReader code={content} language="html" />;
				break;

			default:
				break;
		}

		return <div className="ResponseTabsBody">{output}</div>;
	}
}

export default ResponseTabsBody;
