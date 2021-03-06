import React, { useState } from 'react';
import { Layout } from 'antd';

import './App.scss';

import Requests from './containers/Requests';
import NavigationSidebar from './containers/Sidebar';
import NavigationHeader from 'components/Navigation/Header';
import ModalsWelcome from 'components/Modals/Welcome';

const { Content } = Layout;

const App = () => {
	const [margin, setMargin] = useState(200);

	const handleToggle = (isToggled) => {
		if (isToggled) setMargin(80);
		else setMargin(200);
	};

	return (
		<div className="App">
			<Layout style={{ minHeight: '100vh' }}>
				<NavigationSidebar handleSidebarToggle={handleToggle} />
				<Layout style={{ marginLeft: margin, transition: 'all 0.2s' }}>
					<Content style={{ background: 'white' }}>
						<NavigationHeader />
						<ModalsWelcome />
						<div className="site-layout-content">
							<Requests />
						</div>
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default App;
