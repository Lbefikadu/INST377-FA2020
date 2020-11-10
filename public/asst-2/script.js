// https://www.youtube.com/watch?v=y4gZMJKAeWs&list=PLu8EoSxDXHP6CGK4YVJhL_VWetA865GOH&index=6
const restaurants = [];

function findMatches(wordToMatch, restaurants) {
  return restaurants.filter((place) => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.name.match(regex) || place.category.match(regex);
  });
}

function displayMatches(e, restaurants) {
  const matchArray = findMatches(e.target.value, restaurants);
  let html = matchArray.map((place) => `
      <li>
        <span class="name">${place.name}</span><br>
        <span class="population">${place.category}</span><br>
        <span class="address">${place.address_line_1}</span><br>
        <span class="city">${place.city}</span><br>
        <span class="zip">${place.zip}</span><br>
      </li>
      
    `).join('');
  if (e.target.value.length == 0) {
    html = [];
  }
  return html;
}
async function main() {
  const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  const json = await data.json();
  const searchInput = document.querySelector('.search');

  searchInput.addEventListener('input', (e) => {
    const target = document.querySelector('.suggestions');
    const makelist = displayMatches(e, json);
    target.innerHTML = makelist;
  });
}
window.onload = main;
