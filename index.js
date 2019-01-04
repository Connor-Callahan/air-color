document.addEventListener('DOMContentLoaded', () => {

// API selectors
const customShoeContainer = document.querySelector('#custom-shoe-container')
const createShoeForm = document.querySelector('.create-shoe-form')
const commentContainer = document.querySelector('#comment-container')
const createCommentContainer = document.querySelector('#create-comment-container')

// div selectors
const shoeContainer = document.querySelector('#container')
const screenShot = document.querySelector('#screenshot')
const displayShoe = document.querySelector('#display-shoe')

let pickerButtonBackground
let targetPatch
let targetPatchChange = document.querySelector('#swoosh')
let colorChange
let displayPatch
let allShoes = []
let allComments = []
let foundComments = []
let commentShoeID
// for hueb color-picker --min.js
const elem = document.querySelector('#color-input');
const hueb = new Huebee( elem, {
  // options
  shades: 7
});
// directing the color-picker to the patch to change
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

// fetch shoes from api -----
function fetchShoes() {
  fetch('http://localhost:3000/api/v1/shoes/')
  .then(r => r.json())
  .then((data) => {
      showAllShoes(data)
      allShoes = data
  })
}
fetchShoes()

// iterate through each element in api ---
function showAllShoes(shoes) {
  shoes.forEach((shoe) => {
    customShoeContainer.innerHTML += renderSingleShoe(shoe)
  })
}

// render each element to the page -----
function renderSingleShoe(shoe) {
  return `
  <div id="shoe-${shoe.id}" class="custom-shoe-card">
    <h1>${shoe.name}</h1>
    <p id="shoe-title">"${shoe.title}"</p>
    <button class="like-btn" data-ref="like" data-id=${shoe.id}>❤️</button>
    <p id="like-${shoe.id}">likes : ${shoe.likes}</p>
    <img class="custom-shoe" src="${shoe.img_url}">
    <form class="rating" id="shoe-rating" data-id="${shoe.id}">
	       <button id="star-${shoe.id}-1" data-action="rate" type="submit" class="star" data-rating="1" data-ref="${shoe.id}"  data-id="1">
		       &#9733;
		     <span class="screen-reader"></span>
	       </button>

	       <button id="star-${shoe.id}-2" data-action="rate" type="submit" class="star" data-rating="2" data-ref="${shoe.id}"  data-id="2}">
		        &#9733;
		     <span class="screen-reader"></span>
	       </button>

	        <button  id="star-${shoe.id}-3" data-action="rate" type="submit" class="star" data-rating="3" data-ref="${shoe.id}"  data-id="3">
		        &#9733;
		      <span class="screen-reader"></span>
	        </button>

	        <button id="star-${shoe.id}-4" data-action="rate" type="submit" class="star" data-rating="4" data-ref="${shoe.id}" data-id="4">
		        &#9733;
		      <span class="screen-reader"></span>
	        </button>

	         <button id="star-${shoe.id}-5" data-action="rate" type="submit" class="star" data-rating="5" data-ref="${shoe.id}"  data-id="5">
		        &#9733;
		       <span class="screen-reader"></span>
	         </button>
           </br>
      <button id="create-comment-button" data-id=${shoe.id} data-action="Comment">Create Comment</button>
      </br>
      <button data-id=${shoe.id} data-action="delete" class="delete-button">🗑</button>
  </div>
  `
}

// make comment container visible --------
customShoeContainer.addEventListener('click', (e) => {
  if(e.target.id == 'create-comment-button'){
    createCommentContainer.style.visibility = 'visible'
    // document.querySelector('.application').style.filter = 'blur(4px)'
    // customShoeContainer.style.filter = 'blur(4px)'
    commentShoeID = e.target.dataset.id
  } else {
    createCommentContainer.style.visibility = 'hidden'
  }
})

// create new comment ---------
function createComment() {
  createCommentContainer.addEventListener('click', (e) => {
    e.preventDefault()
    if(e.target.dataset.ref == 'create') {
      const newUserName = document.querySelector('#user-name').value
      const newUserComment = document.querySelector('#user-comment').value
      fetch('http://localhost:3000/api/v1/comments/', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        },
        body: JSON.stringify( {
          name: newUserName,
          content: newUserComment,
          shoe_id: commentShoeID
        })
      })
      .then((r) => r.json())
      .then((data) => {
        displayComments()
        // fetchComments()
        // createCommentContainer.style.visibility = 'hidden'
        // commentContainer.style.visibility = 'visible'
      })
    }
  })
}
createComment()

