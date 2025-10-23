// Seleciona os elementos principais
const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const completeList = document.querySelector('.list-task');

// Array que vai armazenar as tarefas
let taskList = [];

// Função para adicionar uma nova tarefa
function AddTask() {
  const taskText = input.value.trim(); // remove espaços em branco

  if (taskText === "") return; // impede adicionar tarefa vazia

  taskList.push({
    task: taskText,
    completed: false,
  });

  input.value = ""; // limpa o campo
  input.focus(); // volta o foco pro input

  showTask(); // atualiza a tela
}

// Função que mostra todas as tarefas na tela
function showTask() {
  completeList.innerHTML = ""; // limpa a lista antes de recriar

  taskList.forEach((item, index) => {
    const li = document.createElement("li"); // cria um novo <li>
    li.className = "task"; // adiciona classe base
    li.dataset.index = index; // guarda o índice da tarefa
    if (item.completed) li.classList.add("done"); // se concluída, adiciona a classe 'done'

    // adiciona o conteúdo HTML do item
    li.innerHTML = `
      <img src="img/checked.png" alt="Marcar como concluída" class="check">
      <p>${item.task}</p>
      <img src="img/trash.png" alt="Excluir tarefa" class="delete">
    `;

    // adiciona o <li> dentro da lista
    completeList.appendChild(li);
  });

  // atualiza o localStorage
  localStorage.setItem("lista", JSON.stringify(taskList));
}

// Escuta cliques dentro da lista e descobre em qual parte o usuário clicou
completeList.addEventListener("click", (event) => {
  const element = event.element; // elemento clicado
  const parentLi = element.closest("li"); // o <li> correspondente

  if (!parentLi) return; // se clicou fora, sai da função

  const index = parentLi.dataset.index; // pega o índice da tarefa

  if (element.classList.contains("check")) {
    completeTask(index);
  }

  if (element.classList.contains("delete")) {
    deleteItem(index);
  }
});

// Marca uma tarefa como concluída ou não
function completeTask(index) {
  taskList[index].completed = !taskList[index].completed;
  showTask();
}

// Deleta uma tarefa da lista
function deleteItem(index) {
  taskList.splice(index, 1);
  showTask();
}

// Carrega as tarefas salvas no localStorage ao abrir a página
function reloadItems() {
  const tasksLocalStorages = localStorage.getItem('lista');
  if (tasksLocalStorages) {
    taskList = JSON.parse(tasksLocalStorages);
  }
  showTask();
}

// Chama a função para carregar as tarefas ao iniciar
reloadItems();

// Adiciona uma tarefa ao clicar no botão
button.addEventListener('click', AddTask);

// Adiciona uma tarefa ao apertar Enter no campo de input
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    AddTask();
  }
});
