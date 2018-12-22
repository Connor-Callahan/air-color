document.addEventListener('DOMContentLoaded', () => {

const shoeContainer = document.querySelector('#container')
const colorID = document.querySelector('#color-ID')
let shoePatch

//grabbing the outer transparent patch
shoeContainer.addEventListener('click', (e) => {
  if(e.target.tagName == 'path') {
    shoePatch = e.target
  }
  innerShoePatch = shoePatch.dataset.id.slice(6, shoePatch.dataset.id.length)

  const patchChange = document.getElementById(innerShoePatch)

  patchChange.style.fill = 'lime'
})

colorID.addEventListener('click', (e) => {
  console.log(e.target
  )
})

// colorID.addEventListener('click', (e) => {
//   console.log(e.target)
// })


})
