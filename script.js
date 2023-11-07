const searchbar = document.getElementById("searchBar");
const filterbar = document.getElementById("filterBar");
const countryDetail = document.getElementById("detail-container");

// Select the container element for the country cards
const container = document.getElementById("cardsContainer");


let card;
function countryCard(x) {
  card = document.createElement("div");
  card.classList.add("card");

  card.setAttribute('data-country-data', JSON.stringify(x));
 
  card.innerHTML = `
        <img class="flag-img" src="${x.flags.png}" alt="flag">
        <div class="card-info">
          <h1 class="cardName" style="padding-left: 20px;"><b>${x.name.common}</b></h1>
          <div class="country-details">
            <p>Population: <span>${x.population}</span></p>
            <p>Region: <span>${x.region}</span></p>
            <p>Capital: <span>${x.capital}</span></p>
          </div>
        </div>`;

        

 
  return card;
}




//function returns country details
function getCountries(filter) {
  fetch(`https://restcountries.com/v3.1/${filter}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Iterate over the countries
      data.forEach((country) => {
        container.appendChild(countryCard(country));
      });
    })
    .catch((error) => {
      console.log("Failed to retrieve data from the API:", error);
    });
}



// Fetch the data from the API
let searchTerm = "all";
getCountries(searchTerm);



//Search bar functionality
searchbar.addEventListener("input", (e) => {
  if (searchbar.value === "") {
    getCountries("all");
  } 
  else {
    let searchTerm = `name/${e.target.value}`;
    container.innerHTML = "";
    getCountries(searchTerm);
  }
});



//filter bar functionality
filterbar.addEventListener("change", (e) => {
  console.log(e.target.value);
  let searchTerm = filterbar.value.trim();

  if (searchTerm === "filter" || searchTerm === "") {
    container.innerHTML = ""
    getCountries("all");
  } else {
    let searchTerm = `region/${e.target.value}`;
    container.innerHTML = "";
    getCountries(searchTerm);
  }
});




container.addEventListener('click',(event)=>{
  
  const card = event.target.closest('.card');

  // Check if a card element was found
  if (card) {
    // Get the country data from the card's data attribute
    const countryData = JSON.parse(card.getAttribute('data-country-data'));

    // Encode the country data to be passed as a URL parameter
    const encodedCountryData = encodeURIComponent(JSON.stringify(countryData));

    // Redirect to country.html with the country data as a URL parameter
    window.location.href = `country.html?country=${encodedCountryData}`;
  }

})


