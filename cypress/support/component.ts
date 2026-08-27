/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

import '@testing-library/cypress/add-commands';
import 'cypress-axe';
import './commands';

// Import global styles
import '@/app/globals.css';

declare global {
  namespace Cypress {
    interface Chainable {
      mount<Props>(component: React.ComponentType<Props>, props?: Props): Chainable<React.ComponentType<Props>>;
    }
  }
}