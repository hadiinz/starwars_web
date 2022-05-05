// document.getElementById("movie1").innerHTML = "Hello World!";
let url1 = 'https://swapi.dev/api/films/4';
let url2 = 'https://swapi.dev/api/films/5';
let url3 = 'https://swapi.dev/api/films/6';
let url4 = 'https://swapi.dev/api/films/1';
let url5 = 'https://swapi.dev/api/films/2';
let url6 = 'https://swapi.dev/api/films/3';
const urlList = [url1, url2, url3, url4, url5, url6];


var arr = [];
// get movies details and names in the main page
// in front of each films , it has a starShips button 
//by clic on it ,it shows all starships's names 
(async() => {
    for(let i = 0; i < urlList.length; i++){
        console.log(urlList[i]);
        let obj = await loadUrl(urlList[i]);
        arr.push(obj);       
    
    }
    movieList = document.getElementById("movieList");
    movieList.innerHTML+= "<p>title ..... episode_id ..... release_date</p>";
    for(let i=1; i<=urlList.length ;i++){
        movieName = "movie"+i;
        butt = "b"+i;
        let movie = [arr[i-1]['title'], arr[i-1]['episode_id'], arr[i-1]['release_date']]
       
        movieList.innerHTML+= movie;
        movieList.innerHTML+= "<br/><button onclick=\"starShipsHandler("+i+")\" id=\"starShips"+i+"\" class=\"shipClass\" > starships"+i+" </button><br/>";
        // console.log(document.getElementById("starships"+i));
    }
    backToMoviePage = document.getElementById("movieList").innerHTML;
  
  })();
console.log(arr);
// fetch url and return json response
async function loadUrl(url){
    const response = await fetch(url);
    const jsonRes = await response.json();
    return jsonRes;
}
// by click on starships button , it shows a list of starships;s name
async function starShipsHandler(id){
    var starShipList =[]

    for(let i=0; i<arr[id-1]["starships"].length; i++){
        let starShip = await loadUrl(arr[id-1]["starships"][i]);
        starShipList.push(starShip);
    }
    
    document.getElementById("movieList").innerHTML = "starShips of " + "\""+ arr[id-1]["title"]+ "\"<br/>";
    console.log(starShipList);
    starShipNames = [];
    starshipsButts= [];

    for(let i=0; i<starShipList.length; i++){
        p = Math.floor(i/5);
        starshipsButts[p] ="";
    }
    for(let i=0; i<starShipList.length; i++){
        p = Math.floor(i/5);
        starshipsButts[p] += "<br/><button onclick=\"starShipDetailHandler("+id+","+i+")\" id=\"detail"+i+"\"  class=\"detailClass \">"+starShipList[i]["name"]+" </button><br/>";  
        
    }
    currentPageNumber = 0;
    StarShipsPaging(starshipsButts, currentPageNumber);

}
//starshipsButts it is an aray with a list of items, each item has 5 button 
// each button in a page
function StarShipsPaging(starshipsButts, currentPageNumber){
    if (currentPageNumber < 0)
    currentPageNumber = 0;
    let number = starshipsButts.length
    if(currentPageNumber > number)
    currentPageNumber =  number-1;
   
    document.getElementById("movieList").innerHTML = starshipsButts[currentPageNumber];
    document.getElementById("movieList").innerHTML += "<a href=\"#\" class=\"pagination__button\" onclick=\"StarShipsPaging(starshipsButts, currentPageNumber-1)\">&laquo; Previous</a>";
    document.getElementById("movieList").innerHTML += "<a href=\"#\" class=\"pagination__button\" onclick=\"StarShipsPaging(starshipsButts, currentPageNumber+1)\">Next &raquo;</a>";
    document.getElementById("movieList").innerHTML += "<button onclick=\"backToMovies(backToMoviePage)\">back to movies</button>";

}

// by click on starships names ,details of starship will be shown
async function starShipDetailHandler(idMovie, shipNumber){
    starshipsPage = document.getElementById("movieList").innerHTML;
    let starShipInMovie = await loadUrl(arr[idMovie-1]["starships"][shipNumber]);
    console.log(starShipInMovie);
    document.getElementById("movieList").innerHTML = "<p>model: "+starShipInMovie["model"]+"</p><p>manufacturer: "+ starShipInMovie["manufacturer"]+"</p><p>crew: "+starShipInMovie["crew"]+"</p><p>passengers: "+starShipInMovie["passengers"] +"</p>";
    document.getElementById("movieList").innerHTML += "<button onclick=\"backToStarShipsPage(starshipsPage)\">back to starShips</button>";

}

// back to movies page from starships page
function backToMovies(moviePage){
    document.getElementById("movieList").innerHTML = moviePage;
}
function backToStarShipsPage(starshipsPage){
    document.getElementById("movieList").innerHTML = starshipsPage;
}
