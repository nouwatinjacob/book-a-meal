/* global describe it */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);

// Test for API home route and invalid routes
describe('GET: /api/v1', () => {
  it(
    'Should return status code 404 when user accesses non-existent route', 
    (done) => {
      chai.request(app)
        .get('/*')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.eql({
            message: 'Invalid Url'
          });
          done();
        });
    }
  );

  it('Should return status code 200 when user /api/v1', (done) => {
    chai.request(app)
      .get('/api/v1')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.eql({
          message: 'Welcome to the Book-A-Meal API!'
        });
        done();
      });
  });
});
