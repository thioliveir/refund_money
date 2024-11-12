// Seleciona os elementos do formulário
const form = document.querySelector("form")
const expenseValue = document.querySelector("#expense-value")
const expenseTitle = document.querySelector("#expense-title")
const expenseCategory = document.querySelector("#expense-category")


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


// Capturando os dados do formulário
form.onsubmit = function(event) {
    // impedindo que o submit do button atualize a pagina
    event.preventDefault()

    const newExpensive = {
        id: new Date().getTime(),
        expense: expenseTitle.value,
        category_id: expenseCategory.value,
        category_name: expenseCategory.options[expenseCategory.selectedIndex].text,
        amount: expenseValue.value,
        created_at: dateFormat(new Date())
    }

    console.log(newExpensive)

    
}

console.log()

