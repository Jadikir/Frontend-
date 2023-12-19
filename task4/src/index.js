let isEdit = false;
const form = document.querySelector('.info_form');

function editItem(data) {
    isEdit = true;
    const inputs = form.querySelectorAll("input");
    inputs.forEach((item) => (item.value = data[item.id]));
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const items = JSON.parse(window.localStorage.getItem("items"));
        const obj = {};
        inputs.forEach((item) => (obj[item.id] = item.value));
        let indexOf = -1;
        items.forEach((item, index) => {
          if (+obj.id === item.id) {
            indexOf = index;
          }
        });
        items[indexOf] = obj;
        window.localStorage.setItem("items", JSON.stringify(items));
        inputs.forEach((item) => (item.value = ""));
        const itemToChange = document.getElementById(data.id);
        itemToChange.querySelector('img').src = obj.img;
        itemToChange.querySelector('.card-title').textContent = obj.title;
        itemToChange.querySelector('.card-text').textContent = `Описание: ${obj.body}`;
        itemToChange.querySelector('.card-text-deliever').textContent = `Поставщик: ${obj.deliever}`;
        itemToChange.querySelector('.id').textContent = `Код товара: ${obj.id}`;
        isEdit = false;
    }, {once:true})
  }
  function deleteItem(id) {
    const item = document.getElementById(id);
    const itemsStorage = JSON.parse(window.localStorage.getItem("items"));
    const newItems = itemsStorage.filter((item) => item.id !== id);
    window.localStorage.setItem("items", JSON.stringify(newItems));
    item.remove();
  }
const createButton = (isEdit, title, img, body, id, deliever) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "space-between";

    if (isEdit) {
        const editBtn = document.createElement("button");
        editBtn.addEventListener("click", (e) => {
            e.preventDefault();
            editItem({ title, img, body, id, deliever });
        });
        editBtn.append(document.createTextNode("Edit"));
        editBtn.classList.add('btn');
        editBtn.classList.add('btn-primary');
        editBtn.style.width = "100%";
        buttonContainer.appendChild(editBtn);
    } else {
        const deleteBtn = document.createElement("button");
        deleteBtn.addEventListener("click", (e) => {
            e.preventDefault();
            deleteItem(id);
        });
        deleteBtn.append(document.createTextNode("Delete"));
        deleteBtn.classList.add('btn');
        deleteBtn.classList.add('btn-danger');
        deleteBtn.style.width = "100%";
        buttonContainer.appendChild(deleteBtn);
    }

    return buttonContainer;
}
function addCard({ title, img, body, id, deliever }) {
    const container = document.createElement("div");
    container.classList.add("card");
    container.style.width = '18rem';
    container.classList.add("card");
    container.id = id;
    const imgElement = document.createElement('img');
    imgElement.classList.add('card-img-top');
    imgElement.src = img;
    imgElement.style.height = "50%";
    imgElement.style.width = "100%";
    const info = document.createElement("div");
    info.classList.add("card-body");
    const titleContainer = document.createElement("h5");
    titleContainer.classList.add("card-title");
    titleContainer.append(document.createTextNode(title));
    const bodyContainer = document.createElement("p");
    bodyContainer.classList.add("card-text");
    bodyContainer.append(document.createTextNode(`Описание: ${body}`));
    const providerContainer = document.createElement("p");
    providerContainer.classList.add("card-text-deliever");
    providerContainer.append(document.createTextNode(`Поставщик: ${deliever}`));
    const idContainer = document.createElement("p");
    idContainer.classList.add("id");
    idContainer.append(document.createTextNode(`Код товара: ${id}`));
    const buttonContainer = document.createElement("div");
    const editBtn = createButton(true, title, img, body, id, deliever);
    const deleteBtn = createButton(false, title, img, body, id, deliever);
    
    info.append(titleContainer);
    info.append(bodyContainer);
    info.append(providerContainer);
    info.append(idContainer);
    buttonContainer.append(editBtn);
    buttonContainer.append(deleteBtn);
    container.append(imgElement);
    container.append(info);
    container.append(buttonContainer);
    return container;
  }
(function onLoad(){
  const items = JSON.parse(window.localStorage.getItem("items"));
  const itemsContainer = window.document.querySelector(".info_items");
  if (!items) {
    const items = [
        {
            title: "Мандарины",
            img: "https://sun9-75.userapi.com/impg/E9FrH7zdq_HaS-EU4wrlq3531sDsY9zqiNHtmQ/loDK_-T1qiQ.jpg?size=1080x1098&quality=95&sign=9966d340ea8886bc700eaa0a714361e9&type=album",
            body: "Котик наелся мандаринов",
            id: 1,
            deliever: "Абхазия",
          },
          {
            title: "Тигор",
            img: "https://sun7-23.userapi.com/impg/rK7vT9knVOYFHLr9zvKVF5mAnkbWetdnjvtybg/NDQ9FkhJOTk.jpg?size=969x952&quality=96&sign=5769295eef2814d6acd508434d74a597&type=album",
            body: "Большой тигор",
            id: 2,
            deliever: "Казахстан",
          },
        {
            title: "Тигренок",
            img: "https://i.ytimg.com/vi/beyIXclkI4U/maxresdefault.jpg",
            body: "Маленький тигреночек, нежненький и маленький",
            id: 3,
            deliever: "Пятерочка",
        },
    ];
    items.map((item) => itemsContainer.append(addCard(item)));
    window.localStorage.setItem("items", JSON.stringify(items));
    
  } else {
    items.map((item) => itemsContainer.append(addCard(item)));
}
}());

const toDefault = document.getElementById('defaultClick');
toDefault.addEventListener('click', () => {
    window.localStorage.clear();
    window.location.reload();
});
form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    if (!isEdit) {
      const items = JSON.parse(window.localStorage.getItem("items"));
      const obj = {};
      const inputs = evt.target.querySelectorAll("input");
      console.log(inputs);
      inputs.forEach((item) => (obj[item.id] = item.value));
      items.push(obj);
      window.localStorage.setItem("items", JSON.stringify(items));
      const cardsContainer = window.document.querySelector(".info_items");
      cardsContainer.append(addCard(obj));
      inputs.forEach((item) => (item.value = ""));
    }
  });