/// <reference types="cypress" />

describe('Contact - The Confessional', () => {
  beforeEach(() => {
    cy.visit('/contact');
    cy.waitForHydration();
  });

  it('should load contact page with all form types', () => {
    cy.get('[data-testid="contact-form"]').should('exist');
    cy.getByRole('tab', { name: 'Services' }).should('exist');
    cy.getByRole('tab', { name: 'Collaboration' }).should('exist');
    cy.getByRole('tab', { name: 'Press' }).should('exist');
    cy.getByRole('tab', { name: 'General' }).should('exist');
    cy.checkA11y();
  });

  it('should submit service inquiry form', () => {
    cy.getByRole('tab', { name: 'Services' }).click();
    cy.fillForm({
      'Service': 'Web Dev & Deployment',
      'Scope': 'Need a gothic luxury e-commerce site',
      'Budget': '$10,000 - $25,000',
      'Timeline': '2-3 months',
      'Full Name': 'Test User',
      'Email': 'test@example.com',
      'Phone': '+1-555-0123',
      'Company': 'Test Brand',
    });
    cy.getByRole('button', { name: 'Seal with Wax' }).click();
    cy.get('[data-testid="form-success"]').should('be.visible');
  });

  it('should submit collaboration form', () => {
    cy.getByRole('tab', { name: 'Collaboration' }).click();
    cy.fillForm({
      'Project Type': 'Custom Apparel Drop',
      'Vision': 'Limited edition dark streetwear collection',
      'Assets': 'Have designs ready',
      'Team Size': '2-5 people',
      'NDA Required': 'true',
      'Full Name': 'Test User',
      'Email': 'test@example.com',
    });
    cy.getByRole('button', { name: 'Seal with Wax' }).click();
    cy.get('[data-testid="form-success"]').should('be.visible');
  });

  it('should submit press form', () => {
    cy.getByRole('tab', { name: 'Press' }).click();
    cy.fillForm({
      'Outlet': 'Dark Fashion Magazine',
      'Angle': 'Feature on gothic streetwear trends',
      'Deadline': '2024-12-31',
      'Assets Needed': 'Press kit, high-res images',
      'Full Name': 'Jane Reporter',
      'Email': 'jane@darkfashion.com',
    });
    cy.getByRole('button', { name: 'Seal with Wax' }).click();
    cy.get('[data-testid="form-success"]').should('be.visible');
  });

  it('should submit general contact form', () => {
    cy.getByRole('tab', { name: 'General' }).click();
    cy.fillForm({
      'Category': 'General Inquiry',
      'Message': 'Just wanted to say your aesthetic is immaculate.',
      'Full Name': 'Test User',
      'Email': 'test@example.com',
    });
    cy.getByRole('button', { name: 'Seal with Wax' }).click();
    cy.get('[data-testid="form-success"]').should('be.visible');
  });

  it('should validate email format', () => {
    cy.getByRole('tab', { name: 'General' }).click();
    cy.getByLabelText('Email').type('invalid-email');
    cy.getByRole('button', { name: 'Seal with Wax' }).click();
    cy.get('[data-testid="field-error"]').should('contain', 'valid email');
  });

  it('should show wax seal animation on success', () => {
    cy.getByRole('tab', { name: 'General' }).click();
    cy.fillForm({
      'Category': 'General Inquiry',
      'Message': 'Test message',
      'Full Name': 'Test User',
      'Email': 'test@example.com',
    });
    cy.getByRole('button', { name: 'Seal with Wax' }).click();
    cy.get('[data-testid="wax-seal-animation"]').should('exist');
  });
});