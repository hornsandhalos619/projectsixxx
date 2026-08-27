/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

import '@testing-library/cypress/add-commands';
import 'cypress-axe';

// Custom commands for Projectsixxx
Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('getByRole', (role: string, options?: { name?: string }) => {
  return cy.findByRole(role, options);
});

Cypress.Commands.add('getByLabelText', (label: string) => {
  return cy.findByLabelText(label);
});

Cypress.Commands.add('getByPlaceholderText', (placeholder: string) => {
  return cy.findByPlaceholderText(placeholder);
});

Cypress.Commands.add('getByText', (text: string, options?: { selector?: string }) => {
  return cy.findByText(text, options);
});

// Login command
Cypress.Commands.add('login', (email?: string, password?: string) => {
  const testEmail = email || Cypress.env('TEST_USER_EMAIL');
  const testPassword = password || Cypress.env('TEST_USER_PASSWORD');

  cy.session([testEmail, testPassword], () => {
    cy.visit('/account/login');
    cy.getByLabelText('Email').type(testEmail);
    cy.getByLabelText('Password').type(testPassword);
    cy.getByRole('button', { name: /sign in/i }).click();
    cy.url().should('include', '/account/dashboard');
  });
});

// Cart commands
Cypress.Commands.add('addToCart', (productId: string, quantity = 1) => {
  cy.request('POST', '/api/cart/add', { productId, quantity }).then((response) => {
    expect(response.status).to.eq(200);
  });
});

Cypress.Commands.add('clearCart', () => {
  cy.request('DELETE', '/api/cart').then((response) => {
    expect(response.status).to.eq(200);
  });
});

// Accessibility testing
Cypress.Commands.add('checkA11y', (context?: any, options?: any) => {
  cy.injectAxe();
  cy.checkA11y(context, options, (violations) => {
    if (violations.length > 0) {
      cy.log('Accessibility violations found:', violations);
      throw new Error(`Accessibility violations: ${violations.map(v => v.id).join(', ')}`);
    }
  });
});

// Performance timing
Cypress.Commands.add('measurePageLoad', (pageName: string) => {
  cy.window().then((win) => {
    const perfData = win.performance.timing;
    const loadTime = perfData.loadEventEnd - perfData.navigationStart;
    cy.log(`${pageName} load time: ${loadTime}ms`);
    expect(loadTime).to.be.lessThan(3000); // 3 second budget
  });
});

// Viewport testing
Cypress.Commands.add('testViewports', (testFn: (viewport: string) => void) => {
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 720 },
    { name: 'desktop-lg', width: 1920, height: 1080 },
  ];

  viewports.forEach((vp) => {
    cy.viewport(vp.width, vp.height);
    testFn(vp.name);
  });
});

// Form filling helper
Cypress.Commands.add('fillForm', (formData: Record<string, string>) => {
  Object.entries(formData).forEach(([field, value]) => {
    cy.getByLabelText(field).clear().type(value);
  });
});

// Wait for hydration
Cypress.Commands.add('waitForHydration', () => {
  cy.get('[data-nextjs-hydration-complete]', { timeout: 10000 }).should('exist');
});

// Scroll to element
Cypress.Commands.add('scrollToElement', (selector: string) => {
  cy.get(selector).scrollIntoView({ duration: 500 });
});

// Check for console errors
Cypress.Commands.add('checkConsoleErrors', () => {
  cy.window().then((win) => {
    const errors: string[] = [];
    const originalError = win.console.error;
    win.console.error = (...args) => {
      errors.push(args.join(' '));
      originalError.apply(win.console, args);
    };
    cy.wrap(null).then(() => {
      if (errors.length > 0) {
        throw new Error(`Console errors detected: ${errors.join('; ')}`);
      }
    });
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      getByRole(role: string, options?: { name?: string }): Chainable<JQuery<HTMLElement>>;
      getByLabelText(label: string): Chainable<JQuery<HTMLElement>>;
      getByPlaceholderText(placeholder: string): Chainable<JQuery<HTMLElement>>;
      getByText(text: string, options?: { selector?: string }): Chainable<JQuery<HTMLElement>>;
      login(email?: string, password?: string): Chainable<void>;
      addToCart(productId: string, quantity?: number): Chainable<void>;
      clearCart(): Chainable<void>;
      checkA11y(context?: any, options?: any): Chainable<void>;
      measurePageLoad(pageName: string): Chainable<void>;
      testViewports(testFn: (viewport: string) => void): Chainable<void>;
      fillForm(formData: Record<string, string>): Chainable<void>;
      waitForHydration(): Chainable<void>;
      scrollToElement(selector: string): Chainable<void>;
      checkConsoleErrors(): Chainable<void>;
    }
  }
}