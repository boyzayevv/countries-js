const search = document.querySelector("#search");
const main = document.querySelector("#main");
let countries;

fetch('https://restcountries.com/v3.1/all/')
    .then(res => res.json())
    .then(json => {
        countries = json;
        displayCountries(json);
    })
    .catch(error => {
        console.error("Error fetching countries:", error);
    });

function displayCountries(countries) {
    main.innerHTML = '';
    try {
        countries.forEach((e) => {
            const card = document.createElement("div");
            card.classList.add("coun", "card", "shadow", "col-xl-3", "col-md-5", "col-lg-5", "col-sm-6", "mt-3");
            card.style.border = "none";
            card.innerHTML = `
            <a style='text-decoration: none; color: black;' >

            <img class="card-img-bottom w-100 ""
                src="${e.flags.png}"
                alt="Card image" style="width:100%">
            <div class="card-body">
                <h3 class="card-title fw-bold ">${e.name.common}</h3>
                <h5 class="card-text">Population: ${e.population}</h5>
                <h5 class="card-text">Region: ${e.region}</h5>
                <h5 class="card-text">Capital: ${e.capital}</h5>
                <button class='btn btn-primary' onclick="showDetails('${e.name.common}')">Details</button>

            </div>
            </a>
                `;
            main.appendChild(card);
        });
    } catch (error) {
        console.error("Error displaying countries:", error);
    }
}

function showDetails(countryName) {
    try {
        window.location.href = `detail.html?name=${countryName}`;
    } catch (error) {
        console.error("Error redirecting to details page:", error);
    }
}

search.addEventListener("input", function () {
    let value = search.value.toLowerCase();
    try {
        const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(value));
        displayCountries(filteredCountries);
    } catch (error) {
        console.error("Error filtering countries:", error);
    }
});