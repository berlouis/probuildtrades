describe('Contact Form Tests', () => {
  beforeEach(() => {
    cy.visit('/contact');
    cy.wait(1000); // Wait for page to load fully
  });

  it('should render the contact form', () => {
    cy.get('[data-testid="contact-form"]').should('be.visible');
    cy.get('[data-testid="name-input"]').should('be.visible');
    cy.get('[data-testid="email-input"]').should('be.visible');
    cy.get('[data-testid="phone-input"]').should('be.visible');
    cy.get('[data-testid="message-textarea"]').should('be.visible');
    cy.get('[data-testid="submit-button"]').should('be.visible');
  });

  it('should validate required fields', () => {
    // Submit the form without filling required fields
    cy.get('[data-testid="submit-button"]').click();

    // Check for validation errors
    cy.contains('Name is required').should('be.visible');
    cy.contains('Email is required').should('be.visible');
    cy.contains('Phone number is required').should('be.visible');
    cy.contains('Message must be at least').should('be.visible');
    cy.contains('You must agree to the terms').should('be.visible');
  });

  it('should validate email format', () => {
    cy.get('[data-testid="email-input"]').type('invalid-email');
    cy.get('[data-testid="submit-button"]').click();
    cy.contains('Please enter a valid email').should('be.visible');
  });

  it('should validate phone number format', () => {
    cy.get('[data-testid="phone-input"]').type('abc');
    cy.get('[data-testid="submit-button"]').click();
    cy.contains('Please enter a valid').should('be.visible');
  });

  it('should clear form fields when reset button is clicked', () => {
    // Fill out the form
    cy.get('[data-testid="name-input"]').type('Test User');
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="phone-input"]').type('0412345678');
    cy.get('[data-testid="message-textarea"]').type('This is a test message');

    // Click reset button
    cy.get('[data-testid="reset-button"]').click();

    // Verify fields are cleared
    cy.get('[data-testid="name-input"]').should('have.value', '');
    cy.get('[data-testid="email-input"]').should('have.value', '');
    cy.get('[data-testid="phone-input"]').should('have.value', '');
    cy.get('[data-testid="message-textarea"]').should('have.value', '');
  });

  it('should successfully submit a valid form', () => {
    // Use our custom command to fill the form
    cy.fillContactForm({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '0412 345 678',
      message: 'This is a test message for the contact form. Please ignore.',
      agreeToTerms: true
    });

    // Intercept form submission (normally would intercept API call)
    cy.intercept('POST', '/api/contact', {
      statusCode: 200,
      body: { success: true, message: 'Form submitted successfully' }
    }).as('formSubmission');

    // Submit the form
    cy.get('[data-testid="submit-button"]').click();

    // Check for success message (this might be challenging since we're just simulating API call)
    cy.contains('Message Sent Successfully', { timeout: 10000 }).should('be.visible');
  });

  describe('Form Error Handling', () => {
    it('should show error message when submission fails', () => {
      // Mock a failed API response
      cy.intercept('POST', '/api/contact', {
        statusCode: 500,
        body: { success: false, message: 'Server error' }
      }).as('formSubmissionError');

      // Fill and submit the form
      cy.fillContactForm();
      cy.get('[data-testid="submit-button"]').click();

      // Error message should be displayed (depends on your implementation)
      cy.contains('error', { timeout: 10000 }).should('be.visible');
    });
  });

  describe('Multi-Step Form', () => {
    beforeEach(() => {
      cy.visit('/contact-multi');
      cy.wait(1000);
    });

    it('should navigate between form steps', () => {
      // Check first step is visible
      cy.contains('Personal Information').should('be.visible');

      // Fill out first step
      cy.get('input[name="firstName"]').type('John');
      cy.get('input[name="lastName"]').type('Doe');
      cy.get('input[name="email"]').type('john.doe@example.com');
      cy.get('input[name="phone"]').type('0412345678');

      // Click next button
      cy.contains('Next').click();

      // Second step should be visible
      cy.contains('Project Information').should('be.visible');

      // Go back to first step
      cy.contains('Previous').click();

      // First step should be visible again
      cy.contains('Personal Information').should('be.visible');
    });
  });
});
