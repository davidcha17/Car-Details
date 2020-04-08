/********* APPLICATION STATE *********/





/*********** DOM ELEMENTS ***********/
const userLogin = document.querySelector("#login")
const login = document.querySelector("#login-page")
const carsList = document.createElement("li")
const thisSubmitButton = document.querySelector("#submit")
const thisSpan = document.querySelector("#one-car-container span")
let thisUserLoggedIn = {}


/********** EVENT LISTENERR ***********/
// 
function editCar(carId) {
    fetch(`http://localhost:3000/cars/${carId}`)
    .then(r => r.json())
    .then(carObj => { 
        let thisCarDetail = document.querySelector("span")

        thisCarDetail.innerHTML =
        `
        <img class='car-img' alt=${carObj.model} src="${carObj.img_url}"> <br>
        
        <label for="description"><b>Car Description</b></label>
        <textarea id="car-description" type="text" placeholder="${carObj.description}" description="description" required></textarea> <br>

        <button id="save" class="btn save-info"> Save Edit </button>
        `
        let thisDescription = document.querySelector("#car-description")
        let saveButton = document.querySelector(".btn")

                saveButton.addEventListener("click", event => {
                    event.preventDefault()
                    // console.log("click")
                    const clickSaveForDescription = thisDescription.value 
                    console.log(clickSaveForDescription)

                    fetch(`http://localhost:3000/cars/${carObj.id}`, {
                        method: "PATCH",
                        headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'   
                        },
                        body: JSON.stringify( {description: clickSaveForDescription } )
                    })
                        .then(r => r.json())
                        .then(car => carsClickedFromList(car))
                            // carsClickedFromList(carId)
                        // console.log(carsClickedFromList(carObj.id))
                        // alert("Car description successfully updated!")
                })


    })
}

