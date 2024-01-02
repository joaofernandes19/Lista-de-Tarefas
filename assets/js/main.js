const inputtarefa = document.querySelector('.input-tarefa');
const buttontarefa = document.querySelector('.button-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi(){
    const li = document.createElement('li');
    return li;
}
inputtarefa.addEventListener('keypress', function(e){
    if(e.keyCode === 13){
        if(!inputtarefa.value) return;
        criaTarefa(inputtarefa.value);
        limpaInput();
    }
}); 
function apagar(li){
    li.innerText +=' ';
    const btnapagar = document.createElement('button');
    btnapagar.innerText = 'Apagar';
    btnapagar.setAttribute('class', 'apagar');
    btnapagar.setAttribute('title', 'Apagar esta tarefa');
    li.appendChild(btnapagar);
}
function limpaInput(){
    inputtarefa.value ='';
    inputtarefa.focus();
}
function criaTarefa(textInput) {
    const li = criaLi();
    li.innerHTML = textInput;
    tarefas.appendChild(li);
    limpaInput();
    apagar(li);
    salvarTarefas();
}

buttontarefa.addEventListener('click', function(){
    if(!inputtarefa.value) return;
    console.log(inputtarefa.value);
    criaTarefa(inputtarefa.value);
});

document.addEventListener('click', function(e){
    const el = e.target; // click do mouse no botão
    if(el.classList.contains('apagar')){
        el.parentElement.remove();  //Remove o pai do elemento na lista.
        salvarTarefas();
    }
});

function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li');
    const  listaDeTarefas = [];

    for(let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar','').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas',  tarefasJSON);
}

function tarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for (const i of listaDeTarefas) {
        criaTarefa(i);
    }
    
}
tarefasSalvas();