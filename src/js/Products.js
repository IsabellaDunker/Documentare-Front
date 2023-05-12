//GET request using fetch()
fetch('http://localhost:8000/products')
  // Converting received data to JSON
  .then((response) => response.json())
  .then((json) => {
    
  // 2. Create a variable to store HTML table headers
    let li = `<tr><th>Produto</th><th>Nome</th><th>Preço</th><th>Marca</th><th>Descrição</th><th>Área</th></tr>`;

    // 3. Loop through each data and add a table row
    json.forEach((products,i) => {
      li += `<tr>
        <td>${i+1}</td>
        <td>${products.name}</td>
        <td>${products.price}</td>
        <td>${products.brand}</td>
        <td>${products.description}</td>
        <td>${products.area}</td>
      </tr>`;
    });

    // 4. DOM Display result
    document.getElementById("products").innerHTML = li;
  });

// main.js

// 5. POST request using fetch()
async function postJSON(data) {
  try {
    const response = await fetch("http://localhost:8000/products", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

