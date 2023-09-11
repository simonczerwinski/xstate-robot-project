describe('Add valid input command in SquareRoom and succeed, then save with name', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('Should interact with the Robot in the SquareRoom and save', () => {
		// Type commands into the input field
		cy.get('#commandInput-Square').type('HGHGGHGHG', { delay: 100 });

		// Press the submit command button
		cy.get('#commandSubmit-Square').should('exist').click();

		// Delay the test for better visualisation
		cy.wait(300);

		// Wait for the robot to finish it´s commands/ animations then check the result it gets
		cy.get('#robotSquare').invoke('attr', 'data-x').should('equal', '1');
		cy.get('#robotSquare').invoke('attr', 'data-y').should('equal', '3');
		cy.get('#robotSquare')
			.invoke('attr', 'data-direction')
			.should('equal', 'N');

		// Press the save button
		cy.get('#saveButton-Square').should('exist').click();
		// Type a name into the input field

		// Type a name into the input field and slow down the typing for better visualisation
		cy.get('#nameInput-Square').type('Simon Squareroom tests', { delay: 50 });

		// Delay the test for better visualisation
		cy.wait(300);

		// Press the submit save button
		cy.get('#submitSave-Square').should('exist').click();
	});
});
