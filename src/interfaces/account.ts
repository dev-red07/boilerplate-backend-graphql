interface UserAccount {
  id: String;
  alias: String;
  userId: String;
  apiKey: String;
  apiSecret: String;
  requestToken?: String;
  accessToken?: String;
  multiplier: number;
  role: number;
  status: number;
  broker: number;
  createdAt: Date;
  updatedAt: Date;
}

export { UserAccount };