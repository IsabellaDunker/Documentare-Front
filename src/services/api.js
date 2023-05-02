const url = 'http://localhost:8000/users'

class User {
  static async getUser() {
    const res = await fetch(url);
    const data = res.json();
    return data
  }
}

module.exports = User;

