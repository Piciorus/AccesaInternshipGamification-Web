export class User {
  id?: number;
  username?: string;
  password?: string;
  tokens?: number;
  leaderboard?: string;
  threshold?: number;
  email?: string;
  accessToken?: any;
}

export class Role{
  id?:string;
  name?:string;
}

export class LoginRequest {
  constructor(public username: string, public password: string) {}
}

export class RegisterRequest{
  constructor(public username: string, public password: string,public email:string) {}
}
