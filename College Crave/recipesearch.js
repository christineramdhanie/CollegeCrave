function search (searchword){
    var request = new XMLHttpRequest();
	var lastsearch= 'NULL'
	if (lastsearch!= 'NULL'){
		document.body.innerHTML = "";
	}
    var searchword = document.getElementById('searchbar').value;
    let requesturl = 'https://api.spoonacular.com/recipes/search?apiKey=cace61174f3e4ee099584d14b31fdba0&query='+ searchword +'&number=10'
	console.log(request);

    request.onload = function() { // function works as soon as webpage loads
        if (this.readyState == 4 && this.status == 200) {

            var data = JSON.parse(JSON.stringify(this.response))
            console.log(data); //output api data that is being searched on console

            var i;
			for(i=0; i<10; i++){
				clearBox('output');
			}
			
			for(i=0; i<10; i++){ //output each recipe in its own div container
				var divs = createDiv (); // creates a div container and returns array

                const imgcontainer = document.createElement('div'); //creates a div container for the image within the recipe div
                imgcontainer.setAttribute('class', 'img_cont');
                divs[i].appendChild(imgcontainer);

                var imagetag = document.createElement("img"); // creates img image tag for every image div container
                imagetag.setAttribute("src", data.baseUri + data.results[i].image);
                imagetag.setAttribute("class","recipeimg");
                imgcontainer.appendChild(imagetag);

                const detailscontainer = document.createElement('div'); //creates a div container for the details within the recipe div
                detailscontainer.setAttribute('class', 'details_cont');
                divs[i].appendChild(detailscontainer);

                var header = document.createElement("h3"); // creates h3 header tag for every details div container 
                header.innerHTML = data.results[i].title;
                detailscontainer.appendChild(header);

                var readytime = document.createElement("p"); // creates p paragragh tag for every div container 
                readytime.innerHTML = "Ready in: " + data.results[i].readyInMinutes + " minutes";
                detailscontainer.appendChild(readytime);

                var servingsize = document.createElement("p"); // creates p paragragh tag for every div container 
                servingsize.innerHTML = "Servings: " + data.results[i].servings;
                detailscontainer.appendChild(servingsize);

                var recipeURL = document.createElement("a"); // creates a hyperlink tag for every div container 
                recipeURL.setAttribute("href", data.results[i].sourceUrl);
                recipeURL.setAttribute("class","recipeurl");
                recipeURL.innerHTML = "View Recipe";
                detailscontainer.appendChild(recipeURL);

                var k;
                for (k=1; k<=2; k++){ // breaks line twice
                    var breakline = document.createElement("br");
                    divs[i].appendChild(breakline);
               
                }
            }
        }
    };

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', requesturl, true)
    request.responseType = 'json';
	
	lastsearch=search;

    // Send request
    request.send()
	
}

function createDiv (){ // function creates a div tag

    var recipe_container = document.createElement('div');
    recipe_container.className = "recipe_container";
    document.getElementById('output').appendChild(recipe_container);

    let divs = document.getElementsByClassName("recipe_container"); // stores all div tags with class name "recipe_cont" in array divs
    return divs; // returns array
}

function clearBox(elementID)
{
    document.getElementById(elementID).innerHTML = "";
}