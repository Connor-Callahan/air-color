document.addEventListener('DOMContentLoaded', () => {


// API selectors
const commentContainer = document.querySelector('#comment-container')
const customShoeContainer = document.querySelector('#custom-shoe-container')
const createShoeForm = document.querySelector('.create-shoe-form')

// app selector
const shoeContainer = document.querySelector('#container')
const screenShot = document.querySelector('#screenshot')
const displayShoe = document.querySelector('#display-shoe')

let pickerButtonBackground
let targetPatch
let targetPatchChange = document.querySelector('#swoosh')
let colorChange
let displayPatch

// for hueb color-picker --min.js
const elem = document.querySelector('#color-input');
const hueb = new Huebee( elem, {
  // options
  shades: 7
});

hueb.on( 'change', function( color ) {
  targetPatchChange.style.fill = color;
});

//grabbing the outer transparent patch ---
shoeContainer.addEventListener('click', (e) => {
  if(e.target.tagName == 'path') {
    targetPatch = e.target
  }
  displayShoe.lastChild.remove()
  innerShoePatch = targetPatch.dataset.id.slice(6, targetPatch.dataset.id.length)
  targetPatchChange = document.getElementById(innerShoePatch)
  displayPatch = targetPatchChange.cloneNode(true)
  displayShoe.appendChild(displayPatch)
})

// API requests -----
function fetchComments() {
  fetch('http://localhost:3000/api/v1/comments')
  .then(r => r.json())
  .then((data) => {
    data.forEach((comment) => {
      commentContainer.innerHTML += `
      <div class="comment">
      <h1>${comment.name}</h1>
      <p>${comment.content}</p>
      </div>
      `
    })
  })
}

fetchComments()

function fetchShoes() {
  fetch('http://localhost:3000/api/v1/shoes/')
  .then(r => r.json())
  .then((data) => {
    console.log(data)
    data.forEach((shoe) => {
      customShoeContainer.innerHTML += `
      <div id="shoe-${shoe.id}" class="custom-shoe-card">
      <h1>${shoe.name}</h1>
      <p>"${shoe.title}"</p>
      <img class="custom-shoe" src="${shoe.img_url}">
      <button data-id=${shoe.id} data-action="delete" id="delete-button">☠️</button>
      </div>
      `
    })
  })
}
fetchShoes()

// create custom shoe form -------
createShoeForm.addEventListener('submit', (e) => {
  e.preventDefault()
  if (e.target.tagName == 'FORM') {
    const newShoeName = document.querySelector('#shoe-name').value
    const newShoeTitle = document.querySelector('#shoe-title').value
    fetch(`http://localhost:3000/api/v1/shoes/`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify( {
        name: newShoeName,
        title: newShoeTitle,
        img_url: screenShot.src
      })
    })
    .then((r) => r.json())
    .then((data) => {
      customShoeContainer.innerHTML = ''
      fetchShoes()
    })
  }
})

// delete custom shoe -------
customShoeContainer.addEventListener("click", e=> {
   if (e.target.dataset.action === "delete") {
     fetch(`http://localhost:3000/api/v1/shoes/${e.target.dataset.id}`, {
       method: "DELETE",
       headers: {
         'Accept': "application/json",
         'Content-Type': "application/json"
       }
     })
       customShoeContainer.querySelector("#shoe-" + e.target.dataset.id).remove()
   }
  })
})

// for using canvas ----------
function generateScreenshot() {
    html2canvas(document.getElementById('screen'), {
            scale: window.devicePixelRatio,
            logging: true,
            profile: true,
            useCORS: false}).then(function(canvas) {
        const data = canvas.toDataURL('image/jpeg', 0.9);
        const src = encodeURI(data);
        document.getElementById('screenshot').src = src;
        const screenShot = document.querySelector('#screenshot').src
    });
}
