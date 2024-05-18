const countries = document.querySelector(".country-name");

let countryName = new URLSearchParams(window.location.search);
countryName = countryName.get("name");

async function fetchdata() {
    try {
        const respons = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await respons.json();
        data.forEach((country) => {
            const card = document.createElement("div");
            card.classList.add("coun", "d-flex","card", "row", "shadow");
            card.style.border = "none";
            console.log(country);
            const lang = Object.values(country.languages).join(", ");
            const currencies = Object.keys(country.currencies).join(", ");

            console.log(lang);
            card.innerHTML = `
            <div class="flag d-flex flex-nowrap justify-content-center align-content-center p-4">
                        <div style="width:400px">
                            <img class='w-100 h-100 ' src="${country.flags.png}" alt="">
                        </div>
                        </div>
                        <div class=" country-info gap-1 d-flex justify-content-center align-content-center p-lg-4 pb-4   ">
                            
                            <div class="country-info_detals  ">
                                <h2>${country.name.common}</h2>
                                <div class="col">
                                    <h4>Native Name:<span>${country.name.official}</span></h4>
                                    <h4>Population: <span>${country.population}</span></h4>
                                    <h4>Region: <span>${country.region}</span></h4>
                                    <h4>Sub Region: <span>${country.subregion}</span></h4>
                                    <h4>Capital: <span>${country.capital}</span></h4>
                                </div>
                                <div class="col">
                                    <h4> Top level Domain:<span>${country.tld}</span></h4>
                                    <h4> Currencies: <span>${currencies}</span></h4>
                                    <h4> Languages: <span>${lang}</span></h4>
                                </div>
                                <h3>borders</h3>
                                ${country.borders
                    .map((border) => {
                        const button = document.createElement("button");
                        button.classList.add("btn");
                        button.onclick = () => { findCountry(border) };
                        button.innerText = border;
                        return button.outerHTML;
                    })
                    .join("")}
                            </div>


                        </div>
                    </div>
                
                
                


            
            `;
            countries.appendChild(card);

        });
    } catch (error) {
        console.error("Error fetching data:", error);
    };
};

fetchdata();

async function findCountry(cca3) {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const country = data.find((country) => country.cca3 == cca3);
        console.log("Country", country);
        window.location.href = `detail.html?name=${country.name.common}`;


    } catch (error) {
        console.error("Error fetching data:", error);
    };
}
