describe('The Login Page', function () {
    beforeEach(function () {
    //   // reset and seed the database prior to every test
    //   cy.exec('npm run db:reset && npm run db:seed')
  
    //   // seed a user in the DB that we can control from our tests
    //   // assuming it generates a random password for us
    //   cy.request('POST', '/test/seed/user', { username: 'jane.lane' })
    //     .its('body')
    //     .as('currentUser')

        cy.visit('/login')
    })

    it('attempt login with incorrect password.', function () {
        // destructuring assignment of the this.currentUser object
      //   const { username, password } = this.currentUser
    
      //   cy.visit('/login')
    
      //   cy.get('input[name=username]').type(username)
  
          cy.get('input[name=email]').type('john@demo.com')
    
          // {enter} causes the form to submit
          // cy.get('input[name=password]').type(`${password}{enter}`)
          cy.get('input[name=password]').type(`wrongPassword{enter}`)
    
        //   // we should be redirected to /dashboard
          cy.url().should('include', '/login')
    
        //   // // our auth cookie should be present
        //   cy.getCookie('connect.sid').should('null')
    
        //   // // UI should reflect this user being logged in
          cy.get('[data-cy=form-group-error-password]').should('exist')
      })
  
    it('sets auth cookie when logging in via form submission', function () {
      // destructuring assignment of the this.currentUser object
    //   const { username, password } = this.currentUser
  
    //   cy.visit('/login')
  
    //   cy.get('input[name=username]').type(username)

        cy.get('input[name=email]').type('john@demo.com')
  
        // {enter} causes the form to submit
        // cy.get('input[name=password]').type(`${password}{enter}`)
        cy.get('input[name=password]').type(`password{enter}`)
  
        // we should be redirected to /dashboard
        cy.url().should('include', '/dashboard')
  
        // // our auth cookie should be present
        cy.getCookie('connect.sid').should('exist')
  
        // // UI should reflect this user being logged in
        cy.get('[data-cy=user-firstname]').should('contain', 'John')
    })
})