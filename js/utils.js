export function saveClients(clients){
  localStorage.setItem("clients", JSON.stringify(clients));
}

export function saveInvoices(invoices){
  localStorage.setItem("invoices", JSON.stringify(invoices));
}

export async function fetchClients(){

  try{

    const response =
    await fetch("https://randomuser.me/api/?results=5&nat=us");

    const data = await response.json();

    return data.results.map(user => ({
      id: Date.now() + Math.random(),

      name:`${user.name.first} ${user.name.last}`,

      email: user.email,

      company: "Freelance Inc.",

      notes: ""
    }));

  }catch(error){

    console.log(error);

    return [];
  }
};


export async function fetchQuote(){

  try{

    const response =
    await fetch("https://dummyjson.com/random");

    const data = await response.json();

    return data[0];

  }catch(error){

    console.log(error);

    return {
      q:"Stay positive and keep learning.",
      a:"Unknown"
    };
  }
}