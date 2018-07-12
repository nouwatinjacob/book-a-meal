import request from 'supertest';
import chai, { expect } from 'chai';
import dotEnv from 'dotenv';
import jwtDecode from 'jwt-decode';
import chaiHttp from 'chai-http';
import app from '../server';
import authSeeder from '../test/seeder/authSeeder';
import mealSeeder from '../test/seeder/mealSeeder';
import menuSeeder from '../test/seeder/menuSeeder';

chai.use(chaiHttp);

dotEnv.config();

describe('TEST MENU ROUTES', () => {
  before(authSeeder.emptyUserTable);
  before(mealSeeder.emptyMealTable);
  before(authSeeder.addCustomerToDb);
  before(authSeeder.addCatererToDb);
  before(authSeeder.addCatererToDb1);

  let customerToken;
  let catererToken;
  let caterer1Token;
  let customerId;
  let catererId;
  let caterer1Id;

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

  describe('test for POST /meals when Adding a meal option', () => {
    it('should return status code 403 when no token is provided', (done) => {
      request(app)
        .post('/api/v1/menu')
        .send(menuSeeder.setMenuData([mealId, mealId1], '2018-05-12'))
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.message).to.deep.equal('Token not provided');
          done();
        });
    });
    it('should return status code 401 when ' +
    'invalid authorization token is entered', (done) => {
      request(app)
        .post('/api/v1/menu')
        .set({ 'x-access-token': 'nonsense' })
        .send(menuSeeder.setMenuData([mealId, mealId1], '2018-05-12'))
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.message).to.deep.equal('Invalid authorization token');
          done();
        });
    });
    it('should return a status code of 403 when an valid authorization' +
    'token but unauthurized user access this', (done) => {
      request(app)
        .post('/api/v1/menu')
        .set({ 'x-access-token': customerToken })
        .send(menuSeeder.setMenuData([mealId, mealId1], '2018-05-12'))
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.message)
            .to.deep.equal('You must be caterer to perform this operation');
          done();
        });
    });
    it('should return status code 400 when token valid ' +
    'and authorised but with no menu inputs', (done) => {
      request(app)
        .post('/api/v1/menu')
        .set({ 'x-access-token': catererToken })
        .send(menuSeeder.setMenuData('', ''))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message.menuDate[0])
            .to.deep.equal('The menuDate field is required.');
          done();
        });
    });
    it('should return a status code of 400 when an valid authorization' +
    'token with caterer of no meals', (done) => {
      request(app)
        .post('/api/v1/menu')
        .set({ 'x-access-token': caterer1Token })
        .send(menuSeeder.setMenuData([mealId, mealId1], '2018-05-12'))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message)
            .to.deep.equal('None of the meals belong to caterer');
          done();
        });
    });
    it('should return a status code of 400 when an valid authorization' +
    'token enter invalid time format', (done) => {
      request(app)
        .post('/api/v1/menu')
        .set({ 'x-access-token': catererToken })
        .send(menuSeeder.setMenuData([mealId, mealId1], '2018/05/12'))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message)
            .to.deep.equal('The Date must be of format YYYY-MM-DD');
          done();
        });
    });
    it('should return a status code of 201 when an valid authorization' +
    'token with authorized token enter input', (done) => {
      request(app)
        .post('/api/v1/menu')
        .set({ 'x-access-token': catererToken })
        .send(menuSeeder.setMenuData([mealId, mealId1], '2018-05-12'))
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.message).to.deep.equal('Meals added to Menu');
          done();
        });
    });
    it('should return a status code of 400 when an valid authorization' +
    'token with authorized token already set menu for that date', (done) => {
      request(app)
        .post('/api/v1/menu')
        .set({ 'x-access-token': catererToken })
        .send(menuSeeder.setMenuData([mealId, mealId1], '2018-05-12'))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message)
            .to.deep.equal('You already have menu for this date');
          done();
        });
    });
  });

  describe('test for GET api/v1/menu when ' +
  'viewing menu meals to a caterer', () => {
    it('should return a status code of 400 when an valid authorization' +
    'token enter invalid time format', (done) => {
      request(app)
        .get('/api/v1/menu?menuDate=2018/05/12')
        .set({ 'x-access-token': catererToken })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message)
            .to.deep.equal('The Date must be of format YYYY-MM-DD');
          done();
        });
    });
    it('should return a status code of 200 when a valid authorization' +
    ' token enter valid time format to get menu', (done) => {
      request(app)
        .get('/api/v1/menu?menuDate=2018-05-12')
        .set({ 'x-access-token': customerToken })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.deep.equal('Menu for this Date');
          expect(res.body.dateMenu[0].Meals[1].name)
            .to.deep.equal('Eba and Egusi Soup');
          done();
        });
    });
  });
});
