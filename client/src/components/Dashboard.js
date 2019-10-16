import React from 'react';

import Nav from './Nav';
import Footer from './Footer';
import CreateOrgModal from './CreateOrgModal';
import OrganizationList from './OrganizationList';

import Button from '@material-ui/core/Button';

export default function Dashboard() {
	
	const [isCreateOrgModalOpen, setIsCreateOrgModalOpen] = React.useState(false);

	const handleCreateOrgModal = () => {
		setIsCreateOrgModalOpen(!isCreateOrgModalOpen);
	}

	return (
		<React.Fragment>
			<Nav />
			<Button 
				onClick={handleCreateOrgModal}
				style={{
					padding: '10px',
					margin: '20px',
					fontSize: '16px',
					textTransform: 'capitalize',
					backgroundColor: '#e6ecf0',
					border: '1px solid'
				}}
			>Create Organisation
			</Button>

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