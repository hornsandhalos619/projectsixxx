/// <reference types="cypress" />

describe('Gallery - The Sanctum', () => {
  beforeEach(() => {
    cy.visit('/gallery');
    cy.waitForHydration();
  });

  it('should load gallery with masonry grid', () => {
    cy.get('[data-testid="gallery-grid"]').should('exist');
    cy.get('[data-testid="gallery-item"]').should('have.length.greaterThan', 0);
    cy.checkA11y();
  });

  it('should filter by category', () => {
    cy.getByRole('button', { name: 'Digital' }).click();
    cy.get('[data-testid="gallery-item"]').should('have.length.greaterThan', 0);
    cy.get('[data-testid="gallery-item"]').each(($el) => {
      expect($el).to.have.attr('data-category', 'digital');
    });
  });

  it('should open lightbox on item click', () => {
    cy.get('[data-testid="gallery-item"]').first().click();
    cy.get('[data-testid="lightbox"]').should('be.visible');
    cy.get('[data-testid="lightbox-image"]').should('be.visible');
    cy.get('[data-testid="lightbox-close"]').should('exist');
  });

  it('should navigate between images in lightbox', () => {
    cy.get('[data-testid="gallery-item"]').first().click();
    cy.get('[data-testid="lightbox-next"]').click();
    cy.get('[data-testid="lightbox-image"]').should('have.attr', 'src').and('not.be.empty');
    cy.get('[data-testid="lightbox-prev"]').click();
  });

  it('should close lightbox on escape key', () => {
    cy.get('[data-testid="gallery-item"]').first().click();
    cy.get('[data-testid="lightbox"]').should('be.visible');
    cy.get('body').type('{esc}');
    cy.get('[data-testid="lightbox"]').should('not.exist');
  });

  it('should display artist profile', () => {
    cy.get('[data-testid="gallery-item"]').first().click();
    cy.get('[data-testid="artist-profile"]').should('be.visible');
    cy.get('[data-testid="artist-name"]').should('exist');
    cy.get('[data-testid="artist-link"]').should('have.attr', 'href');
  });

  it('should open commission portal', () => {
    cy.getByRole('link', { name: 'Commission' }).click();
    cy.url().should('include', '/gallery/commissions');
    cy.get('[data-testid="commission-form"]').should('exist');
  });
});