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

  console.log(innerShoePatch)
  const patchChange = document.getElementById(innerShoePatch)

  patchChange.style.fill = 'lime'
})

colorID.addEventListener('click', (e) => {
  console.log(e.target
  )
})

})

function generateScreenshot() {
    html2canvas(document.getElementById('screen'), {
            logging: true,
            profile: true,
            useCORS: true}).then(function(canvas) {
        const data = canvas.toDataURL('image/jpeg', 0.9);
        const src = encodeURI(data);
        document.getElementById('screenshot').src = src;
        // document.getElementById('size').innerHTML = src.length + ' bytes';
    });
}
