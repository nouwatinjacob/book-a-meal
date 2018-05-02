/* global describe it */
import request from 'supertest';
import chai, { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import mealsData from './helper/meals';

chai.use(chaiHttp);
const invalidId = 10;

describe('Test cases for all meals actions', () => {
  it('Should return status code 200 and the body length to be 3', (done) => {
    request(app)
      .get('/api/v1/meals')
      .send(mealsData)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.Meals.length).to.eql(3);
        done();
      });
  });
  describe('Adding a new Meal', () => {
    it('Should return status code 201 when meal is created', (done) => {
      request(app)
        .post('/api/v1/meals')
        .set('Content-Type', 'application/json')
        .send({
          id: 5,
          name: 'Eba and gbegiri',
          price: 2567,
          image: 'gbegiri.jpeg'
        })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.Message, 'Meal successfully created');
          done();
        });
    });
    it('Should return status code 400 when name field is empty', (done) => {
      request(app)
        .post('/api/v1/meals')
        .set('Content-Type', 'application/json')
        .send({
          id: 4,
          name: '',
          price: 2567,
          image: 'gbegiri.jpeg'
        })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.Message, 'Name Field should not be Empty');
          done();
        });
    });
    it('Should return status code 400 when Price field is empty', (done) => {
      request(app)
        .post('/api/v1/meals')
        .set('Content-Type', 'application/json')
        .send({
          id: 4,
          name: 'Eba and gbegiri',
          price: '',
          image: 'gbegiri.jpeg'
        })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.Message, 'Price Field should not be Empty');
          done();
        });
    });
    it('Should return status code 400 message error when alphanumeric/alphabetic value is entered', (done) => {
      request(app)
        .post('/api/v1/meals')
        .set('Content-Type', 'application/json')
        .send({
          id: 4,
          name: 'Eba and gbegiri',
          price: 'a3445rr',
          image: 'gbegiri.jpeg'
        })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.Message, 'Enter a Valid Value for Price');
          done();
        });
    });
  });

  describe('Modify/Update a meal Infomation', () => {
    it('Should return status code 404 with meal not found message if non existing id is passed', (done) => {
      request(app)
        .put(`/api/v1/meals/${invalidId}`)
        .set('Content-Type', 'application/json')
        .send({
          name: 'Eba and gbegiri',
          price: '4000',
          image: 'gbegiri.jpeg'
        })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.Message, 'Meal does not exist');
          done();
        });
    });

    it('Should return status code 200 when meal information is successfully updated', (done) => {
      request(app)
        .put('/api/v1/meals/1')
        .set('Content-Type', 'application/json')
        .send({
          name: 'Eba and gbegiri',
          price: '4000',
          image: 'gbegiri.jpeg'
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.Message, 'Meal successfully updated');
          done();
        });
    });
  });

  describe('All postive and negative test cases for deleting a meal', () => {
    it('should return `400` status code with `res.body` error messages', (done) => {
      request(app)
        .delete(`/api/v1/meals/${invalidId}`)
        .set('Content-Type', 'application/json')
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.Message, 'Meal not available');
          done();
        });
    });

    it('Should return status code 200 when meal information is successfully updated', (done) => {
      request(app)
        .delete('/api/v1/meals/1')
        .set('Content-Type', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.Message, 'Meal deleted successfully');
          done();
        });
    });
  });
});
