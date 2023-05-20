const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sPreco = document.querySelector('#m-preco')
const sMarca = document.querySelector('#m-marca')
const sDescricao = document.querySelector('#m-descricao')
const sArea = document.querySelector('#m-area')
const btnSalvar = document.querySelector('#btnSalvar')

//GET request using fetch()
let products
let index

// 5. POST request using fetch()
async function postJSON(data) {
  try {
    fetch("http://localhost:8000/products", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json())

    // 10. Displaying results to console
    .then((json) => console.log(json));
  } catch (error) {
    console.error("Error:", error);
  }
}

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = products[index].name
    sPreco.value = products[index].price
    sMarca.value = products[index].brand
    sDescricao.value = products[index].description
    sArea.value = products[index].area
  } else {
    sNome.value = ''
    sPreco.value = ''
    sMarca.value = ''
    sDescricao.value = ''
    sArea.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  
}

function insertItem(products, index) {
  let tr = document.createElement('tr')
  tr.classList.add('product');
  let div = document.createElement('tr')

  tr.innerHTML = `
      <td>${index+1}</td>
      <td>${products.name}</td>
      <td>${products.price}</td>
      <td>${products.brand}</td>
      <td>${products.description}</td>
      <td>${products.area}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
    <td class="acao">
      <button onclick="detailItem(${index})"><i class='bx bx-plus'></i></button>
    </td>
  `
  div.innerHTML = `
    <td colspan=10>
      <div class='content'>
        <p>${products.description}</p>
      </div>
    </td>
  `

  tbody.appendChild(tr)
  tbody.appendChild(div)
}

function search() {
  let input = document.getElementById('searchbar').value
  input=input.toLowerCase();
  let x = document.getElementsByClassName('product')

  for (i = 0; i < x.length; i++) { 
      if (!x[i].innerHTML.toLowerCase().includes(input)) {
          x[i].style.display="none";
      }
      else {
          x[i].style.display='table-row'            
      }
  }
}

function detailItem(index){
    let content = document.getElementsByClassName('content');
    console.log(content[index])
    if (content[index].style.display === "block") {
      content[index].style.display = "none";
    } else {
      content[index].style.display = "block";
    }
  
}

btnSalvar.onclick = e => {
  if (sNome.value == '' || sPreco.value == '' || sMarca.value == '' || sDescricao.value == '' || sArea.value == '') {
    return
  }
  e.preventDefault();

  if (id !== undefined) {
    products[id].nome = sNome.value
    products[id].preco = sPreco.value
    products[id].quantidade = 1
    products[id].marca = sMarca.value
    products[id].descricao = sDescricao.value
    products[id].area = sArea.value
  } else {
    products.push({'nome': sNome.value, 'preco': sPreco.value, 'quantidade': 1, 'marca': sMarca.value, 'descricao': sDescricao.value, 'area': sArea.value})
  }

  postJSON(data)

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  fetch('http://localhost:8000/products')
  // Converting received data to JSON
  .then((response) => response.json())
  .then((json) => {
    tbody.innerHTML = ''
    json.forEach((products, index) => {
    insertItem(products, index)
    })
  })
}

loadItens()