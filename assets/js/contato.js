
// ==========================================
// FORMULÁRIO E RESUMO DE ERROS
// ==========================================

const formulario = document.querySelector("#form-contato");
const resumoErros = document.querySelector("#resumo-erros");


// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================

// Exibe uma mensagem de erro no campo.
function mostrarErro(campo, elementoErro, mensagem) {

    campo.setAttribute("aria-invalid", "true");

    elementoErro.textContent = mensagem;
    elementoErro.setAttribute("role", "alert");
}


// Remove a mensagem e o estado de erro.
function limparErro(campo, elementoErro) {

    campo.removeAttribute("aria-invalid");

    elementoErro.textContent = "";
    elementoErro.removeAttribute("role");
}


// ==========================================
// VALIDAÇÃO DO NOME
// ==========================================

const nome = document.querySelector("#nome");
const erroNome = document.querySelector("#erro-nome");

function validarNome() {

    const nomeInformado = nome.value.trim();

    if (nomeInformado.length < 3 || !/\S+\s+\S+/.test(nomeInformado)) {

        mostrarErro(
            nome,
            erroNome,
            "Informe seu nome completo."
        );

        return false;
    }

    limparErro(nome, erroNome);

    return true;
}

nome.addEventListener("blur", validarNome);


// ==========================================
// VALIDAÇÃO DO E-MAIL
// ==========================================

const email = document.querySelector("#email");
const erroEmail = document.querySelector("#erro-email");

function validarEmail() {

    if (email.value.trim() === "") {

        mostrarErro(
            email,
            erroEmail,
            "Informe seu endereço de e-mail."
        );

        return false;
    }

    if (!email.validity.valid) {

        mostrarErro(
            email,
            erroEmail,
            "Informe um e-mail válido, como nome@dominio.com."
        );

        return false;
    }

    limparErro(email, erroEmail);

    return true;
}

email.addEventListener("blur", validarEmail);


// ==========================================
// VALIDAÇÃO DO CPF
// ==========================================

const cpf = document.querySelector("#cpf");
const erroCpf = document.querySelector("#erro-cpf");

function validarCpf() {

    const somenteNumeros = cpf.value.replace(/\D/g, "");

    if (somenteNumeros.length !== 11) {

        mostrarErro(
            cpf,
            erroCpf,
            "Informe o CPF utilizando 11 números."
        );

        return false;
    }

    limparErro(cpf, erroCpf);

    return true;
}

cpf.addEventListener("blur", validarCpf);


// ==========================================
// VALIDAÇÃO DA DATA DE NASCIMENTO
// ==========================================

const nascimento = document.querySelector("#nascimento");
const erroNascimento = document.querySelector("#erro-nascimento");

function validarNascimento() {

    if (nascimento.value === "" || !nascimento.validity.valid) {

        mostrarErro(
            nascimento,
            erroNascimento,
            "Informe uma data de nascimento válida."
        );

        return false;
    }

    limparErro(nascimento, erroNascimento);

    return true;
}

nascimento.addEventListener("blur", validarNascimento);


// ==========================================
// VALIDAÇÃO DA SENHA
// ==========================================

const senha = document.querySelector("#senha");
const erroSenha = document.querySelector("#erro-senha");

function validarSenha() {

    if (senha.value.length < 8) {

        mostrarErro(
            senha,
            erroSenha,
            "A senha deve possuir pelo menos 8 caracteres."
        );

        return false;
    }

    limparErro(senha, erroSenha);

    return true;
}

senha.addEventListener("blur", validarSenha);


// ==========================================
// VALIDAÇÃO DA CONFIRMAÇÃO DE SENHA
// ==========================================

const confirmarSenha = document.querySelector("#confirmar-senha");
const erroConfirmarSenha = document.querySelector("#erro-confirmar-senha");

