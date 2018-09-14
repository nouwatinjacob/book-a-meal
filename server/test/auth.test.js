import request from 'supertest';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import seeder from '../test/seeder/authSeeder';

chai.use(chaiHttp);

require('dotenv').config();

describe('POST api/v1/users/signup', () => {
  before(seeder.emptyUserTable);// Empty user table
  before(seeder.addCustomerToDb);// Add custumer to DB
  before(seeder.addCatererToDb);// Add caterer to DB

  describe('test for All inputs for customer Registration', () => {
    it('should return status code 400 and a message when firstname' +
      ' is not given', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send(seeder.setCustomerData(
          'jaysansa@gmail.com', 'password', 'password', '',
          'Kunle', 'customer'
        ))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message.firstName[0])
            .to.deep.equal('The firstName field is required.');
          done();
        });
    });
    it('should return status code 400 and a message when firstname' +
      ' less than 3 character', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send(seeder.setCustomerData(
          'zachangdawuda@gmail.com', 'password', 'password', 'a2',
          'Kunle', 'customer'
        ))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message.firstName[0])
            .to.deep.equal('The firstName must be at least 3 characters.');
          done();
        });
    });
    it('should return status code 400 and a message when lastname' +
      ' is not given', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send(seeder.setCustomerData(
          'jaysansa@gmail.com', 'password', 'password', 'Kolawole',
          '', 'customer'
        ))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message.lastName[0])
            .to.deep.equal('The lastName field is required.');
          done();
        });
    });
    it('should return status code 400 and a message when email' +
      ' is not given', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send(seeder.setCustomerData(
          '', 'password', 'password', 'Kolawole',
          'Olawale', 'customer'
        ))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message.email[0])
            .to.deep.equal('The email field is required.');
          done();
        });
    });
    it('should return status code 400 and a message when password' +
      ' is not given', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send(seeder.setCustomerData(
          'jaysansa@gmail.com', '', 'password', 'Kolawole',
          'Olawale', 'customer'
        ))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message.password[0])
            .to.deep.equal('The password field is required.');
          done();
        });
    });
    it(
      `should return status code 201 and a 
      message when user registered successfully`,
      (done) => {
        request(app)
          .post('/api/v1/auth/signup')
          .send(seeder.setCustomerData(
            'jaysansa@gmail.com', 'password', 'password', 'Kolawole',
            'Olawale', 'customer'
          ))
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.message).to.deep.equal('Registration Successful');
            expect(res.body.user.email).to.deep.equal('jaysansa@gmail.com');
            done();
          });
      }
    );
  });

  describe('test for All inputs for Caterer Registration', () => {
    it('should return status code 400 and a message when email' +
      ' is not given', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send(seeder.setCatererData(
          '', 'password', 'password', '12, Ajipate street',
          'Yakoyo Restaurant', 'Oluremi Shonde', 'caterer'
        ))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message.email[0])
            .to.deep.equal('The email field is required.');
          done();
        });
    });
    it('should return status code 400 and a message when password' +
      ' is not given', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send(seeder.setCatererData(
          'caterer1@gmail.com', '', 'password', '12, Ajipate street',
          'Yakoyo Restaurant', 'Oluremi Shonde', 'caterer'
        ))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message.password[0])
            .to.deep.equal('The password field is required.');
          done();
        });
    });
    it('should return status code 400 and a message when confirm_password' +
      ' is not given', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send(seeder.setCatererData(
          'caterer1@gmail.com', 'password', '', '12, Ajipate street',
          'Yakoyo Restaurant', 'Oluremi Shonde', 'caterer'
        ))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message.password[0])
            .to.deep.equal('The password confirmation does not match.');
          done();
        });
    });
    it('should return status code 400 and a message when businessAddress' +
      ' is not given', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send(seeder.setCatererData(
          'caterer1@gmail.com', 'password', 'password', '',
          'Yakoyo Restaurant', 'Oluremi Shonde', 'caterer'
        ))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message.businessAddress[0])
            .to.deep.equal('The businessAddress field is required.');
          done();
        });
    });
    it('should return status code 400 and a message when businessName' +
      ' is not given', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send(seeder.setCatererData(
          'caterer1@gmail.com', 'password', 'password', '12, Ajipate street',
          '', 'Oluremi Shonde', 'caterer'
        ))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message.businessName[0])
            .to.deep.equal('The businessName field is required.');
          done();
        });
    });
    it('should return status code 400 and a message when user type' +
      ' is not given', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send(seeder.setCatererData(
          'caterer1@gmail.com', 'password', 'password', '12, Ajipate street',
          'Yakoyo Restaurant', 'Oluremi Shonde', ''
        ))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message)
            .to.deep.equal('Request type must be customer or caterer');
          done();
        });
    });
    it('should return status code 201 and a message when caterer registration' +
      ' is successful', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send(seeder.setCatererData(
          'caterer1@gmail.com', 'password', 'password', '12, Ajipate street',
          'Yakoyo Restaurant', 'Oluremi Shonde', 'caterer'
        ))
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.message)
            .to.deep.equal('Registration Successful');
          expect(res.body.user.email)
            .to.deep.equal('caterer1@gmail.com');
          done();
        });
    });
    it('should return status code 400 and a message when password' +
      ' is less than 6 characters', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send(seeder.setCatererData(
          'caterer1@gmail.com', 'pass', 'password', '12, Ajipate street',
          'Yakoyo Restaurant', 'Oluremi Shonde', 'caterer'
        ))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message.password)
            .to.deep.equal([
              'The password must be at least 6 characters.',
              'The password confirmation does not match.'
            ]);
          done();
        });
    });
    it(`should return status code 409 and a
    message when email already exist`, (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send(seeder.setCatererData(
          'nondefyde1@gmail.com', 'password', 'password', '12, Ajipate street',
          'Yakoyo Restaurant', 'Oluremi Shonde', 'caterer'
        ))
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          expect(res.body.message)
            .to.deep.equal('email or password already exists');
          done();
        });
    });
  });
});

// Login Test

describe('POST api/v1/users/signin', () => {
  it('should return status code 404 and a message' +
    ' if email is incorrect', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send(seeder.setLoginData('caterer1@gmail.com', 'kalamusu'))
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.message)
          .to.deep.equal('Invalid login credentials');
        done();
      });
  });
  it('should return status code 400 and a message' +
    ' if password is incorrect', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send(seeder.setLoginData('caterer1@gmail.com', 'hghgh'))
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.message)
          .to.deep.equal('Invalid login credentials');
        done();
      });
  });
  it('should return status code 400 and message when' +
    ' any or all user input is missing', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send(seeder.setLoginData('', ''))
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.message.email[0])
          .to.deep.equal('The email field is required.');
        expect(res.body.message.password[0])
          .to.deep.equal('The password field is required.');
        done();
      });
  });
  it('should return status code 200 and a message' +
    ' if password is incorrect', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send(seeder.setLoginData('nondefyde@gmail.com', 'kalamusu'))
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message)
          .to.deep.equal('Log in successful');
        expect(res.body.user.email)
          .to.deep.equal('nondefyde@gmail.com');
        expect(res.body.user.userType)
          .to.deep.equal('customer');
        done();
      });
  });
});
