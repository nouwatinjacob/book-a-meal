/* eslint max-len: ["error", { "ignoreUrls": true }] */
/* eslint max-len: ["error", { "ignoreStrings": true }] */

const menuResponse = {
  paginate: {
    page: 1,
    itemCount: 3,
    currentPage: 1,
    limit: "5",
    offset: "0"
  },
  meals: [
    {
      id: 5,
      name: "Garri",
      price: 2000,
      image: "https://res.cloudinary.com/sansaristic/image/upload/v1536198463/BookMeal/1536198460052pexels-photo-247685.png.png",
      userId: 1,
      createdAt: "2018-09-06T01:47:43.646Z",
      updatedAt: "2018-09-11T08:49:15.826Z",
      deletedAt: null
    },
    {
      id: 5,
      name: "Fried Rice",
      price: 3500,
      image: "https://res.cloudinary.com/sansaristic/image/upload/v1536198463/BookMeal/1536198460052pexels-photo-247685.png.png",
      userId: 1,
      createdAt: "2018-09-06T01:47:43.646Z",
      updatedAt: "2018-09-11T08:49:15.826Z",
      deletedAt: null
    }
  ]
};

const retrieveMenuResponse = {
  message: "Menu for this Date",
  paginate: {
    page: 1,
    itemCount: 3,
    currentPage: 1,
    limit: "5",
    offset: "0"
  },
  dateMenu: [
    {
      id: 2,
      menuDate: "2018-09-07T00:00:00.000Z",
      userId: 1,
      createdAt: "2018-09-07T21:12:03.094Z",
      updatedAt: "2018-09-07T21:12:03.094Z",
      Meals: [
        {
          id: 3,
          name: "Fried Rice and chicken Lap",
          price: 3000,
          image: "https://res.cloudinary.com/sansaristic/image/upload/v1536197477/BookMeal/1536197474332pexels-photo-247685.png.png",
          userId: 1,
          createdAt: "2018-09-06T01:31:18.663Z",
          updatedAt: "2018-09-06T01:31:18.663Z",
          deletedAt: null
        },
        {
          id: 4,
          name: "Ewa Aganhin with Fish",
          price: 2500,
          image: "https://res.cloudinary.com/sansaristic/image/upload/v1536198430/BookMeal/1536198429005images.jpeg.jpg",
          userId: 1,
          createdAt: "2018-09-06T01:47:11.004Z",
          updatedAt: "2018-09-06T01:47:11.004Z",
          deletedAt: null
        },
        {
          id: 5,
          name: "Garri",
          price: 2000,
          image: "https://res.cloudinary.com/sansaristic/image/upload/v1536198463/BookMeal/1536198460052pexels-photo-247685.png.png",
          userId: 1,
          createdAt: "2018-09-06T01:47:43.646Z",
          updatedAt: "2018-09-11T08:49:15.826Z",
          deletedAt: null
        }
      ],
      User: {
        id: 1,
        businessName: "Stephen's Shop",
        ownerName: "Stephen Aribaba"
      }
    }
  ]
};

const setMenuResponse = {
  message: "Meals added to Menu",
  menu: {
    id: 4,
    menuDate: "2018-06-21T00:00:00.000Z",
    userId: 1,
    updatedAt: "2018-09-12T23:51:15.975Z",
    createdAt: "2018-09-12T23:51:15.975Z"
  },
  meals: [
    {
      id: 5,
      name: "Garri",
      price: 2000,
      image: "https://res.cloudinary.com/sansaristic/image/upload/v1536198463/BookMeal/1536198460052pexels-photo-247685.png.png",
      userId: 1,
      createdAt: "2018-09-06T01:47:43.646Z",
      updatedAt: "2018-09-11T08:49:15.826Z",
      deletedAt: null
    },
    {
      id: 4,
      name: "Ewa Aganhin with Fish",
      price: 2500,
      image: "https://res.cloudinary.com/sansaristic/image/upload/v1536198430/BookMeal/1536198429005images.jpeg.jpg",
      userId: 1,
      createdAt: "2018-09-06T01:47:11.004Z",
      updatedAt: "2018-09-06T01:47:11.004Z",
      deletedAt: null
    },
    {
      id: 3,
      name: "Fried Rice and chicken Lap",
      price: 3000,
      image: "https://res.cloudinary.com/sansaristic/image/upload/v1536197477/BookMeal/1536197474332pexels-photo-247685.png.png",
      userId: 1,
      createdAt: "2018-09-06T01:31:18.663Z",
      updatedAt: "2018-09-06T01:31:18.663Z",
      deletedAt: null
    },
  ]
};

export {
  menuResponse,
  retrieveMenuResponse,
  setMenuResponse
};