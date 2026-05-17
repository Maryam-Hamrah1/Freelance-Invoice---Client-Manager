import { clients } from "./data.js";

import {saveClients} from "./utils.js";
import {fetchClients} from "./utils.js"

const clientForm =
document.getElementById("clientForm");

const clientTable =
document.getElementById("clientTable");

let editId = null;

async function start(){

  if(clients.length === 0){

    const apiClients = await fetchClients();

    clients.push(...apiClients);

    saveClients(clients);
  }

  renderClients();
}

renderClients()

function renderClients(){

  clientTable.innerHTML = "";

  clients.forEach(client => {

    clientTable.innerHTML += `
      <tr>
        <td>${client.name}</td>
        <td>${client.email}</td>
        <td>${client.company}</td>

        <td>
          <button onclick="editClient('${client.id}')">
          Edit
          </button>

          <button onclick="deleteClient('${client.id}')">
          Delete
          </button>
        </td>
      </tr>
    `;
  });
}

clientForm.addEventListener("submit", function(e){

  e.preventDefault();

  const name =
  document.getElementById("name").value;

  const email =
  document.getElementById("email").value;

  const company =
  document.getElementById("company").value;

  const notes =
  document.getElementById("notes").value;

  if(name === "" || email === ""){
    alert("Please fill required fields");
    return;
  }

  if(editId){

    const client = clients.find(c => c.id == editId);

    client.name = name;
    client.email = email;
    client.company = company;
    client.notes = notes;

    editId = null;

  }else{

    clients.push({
      id: Date.now(),
      name,
      email,
      company,
      notes
    });
  }

  saveClients(clients);

  renderClients();

  clientForm.reset();
});

window.deleteClient = function(id){

  const index =
  clients.findIndex(c => c.id == id);

  clients.splice(index,1);

  saveClients(clients);

  renderClients();
}

window.editClient = function(id){

  const client =
  clients.find(c => c.id == id);

  document.getElementById("name").value =
  client.name;

  document.getElementById("email").value =
  client.email;

  document.getElementById("company").value =
  client.company;

  document.getElementById("notes").value =
  client.notes;

  editId = id;
}

start();

console.log("maryam")