function validarConfirmacaoSenha() {

    if (confirmarSenha.value === "") {

        mostrarErro(
            confirmarSenha,
            erroConfirmarSenha,
            "Confirme sua senha."
        );

        return false;
    }

    if (confirmarSenha.value !== senha.value) {

        mostrarErro(
            confirmarSenha,
            erroConfirmarSenha,
            "A confirmação de senha deve ser igual à senha."
        );

        return false;
    }

    limparErro(confirmarSenha, erroConfirmarSenha);

    return true;
}

confirmarSenha.addEventListener(
    "blur",
    validarConfirmacaoSenha
);


// Revalida a confirmação se a senha original mudar.
senha.addEventListener("change", function () {

    if (confirmarSenha.value !== "") {
        validarConfirmacaoSenha();
    }
});


// ==========================================
// VALIDAÇÃO DO ACEITE DOS TERMOS
// ==========================================

const aceite = document.querySelector("#aceite");
const erroAceite = document.querySelector("#erro-aceite");

function validarAceite() {

    if (!aceite.checked) {

        mostrarErro(
            aceite,
            erroAceite,
            "Você precisa aceitar os termos para continuar."
        );

        return false;
    }

    limparErro(aceite, erroAceite);

    return true;
}

aceite.addEventListener("change", validarAceite);


// ==========================================
// RESUMO DE ERROS
// ==========================================

function mostrarResumo(erros) {

    // Limpa o conteúdo anterior.
    resumoErros.innerHTML = "";

    // Cria o título.
    const titulo = document.createElement("h2");

    titulo.textContent = "Corrija os seguintes campos:";

    resumoErros.appendChild(titulo);

    // Cria a lista.
    const lista = document.createElement("ul");

    erros.forEach(function (erro) {

        const item = document.createElement("li");

        const link = document.createElement("a");

        // Link para o campo com erro.
        link.href = `#${erro.campo.id}`;

        link.textContent = erro.mensagem;

        item.appendChild(link);

        lista.appendChild(item);
    });

    resumoErros.appendChild(lista);

    // Exibe o resumo.
    resumoErros.hidden = false;

    // Move o foco para o resumo.
    resumoErros.focus();
}


// ==========================================
// VALIDAÇÃO NO ENVIO
// ==========================================

formulario.addEventListener("submit", function (event) {

    // Impede o envio real nesta atividade.
    event.preventDefault();

    const erros = [];

    // Nome
    if (!validarNome()) {

        erros.push({
            campo: nome,
            mensagem: erroNome.textContent
        });
    }

    // E-mail
    if (!validarEmail()) {

        erros.push({
            campo: email,
            mensagem: erroEmail.textContent
        });
    }

    // CPF
    if (!validarCpf()) {

        erros.push({
            campo: cpf,
            mensagem: erroCpf.textContent
        });
    }

    // Data de nascimento
    if (!validarNascimento()) {

        erros.push({
            campo: nascimento,
            mensagem: erroNascimento.textContent
        });
    }

    // Senha
    if (!validarSenha()) {

        erros.push({
            campo: senha,
            mensagem: erroSenha.textContent
        });
    }

    // Confirmação de senha
    if (!validarConfirmacaoSenha()) {

        erros.push({
            campo: confirmarSenha,
            mensagem: erroConfirmarSenha.textContent
        });
    }

    // Termos
    if (!validarAceite()) {

        erros.push({
            campo: aceite,
            mensagem: erroAceite.textContent
        });
    }

    // Verifica se existem erros.
    if (erros.length > 0) {

        mostrarResumo(erros);

        return;
    }

    // Esconde o resumo de erros.
    resumoErros.hidden = true;
    resumoErros.innerHTML = "";

    // Simula o sucesso.
    alert("Formulário preenchido corretamente.");
});


// ==========================================
// FOCO NOS LINKS DO RESUMO DE ERROS
// ==========================================

resumoErros.addEventListener("click", function (event) {

    const link = event.target.closest("a");

    if (!link || !resumoErros.contains(link)) {
        return;
    }

    const seletor = link.getAttribute("href");

    const campo = document.querySelector(seletor);

    if (campo) {

        event.preventDefault();

        // Move o foco para o campo com erro.
        campo.focus();
    }
});
