async function Enroll(){

  let email = await document.getElementById('email').value;
  let password = await document.getElementById('pass').value;

  fetch('http://localhost:8000/users')
  // Converting received data to JSON
  .then((response) => response.json())
  .then((json) => {
    
    json.map((user) => {
      console.log(user)
      if(`${user.email}` === email){
          document.getElementById("erro").innerHTML = `Email já cadastrado`;
      } if(email === '') {
        document.getElementById("erro").innerHTML = `Campo email é obrigatório`;
      } else {
          
      }
    }) 
  });
}