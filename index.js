document.addEventListener('DOMContentLoaded', () => {

// API selectors
const commentContainer = document.querySelector('#comment-container')
const customShoeContainer = document.querySelector('#custom-shoe-container')
const createShoeForm = document.querySelector('.create-shoe-form')

// div selectors
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
      console.log(comment)
      commentContainer.innerHTML += `
      <div class="comment">
      <h1>${comment.name}</h1>
      <p>${comment.content}</p>
      <button data-id=${comment.id} data-action="post" id="submit-button">Submit</button>
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
      showAllShoes(data)
  })
}
fetchShoes()

function showAllShoes(shoes) {
  shoes.forEach((shoe) => {
    customShoeContainer.innerHTML += renderSingleShoe(shoe)
  })
}

function renderSingleShoe(shoe) {
  return `
  <div id="shoe-${shoe.id}" class="custom-shoe-card">
      <h1>${shoe.name}</h1>
      <p>"${shoe.title}"</p>
      <img class="custom-shoe" src="${shoe.img_url}">
      <button data-id=${shoe.id} data-action="post" id="comment-button">Comment</button>
      <button data-id=${shoe.id} data-action="delete" id="delete-button" onclick="return confirm('Trash this kick?');">☠️</button>
  </div>
  `
}

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
      customShoeContainer += renderSingleShoe(data)
    })
  }
})

// delete custom shoe -------
customShoeContainer.addEventListener('click', e=> {
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
   else if (e.target.dataset.action === "post") {
     commentContainer.style.visibility = 'visible'
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
