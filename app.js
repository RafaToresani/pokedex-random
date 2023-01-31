const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');
const randomBtn = document.querySelector('.random-btn');

const typeColors = {
  electric: '#FFEA70',
  normal: '#B09398',
  fire: '#FF675C',
  water: '#0596C7',
  ice: '#AFEAFD',
  rock: '#999799',
  flying: '#7AE7C7',
  grass: '#4A9681',
  psychic: '#FFC6D9',
  ghost: '#561D25',
  bug: '#A2FAA3',
  poison: '#795663',
  ground: '#D2B074',
  dragon: '#DA627D',
  steel: '#1D8A99',
  fighting: '#2F2F2F',
  default: '#2A1A1F',
};

function getRandomInt() {
  return Math.floor(Math.random() * (1009 - 1) + 1);
}

randomBtn.addEventListener('click', ()=>{
  const value=getRandomInt();
  fetchData(value.toString());
})

const searchPokemon = async (e) => {
  e.preventDefault();
  const { value } = e.target.pokemon;
  fetchData(value);
}

const fetchData = async (value)=>{
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`);
    const data = await res.json();
    renderPokemonData(data);
  } catch (err) {
    renderNotFound();
  }
}

const renderPokemonData = data => {
  const sprite = data.sprites.front_default;
  const { stats, types } = data;

  pokeName.textContent=data.name;
  pokeImg.setAttribute('src', sprite);
  pokeId.textContent = `N°${data.id}`;
  setCardColor(types);
  renderPokemonTypes(types);
  renderPokemonStats(stats);


}

const setCardColor = types => {
  const color1 = typeColors[types[0].type.name];
  const color2 = types[1] ? typeColors[types[1].type.name] : typeColors.default;
  pokeImg.style.background = `radial-gradient(${color2} 33%, ${color1} 33%)`
  pokeImg.style.backgroundSize = '5px 5px';
}

const renderPokemonTypes = types =>{
  pokeTypes.innerHTML = '';
  types.forEach(type => {
    const typeText = document.createElement("div");
    typeText.style.color=typeColors[type.type.name];
    typeText.textContent = type.type.name;
    pokeTypes.appendChild(typeText);
  })
}

const renderPokemonStats = stats =>{
  pokeStats.innerHTML = '';
  stats.forEach(stat => {
    const statElement = document.createElement('div');
    const statElementName = document.createElement('div');
    const statElementValue = document.createElement('div');

    statElementName.textContent = stat.stat.name;
    statElementValue.textContent = stat.base_stat;
    statElement.appendChild(statElementName);
    statElement.appendChild(statElementValue);
    pokeStats.appendChild(statElement);
  })
}

const renderNotFound= () => {
  pokeName.textContent='Pokémon no encontrado';
  pokeImg.setAttribute('src', 'poke-shadow.png');
  pokeImg.style.background = `#fff`;

  pokeTypes.innerHTML='';
  pokeStats.innerHTML='';
  pokeId.textContent='';
}
