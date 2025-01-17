//GLOBAL VARIABLE
const URL = "http://localhost:3000/movies"
let selectedMovie;

//DOM SELECTORS
const nav = document.querySelector("#movie-list")
const watchedBtn = document.querySelector("#watched")
const drops = document.querySelector("#amount")
const form = document.querySelector("#blood-form")



// LISTENERS
watchedBtn.addEventListener("click", toggleWatched)
form.addEventListener("submit", (e) => handleForm(e))

//Fetch
function getAllMovies(){
    return fetch(URL)
    .then(resp => resp.json())
}

//RENDER FUNCTIONS
function renderMovieArr(movieArr){
    movieArr.forEach(movieObj=> renderMovieObj(movieObj))
}

function renderMovieObj(movieObj) {
    const navImage = document.createElement("img")
    navImage.src = movieObj.image 
    navImage.addEventListener("click", handleClick)
    nav.appendChild(navImage)

    function handleClick(){
        renderDetail(movieObj)
    }
}

function renderDetail(movieObj){
    selectedMovie = movieObj
    const title = document.querySelector("#title")
    const year = document.querySelector("#year-released")
    const description = document.querySelector("#description")
    const detailImg = document.querySelector("#detail-image")
    detailImg.src = movieObj.image
    title.textContent = movieObj.title
    year.textContent = movieObj.release_year
    description.textContent = movieObj.description
    let watchVal;
    movieObj.watched ? watchVal = "Watched" : watchVal = "Unwatched"
    watchedBtn.textContent = watchVal
    drops.textContent = movieObj.blood_amount

}

// HANDLERS
function toggleWatched() {
    selectedMovie.watched = !selectedMovie.watched
    console.log(selectedMovie.watched)
    let watchVal;
    selectedMovie.watched ? watchVal = "Watched" : watchVal = "Unwatched"
    watchedBtn.textContent = watchVal
}

function handleForm(e) {
    e.preventDefault()
    //console.log("clicked")
    const bloodInput = e.target["blood-amount"].value
    //console.log(bloodInput)
    const amount = parseInt(bloodInput)
    selectedMovie.blood_amount += amount
    //console.log(amount)
    drops.textContent = selectedMovie.blood_amount
    form.reset()
}


// INITIALIZER
getAllMovies().then(movieArr => {renderMovieArr(movieArr)
renderDetail(movieArr[0])
})