import React from 'react';

import Nav from './Nav';
import Footer from './Footer';
import CreateOrgModal from './CreateOrgModal';
import OrganizationList from './OrganizationList';

export default function Dashboard() {
	
	const [isCreateOrgModalOpen, setIsCreateOrgModalOpen] = React.useState(false);

	const handleCreateOrgModal = () => {
		setIsCreateOrgModalOpen(!isCreateOrgModalOpen);
	}

	return (
		<React.Fragment>
			<Nav />
			<button onClick={handleCreateOrgModal}>+</button>

			{
				isCreateOrgModalOpen && (
					<CreateOrgModal 
						handleCreateOrgModal={handleCreateOrgModal} 
						isCreateOrgModalOpen={isCreateOrgModalOpen}
					/>
				)
			}

			<OrganizationList />
			<Footer />
		</React.Fragment>
	)
}