# Book-A-Meal

[![Build Status](https://travis-ci.org/nouwatinjacob/book-a-meal.svg?branch=develop)](https://travis-ci.org/nouwatinjacob/book-a-meal)
[![Coverage Status](https://coveralls.io/repos/github/nouwatinjacob/book-a-meal/badge.svg?branch=develop)](https://coveralls.io/github/nouwatinjacob/book-a-meal?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/71169e218528ed943a7a/maintainability)](https://codeclimate.com/github/nouwatinjacob/book-a-meal/maintainability)

## Application Features

Book-A-Meal is an application that allows customers to make food orders and helps the food
vendor know what the customers want to eat.

- Caterer to add a new meal
- Caterer to Modify and update meal
- Caterer to Delete a meal
- Caterer to set menu for a specific day by selecting from the meal options available on the system
- Users can see the menu for a specific day and select an option from the menu
- Caterer can see the summary of the orders for a specific day.
- Caterer can see the details for all the orders
- Caterer can see the amount of money made by end of day
- Authenticated users (customers) should be able to see their order history
- Admin (Caterer) should be able to see order history
- The application should be able to host more than one caterer.
- Authenticated users (customers) should be able to get notifications when the menu for the day has been set

## Technologies

### Backend

- [NodeJS](http://nodejs.org/en) is a JavaScript runtime built on Chrome's V8 JavaScript engine
- [Express JS](http://express.com) A minimalist web framework
- [Sequelize](http://docs.sequelizejs.com/) Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.
- [PostgreSQL](https://www.postgresql.org/) A powerful, open source object-relational database system.
- [ESLint](eslint.org) provides a pluggable linting utility for JavaScript.
- [Mocha](https://mochajs.org/) Mocha is a feature-rich JavaScript test framework running on [NodeJS](nodejs.org/en) for testing [Javascript](javascript.com) applications.

## Installation

- Install [NodeJS](http://nodejs.org/en) and [PostgreSQL](https://www.postgresql.org/) on your computer
- Clone this repository
- Navigate to the directoty
- Install all depencies with ```npm install```
- Globally install ```sequelize-cli```
- Using ```sequelize db:migrate``` migrate the database
- Start the server by running ```npm run dev```

## Testing

- Create a test database of your choice by following the example in .env.sample file
- Run server-side test with `npm test`

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

## User template is available on

- [Book-A-Meal](https://nouwatinjacob.github.io/book-a-meal)

## License and Copyright

&copy; Nouwatin Jacob

Licensed under the [MIT License](LICENSE).