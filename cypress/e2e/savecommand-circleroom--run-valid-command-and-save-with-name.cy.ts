describe('Add valid input command in CircleRoom and succeed, then save with name', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('Should interact with the Robot in the CircleRoom and save', () => {
		// Type commands into the input field
		cy.get('#commandInput-Circle').type('RRFLFFLRF', { delay: 100 });

		// Press the submit command button
		cy.get('#commandSubmit-Circle').should('exist').click();

		// Delay the test for better visualisation
		cy.wait(300);

		// Wait for the robot to finish it´s commands/ animations then check the result it gets
		cy.get('#robotCircle').invoke('attr', 'data-x').should('equal', '3');
		cy.get('#robotCircle').invoke('attr', 'data-y').should('equal', '1');
		cy.get('#robotCircle')
			.invoke('attr', 'data-direction')
			.should('equal', 'Ö');

		// Press the save button
		cy.get('#saveButton-Circle').should('exist').click();

		// Type a name into the input field and slow down the typing for better visualisation
		cy.get('#nameInput-Circle').type('Simon Circleroom tests', { delay: 50 });

		// Delay the test for better visualisation
		cy.wait(300);

		// Press the submit save button
		cy.get('#submitSave-Circle').should('exist').click();
	});
});
