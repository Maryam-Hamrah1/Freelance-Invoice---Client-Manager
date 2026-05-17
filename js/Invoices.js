
import {clients,invoices} from "./data.js";

import {saveInvoices} from "./utils.js";

const invoiceForm =
document.getElementById("invoiceForm");

const invoiceTable =
document.getElementById("invoiceTable");

const clientSelect =
document.getElementById("clientSelect");

let editId = null;

function loadClients(){

  clientSelect.innerHTML =`
  <option value="">Select Client</option>`;

  clients.forEach(client => {

    clientSelect.innerHTML += `
      <option value="${client.id}">
        ${client.name}
      </option>
    `;
  });
}

function renderInvoices(){

  invoiceTable.innerHTML = "";

  invoices.forEach(invoice => {

    const client =
    clients.find(c => c.id == invoice.clientId);

    invoiceTable.innerHTML += `
      <tr>

        <td>${client ? client.name : "Unknown"}</td>

        <td>${invoice.serviceTitle}</td>

        <td>$${invoice.amount}</td>

        <td>
          ${invoice.paid ? "Paid" : "Unpaid"}
        </td>

        <td>

          <button onclick="togglePaid('${invoice.id}')">
          Toggle
          </button>

          <button onclick="editInvoice('${invoice.id}')">
          Edit
          </button>

          <button onclick="deleteInvoice('${invoice.id}')">
          Delete
          </button>

        </td>

      </tr>
    `;
  });
}

invoiceForm.addEventListener("submit", function(e){

  e.preventDefault();

  const clientId =
  clientSelect.value;

  const serviceTitle =
  document.getElementById("serviceTitle").value;

  const description =
  document.getElementById("description").value;

  const amount =
  document.getElementById("amount").value;

  const date =
  document.getElementById("date").value;

  if(
    clientId === "" ||
    serviceTitle === "" ||
    amount === ""
  ){
    alert("Please fill required fields");
    return;
  }

  if(editId){

    const invoice =
    invoices.find(i => i.id == editId);

    invoice.clientId = clientId;
    invoice.serviceTitle = serviceTitle;
    invoice.description = description;
    invoice.amount = amount;
    invoice.date = date;

    editId = null;

  }else{

    invoices.push({
      id: Date.now(),
      clientId,
      serviceTitle,
      description,
      amount,
      date,
      paid:false
    });
  }

  saveInvoices(invoices);

  renderInvoices();

  invoiceForm.reset();
});

window.deleteInvoice = function(id){

  const index =
  invoices.findIndex(i => i.id == id);

  invoices.splice(index,1);

  saveInvoices(invoices);

  renderInvoices();
}

window.togglePaid = function(id){

  const invoice =
  invoices.find(i => i.id == id);

  invoice.paid = !invoice.paid;

  saveInvoices(invoices);

  renderInvoices();
}

window.editInvoice = function(id){

  const invoice =
  invoices.find(i => i.id == id);

  clientSelect.value = invoice.clientId;

  document.getElementById("serviceTitle").value =
  invoice.serviceTitle;

  document.getElementById("description").value =
  invoice.description;

  document.getElementById("amount").value =
  invoice.amount;

  document.getElementById("date").value =
  invoice.date;

  editId = id;
}

loadClients();
renderInvoices();

console.log("hello")