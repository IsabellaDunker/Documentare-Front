const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sPreco = document.querySelector('#m-preco')
const sMarca = document.querySelector('#m-marca')
const sArea = document.querySelector('#m-area')
const sRam = document.querySelector('#m-ram')
const sOpera = document.querySelector('#m-so')
const sProce = document.querySelector('#m-pro')
const btnSalvar = document.querySelector('#btnSalvar')

let products
let id

// 5. POST request using fetch()
async function postJSON(data) {
  try {
    fetch("http://localhost:8000/products", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => response.json())

    // 10. Displaying results to console
    .then((json) => console.log(json));
  } catch (error) {
    console.log(JSON.stringify(data))
    console.error("Error:", error);
  }
}

async function putJSON(data) {
  try {
    fetch("http://localhost:8000/products/:id", {
      method: "PUT",
      body: JSON.stringify(data),
    }).then((response) => response.json())

    // 10. Displaying results to console
    .then((json) => console.log(json));
  } catch (error) {
    console.error("Error:", error);
  }
}

function openModal(edit = false, index = 0) {
  fetch('http://localhost:8000/products')
  .then((res) => res.json())
  .then((products) => {

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
      sArea.value = products[index].area
      sRam.value = products[index].ram
      sOpera.value = products[index].so
      sProce.value = products[index].processador
    } else {
      sNome.value = ''
      sPreco.value = ''
      sMarca.value = ''
      sArea.value = ''
      sRam.value = ''
      sOpera.value = ''
      sProce.value = ''
      id = undefined
    }

    let save = document.getElementById("btnSalvar")
    save.addEventListener("click", function(){
      saveItem(index)
    })
  })
}

function editItem(index) {
  openModal(true, index)
}

async function deleteItem(index) {
  const res = await fetch('http://localhost:8000/products/:id', {
    method: "delete",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(index),
  })
  const resResult = await res.json();
  console.log(resResult);
}

function insertItem(products, index) {
  id = products[index].id

  let tr = document.createElement('tr')
  tr.classList.add('product');
  
  tr.innerHTML = `
      <td></td>
      <td>${products[index].name}</td>
      <td>R$${products[index].price},00</td>
      <td>${products[index].brand}</td>
      <td>${products[index].area}</td>
      <td>${products[index].ram}</td>
      <td>${products[index].so}</td>
      <t>${products[index].processador}</t>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${products[index].id})"><i class='bx bx-trash'></i></button>
    </td>
  `

  tbody.appendChild(tr)
}

function search() {
  let input = document.getElementById('searchbar').value.toLowerCase()
  let x = document.getElementsByClassName('product')
  let y = document.getElementsByClassName('results')
  let results = 0

  for (i = 0; i < x.length; i++) { 
      if (x[i].innerHTML.toLowerCase().includes(input)) {
          x[i].style.display="table-row";
          results++
          
            y.innerHTML = `${results}`
          
      } else {
          x[i].style.display='none'
      }
  }
}

