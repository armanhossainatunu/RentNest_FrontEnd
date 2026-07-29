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