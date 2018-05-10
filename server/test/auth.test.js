import jwtDecode from 'jwt-decode';
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
    it('should return status code 422 and a message when fullname' +
      ' is not given', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send(seeder.setCustomerData(
          'zachangdawuda@gmail.com', 'password', 'password', '',
          'Kunle', 'customer'
        ))
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body).to.deep.equal({
            message: {
              firstName: [
                'The firstName field is required.'
              ]
            }
          });
          done();
        });
    });
    it('should return status code 422 and a message when fullname' +
      ' is not given', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send(seeder.setCustomerData(
          'zachangdawuda@gmail.com', 'password', 'password', 'a2',
          'Kunle', 'customer'
        ))
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body).to.deep.equal({
            message: {
              firstName: [
                'The firstName must be at least 3 characters.'
              ]
            }
          });
          done();
        });
    });
    it('should return status code 422 and a message when lastname' +
      ' is not given', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send(seeder.setCustomerData(
          'zachangdawuda@gmail.com', 'password', 'password', 'Kolawole',
          '', 'customer'
        ))
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body).to.deep.equal({
            message: {
              lastName: [
                'The lastName field is required.'
              ]
            }
          });
          done();
        });
    });
    it('should return status code 422 and a message when email' +
      ' is not given', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send(seeder.setCustomerData(
          '', 'password', 'password', 'Kolawole',
          'Olawale', 'customer'
        ))
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body).to.deep.equal({
            message: {
              email: [
                'The email field is required.'
              ]
            }
          });
          done();
        });
    });
    it('should return status code 422 and a message when password' +
      ' is not given', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send(seeder.setCustomerData(
          'jay@gmail.com', '', 'password', 'Kolawole',
          'Olawale', 'customer'
        ))
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body).to.deep.equal({
            message: {
              password: [
                'The password field is required.'
              ]
            }
          });
          done();
        });
    });
  });
});
