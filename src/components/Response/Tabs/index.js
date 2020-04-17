import React, { useState, useEffect } from 'react';

import { Tabs, Row, Col } from 'antd';
import { FormatPainterOutlined, IdcardOutlined } from '@ant-design/icons';

import ResponseTabsBody from './Body';
import ResponseTabsHeaders from './Headers';

const { TabPane } = Tabs;

const ResponseTabs = (props) => {
	const { response } = props;
	const { result, autoShow } = response;

	const [activeKey, setActiveKey] = useState(autoShow ? '1' : '0');

	useEffect(() => {
		setActiveKey(autoShow ? '1' : '0');
	}, [autoShow]);

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
					<Tabs activeKey={activeKey} onChange={setActiveKey}>
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
