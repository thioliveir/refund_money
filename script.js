// Seleciona os elementos do formulário
const form = document.querySelector("form")
const expenseValue = document.querySelector("#expense-value")
const expenseTitle = document.querySelector("#expense-title")
const expenseCategory = document.querySelector("#expense-category")

// Seleciona os elementos da lista de despesas
const expenseList = document.querySelector("ul")


// Capturando o evento de input para formatar o valor
expenseValue.oninput = function() {
    // Criar regra de aceitar somente caractere numérico no campo input
    let value = expenseValue.value.replace(/[^0-9]/g, "")

    // Transformar o valor em centavos
    value = Number(value) / 100

    // transforma o valor do input para o valor formato
    expenseValue.value = formatCurrencyBRL(value)

    
    
}

function formatCurrencyBRL(value) {
    // Formata o valor capturado para moeda brasileira
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    // Retorna o valor formatado
    return value
}

// Formatando a data
function dateFormat(date) {
    return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    })
}

// Função para gerar um ID ordenado
function generateID() {
    // Verifica se já existe um ID salvo no localStorage
    let lastId = localStorage.getItem("lastId")

    if (lastId === null) {
        // Se não existir, inicia o ID com 1
        lastId = 1
    } else {
        // Se existir, porém transforma o ID no tipo Number, incrementa o ID
        lastId = Number(lastId) + 1
    }

    // Salva o ID no localStorage
    localStorage.setItem("lastId", lastId)

    return lastId
}

// Função para salvar os dados
function expenseAdd(newExpensive) {
    try {
        // Cria o elemento para adicionar na lista
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        // Cria o icone da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `assets/img/${newExpensive.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpensive.category_name)

        // Cria a info da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpensive.expense
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpensive.category_name
        expenseInfo.append(expenseName, expenseCategory)

        // Cria o valor da despesa
        const expenseMoney = document.createElement("span")
        expenseMoney.classList.add("expense-money")
        expenseMoney.innerHTML = `<small>R$</small>${newExpensive.amount.toUpperCase().replace("R$", "")}`

        // Cria o botão de excluir
        const expenseDelete = document.createElement("img")
        expenseDelete.classList.add("remove-icon")
        expenseDelete.setAttribute("src", "assets/img/remove.svg")
        expenseDelete.setAttribute("alt", "Remover despesa")

        // Adicona as informações do item
        expenseItem.append(expenseIcon, expenseInfo, expenseMoney, expenseDelete)

        // Adiciona o item na lista
        expenseList.append(expenseItem)
        
    } catch (error) {
        alert("Ocorreu um erro ao salvar a despesa")
        console.error(error)
    }


}



// Capturando os dados do formulário
form.onsubmit = function(event) {
    // impedindo que o submit do button atualize a pagina
    event.preventDefault()

    const newExpensive = {
        id: generateID(),
        expense: expenseTitle.value,
        category_id: expenseCategory.value,
        category_name: expenseCategory.options[expenseCategory.selectedIndex].text,
        amount: expenseValue.value,
        created_at: dateFormat(new Date())
    }

    expenseAdd(newExpensive)

}



