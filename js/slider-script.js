'use strict'
//Получение необходимых элементов
const slider = document.querySelector('.slider-wrap')
const nextBtn = document.querySelector('#btn-next')
const prevBtn = document.querySelector('#btn-prev')

//Получение первого слайда
let firstSlide = slider.firstElementChild

//Добавление первого слайда в конец слайдера
let lastSlide = document.createElement('div')
lastSlide.innerHTML = firstSlide.innerHTML
lastSlide.classList.add('slider-item')
slider.append(lastSlide)

//Получение обновленного слайдер с дублированным первым слайдом в конце
const updatedSlider = slider.querySelectorAll('.slider-item')

//Задаем ширину всего слайдера
let sliderWidth = slider.offsetWidth
slider.style.width = sliderWidth * updatedSlider.length + 'px'
updatedSlider.forEach(item => {
    item.style.width = sliderWidth + 'px'
})


//Блок с анимацие. Меняет свойство transform в течении заданного времени
let animateDuration = 0
const sliderAnimateToRight = () => {
    let movingSlider = setInterval(frame, 5)

    function frame() {
        if (animateDuration === sliderWidth * count) { //В случай если продолжительность совподает с текущей позицеей слайдера - анимация останавливается
            clearInterval(movingSlider)
        } else {
            animateDuration += 5
            slider.style.transform = `translateX(-${animateDuration}px)`
            if (animateDuration === slider.offsetWidth - sliderWidth) { // Если слайд последний (дубликат первого), значит сбрасываев значение продолжительности
                animateDuration = 0
            }
        }
    }

}
const sliderAnimateToLeft = () => {
    let movingSlider = setInterval(frame, 5)

    function frame() {
        if (animateDuration === sliderWidth * count) {
            clearInterval(movingSlider)
        } else if (animateDuration <= sliderWidth * count) { // Если слайдер первый, то при переходе на последний (дубликат первого) - устанавливаем позицию предппоследнего слайда
            animateDuration = slider.offsetWidth - sliderWidth
        } else {
            animateDuration -= 5
            slider.style.transform = `translateX(-${animateDuration}px)`
        }
    }

}

//Блок определения функционала кнопок
let count = 0
const nextSlide = () => {
    nextBtn.removeEventListener('click', nextSlide)
    prevBtn.removeEventListener('click', prevSlide)
    count++
    sliderAnimateToRight()
    setTimeout(() => {
        prevBtn.addEventListener('click', prevSlide)
        nextBtn.addEventListener('click', nextSlide)
    }, 1000)
    if (count === updatedSlider.length - 1) {//Переброс с последнего слайда (дубликат первого) на первый
        count = 0
    }
    sliderDots.forEach(dot => dot.classList.remove('dot-active'))
    if (count > sliderDots.length - 1) {
        sliderDots[0].classList.add('dot-active')
    } else {
        sliderDots[count].classList.add('dot-active')
    }

}
const prevSlide = () => {
    nextBtn.removeEventListener('click', nextSlide)
    prevBtn.removeEventListener('click', prevSlide)
    if (count === 0) { //Переход на последний слайд (дубликат первого)
        count = updatedSlider.length - 1
        slider.style.transform = `translateX(-${sliderWidth * count}px)`
        setTimeout(() => {
            count--
            sliderAnimateToLeft()
            setTimeout(() => {
                nextBtn.addEventListener('click', nextSlide)
                prevBtn.addEventListener('click', prevSlide)
            }, 1000)
        }, 0)
    } else {
        count--
        sliderAnimateToLeft()
        setTimeout(() => {
            nextBtn.addEventListener('click', nextSlide)
            prevBtn.addEventListener('click', prevSlide)
        }, 1000)

    }
    sliderDots.forEach(dot => dot.classList.remove('dot-active'))
    if (count > sliderDots.length - 1) {
        sliderDots[sliderDots.length - 1].classList.add('dot-active')
    } else {
        sliderDots[count].classList.add('dot-active')
    }

}

nextBtn.addEventListener('click', nextSlide)
prevBtn.addEventListener('click', prevSlide)

//Блок инициализации навигационных точек

const dotsWrap = document.querySelector('.slider-dots')
const createDot = document.createElement('div')
createDot.classList.add('dot')

for (let i = 0; i <= updatedSlider.length - 2; i++) {
    let dotClone = createDot.cloneNode()
    dotsWrap.appendChild(dotClone)
}

let sliderDots = dotsWrap.querySelectorAll('.dot')
sliderDots[0].classList.add('dot-active')

sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        count = index
        animateDuration = sliderWidth * count
        slider.style.transform = `translateX(-${sliderWidth * index}px)`
        sliderDots.forEach(dot => dot.classList.remove('dot-active'))
        dot.classList.add('dot-active')
    })
})
