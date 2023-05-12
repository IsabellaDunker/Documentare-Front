const url = 'http://localhost:8000/users'


  async function getUser() {
    const res = await fetch(url);
    const data = res.json();
    return data
  }



