// LoginState type
export type LoginState = {
  success: boolean;
  statusCode: number;
  message: string;
  error: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

// RegisterState type 
export type RegisterState = {
  success: boolean;
  statusCode: number;
  message: string;
  error: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      status: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      profile: {
        id: string;
        profilePhoto: string | null;
        bio: string | null;
        userId: string;
      };
    };
  };
};
// User Type
export type Iuser = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    profile: {
      id: string;
      name: string;
      email: string;
      status: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      profile: {
        id: string;
        profilePhoto: string;
        bio: null;
        userId: string;
      };
    };
  };
};


// Property Type
export type IProperty = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  price: number;
  status: string;
  authorId: string;
  location: string;
  category: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  reviews: [];
};

//  "id": "8731f138-6314-49b5-a8a8-f6136314b6f3",
//             "tenantId": "f86fc7ab-64ce-4e86-8c39-33c5e0b9d874",
//             "propertyId": "7e4bdeaf-b1b1-44be-a8f1-9cc9013687fc",
//             "message": "I want to rent this apartment from next august month.",
//             "rentalstatus": "APPROVED",
//             "createdAt": "2026-07-17T18:06:01.364Z",
//             "updatedAt": "2026-07-17T18:14:34.294Z",
//             "property": {
//                 "id": "7e4bdeaf-b1b1-44be-a8f1-9cc9013687fc",
//                 "title": "Spacious Family House",
//                 "thumbnail": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
//                 "description": "A spacious family house with a peaceful environment.",
//                 "price": 45000,
//                 "status": "UNAVAILABLE",
//                 "authorId": "dce9087d-0904-4f5f-9d7b-8467ffae2d04",
//                 "location": "Uttara, Dhaka",
//                 "category": "HOUSE",
//                 "views": 20,
//                 "createdAt": "2026-07-17T16:49:40.530Z",
//                 "updatedAt": "2026-08-01T16:33:21.909Z",
//                 "author": {
//                     "id": "dce9087d-0904-4f5f-9d7b-8467ffae2d04",
//                     "name": "Atunu",
//                     "email": "atunu@rentnest.com"
//                 }
//             },
//             "payment": {
//                 "id": "5d5d50e4-5cf5-47fc-bdf5-ef259aa1896e",
//                 "amount": 45000,
//                 "status": "PAID",
//                 "transactionId": "TXN_1784313944797_3068"
//             }
//         }
    

export type IRentalRequest = {
  id: string;
  tenantId: string;
  propertyId: string;
  message: string;
  rentalstatus: string;
  createdAt: string;
  updatedAt: string;
  property: {
    id: string;
    title: string;
    thumbnail: string;
    description: string;
    price: number;
    status: string;
    authorId: string;
    location: string;
    category: string;
    views: number;
    createdAt: string;
    updatedAt: string;
    author: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  };
  payment: {
    id: string;
    amount: number;
    status: string;
    transactionId: string;
  };
};