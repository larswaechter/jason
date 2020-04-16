import React from 'react';

import { Tabs } from 'antd';
import { LinkOutlined, IdcardOutlined, FormatPainterOutlined } from '@ant-design/icons';

import RequestTabsParameters from './Parameters';
import RequestTabsHeaders from './Headers';
import RequestTabsBody from './Body';

const { TabPane } = Tabs;

const RequestTabs = (props) => {
	const { context, updateRequestContext } = props;

	const panes = [
		{
			title: (
				<span>
					<LinkOutlined />
					Parameters
				</span>
			),
			content: (
				<RequestTabsParameters context={context} updateRequestContext={updateRequestContext} />
			),
			key: 1
		},
		{
			title: (
				<span>
					<IdcardOutlined />
					Headers
				</span>
			),
			content: <RequestTabsHeaders context={context} updateRequestContext={updateRequestContext} />,
			key: 2
		},
		{
			title: (
				<span>
					<FormatPainterOutlined />
					Body
				</span>
			),
			content: <RequestTabsBody context={context} updateRequestContext={updateRequestContext} />,
			key: 3
		}
	];

	return (
		<div className="RequestTabs">
			<Tabs defaultActiveKey="1">
				{panes.map((pane) => (
					<TabPane tab={pane.title} key={pane.key}>
						{pane.content}
					</TabPane>
				))}
			</Tabs>
		</div>
	);
};

export default RequestTabs;
