/* eslint max-len: ["error", { "ignoreUrls": true }] */
/* eslint max-len: ["error", { "ignoreStrings": true }] */

const makeOrderResponse = {
  message: "Order placed successfully",
  order: {
    id: 7,
    orderId: "efd21d50-b625-11e8-b6ed-c7f3a4079ae5",
    mealId: 5,
    userId: 1,
    menuId: 3,
    quantity: 5,
    updatedAt: "2018-09-12T00:51:08.838Z",
    createdAt: "2018-09-12T00:51:08.838Z",
  }
};

const getAnOrderResponse = {
  message: "Order details",
  order: {
    id: 1,
    orderId: "aa604a40-b174-11e8-bb0f-15bfecd2c56e",
    mealId: 3,
    menuId: 1,
    userId: 2,
    quantity: 4,
    createdAt: "2018-09-06T01:32:06.756Z",
    updatedAt: "2018-09-06T01:32:06.756Z",
    Meal: {
      id: 3,
      name: "Fried Rice and chicken Lap",
      price: 3000,
      image: "https://res.cloudinary.com/sansaristic/image/upload/v1536197477/BookMeal/1536197474332pexels-photo-247685.png.png",
      userId: 1,
      createdAt: "2018-09-06T01:31:18.663Z",
      updatedAt: "2018-09-06T01:31:18.663Z",
      deletedAt: null
    },
    User: {
      id: 2,
      firstName: "Jacob",
      lastName: "Nouwatin",
      ownerName: null,
      email: "customer1@gmail.com"
    }
  }
};

const modifyOrderResponse = {
  message: "Order modified successfully",
  modifiedOrder: {
    id: 8,
    orderId: "5862fac0-b62f-11e8-86af-935593d5788a",
    mealId: "5",
    menuId: "3",
    userId: 1,
    quantity: "5",
    createdAt: "2018-09-12T01:58:29.740Z",
    updatedAt: "2018-09-12T01:58:41.269Z",
    meal: {
      id: 5,
      name: "Garri",
      price: 2000,
      image: "https://res.cloudinary.com/sansaristic/image/upload/v1536198463/BookMeal/1536198460052pexels-photo-247685.png.png",
      userId: 1,
      createdAt: "2018-09-06T01:47:43.646Z",
      updatedAt: "2018-09-11T08:49:15.826Z",
      deletedAt: null
    }
  }
};

const catererOrderResponse = {
  message: "All Orders",
  paginate: {
    page: 1,
    itemCount: 3,
    currentPage: 1,
    limit: "5",
    offset: "0"
  },
  orders: [
    {
      id: 8,
      orderId: "d7de07f0-b2b4-11e8-9efa-cb4af9bd7818",
      mealId: 4,
      menuId: 3,
      userId: 3,
      quantity: 4,
      createdAt: "2018-09-07T15:44:02.031Z",
      updatedAt: "2018-09-07T15:45:44.763Z",
      Meal: {
        id: 4,
        name: "Beans and Garri with Fish",
        price: 2000,
        image: "https://res.cloudinary.com/sansaristic/image/upload/v1536242850/BookMeal/1536242850885images.jpeg.jpg",
        userId: 1,
        createdAt: "2018-09-06T14:07:31.150Z",
        updatedAt: "2018-09-07T15:28:21.136Z",
        deletedAt: null
      },
      User: {
        id: 3,
        firstName: "Emmanuel",
        lastName: "Okafor",
        ownerName: null
      }
    },
    {
      id: 7,
      orderId: "ec667a40-b2af-11e8-9efa-cb4af9bd7818",
      mealId: 4,
      menuId: 3,
      userId: 3,
      quantity: 3,
      createdAt: "2018-09-07T15:08:48.997Z",
      updatedAt: "2018-09-07T15:08:54.789Z",
      Meal: {
        id: 4,
        name: "Beans and Garri with Fish",
        price: 2000,
        image: "https://res.cloudinary.com/sansaristic/image/upload/v1536242850/BookMeal/1536242850885images.jpeg.jpg",
        userId: 1,
        createdAt: "2018-09-06T14:07:31.150Z",
        updatedAt: "2018-09-07T15:28:21.136Z",
        deletedAt: null
      },
      User: {
        id: 3,
        firstName: "Emmanuel",
        lastName: "Okafor",
        ownerName: null
      }
    },
    {
      id: 6,
      orderId: "0d4e77a0-b2ae-11e8-9efa-cb4af9bd7818",
      mealId: 3,
      menuId: 3,
      userId: 3,
      quantity: 2,
      createdAt: "2018-09-07T14:55:25.211Z",
      updatedAt: "2018-09-07T14:55:25.211Z",
      Meal: {
        id: 3,
        name: "White rice with efo riro",
        price: 3500,
        image: "https://res.cloudinary.com/sansaristic/image/upload/v1536242831/BookMeal/1536242831231pexels-photo-247685.png.png",
        userId: 1,
        createdAt: "2018-09-06T14:07:11.746Z",
        updatedAt: "2018-09-07T15:04:25.277Z",
        deletedAt: null
      },
      User: {
        id: 3,
        firstName: "Emmanuel",
        lastName: "Okafor",
        ownerName: null
      }
    }
  ]
};

