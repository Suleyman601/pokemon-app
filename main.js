//dom elements
let numElement = document.querySelector('#num');
let nameElement = document.querySelector('#name');
let typeElement = document.querySelector('#type');
let heightElement = document.querySelector('#height');
let weightElement = document.querySelector('#weight');
let flavorTextElement = document.querySelector('#flavortxt');
let imgElement = document.querySelector('img');
let searchInputElement = document.querySelector('#search');
let searchBtnElement = document.querySelector('#search-btn');
let randomBtnElement = document.querySelector('#random');
function fetchData(pokeNameOrID){
  let str = 'lucario';
  if(pokeNameOrID !== ""){
    str = pokeNameOrID;
  }
    
  fetch(`https://pokeapi.co/api/v2/pokemon/${str}`).then(function (response){
  return response.json();
  }).then(function (data){
    let height = Math.round((data.height / 10) * 10)/10;
    let weight = Math.round((data.weight/10) * 10)/10;
    let name = data.name;
    let type = data.types[0].type.name;
    numElement.innerHTML = "#" + data.id;
    nameElement.innerHTML = name.charAt(0).toUpperCase() + name.slice(1);
    typeElement.innerHTML = type.charAt(0).toUpperCase() + type.slice(1);
    heightElement.innerHTML = height + " m";
    weightElement.innerHTML = weight + " kg";
    imgElement.setAttribute('src', data.sprites.front_default)
    fetch(data.species.url).then(function (response){
      return response.json();
    }).then(function (newData){
      console.log(newData.flavor_text_entries.length);
      
      let flavorTxt = "";
      for (let index = 0; index < newData.flavor_text_entries.length; index++) {
        const element = newData.flavor_text_entries[index];
        if(element.language.name == "en" && element.flavor_text.length < 140){
          flavorTxt = element.flavor_text;
          break;
        } 
      }
      flavorTextElement.innerHTML = flavorTxt.replace("", " ");
    });
  });
}
function btnEvent(e){
  if(e.target.id == "search-btn"){
    fetchData(searchInputElement.value);
  }
  else{
    let randNum = Math.floor(Math.random() * 898) + 1;
    fetchData(randNum);
  }
}

document.onload = fetchData("");

searchBtnElement.addEventListener('click', btnEvent);
randomBtnElement.addEventListener('click', btnEvent);
