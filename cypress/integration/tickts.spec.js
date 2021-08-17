describe('Tickts', () => {
    before(() => {
        cy.visit('https://bit.ly/2XSuwCW')
    });
    it('fills all the text input fields', () => {
        const firstName = "Alex"
        const lastName = "Bomtempo"
        const fullName = `${firstName} ${lastName}`;

        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);

        cy.get('#email')
            .as('email')
            .type('alexbomtempo3hotmail.com');

        cy.get('#email.invalid').should('exist');

        cy.get('@email')
            .clear()
            .type('alexbomtempo@hotmail.com');

        cy.get('#email.invalid').should('not.exist');

        cy.get('#ticket-quantity').select("2");

        cy.get('#vip').click();

        cy.get('#friend').check();

        cy.get('#requests').type('Nenhuma');

        cy.get('#agree').click();

        cy.get('header h1').should("contain", "TICKETBOX");

        cy.get('.agreement p').should(
            "contain",
            `I, ${fullName}, wish to buy 2 VIP tickets.`);

        cy.get('#agree').check();

        cy.get('#signature').type(fullName);

        cy.get("button[type='submit']")
            .as("submitButton")
            .should("not.be.disabled");

        cy.get("button[type='reset']").click();

        cy.get('@submitButton').should('be.disabled');
    });

    it("fills mandatory fields using support command", () => {
        const customer = {
            firstName: 'Alex',
            lastName: 'Bomtempo',
            email: 'alexbomtempo@hotmail.com'
        };

        cy.fillMandatoryFields(customer);

        cy.get('button[type="submit"]')
            .as('submitButton')
            .should('not.be.disabled');

        cy.get('#agree').uncheck();

        cy.get('@submitButton').should('be.disabled');
    });
});





