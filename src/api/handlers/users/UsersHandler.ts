export default class UsersHandler {
  async getUsers(): Promise<any> {
    return [{
      users: {
        id: 1,
        name: 'Gustavo',
      },
    }];
  }
}
