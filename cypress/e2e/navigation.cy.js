describe('Site Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(1000); // Wait for animations and dynamic content to load
  });

  it('should have a working header with logo and navigation', () => {
    // Check logo presence and click functionality
    cy.get('[data-testid="header-logo"]').should('be.visible').click();
    cy.url().should('include', '/');

    // Verify main nav items are present
    cy.get('[data-testid="nav-home"]').should('be.visible');
    cy.get('[data-testid="nav-services"]').should('be.visible');
    cy.get('[data-testid="nav-gallery"]').should('be.visible');
    cy.get('[data-testid="nav-contact"]').should('be.visible');
    cy.get('[data-testid="nav-about"]').should('be.visible');
  });

  it('should navigate to contact page when Contact link is clicked', () => {
    cy.get('[data-testid="nav-contact"]').click();
    cy.url().should('include', '/contact');
    cy.get('h1').should('contain', 'Contact Us');
  });

  it('should toggle services dropdown on hover', () => {
    cy.get('[data-testid="nav-services"]').trigger('mouseover');
    cy.wait(500); // Wait for dropdown to appear
    cy.contains('Extensions & Additions').should('be.visible');
    cy.get('[data-testid="nav-services"]').trigger('mouseout');
  });

  it('should open external links in a new tab', () => {
    // Find social media links in the header or footer
    cy.get('[data-testid="header-facebook"]')
      .should('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer');

    cy.get('[data-testid="header-instagram"]')
      .should('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer');
  });

  describe('Mobile Navigation', () => {
    beforeEach(() => {
      cy.viewport('iphone-x'); // Set viewport to mobile size
    });

    it('should show and hide mobile menu when toggle is clicked', () => {
      // Mobile menu should be hidden by default
      cy.get('[data-testid="mobile-menu"]').should('not.exist');

      // Click the mobile menu toggle button
      cy.get('[data-testid="mobile-menu-toggle"]').click();

      // Mobile menu should now be visible
      cy.get('[data-testid="mobile-menu"]').should('be.visible');

      // Click the toggle button again to close the menu
      cy.get('[data-testid="mobile-menu-toggle"]').click();

      // Mobile menu should be hidden again
      cy.get('[data-testid="mobile-menu"]').should('not.exist');
    });

    it('should expand/collapse mobile submenus when clicked', () => {
      // Open mobile menu
      cy.get('[data-testid="mobile-menu-toggle"]').click();

      // Services submenu should be collapsed by default
      cy.get('[data-testid="mobile-services-extensions-additions"]').should('not.exist');

      // Click to expand services submenu
      cy.get('[data-testid="mobile-nav-services"]').click();

      // Services submenu should now be visible
      cy.get('[data-testid="mobile-services-extensions-additions"]').should('be.visible');

      // Click again to collapse
      cy.get('[data-testid="mobile-nav-services"]').click();

      // Services submenu should be hidden again
      cy.get('[data-testid="mobile-services-extensions-additions"]').should('not.exist');
    });

    it('should navigate to other pages from mobile menu', () => {
      // Open mobile menu
      cy.get('[data-testid="mobile-menu-toggle"]').click();

      // Click contact link in mobile menu
      cy.get('[data-testid="mobile-nav-contact"]').click();

      // Should navigate to contact page
      cy.url().should('include', '/contact');
      cy.get('h1').should('contain', 'Contact Us');
    });
  });

  describe('Responsive Layout Tests', () => {
    it('should adapt layout for mobile devices', () => {
      cy.viewport('iphone-x');
      cy.get('[data-testid="mobile-menu-toggle"]').should('be.visible');
      cy.get('[data-testid="nav-home"]').should('not.be.visible');
    });

    it('should adapt layout for tablets', () => {
      cy.viewport('ipad-2');
      // Test specific tablet layout expectations
      cy.get('[data-testid="mobile-menu-toggle"]').should('be.visible');
    });

    it('should adapt layout for desktop', () => {
      cy.viewport(1920, 1080);
      cy.get('[data-testid="mobile-menu-toggle"]').should('not.be.visible');
      cy.get('[data-testid="nav-home"]').should('be.visible');
    });
  });
});
