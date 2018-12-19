document.addEventListener('DOMContentLoaded', () => {

const shoeContainer = document.querySelector('#container')


shoeContainer.addEventListener('click', (e) => {
  console.log(e.target)
})

})
