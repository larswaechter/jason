import React from 'react';
import { Layout, PageHeader } from 'antd';

import ModalsHelp from 'components/Modals/Help';

const { Header } = Layout;

const NavigationHeader = () => {
	return (
		<div className="NavigationHeader">
			<Header className="" style={{ padding: 0, background: '#fff' }}>
				<PageHeader
					className="site-page-header"
					onBack={() => null}
					title="Jason"
					subTitle="Hit your JSON APIs with ease"
					backIcon={false}
					extra={[<ModalsHelp key="help" />]}
				/>
			</Header>
		</div>
	);
};

export default NavigationHeader;
