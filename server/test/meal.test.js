import request from 'supertest';
import chai, { expect } from 'chai';
import dotEnv from 'dotenv';
import jwtDecode from 'jwt-decode';
import app from '../server';
import authSeeder from '../test/seeder/authSeeder';
import mealSeeder from '../test/seeder/mealSeeder';

dotEnv.config();

describe('Test cases for all meals actions', () => {
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
  let mealId;
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

  describe('POST /api/v1/meals when creating a meal', () => {
    describe('Test for valid user before carrying out meal actions', () => {
      it(
        'should return a status code of 403 if user is not authorized',
        (done) => {
          request(app)
            .post('/api/v1/meals')
            .send(mealSeeder.setMealData(
              'Koko and Akara',
              '3000', 'akara.png',
              2
            ))
            .end((err, res) => {
              expect(res.statusCode).to.equal(403);
              expect(res.body.message).to.deep.equal('Token not provided');
              done();
            });
        }
      );
    });
  });
  describe('Test for invalid authorization token', () => {
    it(
      'should return a status code of 401 when' +
       'an invalid authorization token is entered',
      (done) => {
        request(app)
          .post('/api/v1/meals')
          .set({ 'x-access-token': 'nonsense' })
          .send(mealSeeder.setMealData(
            'Koko and Akara',
            '3000', 'akara.png', 2
          ))
          .end((err, res) => {
            expect(res.statusCode).to.equal(401);
            expect(res.body.message)
              .to.deep.equal('Invalid authorization token');
            done();
          });
      }
    );
  });
  describe('Test for valid authorization token but unauthorized user', () => {
    it('should return a status code of 403 when an valid authorization' +
      'token but unauthorized user access this', (done) => {
      request(app)
        .post('/api/v1/meals')
        .set({ 'x-access-token': customerToken })
        .send(mealSeeder.setMealData('Koko and Akara', '3000', 'akara.png', 2))
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.message)
            .to.deep.equal('You must be caterer to perform this operation');
          done();
        });
    });
  });

  describe('Test for invalid inputs', () => {
    it('should return status code 400 when token valid ' +
    'and authorised but with no meal inputs', (done) => {
      request(app)
        .post('/api/v1/meals')
        .set({ 'x-access-token': catererToken })
        .send(mealSeeder.setMealData('', '', ''))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message.name[0])
            .to.deep.equal('The name field is required.');
          expect(res.body.message.price[0])
            .to.deep.equal('The price field is required.');
          done();
        });
    });
    it('should return status code 201 a message when meal' +
    ' created successfully', (done) => {
      request(app)
        .post('/api/v1/meals')
        .set({ 'x-access-token': catererToken })
        .send(mealSeeder.setMealData(
          'Fried Rice and chicken',
          2000,
          'https://res.cloudinary.com/sansaristic/image/upload/v1530028015' +
          '/BookMeal/1530027983498pexels-photo-247685.png.png',
          catererId
        ))
        .end((err, res) => {
          mealId = res.body.newMeal.id;
          expect(res.statusCode).to.equal(201);
          expect(res.body.message)
            .to.deep.equal('Meal Created Successfully');
          done();
        });
    });
    it('should return status code 400 when meal name' +
    'already exist', (done) => {
      request(app)
        .post('/api/v1/meals')
        .set({ 'x-access-token': catererToken })
        .send(mealSeeder.setMealData(
          'Fried Rice and chicken',
          2000,
          'gdhdhdh.jpg'
        ))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message)
            .to.deep.equal('You have this meal already, please edit it');
          done();
        });
    });
    it('should return status code 400 when price' +
    ' not a number', (done) => {
      request(app)
        .post('/api/v1/meals')
        .set({ 'x-access-token': catererToken })
        .send(mealSeeder.setMealData(
          'Ofada Rice with beef',
          'a',
          'gdhdhdh.jpg'
        ))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message.price[0])
            .to.deep.equal('The price must be a number.');
          done();
        });
    });
    it('should return status code 400 a message when meal name' +
    ' is less than 3 character', (done) => {
      request(app)
        .post('/api/v1/meals')
        .set({ 'x-access-token': catererToken })
        .send(mealSeeder.setMealData('Of', 300, 'gdhdhdh.jpg'))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message.name[0])
            .to.deep.equal('The name must be at least 3 characters.');
          done();
        });
    });
  });

  // Test for lists of meal
  describe('test for GET api/v1/meals when viewing ' +
    'meals belonging to a caterer', () => {
    it('should return status code 200 when user view' +
      ' all meals available', (done) => {
      request(app)
        .get('/api/v1/meals')
        .set({ 'x-access-token': catererToken })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message)
            .to.deep.equal('All meals displayed');
          expect(res.body.meals[0].name)
            .to.deep.equal('Fried Rice and chicken');
          expect(res.body.meals[0].price)
            .to.deep.equal(2000);
          done();
        });
    });
  });

  // Test for meal update
  describe('PUT api/v1/meals/:mealId when updating meals', () => {
    it('should return status code 400 when mealId params' +
    ' is not a number', (done) => {
      request(app)
        .put('/api/v1/meals/abc')
        .set({ 'x-access-token': catererToken })
        .send(mealSeeder.setMealData('Ekuru', 2000, 'gdhdhdh.jpg'))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message)
            .to.deep.equal('Provide valid meal id');
          done();
        });
    });
    it('should return status code 400 a message when diferent' +
    ' caterer try to edit another caterer meal', (done) => {
      request(app)
        .put(`/api/v1/meals/ ${mealId}`)
        .set({ 'x-access-token': caterer1Token })
        .send(mealSeeder.setMealData('gheteg', 300, 'gdhdhdh.jpg'))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message)
            .to.deep.equal('You have no access to edit this recipe');
          done();
        });
    });
    it('should return status code 400 a message when meal' +
    ' is not found', (done) => {
      request(app)
        .put('/api/v1/meals/1123')
        .set({ 'x-access-token': catererToken })
        .send(mealSeeder.setUpdateMeal('Ata gungun', 300, 'gdhdhdh.jpg'))
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message)
            .to.deep.equal('Meal Not Found');
          done();
        });
    });
    it('should return status code 200 a message when meal' +
    ' is successfully updated', (done) => {
      request(app)
        .put(`/api/v1/meals/ ${mealId}`)
        .set({ 'x-access-token': catererToken })
        .send(mealSeeder.setUpdateMeal('Ata gungun', 300, 'gdhdhdh.jpg'))
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message)
            .to.deep.equal('Meal successfully updated');
          expect(res.body.meal.name)
            .to.deep.equal('Ata gungun');
          expect(res.body.meal.price)
            .to.deep.equal(300);
          done();
        });
    });
    it('should return status code 400 a message when meal' +
    ' inputs are not given', (done) => {
      request(app)
        .put(`/api/v1/meals/ ${mealId}`)
        .set({ 'x-access-token': catererToken })
        .send(mealSeeder.setUpdateMeal('', '', ''))
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message)
            .to.deep.equal('Meal successfully updated');
          done();
        });
    });
  });

  // Test for meal delete
  describe('test for DELETE api/v1/meals/:mealId when deleting a meal', () => {
    it('should return status code 400 when mealId params' +
    ' is not a number', (done) => {
      request(app)
        .delete('/api/v1/meals/abc')
        .set({ 'x-access-token': catererToken })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message)
            .to.deep.equal('Provide valid meal id');
          done();
        });
    });
    it('should return status code 400 a message when meal' +
    ' is not found', (done) => {
      request(app)
        .delete('/api/v1/meals/1123')
        .set({ 'x-access-token': catererToken })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message)
            .to.deep.equal('Meal not found');
          done();
        });
    });
    it('should return status code 400 a message when meal' +
        ' is to be deleted with different caterer token', (done) => {
      request(app)
        .delete(`/api/v1/meals/${mealId}`)
        .set({ 'x-access-token': caterer1Token })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message)
            .to.deep.equal('You have no access to edit this meal');
          done();
        });
    });
    it('should return status code 200 a message when meal' +
    ' is deleted with authorised token', (done) => {
      request(app)
        .delete(`/api/v1/meals/${mealId}`)
        .set({ 'x-access-token': catererToken })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message)
            .to.deep.equal('Meal successfully deleted');
          done();
        });
    });
  });

  // Test for get a meal
  describe('Test for GET /api/v1/meals/:mealId', () => {
    it('should return status code 200 when a' +
    'particular meal is gotten', (done) => {
      request(app)
        .get(`/api/v1/meals/${mealId}`)
        .set({ 'x-access-token': catererToken })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message)
            .to.deep.equal('Meal Details');
          done();
        });
    });
    it('should return status code 400 when the meal id' +
    ' is invalid', (done) => {
      request(app)
        .get(`/api/v1/meals/abc`)
        .set({ 'x-access-token': catererToken })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.message)
            .to.deep.equal('Provide valid meal id');
          done();
        });
    });
  });
});

