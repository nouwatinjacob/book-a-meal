import request from 'supertest';
import chai, { expect } from 'chai';
import dotEnv from 'dotenv';
import jwtDecode from 'jwt-decode';
import chaiHttp from 'chai-http';
import app from '../server';
import authSeeder from '../test/seeder/authSeeder';
import mealSeeder from '../test/seeder/mealSeeder';
import menuSeeder from '../test/seeder/menuSeeder';
import orderSeeder from '../test/seeder/orderSeeder';

chai.use(chaiHttp);

dotEnv.config();

describe('TEST ORDER ROUTES', () => {
  before(authSeeder.emptyUserTable);
  before(mealSeeder.emptyMealTable);
  before(menuSeeder.emptyMenuTable);
  before(orderSeeder.emptyOrderTable);
  before(authSeeder.addCustomerToDb);
  before(authSeeder.addCustomerToDb1);
  before(authSeeder.addCatererToDb);
  before(authSeeder.addCatererToDb1);

  let customerToken;
  let customer1Token;
  let catererToken;
  let caterer1Token;
  let customerId;
  let customerId1;
  let catererId;
  let caterer1Id;
  let orderId;

  before((done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send(authSeeder.setLoginData('nondefyde@gmail.com', 'kalamusu'))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        customerToken = res.body.token;
        customerId = jwtDecode(customerToken).id;
        done();
      });
  });

  before((done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send(authSeeder.setLoginData('jaysansa@gmail.com', 'kalamusu'))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        customer1Token = res.body.token;
        customerId1 = jwtDecode(customer1Token).id;
        done();
      });
  });

  before((done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send(authSeeder.setLoginData('nondefyde1@gmail.com', 'kalamusu'))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        catererToken = res.body.token;
        catererId = jwtDecode(catererToken).id;
        done();
      });
  });

  before((done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send(authSeeder.setLoginData('caterer@gmail.com', 'kalamusu'))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        caterer1Token = res.body.token;
        caterer1Id = jwtDecode(caterer1Token).id;
        done();
      });
  });

  // Create meals
  let mealId;
  let mealId1;
  before((done) => {
    request(app)
      .post('/api/v1/meals')
      .set({ 'x-access-token': catererToken })
      .send(mealSeeder.setMealData(
        'Ofada ati Dodo',
        2500,
        'ofada.jpg',
        catererId
      ))
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        mealId = res.body.newMeal.id;
        done();
      });
  });

  before((done) => {
    request(app)
      .post('/api/v1/meals')
      .set({ 'x-access-token': catererToken })
      .send(mealSeeder.setMealData(
        'Eba and Egusi Soup',
        2000,
        'eba.jpg',
        catererId
      ))
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        mealId1 = res.body.newMeal.id;
        done();
      });
  });

  let menuId;
  before((done) => {
    request(app)
      .post('/api/v1/menu')
      .set({ 'x-access-token': catererToken })
      .send(menuSeeder.setMenuData([mealId, mealId1], '2018-05-14'))
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        menuId = res.body.menu.id;
        done();
      });
  });

  describe('test for POST /order when Adding a meal to order', () => {
    it('should return status code 403 when no token is provided', (done) => {
      request(app)
        .post('/api/v1/orders')
        .send(orderSeeder.setOrderData(mealId1, customerId, 5, menuId))
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.message).to.deep.equal('Token not provided');
          done();
        });
    });
    it('should return status code 401 when invalid ' +
    'authorization token is entered', (done) => {
      request(app)
        .post('/api/v1/orders')
        .set({ 'x-access-token': 'nonsense' })
        .send(orderSeeder.setOrderData(mealId1, customerId, 5, menuId))
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.message).to.deep.equal('Invalid authorization token');
          done();
        });
    });
    it('should return a status code of 403 when an valid authorization' +
    'token but unauthurized user access this', (done) => {
      request(app)
        .post('/api/v1/orders')
        .set({ 'x-access-token': catererToken })
        .send(orderSeeder.setOrderData(mealId1, customerId, 5, menuId))
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.message)
            .to.deep.equal('You must be registered to perform this operation');
          done();
        });
    });
    it('should return status code 400 when token valid ' +
    'and authorised but with no order inputs', (done) => {
      request(app)
        .post('/api/v1/orders')
        .set({ 'x-access-token': customerToken })
        .send(orderSeeder.setOrderData('', '', ''))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message.mealId[0])
            .to.deep.equal('The mealId field is required.');
          expect(res.body.message.quantity[0])
            .to.deep.equal('The quantity field is required.');
          expect(res.body.message.menuId[0])
            .to.deep.equal('The menuId field is required.');
          done();
        });
    });
    it('should return status code 400 when token valid ' +
    'and authorised but with invalid order inputs', (done) => {
      request(app)
        .post('/api/v1/orders')
        .set({ 'x-access-token': customerToken })
        .send(orderSeeder.setOrderData('a', 'a', 'a'))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message.mealId[0])
            .to.deep.equal('The mealId must be an integer.');
          expect(res.body.message.quantity[0])
            .to.deep.equal('The quantity must be an integer.');
          expect(res.body.message.menuId[0])
            .to.deep.equal('The menuId must be an integer.');
          done();
        });
    });
    it('should return status code 400 when token valid ' +
    'and authorised but with invalid meal id inputs', (done) => {
      request(app)
        .post('/api/v1/orders')
        .set({ 'x-access-token': customerToken })
        .send(orderSeeder.setOrderData(1234, 2, 5, menuId))
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message)
            .to.deep.equal('This meal is not on this menu');
          done();
        });
    });
    it('should return status code 201 when token valid ' +
    'and authorised but with valid order inputs', (done) => {
      request(app)
        .post('/api/v1/orders')
        .set({ 'x-access-token': customerToken })
        .send(orderSeeder.setOrderData(mealId, 5, menuId, customerId))
        .end((err, res) => {
          orderId = res.body.order.id;
          expect(res.statusCode).to.equal(201);
          expect(res.body.message)
            .to.deep.equal('Order placed successfully');
          done();
        });
    });
  });

  describe('PUT api/v1/orders/:orderId when updating order', () => {
    it('should return a status code of 400 ' + 
    'if user is not the owner of the order', (done) => {
      request(app)
        .put(`/api/v1/orders/${orderId}`)
        .set({ 'x-access-token': customer1Token })
        .send(orderSeeder.setUpdateOrder(mealId1, 8, menuId))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message)
            .to.deep.equal('This Order does not belong to this user');
          done();
        });
    });
    it('should return a status code of 400 if order does not exist', (done) => {
      request(app)
        .put('/api/v1/orders/03451')
        .set({ 'x-access-token': customerToken })
        .send(orderSeeder.setUpdateOrder(mealId1, 8, menuId))
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.deep.equal('Order not found');
          done();
        });
    });
    it('should return a status code of 400 if meal ' + 
    'picked does not belong to the menu', (done) => {
      request(app)
        .put(`/api/v1/orders/${orderId}`)
        .set({ 'x-access-token': customerToken })
        .send(orderSeeder.setUpdateOrder(800, 8, menuId))
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message)
            .to.deep.equal('This meal is not on this menu');
          done();
        });
    });
    it('should return status code 200 when token valid ' +
    'and authorised valid order inputs', (done) => {
      request(app)
        .put(`/api/v1/orders/${orderId}`)
        .set({ 'x-access-token': customerToken })
        .send(orderSeeder.setUpdateOrder(mealId1, 8, menuId))
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message)
            .to.deep.equal('Order modified successfully');
          expect(res.body.modifiedOrder.meal.name)
            .to.deep.equal('Eba and Egusi Soup');
          done();
        });
    });
  });

  describe('GET api/v1/orders when getting order', () => {
    it('should return a status code of 400 when ' +
    'customer token is provided', (done) => {
      request(app)
        .get('/api/v1/orders')
        .set({ 'x-access-token': customerToken })
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.message)
            .to.deep.equal('You must be caterer to perform this operation');
          done();
        });
    });
    it('should return a status code of 200 when ' +
    'Orders are listed', (done) => {
      request(app)
        .get('/api/v1/orders')
        .set({ 'x-access-token': catererToken })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.deep.equal('All Orders');
          done();
        });
    });
  });
});
