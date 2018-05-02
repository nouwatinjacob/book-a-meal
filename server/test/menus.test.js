/* global describe it */
import request from 'supertest';
import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);

describe('Test cases for Setting Menu option actions', () => {
  // it('Should return status code 400 when meal is not found in meal option', (done) => {
  //   request(app)
  //     .post('/api/v1/menu')
  //     .set('Content-Type', 'application/json')
  //     .expect(400)
  //     .send({
  //       menuId: 1,
  //       menuDate: '12/04/2018',
  //     })
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       assert.equal(res.body.Message, 'Meal already exist in the menu');
  //       done();
  //     });
  // });

  // it('Should return status code 200 when meal is set for menu option', (done) => {
  //   request(app)
  //     .post('/api/v1/menu')
  //     .set('Content-Type', 'application/json')
  //     .expect(200)
  //     .send({
  //       mealId: 4,
  //       menuDate: '12/04/2018',
  //     })
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       assert.equal(res.body.Message, 'Meal added to Menu option');
  //       assert.isObject(res.body);
  //       done();
  //     });
  // });

  it('Should return status code 200 when getting all menu', (done) => {
    request(app)
      .get('/api/v1/menu')
      .set('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.isArray(res.body.menus);
        done();
      });
  });
});
