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

  describe('test for All inputs', () => {
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
          expect(res.body.message.firstName[0]).to.deep.equal('The firstName field is required.');
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
          expect(res.body.message.lastName[0]).to.deep.equal('The lastName field is required.');
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
          expect(res.body.message.email[0]).to.deep.equal('The email field is required.');
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
          expect(res.body.message.password[0]).to.deep.equal('The password field is required.');
          done();
        });
    });
    it.only(
      'should return status code 201 and a message when user registered successfully',
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
});
