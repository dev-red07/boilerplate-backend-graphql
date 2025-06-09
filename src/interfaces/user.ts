interface AuthenticationReturnTypes {
  token: string;
  user: UserType;
}

interface UserType {
  id: string;
  userName: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string | null;
  password?: string | null;
  phoneNumber?: string | null;
  image?: string | null;
  status: number;
  role: number;
}

export { AuthenticationReturnTypes, UserType };
