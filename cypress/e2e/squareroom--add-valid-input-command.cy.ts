describe('Add valid input command and succeed', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('should interact with the SquareRoom and the Robot when input is made', () => {
		// Type commands into the input field
		cy.get('.h-10.p-2.rounded').type('VGHGHHH');

		cy.contains('Submit').click();

		cy.get('#robot')
			.should('have.css', 'left')
			.should('have.css', 'top')
			.should('have.css', 'transform', 'translate(-50%, -50%) rotate(90deg)');
	});
});