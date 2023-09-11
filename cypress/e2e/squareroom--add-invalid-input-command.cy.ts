describe('Add invalid input command and fail', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('should interact with the Robot in the SquareRoom', () => {
		// Type commands into the input field
		cy.get('#commandInput-Square').type('BBBTTTWWS', { delay: 100 });
		// Press the submit command button
		cy.get('#commandSubmit-Square').should('exist').click();

		// Delay the test for better visualisation
		cy.wait(300);

		// Wait for the robot to finish it´s commands/ animations then check the result it gets
		cy.get('#robotSquare').invoke('attr', 'data-x').should('equal', '1');
		cy.get('#robotSquare').invoke('attr', 'data-y').should('equal', '2');
		cy.get('#robotSquare')
			.invoke('attr', 'data-direction')
			.should('equal', 'N');
	});
});
