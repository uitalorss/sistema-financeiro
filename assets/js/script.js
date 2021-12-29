const modal = {
  open(){
    document.querySelector(".modal-overlay").classList.add("active");
  },

  close(){
    document.querySelector(".modal-overlay").classList.remove("active");
  }
}

const transactions = [
  {
    id: 1,
    description: "Conta de Luz",
    amount: -20000,
    date: "01/01/2022"
  },
  {
    id: 2,
    description: "Criação de website",
    amount: 800001,
    date: "01/01/2022"
  },
  {
    id: 3,
    description: "Aluguel",
    amount: -80000,
    date: "01/01/2022"
  },
]

const treatmentBalance = {
  incomes(){

  },
  expenses(){

  },
  total(){

  }
}


const treatmentTransaction = {
  transactionsContainer: document.querySelector('#data-table tbody'),
  
  addTransaction(transaction, index){
    const tr = document.createElement('tr');
    tr.innerHTML = treatmentTransaction.transactionHTML(transaction);
    treatmentTransaction.transactionsContainer.appendChild(tr);
    
  },
  transactionHTML(transaction){
    const cssClass = transaction.amount > 0 ? "income" : "expense";
    const amount = utils. formatCurrency(transaction.amount);
    const tableRowTransaction = `
      <td class="description">${transaction.description}</td>
      <td class="${cssClass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td><img src="assets/img/minus.svg" alt="remover transação"></td>
    `
    return tableRowTransaction;
  }
}


//tratamento para receber o valor, tratar os negativos e tratar como moeda e a região da moeda.
const utils = {
  formatCurrency(value){
    const signal = Number(value) < 0 ? '-' : '';
    value = String(value).replace(/\D/g, " ")
    value = Number(value) / 100;
    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })
    return signal + value    
  }
}

//tratamento para percorrer o array
transactions.forEach((transaction) =>{
  treatmentTransaction.addTransaction(transaction)
})