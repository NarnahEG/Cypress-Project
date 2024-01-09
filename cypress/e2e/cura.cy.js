/// <reference types="cypress" />
import { url,username,password, facility, date, comment} from './selector.cy';
//const dotenvPlugin = require('cypress-dotenv');

// module.exports = (on, config) => {
//   config = dotenvPlugin(config);

//   // other plugins, if any...

//   return config;
// };

describe('Cura UI Test', () => {
  beforeEach(() => {
    cy.visit(url)

    //user login
    cy.get('body')
    cy.get('#btn-make-appointment').click();
    cy.get('.section')
    cy.get('#txt-username').type(username);
    cy.get('#txt-password').type(password);

    //click on the login button*/
    cy.get('#btn-login').click();
  })

  afterEach(() => {
    cy.get('#menu-toggle').click()
    cy.get('a[href="authenticate.php?logout"]').click();
  })

  it('Appointment Booking Test - No readmission', () => {
    
    //const password = Cypress.env('password');
    //access url
    
    cy.wait(5000);

    //make appointment
    cy.get('#btn-make-appointment')
    cy.get('#combo_facility').select(facility);
    //cy.get('.checkbox-inline').click();
    cy.get('#radio_program_medicaid').click()
    cy.get('#txt_visit_date').type(date)
    cy.get('#txt_comment').click({force: true}).type(comment);
    cy.get('#btn-book-appointment').click({force: true});

    //verify appointment details page
    cy.get('#summary').should('contain.text','Please be informed that your appointment has been booked as following:');
    cy.get('#facility').should('contain.text',facility);
    cy.get('#hospital_readmission').should('contain.text','No')

  });

  it('Appointment Booking Test -Readmission', () => {
    
    //const password = Cypress.env('password');
    //access url
    
    cy.wait(5000);

    //make appointment
    cy.get('#btn-make-appointment')
    cy.get('#combo_facility').select(facility);
    cy.get('.checkbox-inline').click();
    cy.get('#radio_program_medicaid').click()
    cy.get('#txt_visit_date').type(date)
    cy.get('#txt_comment').click({force: true}).type(comment);
    cy.get('#btn-book-appointment').click({force: true});

    //verify appointment details page
    cy.get('#summary').contains('Please be informed that your appointment has been booked as following:');
    cy.get('#facility').contains(facility);
    cy.get('#hospital_readmission').contains('Yes')

  });

  // it('Appointment Booking Logout', () => {
  // //logout
  // cy.get('#menu-toggle').click()
  // cy.get('a[href="authenticate.php?logout"]').click();
  // // alternative logout code 
  // //cy.get(':nth-child(6) > a').click()
  // });
})