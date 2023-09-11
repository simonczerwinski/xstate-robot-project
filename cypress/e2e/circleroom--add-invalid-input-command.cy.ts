describe('Add invalid input command and fail', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('Should interact with the Robot in the CircleRoom', () => {
		// Type commands into the input field
		cy.get('#commandInput-Circle').type('ADSCAWDA', { delay: 100 });

		// Press the submit command button
		cy.get('#commandSubmit-Circle').should('exist').click();

		// Delay the test for better visualisation
		cy.wait(300);

		// Wait for the robot to finish it´s commands/ animations then check the result it gets
		cy.get('#robotCircle').invoke('attr', 'data-x').should('equal', '0');
		cy.get('#robotCircle').invoke('attr', 'data-y').should('equal', '0');
		cy.get('#robotCircle')
			.invoke('attr', 'data-direction')
			.should('equal', 'N');
	});
});
