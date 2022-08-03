export enum UserContext {
  svein = 'svein',
  oauth = 'oauth',
  both = 'both',
}

export class User {
  id: string;

  email: string;

  username: string;

  password: string;

  context: UserContext;

  constructor(
    id: string,
    email: string,
    username: string,
    password: string,
    context: UserContext,
  ) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.password = password;
    this.context = context;
  }
}
