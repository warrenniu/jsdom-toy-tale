let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

/********* DELIVERABLE ONE **********/
// On page load. GET Request to fetch ALL toy objects
// make a `<div class="card">` for each toy
// add it to the toy-collection `div`

/********* Variables**********/

const toyContainer = document.querySelector('#toy-collection')



/********* GET Fetch Request **********/
fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toyArray => renderAllToy(toyArray))


/********* Initial Render **********/

// Render One Toy
function renderOneToy (toyObj) {
  const div = document.createElement('div')
  // div.classList.add('card')
  div.className = 'card'
  div.dataset.id = toyObj.id
  div.innerHTML = `
  <h2>${toyObj.name}</h2>
  <img src=${toyObj.image} class="toy-avatar" />
  <p>${toyObj.likes}</p>
  <button class="like-btn">Like <3</button>
  `
  toyContainer.append(div)
}
// Render All Toys
function renderAllToy(toyArray) {
  toyArray.forEach((toy) => {
    renderOneToy(toy)
  })
  }

/********* DELIVERABLE TWO **********/
// When a user submits a form,POST request is sent and new toy is added to toy container

/********* Variables **********/
const toyForm = document.querySelector('.add-toy-form')




/********* Event Listener **********/
toyForm.addEventListener("submit", (event) => {
event.preventDefault()
const toyName = event.target.name.value
const toyImage = event.target.image.value

const newToy = {
  name: toyName,
  image: toyImage,
  likes: 0
}
/********* POST Fetch Request **********/
fetch('http://localhost:3000/toys', {
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newToy),
})
.then(response => response.json())
.then(newToyObj => {
  renderOneToy(newToyObj);
})

})


/********* DELIVERABLE THREE **********/
//User clicks on a like button
//Increase like count by 1
//PATCH request 

/********* Variables **********/


/********* Event Listener **********/
toyContainer.addEventListener('click', (event) => {
if (event.target.matches('button.like-btn')) {
  const div = event.target.closest('div')
  const id = div.dataset.id
  const likesDisplay = div.querySelector('p')
  const newLikes = parseInt(likesDisplay.textContent) + 1
  
  fetch(`http://localhost:3000/toys/${id}`, {
  method: 'PATCH', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({likes: newLikes}),
})
.then(response => response.json())
.then(toy => {
  likesDisplay.textContent = (toy.likes);
})
}
  
})


























// toyContainer.addEventListener('click', (event) => {
// if (event.target.matches('button.like-btn')) {
//   const div = event.target.closest('div')
//   const id = div.dataset.id
//   const likesDisplay = div.querySelector('p')
//   const newLikes = parseInt(likesDisplay.textContent) + 1

//   fetch(`http://localhost:3000/toys/${id}`, {
//   method: 'PATCH',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({likes: newLikes}),
// })
// .then(response => response.json())
// .then(toy => {
//   likesDisplay.textContent = `${toy.likes} likes`
// })
// }
// })

























