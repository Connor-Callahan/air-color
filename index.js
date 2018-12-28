document.addEventListener('DOMContentLoaded', () => {

const shoeContainer = document.querySelector('#container')
const colorID = document.querySelector('#color-ID')
const loadColorButton = document.querySelector('#load-color-button')
const selectColorButton = document.querySelector('#select-color-button')
let pickerButtonBackground
let shoePatch
let patchChange = document.querySelector('#swoosh')
let colorChange

//grabbing the outer transparent patch ---
shoeContainer.addEventListener('click', (e) => {
  if(e.target.tagName == 'path') {
    shoePatch = e.target
  }
  innerShoePatch = shoePatch.dataset.id.slice(6, shoePatch.dataset.id.length)

  patchChange = document.getElementById(innerShoePatch)

})

colorID.addEventListener('click', (e) => {
  colorChange = colorID.style.backgroundColor
  console.log(colorChange)
})

loadColorButton.addEventListener('click', (e) => {
  console.log(colorChange)
  patchChange.style.fill = `${colorChange}`
})

selectColorButton.addEventListener('click', (e) => {
  console.log(e.target)
  colorChange = colorID.style.backgroundColor
  loadColorButton.style.backgroundColor = `${colorChange}`
})


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
