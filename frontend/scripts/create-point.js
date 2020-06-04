function populateUFs() {
  const ufSelector = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      const showState = states.map((state) => {
        ufSelector.innerHTML =
          ufSelector.innerHTML +
          `<option value="${state.id}">${state.nome}</option>`;
      });
    });
}

populateUFs();

function getCities() {
  const citySelect = document.querySelector("[name=city]");
  const stateInput = document.querySelector("[name=state]");
  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citySelect.innerHTML = "";
  citySelect.disabled = true;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      citySelect.innerHTML = "";
      const showCities = cities.map((city) => {
        citySelect.innerHTML =
          citySelect.innerHTML +
          `<option value="${city.nome}">${city.nome}</option>`;

        citySelect.disabled = false;
      });
    });

  console.log(url);
}

document.querySelector("select[name=uf").addEventListener("change", getCities);

const itemsToCollect = document.querySelectorAll(".items-grid li");

for (item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target;

  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id;

  const alreadySelected = selectedItems.findIndex((item) => item == itemId);

  if (alreadySelected >= 0) {
    const filteredItems = selectedItems.filter((item) => item !== itemId);

    selectedItems = filteredItems;
  } else {
    selectedItems.push(itemId);
  }

  console.log(selectedItems);

  collectedItems.value = selectedItems;
}
