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
    treatmentTransaction.transactionsContainer.appendChild(tr)
  },
  transactionHTML(transaction){
    const tableRowTransaction = `
      <td class="description">${transaction.description}</td>
      <td class="expense">R$ ${transaction.amount}</td>
      <td class="date">${transaction.date}</td>
      <td><img src="assets/img/minus.svg" alt="remover transação"></td>
    `
    return tableRowTransaction;
  }
}

treatmentTransaction.addTransaction(transactions[0])

