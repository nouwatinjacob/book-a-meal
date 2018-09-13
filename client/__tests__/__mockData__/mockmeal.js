/* eslint max-len: ["error", { "ignoreUrls": true }] */

const mealDetails = {
  name: 'Fried Rice and Chicken',
  price: 2000,
  image: 'Yangzhou-Fried-Rice1.jpg'
};

const mealResponse = {
  message: "Meal Details",
  meal: {
    id: 1,
    name: "Fried Rice and chicken Lap",
    price: 3000,
    image: "https://res.cloudinary.com/sansaristic/image/upload/v1536197477/BookMeal/1536197474332pexels-photo-247685.png.png",
    userId: 1,
    createdAt: "2018-09-06T01:31:18.663Z",
    updatedAt: "2018-09-06T01:31:18.663Z",
    deletedAt: null
  }
};

const allMealResponse = {
  message: "All meals displayed",
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
    }
  ]
};

const saveMealResponse = {
  meal: {
    id: 5,
    name: 'Beans',
    price: 200.45,
    image: 'https://res.cloudinary.com/styll/image/upload/v1524560568/foods.jpg',
    userId: 1,
    updatedAt: '2018-05-29T23:36:40.047Z',
    createdAt: '2018-05-29T23:36:40.047Z',
  },
  message: 'Created successfully',
};

export {
  mealDetails,
  mealResponse,
  allMealResponse,
  saveMealResponse
};