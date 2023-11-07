const countryDetail = document.getElementById("detail-container");

// Function to retrieve the value of a URL parameter
function getURLParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Retrieve the encoded country data from the URL parameter
const encodedCountryData = getURLParameter('country');

// Decode the country data
const countryData = JSON.parse(decodeURIComponent(encodedCountryData));



// Use the country data to update the detail card
let detailCard = document.createElement("div");
detailCard.classList.add("detail-container");
detailCard.innerHTML = `
<div class="left">
  <img class="flagImg" src="${countryData.flags.png}" alt="flag">
</div>
<div class="right">
  <div class="country-detail-name"><h1>${countryData.name.common}</h1></div>
  <div class="country-detail-info">
    <div class="l1">
      <p>Native Name: ${countryData.name.official}</p>
      <p>Population: ${countryData.population}</p>
      <p>Region: ${countryData.region}</p>
      <p>Sub Region: ${countryData.subregion}</p>
      <p>Capital: ${countryData.capital}</p>
    </div>
    <div class="r1">
      <p>Top Level Domain: ${countryData.tld[0]}</p>
      <p>Currencies: ${Object.entries(countryData.currencies)
        .map(([code]) => code)
        .join(', ')}</p>
      <p>Languages: ${Object.values(countryData.languages)}</p>
    </div>
  </div>
  <div class="country-detail-border">
    <p>Border Countries: ${countryData.borders}</p>
  </div>
</div>`;

countryDetail.appendChild(detailCard);
