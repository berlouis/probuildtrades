// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
Cypress.Commands.add('getByTestId', (testId) => {
  return cy.get(`[data-testid="${testId}"]`);
});

// Simulate user interaction with header navigation
Cypress.Commands.add('navigateHeaderMenu', (menuName, submenuItem) => {
  cy.getByTestId(`nav-${menuName}`).trigger('mouseover');
  if (submenuItem) {
    cy.getByTestId(`${menuName}-item-${submenuItem}`).click();
  }
});

// Fill the contact form with test data
Cypress.Commands.add('fillContactForm', (data = {}) => {
  const defaults = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '0412345678',
    message: 'This is a test message from Cypress automated testing.',
    projectType: 'bathroom',
    budget: 'under25k',
    timeframe: 'asap',
    agreeToTerms: true
  };

  const formData = { ...defaults, ...data };

  cy.getByTestId('name-input').type(formData.name);
  cy.getByTestId('email-input').type(formData.email);
  cy.getByTestId('phone-input').type(formData.phone);

  if (formData.projectType) {
    cy.getByTestId('project-type-select').click();
    cy.contains(formData.projectType).click();
  }

  if (formData.budget) {
    cy.getByTestId('budget-select').click();
    cy.contains(formData.budget).click();
  }

  if (formData.timeframe) {
    cy.getByTestId('timeframe-select').click();
    cy.contains(formData.timeframe).click();
  }

  cy.getByTestId('message-textarea').type(formData.message);

  if (formData.agreeToTerms) {
    cy.getByTestId('terms-checkbox').check({ force: true });
  }
});

// Custom command to fill out the contact form
Cypress.Commands.add('fillContactForm', (formData) => {
  const defaultData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '0412 345 678',
    message: 'This is a test message for the contact form.',
    projectType: 'bathroom',
    budget: 'under25k',
    timeframe: 'asap',
    agreeToTerms: true
  };

  const data = { ...defaultData, ...formData };

  cy.get('[data-testid="name-input"]').clear().type(data.name);
  cy.get('[data-testid="email-input"]').clear().type(data.email);
  cy.get('[data-testid="phone-input"]').clear().type(data.phone);

  if (data.projectType) {
    cy.get('[data-testid="project-type-select"]').click();
    cy.contains(data.projectType, { matchCase: false }).click();
  }

  if (data.budget) {
    cy.get('[data-testid="budget-select"]').click();
    cy.contains(data.budget, { matchCase: false }).click();
  }

  if (data.timeframe) {
    cy.get('[data-testid="timeframe-select"]').click();
    cy.contains(data.timeframe, { matchCase: false }).click();
  }

  cy.get('[data-testid="message-textarea"]').clear().type(data.message);

  if (data.agreeToTerms) {
    cy.get('[data-testid="terms-checkbox"]').check();
  }
});

// Simulate mobile device
Cypress.Commands.add('setMobileViewport', () => {
  cy.viewport('iphone-x');
});

// Simulate tablet device
Cypress.Commands.add('setTabletViewport', () => {
  cy.viewport('ipad-2');
});

// Simulate desktop device
Cypress.Commands.add('setDesktopViewport', () => {
  cy.viewport(1280, 720);
});

// Custom command to test responsiveness at different screen sizes
Cypress.Commands.add('viewportPreset', (size) => {
  const sizes = {
    'mobile': { width: 375, height: 667 },
    'tablet': { width: 768, height: 1024 },
    'laptop': { width: 1280, height: 800 },
    'desktop': { width: 1920, height: 1080 },
  };

  if (!sizes[size]) {
    throw new Error(`Viewport preset "${size}" is not defined. Available presets are: ${Object.keys(sizes).join(', ')}`);
  }

  cy.viewport(sizes[size].width, sizes[size].height);
});

// Toggle mobile menu
Cypress.Commands.add('toggleMobileMenu', () => {
  cy.getByTestId('mobile-menu-toggle').click();
});

// Open mobile submenu
Cypress.Commands.add('openMobileSubmenu', (menuName) => {
  cy.getByTestId(`mobile-nav-${menuName}`).click();
});

// Check if button is working properly
Cypress.Commands.add('buttonShouldWork', (buttonTestId, expectedUrl) => {
  cy.getByTestId(buttonTestId).should('be.visible');

  // Check that the button has the proper link and clicks properly
  if (expectedUrl.startsWith('tel:') || expectedUrl.startsWith('mailto:')) {
    cy.getByTestId(buttonTestId).should('have.attr', 'href', expectedUrl);
  } else {
    cy.getByTestId(buttonTestId).click();
    cy.url().should('include', expectedUrl);
  }
});

// Custom command to check if mobile menu is open
Cypress.Commands.add('isMobileMenuOpen', () => {
  return cy.get('[data-testid="mobile-menu"]').should('be.visible');
});

// Custom command for testing navigation
Cypress.Commands.add('navigateTo', (pageName) => {
  const pageMap = {
    'home': 'nav-home',
    'about': 'nav-about',
    'contact': 'nav-contact',
    'gallery': 'nav-gallery',
    'services': 'nav-services',
    'pricing': 'nav-pricing',
    'resources': 'nav-resources',
    'reviews': 'nav-reviews'
  };

  const testId = pageMap[pageName.toLowerCase()];
  if (!testId) {
    throw new Error(`Page "${pageName}" not found in navigation map. Available pages are: ${Object.keys(pageMap).join(', ')}`);
  }

  cy.get(`[data-testid="${testId}"]`).click();
});

// Command to verify page is loaded
Cypress.Commands.add('verifyPageLoaded', (pageTitle) => {
  cy.title().should('include', pageTitle);
  cy.get('h1').should('be.visible');
});
