describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.createUser({ name: 'Superuser', username: 'root', password: 'admin' });
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('log in to application');
    cy.get('#username');
    cy.get('#password');
    cy.get('#login-btn');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('root');
      cy.get('#password').type('admin');
      cy.get('#login-btn').click();

      cy.contains('Superuser logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrong');
      cy.get('#password').type('wrong');
      cy.get('#login-btn').click();

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'admin' });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('testing blog');
      cy.get('#author').type('cypress');
      cy.get('#url').type('www.test.com');
      cy.get('#newblog-btn').click();

      cy.get('.blog-list').should('contain', 'testing blog');
    });

    describe('A blog already exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'testing blog',
          author: 'cypress',
          url: 'www.test.com',
        });
      });
      it('A user can like a blog', function () {
        cy.contains('show').click();
        cy.contains('0');
        cy.contains('like').click();
        cy.contains('1');
      });

      it('the user who created the blog can delete it', function () {
        cy.contains('show').click();
        cy.contains('remove').click();
        cy.get('.blog-list').should('not.contain', 'testing blog');
      });

      it('users can not delete others blogs', function () {
        cy.createUser({
          name: 'saad bargaouz',
          username: 'sbrg95',
          password: '123456789',
        });
        cy.login({ username: 'sbrg95', password: '123456789' });

        cy.contains('show').click();
        cy.get('.blog').should('not.contain', 'remove');
      });
    });

    describe('multiple blogs already exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'testing blog 1',
          author: 'cypress',
          url: 'www.test.com',
          likes: 3,
        });

        cy.createBlog({
          title: 'testing blog 2',
          author: 'cypress',
          url: 'www.test.com',
          likes: 1,
        });

        cy.createBlog({
          title: 'testing blog 3',
          author: 'cypress',
          url: 'www.test.com',
          likes: 2,
        });
      });

      it('blogs are ordered according to likes', function () {
        cy.get('.blog .title').then((titles) => {
          cy.wrap(titles[0]).should('contain', 'testing blog 1');
          cy.wrap(titles[1]).should('contain', 'testing blog 3');
          cy.wrap(titles[2]).should('contain', 'testing blog 2');
        });
      });
    });
  });
});
