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
  all: transactions,

  //método para inserção de dados da transação
  add(transaction){
    treatmentBalance.all.push(transaction);
    App.reload();
  },

  //método para remoção de dados da transação
  remove(index){
    treatmentBalance.all.splice(index, 1);
    App.reload();
  },
  incomes(){
    let income = 0
    treatmentBalance.all.forEach(transaction => {
      if(transaction.amount > 0){
        income += transaction.amount;
      }
    })
    return income;
  },
  expenses(){
    let expense = 0
    treatmentBalance.all.forEach(transaction => {
      if(transaction.amount < 0){
        expense += transaction.amount;
      }
    })
    return expense;
  },
  total(){
    //receitas - dispesas
    let total = treatmentBalance.incomes() - (-treatmentBalance.expenses());

    return total;
  }
}

const treatmentTransaction = {
  transactionsContainer: document.querySelector('#data-table tbody'),
  
  //método para adicionar a linha na tabela.
  addTransaction(transaction, index){
    const tr = document.createElement('tr');
    tr.innerHTML = treatmentTransaction.transactionHTML(transaction);
    treatmentTransaction.transactionsContainer.appendChild(tr);    
  },

  //método para preenchimento das linhas da tabela de transações
  //a depender se for despesa ou receita, a const css class vai atribuir a cor da linha
  // o tratamento dos valores está na const amount, que recebe a função utils
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
  },

  //mostrando os dados do balance no card.
  updateBalance(){
    document
      .getElementById("incomeDisplay")
      .innerHTML = utils.formatCurrency(treatmentBalance.incomes()),
    document
      .getElementById("expenseDisplay")
      .innerHTML = utils.formatCurrency(treatmentBalance.expenses()),
    document
      .getElementById("totalDisplay")
      .innerHTML = utils.formatCurrency(treatmentBalance.total())
  },

  //método para limpar os dados de transação
  clearTransactions(){
    treatmentTransaction.transactionsContainer.innerHTML = "";
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
  },

  formatAmount(value){
    value = Number(value) * 100;
    return value;
  },

  formatDate(date){
    const splittedDate  = date.split("-");
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
  }
}

const Form = {
  //variáveis para poder pegar os dados do input e poder tratar na função.
  description: document.querySelector('input#description'),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),

  //Pegando os valores do input
  getValues(){
    return{
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    }
  },
  
  //Função para validar os dados.
  validateFields(){
    //Desestruturando o getValues para poder pegar seus dados e atribuir a dados dessa função de forma mais enxuta. 
    const{description, amount, date} = Form.getValues();
    //Usando a função trim do JS para remover os espaços e verificar se os campos estão preenchidos
    if(description.trim() === "" || amount.trim() === "" || date.trim() === ""){
      //Passando um novo erro.
      throw new Error("Favor preencher todos os campos.")
    }
  },

  formatValues(){
    let{description, amount, date} = Form.getValues();
    amount = utils.formatAmount(amount);
    date = utils.formatDate(date);

    return{
      description, amount, date
    }
  },

  clearFields(){
    Form.description.value = "";
    Form.amount.value = "";
    Form.date.value = "";
  },

  
  saveTransaction(transaction){
    treatmentBalance.add(transaction);
  },
  submit(event){
    event.preventDefault();

    try {
      //verificar se todos os campos foram preenchidos
      Form.validateFields();
      //formatar os dados para salvar
      const transaction = Form.formatValues();
      //salvar
      Form.saveTransaction(transaction);
      //apagar os dados do formulário
      Form.clearFields();
      //fechar modal
      modal.close();
      //atualizar a aplicação
    } catch (error) {
      alert(error.message);  
    }
  }
}

//tratamento para iniciar a aplicação e preencher os dados de forma saudável.
const App = {
  //O init preencherá os dados da transaction e do balance.
  init(){
    //tratamento para percorrer o array
    transactions.forEach((transaction) =>{
      treatmentTransaction.addTransaction(transaction)
    })
    treatmentTransaction.updateBalance();
  },

  //O reload vai atualizar os dados quando houver alguma inserção ou remoção
  reload(){
    treatmentTransaction.clearTransactions();
    App.init();
  }
}

//chamando para inicializar para preencher os dados da aplicação
App.init();

