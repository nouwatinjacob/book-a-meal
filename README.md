# Book-A-Meal

[![Build Status](https://travis-ci.org/nouwatinjacob/book-a-meal.svg?branch=develop)](https://travis-ci.org/nouwatinjacob/book-a-meal)
[![Coverage Status](https://coveralls.io/repos/github/nouwatinjacob/book-a-meal/badge.svg?branch=develop)](https://coveralls.io/github/nouwatinjacob/book-a-meal?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/71169e218528ed943a7a/maintainability)](https://codeclimate.com/github/nouwatinjacob/book-a-meal/maintainability)
[![Continuous Integration](https://camo.githubusercontent.com/23ee7a697b291798079e258bbc25434c4fac4f8b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f50726f7465637465645f62792d486f756e642d6138373364312e737667)](https://houndci.com)
[![codecov](https://codecov.io/gh/nouwatinjacob/book-a-meal/branch/develop/graph/badge.svg)](https://codecov.io/gh/nouwatinjacob/book-a-meal)


## Application Features

Book-A-Meal is an application that allows customers to make food orders and helps the food
vendor know what the customers want to eat.

### Caterer Profile
- A Caterer can add new meal to the meal option
- A Caterer can Modify and update meal he/she added to the meal option
- A Caterer can Delete a meal he/she added to the meal option
- A Caterer can set menu for a specific day by selecting from the meal options available on the system
- A Caterer can see the summary of the orders for a specific day.
- A Caterer can see the details for all the orders placed on his/her meals on the menu
- A Caterer can see the amount of money made by end of day
### Customer Profile
- A Customer can see the menu for a specific day set by the caterer and order for a meal
- A Customer can see his/her order history

## Technologies

### Backend

- [NodeJS](http://nodejs.org/en) is a JavaScript runtime built on Chrome's V8 JavaScript engine
- [Express JS](http://express.com) A minimalist web framework
- [Sequelize](http://docs.sequelizejs.com/) Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.
- [PostgreSQL](https://www.postgresql.org/) A powerful, open source object-relational database system.
- [ESLint](eslint.org) provides a pluggable linting utility for JavaScript.
- [Mocha](https://mochajs.org/) Mocha is a feature-rich JavaScript test framework running on [NodeJS](nodejs.org/en) for testing [Javascript](javascript.com) applications.

### Frontend
- [React](https://facebook.github.io/react/) A JavaScript library for building user interfaces.
- [Redux](http://redux.js.org/) A predictable state container for JavaScript apps.
- [Webpack](https://webpack.js.org/) A JavaScript tool for bundling scripts, images, styles and other assets
- [Babel](https://babeljs.io/) A JavaScript compiler for converting codes written in ES6 or JSX to ES5 that is supported by many browsers

## Installation

- Install [NodeJS](http://nodejs.org/en) and [PostgreSQL](https://www.postgresql.org/) on your computer
- Clone this repository ```git clone https://github.com/nouwatinjacob/book-a-meal.git```
- Navigate to the directoty ```cd book-a-meal```
- Install all depencies with ```yarn install```
- Globally install ```sequelize-cli```
- Using ```sequelize db:migrate``` migrate the database
- Start the server by running ```yarn start:dev```
- Build the application by running ```yarn build```

## Testing

- Create a test database of your choice by following the example in .env.sample file
- Run server-side test with `yarn test`

## Contribution

- Fork the repository
- Make your contributions
- Write test cases for your contributions
- Create Pull request against the **develop** branch.

## FAQ

* What language is used to build this application ?
  - The application (both front-end and back-end) is entirely built with javascript
* Is this an open-source project ?
  - Yes, Is an open-source project.
* Who can contribute ?
  - Anyone can contribute as long as you would follow the contribution guides outlined above
* Is the application hosted online ?
  - Yes, the application is hosted on heroku platform. You can always visit it via this link [https://book-a-meal-v1.herokuapp.com/](https://book-a-meal-v1.herokuapp.com/)
* Does the application have an API ?
  - Yes, The application has a well documented API that can be viewed via a link in the API documentation section above
* Is the application licensed ?
  - Yes, the application and its contents is under MIT license

## API Documentation is available on

- [Documentation](https://nouwatinjacob.github.io/slate)

## UI template is available on

- [Book-A-Meal](https://nouwatinjacob.github.io/book-a-meal)

## License and Copyright

&copy; Nouwatin Jacob

Licensed under the [MIT License](https://opensource.org/licenses/MIT).