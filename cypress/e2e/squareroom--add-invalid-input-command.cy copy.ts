describe('Add invalid input command and fail', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('should interact with the SquareRoom and the Robot when input is made', () => {
		// Type commands into the input field
		cy.get('.h-10.p-2.rounded').type('BBBTTTWWS');

		cy.contains('Submit').click();

		cy.get('#robot')
			.should('have.css', 'left', '100px')
			.should('have.css', 'top', '100px')
			.should('have.css', 'transform', 'translate(-50%, -50%) rotate(90deg)');
	});
});
