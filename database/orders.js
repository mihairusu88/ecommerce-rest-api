/**
 * File-based mock order store — the in-memory "database" for the order service.
 * Mirrors the style of `products.js`/`users.js`: plain data held in memory,
 * loaded once at import time and read by the order service's routes.
 *
 * Each order references real product ids/titles/prices from `products.js` and a
 * `userId` from `users.js` (1-10). `total`/`discountedTotal` are the pre- and
 * post-discount sums of the line items; `status` is one of pending, confirmed,
 * shipped, delivered, cancelled. Every id is unique. Pure data — no imports.
 */
const orders = [
  {
    "id": 1,
    "userId": 1,
    "products": [
      {
        "id": 16,
        "title": "Anker Power Bank 20000mAh",
        "price": 45.99,
        "quantity": 4,
        "total": 183.96,
        "discountPercentage": 20,
        "discountedTotal": 147.17,
        "thumbnail": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 50,
        "title": "Football Match Ball",
        "price": 29.99,
        "quantity": 4,
        "total": 119.96,
        "discountPercentage": 7.5,
        "discountedTotal": 110.96,
        "thumbnail": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 34,
        "title": "Memory Foam Pillow",
        "price": 59.99,
        "quantity": 1,
        "total": 59.99,
        "discountPercentage": 16.5,
        "discountedTotal": 50.09,
        "thumbnail": "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "total": 363.91,
    "discountedTotal": 308.22,
    "totalProducts": 3,
    "totalQuantity": 9,
    "status": "cancelled",
    "createdAt": "2024-06-01T09:00:00.000Z",
    "updatedAt": "2024-06-01T09:00:00.000Z"
  },
  {
    "id": 2,
    "userId": 2,
    "products": [
      {
        "id": 42,
        "title": "Artisan Dark Chocolate Bar",
        "price": 4.99,
        "quantity": 4,
        "total": 19.96,
        "discountPercentage": 6,
        "discountedTotal": 18.76,
        "thumbnail": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 17,
        "title": "Amazon Echo Dot 5th Gen",
        "price": 49.99,
        "quantity": 4,
        "total": 199.96,
        "discountPercentage": 25,
        "discountedTotal": 149.97,
        "thumbnail": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 10,
        "title": "Dell XPS 13 Laptop",
        "price": 1299.99,
        "quantity": 3,
        "total": 3899.97,
        "discountPercentage": 12,
        "discountedTotal": 3431.97,
        "thumbnail": "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "total": 4119.89,
    "discountedTotal": 3600.7,
    "totalProducts": 3,
    "totalQuantity": 11,
    "status": "confirmed",
    "createdAt": "2024-06-02T09:00:00.000Z",
    "updatedAt": "2024-06-02T09:00:00.000Z"
  },
  {
    "id": 3,
    "userId": 3,
    "products": [
      {
        "id": 40,
        "title": "Indoor Plant Pot Set",
        "price": 34.99,
        "quantity": 5,
        "total": 174.95,
        "discountPercentage": 5.5,
        "discountedTotal": 165.33,
        "thumbnail": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "total": 174.95,
    "discountedTotal": 165.33,
    "totalProducts": 1,
    "totalQuantity": 5,
    "status": "cancelled",
    "createdAt": "2024-06-03T09:00:00.000Z",
    "updatedAt": "2024-06-03T09:00:00.000Z"
  },
  {
    "id": 4,
    "userId": 4,
    "products": [
      {
        "id": 24,
        "title": "Aviator Sunglasses",
        "price": 154.99,
        "quantity": 4,
        "total": 619.96,
        "discountPercentage": 8.9,
        "discountedTotal": 564.78,
        "thumbnail": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "total": 619.96,
    "discountedTotal": 564.78,
    "totalProducts": 1,
    "totalQuantity": 4,
    "status": "confirmed",
    "createdAt": "2024-06-04T09:00:00.000Z",
    "updatedAt": "2024-06-04T09:00:00.000Z"
  },
  {
    "id": 5,
    "userId": 5,
    "products": [
      {
        "id": 19,
        "title": "Classic Denim Jacket",
        "price": 89.99,
        "quantity": 5,
        "total": 449.95,
        "discountPercentage": 12.5,
        "discountedTotal": 393.71,
        "thumbnail": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 44,
        "title": "Organic Green Tea",
        "price": 8.99,
        "quantity": 3,
        "total": 26.97,
        "discountPercentage": 4.2,
        "discountedTotal": 25.84,
        "thumbnail": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "total": 476.92,
    "discountedTotal": 419.55,
    "totalProducts": 2,
    "totalQuantity": 8,
    "status": "shipped",
    "createdAt": "2024-06-05T09:00:00.000Z",
    "updatedAt": "2024-06-05T09:00:00.000Z"
  },
  {
    "id": 6,
    "userId": 6,
    "products": [
      {
        "id": 9,
        "title": "Apple MacBook Pro 14",
        "price": 1999.99,
        "quantity": 1,
        "total": 1999.99,
        "discountPercentage": 10.5,
        "discountedTotal": 1789.99,
        "thumbnail": "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 16,
        "title": "Anker Power Bank 20000mAh",
        "price": 45.99,
        "quantity": 2,
        "total": 91.98,
        "discountPercentage": 20,
        "discountedTotal": 73.58,
        "thumbnail": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 26,
        "title": "Wool Blend Overcoat",
        "price": 129.99,
        "quantity": 5,
        "total": 649.95,
        "discountPercentage": 20,
        "discountedTotal": 519.96,
        "thumbnail": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 24,
        "title": "Aviator Sunglasses",
        "price": 154.99,
        "quantity": 4,
        "total": 619.96,
        "discountPercentage": 8.9,
        "discountedTotal": 564.78,
        "thumbnail": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "total": 3361.88,
    "discountedTotal": 2948.31,
    "totalProducts": 4,
    "totalQuantity": 12,
    "status": "confirmed",
    "createdAt": "2024-06-06T09:00:00.000Z",
    "updatedAt": "2024-06-06T09:00:00.000Z"
  },
  {
    "id": 7,
    "userId": 7,
    "products": [
      {
        "id": 44,
        "title": "Organic Green Tea",
        "price": 8.99,
        "quantity": 5,
        "total": 44.95,
        "discountPercentage": 4.2,
        "discountedTotal": 43.06,
        "thumbnail": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 16,
        "title": "Anker Power Bank 20000mAh",
        "price": 45.99,
        "quantity": 3,
        "total": 137.97,
        "discountPercentage": 20,
        "discountedTotal": 110.38,
        "thumbnail": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "total": 182.92,
    "discountedTotal": 153.44,
    "totalProducts": 2,
    "totalQuantity": 8,
    "status": "cancelled",
    "createdAt": "2024-06-07T09:00:00.000Z",
    "updatedAt": "2024-06-07T09:00:00.000Z"
  },
  {
    "id": 8,
    "userId": 8,
    "products": [
      {
        "id": 6,
        "title": "Calvin Klein CK One",
        "price": 49.99,
        "quantity": 3,
        "total": 149.97,
        "discountPercentage": 0.32,
        "discountedTotal": 149.49,
        "thumbnail": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 5,
        "title": "Red Nail Polish",
        "price": 8.99,
        "quantity": 4,
        "total": 35.96,
        "discountPercentage": 2.46,
        "discountedTotal": 35.08,
        "thumbnail": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 20,
        "title": "Men's Cotton T-Shirt",
        "price": 19.99,
        "quantity": 4,
        "total": 79.96,
        "discountPercentage": 5,
        "discountedTotal": 75.96,
        "thumbnail": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "total": 265.89,
    "discountedTotal": 260.53,
    "totalProducts": 3,
    "totalQuantity": 11,
    "status": "confirmed",
    "createdAt": "2024-06-08T09:00:00.000Z",
    "updatedAt": "2024-06-08T09:00:00.000Z"
  },
  {
    "id": 9,
    "userId": 9,
    "products": [
      {
        "id": 21,
        "title": "Women's Summer Dress",
        "price": 59.99,
        "quantity": 3,
        "total": 179.97,
        "discountPercentage": 22.3,
        "discountedTotal": 139.84,
        "thumbnail": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 48,
        "title": "Carbon Road Bike",
        "price": 1899.99,
        "quantity": 3,
        "total": 5699.97,
        "discountPercentage": 6.8,
        "discountedTotal": 5312.37,
        "thumbnail": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "total": 5879.94,
    "discountedTotal": 5452.21,
    "totalProducts": 2,
    "totalQuantity": 6,
    "status": "pending",
    "createdAt": "2024-06-09T09:00:00.000Z",
    "updatedAt": "2024-06-09T09:00:00.000Z"
  },
  {
    "id": 10,
    "userId": 10,
    "products": [
      {
        "id": 7,
        "title": "Chanel Coco Noir Eau De",
        "price": 129.99,
        "quantity": 4,
        "total": 519.96,
        "discountPercentage": 18.64,
        "discountedTotal": 423.04,
        "thumbnail": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 1,
        "title": "Essence Mascara Lash Princess",
        "price": 9.99,
        "quantity": 2,
        "total": 19.98,
        "discountPercentage": 7.17,
        "discountedTotal": 18.55,
        "thumbnail": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "total": 539.94,
    "discountedTotal": 441.59,
    "totalProducts": 2,
    "totalQuantity": 6,
    "status": "confirmed",
    "createdAt": "2024-06-10T09:00:00.000Z",
    "updatedAt": "2024-06-10T09:00:00.000Z"
  },
  {
    "id": 11,
    "userId": 1,
    "products": [
      {
        "id": 11,
        "title": "iPhone 15 Pro",
        "price": 1099.99,
        "quantity": 5,
        "total": 5499.95,
        "discountPercentage": 8.25,
        "discountedTotal": 5046.2,
        "thumbnail": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 24,
        "title": "Aviator Sunglasses",
        "price": 154.99,
        "quantity": 3,
        "total": 464.97,
        "discountPercentage": 8.9,
        "discountedTotal": 423.59,
        "thumbnail": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "total": 5964.92,
    "discountedTotal": 5469.79,
    "totalProducts": 2,
    "totalQuantity": 8,
    "status": "cancelled",
    "createdAt": "2024-06-11T09:00:00.000Z",
    "updatedAt": "2024-06-11T09:00:00.000Z"
  },
  {
    "id": 12,
    "userId": 2,
    "products": [
      {
        "id": 35,
        "title": "Stainless Steel Cookware Set",
        "price": 199.99,
        "quantity": 1,
        "total": 199.99,
        "discountPercentage": 12.7,
        "discountedTotal": 174.59,
        "thumbnail": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 28,
        "title": "Slim Fit Chinos",
        "price": 49.99,
        "quantity": 3,
        "total": 149.97,
        "discountPercentage": 9.3,
        "discountedTotal": 136.02,
        "thumbnail": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 26,
        "title": "Wool Blend Overcoat",
        "price": 129.99,
        "quantity": 4,
        "total": 519.96,
        "discountPercentage": 20,
        "discountedTotal": 415.97,
        "thumbnail": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "total": 869.92,
    "discountedTotal": 726.58,
    "totalProducts": 3,
    "totalQuantity": 8,
    "status": "confirmed",
    "createdAt": "2024-06-12T09:00:00.000Z",
    "updatedAt": "2024-06-12T09:00:00.000Z"
  },
  {
    "id": 13,
    "userId": 3,
    "products": [
      {
        "id": 48,
        "title": "Carbon Road Bike",
        "price": 1899.99,
        "quantity": 2,
        "total": 3799.98,
        "discountPercentage": 6.8,
        "discountedTotal": 3541.58,
        "thumbnail": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 26,
        "title": "Wool Blend Overcoat",
        "price": 129.99,
        "quantity": 5,
        "total": 649.95,
        "discountPercentage": 20,
        "discountedTotal": 519.96,
        "thumbnail": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "total": 4449.93,
    "discountedTotal": 4061.54,
    "totalProducts": 2,
    "totalQuantity": 7,
    "status": "delivered",
    "createdAt": "2024-06-13T09:00:00.000Z",
    "updatedAt": "2024-06-13T09:00:00.000Z"
  },
  {
    "id": 14,
    "userId": 4,
    "products": [
      {
        "id": 32,
        "title": "Scented Soy Candle",
        "price": 24.99,
        "quantity": 4,
        "total": 99.96,
        "discountPercentage": 11.1,
        "discountedTotal": 88.86,
        "thumbnail": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "total": 99.96,
    "discountedTotal": 88.86,
    "totalProducts": 1,
    "totalQuantity": 4,
    "status": "confirmed",
    "createdAt": "2024-06-14T09:00:00.000Z",
    "updatedAt": "2024-06-14T09:00:00.000Z"
  },
  {
    "id": 15,
    "userId": 5,
    "products": [
      {
        "id": 35,
        "title": "Stainless Steel Cookware Set",
        "price": 199.99,
        "quantity": 2,
        "total": 399.98,
        "discountPercentage": 12.7,
        "discountedTotal": 349.18,
        "thumbnail": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 40,
        "title": "Indoor Plant Pot Set",
        "price": 34.99,
        "quantity": 5,
        "total": 174.95,
        "discountPercentage": 5.5,
        "discountedTotal": 165.33,
        "thumbnail": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 25,
        "title": "Leather Crossbody Bag",
        "price": 199.99,
        "quantity": 1,
        "total": 199.99,
        "discountPercentage": 17.2,
        "discountedTotal": 165.59,
        "thumbnail": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 29,
        "title": "Analog Wrist Watch",
        "price": 129.99,
        "quantity": 4,
        "total": 519.96,
        "discountPercentage": 13.8,
        "discountedTotal": 448.21,
        "thumbnail": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "total": 1294.88,
    "discountedTotal": 1128.31,
    "totalProducts": 4,
    "totalQuantity": 12,
    "status": "cancelled",
    "createdAt": "2024-06-15T09:00:00.000Z",
    "updatedAt": "2024-06-15T09:00:00.000Z"
  },
  {
    "id": 16,
    "userId": 6,
    "products": [
      {
        "id": 35,
        "title": "Stainless Steel Cookware Set",
        "price": 199.99,
        "quantity": 1,
        "total": 199.99,
        "discountPercentage": 12.7,
        "discountedTotal": 174.59,
        "thumbnail": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 47,
        "title": "Adjustable Dumbbell Set",
        "price": 349.99,
        "quantity": 1,
        "total": 349.99,
        "discountPercentage": 5,
        "discountedTotal": 332.49,
        "thumbnail": "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 13,
        "title": "Sony WH-1000XM5 Headphones",
        "price": 349.99,
        "quantity": 3,
        "total": 1049.97,
        "discountPercentage": 9.9,
        "discountedTotal": 946.02,
        "thumbnail": "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "total": 1599.95,
    "discountedTotal": 1453.1,
    "totalProducts": 3,
    "totalQuantity": 5,
    "status": "cancelled",
    "createdAt": "2024-06-16T09:00:00.000Z",
    "updatedAt": "2024-06-16T09:00:00.000Z"
  },
  {
    "id": 17,
    "userId": 7,
    "products": [
      {
        "id": 44,
        "title": "Organic Green Tea",
        "price": 8.99,
        "quantity": 2,
        "total": 17.98,
        "discountPercentage": 4.2,
        "discountedTotal": 17.22,
        "thumbnail": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 41,
        "title": "Organic Extra Virgin Olive Oil",
        "price": 15.99,
        "quantity": 3,
        "total": 47.97,
        "discountPercentage": 3,
        "discountedTotal": 46.53,
        "thumbnail": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "total": 65.95,
    "discountedTotal": 63.75,
    "totalProducts": 2,
    "totalQuantity": 5,
    "status": "shipped",
    "createdAt": "2024-06-17T09:00:00.000Z",
    "updatedAt": "2024-06-17T09:00:00.000Z"
  },
  {
    "id": 18,
    "userId": 8,
    "products": [
      {
        "id": 17,
        "title": "Amazon Echo Dot 5th Gen",
        "price": 49.99,
        "quantity": 4,
        "total": 199.96,
        "discountPercentage": 25,
        "discountedTotal": 149.97,
        "thumbnail": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "total": 199.96,
    "discountedTotal": 149.97,
    "totalProducts": 1,
    "totalQuantity": 4,
    "status": "cancelled",
    "createdAt": "2024-06-18T09:00:00.000Z",
    "updatedAt": "2024-06-18T09:00:00.000Z"
  },
  {
    "id": 19,
    "userId": 9,
    "products": [
      {
        "id": 50,
        "title": "Football Match Ball",
        "price": 29.99,
        "quantity": 3,
        "total": 89.97,
        "discountPercentage": 7.5,
        "discountedTotal": 83.22,
        "thumbnail": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 43,
        "title": "Colombian Ground Coffee",
        "price": 12.99,
        "quantity": 2,
        "total": 25.98,
        "discountPercentage": 8.5,
        "discountedTotal": 23.77,
        "thumbnail": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 1,
        "title": "Essence Mascara Lash Princess",
        "price": 9.99,
        "quantity": 2,
        "total": 19.98,
        "discountPercentage": 7.17,
        "discountedTotal": 18.55,
        "thumbnail": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 27,
        "title": "Silk Scarf",
        "price": 89.99,
        "quantity": 4,
        "total": 359.96,
        "discountPercentage": 4.5,
        "discountedTotal": 343.76,
        "thumbnail": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "total": 495.89,
    "discountedTotal": 469.3,
    "totalProducts": 4,
    "totalQuantity": 11,
    "status": "delivered",
    "createdAt": "2024-06-19T09:00:00.000Z",
    "updatedAt": "2024-06-19T09:00:00.000Z"
  },
  {
    "id": 20,
    "userId": 10,
    "products": [
      {
        "id": 25,
        "title": "Leather Crossbody Bag",
        "price": 199.99,
        "quantity": 4,
        "total": 799.96,
        "discountPercentage": 17.2,
        "discountedTotal": 662.37,
        "thumbnail": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 46,
        "title": "Yoga Mat Premium",
        "price": 79.99,
        "quantity": 4,
        "total": 319.96,
        "discountPercentage": 9,
        "discountedTotal": 291.16,
        "thumbnail": "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 7,
        "title": "Chanel Coco Noir Eau De",
        "price": 129.99,
        "quantity": 3,
        "total": 389.97,
        "discountPercentage": 18.64,
        "discountedTotal": 317.28,
        "thumbnail": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "total": 1509.89,
    "discountedTotal": 1270.81,
    "totalProducts": 3,
    "totalQuantity": 11,
    "status": "confirmed",
    "createdAt": "2024-06-20T09:00:00.000Z",
    "updatedAt": "2024-06-20T09:00:00.000Z"
  },
  {
    "id": 21,
    "userId": 1,
    "products": [
      {
        "id": 23,
        "title": "Running Sneakers",
        "price": 119.99,
        "quantity": 2,
        "total": 239.98,
        "discountPercentage": 10,
        "discountedTotal": 215.98,
        "thumbnail": "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 35,
        "title": "Stainless Steel Cookware Set",
        "price": 199.99,
        "quantity": 2,
        "total": 399.98,
        "discountPercentage": 12.7,
        "discountedTotal": 349.18,
        "thumbnail": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 19,
        "title": "Classic Denim Jacket",
        "price": 89.99,
        "quantity": 2,
        "total": 179.98,
        "discountPercentage": 12.5,
        "discountedTotal": 157.48,
        "thumbnail": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "total": 819.94,
    "discountedTotal": 722.64,
    "totalProducts": 3,
    "totalQuantity": 6,
    "status": "confirmed",
    "createdAt": "2024-06-21T09:00:00.000Z",
    "updatedAt": "2024-06-21T09:00:00.000Z"
  },
  {
    "id": 22,
    "userId": 2,
    "products": [
      {
        "id": 28,
        "title": "Slim Fit Chinos",
        "price": 49.99,
        "quantity": 5,
        "total": 249.95,
        "discountPercentage": 9.3,
        "discountedTotal": 226.7,
        "thumbnail": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "total": 249.95,
    "discountedTotal": 226.7,
    "totalProducts": 1,
    "totalQuantity": 5,
    "status": "delivered",
    "createdAt": "2024-06-22T09:00:00.000Z",
    "updatedAt": "2024-06-22T09:00:00.000Z"
  },
  {
    "id": 23,
    "userId": 3,
    "products": [
      {
        "id": 42,
        "title": "Artisan Dark Chocolate Bar",
        "price": 4.99,
        "quantity": 5,
        "total": 24.95,
        "discountPercentage": 6,
        "discountedTotal": 23.45,
        "thumbnail": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 16,
        "title": "Anker Power Bank 20000mAh",
        "price": 45.99,
        "quantity": 3,
        "total": 137.97,
        "discountPercentage": 20,
        "discountedTotal": 110.38,
        "thumbnail": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 24,
        "title": "Aviator Sunglasses",
        "price": 154.99,
        "quantity": 1,
        "total": 154.99,
        "discountPercentage": 8.9,
        "discountedTotal": 141.2,
        "thumbnail": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "total": 317.91,
    "discountedTotal": 275.03,
    "totalProducts": 3,
    "totalQuantity": 9,
    "status": "cancelled",
    "createdAt": "2024-06-23T09:00:00.000Z",
    "updatedAt": "2024-06-23T09:00:00.000Z"
  },
  {
    "id": 24,
    "userId": 4,
    "products": [
      {
        "id": 1,
        "title": "Essence Mascara Lash Princess",
        "price": 9.99,
        "quantity": 4,
        "total": 39.96,
        "discountPercentage": 7.17,
        "discountedTotal": 37.09,
        "thumbnail": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": 20,
        "title": "Men's Cotton T-Shirt",
        "price": 19.99,
        "quantity": 1,
        "total": 19.99,
        "discountPercentage": 5,
        "discountedTotal": 18.99,
        "thumbnail": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "total": 59.95,
    "discountedTotal": 56.08,
    "totalProducts": 2,
    "totalQuantity": 5,
    "status": "pending",
    "createdAt": "2024-06-24T09:00:00.000Z",
    "updatedAt": "2024-06-24T09:00:00.000Z"
  },
  {
    "id": 25,
    "userId": 5,
    "products": [
      {
        "id": 7,
        "title": "Chanel Coco Noir Eau De",
        "price": 129.99,
        "quantity": 4,
        "total": 519.96,
        "discountPercentage": 18.64,
        "discountedTotal": 423.04,
        "thumbnail": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "total": 519.96,
    "discountedTotal": 423.04,
    "totalProducts": 1,
    "totalQuantity": 4,
    "status": "delivered",
    "createdAt": "2024-06-25T09:00:00.000Z",
    "updatedAt": "2024-06-25T09:00:00.000Z"
  }
];

export default orders;
