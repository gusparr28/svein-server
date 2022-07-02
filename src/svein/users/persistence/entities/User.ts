import Email from '@root/svein/users/valueObjects';

export default class User {
  email: Email;

  constructor(email: Email) {
    this.email = email;
  }
}
