
import {clients,invoices} from "./data.js";

import {fetchQuote} from "./utils.js";

document.getElementById("totalClients")
.innerText = clients.length;

document.getElementById("totalInvoices")
.innerText = invoices.length;

const totalRevenue =
invoices.reduce((total, invoice) => {

  return total + Number(invoice.amount);

},0);

document.getElementById("totalRevenue")
.innerText = totalRevenue;

const paid =
invoices.filter(i => i.paid);

const unpaid =
invoices.filter(i => !i.paid);

document.getElementById("paidInvoices")
.innerText = paid.length;

document.getElementById("unpaidInvoices")
.innerText = unpaid.length;

async function loadQuote(){

  const quote = await fetchQuote();

  document.getElementById("quote")
  .innerText = quote.q;

  document.getElementById("author")
  .innerText = "- " + (quote.a || "Unknown");
}

loadQuote();