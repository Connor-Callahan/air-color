document.addEventListener('DOMContentLoaded', () => {

const shoeContainer = document.querySelector('#container')
const colorID = document.querySelector('#color-ID')
const pickerButton = document.querySelector('#picker-button')
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

colorID.addEventListener('input', (e) => {
  console.log(e.target)
  colorChange = e.target.style.backgroundColor
  patchChange.style.fill = `${colorChange}`

  console.log(pickerButton.style.backgroundColor)
  pickerButton.style.backgroundColor = `${colorChange}`
})

pickerButton.addEventListener('click', (e) => {
  // pickerButtonBackground = e.target.style.backgroundColor
  // console.log(pickerButtonBackground)
})

})

// for using canvas ----------

// function generateScreenshot() {
//     html2canvas(document.getElementById('screen'), {
//             logging: true,
//             profile: true,
//             useCORS: true}).then(function(canvas) {
//         const data = canvas.toDataURL('image/jpeg', 0.9);
//         const src = encodeURI(data);
//         document.getElementById('screenshot').src = src;
//         // document.getElementById('size').innerHTML = src.length + ' bytes';
//     });
// }
