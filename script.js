const sizeSlider = document.querySelector('#sizeSlider')
const sliderInfo = document.querySelector('.slider-info')
const grid = document.querySelector('#grid')
const color = document.querySelector('.color')
const eraser = document.querySelector('.eraser')
const clear = document.querySelector('.clear')
const rainbow = document.querySelector('.rainbow')
const colorPicker = document.querySelector('.color-picker')

let currentColor = '#333'
let currentMode = 'color'

const setColor = () => {
  currentColor = colorPicker.value
}

const setMode = (e) => {
  currentMode = e.target.classList[0]
  setActive(e)
}

const setActive = (btn) => {
  color.classList.remove('active')
  eraser.classList.remove('active')
  rainbow.classList.remove('active')

  btn.target.classList.add('active')
}

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


const setupGrid = () => {
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

const size = (size) => {
  sliderInfo.innerText = `${size} X ${size}`
}

const clearGrid = () => {
  grid.innerHTML = ''
}

const reloadGrid = () => {
  setupGrid()
}

const changeColor = (e) => {
  e.preventDefault();
  if(e.type === 'mouseover' && !mouseDown) return
  if(currentMode === 'color') {
    e.target.style.background = currentColor
  } else if(currentMode === 'eraser') {
    e.target.style.background = '#fff'
  } else if(currentMode === 'rainbow') {
    e.target.style.background = random()
  }
}

const rgbToHex = rgb => { 
  let hex = Number(rgb).toString(16) //retorna uma string com a base específicada
  if (hex.length < 2) {
    hex = "0" + hex
  }
  return hex
}

//randomiza número, Math.floor remove casa decimais e Math.random randomiza números entre 0 e 255
const randomize = () => {
  let number = Math.floor(Math.random() * 256)
  return number
}

const random = () => {
  let red = randomize()
  let green = randomize()
  let blue = randomize()
  red = rgbToHex(red)
  green = rgbToHex(green)
  blue = rgbToHex(blue)
  return '#'+red+green+blue
}

sizeSlider.addEventListener('input', setupGrid)

color.addEventListener('click', setMode)
eraser.addEventListener('click', setMode)
clear.addEventListener('click', reloadGrid)
rainbow.addEventListener('click', setMode)
colorPicker.addEventListener('input', setColor)

setupGrid()