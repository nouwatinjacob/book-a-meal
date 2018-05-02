// /* global describe it */
// import request from 'supertest';
// import chai, { assert } from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../server';

// chai.use(chaiHttp);

// describe('Test cases for Orders', () => {
//   describe('Testing for selecting meal option form menu', () => {
//     it('Should return status code 400 when meal is not found in meal option', (done) => {
//       request(app)
//         .post('/api/v1/orders')
//         .set('Content-Type', 'application/json')
//         .expect(400)
//         .send({
//           mealId: 5,
//           quantity: 5,
//         })
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body.Message, 'You can only select a meal that is in the menu option');
//           done();
//         });
//     });

//     it('Should return status code 200 when meal is been selected', (done) => {
//       request(app)
//         .post('/api/v1/orders')
//         .set('Content-Type', 'application/json')
//         .expect(200)
//         .send({
//           mealId: 1,
//           quantity: 5,
//         })
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body.Message, 'Meal added to your order');
//           done();
//         });
//     });
//   });
//   describe('Getting all the orders', () => {
//     it('Should return status code 200 when all order is displayed', (done) => {
//       request(app)
//         .get('/api/v1/orders')
//         .set('Content-Type', 'application/json')
//         .expect(200)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.isArray(res.body);
//           done();
//         });
//     });
//   });
//   describe('Test for Modifying an Order', () => {
//     it('Should return status code 400 when invalid order id is passed as params', (done) => {
//       request(app)
//         .put('/api/v1/orders/1000a')
//         .set('Content-Type', 'application/json')
//         .send({
//           mealId: 3,
//           quantity: 34
//         })
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body.Message, 'This Order has not been made');
//           done();
//         });
//     });

//     it('Should return status code 200 an order is successfully modified', (done) => {
//       request(app)
//         .put('/api/v1/orders/3')
//         .set('Content-Type', 'application/json')
//         .send({
//           mealId: 3,
//           quantity: 6
//         })
//         .expect(200)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body.Message, 'Order successfully modified');
//           done();
//         });
//     });

//     it('Should return status code 400 when meal is not found in meal option', (done) => {
//       request(app)
//         .put('/api/v1/orders/3')
//         .set('Content-Type', 'application/json')
//         .send({
//           mealId: 45,
//           quantity: 6
//         })
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body.Message, 'Meal selected does not exist');
//           done();
//         });
//     });
//   });
// });
