/*
 * Mahyaddin Jabbarli, mj21068
 */
 
window.addEventListener('DOMContentLoaded', (event) => { // execute the code when the initial HTML document has been completely loaded, we need the continent select to be loaded

		var continent_s = document.getElementById("continent-select"); // get continent SELECT element
		var country_s = document.getElementById("country-select"); // get country SELECT element

		var lookup = {};

		for (let i in data) { // for every item in the data - every piece of statistic info
			let continent = data[i].continent; // read continent from data
			let country = data[i].country; // read country from data
			if (continent && !(continent in lookup)) { // if the continet hasn't been previously processed (is not present in lookup)
				lookup[continent] = {}; // add a new continent to the lookup
			}
			lookup[continent][country] = 1; // add a country to the lookup. lookup is a two-dimensional associative array/object
		}

		// console.log(lookup); // uncomment this line if you want to see the result in the console

		// now let's get all distinct continents from the lookup
		var continents = Object.keys(lookup).sort(); // get the list of keys in the lookup and sort it, Object.keys returns an array of keys of an associative array or an array of property names of an object

		// console.log(continents); // uncomment this line if you want to see the result in the console

		for (let i in continents) { // for every continent
			let opt = document.createElement('option'); // create a new OPTION element
			opt.innerHTML = continents[i]; // fill the text with the continent name
			opt.value = continents[i]; // fill the value with the continent name
			continent_s.appendChild(opt); // add newly created OPTION to the continent SELECT element
		}

		function filterCountries(continent) { // function to get an array of countries based on the continent
			var countries = []; // let's declarese a rulting array of countries that will be filled in the function; initially it is empty
			if (lookup[continent]) { // if continent is present in lookup
				countries = Object.keys(lookup[continent]); // get list of countries that corresponds to the continent from the lookup
			} else { // if continent is not present in lookup (for example, if continent = 'All'), add all countries to the countries array
				for (let continent in lookup) { // go though all continents in the lookup
					countries = countries.concat(Object.keys(lookup[continent])); // get countries for the continent and merge with the already existing items in the countries array
				}
			}

			countries.sort(); // sort the array of countries

			// console.log(countries); // uncomment this line if you want to see the result in the console

			return countries;

		}

		function fillCountries() { // function to fill the countries select element

			var continent = continent_s.selectedOptions[0].value; // get the selected continent

			var countries = filterCountries(continent); // get the array of countries that correspond to the selected continent

			country_s.innerHTML = ''; // empty the drop-down list of countries - country select
			let opt = document.createElement('option'); // create a new OPTION element
			opt.innerHTML = 'All'; // fill the text with All
			opt.value = 'All'; // fill the value with All
			country_s.appendChild(opt); // add newly created OPTION to the country select

			for (let i in countries) { // for every country
				let opt = document.createElement('option'); // create a new OPTION element
				opt.innerHTML = countries[i]; // fill the text with the country name
				opt.value = countries[i]; // fill the value with the country name
				country_s.appendChild(opt); // add newly created OPTION to the country select
			}
		}

		fillCountries(); // run the function to fill the initial list of countries, at the load time, the selected continent value is All, so the list of countries will contain all countries

		continent_s.addEventListener('change', fillCountries); // add an event listener, when a user changes a continent in the continent drop-down list, the corresponding list of countries is shown in the country drop-down list


		function processData() { // function that filters data based on user input and displays filtered data in the table
			console.log("salam")
			// get user input
			var country = country_s.selectedOptions[0].value;
			var year_from = document.getElementById("year-from").value;
			var week_from = document.getElementById("week-from").value;
			var year_till = document.getElementById("year-till").value;
			var week_till = document.getElementById("week-till").value;
			var indicator = document.querySelectorAll('input[name="indicator"]:checked')[0].value;

			// 1. code to validate input
			var year_from = document.getElementById("year-from").value;
				if( year_from === "2020"){
					document.getElementById("error").innerHTML = "";
				}
				if( year_from === "2021"){
					document.getElementById("error").innerHTML = "";
				} else{
					document.getElementById("error").innerHTML = "Add a valid year"
				}

			var week_from = document.getElementById("week-from").value;
				if(week_from >=1 && week_from <=52){

				}else{
					document.getElementById("error").innerHTML = "Add a number between 1-52 to week-from section"
				}

			var year_till = document.getElementById("year-till").value;
				if( year_till === "2020"){
					document.getElementById("error").innerHTML = "";
				}
				if( year_till === "2021"){
					document.getElementById("error").innerHTML = "";
				} else{
					document.getElementById("error").innerHTML = "Add a valid year"
				}

			var week_till = document.getElementById("week-till").value;
				if(week_till >=1 && week_till <=52){

				}else{
					document.getElementById("error").innerHTML = "Add a number between 1-52 to week-from section"
				}



			// 2. code to filter data based on the above variables
			if (indicator === "deaths") {
				document.getElementById("indicator").innerHTML = "Deaths weekly";
			}else{
				document.getElementById("indicator").innerHTML = "Cases weekly"
			}

			var filteredData = []

			for ( let c in data){
				console.log(country)
				if(data[c].country === country){
					filteredData.push(c)
				}
			}

			// 3. code to display filtered data in the table

			var table = document.getElementById("table")
			for (let i in filteredData) {
				var row = document.createElement('tr')

				var cCountry = document.createElement('td')
				cCountry.textContent = data[i].country
				row.appendChild(cCountry)

				var cPopulation = document.createElement('td')
				cPopulation.textContent = data[i].population
				row.appendChild(cPopulation)

				var cWeek = document.createElement('td')
				cWeek.textContent = data[i].year_week
				row.appendChild(cWeek)

				var cWeeklyCases = document.createElement('td')
				cWeeklyCases.textContent = data[i].weekly_count
				row.appendChild(cWeeklyCases)

				var cCumulative = document.createElement('td')
				cCumulative.textContent = data[i].cumulative_count
				row.appendChild(cCumulative)

				table.appendChild(row)
			}


		}

		document.getElementById("show-list").addEventListener('click', processData); // add an event listener, when a user clicks a button, the data in the table are updated according to new filter conditions set by a user

	});

