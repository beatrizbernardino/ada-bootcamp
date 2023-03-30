const baseUrl = "https://crudcrud.com/api/35b3fe8319704e229b34f02c0433d9f7";


var lista=[]

function saveRemote(item) {
  return fetch(`${baseUrl}/lista`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}

async function getAll() {
  const response = await fetch(`${baseUrl}/lista`);
  const data = await response.json();
  return data;
}

function deleteRemote(id) {
    return fetch(`${baseUrl}/lista/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: {}
    });
  }


async function Delete(){
    event.preventDefault();
    const title = event.target.closest('.con').querySelector('h4').textContent
    const ids = lista.filter((item)=>{
        console.log(item)
        if( item.titulo===title){
            return item._id
        }
    })

    var id= ids[0]._id
    await deleteRemote(id)
    lista = await getAll();
    criaLista(lista);
  

}

function updateRemote(item, id){
    return fetch(`${baseUrl}/lista/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
}

async function Update(){
    event.preventDefault();
    const nova_desc = document.querySelector("#new_desc").value;
    const title= event.target.parentElement.querySelector('h4').textContent

    const ids = lista.filter((item)=>{
        console.log(item)
        if( item.titulo===title){
            return item._id
        }
    })

    var id= ids[0]._id

    const item = { titulo: title, desc: nova_desc };


    await updateRemote(item, id)
    lista = await getAll();
    criaLista(lista);
  
    


}

function editarDesc(){

    event.preventDefault();

    const parent= event.target.closest('.con')
    desc=parent.querySelector('p')
    var form = document.createElement('form');
    form.className ="form"
    form.innerHTML= "<input  type='text' id='new_desc' placeholder='Insira uma nova Descricao do produto' /> <Button class='button' type='submit'> Enviar</Button> "
    form.addEventListener("submit", Update);
    parent.removeChild(desc);
    parent.append(form)




}

function criaLista(list) {
  
//   <div class="card" id="#card">
//   <div class="container" id="#container">
//   <div class="con" id="con" >
//     <h4 id="title">Batata Frita</h4>
//     <p id = "desc">Batata frita com cheddar e bacon</p>
//   </div>
//   <div id="btn-parent" class="btn-group">
//       <button id="editar" class="button"> Editar</button>
//       <button id="apagar" class="button"> Remover</button>

//   </div>
//   </div>
// </div>
  const pai = document.querySelector("#parent");
  pai.innerHTML = "";
  list.map((item) => {
    const card = document.createElement("div");
    const container = document.createElement("div");
    const con = document.createElement("div");
    const titulo = document.createElement("h4");
    const desc = document.createElement("p");

    const btn_par = document.createElement("div");
    const forms_geral = document.createElement("div");

    const form_apagar = document.createElement("form")
    const form_editar = document.createElement("form")
    const editar = document.createElement("button");
    const apagar = document.createElement("button");

    con.id= "con"
    titulo.textContent = item.titulo;
    desc.textContent = item.desc;
    editar.textContent=" Editar"
    apagar.textContent="Apagar"
    apagar.type="submit"
    forms_geral.className= "form"

    form_apagar.addEventListener("submit", Delete);
    form_editar.addEventListener("submit", editarDesc);

    card.className = "card"
    container.className="container"
    con.className="con"
    btn_par.className="btn-group"
    editar.className="button"
    apagar.className="button"
   
    

    con.append(titulo);
    con.append(desc);
    container.append(con);
    form_apagar.append(apagar)
    form_editar.append(editar)
    forms_geral.append(form_editar)
    forms_geral.append(form_apagar)

    con.append(forms_geral)


    // btn_par.append(editar);
    // btn_par.append(form_apagar);
    container.append(btn_par);
    card.append(container);
    pai.appendChild(card);

  
  });
}


async function onSubmit() {
  event.preventDefault();
  const titulo = document.querySelector("#title_").value;
  const desc = document.querySelector("#desc_").value;

  lista = await getAll();

  if (titulo === "" || desc === "") return;
  if (lista.find((item) => item.titulo === titulo)) return;
  const item = { titulo: titulo, desc: desc };

  await saveRemote(item);
  lista = await getAll();
  criaLista(lista);

  titulo.value = "";
  desc.value = "";
}

window.onload = async () => {
  lista = await getAll();
  console.log(lista);
  criaLista(lista);
};

