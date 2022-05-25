const sizeSlider = document.querySelector('#sizeSlider')
const sliderInfo = document.querySelector('.slider-info')
const grid = document.querySelector('#grid')

const color = document.querySelector('.color')
const eraser = document.querySelector('.eraser')
const clear = document.querySelector('.clear')
const rainbow = document.querySelector('.rainbow')

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

let mode = 'color'
let setMode = (e) => {
  mode = e.target.className
}

let setupGrid = () => {
  clearGrid()
  size(sizeSlider.value)

  grid.style.gridTemplateColumns = `repeat(${sizeSlider.value}, 1fr)`
  grid.style.gridTemplateRows = `repeat(${sizeSlider.value}, 1fr)`
  
  for(i = 0; i < (sizeSlider.value * sizeSlider.value); i++) {
    let gridItem = document.createElement('div')
    gridItem.classList.add('grid-item')
    gridItem.addEventListener('mouseover', changeColor)
    gridItem.addEventListener('mousedown', changeColor)
    grid.appendChild(gridItem)
  }
}

let size = (size) => {
  sliderInfo.innerText = `${size} X ${size}`
}

let clearGrid = () => {
  grid.innerHTML = ''
}

let reloadGrid = () => {
  setupGrid()
}

let changeColor = (e) => {
  if(e.type === 'mouseover' && !mouseDown) return
  if(mode == 'color') {
    e.target.style.background = '#333'
  }
  else if(mode == 'eraser') {
    e.target.style.background = '#fff'
  }
}

sizeSlider.addEventListener('input', setupGrid)

color.addEventListener('click', setMode)
eraser.addEventListener('click', setMode)
clear.addEventListener('click', reloadGrid)
rainbow.addEventListener('click', setMode)

setupGrid()