// view all comments --------
function displayComments() {
  createCommentContainer.addEventListener('click', (e) => {
    if(e.target.tagName == 'BUTTON' ) {
      console.log(e.target.tagName)
      fetchComments()
      createCommentContainer.style.visibility = 'hidden'
      commentContainer.style.visibility = 'visible'
    } else {
      commentContainer.style.visibility = 'hidden'
    }
  })
}

// retrieve all comments from API
function fetchComments() {
  fetch(`http://localhost:3000/api/v1/comments/`)
  .then(r => r.json())
  .then((data) => {
    allComments = data
    viewComments()
  })
}

// display comments specific to shoe_id/attach to div ------
function viewComments() {
  foundComments = allComments.filter((comment) => {
    return comment.shoe_id == commentShoeID
  })
  foundComments.forEach((comment) => {
    commentContainer.innerHTML += renderSingleComment(comment)
  })
  commentContainer.innerHTML += `<button id="close-comment" data-ref="close-comment">Close-</button>`
  customShoeContainer.style.filter = 'blur(4px)'
}

commentContainer.addEventListener('click', (e) => {
  if(e.target.dataset.ref == 'close-comment') {
    customShoeContainer.style.filter = 'blur(0px)'
    commentContainer.style.visibility = 'hidden'
    commentContainer.innerHTML = ''
  }
})


// delete specific comment ------
commentContainer.addEventListener('click', (e) => {
  if(e.target.dataset.ref == 'delete-comment') {
    fetch(`http://localhost:3000/api/v1/comments/${e.target.dataset.id}`, {
      method: "DELETE",
      headers: {
        'Accept': "application/json",
        'Content-Type': "application/json"
      }
    })
    document.querySelector("#comment-" + e.target.dataset.id).remove()
  }
})

// render a single comment
function renderSingleComment(comment) {
  return `
    <div class="comment" id="comment-${comment.id}">
    <h1>${comment.name}</h1>
    <p>${comment.content}</p>
    <button class="delete-comment" id="delete-comment-${comment.id}" data-ref="delete-comment" data-id="${comment.id}">🗑</button>
    </div>
    `
}


// create custom shoe form -------
createShoeForm.addEventListener('submit', (e) => {
  e.preventDefault()
  if (e.target.tagName == 'FORM') {
    const newShoeName = document.querySelector('#shoe-name').value
    const newShoeTitle = document.querySelector('#shoe-title').value
    fetch('http://localhost:3000/api/v1/shoes/', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify( {
        name: newShoeName,
        title: newShoeTitle,
        likes: 0,
        img_url: screenShot.src
      })
    })
    .then((r) => r.json())
    .then((data) => {
      allShoes.push(data)
      customShoeContainer.innerHTML += renderSingleShoe(data)
    })
  }
})

// delete custom shoe -------
customShoeContainer.addEventListener('click', e=> {
   if (e.target.dataset.action === "delete") {
     const confirmed = confirm('You Sure?')
     if (confirmed) {
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
    }
  })

// highlight on hover
customShoeContainer.addEventListener('mouseover', e => {
    e.preventDefault()
    if(e.target.dataset.action === 'rate') {
      start = parseInt(e.target.dataset.id) + 1
      first = 1
      for(let i = first; i < start; i++) {
        star = document.querySelector(`#star-${e.target.dataset.ref}-${i}`)
        star.style.color = 'gold'
      }
    }
  })


customShoeContainer.addEventListener('mouseout', e => {
  if(e.target.dataset.action === 'rate') {
    start = parseInt(e.target.dataset.id) + 1
    first = 1
    for(let i = first; i < start; i++) {
      star = document.querySelector(`#star-${e.target.dataset.ref}-${i}`)
      star.style.color = 'indigo'
    }
  }
})

customShoeContainer.addEventListener('click', e => {
  e.preventDefault()
  if(e.target.dataset.action === 'rate') {
    rating = e.target.dataset.rating
  }
})

customShoeContainer.addEventListener('click', e=> {
  if(e.target.dataset.ref == 'like') {
    let foundShoe = allShoes.find((shoe) => {
      return event.target.dataset.id == shoe.id
    })
    let addLikes = ++foundShoe.likes

    let likeButton = document.querySelector(`#like-${e.target.dataset.id}`)

    fetch(`http://localhost:3000/api/v1/shoes/${foundShoe.id}`, {
       method: 'PATCH',
       headers: {
         'Content-Type' : 'application/json',
         'Accept' : 'application/json'
       },
       body: JSON.stringify({
         likes: addLikes
       })
     })
     likeButton.innerHTML = `likes : ${addLikes}`
  }
})

// end of DOM Content Loaded
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
