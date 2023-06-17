async function Login(){

  let email = await document.getElementById('email').value;
  let password = await document.getElementById('pass').value;
  let loader = document.getElementById('loader');

  fetch('http://localhost:8000/users')
  // Converting received data to JSON
  .then((response) => response.json())
  .then((json) => {
    
    json.map((user) => {
      console.log(user)
      if(`${user.email}` === email){
        loader.style.display = "block";
        setTimeout(function () {
          location.href = './ProductsPage.html'
      }, 1000);
        
      } else {
        document.getElementById("erro").innerHTML = `Email ou senha incorreta`;
      }
    }) 
    console.log(email)
    console.log(password)

  });

}

function sendEmail() {
	Email.send({
	Host: "isabellapd@gmail.com",
	Username : "<isabelladunker0@gmail.com>",
	Password : "<220619jp>",
	To : '<isabellapd@gmail.com>',
	From : "<isabelladunker0@gmail.com>",
	Subject : `<Nova senha>`,
	Body : "<Você solicitou uma mudança de senha, se você não tiver feito a solicitação, ignore este email. Sua nova senha é: %cd8e9Z^U1w$>",
	}).then(
		message => alert("Enviado com sucesso")
	);
}