function filter_so(box) {
  var cbs = document.getElementsByTagName('input');
  var all_checked_types = [];
  for(var i=0; i < cbs.length; i++) {
    if(cbs[i].type == "checkbox") {
        if(cbs[i].name.match(/^filter/)) {
            if(cbs[i].checked) {
              all_checked_types.push(cbs[i].value);
             }
           }
        }
   }
  if (all_checked_types.length > 0) {
    $('#le-Table-1 tr').each(function (i, row) {
      var $tds = $(this).find('td')
      if ($tds.length) {
       var type = $tds[6].innerText;
       console.log(type)
       if(!(type && all_checked_types.indexOf(type) >= 0)) {
         $(this).hide();
        }
        else {
         $(this).show();
        }
       }
     });
     
   }
   else {
     $('#le-Table-1 tr').each(function (i, row) {
       var $tds = $(this).find('td'),
       type = $tds.eq(6).text();
       $(this).show();
      });
   }
   return true;
 }

 function filter_type(box) {
  var cbs = document.getElementsByTagName('input');
  var all_checked_types = [];
  for(var i=0; i < cbs.length; i++) {
    if(cbs[i].type == "checkbox") {
        if(cbs[i].name.match(/^filter/)) {
            if(cbs[i].checked) {
              all_checked_types.push(cbs[i].value);
             }
           }
        }
   }
  if (all_checked_types.length > 0) {
    $('#le-Table-1 tr').each(function (i, row) {
      var $tds = $(this).find('td')
      if ($tds.length) {
       var type = $tds[5].innerText;
       console.log(type)
       if(!(type && all_checked_types.indexOf(type) >= 0)) {
         $(this).hide();
        }
        else {
         $(this).show();
        }
       }
     });
     
   }
   else {
     $('#le-Table-1 tr').each(function (i, row) {
       var $tds = $(this).find('td'),
       type = $tds.eq(5).text();
       $(this).show();
      });
   }
   return true;
 }

 function filter_processador(box) {
  var cbs = document.getElementsByTagName('input');
  var all_checked_types = [];
  for(var i=0; i < cbs.length; i++) {
    if(cbs[i].type == "checkbox") {
        if(cbs[i].name.match(/^filter/)) {
            if(cbs[i].checked) {
              all_checked_types.push(cbs[i].value);
             }
           }
        }
   }
  if (all_checked_types.length > 0) {
    $('#le-Table-1 tr').each(function (i, row) {
      var $tds = $(this).find('td')
      if ($tds.length) {
       var type = $tds[7].innerText;
       console.log(type)
       if(!(type && all_checked_types.indexOf(type) >= 0)) {
         $(this).hide();
        }
        else {
         $(this).show();
        }
       }
     });
     
   }
   else {
     $('#le-Table-1 tr').each(function (i, row) {
       var $tds = $(this).find('td'),
       type = $tds.eq(7).text();
       $(this).show();
      });
   }
   return true;
 }

let product = []

function sort(products, index){
  product.push(products)
  
  let sortName = document.getElementsByClassName('sortName');
  let sortPrice = document.getElementsByClassName('sortPrice');

  //product.sort((a,b) => (a.name > b.name ? 1 : -1))
  //console.log(product.find(products.name))

  insertItem(product, index)  
}

	/* Sort function */
  function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("le-Table-1");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc"; 
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        //Each time a switch is done, increase this count by 1:
        switchcount ++;      
      } else {
        /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

function detailItem(index){
    let content = document.getElementsByClassName('content');
    
    if (content[index].style.display === "block") {
      content[index].style.display = "none";
    } else {
      content[index].style.display = "block";
    }
  
}

function saveItem(index) {
  if (sNome.value == '' || sPreco.value == '' || sMarca.value == '' || sRam.value == '' || sArea.value == '') {
    return
  }

  if (id !== undefined) {
    product[index].name = sNome.value
    product[index].price = parseFloat(sPreco.value)
    product[index].brand = sMarca.value
    product[index].description = 'Funcionando corretamente'
    product[index].area = sArea.value
    product[index].so = sOpera.value
    product[index].ram = sRam.value
    product[index].processador = sProce.value
    putJSON(product[index])
  } else {
    product.push({'name': sNome.value, 'price': parseFloat(sPreco.value), 'brand': sMarca.value, 'description': 'Funcionando corretamente', 'area': sArea.value, 'so': sOpera.value,'ram': sRam.value,'processador': sProce.value})
    postJSON(product.slice(-1))
    console.log(product.slice(-1))
  }
  
  

  modal.classList.remove('active')
  loadItens()
}

function loadItens() {
  fetch('http://localhost:8000/products')
  // Converting received data to JSON
  .then((response) => response.json())
  .then((json) => {
    tbody.innerHTML = ''
    json.forEach((products, index) => {
      sort(products, index)
    })
  })
}

loadItens()