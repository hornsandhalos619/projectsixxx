/// <reference types="cypress" />

describe('Services - The Guild', () => {
  beforeEach(() => {
    cy.visit('/services');
    cy.waitForHydration();
  });

  it('should load services page with all categories', () => {
    cy.get('[data-testid="services-grid"]').should('exist');
    cy.get('[data-testid="service-card"]').should('have.length', 12);
    cy.checkA11y();
  });

  it('should navigate to service detail page', () => {
    cy.get('[data-testid="service-card"]').first().click();
    cy.url().should('include', '/services/');
    cy.get('[data-testid="service-hero"]').should('exist');
    cy.get('[data-testid="service-process"]').should('exist');
    cy.get('[data-testid="service-pricing"]').should('exist');
    cy.get('[data-testid="service-faq"]').should('exist');
    cy.get('[data-testid="service-booking"]').should('exist');
  });

  it('should display pricing tiers', () => {
    cy.get('[data-testid="service-card"]').first().click();
    cy.get('[data-testid="pricing-tier"]').should('have.length', 3);
    cy.get('[data-testid="pricing-tier"]').first().should('contain', 'Acolyte');
    cy.get('[data-testid="pricing-tier"]').eq(1).should('contain', 'Adept');
    cy.get('[data-testid="pricing-tier"]').eq(2).should('contain', 'Archmage');
  });

  it('should open Calendly booking modal', () => {
    cy.get('[data-testid="service-card"]').first().click();
    cy.getByRole('button', { name: 'Summon This Service' }).click();
    cy.get('[data-testid="calendly-modal"]').should('be.visible');
    cy.get('iframe[src*="calendly"]').should('exist');
  });

  it('should display case studies', () => {
    cy.get('[data-testid="service-card"]').first().click();
    cy.get('[data-testid="case-study"]').should('have.length.greaterThan', 0);
    cy.get('[data-testid="testimonial"]').should('have.length.greaterThan', 0);
  });

  it('should expand FAQ accordions', () => {
    cy.get('[data-testid="service-card"]').first().click();
    cy.get('[data-testid="faq-accordion"]').first().click();
    cy.get('[data-testid="faq-answer"]').first().should('be.visible');
  });
});

describe('Services - Contact Forms', () => {
  beforeEach(() => {
    cy.visit('/services/formation');
    cy.waitForHydration();
  });

  it('should display multi-step service inquiry form', () => {
    cy.get('[data-testid="service-inquiry-form"]').should('exist');
    cy.get('[data-testid="form-step"]').should('have.length', 5);
  });

  it('should progress through form steps', () => {
    // Step 1: Service Selection (pre-filled)
    cy.getByRole('button', { name: 'Next' }).click();

    // Step 2: Scope
    cy.getByLabelText('Project Scope').type('Need LLC formation for new streetwear brand');
    cy.getByRole('button', { name: 'Next' }).click();

    // Step 3: Budget
    cy.getByRole('radio', { name: 'Adept' }).check();
    cy.getByRole('button', { name: 'Next' }).click();

    // Step 4: Timeline
    cy.getByLabelText(/desired timeline/i).type('ASAP - within 2 weeks');
    cy.getByRole('button', { name: 'Next' }).click();

    // Step 5: Contact
    cy.fillForm({
      'Full Name': 'Test User',
      'Email': 'test@example.com',
      'Phone': '+1-555-0123',
      'Company': 'Test Brand',
    });
    cy.getByRole('button', { name: 'Submit' }).click();

    // Success state
    cy.get('[data-testid="form-success"]').should('be.visible');
    cy.get('[data-testid="form-success"]').should('contain', 'covenant is sealed');
  });

  it('should validate required fields', () => {
    cy.getByRole('button', { name: 'Next' }).click(); // Skip to scope
    cy.getByRole('button', { name: 'Next' }).click(); // Try to skip scope
    cy.get('[data-testid="field-error"]').should('be.visible');
  });
});