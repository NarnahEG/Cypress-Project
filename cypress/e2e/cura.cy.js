/// <reference types="cypress" />

describe('Cura UI Test', () => {
  it('Appointment Booking Test', () => {
    //access url
    cy.visit('https://katalon-demo-cura.herokuapp.com')

    //user login
    cy.get('body')
    cy.get('#btn-make-appointment').click();
    cy.get('.section')
    cy.get('#txt-username').type('John Doe');
    cy.get('#txt-password').type('ThisIsNotAPassword');

    //click on the login button*/
    cy.get('#btn-login').click();

    //make appointment
    cy.get('#btn-make-appointment')
    cy.get('#combo_facility').select('Hongkong CURA Healthcare Center');
    cy.get('.checkbox-inline').click();
    cy.get('#radio_program_medicaid').click()
    cy.get('#txt_visit_date').type('20/01/2024')
    cy.get('#txt_comment').click({force: true}).type('Patient is asthmatic');
    cy.get('#btn-book-appointment').click({force: true});

    //verify appointment details page
    cy.get('#summary').contains('Please be informed that your appointment has been booked as following:');
    cy.get('#facility').contains('Hongkong CURA Healthcare Center');
    cy.get('#hospital_readmission').contains('Yes');
  

    //logout
    cy.get('#menu-toggle').click()
    cy.get('a[href="authenticate.php?logout"]').click();
    // alternative logout code 
    //cy.get(':nth-child(6) > a').click()

  })
})