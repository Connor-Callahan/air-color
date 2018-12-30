document.addEventListener('DOMContentLoaded', () => {


// API selectors
const commentContainer = document.querySelector('#comment-container')

// API requests

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

// app selector
const shoeContainer = document.querySelector('#container')

let pickerButtonBackground
let targetPatch
let targetPatchChange = document.querySelector('#swoosh')
let colorChange

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
  innerShoePatch = targetPatch.dataset.id.slice(6, targetPatch.dataset.id.length)
  targetPatchChange = document.getElementById(innerShoePatch)

})

// altenative to hueb event change listener----

// colorID.addEventListener('click', (e) => {
//   colorChange = colorID.style.backgroundColor
// })

// setColorButton.addEventListener('click', (e) => {
//   console.log(colorChange)
//   targetPatchChange.style.fill = `${colorChange}`
// })
//
// loadColorButton.addEventListener('click', (e) => {
//   setColorButton.style.color = 'white'
//   colorChange = colorID.style.backgroundColor
//   setColorButton.style.backgroundColor = `${colorChange}`
// })


})

// for using canvas ----------
//
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
        // document.getElementById('size').innerHTML = src.length + ' bytes';
    });
}


// saveButton.addEventListener((e) => {
//   html2canvas(document.querySelector('#container')[0], {
//     width: 1200,
//     height: 1200
//   }).then(function(canvas) {
//     var a = document.createElement('a');
//     a.href = canvas.toDataURL("image/png");
//     a.download = 'myfile.png';
//     a.click();
//   });
// })
