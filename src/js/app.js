// Pega a data
let dias = document.getElementById('dias');

const date = new Date();
let dia = date.getDate().toString().padStart(2, "0");
let diaSemana = date.toLocaleString("pt-BR", { weekday: "long" }).replace(".", "")
let mes = date.toLocaleString("pt-BR", { month: "long" }).replace(".", "");

dias.innerHTML = `<div class='calendario'><div class="diaSemana"><p>${diaSemana}</p></div><div class="dia"><p>${dia}</p></div><div class="mes"><p>${mes}</p></div></div>`;


// Função para adicionar tarefa

let lista = document.querySelector('ul');
let barraProgresso = document.getElementById('barraProgresso')
let quantTarefas = 0;
let quantFeitas = 0;

$("#tarefa").on("keypress", function(e) {
    if (e.keyCode == 13) {
        adicionaTarefa(e);
    }
  });
  
  function adicionaTarefa(e) {
    if (!(/\w/.test($("#tarefa").val()))) {
        e.preventDefault();
        $('#erro').html('Preencha algo!');
    } else {
        $('#erro').html('');
        let tarefa = document.getElementById('tarefa').value;
        let lista = document.getElementById('lista');
        lista.innerHTML += `<li class="itens">${tarefa}<div class="fecha">x</div></li>`
        quantTarefas++
        porcentagemBarra(quantTarefas, quantFeitas)
        if(document.getElementById('primeiro').classList.contains("esconde") == false){
            document.getElementById('primeiro').classList.add("esconde")
        }
        document.getElementById('tarefa').value = '';
        console.log('aumenta total', quantTarefas)
    }
}

// Função para adicionar ou remover estilo de check 

function verificaCheck(ev){
    let aux = ev.target.classList.toggle('checked');
    if(ev.target.tagName === 'LI'){

        if(aux == true){
            quantFeitas++;
            porcentagemBarra(quantTarefas, quantFeitas)
        }else{
            quantFeitas--;
            porcentagemBarra(quantTarefas, quantFeitas)
        }
    }
}
lista.addEventListener('click', verificaCheck)

// Função para remover tarefa

function removeTarefa(ev){
    if(ev.target.tagName === 'DIV'){
        ev.target.parentElement.remove()
        if(quantFeitas > 0){
            quantFeitas--
        }
        quantTarefas--
    }
    porcentagemBarra(quantTarefas, quantFeitas)
    console.log('diminui total', quantTarefas)
}
lista.addEventListener('click', removeTarefa)

function porcentagemBarra(total, feitas){
    if(total == feitas){
        barraProgresso.value="100"
    }
    
    if(feitas == 0){
        barraProgresso.value="0"
    }

    if(total != feitas && feitas > 0){
        let porcentagem = 100 * feitas / total
        barraProgresso.value = porcentagem
    }
}