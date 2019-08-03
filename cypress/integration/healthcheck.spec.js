// <reference types="Cypress" />

context('Files', () => {
  beforeEach(() => {
    cy.visit('https://public.airspaces.app');
  });

  it('should be up', () => {
    cy.get('.leaflet-marker-pane img.leaflet-marker-icon').its('length').should('be.gte', 1);

    cy.get('.buttons button').eq(1).click();

    cy.get('#panel li').its('length').should('be.gte', 1);
  });
});
