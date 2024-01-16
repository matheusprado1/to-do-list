let data = [];

const tasks = document.querySelector("#tasks");

const renderTasks = () => {
  tasks.innerHTML = "";

  data.forEach(item => {
    tasks.insertAdjacentHTML("beforeend",
      `
      <div class="task__container">
        <p>${item.description}</p>
        <button data-id=${item.id} class="delete__button">Remove</button>
      </div>
    `,
    )
  })
  removeTask();
}

const disableEmptyContainer = () => {
  const emptyContainer = document.querySelector("#empty");

  if (data.length > 0) {
    emptyContainer.classList.add("disable");
  } else {
    emptyContainer.classList.remove("disable");
  }
}

const addTask = () => {
  const input = document.querySelector(".form__input");
  const button = document.querySelector(".form__button");

  button.addEventListener("click", (event) => {
    event.preventDefault();

    let value = input.value;

    if (!value) {
      alert("Inválid Task!")
    } else {
      data.push({ id: generateRandomId(), description: value });

      const dataJSON = JSON.stringify(data);
      localStorage.setItem("toDoList", dataJSON);

      getDataInLocalStorage();

      renderTasks();
      disableEmptyContainer();
      input.value = "";
    }

  })

}
addTask();

const generateRandomId = () => Math.floor(Math.random() * 1000);

const removeTask = () => {

  const deleteButton = [...document.querySelectorAll(".delete__button")];

  deleteButton.forEach(item => item.addEventListener("click", () => {
    const dataId = item.getAttribute("data-id");
    const findItem = data.findIndex(item => item.id === +dataId);

    if (findItem !== -1) {
      data.splice(findItem, 1);

      const dataJSON = JSON.stringify(data);
      localStorage.setItem("toDoList", dataJSON);

      getDataInLocalStorage();
      renderTasks();
      disableEmptyContainer();
    }
  })
  )
}

const getDataInLocalStorage = () => {
  const dataInLocalStorageJSON = localStorage.getItem("toDoList");

  if (dataInLocalStorageJSON) {
    const dataInLocalStorage = JSON.parse(dataInLocalStorageJSON);

    data = dataInLocalStorage;

    renderTasks();
    disableEmptyContainer();
  }
}
getDataInLocalStorage();
