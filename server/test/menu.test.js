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

  let customerEmmaToken;
  let catererEbenezerToken;
  let catererTopeToken;
  let customerEmmaId;
  let catererEbenezerId;
  let catererTopeId;

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

  // set Menu
  describe('POST /api/v1/menu', () => {
    it(`should return status code 400
     when no menu inputs is entered`, (done) => {
      request(app)
        .post('/api/v1/menu')
        .set({ 'x-access-token': catererEbenezerToken })
        .send(menuSeeder.setMenuData('', ''))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message.menuDate)
            .to.deep.equal('The menuDate field is required.');
          done();
        });
    });
    it(`should return a status code of 400 when meals added 
    does not belong to the caterer`, (done) => {
      request(app)
        .post('/api/v1/menu')
        .set({ 'x-access-token': catererTopeToken })
        .send(menuSeeder.setMenuData([mealId, mealId1], '2018-05-12'))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message)
            .to.deep.equal('None of the meals belong to caterer');
          done();
        });
    });
    it(`should return a status code of 400 when
    invalid time format is entered`, (done) => {
      request(app)
        .post('/api/v1/menu')
        .set({ 'x-access-token': catererEbenezerToken })
        .send(menuSeeder.setMenuData([mealId, mealId1], '2018/05/12'))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message)
            .to.deep.equal('The Date must be of format YYYY-MM-DD');
          done();
        });
    });
    it(`should return a status code of 201 when
    menu is set successfully`, (done) => {
      request(app)
        .post('/api/v1/menu')
        .set({ 'x-access-token': catererEbenezerToken })
        .send(menuSeeder.setMenuData([mealId, mealId1], '2018-05-12'))
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.message).to.deep.equal('Meals added to Menu');
          done();
        });
    });
    it(`should return a status code of 409 when
     menu already set for that date`, (done) => {
      request(app)
        .post('/api/v1/menu')
        .set({ 'x-access-token': catererEbenezerToken })
        .send(menuSeeder.setMenuData([mealId, mealId1], '2018-05-12'))
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          expect(res.body.message)
            .to.deep.equal('You already have menu for this date');
          done();
        });
    });
  });

  // Get Menu
  describe('GET api/v1/menu', () => {
    it(`should return a status code of 400 when
    invalid time format is entered`, (done) => {
      request(app)
        .get('/api/v1/menu?menuDate=2018/05/12')
        .set({ 'x-access-token': catererEbenezerToken })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message)
            .to.deep.equal('The Date must be of format YYYY-MM-DD');
          done();
        });
    });
    it(`should return a status code of 200 when
    valid time format is provided to get menu`, (done) => {
      request(app)
        .get('/api/v1/menu?menuDate=2018-05-12')
        .set({ 'x-access-token': customerEmmaToken })
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
