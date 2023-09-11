describe('Add valid input command and succeed', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('Should interact with the Robot in the CircleRoom', () => {
		// Type commands into the input field
		cy.get('#commandInput-Circle').type('RRFLFFLRF');

		// Press the submit command button
		cy.get('#commandSubmit-Circle').should('exist').click();

		// Wait for the robot to finish it´s commands/ animations then check the result it gets
		cy.get('#robotCircle').invoke('attr', 'data-x').should('equal', '3');
		cy.get('#robotCircle').invoke('attr', 'data-y').should('equal', '1');
		cy.get('#robotCircle')
			.invoke('attr', 'data-direction')
			.should('equal', 'Ö');
	});
});