const userOrderResponse = {
  message: "Orders gotten successfully",
  paginate: {
    page: 2,
    itemCount: 7,
    currentPage: 1,
    limit: "5",
    offset: "0"
  },
  orders: [
    {
      id: 8,
      orderId: "d7de07f0-b2b4-11e8-9efa-cb4af9bd7818",
      mealId: 4,
      menuId: 3,
      userId: 3,
      quantity: 4,
      createdAt: "2018-09-07T15:44:02.031Z",
      updatedAt: "2018-09-07T15:45:44.763Z",
      Meal: {
        id: 4,
        name: "Beans and Garri with Fish",
        price: 2000,
        image: "https://res.cloudinary.com/sansaristic/image/upload/v1536242850/BookMeal/1536242850885images.jpeg.jpg",
        userId: 1,
        createdAt: "2018-09-06T14:07:31.150Z",
        updatedAt: "2018-09-07T15:28:21.136Z",
        deletedAt: null
      }
    },
    {
      id: 7,
      orderId: "ec667a40-b2af-11e8-9efa-cb4af9bd7818",
      mealId: 4,
      menuId: 3,
      userId: 3,
      quantity: 3,
      createdAt: "2018-09-07T15:08:48.997Z",
      updatedAt: "2018-09-07T15:08:54.789Z",
      Meal: {
        id: 4,
        name: "Beans and Garri with Fish",
        price: 2000,
        image: "https://res.cloudinary.com/sansaristic/image/upload/v1536242850/BookMeal/1536242850885images.jpeg.jpg",
        userId: 1,
        createdAt: "2018-09-06T14:07:31.150Z",
        updatedAt: "2018-09-07T15:28:21.136Z",
        deletedAt: null
      }
    },
    {
      id: 6,
      orderId: "0d4e77a0-b2ae-11e8-9efa-cb4af9bd7818",
      mealId: 3,
      menuId: 3,
      userId: 3,
      quantity: 2,
      createdAt: "2018-09-07T14:55:25.211Z",
      updatedAt: "2018-09-07T14:55:25.211Z",
      Meal: {
        id: 3,
        name: "White rice with efo riro",
        price: 3500,
        image: "https://res.cloudinary.com/sansaristic/image/upload/v1536242831/BookMeal/1536242831231pexels-photo-247685.png.png",
        userId: 1,
        createdAt: "2018-09-06T14:07:11.746Z",
        updatedAt: "2018-09-07T15:04:25.277Z",
        deletedAt: null
      }
    },
    {
      id: 4,
      orderId: "41ec5350-b21e-11e8-98a9-e1a986ae5dff",
      mealId: 4,
      menuId: 1,
      userId: 3,
      quantity: 1,
      createdAt: "2018-09-06T21:46:05.957Z",
      updatedAt: "2018-09-06T21:46:05.957Z",
      Meal: {
        id: 4,
        name: "Beans and Garri with Fish",
        price: 2000,
        image: "https://res.cloudinary.com/sansaristic/image/upload/v1536242850/BookMeal/1536242850885images.jpeg.jpg",
        userId: 1,
        createdAt: "2018-09-06T14:07:31.150Z",
        updatedAt: "2018-09-07T15:28:21.136Z",
        deletedAt: null
      }
    },
    {
      id: 3,
      orderId: "3c4d1dd0-b21e-11e8-98a9-e1a986ae5dff",
      mealId: 5,
      menuId: 1,
      userId: 3,
      quantity: 2,
      createdAt: "2018-09-06T21:45:56.525Z",
      updatedAt: "2018-09-06T21:45:56.525Z",
      Meal: {
        id: 5,
        name: "Ofada Rice with Alubosa eleja",
        price: 1500,
        image: "https://res.cloudinary.com/sansaristic/image/upload/v1536242874/BookMeal/1536242874171Yangzhou-Fried-Rice1.jpg.jpg",
        userId: 1,
        createdAt: "2018-09-06T14:07:54.505Z",
        updatedAt: "2018-09-06T14:07:54.505Z",
        deletedAt: "2018-09-06T21:47:20.869Z"
      }
    }
  ]
};

export {
  makeOrderResponse,
  getAnOrderResponse,
  modifyOrderResponse,
  catererOrderResponse,
  userOrderResponse
};
