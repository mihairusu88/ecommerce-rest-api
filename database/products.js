/**
 * File-based mock product catalogue — the in-memory "database" for the product
 * service. Replaces the earlier MongoDB-backed plan: 50 products held in memory,
 * loaded once at import time and read by the product service's routes.
 *
 * Spans six categories (beauty/fragrances, electronics, fashion, home,
 * groceries, sports). Every product has a unique id, sku and barcode; image
 * URLs point at Unsplash. This file is pure data — no imports, no side effects.
 */
const products = [
  {
    "id": 1,
    "title": "Essence Mascara Lash Princess",
    "description": "Essence Mascara Lash Princess — a quality beauty product from Essence, offering excellent value and reliable everyday performance.",
    "category": "beauty",
    "price": 9.99,
    "discountPercentage": 7.17,
    "rating": 4.94,
    "stock": 5,
    "tags": [
      "beauty",
      "mascara"
    ],
    "brand": "Essence",
    "sku": "ADM1000",
    "weight": 1,
    "dimensions": {
      "width": 5.17,
      "height": 5.43,
      "depth": 5.01
    },
    "warrantyInformation": "1 week warranty",
    "shippingInformation": "Ships in 1 day",
    "availabilityStatus": "Low Stock",
    "reviews": [
      {
        "rating": 3,
        "comment": "Very satisfied!",
        "date": "2024-05-10T08:56:21.618Z",
        "reviewerName": "John Doe",
        "reviewerEmail": "john.doe@example.com"
      },
      {
        "rating": 4,
        "comment": "Great quality!",
        "date": "2024-05-13T08:56:21.618Z",
        "reviewerName": "Nolan Gonzalez",
        "reviewerEmail": "nolan.gonzalez@example.com"
      }
    ],
    "returnPolicy": "7 days return policy",
    "minimumOrderQuantity": 1,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000000000000",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 2,
    "title": "Eyeshadow Palette with Mirror",
    "description": "Eyeshadow Palette with Mirror — a quality beauty product from Glamour Beauty, offering excellent value and reliable everyday performance.",
    "category": "beauty",
    "price": 19.99,
    "discountPercentage": 5.5,
    "rating": 3.28,
    "stock": 44,
    "tags": [
      "beauty",
      "eyeshadow"
    ],
    "brand": "Glamour Beauty",
    "sku": "HSS1037",
    "weight": 4.1,
    "dimensions": {
      "width": 12.17,
      "height": 16.43,
      "depth": 10.01
    },
    "warrantyInformation": "1 month warranty",
    "shippingInformation": "Ships in 2 days",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 4,
        "comment": "Would buy again!",
        "date": "2024-05-11T08:56:21.618Z",
        "reviewerName": "Nolan Gonzalez",
        "reviewerEmail": "nolan.gonzalez@example.com"
      },
      {
        "rating": 5,
        "comment": "Exactly as described.",
        "date": "2024-05-14T08:56:21.618Z",
        "reviewerName": "Scarlett Wright",
        "reviewerEmail": "scarlett.wright@example.com"
      },
      {
        "rating": 3,
        "comment": "Not as described!",
        "date": "2024-05-17T08:56:21.618Z",
        "reviewerName": "Liam Smith",
        "reviewerEmail": "liam.smith@example.com"
      }
    ],
    "returnPolicy": "14 days return policy",
    "minimumOrderQuantity": 2,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000001234567",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 3,
    "title": "Powder Canister",
    "description": "Powder Canister — a quality beauty product from Velvet Touch, offering excellent value and reliable everyday performance.",
    "category": "beauty",
    "price": 14.99,
    "discountPercentage": 18.14,
    "rating": 3.82,
    "stock": 59,
    "tags": [
      "beauty",
      "face powder"
    ],
    "brand": "Velvet Touch",
    "sku": "QFX1074",
    "weight": 7.2,
    "dimensions": {
      "width": 19.17,
      "height": 7.43,
      "depth": 15.01
    },
    "warrantyInformation": "3 months warranty",
    "shippingInformation": "Ships in 3-5 business days",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 5,
        "comment": "Not as described!",
        "date": "2024-05-12T08:56:21.618Z",
        "reviewerName": "Scarlett Wright",
        "reviewerEmail": "scarlett.wright@example.com"
      },
      {
        "rating": 3,
        "comment": "Very happy with my purchase!",
        "date": "2024-05-15T08:56:21.618Z",
        "reviewerName": "Liam Smith",
        "reviewerEmail": "liam.smith@example.com"
      }
    ],
    "returnPolicy": "30 days return policy",
    "minimumOrderQuantity": 3,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000002469134",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 4,
    "title": "Red Lipstick",
    "description": "Red Lipstick — a quality beauty product from Chic Cosmetics, offering excellent value and reliable everyday performance.",
    "category": "beauty",
    "price": 12.99,
    "discountPercentage": 19.03,
    "rating": 2.51,
    "stock": 68,
    "tags": [
      "beauty",
      "lipstick"
    ],
    "brand": "Chic Cosmetics",
    "sku": "XUC1111",
    "weight": 10.3,
    "dimensions": {
      "width": 26.17,
      "height": 18.43,
      "depth": 20.01
    },
    "warrantyInformation": "6 months warranty",
    "shippingInformation": "Ships in 1 week",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 3,
        "comment": "Excellent value for money.",
        "date": "2024-05-13T08:56:21.618Z",
        "reviewerName": "Liam Smith",
        "reviewerEmail": "liam.smith@example.com"
      },
      {
        "rating": 4,
        "comment": "Fast shipping and well packaged.",
        "date": "2024-05-16T08:56:21.618Z",
        "reviewerName": "Emma Miller",
        "reviewerEmail": "emma.miller@example.com"
      },
      {
        "rating": 5,
        "comment": "Very satisfied!",
        "date": "2024-05-19T08:56:21.618Z",
        "reviewerName": "Olivia Davis",
        "reviewerEmail": "olivia.davis@example.com"
      }
    ],
    "returnPolicy": "60 days return policy",
    "minimumOrderQuantity": 4,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000003703701",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 5,
    "title": "Red Nail Polish",
    "description": "Red Nail Polish — a quality beauty product from Nail Couture, offering excellent value and reliable everyday performance.",
    "category": "beauty",
    "price": 8.99,
    "discountPercentage": 2.46,
    "rating": 3.91,
    "stock": 71,
    "tags": [
      "beauty",
      "nail polish"
    ],
    "brand": "Nail Couture",
    "sku": "EHH1148",
    "weight": 13.4,
    "dimensions": {
      "width": 8.17,
      "height": 9.43,
      "depth": 25.01
    },
    "warrantyInformation": "1 year warranty",
    "shippingInformation": "Ships in 1 month",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 4,
        "comment": "Very satisfied!",
        "date": "2024-05-14T08:56:21.618Z",
        "reviewerName": "Emma Miller",
        "reviewerEmail": "emma.miller@example.com"
      },
      {
        "rating": 5,
        "comment": "Great quality!",
        "date": "2024-05-17T08:56:21.618Z",
        "reviewerName": "Olivia Davis",
        "reviewerEmail": "olivia.davis@example.com"
      }
    ],
    "returnPolicy": "No return policy",
    "minimumOrderQuantity": 5,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000004938268",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 6,
    "title": "Calvin Klein CK One",
    "description": "Calvin Klein CK One — a quality fragrances product from Calvin Klein, offering excellent value and reliable everyday performance.",
    "category": "fragrances",
    "price": 49.99,
    "discountPercentage": 0.32,
    "rating": 4.85,
    "stock": 17,
    "tags": [
      "fragrances",
      "perfumes"
    ],
    "brand": "Calvin Klein",
    "sku": "MWN1185",
    "weight": 16,
    "dimensions": {
      "width": 15.17,
      "height": 20.43,
      "depth": 8.01
    },
    "warrantyInformation": "2 year warranty",
    "shippingInformation": "Ships in 1 day",
    "availabilityStatus": "Low Stock",
    "reviews": [
      {
        "rating": 5,
        "comment": "Would buy again!",
        "date": "2024-05-15T08:56:21.618Z",
        "reviewerName": "Olivia Davis",
        "reviewerEmail": "olivia.davis@example.com"
      },
      {
        "rating": 3,
        "comment": "Exactly as described.",
        "date": "2024-05-18T08:56:21.618Z",
        "reviewerName": "John Doe",
        "reviewerEmail": "john.doe@example.com"
      },
      {
        "rating": 4,
        "comment": "Not as described!",
        "date": "2024-05-21T08:56:21.618Z",
        "reviewerName": "Nolan Gonzalez",
        "reviewerEmail": "nolan.gonzalez@example.com"
      }
    ],
    "returnPolicy": "7 days return policy",
    "minimumOrderQuantity": 6,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000006172835",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 7,
    "title": "Chanel Coco Noir Eau De",
    "description": "Chanel Coco Noir Eau De — a quality fragrances product from Chanel, offering excellent value and reliable everyday performance.",
    "category": "fragrances",
    "price": 129.99,
    "discountPercentage": 18.64,
    "rating": 2.76,
    "stock": 41,
    "tags": [
      "fragrances",
      "perfumes"
    ],
    "brand": "Chanel",
    "sku": "UKT1222",
    "weight": 19.1,
    "dimensions": {
      "width": 22.17,
      "height": 11.43,
      "depth": 13.01
    },
    "warrantyInformation": "1 week warranty",
    "shippingInformation": "Ships in 2 days",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 3,
        "comment": "Not as described!",
        "date": "2024-05-16T08:56:21.618Z",
        "reviewerName": "John Doe",
        "reviewerEmail": "john.doe@example.com"
      },
      {
        "rating": 4,
        "comment": "Very happy with my purchase!",
        "date": "2024-05-19T08:56:21.618Z",
        "reviewerName": "Nolan Gonzalez",
        "reviewerEmail": "nolan.gonzalez@example.com"
      }
    ],
    "returnPolicy": "14 days return policy",
    "minimumOrderQuantity": 7,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000007407402",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 8,
    "title": "Dior J'adore",
    "description": "Dior J'adore — a quality fragrances product from Dior, offering excellent value and reliable everyday performance.",
    "category": "fragrances",
    "price": 89.99,
    "discountPercentage": 17.44,
    "rating": 3.31,
    "stock": 91,
    "tags": [
      "fragrances",
      "perfumes"
    ],
    "brand": "Dior",
    "sku": "BYY1259",
    "weight": 2.2,
    "dimensions": {
      "width": 29.17,
      "height": 22.43,
      "depth": 18.01
    },
    "warrantyInformation": "1 month warranty",
    "shippingInformation": "Ships in 3-5 business days",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 4,
        "comment": "Excellent value for money.",
        "date": "2024-05-17T08:56:21.618Z",
        "reviewerName": "Nolan Gonzalez",
        "reviewerEmail": "nolan.gonzalez@example.com"
      },
      {
        "rating": 5,
        "comment": "Fast shipping and well packaged.",
        "date": "2024-05-20T08:56:21.618Z",
        "reviewerName": "Scarlett Wright",
        "reviewerEmail": "scarlett.wright@example.com"
      },
      {
        "rating": 3,
        "comment": "Very satisfied!",
        "date": "2024-05-23T08:56:21.618Z",
        "reviewerName": "Liam Smith",
        "reviewerEmail": "liam.smith@example.com"
      }
    ],
    "returnPolicy": "30 days return policy",
    "minimumOrderQuantity": 8,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000008641969",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 9,
    "title": "Apple MacBook Pro 14",
    "description": "Apple MacBook Pro 14 — a quality electronics product from Apple, offering excellent value and reliable everyday performance.",
    "category": "electronics",
    "price": 1999.99,
    "discountPercentage": 10.5,
    "rating": 4.57,
    "stock": 83,
    "tags": [
      "electronics",
      "laptops"
    ],
    "brand": "Apple",
    "sku": "JMD1296",
    "weight": 5.3,
    "dimensions": {
      "width": 11.17,
      "height": 13.43,
      "depth": 23.01
    },
    "warrantyInformation": "3 months warranty",
    "shippingInformation": "Ships in 1 week",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 5,
        "comment": "Very satisfied!",
        "date": "2024-05-18T08:56:21.618Z",
        "reviewerName": "Scarlett Wright",
        "reviewerEmail": "scarlett.wright@example.com"
      },
      {
        "rating": 3,
        "comment": "Great quality!",
        "date": "2024-05-21T08:56:21.618Z",
        "reviewerName": "Liam Smith",
        "reviewerEmail": "liam.smith@example.com"
      }
    ],
    "returnPolicy": "60 days return policy",
    "minimumOrderQuantity": 9,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000009876536",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 10,
    "title": "Dell XPS 13 Laptop",
    "description": "Dell XPS 13 Laptop — a quality electronics product from Dell, offering excellent value and reliable everyday performance.",
    "category": "electronics",
    "price": 1299.99,
    "discountPercentage": 12,
    "rating": 4.21,
    "stock": 47,
    "tags": [
      "electronics",
      "laptops"
    ],
    "brand": "Dell",
    "sku": "RAJ1333",
    "weight": 8.4,
    "dimensions": {
      "width": 18.17,
      "height": 24.43,
      "depth": 6.01
    },
    "warrantyInformation": "6 months warranty",
    "shippingInformation": "Ships in 1 month",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 3,
        "comment": "Would buy again!",
        "date": "2024-05-19T08:56:21.618Z",
        "reviewerName": "Liam Smith",
        "reviewerEmail": "liam.smith@example.com"
      },
      {
        "rating": 4,
        "comment": "Exactly as described.",
        "date": "2024-05-22T08:56:21.618Z",
        "reviewerName": "Emma Miller",
        "reviewerEmail": "emma.miller@example.com"
      },
      {
        "rating": 5,
        "comment": "Not as described!",
        "date": "2024-05-25T08:56:21.618Z",
        "reviewerName": "Olivia Davis",
        "reviewerEmail": "olivia.davis@example.com"
      }
    ],
    "returnPolicy": "No return policy",
    "minimumOrderQuantity": 10,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000011111103",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 11,
    "title": "iPhone 15 Pro",
    "description": "iPhone 15 Pro — a quality electronics product from Apple, offering excellent value and reliable everyday performance.",
    "category": "electronics",
    "price": 1099.99,
    "discountPercentage": 8.25,
    "rating": 4.71,
    "stock": 120,
    "tags": [
      "electronics",
      "smartphones"
    ],
    "brand": "Apple",
    "sku": "YPP1370",
    "weight": 11,
    "dimensions": {
      "width": 25.17,
      "height": 15.43,
      "depth": 11.01
    },
    "warrantyInformation": "1 year warranty",
    "shippingInformation": "Ships in 1 day",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 4,
        "comment": "Not as described!",
        "date": "2024-05-20T08:56:21.618Z",
        "reviewerName": "Emma Miller",
        "reviewerEmail": "emma.miller@example.com"
      },
      {
        "rating": 5,
        "comment": "Very happy with my purchase!",
        "date": "2024-05-23T08:56:21.618Z",
        "reviewerName": "Olivia Davis",
        "reviewerEmail": "olivia.davis@example.com"
      }
    ],
    "returnPolicy": "7 days return policy",
    "minimumOrderQuantity": 1,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000012345670",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 12,
    "title": "Samsung Galaxy S24",
    "description": "Samsung Galaxy S24 — a quality electronics product from Samsung, offering excellent value and reliable everyday performance.",
    "category": "electronics",
    "price": 999.99,
    "discountPercentage": 11.7,
    "rating": 4.44,
    "stock": 65,
    "tags": [
      "electronics",
      "smartphones"
    ],
    "brand": "Samsung",
    "sku": "FCU1407",
    "weight": 14.1,
    "dimensions": {
      "width": 7.17,
      "height": 6.43,
      "depth": 16.01
    },
    "warrantyInformation": "2 year warranty",
    "shippingInformation": "Ships in 2 days",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 5,
        "comment": "Excellent value for money.",
        "date": "2024-05-21T08:56:21.618Z",
        "reviewerName": "Olivia Davis",
        "reviewerEmail": "olivia.davis@example.com"
      },
      {
        "rating": 3,
        "comment": "Fast shipping and well packaged.",
        "date": "2024-05-24T08:56:21.618Z",
        "reviewerName": "John Doe",
        "reviewerEmail": "john.doe@example.com"
      },
      {
        "rating": 4,
        "comment": "Very satisfied!",
        "date": "2024-05-27T08:56:21.618Z",
        "reviewerName": "Nolan Gonzalez",
        "reviewerEmail": "nolan.gonzalez@example.com"
      }
    ],
    "returnPolicy": "14 days return policy",
    "minimumOrderQuantity": 2,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000013580237",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 13,
    "title": "Sony WH-1000XM5 Headphones",
    "description": "Sony WH-1000XM5 Headphones — a quality electronics product from Sony, offering excellent value and reliable everyday performance.",
    "category": "electronics",
    "price": 349.99,
    "discountPercentage": 9.9,
    "rating": 4.82,
    "stock": 210,
    "tags": [
      "electronics",
      "audio"
    ],
    "brand": "Sony",
    "sku": "NRZ1444",
    "weight": 17.2,
    "dimensions": {
      "width": 14.17,
      "height": 17.43,
      "depth": 21.01
    },
    "warrantyInformation": "1 week warranty",
    "shippingInformation": "Ships in 3-5 business days",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 3,
        "comment": "Very satisfied!",
        "date": "2024-05-22T08:56:21.618Z",
        "reviewerName": "John Doe",
        "reviewerEmail": "john.doe@example.com"
      },
      {
        "rating": 4,
        "comment": "Great quality!",
        "date": "2024-05-25T08:56:21.618Z",
        "reviewerName": "Nolan Gonzalez",
        "reviewerEmail": "nolan.gonzalez@example.com"
      }
    ],
    "returnPolicy": "30 days return policy",
    "minimumOrderQuantity": 3,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000014814804",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 14,
    "title": "Canon EOS R6 Camera",
    "description": "Canon EOS R6 Camera — a quality electronics product from Canon, offering excellent value and reliable everyday performance.",
    "category": "electronics",
    "price": 2499.99,
    "discountPercentage": 6.4,
    "rating": 4.68,
    "stock": 22,
    "tags": [
      "electronics",
      "cameras"
    ],
    "brand": "Canon",
    "sku": "VEE1481",
    "weight": 20.3,
    "dimensions": {
      "width": 21.17,
      "height": 8.43,
      "depth": 26.01
    },
    "warrantyInformation": "1 month warranty",
    "shippingInformation": "Ships in 1 week",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 4,
        "comment": "Would buy again!",
        "date": "2024-05-23T08:56:21.618Z",
        "reviewerName": "Nolan Gonzalez",
        "reviewerEmail": "nolan.gonzalez@example.com"
      },
      {
        "rating": 5,
        "comment": "Exactly as described.",
        "date": "2024-05-26T08:56:21.618Z",
        "reviewerName": "Scarlett Wright",
        "reviewerEmail": "scarlett.wright@example.com"
      },
      {
        "rating": 3,
        "comment": "Not as described!",
        "date": "2024-05-11T08:56:21.618Z",
        "reviewerName": "Liam Smith",
        "reviewerEmail": "liam.smith@example.com"
      }
    ],
    "returnPolicy": "60 days return policy",
    "minimumOrderQuantity": 4,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000016049371",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 15,
    "title": "Logitech MX Master 3S",
    "description": "Logitech MX Master 3S — a quality electronics product from Logitech, offering excellent value and reliable everyday performance.",
    "category": "electronics",
    "price": 99.99,
    "discountPercentage": 14.2,
    "rating": 4.75,
    "stock": 340,
    "tags": [
      "electronics",
      "accessories"
    ],
    "brand": "Logitech",
    "sku": "CTK1518",
    "weight": 3.4,
    "dimensions": {
      "width": 28.17,
      "height": 19.43,
      "depth": 9.01
    },
    "warrantyInformation": "3 months warranty",
    "shippingInformation": "Ships in 1 month",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 5,
        "comment": "Not as described!",
        "date": "2024-05-24T08:56:21.618Z",
        "reviewerName": "Scarlett Wright",
        "reviewerEmail": "scarlett.wright@example.com"
      },
      {
        "rating": 3,
        "comment": "Very happy with my purchase!",
        "date": "2024-05-27T08:56:21.618Z",
        "reviewerName": "Liam Smith",
        "reviewerEmail": "liam.smith@example.com"
      }
    ],
    "returnPolicy": "No return policy",
    "minimumOrderQuantity": 5,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000017283938",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 16,
    "title": "Anker Power Bank 20000mAh",
    "description": "Anker Power Bank 20000mAh — a quality electronics product from Anker, offering excellent value and reliable everyday performance.",
    "category": "electronics",
    "price": 45.99,
    "discountPercentage": 20,
    "rating": 4.53,
    "stock": 500,
    "tags": [
      "electronics",
      "accessories"
    ],
    "brand": "Anker",
    "sku": "KGQ1555",
    "weight": 6,
    "dimensions": {
      "width": 10.17,
      "height": 10.43,
      "depth": 14.01
    },
    "warrantyInformation": "6 months warranty",
    "shippingInformation": "Ships in 1 day",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 3,
        "comment": "Excellent value for money.",
        "date": "2024-05-25T08:56:21.618Z",
        "reviewerName": "Liam Smith",
        "reviewerEmail": "liam.smith@example.com"
      },
      {
        "rating": 4,
        "comment": "Fast shipping and well packaged.",
        "date": "2024-05-10T08:56:21.618Z",
        "reviewerName": "Emma Miller",
        "reviewerEmail": "emma.miller@example.com"
      },
      {
        "rating": 5,
        "comment": "Very satisfied!",
        "date": "2024-05-13T08:56:21.618Z",
        "reviewerName": "Olivia Davis",
        "reviewerEmail": "olivia.davis@example.com"
      }
    ],
    "returnPolicy": "7 days return policy",
    "minimumOrderQuantity": 6,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000018518505",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 17,
    "title": "Amazon Echo Dot 5th Gen",
    "description": "Amazon Echo Dot 5th Gen — a quality electronics product from Amazon, offering excellent value and reliable everyday performance.",
    "category": "electronics",
    "price": 49.99,
    "discountPercentage": 25,
    "rating": 4.36,
    "stock": 275,
    "tags": [
      "electronics",
      "smart home"
    ],
    "brand": "Amazon",
    "sku": "SVV1592",
    "weight": 9.1,
    "dimensions": {
      "width": 17.17,
      "height": 21.43,
      "depth": 19.01
    },
    "warrantyInformation": "1 year warranty",
    "shippingInformation": "Ships in 2 days",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 4,
        "comment": "Very satisfied!",
        "date": "2024-05-26T08:56:21.618Z",
        "reviewerName": "Emma Miller",
        "reviewerEmail": "emma.miller@example.com"
      },
      {
        "rating": 5,
        "comment": "Great quality!",
        "date": "2024-05-11T08:56:21.618Z",
        "reviewerName": "Olivia Davis",
        "reviewerEmail": "olivia.davis@example.com"
      }
    ],
    "returnPolicy": "14 days return policy",
    "minimumOrderQuantity": 7,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000019753072",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 18,
    "title": "Kindle Paperwhite",
    "description": "Kindle Paperwhite — a quality electronics product from Amazon, offering excellent value and reliable everyday performance.",
    "category": "electronics",
    "price": 139.99,
    "discountPercentage": 7.8,
    "rating": 4.62,
    "stock": 88,
    "tags": [
      "electronics",
      "e-readers"
    ],
    "brand": "Amazon",
    "sku": "ZJA1629",
    "weight": 12.2,
    "dimensions": {
      "width": 24.17,
      "height": 12.43,
      "depth": 24.01
    },
    "warrantyInformation": "2 year warranty",
    "shippingInformation": "Ships in 3-5 business days",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 5,
        "comment": "Would buy again!",
        "date": "2024-05-27T08:56:21.618Z",
        "reviewerName": "Olivia Davis",
        "reviewerEmail": "olivia.davis@example.com"
      },
      {
        "rating": 3,
        "comment": "Exactly as described.",
        "date": "2024-05-12T08:56:21.618Z",
        "reviewerName": "John Doe",
        "reviewerEmail": "john.doe@example.com"
      },
      {
        "rating": 4,
        "comment": "Not as described!",
        "date": "2024-05-15T08:56:21.618Z",
        "reviewerName": "Nolan Gonzalez",
        "reviewerEmail": "nolan.gonzalez@example.com"
      }
    ],
    "returnPolicy": "30 days return policy",
    "minimumOrderQuantity": 8,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000020987639",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 19,
    "title": "Classic Denim Jacket",
    "description": "Classic Denim Jacket — a quality fashion product from Levi's, offering excellent value and reliable everyday performance.",
    "category": "fashion",
    "price": 89.99,
    "discountPercentage": 12.5,
    "rating": 4.4,
    "stock": 130,
    "tags": [
      "fashion",
      "jackets"
    ],
    "brand": "Levi's",
    "sku": "GXF1666",
    "weight": 15.3,
    "dimensions": {
      "width": 6.17,
      "height": 23.43,
      "depth": 7.01
    },
    "warrantyInformation": "1 week warranty",
    "shippingInformation": "Ships in 1 week",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 3,
        "comment": "Not as described!",
        "date": "2024-05-10T08:56:21.618Z",
        "reviewerName": "John Doe",
        "reviewerEmail": "john.doe@example.com"
      },
      {
        "rating": 4,
        "comment": "Very happy with my purchase!",
        "date": "2024-05-13T08:56:21.618Z",
        "reviewerName": "Nolan Gonzalez",
        "reviewerEmail": "nolan.gonzalez@example.com"
      }
    ],
    "returnPolicy": "60 days return policy",
    "minimumOrderQuantity": 9,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000022222206",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 20,
    "title": "Men's Cotton T-Shirt",
    "description": "Men's Cotton T-Shirt — a quality fashion product from Uniqlo, offering excellent value and reliable everyday performance.",
    "category": "fashion",
    "price": 19.99,
    "discountPercentage": 5,
    "rating": 4.15,
    "stock": 400,
    "tags": [
      "fashion",
      "tops"
    ],
    "brand": "Uniqlo",
    "sku": "PLL1703",
    "weight": 18.4,
    "dimensions": {
      "width": 13.17,
      "height": 14.43,
      "depth": 12.01
    },
    "warrantyInformation": "1 month warranty",
    "shippingInformation": "Ships in 1 month",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 4,
        "comment": "Excellent value for money.",
        "date": "2024-05-11T08:56:21.618Z",
        "reviewerName": "Nolan Gonzalez",
        "reviewerEmail": "nolan.gonzalez@example.com"
      },
      {
        "rating": 5,
        "comment": "Fast shipping and well packaged.",
        "date": "2024-05-14T08:56:21.618Z",
        "reviewerName": "Scarlett Wright",
        "reviewerEmail": "scarlett.wright@example.com"
      },
      {
        "rating": 3,
        "comment": "Very satisfied!",
        "date": "2024-05-17T08:56:21.618Z",
        "reviewerName": "Liam Smith",
        "reviewerEmail": "liam.smith@example.com"
      }
    ],
    "returnPolicy": "No return policy",
    "minimumOrderQuantity": 10,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000023456773",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 21,
    "title": "Women's Summer Dress",
    "description": "Women's Summer Dress — a quality fashion product from Zara, offering excellent value and reliable everyday performance.",
    "category": "fashion",
    "price": 59.99,
    "discountPercentage": 22.3,
    "rating": 4.28,
    "stock": 95,
    "tags": [
      "fashion",
      "dresses"
    ],
    "brand": "Zara",
    "sku": "WZR1740",
    "weight": 1,
    "dimensions": {
      "width": 20.17,
      "height": 5.43,
      "depth": 17.01
    },
    "warrantyInformation": "3 months warranty",
    "shippingInformation": "Ships in 1 day",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 5,
        "comment": "Very satisfied!",
        "date": "2024-05-12T08:56:21.618Z",
        "reviewerName": "Scarlett Wright",
        "reviewerEmail": "scarlett.wright@example.com"
      },
      {
        "rating": 3,
        "comment": "Great quality!",
        "date": "2024-05-15T08:56:21.618Z",
        "reviewerName": "Liam Smith",
        "reviewerEmail": "liam.smith@example.com"
      }
    ],
    "returnPolicy": "7 days return policy",
    "minimumOrderQuantity": 1,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000024691340",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 22,
    "title": "Leather Ankle Boots",
    "description": "Leather Ankle Boots — a quality fashion product from Timberland, offering excellent value and reliable everyday performance.",
    "category": "fashion",
    "price": 149.99,
    "discountPercentage": 15.6,
    "rating": 4.55,
    "stock": 60,
    "tags": [
      "fashion",
      "shoes"
    ],
    "brand": "Timberland",
    "sku": "DNW1777",
    "weight": 4.1,
    "dimensions": {
      "width": 27.17,
      "height": 16.43,
      "depth": 22.01
    },
    "warrantyInformation": "6 months warranty",
    "shippingInformation": "Ships in 2 days",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 3,
        "comment": "Would buy again!",
        "date": "2024-05-13T08:56:21.618Z",
        "reviewerName": "Liam Smith",
        "reviewerEmail": "liam.smith@example.com"
      },
      {
        "rating": 4,
        "comment": "Exactly as described.",
        "date": "2024-05-16T08:56:21.618Z",
        "reviewerName": "Emma Miller",
        "reviewerEmail": "emma.miller@example.com"
      },
      {
        "rating": 5,
        "comment": "Not as described!",
        "date": "2024-05-19T08:56:21.618Z",
        "reviewerName": "Olivia Davis",
        "reviewerEmail": "olivia.davis@example.com"
      }
    ],
    "returnPolicy": "14 days return policy",
    "minimumOrderQuantity": 2,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000025925907",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 23,
    "title": "Running Sneakers",
    "description": "Running Sneakers — a quality fashion product from Nike, offering excellent value and reliable everyday performance.",
    "category": "fashion",
    "price": 119.99,
    "discountPercentage": 10,
    "rating": 4.66,
    "stock": 220,
    "tags": [
      "fashion",
      "shoes"
    ],
    "brand": "Nike",
    "sku": "LBB1814",
    "weight": 7.2,
    "dimensions": {
      "width": 9.17,
      "height": 7.43,
      "depth": 5.01
    },
    "warrantyInformation": "1 year warranty",
    "shippingInformation": "Ships in 3-5 business days",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 4,
        "comment": "Not as described!",
        "date": "2024-05-14T08:56:21.618Z",
        "reviewerName": "Emma Miller",
        "reviewerEmail": "emma.miller@example.com"
      },
      {
        "rating": 5,
        "comment": "Very happy with my purchase!",
        "date": "2024-05-17T08:56:21.618Z",
        "reviewerName": "Olivia Davis",
        "reviewerEmail": "olivia.davis@example.com"
      }
    ],
    "returnPolicy": "30 days return policy",
    "minimumOrderQuantity": 3,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000027160474",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 24,
    "title": "Aviator Sunglasses",
    "description": "Aviator Sunglasses — a quality fashion product from Ray-Ban, offering excellent value and reliable everyday performance.",
    "category": "fashion",
    "price": 154.99,
    "discountPercentage": 8.9,
    "rating": 4.49,
    "stock": 140,
    "tags": [
      "fashion",
      "accessories"
    ],
    "brand": "Ray-Ban",
    "sku": "TQG1851",
    "weight": 10.3,
    "dimensions": {
      "width": 16.17,
      "height": 18.43,
      "depth": 10.01
    },
    "warrantyInformation": "2 year warranty",
    "shippingInformation": "Ships in 1 week",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 5,
        "comment": "Excellent value for money.",
        "date": "2024-05-15T08:56:21.618Z",
        "reviewerName": "Olivia Davis",
        "reviewerEmail": "olivia.davis@example.com"
      },
      {
        "rating": 3,
        "comment": "Fast shipping and well packaged.",
        "date": "2024-05-18T08:56:21.618Z",
        "reviewerName": "John Doe",
        "reviewerEmail": "john.doe@example.com"
      },
      {
        "rating": 4,
        "comment": "Very satisfied!",
        "date": "2024-05-21T08:56:21.618Z",
        "reviewerName": "Nolan Gonzalez",
        "reviewerEmail": "nolan.gonzalez@example.com"
      }
    ],
    "returnPolicy": "60 days return policy",
    "minimumOrderQuantity": 4,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000028395041",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 25,
    "title": "Leather Crossbody Bag",
    "description": "Leather Crossbody Bag — a quality fashion product from Michael Kors, offering excellent value and reliable everyday performance.",
    "category": "fashion",
    "price": 199.99,
    "discountPercentage": 17.2,
    "rating": 4.33,
    "stock": 75,
    "tags": [
      "fashion",
      "bags"
    ],
    "brand": "Michael Kors",
    "sku": "ADM1888",
    "weight": 13.4,
    "dimensions": {
      "width": 23.17,
      "height": 9.43,
      "depth": 15.01
    },
    "warrantyInformation": "1 week warranty",
    "shippingInformation": "Ships in 1 month",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 3,
        "comment": "Very satisfied!",
        "date": "2024-05-16T08:56:21.618Z",
        "reviewerName": "John Doe",
        "reviewerEmail": "john.doe@example.com"
      },
      {
        "rating": 4,
        "comment": "Great quality!",
        "date": "2024-05-19T08:56:21.618Z",
        "reviewerName": "Nolan Gonzalez",
        "reviewerEmail": "nolan.gonzalez@example.com"
      }
    ],
    "returnPolicy": "No return policy",
    "minimumOrderQuantity": 5,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000029629608",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 26,
    "title": "Wool Blend Overcoat",
    "description": "Wool Blend Overcoat — a quality fashion product from H&M, offering excellent value and reliable everyday performance.",
    "category": "fashion",
    "price": 129.99,
    "discountPercentage": 20,
    "rating": 4.11,
    "stock": 48,
    "tags": [
      "fashion",
      "coats"
    ],
    "brand": "H&M",
    "sku": "HSS1925",
    "weight": 16,
    "dimensions": {
      "width": 5.17,
      "height": 20.43,
      "depth": 20.01
    },
    "warrantyInformation": "1 month warranty",
    "shippingInformation": "Ships in 1 day",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 4,
        "comment": "Would buy again!",
        "date": "2024-05-17T08:56:21.618Z",
        "reviewerName": "Nolan Gonzalez",
        "reviewerEmail": "nolan.gonzalez@example.com"
      },
      {
        "rating": 5,
        "comment": "Exactly as described.",
        "date": "2024-05-20T08:56:21.618Z",
        "reviewerName": "Scarlett Wright",
        "reviewerEmail": "scarlett.wright@example.com"
      },
      {
        "rating": 3,
        "comment": "Not as described!",
        "date": "2024-05-23T08:56:21.618Z",
        "reviewerName": "Liam Smith",
        "reviewerEmail": "liam.smith@example.com"
      }
    ],
    "returnPolicy": "7 days return policy",
    "minimumOrderQuantity": 6,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000030864175",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 27,
    "title": "Silk Scarf",
    "description": "Silk Scarf — a quality fashion product from Hermès, offering excellent value and reliable everyday performance.",
    "category": "fashion",
    "price": 89.99,
    "discountPercentage": 4.5,
    "rating": 4.7,
    "stock": 33,
    "tags": [
      "fashion",
      "accessories"
    ],
    "brand": "Hermès",
    "sku": "QFX1962",
    "weight": 19.1,
    "dimensions": {
      "width": 12.17,
      "height": 11.43,
      "depth": 25.01
    },
    "warrantyInformation": "3 months warranty",
    "shippingInformation": "Ships in 2 days",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 5,
        "comment": "Not as described!",
        "date": "2024-05-18T08:56:21.618Z",
        "reviewerName": "Scarlett Wright",
        "reviewerEmail": "scarlett.wright@example.com"
      },
      {
        "rating": 3,
        "comment": "Very happy with my purchase!",
        "date": "2024-05-21T08:56:21.618Z",
        "reviewerName": "Liam Smith",
        "reviewerEmail": "liam.smith@example.com"
      }
    ],
    "returnPolicy": "14 days return policy",
    "minimumOrderQuantity": 7,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000032098742",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 28,
    "title": "Slim Fit Chinos",
    "description": "Slim Fit Chinos — a quality fashion product from Dockers, offering excellent value and reliable everyday performance.",
    "category": "fashion",
    "price": 49.99,
    "discountPercentage": 9.3,
    "rating": 4.05,
    "stock": 160,
    "tags": [
      "fashion",
      "trousers"
    ],
    "brand": "Dockers",
    "sku": "XUC1999",
    "weight": 2.2,
    "dimensions": {
      "width": 19.17,
      "height": 22.43,
      "depth": 8.01
    },
    "warrantyInformation": "6 months warranty",
    "shippingInformation": "Ships in 3-5 business days",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 3,
        "comment": "Excellent value for money.",
        "date": "2024-05-19T08:56:21.618Z",
        "reviewerName": "Liam Smith",
        "reviewerEmail": "liam.smith@example.com"
      },
      {
        "rating": 4,
        "comment": "Fast shipping and well packaged.",
        "date": "2024-05-22T08:56:21.618Z",
        "reviewerName": "Emma Miller",
        "reviewerEmail": "emma.miller@example.com"
      },
      {
        "rating": 5,
        "comment": "Very satisfied!",
        "date": "2024-05-25T08:56:21.618Z",
        "reviewerName": "Olivia Davis",
        "reviewerEmail": "olivia.davis@example.com"
      }
    ],
    "returnPolicy": "30 days return policy",
    "minimumOrderQuantity": 8,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000033333309",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 29,
    "title": "Analog Wrist Watch",
    "description": "Analog Wrist Watch — a quality fashion product from Fossil, offering excellent value and reliable everyday performance.",
    "category": "fashion",
    "price": 129.99,
    "discountPercentage": 13.8,
    "rating": 4.52,
    "stock": 90,
    "tags": [
      "fashion",
      "watches"
    ],
    "brand": "Fossil",
    "sku": "EHH2036",
    "weight": 5.3,
    "dimensions": {
      "width": 26.17,
      "height": 13.43,
      "depth": 13.01
    },
    "warrantyInformation": "1 year warranty",
    "shippingInformation": "Ships in 1 week",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 4,
        "comment": "Very satisfied!",
        "date": "2024-05-20T08:56:21.618Z",
        "reviewerName": "Emma Miller",
        "reviewerEmail": "emma.miller@example.com"
      },
      {
        "rating": 5,
        "comment": "Great quality!",
        "date": "2024-05-23T08:56:21.618Z",
        "reviewerName": "Olivia Davis",
        "reviewerEmail": "olivia.davis@example.com"
      }
    ],
    "returnPolicy": "60 days return policy",
    "minimumOrderQuantity": 9,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000034567876",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 30,
    "title": "Gold Hoop Earrings",
    "description": "Gold Hoop Earrings — a quality fashion product from Pandora, offering excellent value and reliable everyday performance.",
    "category": "fashion",
    "price": 79.99,
    "discountPercentage": 6.6,
    "rating": 4.6,
    "stock": 110,
    "tags": [
      "fashion",
      "jewellery"
    ],
    "brand": "Pandora",
    "sku": "MWN2073",
    "weight": 8.4,
    "dimensions": {
      "width": 8.17,
      "height": 24.43,
      "depth": 18.01
    },
    "warrantyInformation": "2 year warranty",
    "shippingInformation": "Ships in 1 month",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 5,
        "comment": "Would buy again!",
        "date": "2024-05-21T08:56:21.618Z",
        "reviewerName": "Olivia Davis",
        "reviewerEmail": "olivia.davis@example.com"
      },
      {
        "rating": 3,
        "comment": "Exactly as described.",
        "date": "2024-05-24T08:56:21.618Z",
        "reviewerName": "John Doe",
        "reviewerEmail": "john.doe@example.com"
      },
      {
        "rating": 4,
        "comment": "Not as described!",
        "date": "2024-05-27T08:56:21.618Z",
        "reviewerName": "Nolan Gonzalez",
        "reviewerEmail": "nolan.gonzalez@example.com"
      }
    ],
    "returnPolicy": "No return policy",
    "minimumOrderQuantity": 10,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000035802443",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 31,
    "title": "Modern 3-Seater Sofa",
    "description": "Modern 3-Seater Sofa — a quality home product from IKEA, offering excellent value and reliable everyday performance.",
    "category": "home",
    "price": 599.99,
    "discountPercentage": 14,
    "rating": 4.38,
    "stock": 25,
    "tags": [
      "home",
      "furniture"
    ],
    "brand": "IKEA",
    "sku": "UKT2110",
    "weight": 11,
    "dimensions": {
      "width": 15.17,
      "height": 15.43,
      "depth": 23.01
    },
    "warrantyInformation": "1 week warranty",
    "shippingInformation": "Ships in 1 day",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 3,
        "comment": "Not as described!",
        "date": "2024-05-22T08:56:21.618Z",
        "reviewerName": "John Doe",
        "reviewerEmail": "john.doe@example.com"
      },
      {
        "rating": 4,
        "comment": "Very happy with my purchase!",
        "date": "2024-05-25T08:56:21.618Z",
        "reviewerName": "Nolan Gonzalez",
        "reviewerEmail": "nolan.gonzalez@example.com"
      }
    ],
    "returnPolicy": "7 days return policy",
    "minimumOrderQuantity": 1,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000037037010",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 32,
    "title": "Scented Soy Candle",
    "description": "Scented Soy Candle — a quality home product from Yankee Candle, offering excellent value and reliable everyday performance.",
    "category": "home",
    "price": 24.99,
    "discountPercentage": 11.1,
    "rating": 4.47,
    "stock": 300,
    "tags": [
      "home",
      "decoration"
    ],
    "brand": "Yankee Candle",
    "sku": "BYY2147",
    "weight": 14.1,
    "dimensions": {
      "width": 22.17,
      "height": 6.43,
      "depth": 6.01
    },
    "warrantyInformation": "1 month warranty",
    "shippingInformation": "Ships in 2 days",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 4,
        "comment": "Excellent value for money.",
        "date": "2024-05-23T08:56:21.618Z",
        "reviewerName": "Nolan Gonzalez",
        "reviewerEmail": "nolan.gonzalez@example.com"
      },
      {
        "rating": 5,
        "comment": "Fast shipping and well packaged.",
        "date": "2024-05-26T08:56:21.618Z",
        "reviewerName": "Scarlett Wright",
        "reviewerEmail": "scarlett.wright@example.com"
      },
      {
        "rating": 3,
        "comment": "Very satisfied!",
        "date": "2024-05-11T08:56:21.618Z",
        "reviewerName": "Liam Smith",
        "reviewerEmail": "liam.smith@example.com"
      }
    ],
    "returnPolicy": "14 days return policy",
    "minimumOrderQuantity": 2,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000038271577",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 33,
    "title": "Ceramic Dinnerware Set",
    "description": "Ceramic Dinnerware Set — a quality home product from Corelle, offering excellent value and reliable everyday performance.",
    "category": "home",
    "price": 89.99,
    "discountPercentage": 9,
    "rating": 4.29,
    "stock": 70,
    "tags": [
      "home",
      "kitchen"
    ],
    "brand": "Corelle",
    "sku": "JMD2184",
    "weight": 17.2,
    "dimensions": {
      "width": 29.17,
      "height": 17.43,
      "depth": 11.01
    },
    "warrantyInformation": "3 months warranty",
    "shippingInformation": "Ships in 3-5 business days",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 5,
        "comment": "Very satisfied!",
        "date": "2024-05-24T08:56:21.618Z",
        "reviewerName": "Scarlett Wright",
        "reviewerEmail": "scarlett.wright@example.com"
      },
      {
        "rating": 3,
        "comment": "Great quality!",
        "date": "2024-05-27T08:56:21.618Z",
        "reviewerName": "Liam Smith",
        "reviewerEmail": "liam.smith@example.com"
      }
    ],
    "returnPolicy": "30 days return policy",
    "minimumOrderQuantity": 3,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000039506144",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 34,
    "title": "Memory Foam Pillow",
    "description": "Memory Foam Pillow — a quality home product from Tempur, offering excellent value and reliable everyday performance.",
    "category": "home",
    "price": 59.99,
    "discountPercentage": 16.5,
    "rating": 4.58,
    "stock": 180,
    "tags": [
      "home",
      "bedding"
    ],
    "brand": "Tempur",
    "sku": "RAJ2221",
    "weight": 20.3,
    "dimensions": {
      "width": 11.17,
      "height": 8.43,
      "depth": 16.01
    },
    "warrantyInformation": "6 months warranty",
    "shippingInformation": "Ships in 1 week",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 3,
        "comment": "Would buy again!",
        "date": "2024-05-25T08:56:21.618Z",
        "reviewerName": "Liam Smith",
        "reviewerEmail": "liam.smith@example.com"
      },
      {
        "rating": 4,
        "comment": "Exactly as described.",
        "date": "2024-05-10T08:56:21.618Z",
        "reviewerName": "Emma Miller",
        "reviewerEmail": "emma.miller@example.com"
      },
      {
        "rating": 5,
        "comment": "Not as described!",
        "date": "2024-05-13T08:56:21.618Z",
        "reviewerName": "Olivia Davis",
        "reviewerEmail": "olivia.davis@example.com"
      }
    ],
    "returnPolicy": "60 days return policy",
    "minimumOrderQuantity": 4,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000040740711",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 35,
    "title": "Stainless Steel Cookware Set",
    "description": "Stainless Steel Cookware Set — a quality home product from Tefal, offering excellent value and reliable everyday performance.",
    "category": "home",
    "price": 199.99,
    "discountPercentage": 12.7,
    "rating": 4.41,
    "stock": 55,
    "tags": [
      "home",
      "kitchen"
    ],
    "brand": "Tefal",
    "sku": "YPP2258",
    "weight": 3.4,
    "dimensions": {
      "width": 18.17,
      "height": 19.43,
      "depth": 21.01
    },
    "warrantyInformation": "1 year warranty",
    "shippingInformation": "Ships in 1 month",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 4,
        "comment": "Not as described!",
        "date": "2024-05-26T08:56:21.618Z",
        "reviewerName": "Emma Miller",
        "reviewerEmail": "emma.miller@example.com"
      },
      {
        "rating": 5,
        "comment": "Very happy with my purchase!",
        "date": "2024-05-11T08:56:21.618Z",
        "reviewerName": "Olivia Davis",
        "reviewerEmail": "olivia.davis@example.com"
      }
    ],
    "returnPolicy": "No return policy",
    "minimumOrderQuantity": 5,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000041975278",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 36,
    "title": "LED Desk Lamp",
    "description": "LED Desk Lamp — a quality home product from Philips, offering excellent value and reliable everyday performance.",
    "category": "home",
    "price": 39.99,
    "discountPercentage": 18,
    "rating": 4.34,
    "stock": 240,
    "tags": [
      "home",
      "lighting"
    ],
    "brand": "Philips",
    "sku": "FCU2295",
    "weight": 6,
    "dimensions": {
      "width": 25.17,
      "height": 10.43,
      "depth": 26.01
    },
    "warrantyInformation": "2 year warranty",
    "shippingInformation": "Ships in 1 day",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 5,
        "comment": "Excellent value for money.",
        "date": "2024-05-27T08:56:21.618Z",
        "reviewerName": "Olivia Davis",
        "reviewerEmail": "olivia.davis@example.com"
      },
      {
        "rating": 3,
        "comment": "Fast shipping and well packaged.",
        "date": "2024-05-12T08:56:21.618Z",
        "reviewerName": "John Doe",
        "reviewerEmail": "john.doe@example.com"
      },
      {
        "rating": 4,
        "comment": "Very satisfied!",
        "date": "2024-05-15T08:56:21.618Z",
        "reviewerName": "Nolan Gonzalez",
        "reviewerEmail": "nolan.gonzalez@example.com"
      }
    ],
    "returnPolicy": "7 days return policy",
    "minimumOrderQuantity": 6,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000043209845",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 37,
    "title": "Woven Throw Blanket",
    "description": "Woven Throw Blanket — a quality home product from Bearaby, offering excellent value and reliable everyday performance.",
    "category": "home",
    "price": 79.99,
    "discountPercentage": 8.4,
    "rating": 4.62,
    "stock": 95,
    "tags": [
      "home",
      "decoration"
    ],
    "brand": "Bearaby",
    "sku": "NRZ2332",
    "weight": 9.1,
    "dimensions": {
      "width": 7.17,
      "height": 21.43,
      "depth": 9.01
    },
    "warrantyInformation": "1 week warranty",
    "shippingInformation": "Ships in 2 days",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 3,
        "comment": "Very satisfied!",
        "date": "2024-05-10T08:56:21.618Z",
        "reviewerName": "John Doe",
        "reviewerEmail": "john.doe@example.com"
      },
      {
        "rating": 4,
        "comment": "Great quality!",
        "date": "2024-05-13T08:56:21.618Z",
        "reviewerName": "Nolan Gonzalez",
        "reviewerEmail": "nolan.gonzalez@example.com"
      }
    ],
    "returnPolicy": "14 days return policy",
    "minimumOrderQuantity": 7,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000044444412",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 38,
    "title": "Robot Vacuum Cleaner",
    "description": "Robot Vacuum Cleaner — a quality home product from iRobot, offering excellent value and reliable everyday performance.",
    "category": "home",
    "price": 449.99,
    "discountPercentage": 10.9,
    "rating": 4.5,
    "stock": 40,
    "tags": [
      "home",
      "appliances"
    ],
    "brand": "iRobot",
    "sku": "VEE2369",
    "weight": 12.2,
    "dimensions": {
      "width": 14.17,
      "height": 12.43,
      "depth": 14.01
    },
    "warrantyInformation": "1 month warranty",
    "shippingInformation": "Ships in 3-5 business days",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 4,
        "comment": "Would buy again!",
        "date": "2024-05-11T08:56:21.618Z",
        "reviewerName": "Nolan Gonzalez",
        "reviewerEmail": "nolan.gonzalez@example.com"
      },
      {
        "rating": 5,
        "comment": "Exactly as described.",
        "date": "2024-05-14T08:56:21.618Z",
        "reviewerName": "Scarlett Wright",
        "reviewerEmail": "scarlett.wright@example.com"
      },
      {
        "rating": 3,
        "comment": "Not as described!",
        "date": "2024-05-17T08:56:21.618Z",
        "reviewerName": "Liam Smith",
        "reviewerEmail": "liam.smith@example.com"
      }
    ],
    "returnPolicy": "30 days return policy",
    "minimumOrderQuantity": 8,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000045678979",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 39,
    "title": "Espresso Coffee Machine",
    "description": "Espresso Coffee Machine — a quality home product from De'Longhi, offering excellent value and reliable everyday performance.",
    "category": "home",
    "price": 349.99,
    "discountPercentage": 7.2,
    "rating": 4.63,
    "stock": 62,
    "tags": [
      "home",
      "appliances"
    ],
    "brand": "De'Longhi",
    "sku": "CTK2406",
    "weight": 15.3,
    "dimensions": {
      "width": 21.17,
      "height": 23.43,
      "depth": 19.01
    },
    "warrantyInformation": "3 months warranty",
    "shippingInformation": "Ships in 1 week",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 5,
        "comment": "Not as described!",
        "date": "2024-05-12T08:56:21.618Z",
        "reviewerName": "Scarlett Wright",
        "reviewerEmail": "scarlett.wright@example.com"
      },
      {
        "rating": 3,
        "comment": "Very happy with my purchase!",
        "date": "2024-05-15T08:56:21.618Z",
        "reviewerName": "Liam Smith",
        "reviewerEmail": "liam.smith@example.com"
      }
    ],
    "returnPolicy": "60 days return policy",
    "minimumOrderQuantity": 9,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000046913546",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 40,
    "title": "Indoor Plant Pot Set",
    "description": "Indoor Plant Pot Set — a quality home product from The Sill, offering excellent value and reliable everyday performance.",
    "category": "home",
    "price": 34.99,
    "discountPercentage": 5.5,
    "rating": 4.25,
    "stock": 150,
    "tags": [
      "home",
      "decoration"
    ],
    "brand": "The Sill",
    "sku": "KGQ2443",
    "weight": 18.4,
    "dimensions": {
      "width": 28.17,
      "height": 14.43,
      "depth": 24.01
    },
    "warrantyInformation": "6 months warranty",
    "shippingInformation": "Ships in 1 month",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 3,
        "comment": "Excellent value for money.",
        "date": "2024-05-13T08:56:21.618Z",
        "reviewerName": "Liam Smith",
        "reviewerEmail": "liam.smith@example.com"
      },
      {
        "rating": 4,
        "comment": "Fast shipping and well packaged.",
        "date": "2024-05-16T08:56:21.618Z",
        "reviewerName": "Emma Miller",
        "reviewerEmail": "emma.miller@example.com"
      },
      {
        "rating": 5,
        "comment": "Very satisfied!",
        "date": "2024-05-19T08:56:21.618Z",
        "reviewerName": "Olivia Davis",
        "reviewerEmail": "olivia.davis@example.com"
      }
    ],
    "returnPolicy": "No return policy",
    "minimumOrderQuantity": 10,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000048148113",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 41,
    "title": "Organic Extra Virgin Olive Oil",
    "description": "Organic Extra Virgin Olive Oil — a quality groceries product from Bertolli, offering excellent value and reliable everyday performance.",
    "category": "groceries",
    "price": 15.99,
    "discountPercentage": 3,
    "rating": 4.72,
    "stock": 320,
    "tags": [
      "groceries",
      "pantry"
    ],
    "brand": "Bertolli",
    "sku": "SVV2480",
    "weight": 1,
    "dimensions": {
      "width": 10.17,
      "height": 5.43,
      "depth": 7.01
    },
    "warrantyInformation": "1 year warranty",
    "shippingInformation": "Ships in 1 day",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 4,
        "comment": "Very satisfied!",
        "date": "2024-05-14T08:56:21.618Z",
        "reviewerName": "Emma Miller",
        "reviewerEmail": "emma.miller@example.com"
      },
      {
        "rating": 5,
        "comment": "Great quality!",
        "date": "2024-05-17T08:56:21.618Z",
        "reviewerName": "Olivia Davis",
        "reviewerEmail": "olivia.davis@example.com"
      }
    ],
    "returnPolicy": "7 days return policy",
    "minimumOrderQuantity": 1,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000049382680",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 42,
    "title": "Artisan Dark Chocolate Bar",
    "description": "Artisan Dark Chocolate Bar — a quality groceries product from Lindt, offering excellent value and reliable everyday performance.",
    "category": "groceries",
    "price": 4.99,
    "discountPercentage": 6,
    "rating": 4.8,
    "stock": 500,
    "tags": [
      "groceries",
      "snacks"
    ],
    "brand": "Lindt",
    "sku": "ZJA2517",
    "weight": 4.1,
    "dimensions": {
      "width": 17.17,
      "height": 16.43,
      "depth": 12.01
    },
    "warrantyInformation": "2 year warranty",
    "shippingInformation": "Ships in 2 days",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 5,
        "comment": "Would buy again!",
        "date": "2024-05-15T08:56:21.618Z",
        "reviewerName": "Olivia Davis",
        "reviewerEmail": "olivia.davis@example.com"
      },
      {
        "rating": 3,
        "comment": "Exactly as described.",
        "date": "2024-05-18T08:56:21.618Z",
        "reviewerName": "John Doe",
        "reviewerEmail": "john.doe@example.com"
      },
      {
        "rating": 4,
        "comment": "Not as described!",
        "date": "2024-05-21T08:56:21.618Z",
        "reviewerName": "Nolan Gonzalez",
        "reviewerEmail": "nolan.gonzalez@example.com"
      }
    ],
    "returnPolicy": "14 days return policy",
    "minimumOrderQuantity": 2,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000050617247",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 43,
    "title": "Colombian Ground Coffee",
    "description": "Colombian Ground Coffee — a quality groceries product from Lavazza, offering excellent value and reliable everyday performance.",
    "category": "groceries",
    "price": 12.99,
    "discountPercentage": 8.5,
    "rating": 4.66,
    "stock": 260,
    "tags": [
      "groceries",
      "beverages"
    ],
    "brand": "Lavazza",
    "sku": "GXF2554",
    "weight": 7.2,
    "dimensions": {
      "width": 24.17,
      "height": 7.43,
      "depth": 17.01
    },
    "warrantyInformation": "1 week warranty",
    "shippingInformation": "Ships in 3-5 business days",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 3,
        "comment": "Not as described!",
        "date": "2024-05-16T08:56:21.618Z",
        "reviewerName": "John Doe",
        "reviewerEmail": "john.doe@example.com"
      },
      {
        "rating": 4,
        "comment": "Very happy with my purchase!",
        "date": "2024-05-19T08:56:21.618Z",
        "reviewerName": "Nolan Gonzalez",
        "reviewerEmail": "nolan.gonzalez@example.com"
      }
    ],
    "returnPolicy": "30 days return policy",
    "minimumOrderQuantity": 3,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000051851814",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 44,
    "title": "Organic Green Tea",
    "description": "Organic Green Tea — a quality groceries product from Twinings, offering excellent value and reliable everyday performance.",
    "category": "groceries",
    "price": 8.99,
    "discountPercentage": 4.2,
    "rating": 4.55,
    "stock": 410,
    "tags": [
      "groceries",
      "beverages"
    ],
    "brand": "Twinings",
    "sku": "PLL2591",
    "weight": 10.3,
    "dimensions": {
      "width": 6.17,
      "height": 18.43,
      "depth": 22.01
    },
    "warrantyInformation": "1 month warranty",
    "shippingInformation": "Ships in 1 week",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 4,
        "comment": "Excellent value for money.",
        "date": "2024-05-17T08:56:21.618Z",
        "reviewerName": "Nolan Gonzalez",
        "reviewerEmail": "nolan.gonzalez@example.com"
      },
      {
        "rating": 5,
        "comment": "Fast shipping and well packaged.",
        "date": "2024-05-20T08:56:21.618Z",
        "reviewerName": "Scarlett Wright",
        "reviewerEmail": "scarlett.wright@example.com"
      },
      {
        "rating": 3,
        "comment": "Very satisfied!",
        "date": "2024-05-23T08:56:21.618Z",
        "reviewerName": "Liam Smith",
        "reviewerEmail": "liam.smith@example.com"
      }
    ],
    "returnPolicy": "60 days return policy",
    "minimumOrderQuantity": 4,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000053086381",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 45,
    "title": "Raw Wildflower Honey",
    "description": "Raw Wildflower Honey — a quality groceries product from Nature Nate's, offering excellent value and reliable everyday performance.",
    "category": "groceries",
    "price": 11.99,
    "discountPercentage": 2.5,
    "rating": 4.77,
    "stock": 190,
    "tags": [
      "groceries",
      "pantry"
    ],
    "brand": "Nature Nate's",
    "sku": "WZR2628",
    "weight": 13.4,
    "dimensions": {
      "width": 13.17,
      "height": 9.43,
      "depth": 5.01
    },
    "warrantyInformation": "3 months warranty",
    "shippingInformation": "Ships in 1 month",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 5,
        "comment": "Very satisfied!",
        "date": "2024-05-18T08:56:21.618Z",
        "reviewerName": "Scarlett Wright",
        "reviewerEmail": "scarlett.wright@example.com"
      },
      {
        "rating": 3,
        "comment": "Great quality!",
        "date": "2024-05-21T08:56:21.618Z",
        "reviewerName": "Liam Smith",
        "reviewerEmail": "liam.smith@example.com"
      }
    ],
    "returnPolicy": "No return policy",
    "minimumOrderQuantity": 5,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000054320948",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 46,
    "title": "Yoga Mat Premium",
    "description": "Yoga Mat Premium — a quality sports product from Manduka, offering excellent value and reliable everyday performance.",
    "category": "sports",
    "price": 79.99,
    "discountPercentage": 9,
    "rating": 4.61,
    "stock": 210,
    "tags": [
      "sports",
      "fitness"
    ],
    "brand": "Manduka",
    "sku": "DNW2665",
    "weight": 16,
    "dimensions": {
      "width": 20.17,
      "height": 20.43,
      "depth": 10.01
    },
    "warrantyInformation": "6 months warranty",
    "shippingInformation": "Ships in 1 day",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 3,
        "comment": "Would buy again!",
        "date": "2024-05-19T08:56:21.618Z",
        "reviewerName": "Liam Smith",
        "reviewerEmail": "liam.smith@example.com"
      },
      {
        "rating": 4,
        "comment": "Exactly as described.",
        "date": "2024-05-22T08:56:21.618Z",
        "reviewerName": "Emma Miller",
        "reviewerEmail": "emma.miller@example.com"
      },
      {
        "rating": 5,
        "comment": "Not as described!",
        "date": "2024-05-25T08:56:21.618Z",
        "reviewerName": "Olivia Davis",
        "reviewerEmail": "olivia.davis@example.com"
      }
    ],
    "returnPolicy": "7 days return policy",
    "minimumOrderQuantity": 6,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000055555515",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 47,
    "title": "Adjustable Dumbbell Set",
    "description": "Adjustable Dumbbell Set — a quality sports product from Bowflex, offering excellent value and reliable everyday performance.",
    "category": "sports",
    "price": 349.99,
    "discountPercentage": 5,
    "rating": 4.7,
    "stock": 45,
    "tags": [
      "sports",
      "fitness"
    ],
    "brand": "Bowflex",
    "sku": "LBB2702",
    "weight": 19.1,
    "dimensions": {
      "width": 27.17,
      "height": 11.43,
      "depth": 15.01
    },
    "warrantyInformation": "1 year warranty",
    "shippingInformation": "Ships in 2 days",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 4,
        "comment": "Not as described!",
        "date": "2024-05-20T08:56:21.618Z",
        "reviewerName": "Emma Miller",
        "reviewerEmail": "emma.miller@example.com"
      },
      {
        "rating": 5,
        "comment": "Very happy with my purchase!",
        "date": "2024-05-23T08:56:21.618Z",
        "reviewerName": "Olivia Davis",
        "reviewerEmail": "olivia.davis@example.com"
      }
    ],
    "returnPolicy": "14 days return policy",
    "minimumOrderQuantity": 7,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000056790082",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 48,
    "title": "Carbon Road Bike",
    "description": "Carbon Road Bike — a quality sports product from Trek, offering excellent value and reliable everyday performance.",
    "category": "sports",
    "price": 1899.99,
    "discountPercentage": 6.8,
    "rating": 4.58,
    "stock": 18,
    "tags": [
      "sports",
      "cycling"
    ],
    "brand": "Trek",
    "sku": "TQG2739",
    "weight": 2.2,
    "dimensions": {
      "width": 9.17,
      "height": 22.43,
      "depth": 20.01
    },
    "warrantyInformation": "2 year warranty",
    "shippingInformation": "Ships in 3-5 business days",
    "availabilityStatus": "Low Stock",
    "reviews": [
      {
        "rating": 5,
        "comment": "Excellent value for money.",
        "date": "2024-05-21T08:56:21.618Z",
        "reviewerName": "Olivia Davis",
        "reviewerEmail": "olivia.davis@example.com"
      },
      {
        "rating": 3,
        "comment": "Fast shipping and well packaged.",
        "date": "2024-05-24T08:56:21.618Z",
        "reviewerName": "John Doe",
        "reviewerEmail": "john.doe@example.com"
      },
      {
        "rating": 4,
        "comment": "Very satisfied!",
        "date": "2024-05-27T08:56:21.618Z",
        "reviewerName": "Nolan Gonzalez",
        "reviewerEmail": "nolan.gonzalez@example.com"
      }
    ],
    "returnPolicy": "30 days return policy",
    "minimumOrderQuantity": 8,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000058024649",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 49,
    "title": "Insulated Water Bottle",
    "description": "Insulated Water Bottle — a quality sports product from Hydro Flask, offering excellent value and reliable everyday performance.",
    "category": "sports",
    "price": 34.99,
    "discountPercentage": 12,
    "rating": 4.74,
    "stock": 600,
    "tags": [
      "sports",
      "accessories"
    ],
    "brand": "Hydro Flask",
    "sku": "ADM2776",
    "weight": 5.3,
    "dimensions": {
      "width": 16.17,
      "height": 13.43,
      "depth": 25.01
    },
    "warrantyInformation": "1 week warranty",
    "shippingInformation": "Ships in 1 week",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 3,
        "comment": "Very satisfied!",
        "date": "2024-05-22T08:56:21.618Z",
        "reviewerName": "John Doe",
        "reviewerEmail": "john.doe@example.com"
      },
      {
        "rating": 4,
        "comment": "Great quality!",
        "date": "2024-05-25T08:56:21.618Z",
        "reviewerName": "Nolan Gonzalez",
        "reviewerEmail": "nolan.gonzalez@example.com"
      }
    ],
    "returnPolicy": "60 days return policy",
    "minimumOrderQuantity": 9,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000059259216",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": 50,
    "title": "Football Match Ball",
    "description": "Football Match Ball — a quality sports product from Adidas, offering excellent value and reliable everyday performance.",
    "category": "sports",
    "price": 29.99,
    "discountPercentage": 7.5,
    "rating": 4.49,
    "stock": 330,
    "tags": [
      "sports",
      "team sports"
    ],
    "brand": "Adidas",
    "sku": "HSS2813",
    "weight": 8.4,
    "dimensions": {
      "width": 23.17,
      "height": 24.43,
      "depth": 8.01
    },
    "warrantyInformation": "1 month warranty",
    "shippingInformation": "Ships in 1 month",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 4,
        "comment": "Would buy again!",
        "date": "2024-05-23T08:56:21.618Z",
        "reviewerName": "Nolan Gonzalez",
        "reviewerEmail": "nolan.gonzalez@example.com"
      },
      {
        "rating": 5,
        "comment": "Exactly as described.",
        "date": "2024-05-26T08:56:21.618Z",
        "reviewerName": "Scarlett Wright",
        "reviewerEmail": "scarlett.wright@example.com"
      },
      {
        "rating": 3,
        "comment": "Not as described!",
        "date": "2024-05-11T08:56:21.618Z",
        "reviewerName": "Liam Smith",
        "reviewerEmail": "liam.smith@example.com"
      }
    ],
    "returnPolicy": "No return policy",
    "minimumOrderQuantity": 10,
    "meta": {
      "createdAt": "2024-05-23T08:56:21.618Z",
      "updatedAt": "2024-05-23T08:56:21.618Z",
      "barcode": "4000060493783",
      "qrCode": "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=400&q=80"
    },
    "thumbnail": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

export default products;
