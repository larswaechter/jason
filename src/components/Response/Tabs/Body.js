import React from 'react';

import EditorsReader from '../../Editors/Reader';

const ResponseTabsBody = (props) => {
	const { result } = props;
	const { data, extension } = result;

	return (
		<div className="ResponseTabsBody">
			<EditorsReader code={data} extension={extension} />
		</div>
	);
};

export default ResponseTabsBody;
