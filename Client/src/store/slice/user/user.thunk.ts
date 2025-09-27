interface UserProfile {
  success: boolean;
  message: string;
  data?: {
    _id: string;
    name: string;
    email: string;
    description: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
  };
}
