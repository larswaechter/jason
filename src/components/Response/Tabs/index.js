import React from 'react';

import { Tabs, Row, Col } from 'antd';
import { FormatPainterOutlined, IdcardOutlined } from '@ant-design/icons';

import ResponseTabsBody from './Body';
import ResponseTabsHeaders from './Headers';

const { TabPane } = Tabs;

const ResponseTabs = (props) => {
	const { response } = props;
	const { result } = response;

	const panes = [
		{
			title: (
				<span>
					<FormatPainterOutlined />
					Body
				</span>
			),
			content: <ResponseTabsBody result={result} />,
			key: 1
		},
		{
			title: (
				<span>
					<IdcardOutlined />
					Headers
				</span>
			),
			content: <ResponseTabsHeaders headers={result.headers} />,
			key: 2
		}
	];

	return (
		<div className="ResponseTabs">
			<Row>
				<Col span={24}>
					<Tabs defaultActiveKey="1">
						{panes.map((pane) => (
							<TabPane tab={pane.title} key={pane.key}>
								{pane.content}
							</TabPane>
						))}
					</Tabs>
				</Col>
			</Row>
		</div>
	);
};

export default ResponseTabs;
