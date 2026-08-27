/// <reference types="cypress" />

describe('Shop - The Bazaar', () => {
  beforeEach(() => {
    cy.visit('/shop');
    cy.waitForHydration();
  });

  it('should load shop page with product grid', () => {
    cy.get('[data-testid="product-grid"]').should('exist');
    cy.get('[data-testid="product-card"]').should('have.length.greaterThan', 0);
    cy.checkA11y();
  });

  it('should filter products by category', () => {
    cy.getByRole('combobox', { name: /category/i }).click();
    cy.getByRole('option', { name: /apparel/i }).click();
    cy.get('[data-testid="product-card"]').should('have.length.greaterThan', 0);
  });

  it('should add product to cart', () => {
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.getByRole('button', { name: /add to cart/i }).click();
    });
    cy.get('[data-testid="cart-drawer"]').should('be.visible');
    cy.get('[data-testid="cart-item"]').should('have.length', 1);
  });

  it('should update cart quantity', () => {
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.getByRole('button', { name: /add to cart/i }).click();
    });
    cy.get('[data-testid="cart-drawer"]').within(() => {
      cy.getByRole('button', { name: /increase quantity/i }).click();
      cy.get('[data-testid="quantity"]').should('have.value', '2');
    });
  });

  it('should remove item from cart', () => {
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.getByRole('button', { name: /add to cart/i }).click();
    });
    cy.get('[data-testid="cart-drawer"]').within(() => {
      cy.getByRole('button', { name: /remove/i }).click();
      cy.get('[data-testid="cart-empty"]').should('be.visible');
    });
  });

  it('should persist cart across navigation', () => {
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.getByRole('button', { name: /add to cart/i }).click();
    });
    cy.visit('/services');
    cy.waitForHydration();
    cy.visit('/shop');
    cy.waitForHydration();
    cy.get('[data-testid="cart-drawer"]').should('be.visible');
    cy.get('[data-testid="cart-item"]').should('have.length', 1);
  });

  it('should proceed to checkout', () => {
    cy.get('[data-testid="product-card"]').first().within(() => {
      cy.getByRole('button', { name: /add to cart/i }).click();
    });
    cy.get('[data-testid="cart-drawer"]').within(() => {
      cy.getByRole('button', { name: /checkout/i }).click();
    });
    cy.url().should('include', '/checkout');
    cy.get('[data-testid="checkout-form"]').should('exist');
  });

  it('should display affiliate disclosure', () => {
    cy.get('[data-testid="affiliate-disclosure"]').should('be.visible');
    cy.get('[data-testid="affiliate-disclosure"]').should('contain', 'affiliate');
  });
});

describe('Shop - Cart Flow', () => {
  it('should complete full cart to checkout flow', () => {
    cy.visit('/shop');
    cy.waitForHydration();

    // Add multiple products
    cy.get('[data-testid="product-card"]').eq(0).within(() => {
      cy.getByRole('button', { name: /add to cart/i }).click();
    });
    cy.get('[data-testid="product-card"]').eq(1).within(() => {
      cy.getByRole('button', { name: /add to cart/i }).click();
    });

    // Open cart drawer
    cy.get('[data-testid="cart-toggle"]').click();
    cy.get('[data-testid="cart-item"]').should('have.length', 2);

    // Proceed to checkout
    cy.getByRole('button', { name: /checkout/i }).click();
    cy.url().should('include', '/checkout');

    // Fill checkout form
    cy.fillForm({
      'Email': 'test@example.com',
      'First Name': 'Test',
      'Last Name': 'User',
      'Address': '123 Dark Street',
      'City': 'Gotham',
      'Postal Code': '12345',
      'Country': 'US',
    });

    // Submit order
    cy.getByRole('button', { name: /place order/i }).click();
    cy.get('[data-testid="order-confirmation"]').should('be.visible');
  });
});