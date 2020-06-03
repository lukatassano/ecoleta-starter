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

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      const showCities = cities.map((city) => {
        citySelect.innerHTML =
          citySelect.innerHTML +
          `<option value="${city.id}">${city.nome}</option>`;

        citySelect.disabled = false;
      });
    });

  console.log(url);
}

document.querySelector("select[name=uf").addEventListener("change", getCities);
