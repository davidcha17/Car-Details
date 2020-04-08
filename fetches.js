const BASE_URL = "http://localhost:3000"


//fetched the backend data for cars
function getCars() {
    fetch(BASE_URL + "/cars")
    .then(r => r.json())
    .then(carsArray => showCars(carsArray))
        // data => console.log(data))
}
getCars()

//fetchedd the backend data for users
function getUsers() {
    fetch(BASE_URL + "/users")
    .then(r => r.json())
    .then(usersArray => showUsers(usersArray))
}
getUsers()


//fetched the backend data for comments 
function getComments() {
    fetch(BASE_URL + "/comments")
    .then(r => r.json())
    .then(commentsArray => showComments(commentsArray))
}
getComments()

//fetched the backend data for cars liked
// function getCarsLiked() {
//     fetch(BASE_URL + "/car_likes")
//     .then(r => r.json())
//     .then(likesArray => console.log(likesArray))
// }
// getCarsLiked()

function loginOneUser() {
    fetch(BASE_URL + "/users")
    .then(r => r.json())
    .then()
    
}