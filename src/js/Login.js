async function Login(){

  let email = await document.getElementById('email').value;
  let password = await document.getElementById('pass').value;

  fetch('http://localhost:8000/users')
  // Converting received data to JSON
  .then((response) => response.json())
  .then((json) => {
    
    json.map((user) => {
      console.log(user)
      if(`${user.email}` === email){
        console.log('Login!')
        location.href = './ProdctsPage.html'
      }
    }) 
    console.log(email)
    console.log(password)


    
  });
}