function carsClickedFromList(car) {
    const showDetailsOfACar = document.querySelector("#one-car-container")
    const carDetails = document.createElement("span")
    const UserDiv = document.createElement("div")
    // const thisSpan = document.querySelector("#one-car-container span")
    const carsList = document.createElement("li")
    const comments = car.comments
    const thisSubmitButton = document.querySelector("#submit")
// show user in the same container
// console.log(commentForm)
        console.log(car.comments)

    carDetails.innerHTML = 
    `
        <img id="image" class='car-img' alt=${car.model} src="${car.img_url}">
        Car_ID: ${car.id},
        <li id="brand"> Brand: ${car.brand}, </li>
        Model: ${car.model},
        Category: ${car.category},
        Year Made: ${car.year},
        MSRP: $${car.MSRP} <br>
        MPG: ${car.MPG} <br>
        Description: ${car.description} <br>
        0-60: ${car.zero_to_sixty} seconds <br>
        Top Speed: ${car.top_speed} mph <br>
        Horse Power: ${car.horse_power} <br>
        <button id="edit"> Edit Description </button>
        <div> Comments: ${car.comments.map(comment => {return comment.contents}).join("<br>")} </div>
            <form id="content-form" class="form">
                <textarea id="text-area" name="content" placeholder="Enter content..."></textarea>
                <input id="submit" type="submit" value="Add Content" class="button">
            </form>
    `
        // const grabContent = document.querySelector("#content-form")
        // console.log(car.comments.user)
    const commentForm = carDetails.querySelector("#content-form")
    const textArea = carDetails.querySelector("#text-area")


    showDetailsOfACar.innerHTML = ""
    showDetailsOfACar.append(carDetails)

    // const clickedImage = carDetails.querySelector("#image")
    // This is when we click on a car image and it reverses a string
    // clickedImage.addEventListener("click", () => {
    //     fetch(`http://localhost:3000/cars/${car.id}`, {
    //                 method: "PATCH",
    //                     headers: { 
    //                     'Content-Type': 'application/json',
    //                     'Accept': 'application/json'   
    //                     },
    //                     body: JSON.stringify( {brand: car.brand })
    //     })
    //     .then(r => r.json())
    //     .then(brandObj => renderfunction () => {

    //     })



    //     const carModel = carDetails.querySelector("#brand")
    //     carModel.innerHTML = 
    //     `
    //     <li id="brand"> Brand: ${car.brand}, </li>
    //     `
    //     console.log(car.id)

    // })
    // this is a event listener and send it to the event handle editCar
    const editButton = carDetails.querySelector("#edit")
    // let editButton = document.getElementById("edit")
    editButton.addEventListener("click", () => {
        editCar(car.id)
        })


    commentForm.addEventListener("submit", event => {
        event.preventDefault()
        // console.log(thisUserLoggedIn.id)
        fetch(`http://localhost:3000/cars/${car.id}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ 
                contents: event.target.content.value, user_id: thisUserLoggedIn.id
                })
        })
            .then(r => r.json())
            .then(contentObj => {
                const contentList = document.querySelector("#one-car-container div")
                contentList.innerHTML += 
                `
                <br>  ${event.target.content.value}
                `
            })
        // .then(r => r.json())
        // .then(carObj += something.innerHTML
        // car.comments.push
        
    })
}

function clickLoginUser() {
    //when a user clicks the login button, this function will render the backend
    //and if this user exist the user can comment, like, and other things
    //else have the user create itself and persist it in the backend 
    const loginButton = document.querySelector("#submit-button")
    const userInput = document.querySelector("#enter-user-name")
    const signUpForm = document.querySelector("#sign-up-page")

    loginButton.addEventListener("click", () => {
        fetch("http://localhost:3000/login", { 
         method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({user_name: userInput.value})
        })
        .then(r => r.json())
        .then(userName => { 
            console.log(userName)
            if(userName) {
                login.style.display = "none",
                signUpForm.style.display = "none",
                thisUserLoggedIn = userName
                } 
                // else {
                //     login.style.display = "none"
                    
                // }
        }) 
            // make this a global variable 
            //this is an addEventListener for our user
            //when user clicks login, the user will be taken to 2 directions, one is if the user exist then show webpage
            //if not the user will be forced to create a new account
    })
}
clickLoginUser()

                    // const signUpFunction = function createUserForm(event) {
                    // // this is when the new user creates a new user
                    // event.preventDefault()
                    // // get the form input
                    // const userUserName = event.target["user_name"].value
                    // const userBio = event.target["bio"].value
                    // const userPreferenceType = event.target["preference_type"].value

                    // const newUser = {
                    //     user_name: userUserName,
                    //     bio: userBio,
                    //     preference_type: userPreferenceType
                    // }

                    // fetch("http://localhost:3000/users", {
                    //     method: "POST",
                    //     headers: {
                    //     "Content-Type": "application/json",
                    //     "Accept": "application/json"
                    //     },
                    //     body: JSON.stringify(newUser)
                    // })
                    //     .then(r => r.json())
                    //     .then(aNewUser => {
                    //     // slap on the DOM
                    //     showUsers(aNewUser)
                    //     })
                    // this code doesnt work due to lack of knowledge on 
                    // creating two paths for when the user signs in/user signs up
                    // }



/*********** EVENT HANDLERS ***********/

function showCars(carsArray) {
    const carsContainer = document.querySelector("#cars-container")

    carsArray.forEach(car => {
        const carsList = document.createElement("li")
            carsList.innerHTML = 
            `
            <img class='car-img' alt='${car.model}' src="${car.img_url}">
            ${car.brand}
            ${car.model}
            ${car.category}
            ${car.year}
            `
        
            carsContainer.append(carsList)
                carsList.addEventListener("click", () => {
                carsClickedFromList(car)
                })
    })
}


function showUsers(usersArray) {
    const userContainer = document.querySelector("#comment-ul")
    // console.log(usersArray)

    usersArray.forEach(user => {
    const userList = document.createElement("li")
    userList.innerHTML = 
    `
    User Name: ${user.user_name} <br>
    Contents: ${user.comments.map(comment => {return comment.contents}).join("<br> Contents: ")}
    `
    // userContainer.append(userList)
    // showDetailsOfACar.append(userContainer)
    })
}

function showComments(commentsArray) {
    const commentContainer = document.querySelector("#comment-ul")
//commented this .forEach because we can grab the comments from the users
    // commentsArray.forEach(comment => {
    //     const commentList = document.createElement("li")
    //     commentList.innerHTML = 
    //     `
    //     User_name: ${comment.user.user_name} <br>
    //     Car: ${comment.car.model} <br>
    //     Comments: ${comment.contents}
    //     `
    //     commentContainer.append(commentList)
    // })
}




// function handleContentFormSubmit(event) {
//     event.preventDefault()

//     const commentContent = event.target["content"].value
//     const newComment = {
//         content: commentContent
//     }


// }




/*********** RENDER HELPERS ***********/





/************* INITIALIZE *************/
