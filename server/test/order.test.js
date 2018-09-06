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

  let customerEmmaToken;
  let customerJohnToken;
  let catererEbenezerToken;
  let catererTopeToken;
  let customerEmmaId;
  let customerJohnId;
  let catererEbenezerId;
  let catererTopeId;
  let orderId;

  before((done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send(authSeeder.setLoginData('nondefyde@gmail.com', 'kalamusu'))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        customerEmmaToken = res.body.token;
        customerEmmaId = jwtDecode(customerEmmaToken).id;
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
        customerJohnToken = res.body.token;
        customerJohnId = jwtDecode(customerJohnToken).id;
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
        catererEbenezerToken = res.body.token;
        catererEbenezerId = jwtDecode(catererEbenezerToken).id;
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
        catererTopeToken = res.body.token;
        catererTopeId = jwtDecode(catererTopeToken).id;
        done();
      });
  });

  // Create meals
  let mealId;
  let mealId1;
  before((done) => {
    request(app)
      .post('/api/v1/meals')
      .set({ 'x-access-token': catererEbenezerToken })
      .send(mealSeeder.setMealData(
        'Ofada ati Dodo',
        2500,
        'ofada.jpg',
        catererEbenezerId
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
      .set({ 'x-access-token': catererEbenezerToken })
      .send(mealSeeder.setMealData(
        'Eba and Egusi Soup',
        2000,
        'eba.jpg',
        catererEbenezerId
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
      .set({ 'x-access-token': catererEbenezerToken })
      .send(menuSeeder.setMenuData([mealId, mealId1], '2018-05-14'))
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        menuId = res.body.menu.id;
        done();
      });
  });

  // Order Placement
  describe('POST /api/v1/orders', () => {
    it(`should return status code 400 when
     no order inputs`, (done) => {
      request(app)
        .post('/api/v1/orders')
        .set({ 'x-access-token': customerEmmaToken })
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
    it(`should return status code 400
     order inputs are invalid`, (done) => {
      request(app)
        .post('/api/v1/orders')
        .set({ 'x-access-token': customerEmmaToken })
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
    it(`should return status code 404 when 
    invalid meal id inputs are entered`, (done) => {
      request(app)
        .post('/api/v1/orders')
        .set({ 'x-access-token': customerEmmaToken })
        .send(orderSeeder.setOrderData(1234, 2, 5, menuId))
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message)
            .to.deep.equal('This meal is not on this menu');
          done();
        });
    });
    it(`should return status code 201 when
    an order is placed`, (done) => {
      request(app)
        .post('/api/v1/orders')
        .set({ 'x-access-token': customerEmmaToken })
        .send(orderSeeder.setOrderData(mealId, 5, menuId, customerEmmaId))
        .end((err, res) => {
          orderId = res.body.order.id;
          expect(res.statusCode).to.equal(201);
          expect(res.body.message)
            .to.deep.equal('Order placed successfully');
          done();
        });
    });
  });

  // Order update
  describe('PUT api/v1/orders/:orderId', () => {
    it(`should return a status code of 403 
    when user is not the owner of the order`, (done) => {
      request(app)
        .put(`/api/v1/orders/${orderId}`)
        .set({ 'x-access-token': customerJohnToken })
        .send(orderSeeder.setUpdateOrder(mealId1, 8, menuId))
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.message)
            .to.deep.equal('This Order does not belong to this user');
          done();
        });
    });
    it(`should return a status code of 404 
    if order does not exist`, (done) => {
      request(app)
        .put('/api/v1/orders/03451')
        .set({ 'x-access-token': customerEmmaToken })
        .send(orderSeeder.setUpdateOrder(mealId1, 8, menuId))
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message).to.deep.equal('Order not found');
          done();
        });
    });
    it(`should return a status code of 404 if meal
    picked does not belong to the menu`, (done) => {
      request(app)
        .put(`/api/v1/orders/${orderId}`)
        .set({ 'x-access-token': customerEmmaToken })
        .send(orderSeeder.setUpdateOrder(800, 8, menuId))
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message)
            .to.deep.equal('This meal is not on this menu');
          done();
        });
    });
    it(`should return status code 200 when 
    valid order inputs and order placed`, (done) => {
      request(app)
        .put(`/api/v1/orders/${orderId}`)
        .set({ 'x-access-token': customerEmmaToken })
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

  // get order
  describe('GET api/v1/orders', () => {
    it(`should return a status code of 200 when 
    Orders are listed`, (done) => {
      request(app)
        .get('/api/v1/orders')
        .set({ 'x-access-token': catererEbenezerToken })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.deep.equal('All Orders');
          done();
        });
    });
  });

  // Get an order
  describe('GET api/v1/order/:id', () => {
    it(`should return a status code of 400 when
    invalid order id is provided`, (done) => {
      request(app)
        .get('/api/v1/order/a')
        .set({ 'x-access-token': customerEmmaToken })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message)
            .to.deep.equal('Provide valid order id');
          done();
        });
    });
    it(`should return a status code of 404 when 
    order is not found`, (done) => {
      request(app)
        .get('/api/v1/order/10')
        .set({ 'x-access-token': customerEmmaToken })
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message)
            .to.deep.equal('Order not found');
          done();
        });
    });
    it(`should return a status code of 200 when 
    Orders are listed`, (done) => {
      request(app)
        .get(`/api/v1/order/${orderId}`)
        .set({ 'x-access-token': catererEbenezerToken })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.deep.equal('Order details');
          expect(res.body.order.Meal.name)
            .to.deep.equal('Eba and Egusi Soup');
          done();
        });
    });
  });

  // Cancel order
  describe('DELETE api/v1/order/:id', () => {
    it(`should return a status code of 400 when 
    invalid order id is provided`, (done) => {
      request(app)
        .delete(`/api/v1/orders/asd`)
        .set({ 'x-access-token': customerEmmaToken })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message)
            .to.deep.equal('Provide valid order id');
          done();
        });
    });
    it(`should return a status code of 403 when 
    an order is to be deleted by different customer`, (done) => {
      request(app)
        .delete(`/api/v1/orders/${orderId}`)
        .set({ 'x-access-token': customerJohnToken })
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.message)
            .to.deep.equal('This Order does not belong to you');
          done();
        });
    });
    it(`should return a status code of 404 when 
    an order is not found`, (done) => {
      request(app)
        .delete(`/api/v1/orders/10`)
        .set({ 'x-access-token': customerEmmaToken })
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.message)
            .to.deep.equal('Order not found');
          done();
        });
    });
    it(`should return a status code of 200 when 
    an order is cancelled`, (done) => {
      request(app)
        .delete(`/api/v1/orders/${orderId}`)
        .set({ 'x-access-token': customerEmmaToken })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message)
            .to.deep.equal('Order cancelled succesfully');
          done();
        });
    });
  });
});
