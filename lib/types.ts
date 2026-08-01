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