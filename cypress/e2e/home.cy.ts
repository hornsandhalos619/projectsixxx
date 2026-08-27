/// <reference types="cypress" />

describe('Home Page - The Altar', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForHydration();
  });

  it('should load successfully', () => {
    cy.get('main').should('exist');
    cy.checkA11y();
  });

  it('should have proper meta tags', () => {
    cy.title().should('include', 'Horns & Halos');
    cy.get('meta[name="description"]').should('have.attr', 'content').and('not.be.empty');
    cy.get('meta[property="og:title"]').should('exist');
    cy.get('meta[property="og:description"]').should('exist');
    cy.get('meta[property="og:image"]').should('exist');
  });

  it('should display hero section with portals', () => {
    cy.getByRole('heading', { name: 'Horns & Halos' }).should('be.visible');
    cy.getByRole('link', { name: 'Shop' }).should('be.visible');
    cy.getByRole('link', { name: 'Services' }).should('be.visible');
    cy.getByRole('link', { name: 'Gallery' }).should('be.visible');
  });

  it('should navigate to shop portal', () => {
    cy.getByRole('link', { name: 'Shop' }).click();
    cy.url().should('include', '/shop');
    cy.get('main').should('exist');
  });

  it('should navigate to services portal', () => {
    cy.getByRole('link', { name: 'Services' }).click();
    cy.url().should('include', '/services');
    cy.get('main').should('exist');
  });

  it('should navigate to gallery portal', () => {
    cy.getByRole('link', { name: 'Gallery' }).click();
    cy.url().should('include', '/gallery');
    cy.get('main').should('exist');
  });

  it('should have newsletter signup', () => {
    cy.getByLabelText('Email').should('exist');
    cy.getByRole('button', { name: 'Swear Fealty' }).should('exist');
  });

  it('should respect prefers-reduced-motion', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        Object.defineProperty(win, 'matchMedia', {
          value: (query: string) => ({
            matches: query.includes('reduced-motion'),
            addListener: () => {},
            removeListener: () => {},
          }),
        });
      },
    });
    cy.waitForHydration();
    cy.checkA11y();
  });
});